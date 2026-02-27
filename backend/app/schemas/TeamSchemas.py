from datetime import datetime
from typing import TYPE_CHECKING, List, Optional
from pydantic import BaseModel

if TYPE_CHECKING:
    from .UserSchema import UserRead


class TeamBase(BaseModel):
    name: str
    description: Optional[str] = None
    is_active: bool = True


class TeamCreate(TeamBase):
    pass  # Usually same as base


class TeamRead(TeamBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# This version includes the users
class TeamReadWithMembers(TeamRead):
    users: List["UserRead"] = []


from app.schemas.UserSchema import UserRead

TeamReadWithMembers.model_rebuild()
