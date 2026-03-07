from sqlalchemy import Column, Integer, String, ForeignKey, Enum, DateTime, func
from sqlalchemy.orm import relationship
from app.model.base import Base
import enum


# --- Enums ---
class RegulationType(enum.Enum):
    HIPAA = "HIPAA"
    GDPR = "GDPR"
    SOC2 = "SOC2"
    ISO27001 = "ISO27001"
    INTERNAL = "INTERNAL"


class RiskLevel(enum.Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"
    CRITICAL = "CRITICAL"


class LikelihoodLevel(enum.Enum):
    LOW = "LOW"
    MEDIUM = "MEDIUM"
    HIGH = "HIGH"


class EvidenceStatus(enum.Enum):
    VALID = "VALID"
    EXPIRED = "EXPIRED"
    UNDER_REVIEW = "UNDER_REVIEW"


class RiskStatus(str, enum.Enum):
    OPEN = "OPEN"
    MITIGATED = "MITIGATED"
    ACCEPTED = "ACCEPTED"
    CLOSED = "CLOSED"


# --- Tables ---
class CompliancePolicy(Base):
    __tablename__ = "compliance_policies"
    id = Column(Integer, primary_key=True, index=True)
    policy_code = Column(String, unique=True)
    name = Column(String, nullable=False)
    description = Column(String)
    regulation_type = Column(Enum(RegulationType))
    risk_level = Column(Enum(RiskLevel))
    owner_id = Column(Integer, ForeignKey("users.id"))
    responsible_team_id = Column(Integer, ForeignKey("teams.id"))
    status = Column(String, default="draft")  # draft, active, archived
    effective_from = Column(DateTime)
    review_frequency = Column(String)
    next_review_date = Column(DateTime)
    created_at = Column(DateTime, server_default=func.now())
    updated_at = Column(DateTime, server_default=func.now(), onupdate=func.now())
    # documents = relationship("PolicyDocument", back_populates="policy")
    controls = relationship("ComplianceControl", back_populates="policy")
    risks = relationship(
        "ComplianceRisk", back_populates="policy", cascade="all, delete-orphan"
    )
    documents = relationship(
        "PolicyDocument", back_populates="policy", cascade="all, delete-orphan"
    )


class PolicyDocument(Base):
    __tablename__ = "policy_documents"
    id = Column(Integer, primary_key=True)
    policy_id = Column(Integer, ForeignKey("compliance_policies.id"))
    document_name = Column(String)
    file_path = Column(String)
    uploaded_by = Column(Integer, ForeignKey("users.id"))
    uploaded_at = Column(DateTime, server_default=func.now())
    policy = relationship("CompliancePolicy", back_populates="documents")


class ComplianceControl(Base):
    __tablename__ = "compliance_controls"
    id = Column(Integer, primary_key=True)
    policy_id = Column(Integer, ForeignKey("compliance_policies.id"))
    control_code = Column(String)
    title = Column(String)
    description = Column(String)
    owner_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String, default="active")
    created_at = Column(DateTime, server_default=func.now())
    policy = relationship("CompliancePolicy", back_populates="controls")
    evidence = relationship("ComplianceEvidence", back_populates="control")


class ComplianceEvidence(Base):
    __tablename__ = "compliance_evidence"
    id = Column(Integer, primary_key=True)
    evidence_name = Column(String)
    control_id = Column(Integer, ForeignKey("compliance_controls.id"))
    collection_date = Column(DateTime)
    description = Column(String)
    file_path = Column(String)
    uploaded_by = Column(Integer, ForeignKey("users.id"))
    status = Column(Enum(EvidenceStatus), default=EvidenceStatus.UNDER_REVIEW)
    created_at = Column(DateTime, server_default=func.now())

    control = relationship("ComplianceControl", back_populates="evidence")


class ComplianceRisk(Base):
    __tablename__ = "compliance_risks"
    id = Column(Integer, primary_key=True)
    policy_id = Column(Integer, ForeignKey("compliance_policies.id"), nullable=True)
    risk_code = Column(String, unique=True, index=True)
    category = Column(String)
    risk_title = Column(String)
    description = Column(String)
    impact = Column(Enum(RiskLevel))
    likelihood = Column(Enum(LikelihoodLevel))
    risk_score = Column(Integer)
    risk_owner_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    status = Column(Enum(RiskStatus), default=RiskStatus.OPEN, nullable=False)
    mitigation_plan = Column(String)
    identified_at = Column(DateTime, server_default=func.now())
    created_at = Column(DateTime, server_default=func.now())
    resolved_at = Column(DateTime, nullable=True)
    policy = relationship("CompliancePolicy", back_populates="risks")
