from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class Addon(BaseModel):
    name: str
    price: int
    enabled: bool


class OrganizationBase(BaseModel):
    name: Optional[str] = None
    region: Optional[str] = None
    timezone: Optional[str] = None
    retention_years: Optional[int] = None


class OrganizationRead(OrganizationBase):
    id: int
    logo_url: Optional[str] = None
    subscription: Optional["SubscriptionRead"] = None
    billing: Optional["BillingRead"] = None
    compliance: Optional["ComplianceRead"] = None
    security: Optional["SecurityRead"] = None

    class Config:
        from_attributes = True


class OrganizationUpdate(BaseModel):
    name: Optional[str] = None
    region: Optional[str] = None
    timezone: Optional[str] = None
    retention_years: Optional[int] = None


class LogoUploadResponse(BaseModel):
    logo_url: str
    organization: OrganizationRead


class OrganizationCreate(BaseModel):
    name: str
    region: Optional[str] = None
    timezone: Optional[str] = None


class SubscriptionBase(BaseModel):
    plan_name: str
    billing_cycle: str
    price: int
    addons: Optional[List[Addon]] = []


class SubscriptionRead(SubscriptionBase):
    status: str
    renewal_date: Optional[datetime]

    class Config:
        from_attributes = True


class SubscriptionUpdate(BaseModel):
    plan_name: Optional[str] = None
    billing_cycle: Optional[str] = None
    price: Optional[int] = None
    addons: Optional[List[Addon]] = None


class BillingBase(BaseModel):
    billing_email: Optional[str]
    billing_contact_name: Optional[str]


class BillingRead(BillingBase):
    card_last4: Optional[str]
    card_expiry: Optional[str]

    class Config:
        from_attributes = True


class BillingUpdate(BaseModel):
    billing_email: Optional[str] = None
    billing_contact_name: Optional[str] = None
    card_last4: Optional[str] = None
    card_expiry: Optional[str] = None


class ComplianceRead(BaseModel):
    soc2_status: Optional[str]
    gdpr_status: Optional[str]
    hipaa_status: Optional[str]

    class Config:
        from_attributes = True


class SecurityRead(BaseModel):
    mfa_enabled: bool
    biometric_enabled: bool

    class Config:
        from_attributes = True


class SecurityUpdate(BaseModel):
    mfa_enabled: bool
    biometric_enabled: bool


class OrganizationFullRead(BaseModel):
    organization: OrganizationRead
    subscription: Optional[SubscriptionRead]
    billing: Optional[BillingRead]
    compliance: Optional[ComplianceRead]
    security: Optional[SecurityRead]


OrganizationRead.model_rebuild()
