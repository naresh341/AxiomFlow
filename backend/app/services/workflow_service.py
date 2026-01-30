from sqlalchemy.orm import Session
from app.model.workflow import Workflow
from app.model.WorkflowVersion import WorkflowVersion
from app.repositories.workflow_repo import WorkflowRepository
from app.model.task import Task
from app.model.approval import Approval
from app.model.execution import Execution
from app.model.WorkflowVersion import WorkflowVersion


class WorkflowService:
    def __init__(self, db: Session):
        self.db = db
        self.repo=WorkflowRepository(db)
    
    def list_workflows(self):
        # Call the repository method you already created
        return self.repo.list_all()
    
    def create_workflow(self, name: str, trigger: str, owner_id: int):
        workflow = Workflow(
            name=name,
            trigger=trigger,
            owner_id=owner_id,
        )
        self.db.add(workflow)
        self.db.commit()
        self.db.refresh(workflow)

        # Create initial version
        version = WorkflowVersion(
            workflow_id=workflow.id,
            version="v1.0.0",
            is_active=True,
            created_by=owner_id,
        )
        self.db.add(version)
        self.db.commit()

        return workflow

    def activate_workflow(self, workflow_id: int):
        workflow = self.db.get(Workflow, workflow_id)
        if not workflow:
            raise ValueError("Workflow not found")

        workflow.status = "ACTIVE"
        self.db.commit()
        return workflow
