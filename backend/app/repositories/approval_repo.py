from app.model.approval import Approval
from app.repositories.base import BaseRepository


class ApprovalRepository(BaseRepository):
    def __init__(self, db):
        self.db = db

    def create(self, approval: Approval):
        self.db.add(approval)
        self.db.commit()
        self.db.refresh(approval)
        return approval

    def get_pending_by_workflow(self, workflow_id: int):
        return (
            self.db.query(Approval)
            .filter(Approval.workflow_id == workflow_id, Approval.status == "PENDING")
            .all()
        )

    def update_status(self, approval: Approval, status: str):
        approval.status = status
        self.db.commit()
        self.db.refresh(approval)
        return approval
