from datetime import datetime, timezone
from sqlalchemy import (
    Column,
    String,
    Enum,
    Integer,
    ForeignKey,
    DateTime,
)
from sqlalchemy.orm import relationship
from app.model.base import Base


class Task(Base):
    __tablename__ = "tasks"

    id = Column(Integer, primary_key=True)

    workflow_id = Column(
        Integer,
        ForeignKey("workflows.id", ondelete="CASCADE"),
        nullable=False,
    )

    name = Column(String(255), nullable=False)

    status = Column(
        Enum(
            "PENDING",
            "IN_PROGRESS",
            "COMPLETED",
            "FAILED",
            name="task_status",
        ),
        default="PENDING",
        nullable=False,
    )

    type = Column(String(100), nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    updated_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        onupdate=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    workflow = relationship(
        "Workflow",
        back_populates="tasks",
    )
