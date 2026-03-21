from sqlalchemy.orm import Session
from app.model.WorkflowVersion import WorkflowVersion
from app.model.workflow import Workflow


class WorkflowVersionService:
    def __init__(self, db: Session):
        self.db = db

    def generate_version_key(self):
        last_version = (
            self.db.query(WorkflowVersion).order_by(WorkflowVersion.id.desc()).first()
        )
        prefix = "VER-"
        if not last_version or not last_version.version_key:
            return f"{prefix}001"
        try:
            last_number = int(last_version.version_key.split("-")[1])
            return f"{prefix}{last_number + 1:03d}"
        except (IndexError, ValueError):
            return f"{prefix}001"

    def create_version(
        self, workflow_id: int, version: str, created_by: int, definition: dict = None
    ):
        workflow = self.db.get(Workflow, workflow_id)
        if not workflow:
            raise ValueError("Workflow not found")

        version_key = self.generate_version_key()

        version_obj = WorkflowVersion(
            workflow_id=workflow.id,
            workflow_id_str=workflow.workflow_id_str,
            version_key=version_key,
            version=version,
            is_active=False,
            created_by=created_by,
            definition=definition,
        )
        self.db.add(version_obj)
        self.db.commit()
        self.db.refresh(version_obj)
        return version_obj

    def activate_version(self, version_id: int):
        version = self.db.get(WorkflowVersion, version_id)
        if not version:
            raise ValueError("Workflow version not found")

        # Deactivate other versions
        self.db.query(WorkflowVersion).filter(
            WorkflowVersion.workflow_id == version.workflow_id
        ).update({"is_active": False})

        version.is_active = True
        self.db.commit()
        return version

    def get_active_version(self, workflow_id: int):
        return (
            self.db.query(WorkflowVersion)
            .filter(
                WorkflowVersion.workflow_id == workflow_id,
                WorkflowVersion.is_active.is_(True),
            )
            .first()
        )

    def list_versions(self, workflow_id: int):
        return (
            self.db.query(WorkflowVersion)
            .filter(WorkflowVersion.workflow_id == workflow_id)
            .order_by(WorkflowVersion.created_at.desc())
            .all()
        )
