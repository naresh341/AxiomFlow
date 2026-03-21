from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional, Dict, List


class Task(BaseModel):
    id: int
    task_key: str
    workflow_id: int
    workflow_version_id: Optional[int] = None
    execution_id: Optional[int] = None
    name: str
    type: str
    assignee_id: Optional[int] = None
    assignee_role: Optional[str] = None
    priority: int = 5
    input_data: Optional[Dict] = None
    status: str
    retry_count: int = 0
    output_data: Optional[Dict] = None
    error_message: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    due_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class TaskSchema(BaseModel):
    total: int
    data: List[Task]


class TaskCreate(BaseModel):
    name: str
    type: str
    input_data: Optional[Dict] = None
    priority: Optional[int] = None
    assignee_id: Optional[int] = None
    assignee_role: Optional[str] = None
    due_at: Optional[datetime] = None


class TaskUpdate(BaseModel):
    name: Optional[str] = None
    type: Optional[str] = None
    priority: Optional[int] = None
    assignee_id: Optional[int] = None
    assignee_role: Optional[str] = None
    input_data: Optional[Dict] = None
    status: Optional[str] = None
    due_at: Optional[datetime] = None
