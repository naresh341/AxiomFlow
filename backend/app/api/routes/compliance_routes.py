from typing import List
from datetime import datetime
from app.core.dependencies import get_db
from app.core.security import get_current_user
from app.model.complianceModel import ComplianceEvidence
from app.model.UserModel import User
from app.schemas.complianceSchemas import (
    DocumentRead,
    EvidenceRead,
    PolicyCreate,
    PolicyRead,
    RiskCreate,
    RiskRead,
    EvidenceCreate,
)
from app.services.compliance_service import ComplianceService
from fastapi import APIRouter, Depends, File, Form, HTTPException, UploadFile
from sqlalchemy.orm import Session

router = APIRouter(prefix="/compliance", tags=["Compliance"])

# ==========================
# 1. POLICIES & DOCUMENTS
# ==========================


@router.get("/policies", response_model=List[PolicyRead])
async def get_all_policies(db: Session = Depends(get_db)):
    """Fetch all active and inactive policies"""
    return ComplianceService.get_all_policies(db)


@router.get("/policies/{policy_id}", response_model=PolicyRead)
async def get_policy_by_id(policy_id: int, db: Session = Depends(get_db)):
    """Fetch a single policy by its ID, including its associated risks"""
    policy = ComplianceService.get_policy(db, policy_id)
    if not policy:
        raise HTTPException(status_code=404, detail="Policy not found")
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
    user_id: int = 1,  # Replace with current_user dependency
    db: Session = Depends(get_db),
):
    """Uploads a PDF or document associated with a specific policy"""
    return await ComplianceService.upload_policy_document(db, policy_id, file, user_id)


# ==========================
# 2. CONTROLS & EVIDENCE
# ==========================


@router.get("/controls/evidence", response_model=List[EvidenceRead])
async def get_all_compliance_evidence(db: Session = Depends(get_db)):
    """Fetch all evidence for the global Evidence Tracker page"""

    return db.query(ComplianceEvidence).all()


@router.post("/controls/{control_id}/evidence", response_model=EvidenceRead)
async def submit_evidence(
    control_id: int,
    evidence_name: str = Form(...),
    collection_date: datetime = Form(...),
    description: str = Form(None),
    file: UploadFile = File(...),
    user_id: int = 1,
    db: Session = Depends(get_db),
):
    return await ComplianceService.upload_evidence(
        db,
        control_id,
        evidence_name,
        collection_date,
        description,
        file,
        user_id,
    )


# ==========================
# 3. RISK MANAGEMENT
# ==========================


@router.get("/risks", response_model=List[RiskRead])
async def get_all_risks(db: Session = Depends(get_db)):
    """Fetch all identified risks and their scores"""
    return ComplianceService.get_all_risks(db)


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


# ==========================
# 4. DASHBOARD & KPIs
# ==========================


@router.get("/dashboard/stats")
async def get_compliance_dashboard(db: Session = Depends(get_db)):
    """Calculates live KPI values for dashboard cards (e.g., Active Policies, Open Risks)"""
    return ComplianceService.get_compliance_stats(db)
