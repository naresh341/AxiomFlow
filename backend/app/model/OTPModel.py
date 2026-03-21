from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from datetime import datetime, timezone
from app.model.base import Base


class OTP(Base):
    __tablename__ = "OTP"

    id = Column(Integer, primary_key=True, index=True)

    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)

    action_type = Column(String, nullable=False)  # e.g. "OVERRIDE", "SECURITY_CHANGE"

    otp_hash = Column(String, nullable=False)

    expires_at = Column(DateTime, nullable=False)

    is_used = Column(Boolean, default=False)

    created_at = Column(DateTime, default=datetime.now(timezone.utc))
