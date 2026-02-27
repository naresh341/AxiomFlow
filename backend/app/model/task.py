from datetime import datetime, timezone

from app.model.base import Base
from sqlalchemy import (
    JSON,
    Column,
    DateTime,
    Enum,
    ForeignKey,
    Integer,
    String,
)
from sqlalchemy.orm import relationship


class Task(Base):
    __tablename__ = "tasks"

    # ─────────────────────────────
    # Identity
    # ─────────────────────────────
    id = Column(Integer, primary_key=True, index=True)

    task_key = Column(
        String(100),
        nullable=False,
        index=True,
        comment="Stable task identifier across workflow versions (e.g. approve_invoice)",
    )

    name = Column(String(255), nullable=False)

    type = Column(
        String(50),
        nullable=False,
        comment="USER_TASK | SYSTEM_TASK | APPROVAL_TASK | WEBHOOK_TASK",
    )

    # ─────────────────────────────
    # Workflow Context
    # ─────────────────────────────
    workflow_id = Column(
        Integer,
        ForeignKey("workflows.id", ondelete="CASCADE"),
        nullable=False,
    )

    workflow_version_id = Column(
        Integer,
        ForeignKey("workflow_versions.id", ondelete="CASCADE"),
        nullable=True,
    )

    execution_id = Column(
        Integer,
        ForeignKey("executions.id", ondelete="CASCADE"),
        nullable=True,
        comment="Populated only when workflow is ACTIVE and executing",
    )

    # ─────────────────────────────
    # Assignment
    # ─────────────────────────────
    assignee_id = Column(
        Integer,
        nullable=True,
    )

    assignee_role = Column(
        String(100),
        nullable=True,
        comment="Used when task is role-based instead of user-based",
    )

    # ─────────────────────────────
    # Status & Control
    # ─────────────────────────────
    status = Column(
        Enum(
            "PENDING",
            "IN_PROGRESS",
            "COMPLETED",
            "FAILED",
            "SKIPPED",
            name="task_status",
        ),
        default="PENDING",
        nullable=False,
    )

    priority = Column(Integer, server_default="5", default=5, nullable=False)

    retry_count = Column(Integer, server_default="0", default=0, nullable=False)

    error_message = Column(String, nullable=True)

    # ─────────────────────────────
    # Data Payloads
    # ─────────────────────────────
    input_data = Column(
        JSON, nullable=True, comment="Data required to execute the task"
    )

    output_data = Column(JSON, nullable=True, comment="Result produced by the task")

    # ─────────────────────────────
    # Timing / SLA
    # ─────────────────────────────
    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    started_at = Column(DateTime(timezone=True), nullable=True)

    completed_at = Column(DateTime(timezone=True), nullable=True)

    due_at = Column(DateTime(timezone=True), nullable=True)

    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    # ─────────────────────────────
    # Relationships
    # ─────────────────────────────
    workflow = relationship("Workflow", back_populates="tasks")
    workflow_version = relationship("WorkflowVersion", back_populates="tasks")
    execution = relationship(
        "Execution",
        back_populates="tasks",
        foreign_keys=[execution_id],
    )

    # ─────────────────────────────
    # Task key Auto genrated
    # ─────────────────────────────

    @property
    def formatted_key(self):
        return f"TSK-{self.id:03d}"
