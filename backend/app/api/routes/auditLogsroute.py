from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.dependencies import get_db
from app.schemas.shared_schemas import AuditLogResponse
from app.model.AuditLogsModel import AuditLog, AuditActorType

router = APIRouter(prefix="/governance", tags=["Governance"])


@router.get("/audit-logs", response_model=List[AuditLogResponse])
def fetch_audit_logs(
    actor_type: Optional[AuditActorType] = None,
    service: Optional[str] = None,
    db: Session = Depends(get_db),
):
    query = db.query(AuditLog)

    if actor_type:
        query = query.filter(AuditLog.actor_type == actor_type)

    if service:
        query = query.filter(AuditLog.service == service)

    return query.order_by(AuditLog.created_at.desc()).all()
