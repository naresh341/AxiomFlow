from app.model.approval import Approval
from app.model.execution import Execution
from app.model.task import Task
from app.model.workflow import Workflow
from app.model.WorkflowVersion import WorkflowVersion
from app.repositories.workflow_repo import WorkflowRepository
from app.schemas.WorkflowSchema import WorkflowCreate
from sqlalchemy import desc
from sqlalchemy.orm import Session


class WorkflowService:
    def __init__(self, db: Session):
        self.db = db
        self.repo = WorkflowRepository(db)

    def list_workflows(self, status: str = None):
        return self.repo.list_all(status=status)

    def get_workflow_by_id(self, workflow_id: str):
        if "WRKFLW-" in workflow_id:
            return (
                self.db.query(Workflow)
                .filter(Workflow.workflow_id_str == workflow_id)
                .first()
            )
        else:
            return self.db.query(Workflow).filter(Workflow.id == workflow_id).first()

    def generate_worflow_id(self) -> str:
        prefix = "WRKFLW-"
        last_workflow = self.db.query(Workflow).order_by(desc(Workflow.id)).first()
        if not last_workflow or not getattr(last_workflow, "workflow_id_str", None):
            return f"{prefix}001"
        try:
            last_id_str = last_workflow.workflow_id_str
            current_num_str = last_id_str.split("-")[1]
            next_sum = int(current_num_str)
            return f"{prefix}{next_sum:03d}"
        except (IndexError, ValueError):
            return f"{prefix}001"

    def create_workflow(self, workflow_data: WorkflowCreate):
        # 1. Create the main Workflow
        generated_id = self.generate_worflow_id()
        new_workflow = Workflow(
            name=workflow_data.name,
            trigger=workflow_data.trigger,
            owner_id=workflow_data.owner_id,
            status="DRAFT",
            workflow_id_str=generated_id,
        )
        self.db.add(new_workflow)
        self.db.commit()
        self.db.refresh(new_workflow)

        # 2. Create the first version with the canvas data
        new_version = WorkflowVersion(
            workflow_id=new_workflow.id,
            definition=workflow_data.definition,
            version="1.0.0",
            is_active=True,
        )
        self.db.add(new_version)
        self.db.commit()

        return new_workflow

    def activate_workflow(self, workflow_id: int):
        workflow = self.db.get(Workflow, workflow_id)
        if not workflow:
            raise ValueError("Workflow not found")

        workflow.status = "ACTIVE"
        self.db.commit()
        return workflow

    def get_workflow_by_status(self, workflow_id_str: str, model):
        workflow = self.get_workflow_by_id(workflow_id_str)
        if not workflow:
            return None

        if workflow.status in ["ACTIVE", "ARCHIVED"]:
            active_version = next((v for v in workflow.versions if v.is_active), None)
            if not active_version:
                return []
            return self.db.query(model).filter(model.id == active_version.id).all()

        return (
            self.db.query(model)
            .filter(model.workflow_id == workflow.id, model.workflow_version_id == None)
            .all()
        )

    # def get_workflow_task(self, workflow_id_str: str):
    #     workflow = self.get_workflow_by_id(workflow_id_str)
    #     if not workflow:
    #         return None

    #     if workflow.status == "ACTIVE":
    #         active_version = (
    #             self.db.query(WorkflowVersion)
    #             .filter(
    #                 WorkflowVersion.workflow_id == workflow.id,
    #                 WorkflowVersion.is_active == True,
    #             )
    #             .first()
    #         )
    #         if not active_version:
    #             return []

    #         return (
    #             self.db.query(Task)
    #             .filter(Task.workflow_version_id == active_version.id)
    #             .order_by(Task.priority.asc())
    #             .all()
    #         )
    #     else:
    #         return (
    #             self.db.query(Task)
    #             .filter(
    #                 Task.workflow_id == workflow.id, Task.workflow_version_id == None
    #             )
    #             .order_by(Task.priority.asc())
    #             .all()
    #         )
