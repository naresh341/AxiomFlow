# services.py
from sqlalchemy.orm import Session
from app.model.Roles_And_OrganizationModel import Organization, Role
import random
from fastapi import HTTPException

from app.model.UserModel import User
from app.GlobalException.GlobalExceptionError import AppException


# --- Organization ---
def get_organization(db: Session, org_id: int):
    org = db.query(Organization).filter(Organization.id == org_id).first()
    if not org:
        raise AppException(404, "ORG_NOT_FOUND", "Organization not found")
    return org


def create_organization(db: Session, data: dict):
    try:
        existing = (
            db.query(Organization).filter(Organization.domain == data["domain"]).first()
        )

        if existing:
            raise AppException(400, "DOMAIN_EXISTS", "Domain already exists")

        org = Organization(**data)
        db.add(org)
        db.commit()
        db.refresh(org)

        return org
    except Exception as e:
        db.rollback()
        raise AppException(
            500, "ORG_CREATE_FAILED", "Failed to create organization", str(e)
        )


def update_organization(db: Session, org_id: int, data: dict):
    try:
        org = get_organization(db, org_id)
        for key, value in data.items():
            setattr(org, key, value)
        db.commit()
        db.refresh(org)
        return org
    except Exception as e:
        db.rollback()
        raise AppException(
            500, "ORG_UPDATE_FAILED", "Failed to update organization", str(e)
        )


# --- Roles ---
def get_roles(db: Session, user: User):
    return db.query(Role).filter(Role.organization_id == user.organization_id).all()


def generate_role_code() -> str:
    """Generate a unique role code like RO-10293"""
    return f"RO-{random.randint(10000, 99999)}"


def create_role(db: Session, data: dict, user: User):
    try:
        # 🔒 ALWAYS take org from user
        org_id = user.organization_id

        data["organization_id"] = org_id

        if not data.get("role_code"):
            data["role_code"] = generate_role_code()

        role = Role(**data)
        db.add(role)
        db.commit()
        db.refresh(role)

        return role
    except Exception as e:
        db.rollback()
        raise AppException(500, "ROLE_CREATE_FAILED", "Failed to create role", str(e))


def update_role(db: Session, role_id: int, data: dict, user: User):
    try:
        role = db.query(Role).filter(Role.id == role_id).first()

        if not role:
            raise HTTPException(status_code=404, detail="Role not found")

        if role.organization_id != user.organization_id:
            raise HTTPException(status_code=403, detail="Unauthorized")

        for key, value in data.items():
            setattr(role, key, value)

        db.commit()
        db.refresh(role)
        return role
    except Exception as e:
        db.rollback()
        raise AppException(500, "ROLE_CREATE_FAILED", "Failed to create role", str(e))


def delete_role(db: Session, role_id: int, user: User):
    try:
        role = db.query(Role).filter(Role.id == role_id).first()

        if not role:
            raise HTTPException(status_code=404, detail="Role not found")

        if role.organization_id != user.organization_id:
            raise HTTPException(status_code=403, detail="Unauthorized")

        db.delete(role)
        db.commit()

        return {"detail": "Role deleted"}
    except Exception as e:
        db.rollback()
        raise AppException(500, "ROLE_UPDATE_FAILED", "Failed to update role", str(e))
