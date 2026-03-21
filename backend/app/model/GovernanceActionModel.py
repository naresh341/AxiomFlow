import enum
from datetime import datetime, timezone

from app.model.base import Base
from sqlalchemy import (
    JSON,
    Boolean,
    Column,
    DateTime,
    Enum,
    ForeignKey,
    Integer,
    String,
)


class GovernanceStatus(str, enum.Enum):
    ACTIVE = "ACTIVE"
    EXPIRED = "EXPIRED"
    REVOKED = "REVOKED"


class GovernanceAction(Base):
    __tablename__ = "governance_actions"

    id = Column(Integer, primary_key=True, index=True)

    action_type = Column(String, nullable=False)
    # "override", "role_lock", "break_glass"

    status = Column(Enum(GovernanceStatus), default=GovernanceStatus.ACTIVE)
    # active / expired / revoked

    justification = Column(String, nullable=False)

    action_metadata = Column(JSON, nullable=True)
    # store duration, policies affected, etc.

    is_mfa_verified = Column(Boolean, default=False)

    created_by = Column(Integer, ForeignKey("users.id"))

    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    expires_at = Column(DateTime, nullable=True)
