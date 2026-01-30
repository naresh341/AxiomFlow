from app.model.execution import Execution
from app.repositories.base import BaseRepository


class ExecutionRepository(BaseRepository):
    def __init__(self, db):
        self.db = db

    def start_execution(self, execution: Execution):
        self.db.add(execution)
        self.db.commit()
        self.db.refresh(execution)
        return execution

    def finish_execution(self, execution: Execution, status: str, logs: str):
        execution.status = status
        execution.logs = logs
        self.db.commit()
        self.db.refresh(execution)
        return execution
