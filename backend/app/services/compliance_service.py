import os
from datetime import datetime, timezone

from app.model.AuditLogsModel import AuditActorType, AuditStatus, SeverityLevel
from app.model.complianceModel import (
    ComplianceControl,
    ComplianceEvidence,
    CompliancePolicy,
    ComplianceRisk,
    EvidenceStatus,
    PolicyDocument,
)
from fastapi.encoders import jsonable_encoder
from app.schemas.complianceSchemas import PolicyCreate, RiskCreate
from app.services.auditLogsService import AuditService  # Assuming this path
from fastapi import UploadFile
from sqlalchemy.orm import Session
import uuid

# Weights for automated Risk Scoring
RISK_WEIGHTS = {"LOW": 1, "MEDIUM": 2, "HIGH": 3, "CRITICAL": 4}
LIKE_WEIGHTS = {"LOW": 1, "MEDIUM": 2, "HIGH": 3}


class ComplianceService:
    @staticmethod
    def get_all_policies(db: Session):
        return db.query(CompliancePolicy).all()

    @staticmethod
    def get_policy(db: Session, policy_id: int):
        return (
            db.query(CompliancePolicy).filter(CompliancePolicy.id == policy_id).first()
        )

    @staticmethod
    def get_all_risks(db: Session):
        return db.query(ComplianceRisk).all()

    @staticmethod
    def get_risk(db: Session, risk_id: int):
        return db.query(ComplianceRisk).filter(ComplianceRisk.id == risk_id).first()

    @staticmethod
    def get_evidence_by_control(db: Session, control_id: int):
        return (
            db.query(ComplianceEvidence)
            .filter(ComplianceEvidence.control_id == control_id)
            .all()
        )

    # ==========================
    # 1. POLICY & DOCUMENT LOGIC
    # ==========================
    @staticmethod
    async def create_policy(
        db: Session, policy_data: PolicyCreate, user_obj, meta_data: dict
    ):
        policy_code = f"POL-{uuid.uuid4().hex[:6].upper()}"

        db_policy = CompliancePolicy(
            **policy_data.model_dump(), policy_code=policy_code
        )

        db.add(db_policy)
        # db.flush()
        # db_policy.policy_code = f"POL-{1000 + db_policy.id}"
        db.commit()
        db.refresh(db_policy)

        # 🚀 Audit Log
        AuditService(db).write_log(
            actor_id=user_obj.id,
            actor_type=AuditActorType.USER,
            action="CREATE",
            resource_type="COMPLIANCE_POLICY",
            resource_id=db_policy.id,
            description=f"Created policy: {db_policy.name} ({db_policy.policy_code})",
            user_obj=user_obj,
            meta_data=meta_data,
            new_data=jsonable_encoder(policy_data.model_dump()),
            service="compliance-service",
        )
        return db_policy

    @staticmethod
    async def upload_policy_document(
        db: Session, policy_id: int, file: UploadFile, user_obj, meta_data: dict
    ):
        upload_dir = f"uploads/policies/{policy_id}"
        os.makedirs(upload_dir, exist_ok=True)
        file_path = os.path.join(upload_dir, file.filename)

        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        db_doc = PolicyDocument(
            policy_id=policy_id,
            document_name=file.filename,
            file_path=file_path,
            uploaded_by=user_obj.id,
        )
        db.add(db_doc)
        db.commit()

        # 🚀 Audit Log
        AuditService(db).write_log(
            actor_id=user_obj.id,
            actor_type=AuditActorType.USER,
            action="UPLOAD",
            resource_type="POLICY_DOCUMENT",
            resource_id=db_doc.id,
            description=f"Uploaded document {file.filename} to policy {policy_id}",
            user_obj=user_obj,
            meta_data=meta_data,
            service="compliance-service",
        )
        return db_doc

    # ==========================
    # 2. EVIDENCE LOGIC
    # ==========================
    @staticmethod
    async def upload_evidence(
        db: Session,
        control_id: int,
        evidence_name: str,
        file: UploadFile,
        user_obj,
        meta_data: dict,
    ):
        upload_dir = f"uploads/evidence/{control_id}"
        os.makedirs(upload_dir, exist_ok=True)
        file_path = os.path.join(upload_dir, file.filename)

        with open(file_path, "wb") as buffer:
            buffer.write(await file.read())

        db_evidence = ComplianceEvidence(
            evidence_name=evidence_name,
            control_id=control_id,
            file_path=file_path,
            uploaded_by=user_obj.id,
            collection_date=datetime.now(timezone.utc),
            status=EvidenceStatus.UNDER_REVIEW,
        )
        db.add(db_evidence)
        db.commit()
        db.refresh(db_evidence)

        # 🚀 Audit Log
        AuditService(db).write_log(
            actor_id=user_obj.id,
            actor_type=AuditActorType.USER,
            action="UPLOAD",
            resource_type="COMPLIANCE_EVIDENCE",
            resource_id=db_evidence.id,
            description=f"Uploaded evidence: {evidence_name} for control {control_id}",
            user_obj=user_obj,
            meta_data=meta_data,
            service="compliance-service",
        )
        return db_evidence

    # ==========================
    # 3. RISK LOGIC (WITH SCORING)
    # ==========================
    @staticmethod
    async def identify_risk(db: Session, risk_data: RiskCreate):

        i_weight = RISK_WEIGHTS.get(risk_data.impact.upper(), 1)
        l_weight = LIKE_WEIGHTS.get(risk_data.likelihood.upper(), 1)
        calculated_score = i_weight * l_weight

        db_risk = ComplianceRisk(
            **risk_data.model_dump(),
            risk_score=calculated_score,
            status="OPEN",
            identified_at=datetime.now(timezone.utc),
        )

        db.add(db_risk)
        db.flush()

        import uuid

        db_risk.risk_code = f"RISK-{uuid.uuid4().hex[:6]}"
        # db_risk.risk_code = f"R-{100 + db_risk.id}"

        db.commit()
        db.refresh(db_risk)

        try:
            AuditService(db).write_log(
                actor_type=AuditActorType.USER,
                action="CREATE",
                resource_type="COMPLIANCE_RISK",
                resource_id=db_risk.id,
                description=f"Identified Risk {db_risk.risk_code}. Score: {calculated_score}",
                new_data=jsonable_encoder(risk_data.model_dump()),
                severity=SeverityLevel.INFO,
                service="compliance-service",
            )
        except Exception as e:
            print(f"Audit Log Failed: {str(e)}")

        return db_risk

    # ==========================
    # 4. KPI LOGIC (DYNAMIC)
    # ==========================
    @staticmethod
    def get_compliance_stats(db: Session):
        return {
            "active_policies": db.query(CompliancePolicy)
            .filter(CompliancePolicy.status == "ACTIVE")
            .count(),
            "open_risks": db.query(ComplianceRisk)
            .filter(ComplianceRisk.status == "OPEN")
            .count(),
            "critical_risks": db.query(ComplianceRisk)
            .filter(ComplianceRisk.impact == "CRITICAL")
            .count(),
            "pending_evidence": db.query(ComplianceEvidence)
            .filter(ComplianceEvidence.status == EvidenceStatus.UNDER_REVIEW)
            .count(),
        }
