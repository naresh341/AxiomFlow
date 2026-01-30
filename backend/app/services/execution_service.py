from sqlalchemy.orm import Session
from app.model.execution import Execution
from datetime import datetime, timezone


class ExecutionService:
    def __init__(self, db: Session):
        self.db = db

    def start_execution(self, workflow_id: int):
        execution = Execution(
            workflow_id=workflow_id,
            status="RUNNING",
            started_at=datetime.now(timezone.utc),
        )
        self.db.add(execution)
        self.db.commit()
        self.db.refresh(execution)
        return execution

    def finish_execution(self, execution_id: int, success: bool, logs: str = None):
        execution = self.db.get(Execution, execution_id)
        if not execution:
            raise ValueError("Execution not found")

        execution.status = "SUCCESS" if success else "FAILED"
        execution.finished_at = datetime.now(timezone.utc)
        execution.logs = logs
        self.db.commit()
        return execution
