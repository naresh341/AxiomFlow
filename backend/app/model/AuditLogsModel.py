import enum
from datetime import datetime, timezone
from sqlalchemy import (
    Column,
    Integer,
    String,
    Text,
    Enum,
    ForeignKey,
    JSON,
    DateTime,
    Index,
)
from sqlalchemy.orm import relationship
from app.model.base import Base


class SeverityLevel(str, enum.Enum):
    DEBUG = "DEBUG"
    INFO = "INFO"
    WARNING = "WARNING"
    ERROR = "ERROR"
    CRITICAL = "CRITICAL"


class AuditStatus(str, enum.Enum):
    SUCCESS = "SUCCESS"
    FAILED = "FAILED"


class AuditActorType(str, enum.Enum):
    USER = "USER"
    ADMIN = "ADMIN"
    SYSTEM = "SYSTEM"


class AuditActionType(str, enum.Enum):
    # CRUD Actions
    CREATE = "CREATE"
    UPDATE = "UPDATE"
    DELETE = "DELETE"

    # Auth Actions
    LOGIN = "LOGIN"
    LOGOUT = "LOGOUT"
    PASSWORD_CHANGE = "PASSWORD_CHANGE"

    # Access Actions
    ASSIGN_ROLE = "ASSIGN_ROLE"
    REVOKE_ACCESS = "REVOKE_ACCESS"

    # System Actions
    SYSTEM_JOB = "SYSTEM_JOB"
    BACKUP = "BACKUP"
    OTHER = "OTHER"


class AuditLog(Base):
    __tablename__ = "audit_logs"
    __table_args__ = {"extend_existing": True}

    id = Column(Integer, primary_key=True)
    actor_id = Column(
        Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    actor_type = Column(Enum(AuditActorType), nullable=False)

    # --- NEW METADATA COLUMNS ---
    user_display_name = Column(String(100), nullable=True)
    role = Column(String(50), nullable=True)
    dept = Column(String(50), nullable=True)
    location = Column(String(100), nullable=True)
    resource = Column(String(255), nullable=True)
    device = Column(String(100), nullable=True)
    model_info = Column(String(100), nullable=True)
    # ----------------------------

    action_type = Column(Enum(AuditActionType), nullable=False)
    description = Column(Text, nullable=False)

    resource_type = Column(String(50), nullable=False)
    resource_id = Column(Integer, nullable=True)

    old_values = Column(JSON, nullable=True)
    new_values = Column(JSON, nullable=True)

    ip_address = Column(String(45), nullable=True)
    status = Column(Enum(AuditStatus), default=AuditStatus.SUCCESS, nullable=False)
    created_at = Column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    service = Column(String(50), nullable=True, index=True)
    event = Column(String(100), nullable=True)
    severity = Column(Enum(SeverityLevel), default=SeverityLevel.INFO, index=True)

    actor = relationship("User")


Index("ix_audit_actor_created", AuditLog.actor_type, AuditLog.created_at)
