from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import List, Optional


class Approval(BaseModel):
    id: int
    workflow_id: int
    approval_key: str
    requester_id: int
    approver_id: Optional[int] = None
    status: str
    stage: str
    sla_hours: int
    created_at: datetime
    updated_at: datetime
    priority: int
    requester_name: str
    model_config = ConfigDict(from_attributes=True)


class ApprovalSchema(BaseModel):
    total: int
    data: List[Approval]
