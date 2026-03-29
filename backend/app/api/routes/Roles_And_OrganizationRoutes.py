# routes.py
from typing import List

from app.core.dependencies import get_db
from app.core.security import get_current_user
from app.model.UserModel import User
from app.schemas.Roles_And_OrganizationSchema import (
    OrganizationSchema,
    RoleCreateSchema,
    RoleResponseSchema,
    updateSchema,
)
from app.services.Roles_And_OrganizationService import (
    create_organization,
    create_role,
    delete_role,
    get_organization,
    get_roles,
    update_organization,
    update_role,
)
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

router = APIRouter(prefix="/rolesAndOrg", tags=["Organization"])


# Organization
@router.get("/organization/{org_id}", response_model=OrganizationSchema)
def fetch_organization(org_id: int, db: Session = Depends(get_db)):
    return get_organization(db, org_id)


@router.put("/updateOrganization/{org_id}")
def modify_organization(
    org_id: int, org_data: OrganizationSchema, db: Session = Depends(get_db)
):
    return update_organization(db, org_id, org_data.dict())


@router.post("/createOrganization", response_model=OrganizationSchema)
def add_organization(org_data: OrganizationSchema, db: Session = Depends(get_db)):
    org = create_organization(db=db, data=org_data.dict())
    return org


@router.get("/roles", response_model=List[RoleResponseSchema])
def fetch_roles(
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    return get_roles(db, user)


@router.post("/rolesCreate")
def add_role(
    role_data: RoleCreateSchema,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    return create_role(db, role_data.model_dump(), user)


@router.put("/updateRoles/{role_id}")
def modify_role(
    role_id: int,
    role_data: updateSchema,
    db: Session = Depends(get_db),
    user: User = Depends(get_current_user),
):
    return update_role(db, role_id, role_data.dict(), user)


@router.delete("/deleteRoles/{role_id}")
def remove_role(role_id: int, db: Session = Depends(get_db)):
    return delete_role(db, role_id)
