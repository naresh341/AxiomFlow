from app.model.AuditLogsModel import AuditActionType, AuditActorType
from app.model.FeatureFlagModel import FeatureFlag
from app.services.auditLogsService import AuditService
from sqlalchemy.orm import Session


def create_flag(db: Session, data, user):
    flag = FeatureFlag(**data.model_dump(), created_by=user.id)
    db.add(flag)
    db.commit()
    db.refresh(flag)

    AuditService(db).write_log(
        actor_id=user.id,
        actor_type=AuditActorType.USER,
        action=AuditActionType.CREATE,
        resource_type="FEATURE_FLAG",
        resource_id=flag.id,
        resource_path="/feature-flags",
        description=f"Created feature flag {flag.key}",
        new_values=data.model_dump(),
        user_obj=user,
    )

    return flag


# GET ALL
def get_all_flags(db: Session):
    return db.query(FeatureFlag).all()


# GET ONE
def get_flag_by_id(db: Session, flag_id: int):
    return db.query(FeatureFlag).filter(FeatureFlag.id == flag_id).first()


# TOGGLE
def toggle_flag(db: Session, flag_id: int, user):
    flag = get_flag_by_id(db, flag_id)

    if not flag:
        return None

    old_value = {"is_enabled": flag.is_enabled}

    flag.is_enabled = not flag.is_enabled
    db.commit()
    db.refresh(flag)

    AuditService(db).write_log(
        actor_id=user.id,
        actor_type=AuditActorType.USER,
        action=AuditActionType.FEATURE_FLAG_TOGGLE,
        resource_type="FEATURE_FLAG",
        resource_id=flag.id,
        resource_path=f"/feature-flags/{flag.id}/toggle",
        description=f"Toggled feature flag {flag.key}",
        old_values=old_value,
        new_values={"is_enabled": flag.is_enabled},
        user_obj=user,
    )

    return flag


# UPDATE ROLLOUT
def update_rollout(db: Session, flag_id: int, percentage: int):
    flag = get_flag_by_id(db, flag_id)

    if not flag:
        return None

    flag.rollout_percentage = percentage
    db.commit()
    db.refresh(flag)

    return flag


# UPDATE FULL FLAG
def update_flag(db: Session, flag_id: int, data):
    flag = get_flag_by_id(db, flag_id)

    if not flag:
        return None

    update_data = data.model_dump(exclude_unset=True)

    for key, value in update_data.items():
        setattr(flag, key, value)
        
        
    db.commit()
    db.refresh(flag)

    return flag


# DELETE
def delete_flag(db: Session, flag_id: int):
    flag = get_flag_by_id(db, flag_id)

    if not flag:
        return None

    db.delete(flag)
    db.commit()

    return True
