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


# Helpful index for analytics & dashboards
Index(
    "ix_executions_workflow_status",
    Execution.workflow_id,
    Execution.status,
)
