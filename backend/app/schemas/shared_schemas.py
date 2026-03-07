from datetime import datetime
from typing import Any, List, Optional

from pydantic import BaseModel, ConfigDict

from .TeamSchemas import TeamRead
from .UserSchema import UserRead


class UserReadWithTeams(UserRead):
    teams: List[TeamRead] = []


class TeamReadWithMembers(TeamRead):
    users: List[UserRead] = []


class AuditLogResponse(BaseModel):
    id: int
    user_display_name: str
    actor_id: Optional[int]
    actor_type: str
    action_type: str
    description: str
    resource_type: str
    resource_id: Optional[int]
    service: Optional[str]
    event: Optional[str]
    severity: str
    status: str
    old_values: Optional[Any] = None
    new_values: Optional[Any] = None
    created_at: datetime
    role: Optional[str] = None
    dept: Optional[str] = None
    resource: Optional[str] = None
    device: Optional[str] = None
    model_info: Optional[str] = None
    location: Optional[str] = None
    ip_address: Optional[str] = None
    actor: Optional[UserRead] = None

    model_config = ConfigDict(from_attributes=True)
