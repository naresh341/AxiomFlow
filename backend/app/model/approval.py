from datetime import datetime, timezone
from sqlalchemy import (
    Column,
    Integer,
    String,
    Enum,
    ForeignKey,
    DateTime,
)
from sqlalchemy.orm import relationship
from app.model.base import Base


class Approval(Base):
    __tablename__ = "approvals"

    id = Column(Integer, primary_key=True)

    workflow_id = Column(
        Integer,
        ForeignKey("workflows.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )

    requester_id = Column(Integer, nullable=False)

    approver_id = Column(Integer, nullable=True, index=True)

    status = Column(
        Enum(
            "PENDING",
            "APPROVED",
            "REJECTED",
            "ESCALATED",
            name="approval_status",
        ),
        default="PENDING",
        nullable=False,
        index=True,
    )

    stage = Column(String(100), nullable=False)

    sla_hours = Column(Integer, nullable=False)

    created_at = Column(
        DateTime(timezone=True),
        default=lambda: datetime.now(timezone.utc),
        nullable=False,
    )

    workflow = relationship(
        "Workflow",
        back_populates="approvals",
    )
