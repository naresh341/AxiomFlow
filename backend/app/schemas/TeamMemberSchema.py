from pydantic import BaseModel, ConfigDict
from datetime import datetime
from enum import Enum
from typing import Optional


class UserRole(str, Enum):
    ADMIN = "ADMIN"
    MANAGER = "MANAGER"
    EMPLOYEE = "EMPLOYEE"


class Status(str, Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"
    ARCHIVED = "ARCHIVED"


class TeamMemberBase(BaseModel):
    user_id: int
    team_id: int
    status: Status = Status.ACTIVE
    lead_id: Optional[int] = None


class TeamMemberRead(TeamMemberBase):
    joined_at: datetime

    model_config = ConfigDict(from_attributes=True)
