from datetime import datetime, timezone
from sqlalchemy import Column, DateTime, Enum, Integer, String
from app.model.base import Base
from sqlalchemy.orm import relationship




class Workflow(Base):
    __tablename__ = "workflows"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    status = Column(Enum("ACTIVE", "DRAFT", "ARCHIVED",name="workflow_status"), default="DRAFT")
    trigger = Column(String)
    owner_id = Column(Integer)
    created_at = Column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )
    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
    )
    # ---------- Relationships ----------

    versions = relationship(
        "WorkflowVersion",
        back_populates="workflow",
        cascade="all, delete-orphan",
    )

    tasks = relationship(
        "Task",
        back_populates="workflow",
        cascade="all, delete-orphan",
    )

    approvals = relationship(
        "Approval",
        back_populates="workflow",
        cascade="all, delete-orphan",
    )

    executions = relationship(
        "Execution",
        back_populates="workflow",
        cascade="all, delete-orphan",
    )
