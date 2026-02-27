from sqlalchemy.orm import Session
from app.model.task import Task
from app.repositories.task_repo import TaskRepository
from datetime import datetime, date
from sqlalchemy import func


class TaskService:
    def __init__(self, db: Session):
        self.db = db
        self.repo = TaskRepository(db)

    def list_task(self, workflow_id: int = None, status: str = None):
        query = self.db.query(Task)

        if not status or status == "MyTasks" or status.strip() == "":
            return self.repo.get_task(workflow_id=workflow_id, status=None)

        if status == "OverDue":
            return query.filter(
                Task.due_at < datetime.now(), Task.status != "COMPLETED"
            ).all()

        if status == "DueToday":
            today = date.today()
            query = self.db.query(Task)
            if workflow_id:
                query = query.filter(Task.workflow_id == workflow_id)
            return query.filter(func.date(Task.due_at) == today).all()

        return self.repo.get_task(workflow_id=workflow_id, status=status)

    def create_task(
        self, workflow_id: int, name: str, task_type: str, workflow_version_id: int
    ):
        task_count = self.db.query(Task).count()
        next_id = task_count + 1

        generated_key = f"TSK-{next_id:03d}"
        local_task_count = (
            self.db.query(Task).filter(Task.workflow_id == workflow_id).count()
        )
        priority_order = local_task_count + 1
        task = Task(
            task_key=generated_key,
            name=name,
            type=task_type,
            workflow_id=workflow_id,
            workflow_version_id=workflow_version_id,
            status="PENDING",
            retry_count=0,
            priority=priority_order,
        )
        # self.db.add(task)
        # self.db.commit()
        # self.db.refresh(task)
        return self.repo.create(task)

    def mark_task_completed(self, task_id: int):
        task = self.db.get(Task, task_id)
        if not task:
            raise ValueError("Task not found")

        # task.status = "COMPLETED"
        # self.db.commit()
        return self.repo.update_status(task, "COMPLETED")
