from sqlalchemy import Column, Integer, String, ForeignKey, DateTime, Boolean
from app.model.base import Base


class Organization(Base):
    __tablename__ = "organizations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    logo_url = Column(String, nullable=True)
    region = Column(String, nullable=True)
    timezone = Column(String, nullable=True)
    retention_years = Column(Integer, default=5)


class OrganizationSubscription(Base):
    __tablename__ = "organization_subscriptions"

    id = Column(Integer, primary_key=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"))

    plan_name = Column(String)  # Basic / Pro / Enterprise
    billing_cycle = Column(String)  # Monthly / Annual
    price = Column(Integer)

    status = Column(String)  # active / expired
    renewal_date = Column(DateTime)


class OrganizationBilling(Base):
    __tablename__ = "organization_billing"

    id = Column(Integer, primary_key=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"))

    billing_email = Column(String)
    billing_contact_name = Column(String)
    card_last4 = Column(String)
    card_expiry = Column(String)


class OrganizationCompliance(Base):
    __tablename__ = "organization_compliance"

    id = Column(Integer, primary_key=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"))

    soc2_status = Column(String)
    gdpr_status = Column(String)
    hipaa_status = Column(String)


class OrganizationSecurity(Base):
    __tablename__ = "organization_security"

    id = Column(Integer, primary_key=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"))

    mfa_enabled = Column(Boolean, default=False)
    biometric_enabled = Column(Boolean, default=False)
