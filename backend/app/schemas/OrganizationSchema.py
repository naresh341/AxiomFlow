from pydantic import BaseModel
from typing import Optional


class OrganizationBase(BaseModel):
    name: Optional[str] = None
    region: Optional[str] = None
    timezone: Optional[str] = None
    retention_years: Optional[int] = None


class OrganizationRead(OrganizationBase):
    id: int
    logo_url: Optional[str] = None

    class Config:
        from_attributes = True


class OrganizationUpdate(BaseModel):
    name: Optional[str] = None
    region: Optional[str] = None
    timezone: Optional[str] = None
    retention_years: Optional[int] = None


class LogoUploadResponse(BaseModel):
    logo_url: str


class OrganizationCreate(BaseModel):
    name: str
    region: Optional[str] = None
    timezone: Optional[str] = None
