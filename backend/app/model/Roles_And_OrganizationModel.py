from sqlalchemy import Column, Integer, String, Boolean, ForeignKey, JSON
from sqlalchemy.orm import relationship
from app.model.base import Base


class Organization(Base):
    __tablename__ = "organizations"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    domain = Column(String, unique=True, nullable=False)
    logo_url = Column(String, nullable=True)
    timezone = Column(String, default="UTC")
    language = Column(String, default="en")
    sso_enabled = Column(Boolean, default=True)
    mfa_enabled = Column(Boolean, default=False)
    session_timeout = Column(Integer, default=60)
    password_policy = Column(String, default="standard")


class Role(Base):
    __tablename__ = "roles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, nullable=False)
    description = Column(String)
    organization_id = Column(Integer, ForeignKey("organizations.id"))
    organization = relationship("Organization", back_populates="roles")
    permissions = Column(JSON, default={})
    mfa_required = Column(Boolean, default=False)
    ip_restricted = Column(Boolean, default=False)
    role_code = Column(String, nullable=True)



class Permission(Base):
    __tablename__ = "permissions"
    id = Column(Integer, primary_key=True)
    role_id = Column(Integer, ForeignKey("roles.id"))
    module = Column(String)
    action = Column(String)


Organization.roles = relationship(
    "Role", back_populates="organization", cascade="all, delete"
)
