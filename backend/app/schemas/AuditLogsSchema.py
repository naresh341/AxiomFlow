# app/schemas/shared_schemas.py
from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional


class AuditLogResponse(BaseModel):
    id: int
    actor_id: Optional[int]
    actor_type: str
    action_type: str
    description: str

    user_display_name: str
    role: str
    dept: Optional[str] = None
    location: Optional[str] = None
    resource: Optional[str] = None  # The path
    device: Optional[str] = None
    model_info: Optional[str] = None

    resource_type: str
    resource_id: Optional[int]
    service: Optional[str]
    event: Optional[str]
    severity: str
    status: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
