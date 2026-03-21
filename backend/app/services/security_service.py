import json
from sqlalchemy.orm import Session
from app.model.SecurityModel import SecurityModel
from app.schemas.SecuritySchema import SecurityPolicy


# GET POLICY
def get_policy(db: Session, org_id: int):
    return (
        db.query(SecurityModel).filter(SecurityModel.organization_id == org_id).first()
    )


def update_policy(db: Session, org_id: int, payload: SecurityPolicy, user_id: int):

    record = get_policy(db, org_id)

    if record:
        record.data = payload["data"] if "data" in payload else payload
        record.updated_by = user_id
    else:
        record = SecurityModel(organization_id=org_id, data=payload, updated_by=user_id)
        db.add(record)

    db.commit()
    db.refresh(record)

    return record


def add_allowed_ip(db: Session, org_id: int, ip: str):

    record = get_policy(db, org_id)

    if not record:
        return None

    data = record.data or {}

    if ip not in data["network_policy"]["allowed_ips"]:
        data["network_policy"]["allowed_ips"].append(ip)

    record.data = data

    db.commit()
    db.refresh(record)

    return record


def remove_allowed_ip(db: Session, org_id: int, ip: str):

    record = get_policy(db, org_id)

    if not record:
        return None

    data = record.data or {}

    network = data.get("network_policy", {})
    ips = network.get("allowed_ips", [])

    if ip in ips:
        ips.remove(ip)

    network["allowed_ips"] = ips
    data["network_policy"] = network

    record.data = data

    db.commit()
    db.refresh(record)

    return record
