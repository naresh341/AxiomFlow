from app.model.OrganizationModel import Organization
from fastapi import HTTPException


class OrganizationService:
    @staticmethod
    def get_organization(db, user):
        return (
            db.query(Organization)
            .filter(Organization.id == user.organization_id)
            .first()
        )

    @staticmethod
    def update_organization(db, user, payload):
        org = (
            db.query(Organization)
            .filter(Organization.id == user.organization_id)
            .first()
        )

        if not org:
            raise HTTPException(status_code=404, detail="Organization not found")

        for key, value in payload.items():
            setattr(org, key, value)

        db.commit()
        db.refresh(org)

        return org

    @staticmethod
    def update_logo(db, user, logo_url):
        org = (
            db.query(Organization)
            .filter(Organization.id == user.organization_id)
            .first()
        )

        org.logo_url = logo_url
        db.commit()
        db.refresh(org)

        return org
