from pydantic import BaseModel, ConfigDict, Field
from datetime import datetime
from app.schemas.WorkflowVersionSchema import WorkflowVersionSchema
from typing import Optional, Dict, Any


class WorflowSchema(BaseModel):
    id: int
    workflowID: str = Field(alias="workflow_id_str")
    name: str
    status: str
    trigger: Optional[str] = None
    owner_name: str = "System"
    versions: list[WorkflowVersionSchema]
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True, populate_by_name=True)


class WorkflowResponse(BaseModel):
    total: int
    data: list[WorflowSchema]


class WorkflowCreate(BaseModel):
    name: str
    trigger: str
    owner_id: int
    definition: Optional[Dict[str, Any]] = None
