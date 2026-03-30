from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from typing import List, Optional
from app.core.dependencies import get_db
from app.model.AuditLogsModel import AuditActorType, AuditStatus
from app.services.auditLogsService import AuditService

router = APIRouter(prefix="/governance", tags=["Governance"])


@router.get("/audit-logs")
def fetch_audit_logs(
    page: int = 1,
    limit: int = 10,
    actor_type: Optional[AuditActorType] = None,
    status: Optional[AuditStatus] = None,
    search: Optional[str] = None,
    service: Optional[str] = None,
    db: Session = Depends(get_db),
):
    audit_service = AuditService(db)

    return audit_service.get_audit_logs(
        page=page,
        limit=limit,
        actor_type=actor_type,
        status=status,
        search=search,
        service=service,
    )
