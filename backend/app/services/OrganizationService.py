from app.model.OrganizationModel import (
    Organization,
    OrganizationBilling,
    OrganizationCompliance,
    OrganizationSecurity,
    OrganizationSubscription,
)
from fastapi import HTTPException
from sqlalchemy.orm import joinedload


class OrganizationService:
    @staticmethod
    def _get_org_or_404(db, user):
        if not user.organization_id:
            raise HTTPException(status_code=400, detail="User has no organization")

        org = (
            db.query(Organization)
            .filter(Organization.id == user.organization_id)
            .first()
        )

        if not org:
            raise HTTPException(status_code=404, detail="Organization not found")

        return org

    @staticmethod
    def _check_admin(user):
        if user.role != "ADMIN":
            raise HTTPException(status_code=403, detail="Not authorized")

    @staticmethod
    def get_organization(db, user):
        return (
            db.query(Organization)
            .options(
                joinedload(Organization.subscription),
                joinedload(Organization.billing),
                joinedload(Organization.compliance),
                joinedload(Organization.security),
            )
            .filter(Organization.id == user.organization_id)
            .first()
        )

    @staticmethod
    def update_organization(db, user, payload):
        OrganizationService._check_admin(user)

        org = OrganizationService._get_org_or_404(db, user)

        update_data = payload.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(org, key, value)

        db.commit()
        db.refresh(org)

        return org

    @staticmethod
    def update_logo(db, user, logo_url):
        OrganizationService._check_admin(user)

        org = OrganizationService._get_org_or_404(db, user)

        org.logo_url = logo_url

        db.commit()
        db.refresh(org)

        return org


class SubscriptionService:
    @staticmethod
    def get_subscription(db, org_id):
        sub = (
            db.query(OrganizationSubscription).filter_by(organization_id=org_id).first()
        )

        if not sub:
            sub = OrganizationSubscription(organization_id=org_id, plan_name="BASIC")
            db.add(sub)
            db.commit()
            db.refresh(sub)

        return sub

    @staticmethod
    def update_subscription(db, org_id, payload):
        sub = SubscriptionService.get_subscription(db, org_id)

        if not sub:
            raise HTTPException(status_code=404, detail="Subscription not found")

        update_data = payload.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(sub, key, value)

        db.commit()
        db.refresh(sub)

        return sub

    def calculate_total(plan_price, addons):
        return plan_price + sum(a["price"] for a in addons if a["enabled"])


class BillingService:
    @staticmethod
    def get_billing(db, org_id):
        return (
            db.query(OrganizationBilling)
            .filter(OrganizationBilling.organization_id == org_id)
            .first()
        )

    @staticmethod
    def update_billing(db, org_id, payload):
        billing = BillingService.get_billing(db, org_id)

        if not billing:
            raise HTTPException(status_code=404, detail="Billing not found")

        update_data = payload.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(billing, key, value)

        db.commit()
        db.refresh(billing)

        return billing


class ComplianceService:
    @staticmethod
    def get_compliance(db, org_id):
        return (
            db.query(OrganizationCompliance)
            .filter(OrganizationCompliance.organization_id == org_id)
            .first()
        )


class SecurityService:
    @staticmethod
    def get_security(db, org_id):
        return (
            db.query(OrganizationSecurity)
            .filter(OrganizationSecurity.organization_id == org_id)
            .first()
        )

    @staticmethod
    def update_security(db, org_id, payload):
        sec = SecurityService.get_security(db, org_id)

        if not sec:
            raise Exception("Security settings not found")

        update_data = payload.model_dump(exclude_unset=True)

        for key, value in update_data.items():
            setattr(sec, key, value)

        db.commit()
        db.refresh(sec)

        return sec


class OrganizationFullService:
    @staticmethod
    def get_full_data(db, user):
        org_id = user.organization_id

        return {
            "organization": OrganizationService.get_organization(db, user),
            "subscription": SubscriptionService.get_subscription(db, org_id),
            "billing": BillingService.get_billing(db, org_id),
            "compliance": ComplianceService.get_compliance(db, org_id),
            "security": SecurityService.get_security(db, org_id),
        }


