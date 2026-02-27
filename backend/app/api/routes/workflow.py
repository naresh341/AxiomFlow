from app.core.dependencies import get_db
from app.model.approval import Approval
from app.model.execution import Execution
from app.model.task import Task
from app.model.WorkflowVersion import WorkflowVersion
from app.schemas.WorkflowSchema import WorflowSchema, WorkflowCreate
from app.services.workflow_service import WorkflowService
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

router = APIRouter(prefix="/workflows", tags=["Workflows"])


@router.get("/fetchAll", response_model=list[WorflowSchema])
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
def get_task_for_workflow(workflow_id: str, db: Session = Depends(get_db)):
    service = WorkflowService(db)
    tasks = service.get_workflow_by_status(workflow_id, Task)

    if tasks is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Workflow not found"
        )

    return tasks


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
    versions = service.get_workflow_by_status(workflow_id, WorkflowVersion)

    if versions is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Workflow not found"
        )

    return versions
