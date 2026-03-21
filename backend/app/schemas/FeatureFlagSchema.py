from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from pydantic import Field


class FeatureFlagBase(BaseModel):
    name: str
    key: str
    description: Optional[str] = None
    flag_type: str = "on_off"
    rollout_percentage: Optional[int] = Field(default=0, ge=0, le=100)
    scope: Optional[str] = "global"
    type: Optional[str] = "release"


class FeatureFlagCreate(FeatureFlagBase):
    pass


class FeatureFlagUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    flag_type: Optional[str] = None
    rollout_percentage: Optional[int] = Field(default=0, ge=0, le=100)
    scope: Optional[str] = None
    is_enabled: Optional[bool] = None


class FeatureFlagResponse(FeatureFlagBase):
    id: int
    is_enabled: bool
    created_at: datetime
    updated_at: Optional[datetime]

    class Config:
        from_attributes = True
        extra = "ignore"
