from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional, Dict, Any
from enum import Enum


class VersionStatus(str, Enum):
    ACTIVE = "ACTIVE"
    DRAFT = "DRAFT"
    ARCHIVED = "ARCHIVED"


class WorkflowVersionBase(BaseModel):
    workflow_id_str: str
    version_key: str
    version: str
    status: VersionStatus = VersionStatus.ACTIVE
    is_active: bool = True
    definition: Optional[Dict[str, Any]] = None
    created_by: Optional[str] = None


class WorkflowVersionCreate(BaseModel):
    version: str
    is_active: bool = True
    definition: Optional[Dict[str, Any]] = None


class WorkflowVersionSchema(WorkflowVersionBase):
    id: int
    workflow_id: int
    created_at: Optional[datetime] = None

    model_config = ConfigDict(from_attributes=True)


class UpdateWorkflowVersion(BaseModel):
    version: Optional[str]
    is_active: Optional[bool]
