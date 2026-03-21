from pydantic import BaseModel
from typing import Optional
from datetime import datetime


class IntegrationBase(BaseModel):
    name: str
    key: str
    category: str
    description: Optional[str]


class IntegrationCreate(IntegrationBase):
    pass


class IntegrationResponse(IntegrationBase):
    id: int

    class Config:
        from_attributes = True


class UserIntegrationCreate(BaseModel):
    integration_id: int
    user_id: int
    access_token: Optional[str] = None
    refresh_token: Optional[str] = None
    status: str


class UserIntegrationResponse(BaseModel):
    id: int
    integration_id: int
    user_id: int
    status: str
    created_at: datetime

    class Config:
        from_attributes = True


class IntegrationActionCreate(BaseModel):
    integration_id: int
    action_key: str
    description: str


class IntegrationActionResponse(BaseModel):
    id: int
    integration_id: int
    action_key: str
    description: str

    class Config:
        from_attributes = True
