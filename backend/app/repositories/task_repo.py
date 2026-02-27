from app.model.task import Task
from app.repositories.base import BaseRepository


class TaskRepository(BaseRepository):
    def __init__(self, db):
        self.db = db

    def get_task(self, workflow_id: int = None, status: str = None):
        query = self.db.query(Task)
        if workflow_id:
            query = query.filter(Task.workflow_id == workflow_id)
        if status:
            query = query.filter(Task.status == status)
        return query.all()

    def create(self, task: Task):
        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)
        return task

    def get_by_workflow(self, workflow_id: int):
        return self.db.query(Task).filter(Task.workflow_id == workflow_id).all()

    def update_status(self, task: Task, status: str):
        task.status = status
        self.db.commit()
        self.db.refresh(task)
        return task
