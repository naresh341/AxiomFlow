from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class IntegrationBase(BaseModel):
    name: str
    key: str
    category: str
    description: Optional[str]
    source: str


class IntegrationCreate(IntegrationBase):
    pass


class IntegrationResponse(IntegrationBase):
    id: int

    class Config:
        from_attributes = True


class ConnectIntegrationRequest(BaseModel):
    integration_id: int
    access_token: Optional[str] = None
    refresh_token: Optional[str] = None
    source: str


class UserIntegrationResponse(BaseModel):
    id: int
    integration_id: Optional[int] = None
    custom_integration_id: Optional[int] = None
    user_id: int
    status: str
    created_at: datetime
    source: Optional[str] = None

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


class MappingSchema(BaseModel):
    source: str
    target: str
    direction: str
    # type: str
    # required: bool


class MappingPayload(BaseModel):
    mappings: List[MappingSchema]


class CustomIntegrationCreate(BaseModel):
    name: str
    type: str
    description: str
    mappings: Optional[List[MappingSchema]] = None


class CustomIntegrationResponse(CustomIntegrationCreate):
    id: int

    class Config:
        from_attributes = True
