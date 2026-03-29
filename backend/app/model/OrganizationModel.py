from sqlalchemy import (
    JSON,
    Column,
    Integer,
    String,
    ForeignKey,
    DateTime,
    Boolean,
    Enum,
    Float,
)
from app.model.base import Base
from sqlalchemy.orm import relationship
from sqlalchemy.sql import func
import enum


class PlanName(str, enum.Enum):
    BASIC = "BASIC"
    PROFESSIONAL = "PROFESSIONAL"
    ENTERPRISE = "ENTERPRISE"


class BillingCycle(str, enum.Enum):
    MONTHLY = "MONTHLY"
    ANNUAL = "ANNUAL"


class SubscriptionStatus(str, enum.Enum):
    ACTIVE = "ACTIVE"
    EXPIRED = "EXPIRED"
    CANCELLED = "CANCELLED"


class Organization(Base):
    __tablename__ = "organizations"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    logo_url = Column(String, nullable=True)
    region = Column(String, nullable=True)
    timezone = Column(String, nullable=True)
    retention_years = Column(Integer, default=5)
    # organization_id = Column(Integer, ForeignKey("organizations.id"), unique=True)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())

    subscription = relationship(
        "OrganizationSubscription", back_populates="organization", uselist=False
    )
    billing = relationship(
        "OrganizationBilling", back_populates="organization", uselist=False
    )
    compliance = relationship(
        "OrganizationCompliance", back_populates="organization", uselist=False
    )
    security = relationship(
        "OrganizationSecurity", back_populates="organization", uselist=False
    )

    invoices = relationship("Invoice", back_populates="organization")
    payments = relationship("Payments", back_populates="organization")


class OrganizationSubscription(Base):
    __tablename__ = "organization_subscriptions"

    id = Column(Integer, primary_key=True)
    organization_id = Column(
        Integer, ForeignKey("organizations.id", ondelete="CASCADE"), unique=True
    )

    plan_name = Column(Enum(PlanName), default=PlanName.BASIC)
    billing_cycle = Column(Enum(BillingCycle), default=BillingCycle.MONTHLY)
    price = Column(Integer)

    status = Column(Enum(SubscriptionStatus), default=SubscriptionStatus.ACTIVE)
    renewal_date = Column(DateTime)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())
    addons = Column(JSON, nullable=True, default=list)

    organization = relationship("Organization", back_populates="subscription")


class OrganizationBilling(Base):
    __tablename__ = "organization_billing"

    id = Column(Integer, primary_key=True)
    organization_id = Column(
        Integer, ForeignKey("organizations.id", ondelete="CASCADE"), unique=True
    )

    billing_email = Column(String)
    billing_contact_name = Column(String)
    card_last4 = Column(String)
    card_expiry = Column(String)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())

    organization = relationship("Organization", back_populates="billing")


class OrganizationCompliance(Base):
    __tablename__ = "organization_compliance"

    id = Column(Integer, primary_key=True)
    organization_id = Column(
        Integer, ForeignKey("organizations.id", ondelete="CASCADE"), unique=True
    )

    soc2_status = Column(String)
    gdpr_status = Column(String)
    hipaa_status = Column(String)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())

    organization = relationship("Organization", back_populates="compliance")


class OrganizationSecurity(Base):
    __tablename__ = "organization_security"

    id = Column(Integer, primary_key=True)
    organization_id = Column(
        Integer, ForeignKey("organizations.id", ondelete="CASCADE"), unique=True
    )

    mfa_enabled = Column(Boolean, default=False)
    biometric_enabled = Column(Boolean, default=False)
    created_at = Column(DateTime, default=func.now())
    updated_at = Column(DateTime, onupdate=func.now())

    organization = relationship("Organization", back_populates="security")


class Payment(Base):
    __tablename__ = "payments"

    id = Column(Integer, primary_key=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"))
    amount = Column(Integer)
    status = Column(String)
    provider = Column(String)
    transaction_id = Column(String)
    created_at = Column(DateTime, default=func.now())

    organization = relationship("Organization", back_populates="payments")


class Invoice(Base):
    __tablename__ = "invoices"

    id = Column(Integer, primary_key=True)
    organization_id = Column(Integer, ForeignKey("organizations.id"))

    amount = Column(Float)
    status = Column(String)  # PAID, PENDING, FAILED
    created_at = Column(DateTime)
    invoice_number = Column(String)

    organization = relationship("Organization", back_populates="invoices")
