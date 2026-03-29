from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime, JSON
from app.model.base import Base
from datetime import datetime, timezone
from sqlalchemy.orm import relationship


class Integration(Base):
    __tablename__ = "integrations"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    key = Column(String, unique=True)
    category = Column(String)
    description = Column(String)
    type = Column(String)  # API / OAuth etc

    source = Column(String)  # "system" | "custom"
    user_id = Column(Integer, nullable=True)  # NULL for system


class UserIntegration(Base):
    __tablename__ = "user_integrations"

    id = Column(Integer, primary_key=True)
    integration_id = Column(Integer, ForeignKey("integrations.id"))
    custom_integration_id = Column(
        Integer, ForeignKey("custom_integrations.id"), nullable=True
    )

    user_id = Column(Integer)
    access_token = Column(Text)
    refresh_token = Column(Text)
    status = Column(String)
    source = Column(String)
    created_at = Column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )


class IntegrationAction(Base):
    __tablename__ = "integration_actions"

    id = Column(Integer, primary_key=True)
    integration_id = Column(Integer, ForeignKey("integrations.id"))
    action_key = Column(String)
    description = Column(String)


class CustomIntegration(Base):
    __tablename__ = "custom_integrations"

    id = Column(Integer, primary_key=True, index=True)
    key = Column(String, unique=True, nullable=False)  # ✅ ADD THIS
    category = Column(String, nullable=False)
    name = Column(String, nullable=False)
    type = Column(String, nullable=False)
    description = Column(Text)
    user_id = Column(Integer, ForeignKey("users.id"))

    mappings = Column(JSON)

    user = relationship("User")
