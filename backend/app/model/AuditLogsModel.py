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
    SUCCESS = "success"
    FAILED = "failed"


class AuditActorType(str, enum.Enum):
    USER = "user"
    ADMIN = "admin"
    SYSTEM = "system"


class AuditActionType(str, enum.Enum):
    # CRUD Actions
    CREATE = "create"
    UPDATE = "update"
    DELETE = "delete"

    # Auth Actions
    LOGIN = "login"
    LOGOUT = "logout"
    PASSWORD_CHANGE = "password_change"

    # Access Actions
    ASSIGN_ROLE = "assign_role"
    REVOKE_ACCESS = "revoke_access"

    # System Actions
    SYSTEM_JOB = "system_job"
    BACKUP = "backup"
    OTHER = "other"


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True)
    actor_id = Column(
        Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True
    )
    actor_type = Column(Enum(AuditActorType), nullable=False)

    action_type = Column(Enum(AuditActionType), nullable=False)
    action_description = Column(Text, nullable=False)

    resource_type = Column(String(50), nullable=False)  # e.g., "team", "user"
    resource_id = Column(Integer, nullable=True)

    old_values = Column(JSON, nullable=True)
    new_values = Column(JSON, nullable=True)

    ip_address = Column(String(45), nullable=True)
    status = Column(Enum(AuditStatus), default=AuditStatus.SUCCESS, nullable=False)
    created_at = Column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    service = Column(
        String(50), nullable=True, index=True
    )  # auth-service, team-service
    event = Column(String(100), nullable=True)  # USER_LOGIN, TEAM_CREATED
    severity = Column(Enum(SeverityLevel), default=SeverityLevel.INFO, index=True)

    actor = relationship("User")


Index("ix_audit_actor_created", AuditLog.actor_type, AuditLog.created_at)
