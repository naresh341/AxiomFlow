from sqlalchemy.orm import Session

from app.model.workflow import Workflow
from app.repositories.base import BaseRepository


class WorkflowRepository(BaseRepository):
    def __init__(self, db: Session):
        self.db = db

    def create(self, workflow: Workflow):
        self.db.add(workflow)
        self.db.commit()
        self.db.refresh(workflow)
        return workflow

    def list_all(self, status: str = None):
        query = self.db.query(Workflow)
        if status:
            query = query.filter(Workflow.status == status.upper())
        return query.all()

    def base_query(self, status: str = None):
        query = self.db.query(Workflow)

        if status:
            query = query.filter(Workflow.status == status.upper())

        return query.order_by(Workflow.id.desc())

    def get_by_id(self, workflow_id: int):
        return self.db.query(Workflow).filter(Workflow.id == workflow_id).first()

    def update_status(self, workflow: Workflow, status: str):
        workflow.status = status
        self.db.commit()
        self.db.refresh(workflow)
        return workflow
