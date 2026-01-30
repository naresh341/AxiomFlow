from pydantic import BaseModel, ConfigDict
from datetime import datetime


class WorflowSchema(BaseModel):
    id: int
    name: str
    status: str
    trigger: str
    owner_name: str = "System"
    versions: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class WorkflowResponse(BaseModel):
    data: list[WorflowSchema]
