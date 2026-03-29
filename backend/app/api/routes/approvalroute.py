from app.core.dependencies import get_db
from app.schemas.ApprovalSchema import ApprovalSchema
from app.services.approval_service import ApprovalService
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.schemas.ApprovalHistorySchema import HistoryBase

router = APIRouter(prefix="/approval", tags=["Approval"])


@router.get("/fetchAll", response_model=ApprovalSchema)
def fetchApproval(
    status: str = None,
    page: int = 1,
    limit: int = 10,
    search: str = None,
    priority: str = None,
    date: str = None,
    db: Session = Depends(get_db),
):

    service = ApprovalService(db)
    return service.list_approval(
        status=status,
        page=page,
        limit=limit,
        search=search,
        priority=priority,
        date=date,
    )


@router.post("/decide")
def make_decision(payload: HistoryBase, db: Session = Depends(get_db)):
    service = ApprovalService(db)
    result = service.process_decission(payload)

    if not result:
        raise HTTPException(status_code=404, detail="Approval not found")
    return {"message": "Success", "data": result}


@router.post("/createApproval")
def create_approval(payload: dict, db: Session = Depends(get_db)):
    service = ApprovalService(db)
    return service.create_approval(payload)


@router.put("/updateApproval/{approval_id}")
def update_approval(approval_id: int, payload: dict, db: Session = Depends(get_db)):
    service = ApprovalService(db)
    result = service.update_approval(approval_id, payload)
    if not result:
        raise HTTPException(status_code=404, detail="Approval not found")
    return {"message": "Success", "data": result}


@router.delete("/deleteApproval/{approval_id}")
def delete_approval(approval_id: int, db: Session = Depends(get_db)):
    service = ApprovalService(db)
    success = service.delete_approval(approval_id)
    if not success:
        raise HTTPException(status_code=404, detail="Approval not found")
    return {"message": "Approval deleted successfully"}
