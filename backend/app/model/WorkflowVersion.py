from datetime import datetime, timezone
from sqlalchemy import Column, String, Integer, Boolean, ForeignKey, DateTime
from app.model.base import Base
from sqlalchemy.orm import relationship


class WorkflowVersion(Base):
    __tablename__ = "workflow_versions"
    id = Column(Integer, primary_key=True)
    workflow_id = Column(Integer, ForeignKey("workflows.id"),nullable=False)
    version = Column(String)
    is_active = Column(Boolean, default=True)
    created_by = Column(Integer)
    created_at = Column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )

    workflow = relationship("Workflow", back_populates="versions")
