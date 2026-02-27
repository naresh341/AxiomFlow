from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional, Dict


class Task(BaseModel):
    # --------------------
    # Identity
    # --------------------
    id: int
    task_key: str

    workflow_id: int
    workflow_version_id: Optional[int] = None
    execution_id: Optional[int] = None

    # --------------------
    # Core Definition (Builder-owned)
    # --------------------
    name: str
    type: str

    assignee_id: Optional[int] = None
    assignee_role: Optional[str] = None

    priority: int = 5

    input_data: Optional[Dict] = None

    # --------------------
    # Runtime (Engine-owned)
    # --------------------
    status: str

    retry_count: int = 0
    output_data: Optional[Dict] = None
    error_message: Optional[str] = None

    # --------------------
    # Timeline
    # --------------------
    created_at: datetime
    updated_at: datetime

    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    due_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class TaskSchema(BaseModel):
    total: int
    data: list[Task]
