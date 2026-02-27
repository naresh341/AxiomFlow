from app.core.dependencies import get_db
from app.schemas.ApprovalSchema import Approval, ApprovalSchema
from app.services.approval_service import ApprovalService
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.ApprovalHistorySchema import HistoryBase

router = APIRouter(prefix="/approval", tags=["Approval"])


@router.get("/fetchAll", response_model=ApprovalSchema)
def fetchApproval(
    status: str = None,
    db: Session = Depends(get_db),
):
    
    service = ApprovalService(db)
    return service.list_approval(status=status)


@router.post("/decide")
def make_decision(payload: HistoryBase, db: Session = Depends(get_db)):
    service = ApprovalService(db)
    result = service.process_decission(payload)


    if not result:
        raise HTTPException(status_code=404, detail="Approval not found")
    return {"message": "Success", "data": result}
