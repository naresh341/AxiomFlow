from datetime import datetime
from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, EmailStr

from .TeamSchemas import TeamRead

from pydantic import Field


class UserRole(str, Enum):
    ADMIN = "ADMIN"
    MANAGER = "MANAGER"
    EMPLOYEE = "EMPLOYEE"


class Status(str, Enum):
    ACTIVE = "ACTIVE"
    INACTIVE = "INACTIVE"
    ARCHIVED = "ARCHIVED"


class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    is_active: bool = True
    role: UserRole = UserRole.EMPLOYEE


class UserCreate(UserBase):
    password: str
    team_ids: List[int] = []


class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    email: Optional[EmailStr] = None
    role: Optional[UserRole] = None
    is_active: Optional[bool] = None
    status: Optional[Status] = None
    team_ids: Optional[List[int]] = None


class UserRead(UserBase):
    id: int
    status: Status
    created_at: datetime

    class Config:
        from_attributes = True


class UserReadWithTeams(UserRead):
    teams: List["TeamRead"] = Field(default_factory=list)


from app.schemas.TeamSchemas import TeamRead

UserReadWithTeams.model_rebuild()
