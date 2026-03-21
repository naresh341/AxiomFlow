from sqlalchemy import Column, Integer, String, JSON, DateTime
from datetime import datetime, timezone
from app.model.base import Base


class SecurityModel(Base):
    __tablename__ = "security_policies"

    id = Column(Integer, primary_key=True, index=True)
    organization_id = Column(Integer, index=True, unique=True)

    data = Column(JSON, default={})

    updated_by = Column(Integer, nullable=True)
    created_at = Column(DateTime, default=datetime.now(timezone.utc))
    updated_at = Column(
        DateTime,
        default=datetime.now(timezone.utc),
        onupdate=datetime.now(timezone.utc),
    )
