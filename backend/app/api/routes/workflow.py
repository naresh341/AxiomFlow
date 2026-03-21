from app.core.dependencies import get_db
from app.model.approval import Approval
from app.model.execution import Execution
from app.model.task import Task
from app.schemas.TaskSchema import TaskCreate, TaskUpdate
from app.schemas.WorkflowSchema import WorflowSchema, WorkflowCreate, WorkflowResponse
from app.services.workflow_service import WorkflowService
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.schemas.WorkflowVersionSchema import (
    WorkflowVersionCreate,
    WorkflowVersionSchema,
    UpdateWorkflowVersion,
)
from app.schemas.ExecutionSchema import (
    ExecutionBase,
    ExecutionCreate,
    ExecutionResponse,
)

router = APIRouter(prefix="/workflows", tags=["Workflows"])


@router.get("/fetchAll", response_model=WorkflowResponse)
def list_workflows(
    status: str = None,
    db: Session = Depends(get_db),
):
    return WorkflowService(db).list_workflows(status=status)


@router.get("/{workflow_id}", response_model=WorflowSchema)
def get_workflow(
    workflow_id: str,
    db: Session = Depends(get_db),
):
    workflow = WorkflowService(db).get_workflow_by_id(workflow_id)

    if not workflow:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Workflow not found"
        )

    return workflow


@router.post(
    "/create", response_model=WorflowSchema, status_code=status.HTTP_201_CREATED
)
def create_workflow(workflow_data: WorkflowCreate, db: Session = Depends(get_db)):
    return WorkflowService(db).create_workflow(workflow_data)


@router.get("/{workflow_id}/tasks")
def get_tasks(workflow_id: str, db: Session = Depends(get_db)):
    return WorkflowService(db).get_workflow_by_status(workflow_id, Task)


@router.get("/{workflow_id}/approvals")
def get_approvals_for_workflow(workflow_id: str, db: Session = Depends(get_db)):
    service = WorkflowService(db)
    approvals = service.get_workflow_by_status(workflow_id, Approval)

    if approvals is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Workflow not found"
        )

    return approvals


@router.get("/{workflow_id}/executions")
def get_executions_for_workflow(workflow_id: str, db: Session = Depends(get_db)):
    service = WorkflowService(db)
    executions = service.get_workflow_by_status(workflow_id, Execution)

    if executions is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Workflow not found"
        )

    return executions


@router.get("/{workflow_id}/versions")
def get_versions_for_workflow(workflow_id: str, db: Session = Depends(get_db)):
    service = WorkflowService(db)
    # versions = service.get_workflow_by_status(workflow_id, WorkflowVersion)
    versions = service.get_versions_for_workflow(workflow_id)

    if versions is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Workflow not found"
        )

    return {"total": len(versions), "data": versions}


@router.post("/{workflow_id}/tasks")
def create_task_for_workflow(
    workflow_id: str, payload: TaskCreate, db: Session = Depends(get_db)
):
    return WorkflowService(db).create_task_for_workflow(workflow_id, payload)


@router.get("/tasks/global")
def get_global_tasks(db: Session = Depends(get_db)):
    return WorkflowService(db).get_global_tasks()


@router.put("/tasksUpdate/{task_id}")
def update_task(task_id: int, payload: TaskUpdate, db: Session = Depends(get_db)):
    return WorkflowService(db).update_task(task_id, payload)


@router.delete("/deletetasks/{task_id}")
def delete_task(task_id: int, db: Session = Depends(get_db)):
    return WorkflowService(db).delete_task(task_id)


# ==================================== Version=============================


@router.post("/{workflow_id}/createVersions")
def create_version_for_workflow(
    workflow_id: str, payload: WorkflowVersionCreate, db: Session = Depends(get_db)
):
    service = WorkflowService(db)
    version = service.create_version_for_workflow(workflow_id, payload)
    return version


@router.put("/{workflow_id}/updateVersions", response_model=WorkflowVersionSchema)
def update_workflow_version(
    workflow_id: int,
    payload: UpdateWorkflowVersion,
    db: Session = Depends(get_db),
):
    service = WorkflowService(db)

    try:
        return service.update_version(workflow_id, payload.dict())
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.delete("/{workflow_id}/deleteVersion")
def delete_workflow_version(
    workflow_id: int,
    db: Session = Depends(get_db),
):
    service = WorkflowService(db)

    try:
        return service.delete_version(workflow_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


# ============================ Execution ======================================
@router.post("/{workflow_id}/executions", response_model=ExecutionCreate)
def start_execution(
    workflow_id: str,
    payload: dict,
    db: Session = Depends(get_db),
):
    service = WorkflowService(db)

    try:
        return service.start_execution(workflow_id, payload)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.put("/executions/{execution_id}", response_model=ExecutionBase)
def finish_execution(
    execution_id: int,
    payload: dict,
    db: Session = Depends(get_db),
):
    service = WorkflowService(db)

    try:
        return service.finish_execution(execution_id, payload)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))


@router.delete("/executions/{execution_id}")
def delete_execution(
    execution_id: int,
    db: Session = Depends(get_db),
):
    service = WorkflowService(db)

    try:
        return service.delete_execution(execution_id)
    except ValueError as e:
        raise HTTPException(status_code=404, detail=str(e))
