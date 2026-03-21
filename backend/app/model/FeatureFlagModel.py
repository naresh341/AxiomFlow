from sqlalchemy import Column, Integer, String, Boolean, DateTime, Text
from datetime import datetime
from app.model.base import Base
from sqlalchemy.sql import func


class FeatureFlag(Base):
    __tablename__ = "feature_flags"

    id = Column(Integer, primary_key=True, index=True)

    name = Column(String, nullable=False)
    key = Column(String, unique=True, nullable=False, index=True)

    description = Column(Text, nullable=True)

    flag_type = Column(String, default="on_off")

    is_enabled = Column(Boolean, default=False)

    rollout_percentage = Column(Integer, default=0)

    scope = Column(String, default="global")

    created_by = Column(String, nullable=True)
    updated_by = Column(String, nullable=True)
    type = Column(String, default="release")

    created_at = Column(DateTime, default=func.now(), onupdate=func.now())
    updated_at = Column(DateTime, default=func.now(), onupdate=func.now())
