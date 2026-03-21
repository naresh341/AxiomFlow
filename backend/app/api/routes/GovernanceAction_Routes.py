from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.services.GovernanceActionService import (
    enable_override_access,
    lock_roles_access,
    break_glass_access,
)

from app.core.security import get_current_user
from app.model.GovernanceActionModel import GovernanceAction, GovernanceStatus
from app.core.dependencies import get_db
from app.schemas.GovernanceActionSchema import (
    GovernanceResponse,
    OverrideRequest,
    RoleLockRequest,
    BreakGlassRequest,
)

router = APIRouter(prefix="/governance", tags=["Governance"])


@router.post("/override", response_model=GovernanceResponse)
def enable_override(
    data: OverrideRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return enable_override_access(db, user_id=current_user.id, data=data)


@router.post("/lock-roles", response_model=GovernanceResponse)
def lock_roles(
    data: RoleLockRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return lock_roles_access(db, user_id=current_user.id, data=data)


@router.post("/break-glass", response_model=GovernanceResponse)
def break_glass(
    data: BreakGlassRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user),
):
    return break_glass_access(db, user_id=current_user.id, data=data)


@router.get("/status")
def get_governance_status(db: Session = Depends(get_db)):
    # Query for any ACTIVE actions in the database
    active_actions = (
        db.query(GovernanceAction.action_type)
        .filter(GovernanceAction.status == GovernanceStatus.ACTIVE)
        .all()
    )

    # Convert the list of results into a simple set for easy lookup
    # e.g., {'override', 'role_lock', 'break_glass'}
    active_types = {action[0] for action in active_actions}

    return {
        "override_active": "override" in active_types,
        "roles_locked": "role_lock" in active_types,
        "break_glass_active": "break_glass" in active_types,
    }
