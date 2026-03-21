from sqlalchemy import Column, Integer, String, ForeignKey, Text, DateTime
from app.model.base import Base
from datetime import datetime, timezone


class Integration(Base):
    __tablename__ = "integrations"

    id = Column(Integer, primary_key=True)
    name = Column(String)
    key = Column(String, unique=True)  # salesforce, slack, github
    category = Column(String)
    description = Column(String)


class UserIntegration(Base):
    __tablename__ = "user_integrations"

    id = Column(Integer, primary_key=True)
    integration_id = Column(Integer, ForeignKey("integrations.id"))
    user_id = Column(Integer)
    access_token = Column(Text)
    refresh_token = Column(Text)
    status = Column(String)
    created_at = Column(
        DateTime(timezone=True), default=lambda: datetime.now(timezone.utc)
    )


class IntegrationAction(Base):
    __tablename__ = "integration_actions"

    id = Column(Integer, primary_key=True)
    integration_id = Column(Integer, ForeignKey("integrations.id"))
    action_key = Column(String)
    description = Column(String)
