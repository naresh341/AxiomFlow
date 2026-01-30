from sqlalchemy.orm import Session
from app.model.approval import Approval


class ApprovalService:
    def __init__(self, db: Session):
        self.db = db

    def request_approval(
        self,
        workflow_id: int,
        requester_id: int,
        stage: str,
        sla_hours: int,
    ):
        approval = Approval(
            workflow_id=workflow_id,
            requester_id=requester_id,
            stage=stage,
            sla_hours=sla_hours,
            status="PENDING",
        )
        self.db.add(approval)
        self.db.commit()
        self.db.refresh(approval)
        return approval

    def approve(self, approval_id: int, approver_id: int):
        approval = self.db.get(Approval, approval_id)
        if not approval:
            raise ValueError("Approval not found")

        approval.status = "APPROVED"
        approval.approver_id = approver_id
        self.db.commit()
        return approval
