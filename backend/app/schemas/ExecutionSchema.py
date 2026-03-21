from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class ExecutionBase(BaseModel):
    id: int
    execution_id_str: str
    workflow_id_str: str
    task_key: Optional[str] = None
    approval_key: Optional[str] = None
    status: str = "RUNNING"
    triggered_by: str = "system"
    logs: Optional[str] = None


class ExecutionCreate(ExecutionBase):
    task_id: Optional[int] = None


class ExecutionResponse(ExecutionBase):
    id: int
    started_at: Optional[datetime] = None
    finished_at: Optional[datetime] = None

    class Config:
        from_attributes = True
