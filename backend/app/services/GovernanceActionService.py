from app.model.GovernanceActionModel import GovernanceAction
from datetime import datetime, timezone, timedelta
from app.model.GovernanceActionModel import GovernanceStatus
from fastapi import HTTPException


# Update this function in your Python service
def enable_override_access(db, user_id, data):
    # 1. Check for existing active override
    existing = (
        db.query(GovernanceAction)
        .filter(
            GovernanceAction.action_type == "override",
            GovernanceAction.status == GovernanceStatus.ACTIVE,
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="An override is already active. Revoke it first.",
        )

    expires_at = None
    if data.duration == "1 Hour":
        expires_at = datetime.now(timezone.utc) + timedelta(hours=1)
    # If duration is "manual", expires_at stays None (permanent until revoked)

    # 3. Create the Action
    action = GovernanceAction(
        action_type="override",
        justification=data.justification,
        metadata=data.metadata,
        is_mfa_verified=True,
        created_by=user_id,
        expires_at=expires_at,
    )

    db.add(action)
    db.commit()
    db.refresh(action)
    return action


def lock_roles_access(db, user_id, data):

    existing = (
        db.query(GovernanceAction)
        .filter(
            GovernanceAction.action_type == "role_lock",
            GovernanceAction.status == GovernanceStatus.ACTIVE,
        )
        .first()
    )

    if existing:
        raise HTTPException(status_code=400, detail="Role lockdown is already active")

    expires_at = None

    if data.duration == "1 Hour":
        expires_at = datetime.now(timezone.utc) + timedelta(hours=1)
    elif data.duration == "24 Hours":
        expires_at = datetime.now(timezone.utc) + timedelta(hours=24)

    action = GovernanceAction(
        action_type="role_lock",
        justification=data.justification,
        metadata={"duration": data.duration},
        created_by=user_id,
        expires_at=expires_at,
    )

    db.add(action)
    db.commit()
    db.refresh(action)

    return action


def break_glass_access(db, user_id, data):

    existing = (
        db.query(GovernanceAction)
        .filter(
            GovernanceAction.action_type == "break_glass",
            GovernanceAction.status == GovernanceStatus.ACTIVE,
        )
        .first()
    )

    if existing:
        raise HTTPException(
            status_code=400,
            detail="Break-glass session already active. Resolve or expire it before creating a new one.",
        )

    action = GovernanceAction(
        action_type="break_glass",
        justification=getattr(data, "justification", "Emergency Break-Glass Protocol"),
        is_mfa_verified=True,
        created_by=user_id,
    )

    db.add(action)
    db.commit()
    db.refresh(action)

    return action
