from datetime import datetime, timezone
from sqlalchemy import (
    Column,
    String,
    Integer,
    Boolean,
    ForeignKey,
    DateTime,
    JSON,
    Enum,
)
from app.model.base import Base
from sqlalchemy.orm import relationship


class WorkflowVersion(Base):
    __tablename__ = "workflow_versions"
    id = Column(Integer, primary_key=True)
    workflow_id = Column(Integer, ForeignKey("workflows.id"), nullable=False)
    version_key = Column(String, nullable=False, unique=True)
    workflow_id_str = Column(String, nullable=False)
    version = Column(String)
    definition = Column(JSON, nullable=True)
    is_active = Column(Boolean, default=True)
    created_by = Column(String, nullable=True)
    created_at = Column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    status = Column(
        Enum("ACTIVE", "DRAFT", "ARCHIVED", name="version_status"), default="ACTIVE"
    )
    # ===============================  RELATIONSHIPS  ===============================
    workflow = relationship(
        "Workflow",
        back_populates="versions",
    )
    tasks = relationship(
        "Task", back_populates="workflow_version", cascade="all, delete-orphan"
    )
    approvals = relationship(
        "Approval", back_populates="workflow_version", cascade="all, delete-orphan"
    )
    executions = relationship("Execution", back_populates="workflow_version")
