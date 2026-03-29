from app.core.dependencies import get_db
from app.core.security import get_current_user
from app.model.UserModel import User
from app.schemas.OrganizationSchema import (
    BillingRead,
    BillingUpdate,
    ComplianceRead,
    LogoUploadResponse,
    OrganizationRead,
    OrganizationUpdate,
    SecurityRead,
    SecurityUpdate,
    SubscriptionRead,
    SubscriptionUpdate,
)
from app.services.OrganizationService import (
    BillingService,
    ComplianceService,
    OrganizationService,
    SecurityService,
    SubscriptionService,
)
from app.model.OrganizationModel import Invoice
from app.services.upload_service import upload_to_cloudinary
from fastapi import APIRouter, Depends, File, UploadFile
from sqlalchemy.orm import Session

router = APIRouter(prefix="/organization", tags=["Organization"])


# ✅ GET ORGANIZATION
@router.get("/fetchOrganization", response_model=OrganizationRead)
async def get_org(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return OrganizationService.get_organization(db, current_user)


# ✅ UPDATE ORGANIZATION
@router.put("/updateOrganization", response_model=OrganizationRead)
async def update_org(
    payload: OrganizationUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return OrganizationService.update_organization(db, current_user, payload)


# ✅ UPLOAD LOGO
@router.post("/logo", response_model=LogoUploadResponse)
async def update_logo(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    upload = await upload_to_cloudinary(file=file, org_id=current_user.organization_id)

    updated = OrganizationService.update_logo(db, current_user, upload["url"])

    return {"logo_url": upload["url"], "organization": updated}


@router.get("/fetchSubscription", response_model=SubscriptionRead)
async def get_subscription(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return SubscriptionService.get_subscription(db, current_user.organization_id)


@router.put("/updateSubscription", response_model=SubscriptionRead)
async def update_subscription(
    payload: SubscriptionUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return SubscriptionService.update_subscription(
        db, current_user.organization_id, payload
    )


@router.get("/fetchBilling", response_model=BillingRead)
async def get_billing(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return BillingService.get_billing(db, current_user.organization_id)


@router.put("/updateBilling", response_model=BillingRead)
async def update_billing(
    payload: BillingUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return BillingService.update_billing(db, current_user.organization_id, payload)


@router.get("/fetchCompliance", response_model=ComplianceRead)
async def get_compliance(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return ComplianceService.get_compliance(db, current_user.organization_id)


@router.get("/fetchSecurity", response_model=SecurityRead)
async def get_security(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return SecurityService.get_security(db, current_user.organization_id)


@router.put("/updateSecurity", response_model=SecurityRead)
async def update_security(
    payload: SecurityUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return SecurityService.update_security(db, current_user.organization_id, payload)


@router.get("/invoices")
def get_invoices(db: Session, user=Depends(get_current_user)):
    return (
        db.query(Invoice)
        .filter(Invoice.organization_id == user.organization_id)
        .order_by(Invoice.created_at.desc())
        .all()
    )


@router.get("/full")
async def get_full_data(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return {
        "organization": OrganizationService.get_organization(db, current_user),
        "subscription": SubscriptionService.get_subscription(
            db, current_user.organization_id
        ),
        "billing": BillingService.get_billing(db, current_user.organization_id),
        "compliance": ComplianceService.get_compliance(
            db, current_user.organization_id
        ),
        "security": SecurityService.get_security(db, current_user.organization_id),
    }
