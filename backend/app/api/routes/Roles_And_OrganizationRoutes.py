# routes.py
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.services.Roles_And_OrganizationService import (
    get_organization,
    update_organization,
    get_roles,
    create_role,
    update_role,
    delete_role,
    create_organization,
)
from app.schemas.Roles_And_OrganizationSchema import OrganizationSchema, RoleSchema
from app.core.dependencies import get_db
from typing import List

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


@router.get("/{org_id}/roles", response_model=List[RoleSchema])
def fetch_roles(org_id: int, db: Session = Depends(get_db)):
    return get_roles(db, org_id)


@router.post("/{org_id}/rolesCreate")
def add_role(org_id: int, role_data: RoleSchema, db: Session = Depends(get_db)):
    return create_role(db, org_id, role_data.model_dump())


@router.put("/updateRoles/{role_id}")
def modify_role(role_id: int, role_data: RoleSchema, db: Session = Depends(get_db)):
    return update_role(db, role_id, role_data.dict())


@router.delete("/deleteRoles/{role_id}")
def remove_role(role_id: int, db: Session = Depends(get_db)):
    return delete_role(db, role_id)
