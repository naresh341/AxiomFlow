from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.core.dependencies import get_db
from app.services.workflow_service import WorkflowService
from app.workflows.schemas import WorflowSchema, WorkflowResponse

router = APIRouter(prefix="/workflows", tags=["Workflows"])


@router.get("/fetchAll", response_model=list[WorflowSchema])
def list_workflows(
    db: Session = Depends(get_db),
):
    return WorkflowService(db).list_workflows()


@router.get("/{workflow_id}", response_model=WorkflowResponse)
def get_workflow(
    workflow_id: int,
    db: Session = Depends(get_db),
):
    workflow = WorkflowService(db).get_workflow_by_id(workflow_id)

    if not workflow:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail="Workflow not found"
        )

    return workflow
