from datetime import datetime
from typing import Optional

from app.core.dependencies import get_db
from app.core.security import get_current_user
from app.model.UserModel import User
from app.schemas.complianceSchemas import (
    DocumentRead,
    EvidenceRead,
    PolicyCreate,
    PolicyRead,
    PolicyUpdate,
    RiskCreate,
    RiskRead,
)
from app.services.compliance_service import ComplianceService
from fastapi import (
    APIRouter,
    Depends,
    File,
    Form,
    HTTPException,
    UploadFile,
)
from sqlalchemy.orm import Session

router = APIRouter(prefix="/compliance", tags=["Compliance"])

# ==========================
# 1. POLICIES & DOCUMENTS
# ==========================


@router.get("/policies")
async def get_all_policies(
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return ComplianceService.get_all_policies(db, current_user, page, limit)


@router.get("/policies/{policy_id}", response_model=PolicyRead)
async def get_policy_by_id(
    policy_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    policy = ComplianceService.get_policy(db, policy_id, current_user)

    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found or access denied")

    return policy


@router.post("/policies", response_model=PolicyCreate)
async def create_new_policy(
    policy: PolicyCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),  # Dependency is here
):
    meta_data = {"source": "compliance_modal", "action": "manual_entry"}

    return await ComplianceService.create_policy(
        db=db, policy_data=policy, user_obj=current_user, meta_data=meta_data
    )


@router.post("/policies/{policy_id}/upload", response_model=DocumentRead)
async def upload_policy_doc(
    policy_id: int,
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Uploads a PDF or document associated with a specific policy"""
    return await ComplianceService.upload_policy_document(
        db, policy_id, file, current_user, {}
    )


@router.put("/updatePolicies/{policy_id}", response_model=PolicyRead)
async def update_policy(
    policy_id: int,
    payload: PolicyUpdate,
    db: Session = Depends(get_db),
):
    return ComplianceService.update_policy(db, policy_id, payload)


@router.delete("/deletePolicies/{policy_id}")
async def delete_policy(policy_id: int, db: Session = Depends(get_db)):
    success = ComplianceService.delete_policy(db, policy_id)
    if not success:
        raise HTTPException(status_code=404, detail="Policy not found")
    return {"id": policy_id, "message": "Deleted"}


# ==========================
# 2. CONTROLS & EVIDENCE
# ==========================


# @router.get("/controls/evidence", response_model=List[EvidenceRead])
# async def get_all_compliance_evidence(
#     db: Session = Depends(get_db),
#     current_user: User = Depends(get_current_user),
# ):
#     return (
#         db.query(ComplianceEvidence)
#         .join(ComplianceControl)
#         .join(CompliancePolicy)
#         .filter(CompliancePolicy.organization_id == current_user.organization_id)
#         .all()
#     )


@router.get("/controls/evidence")
async def get_all_compliance_evidence(
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return ComplianceService.get_all_evidence(db, current_user, page, limit)


@router.post("/controls/{control_id}/evidence", response_model=EvidenceRead)
async def submit_evidence(
    control_id: int,
    evidence_name: str = Form(...),
    collection_date: datetime = Form(...),
    description: str = Form(None),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return await ComplianceService.upload_evidence(
        db=db,
        control_id=control_id,
        evidence_name=evidence_name,
        collection_date=collection_date,
        description=description,
        file=file,
        user_obj=current_user,
        meta_data={},
        user_id=current_user.id,
    )


@router.put("/controls/updateEvidence/{evidence_id}", response_model=EvidenceRead)
async def update_compliance_evidence(
    evidence_id: int,
    evidence_name: str = Form(...),
    collection_date: datetime = Form(...),
    description: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):

    payload = {
        "evidence_name": evidence_name,
        "collection_date": collection_date,
        "description": description,
    }

    updated = await ComplianceService.update_evidence(
        db=db,
        evidence_id=evidence_id,
        payload=payload,
        file=file,
        user_obj=current_user,
    )

    if not updated:
        raise HTTPException(status_code=404, detail="Evidence not found")

    return updated


@router.delete("/controls/deleteEvidence/{evidence_id}")
async def delete_compliance_evidence(
    evidence_id: int,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    success = ComplianceService.delete_evidence(db, evidence_id, current_user)
    if not success:
        raise HTTPException(status_code=404, detail="Evidence not found")
    return {"id": evidence_id, "status": "deleted"}


# ==========================
# 3. RISK MANAGEMENT
# ==========================


@router.get("/risks")
async def get_all_risks(
    page: int = 1,
    limit: int = 10,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return ComplianceService.get_all_risks(db, current_user, page, limit)


@router.get("/risks/{risk_id}", response_model=RiskRead)
async def get_risk_detail(risk_id: int, db: Session = Depends(get_db)):
    """Fetch details of a specific risk"""
    risk = ComplianceService.get_risk(db, risk_id)
    if not risk:
        raise HTTPException(status_code=404, detail="Risk not found")
    return risk


@router.post("/risks", response_model=RiskCreate)
async def identify_compliance_risk(risk: RiskCreate, db: Session = Depends(get_db)):
    """
    Identifies a risk and automatically calculates the risk_score
    based on impact and likelihood weights
    """
    return await ComplianceService.identify_risk(db, risk)


@router.put("/updateRisks/{risk_id}", response_model=RiskRead)
async def update_risk(risk_id: int, payload: dict, db: Session = Depends(get_db)):
    return ComplianceService.update_risk(db, risk_id, payload)


@router.delete("/deleteRisks/{risk_id}")
async def delete_risk(risk_id: int, db: Session = Depends(get_db)):
    success = ComplianceService.delete_risk(db, risk_id)
    if not success:
        raise HTTPException(status_code=404, detail="Policy not found")
    return {"id": risk_id, "message": "Deleted"}


# ==========================
# 4. DASHBOARD & KPIs
# ==========================


@router.get("/dashboard/stats")
async def get_compliance_dashboard(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return ComplianceService.get_compliance_stats(db, current_user)
