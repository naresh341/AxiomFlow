from sqlalchemy.orm import Session
from app.model.WorkflowVersion import WorkflowVersion


class WorkflowVersionService:
    def __init__(self, db: Session):
        self.db = db

    def create_version(
        self,
        workflow_id: int,
        version: str,
        created_by: int,
    ):
        """
        Create a new INACTIVE version.
        Activation is a separate operation.
        """
        version_obj = WorkflowVersion(
            workflow_id=workflow_id,
            version=version,
            is_active=False,
            created_by=created_by,
        )
        self.db.add(version_obj)
        self.db.commit()
        self.db.refresh(version_obj)
        return version_obj

    def activate_version(self, version_id: int):
        """
        Activate a version and deactivate all others.
        Enforces single active version per workflow.
        """
        version = self.db.get(WorkflowVersion, version_id)
        if not version:
            raise ValueError("Workflow version not found")

        # Deactivate all versions of the workflow
        self.db.query(WorkflowVersion).filter(
            WorkflowVersion.workflow_id == version.workflow_id
        ).update({"is_active": False})

        # Activate selected version
        version.is_active = True
        self.db.commit()
        return version

    def get_active_version(self, workflow_id: int):
        """
        Used during execution.
        """
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


# def assert_version_editable(self, version_id: int):
#     version = self.db.get(WorkflowVersion, version_id)
#     if not version:
#         raise ValueError("Version not found")

#     if version.is_active:
#         raise ValueError("Active workflow version cannot be modified")

#     return version
