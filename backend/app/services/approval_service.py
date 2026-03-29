from datetime import datetime

from app.GlobalException.GlobalExceptionError import AppException
from app.model.approval import Approval
from app.model.ApprovalHistory import ApprovalHistory
from app.schemas.ApprovalHistorySchema import HistoryBase
from sqlalchemy import String, func
from sqlalchemy.orm import Session


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

    def list_approval(
        self,
        status: str = None,
        page: int = 1,
        limit: int = 10,
        search: str = None,
        priority: str = None,
        date: str = None,
    ):
        query = self.db.query(Approval)

        # Pending tab logic
        if status == "PENDING":
            query = query.filter(Approval.status == "PENDING")

        elif status == "ESCALATED":
            query = query.filter(Approval.status == "ESCALATED")
        elif status == "APPROVED":
            query = query.filter(Approval.status == "APPROVED")
        elif status == "REJECTED":
            query = query.filter(Approval.status == "REJECTED")

        elif status == "ALL_PENDING":
            query = query.filter(Approval.status.in_(["PENDING", "ESCALATED"]))

        # History tab logic
        elif status == "All":
            query = query.filter(Approval.status.in_(["APPROVED", "REJECTED"]))

        if search:
            search_term = f"%{search.lower()}%"
            query = query.filter(
                func.lower(Approval.approval_key).like(search_term)
                | func.lower(Approval.stage).like(search_term)
                | func.cast(Approval.requester_name, String).like(search_term)
            )

        if priority and priority != "All":
            if priority == "High":
                query = query.filter(Approval.priority >= 8)
            elif priority == "Medium":
                query = query.filter(Approval.priority.between(5, 7))
            elif priority == "Low":
                query = query.filter(Approval.priority <= 4)

        if date:
            selected_date = datetime.strptime(date, "%Y-%m-%d")

            query = query.filter(func.date(Approval.created_at) == selected_date.date())

        total = query.count()

        offset = (page - 1) * limit
        approvals = query.offset(offset).limit(limit).all()

        return {
            "total": total,
            "page": page,
            "limit": limit,
            "total_pages": (total + limit - 1) // limit,
            "data": approvals,
        }

    def approve(self, approval_id: int, approver_id: int):
        approval = self.db.get(Approval, approval_id)
        if not approval:
            raise AppException(
                status_code=404,
                code="APPROVAL_NOT_FOUND",
                message="Approval request not found",
            )

        if approval.status not in ["PENDING", "ESCALATED"]:
            raise AppException(
                status_code=400,
                code="INVALID_APPROVAL_STATE",
                message="Approval is already processed",
            )

        approval.status = "APPROVED"
        approval.approver_id = approver_id
        self.db.commit()
        return approval

    def process_decission(self, data: HistoryBase):
        approval = (
            self.db.query(Approval).filter(Approval.id == data.approval_id).first()
        )

        # if not approval:
        #     return None

        if not approval:
            raise AppException(
                status_code=404,
                code="APPROVAL_NOT_FOUND",
                message="Approval request not found",
            )

        if approval.status not in ["PENDING", "ESCALATED"]:
            raise AppException(
                status_code=400,
                code="ALREADY_PROCESSED",
                message="This approval is already completed",
            )

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

    def create_approval(self, data: dict):
        try:
            total_approvals = self.db.query(func.count(Approval.id)).scalar()
            generated_key = f"APP-{(total_approvals + 1):03d}"

            new_approval = Approval(
                **data, approval_key=generated_key, status="PENDING"
            )
            self.db.add(new_approval)
            self.db.commit()
            self.db.refresh(new_approval)
            return new_approval
        except Exception as e:
            raise AppException(
                status_code=500,
                code="APPROVAL_CREATION_FAILED",
                message="Failed to create approval",
                details=str(e),
            )

    def update_approval(self, approval_id: int, data: dict):
        approval = self.db.query(Approval).filter(Approval.id == approval_id).first()
        if not approval:
            raise AppException(
                status_code=404,
                code="APPROVAL_NOT_FOUND",
                message="Approval not found",
            )

        for key, value in data.items():
            if hasattr(approval, key):
                setattr(approval, key, value)

        self.db.commit()
        self.db.refresh(approval)
        return approval

    def delete_approval(self, approval_id: int):
        approval = self.db.query(Approval).filter(Approval.id == approval_id).first()
        if not approval:
            raise AppException(
                status_code=404,
                code="APPROVAL_NOT_FOUND",
                message="Approval not found",
            )

        # Using soft delete as per your plan
        approval.status = "CLOSED"
        # If you prefer hard delete: self.db.delete(approval)

        self.db.commit()
        return {"message": "Approval closed successfully"}
