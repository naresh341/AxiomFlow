from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class HistoryBase(BaseModel):
    approval_id: int
    action_by_name: str
    action_taken: str
    comments: Optional[str] = None


class HistoryCreate(HistoryBase):
    pass  


class HistoryRead(HistoryBase):
    id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True
