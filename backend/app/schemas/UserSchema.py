from datetime import datetime
from enum import Enum
from typing import List

from pydantic import BaseModel, EmailStr

from .TeamSchemas import TeamRead


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
    status: Status = Status.ACTIVE


class UserCreate(UserBase):
    password: str  # Only used when creating a user


class UserRead(UserBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# This version includes the teams (to avoid circular imports)
class UserReadWithTeams(UserRead):
    teams: List["TeamRead"] = []


from app.schemas.TeamSchemas import TeamRead

UserReadWithTeams.model_rebuild()
