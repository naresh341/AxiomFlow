from typing import Optional

from app.core.dependencies import get_db
from app.services.task_service import TaskService
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.TaskSchema import TaskCreate, Task as TaskResponse, TaskUpdate

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


@router.post("/createTask", response_model=TaskResponse)
def create_task(payload: TaskCreate, db: Session = Depends(get_db)):
    service = TaskService(db)
    try:
        return service.create_task(payload)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.put("/updateTask/{task_id}", response_model=TaskResponse)
def update_task(task_id: int, payload: TaskUpdate, db: Session = Depends(get_db)):
    service = TaskService(db)

    try:
        return service.update_task(task_id, payload)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))


@router.delete("/deleteTask/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    service = TaskService(db)

    try:
        return service.delete_task(task_id)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))
