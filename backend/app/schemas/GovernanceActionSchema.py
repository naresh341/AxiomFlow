from datetime import datetime
from typing import Dict, Optional

from pydantic import BaseModel


class GovernanceBase(BaseModel):
    metadata: Optional[Dict] = None


class OverrideRequest(GovernanceBase):
    justification: str
    mfa_code: str
    duration: str
    metadata: Optional[dict] = {}


class RoleLockRequest(GovernanceBase):
    justification: str
    duration: Optional[str]


class BreakGlassRequest(GovernanceBase):
    mfa_code: str
    justification: Optional[str] = "Emergency Break-Glass Access Triggered"


class GovernanceResponse(BaseModel):
    id: int
    action_type: str
    status: str
    created_at: datetime

    class Config:
        from_attributes = True
