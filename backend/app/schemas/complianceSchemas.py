from datetime import datetime
from typing import List, Optional

from pydantic import BaseModel, ConfigDict, Field

# ==========================================
# 1. POLICIES & DOCUMENTS
# ==========================================


class PolicyBase(BaseModel):
    name: str
    description: Optional[str] = None
    regulation_type: str
    risk_level: str
    owner_id: int
    responsible_team_id: int
    status: str = "draft"
    review_frequency: str


class PolicyCreate(PolicyBase):
    name: str
    description: str
    regulation_type: str
    risk_level: str
    responsible_team_id: int
    effective_from: datetime
    review_frequency: str
    next_review_date: datetime
    owner_id: int


class PolicyRead(PolicyBase):
    id: int
    policy_code: str
    effective_from: Optional[datetime]
    next_review_date: Optional[datetime]
    created_at: datetime
    updated_at: Optional[datetime]
    model_config = ConfigDict(from_attributes=True)
    status: str


class DocumentRead(BaseModel):
    id: int
    policy_id: int
    document_name: str
    file_path: str
    uploaded_by: int
    uploaded_at: datetime

    model_config = ConfigDict(from_attributes=True)


# ==========================================
# 2. CONTROLS & EVIDENCE
# ==========================================


class ControlRead(BaseModel):
    id: int
    policy_id: int
    control_code: str
    title: str
    description: Optional[str]
    owner_id: int
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class EvidenceRead(BaseModel):
    id: int
    evidence_name: str
    control_code: Optional[str] = None
    control_id: int
    collection_date: datetime
    description: Optional[str]
    file_path: str
    uploaded_by: int
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class EvidenceCreate(BaseModel):
    evidence_name: str
    description: Optional[str] = None
    collection_date: datetime


# ==========================================
# 3. RISK MANAGEMENT
# ==========================================


class RiskCreate(BaseModel):
    category: str
    risk_title: str
    description: Optional[str] = None
    impact: str
    likelihood: str
    mitigation_plan: Optional[str] = None


class RiskRead(BaseModel):
    risk_owner_id: Optional[int] = None
    id: int
    risk_code: str
    policy_id: Optional[int] = None
    category: str
    risk_title: str
    impact: str
    likelihood: str
    risk_score: int
    status: str
    identified_at: datetime
    description: Optional[str] = None
    mitigation_plan: Optional[str] = None
    resolved_at: Optional[datetime]
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ComplianceKPI(BaseModel):
    active_policies: int
    open_risks: int
    critical_risks: int
    pending_evidence: int
