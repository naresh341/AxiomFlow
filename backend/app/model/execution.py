from datetime import datetime, timezone
from sqlalchemy import (
    Column,
    Integer,
    String,
    Enum,
    ForeignKey,
    DateTime,
    Text,
    Index,
)
from sqlalchemy.orm import relationship
from app.model.base import Base


class Execution(Base):
    __tablename__ = "executions"

    id = Column(Integer, primary_key=True)

    task_id = Column(Integer, ForeignKey("tasks.id"))

    workflow_version_id = Column(Integer, ForeignKey("workflow_versions.id"))
    # 1. Human-readable Execution ID (EXEC-001)
    execution_id_str = Column(String(50), unique=True, nullable=False)

    # 2. Workflow ID String (e.g., WRKFLW-001)
    workflow_id_str = Column(String(50), nullable=False)

    # 3. Keys for task and approval tracking
    task_key = Column(String(100), nullable=True)

    approval_key = Column(String(100), nullable=True)

    workflow_id = Column(
        Integer,
        ForeignKey("workflows.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    status = Column(
        Enum(
            "RUNNING",
            "SUCCESS",
            "FAILED",
            name="execution_status",
        ),
        default="RUNNING",
        nullable=False,
        index=True,
    )

    started_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    finished_at = Column(
        DateTime(timezone=True),
        nullable=True,
    )

    logs = Column(Text, nullable=True)

    triggered_by = Column(
        String(50),  # user_id / system / scheduler
        nullable=False,
        default="system",
    )

    # ---------- Relationships ----------
    workflow = relationship(
        "Workflow",
        back_populates="executions",
    )

    tasks = relationship(
        "Task",
        back_populates="execution",
        foreign_keys="Task.execution_id",
    )

    workflow_version = relationship("WorkflowVersion", back_populates="executions")


# Helpful index for analytics & dashboards
Index(
    "ix_executions_workflow_status",
    Execution.workflow_id,
    Execution.status,
)
