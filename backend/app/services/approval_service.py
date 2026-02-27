from sqlalchemy.orm import Session
from app.model.approval import Approval
from sqlalchemy.sql import func
from app.model.ApprovalHistory import ApprovalHistory
from app.schemas.ApprovalHistorySchema import HistoryBase


class ApprovalService:
    def __init__(self, db: Session):
        self.db = db

    def request_approval(
        self,
        workflow_id: int,
        requester_id: int,
        stage: str,
        sla_hours: int,
        priority: int = 5,
    ):
        approval = Approval(
            workflow_id=workflow_id,
            requester_id=requester_id,
            stage=stage,
            sla_hours=sla_hours,
            status="PENDING",
            priority=priority,
        )
        self.db.add(approval)
        self.db.commit()
        self.db.refresh(approval)
        return approval

    def list_approval(self, status=str):
        query = self.db.query(Approval)
        if status == "PENDING":
            query = query.filter(Approval.status.in_(["PENDING", "ESCALATED"]))
        elif status == "HISTORY":
            query = query.filter(Approval.status.in_(["APPROVED", "REJECTED"]))

        approvals = query.all()
        return {"total": len(approvals), "data": approvals}


    def approve(self, approval_id: int, approver_id: int):
        approval = self.db.get(Approval, approval_id)
        if not approval:
            raise ValueError("Approval not found")

        approval.status = "APPROVED"
        approval.approver_id = approver_id
        self.db.commit()
        return approval

    # def update_apporval_status(
    #     self, approval_id: int, status, user_name: str, note: str
    # ):
    #     approval = self.db.query(Approval).filter(Approval.approval_key == approval_id).first()
    #     if not approval:
    #         return None
    #     approval.status = status.upper()
    #     approval.stage = "Completed" if status.upper() == "APPROVED" else "Closed"
    #     approval.updated_at = func.now()

    #     history_entry = ApprovalHistory(
    #         approval_id=approval_id,
    #         action_by_name=user_name,
    #         action_taken=status.upper(),
    #         comments=note,
    #     )
    #     self.db.add(history_entry)
    #     self.db.commit()
    #     self.db.refresh(approval)
    #     return approval

    def process_decission(self, data: HistoryBase):
        approval = (
            self.db.query(Approval).filter(Approval.id == data.approval_id).first()
        )

        if not approval:
            return None

        approval.status = data.action_taken.upper()

        if approval.status == "APPROVED":
            pass
        else:
            approval.stage = "CLOSED"

        history = ApprovalHistory(
            approval_id=data.approval_id,
            action_by_name=data.action_by_name,
            action_taken=data.action_taken,
            comments=data.comments,
        )

        self.db.add(history)
        self.db.commit()
        self.db.refresh(approval)

        return approval
