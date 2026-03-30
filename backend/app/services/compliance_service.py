import os
from datetime import datetime, timezone
from typing import Optional
from app.model.AuditLogsModel import (
    AuditActorType,
    SeverityLevel,
    AuditActionType,
)
from app.model.complianceModel import (
    ComplianceControl,
    ComplianceEvidence,
    CompliancePolicy,
    ComplianceRisk,
    EvidenceStatus,
    PolicyDocument,
)
from fastapi.encoders import jsonable_encoder
from app.schemas.complianceSchemas import PolicyCreate, RiskCreate, PolicyUpdate
from app.services.auditLogsService import AuditService  # Assuming this path
from fastapi import UploadFile, HTTPException, File
from sqlalchemy.orm import Session
import uuid
from app.GlobalException.GlobalExceptionError import AppException

# Weights for automated Risk Scoring
RISK_WEIGHTS = {"LOW": 1, "MEDIUM": 2, "HIGH": 3, "CRITICAL": 4}
LIKE_WEIGHTS = {"LOW": 1, "MEDIUM": 2, "HIGH": 3}


class ComplianceService:
    @staticmethod
    # def get_all_policies(db: Session, user_obj, page: int, limit: int):
    #     return (
    #         db.query(CompliancePolicy)
    #         .filter(CompliancePolicy.organization_id == user_obj.organization_id)
    #         .all()
    #     )

    @staticmethod
    def get_all_policies(db: Session, user_obj, page: int, limit: int):
        try:
            query = db.query(CompliancePolicy).filter(
                CompliancePolicy.organization_id == user_obj.organization_id
            )

            total = query.count()
            offset = (page - 1) * limit

            data = (
                query.order_by(CompliancePolicy.created_at.desc())
                .offset(offset)
                .limit(limit)
                .all()
            )

            return {
                "total": total,
                "page": page,
                "limit": limit,
                "total_pages": (total + limit - 1) // limit,
                "data": data,
            }

        except Exception as e:
            raise AppException(
                500, "POLICY_FETCH_FAILED", "Failed to fetch policies", str(e)
            )

    @staticmethod
    def get_policy(db: Session, policy_id: int, user_obj):
        return (
            db.query(CompliancePolicy)
            .filter(
                CompliancePolicy.id == policy_id,
                CompliancePolicy.organization_id == user_obj.organization_id,
            )
            .first()
        )

    # @staticmethod
    # def get_all_risks(db: Session, user_obj):
    #     return (
    #         db.query(ComplianceRisk)
    #         .join(CompliancePolicy)
    #         .filter(CompliancePolicy.organization_id == user_obj.organization_id)
    #         .all()
    #     )
    @staticmethod
    def get_all_risks(db: Session, user_obj, page: int, limit: int):
        try:
            query = (
                db.query(ComplianceRisk)
                .join(CompliancePolicy)
                .filter(CompliancePolicy.organization_id == user_obj.organization_id)
            )

            total = query.count()
            offset = (page - 1) * limit

            data = (
                query.order_by(ComplianceRisk.created_at.desc())
                .offset(offset)
                .limit(limit)
                .all()
            )

            return {
                "total": total,
                "page": page,
                "limit": limit,
                "total_pages": (total + limit - 1) // limit,
                "data": data,
            }

        except Exception as e:
            raise AppException(
                500, "RISK_FETCH_FAILED", "Failed to fetch risks", str(e)
            )

    @staticmethod
    def get_all_evidence(db: Session, user_obj, page: int, limit: int):
        try:
            query = (
                db.query(ComplianceEvidence)
                .join(ComplianceControl)
                .join(CompliancePolicy)
                .filter(CompliancePolicy.organization_id == user_obj.organization_id)
            )

            total = query.count()
            offset = (page - 1) * limit

            data = (
                query.order_by(ComplianceEvidence.created_at.desc())
                .offset(offset)
                .limit(limit)
                .all()
            )

            return {
                "total": total,
                "page": page,
                "limit": limit,
                "total_pages": (total + limit - 1) // limit,
                "data": data,
            }

        except Exception as e:
            raise AppException(
                500, "EVIDENCE_FETCH_FAILED", "Failed to fetch evidence", str(e)
            )

    @staticmethod
    def get_risk(db: Session, risk_id: int):
        return db.query(ComplianceRisk).filter(ComplianceRisk.id == risk_id).first()

    @staticmethod
    def get_evidence_by_control(db: Session, control_id: int, user_obj):
        return (
            db.query(ComplianceEvidence)
            .join(ComplianceControl)
            .join(CompliancePolicy)
            .filter(
                CompliancePolicy.organization_id == user_obj.organization_id,
                ComplianceEvidence.control_id == control_id,
            )
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
            **policy_data.model_dump(),
            policy_code=policy_code,
            organization_id=user_obj.organization_id,
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
            meta_data={
                **meta_data,
                "new_data": jsonable_encoder(policy_data.model_dump()),
            },
            # new_data=jsonable_encoder(policy_data.model_dump()),
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

    def update_policy(db: Session, policy_id: int, payload: PolicyUpdate):

        db_policy = (
            db.query(CompliancePolicy).filter(CompliancePolicy.id == policy_id).first()
        )

        if not db_policy:
            raise HTTPException(status_code=404, detail="Policy not found")

        update_data = payload.model_dump(exclude_unset=True)

        for field, value in update_data.items():
            setattr(db_policy, field, value)

        db.commit()
        db.refresh(db_policy)

        return db_policy

    @staticmethod
    def delete_policy(db: Session, policy_id: int):
        db_policy = (
            db.query(CompliancePolicy).filter(CompliancePolicy.id == policy_id).first()
        )
        if db_policy:
            db.delete(db_policy)
            db.commit()
            return True
        return False

    # ==========================
    # 2. EVIDENCE LOGIC
    # ==========================
    @staticmethod
    async def upload_evidence(
        db: Session,
        control_id: int,
        evidence_name: str,
        collection_date: datetime,
        description: str,
        user_obj,
        meta_data: dict,
        user_id: int,
        file: Optional[UploadFile] = File(None),
    ):

        file_path = None

        if file:
            upload_dir = f"uploads/evidence/{control_id}"
            os.makedirs(upload_dir, exist_ok=True)

            file_path = os.path.join(upload_dir, file.filename).replace("\\", "/")

            with open(file_path, "wb") as buffer:
                buffer.write(await file.read())

        db_evidence = ComplianceEvidence(
            evidence_name=evidence_name,
            control_id=control_id,
            file_path=file_path,
            uploaded_by=user_obj.id,
            collection_date=collection_date,
            description=description,
            status=EvidenceStatus.UNDER_REVIEW,
        )
        db.add(db_evidence)
        db.commit()
        db.refresh(db_evidence)

        # 🚀 Audit Log
        AuditService(db).write_log(
            actor_id=user_obj.id,
            actor_type=AuditActorType.USER,
            action=AuditActionType.UPLOAD,
            resource_type="COMPLIANCE_EVIDENCE",
            resource_id=db_evidence.id,
            description=f"Uploaded evidence: {evidence_name} for control {control_id}",
            user_obj=user_obj,
            meta_data=meta_data,
            service="compliance-service",
        )
        return db_evidence

    @staticmethod
    async def update_evidence(db: Session, evidence_id: int, payload: dict, user_obj):
        db_evidence = (
            db.query(ComplianceEvidence)
            .filter(ComplianceEvidence.id == evidence_id)
            .first()
        )
        if not db_evidence:
            return None

        # Capture old state for auditing
        old_values = jsonable_encoder(db_evidence)

        # Update allowed fields
        for key, value in payload.items():
            if hasattr(db_evidence, key) and key not in [
                "id",
                "file_path",
                "uploaded_by",
            ]:
                setattr(db_evidence, key, value)

        db.commit()
        db.refresh(db_evidence)

        # 🚀 Audit Log for Update
        AuditService(db).write_log(
            actor_id=user_obj.id,
            actor_type=AuditActorType.USER,
            action="UPDATE",
            resource_type="COMPLIANCE_EVIDENCE",
            resource_id=db_evidence.id,
            description=f"Updated evidence record: {db_evidence.evidence_name}",
            user_obj=user_obj,
            old_data=old_values,
            meta_data=jsonable_encoder(db_evidence),
            service="compliance-service",
        )
        return db_evidence

    @staticmethod
    def delete_evidence(db: Session, evidence_id: int, user_obj):
        db_evidence = (
            db.query(ComplianceEvidence)
            .filter(ComplianceEvidence.id == evidence_id)
            .first()
        )
        if not db_evidence:
            return False

        # 1. Delete physical file if it exists
        if db_evidence.file_path and os.path.exists(db_evidence.file_path):
            try:
                os.remove(db_evidence.file_path)
            except Exception as e:
                print(f"Error deleting file: {e}")

        # 2. Delete record from DB
        db.delete(db_evidence)
        db.commit()

        # 🚀 Audit Log for Deletion
        AuditService(db).write_log(
            actor_id=user_obj.id,
            actor_type=AuditActorType.USER,
            action="DELETE",
            resource_type="COMPLIANCE_EVIDENCE",
            resource_id=evidence_id,
            description=f"Deleted evidence and physical file: {db_evidence.evidence_name}",
            user_obj=user_obj,
            service="compliance-service",
        )
        return True

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
                meta_data=jsonable_encoder(risk_data.model_dump()),
                severity=SeverityLevel.INFO,
                service="compliance-service",
            )
        except Exception as e:
            print(f"Audit Log Failed: {str(e)}")

        return db_risk

    @staticmethod
    def update_risk(db: Session, risk_id: int, risk_data: dict):
        db_risk = db.query(ComplianceRisk).filter(ComplianceRisk.id == risk_id).first()
        if not db_risk:
            return None

        for key, value in risk_data.items():
            setattr(db_risk, key, value)

        # Re-calculate score if impact or likelihood changed
        db_risk.risk_score = LIKE_WEIGHTS.get(db_risk.likelihood, 1) * RISK_WEIGHTS.get(
            db_risk.impact, 1
        )

        db.commit()
        db.refresh(db_risk)
        return db_risk

    @staticmethod
    def delete_risk(db: Session, risk_id: int):
        db_risk = db.query(ComplianceRisk).filter(ComplianceRisk.id == risk_id).first()
        if db_risk:
            db.delete(db_risk)
            db.commit()
            return True
        return False

    # ==========================
    # 4. KPI LOGIC (DYNAMIC)
    # ==========================
    @staticmethod
    def get_compliance_stats(db, user_obj):
        return {
            "active_policies": db.query(CompliancePolicy)
            .filter(
                CompliancePolicy.status == "ACTIVE",
                CompliancePolicy.organization_id == user_obj.organization_id,
            )
            .count(),
            "open_risks": db.query(ComplianceRisk)
            .join(CompliancePolicy)
            .filter(
                ComplianceRisk.status == "OPEN",
                CompliancePolicy.organization_id == user_obj.organization_id,
            )
            .count(),
            "critical_risks": db.query(ComplianceRisk)
            .join(CompliancePolicy)
            .filter(
                ComplianceRisk.impact == "CRITICAL",
                CompliancePolicy.organization_id == user_obj.organization_id,
            )
            .count(),
            "pending_evidence": db.query(ComplianceEvidence)
            .join(ComplianceControl)
            .join(CompliancePolicy)
            .filter(
                ComplianceEvidence.status == EvidenceStatus.UNDER_REVIEW,
                CompliancePolicy.organization_id == user_obj.organization_id,
            )
            .count(),
        }
