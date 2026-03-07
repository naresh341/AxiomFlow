from app.model.AuditLogsModel import (
    AuditActorType,
    AuditLog,
    AuditStatus,
    SeverityLevel,
)
from sqlalchemy.orm import Session


class AuditService:
    def __init__(self, db: Session):
        self.db = db

    def write_log(
        self,
        actor_id,
        actor_type,
        action,
        resource_type,
        description,
        user_obj=None,  # Pass the User DB object here
        meta_data=None,  # Pass dict: {"ip":..., "device":..., "location":...}
        new_data=None,
        old_data=None,
        resource_id=None,
        resource_path=None,  # The URL path /resource
        event=None,
        service="team-service",
        severity=SeverityLevel.INFO,
        status=AuditStatus.SUCCESS,
    ):
        log_entry = AuditLog(
            actor_id=actor_id,
            actor_type=actor_type,
            action_type=action,
            resource_type=resource_type,
            resource_id=resource_id,
            resource=resource_path,
            description=description,
            new_values=new_data,
            old_values=old_data,
            event=event,
            service=service,
            severity=severity,
            status=status,
            # Extract snapshots from user object
            user_display_name=f"{user_obj.first_name} {user_obj.last_name}"
            if user_obj
            else "System",
            role=getattr(user_obj, "role", None),
            dept=getattr(user_obj, "department", None),
            # Extract from meta_data dict
            ip_address=meta_data.get("ip") if meta_data else None,
            location=meta_data.get("location") if meta_data else None,
            device=meta_data.get("device") if meta_data else None,
            model_info=meta_data.get("model") if meta_data else None,
        )
        self.db.add(log_entry)
        self.db.commit()
