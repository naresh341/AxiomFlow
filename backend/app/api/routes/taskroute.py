from typing import Optional

from app.core.dependencies import get_db
from app.services.task_service import TaskService
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

router = APIRouter(prefix="/tasks", tags=["TASK"])


@router.get("/fetchAll")
def fetch_task(
    db: Session = Depends(get_db),
    status: Optional[str] = None,
    workflow_id: Optional[int] = None,
):
    service = TaskService(db)
    tasks = service.list_task(workflow_id=workflow_id, status=status)

    return {"total": len(tasks), "data": tasks}
