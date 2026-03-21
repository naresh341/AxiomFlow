from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.core.security import get_current_user

from app.services.security_service import (
    get_policy,
    update_policy,
    add_allowed_ip,
    remove_allowed_ip,
)

router = APIRouter(prefix="/security", tags=["Security"])


@router.get("/getSecurity/{org_id}")
def fetch_policy(
    org_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)
):
    return get_policy(db, org_id)


@router.put("/UpdateSecurity/{org_id}")
def modify_policy(
    org_id: int,
    payload: dict,
    db: Session = Depends(get_db),
    user=Depends(get_current_user),
):
    return update_policy(db, org_id, payload, user.id)


@router.post("/{org_id}/network/ip")
def add_ip(
    org_id: int, ip: str, db: Session = Depends(get_db), user=Depends(get_current_user)
):
    return add_allowed_ip(db, org_id, ip)


@router.delete("/{org_id}/network/ip")
def remove_ip(
    org_id: int, ip: str, db: Session = Depends(get_db), user=Depends(get_current_user)
):
    return remove_allowed_ip(db, org_id, ip)
