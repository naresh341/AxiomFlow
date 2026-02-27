from fastapi import APIRouter, HTTPException
from .data import WORKFLOWS
from ..schemas.Workflowschema import WorflowSchema, WorkflowResponse

router = APIRouter(prefix="/workflows", tags=["WorkFlows"])


@router.get("/", response_model=WorflowSchema)
def list_Workflow():
    return {"data": WORKFLOWS}


@router.get("/{workflow_id}", response_model=WorkflowResponse)
def get_Workflow(workflow_id: int):
    workflow = next((wf for wf in WORKFLOWS if wf["id"] == workflow_id), None)
    if not workflow:
        raise HTTPException(status_code=404, detail="WorkFlow Not Found")
    return workflow
