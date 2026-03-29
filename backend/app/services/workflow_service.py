from datetime import datetime, timezone

from app.GlobalException.GlobalExceptionError import AppException
from app.model.execution import Execution
from app.model.task import Task
from app.model.workflow import Workflow
from app.model.WorkflowVersion import WorkflowVersion
from app.repositories.workflow_repo import WorkflowRepository
from app.schemas.ExecutionSchema import ExecutionCreate
from fastapi import HTTPException
from sqlalchemy import desc, or_
from sqlalchemy.orm import Session


class WorkflowService:
    def __init__(self, db: Session):
        self.db = db
        self.repo = WorkflowRepository(db)

    def list_workflows(
        self,
        status: str = None,
        page: int = 1,
        limit: int = 10,
        search: str = None,
    ):
        query = self.repo.base_query(status=status)
        if search:
            query = query.filter(Workflow.name.ilike(f"%{search}%"))
        total = query.count()
        offset = (page - 1) * limit
        workflows = query.offset(offset).limit(limit).all()

        return {
            "total": total,
            "page": page,
            "limit": limit,
            "total_pages": (total + limit - 1) // limit,
            "data": workflows,
        }

    def get_workflow_by_id(self, workflow_id: str):
        if workflow_id.startswith("WRKFLW-"):
            return (
                self.db.query(Workflow)
                .filter(Workflow.workflow_id_str == workflow_id)
                .first()
            )
        else:
            return self.db.query(Workflow).filter(Workflow.id == workflow_id).first()

    def generate_worflow_id(self) -> str:
        prefix = "WRKFLW-"
        last_workflow = self.db.query(Workflow).order_by(desc(Workflow.id)).first()
        if not last_workflow or not getattr(last_workflow, "workflow_id_str", None):
            return f"{prefix}001"
        try:
            last_id_str = last_workflow.workflow_id_str
            current_num_str = last_id_str.split("-")[1]
            next_sum = int(current_num_str) + 1
            return f"{prefix}{next_sum:03d}"
        except (IndexError, ValueError):
            return f"{prefix}001"

    def add_execution(self, payload: ExecutionCreate):
        # Get workflow integer ID from workflow_id_str
        workflow = (
            self.db.query(Workflow)
            .filter_by(workflow_id_str=payload.workflow_id_str)
            .first()
        )
        if not workflow:
            raise AppException(
                status_code=404,
                code="WORKFLOW_NOT_FOUND",
                message="Workflow not found",
            )

        # Create execution
        new_exec = Execution(
            workflow_id_str=workflow.workflow_id_str,  # string for display / API
            workflow_version_id=payload.workflow_version_id,
            task_key=payload.task_key,
            approval_key=payload.approval_key,
            triggered_by=payload.triggered_by,
            status="RUNNING",
            execution_id_str=self.generate_execution_id(),
        )

        self.db.add(new_exec)
        self.db.commit()
        self.db.refresh(new_exec)
        return new_exec

    def activate_workflow(self, workflow_id: int):
        workflow = self.db.get(Workflow, workflow_id)
        if not workflow:
            raise ValueError("Workflow not found")

        workflow.status = "ACTIVE"
        self.db.commit()
        return workflow

    # def get_versions_for_workflow(
    #     self,
    #     workflow_id_str: str,
    #     page=1,
    #     limit=10,
    #     status: str = None,
    #     search: str = None,
    # ):

    #     workflow = self.get_workflow_by_id(workflow_id_str)

    #     if not workflow:
    #         raise AppException(404, "WORKFLOW_NOT_FOUND", "Workflow not found")

    #     versions = (
    #         self.db.query(WorkflowVersion)
    #         .filter(WorkflowVersion.workflow_id == workflow.id)
    #         .order_by(WorkflowVersion.id.desc())
    #         .all()
    #     )

    #     return versions
    def get_executions_for_workflow(
        self,
        workflow_id_str: str,
        page=1,
        limit=10,
        status: str = None,
        search: str = None,
    ):

        workflow = self.get_workflow_by_id(workflow_id_str)

        if not workflow:
            raise AppException(404, "WORKFLOW_NOT_FOUND", "Workflow not found")

        query = self.db.query(Execution).filter(Execution.workflow_id == workflow.id)

        if status:
            query = query.filter(Execution.status == status)

        if search:
            query = query.filter(Execution.execution_id_str.ilike(f"%{search}%"))

        query = query.order_by(Execution.started_at.desc())

        total = query.count()
        offset = (page - 1) * limit

        data = query.offset(offset).limit(limit).all()

        return {
            "total": total,
            "page": page,
            "limit": limit,
            "total_pages": (total + limit - 1) // limit,
            "data": data,
        }

    def get_workflow_by_status(
        self,
        workflow_id_str: str,
        model,
        page=1,
        limit=10,
        status: str = None,
        priority: str = None,
        search: str = None,
    ):

        workflow = self.get_workflow_by_id(workflow_id_str)

        if not workflow:
            raise AppException(404, "WORKFLOW_NOT_FOUND", "Workflow not found")

        query = self.db.query(model).filter(model.workflow_id == workflow.id)

        if hasattr(model, "status") and status:
            if isinstance(status, list):
                query = query.filter(model.status.in_(status))
            elif status.lower() != "all":
                query = query.filter(model.status == status)

        if priority and hasattr(model, "priority"):
            priority = str(priority).upper()

            if priority == "HIGH":
                query = query.filter(model.priority >= 8)

            elif priority == "MEDIUM":
                query = query.filter(model.priority.between(5, 7))

            elif priority == "LOW":
                query = query.filter(model.priority <= 4)

            elif priority.isdigit():
                query = query.filter(model.priority == int(priority))

        if search:
            search_filters = []

            # dynamically check columns
            possible_fields = [
                "name",
                "version_key",
                "execution_id_str",
                "approval_key",
                "task_key",
                "requester_name",
                "stage",
                "created_by",
                "workflow_id_str",
            ]

            for field in possible_fields:
                if hasattr(model, field):
                    column = getattr(model, field)
                    search_filters.append(column.ilike(f"%{search}%"))

            if search_filters:
                query = query.filter(or_(*search_filters))
        # choose correct ordering column
        if hasattr(model, "started_at"):
            query = query.order_by(model.started_at.desc())

        elif hasattr(model, "priority"):
            query = query.order_by(model.priority.asc())

        else:
            query = query.order_by(model.id.desc())
        total = query.count()
        offset = (page - 1) * limit

        data = query.offset(offset).limit(limit).all()

        return {
            "total": total,
            "page": page,
            "limit": limit,
            "total_pages": (total + limit - 1) // limit,
            "data": data,
        }

    def create_task_for_workflow(self, workflow_id_str: str, payload):

        # 1️⃣ Find workflow
        workflow = self.get_workflow_by_id(workflow_id_str)

        if not workflow:
            raise HTTPException(status_code=404, detail="Workflow not found")

        # 2️⃣ Find ACTIVE version
        active_version = (
            self.db.query(WorkflowVersion)
            .filter(
                WorkflowVersion.workflow_id == workflow.id,
                WorkflowVersion.is_active,
            )
            .first()
        )

        if not active_version:
            raise AppException(
                status_code=400,
                code="NO_ACTIVE_VERSION",
                message="No active workflow version",
            )

        # 3️⃣ Create task
        task = Task(
            task_key=self.generate_task_key(),
            name=payload.name,
            type=payload.type,
            priority=payload.priority,
            workflow_id=workflow.id,
            workflow_version_id=active_version.id,
            input_data=payload.input_data,
            assignee_id=payload.assignee_id,
            assignee_role=payload.assignee_role,
            due_at=payload.due_at,
        )

        self.db.add(task)
        self.db.commit()
        self.db.refresh(task)

        return task

    def get_global_tasks(self):

        tasks = (
            self.db.query(Task, Workflow)
            .join(Workflow, Task.workflow_id == Workflow.id)
            .all()
        )

        return [
            {
                "task_id": task.id,
                "task_name": task.name,
                "priority": task.priority,
                "workflow_name": workflow.name,
                "workflow_id": workflow.workflow_id_str,
            }
            for task, workflow in tasks
        ]

    def generate_task_key(self):
        prefix = "TSK-"

        last_task = self.db.query(Task).order_by(Task.id.desc()).first()

        if not last_task or not last_task.task_key:
            return f"{prefix}001"

        try:
            last_number = int(last_task.task_key.split("-")[1])
            new_number = last_number + 1
            return f"{prefix}{new_number:03d}"
        except (IndexError, ValueError):
            return f"{prefix}001"

    def update_task(self, task_id: int, payload):

        task = self.db.query(Task).filter(Task.id == task_id).first()

        if not task:
            raise AppException(
                status_code=404,
                code="TASK_NOT_FOUND",
                message="Task not found",
            )

        # Update fields only if provided
        update_data = payload.dict(exclude_unset=True)

        for key, value in update_data.items():
            setattr(task, key, value)

        self.db.commit()
        self.db.refresh(task)

        return task

    def delete_task(self, task_id: int):

        task = self.db.query(Task).filter(Task.id == task_id).first()

        if not task:
            raise HTTPException(status_code=404, detail="Task not found")

        self.db.delete(task)
        self.db.commit()

        return {"message": "Task deleted successfully"}

    # ===================================Version================================

    def generate_version_key(self, workflow) -> str:

        last_version = (
            self.db.query(WorkflowVersion)
            .filter(WorkflowVersion.workflow_id == workflow.id)
            .order_by(WorkflowVersion.id.desc())
            .first()
        )

        if last_version and last_version.version_key:
            try:
                last_num = int(last_version.version_key.split("-V")[1])
                next_num = last_num + 1

            except (IndexError, ValueError):
                next_num = 1

        else:
            next_num = 1

        return f"{workflow.workflow_id_str}-V{next_num:03d}"

    def create_version_for_workflow(self, workflow_id: int, payload):

        workflow = (
            self.db.query(Workflow)
            .filter(Workflow.workflow_id_str == workflow_id)
            .first()
        )
        if not workflow:
            raise HTTPException(status_code=404, detail="Workflow not found")
        version_key = self.generate_version_key(workflow)
        status = "ACTIVE" if payload.is_active else "DRAFT"
        if payload.is_active:
            self.db.query(WorkflowVersion).filter(
                WorkflowVersion.workflow_id == workflow.id
            ).update({"is_active": False, "status": "DRAFT"})
        version = WorkflowVersion(
            workflow_id=workflow.id,
            workflow_id_str=workflow.workflow_id_str,
            version_key=version_key,
            version=payload.version,
            is_active=payload.is_active,
            status=status,
            definition=payload.definition,
            created_by="admin",
        )
        self.db.add(version)
        self.db.commit()
        self.db.refresh(version)
        return version

    def activate_version(self, workflow_id: int, version_id: int):
        version = (
            self.db.query(WorkflowVersion)
            .filter(
                WorkflowVersion.id == version_id,
                WorkflowVersion.workflow_id == workflow_id,
            )
            .first()
        )

        if not version:
            raise AppException(
                status_code=404,
                code="VERSION_NOT_FOUND",
                message="Version not found",
            )

        # deactivate other versions
        self.db.query(WorkflowVersion).filter(
            WorkflowVersion.workflow_id == workflow_id, WorkflowVersion.id != version_id
        ).update({"is_active": False})

        version.is_active = True

        self.db.commit()
        self.db.refresh(version)

        return version

    def delete_version(self, workflow_id: int):
        version = (
            self.db.query(WorkflowVersion)
            .filter(WorkflowVersion.workflow_id == workflow_id)
            .order_by(WorkflowVersion.id.desc())
            .first()
        )

        if not version:
            raise ValueError("Version not found")

        self.db.delete(version)
        self.db.commit()

        return {"message": "Version deleted successfully"}

    # Update Version
    def update_version(self, workflow_id: int, payload: dict):

        version = (
            self.db.query(WorkflowVersion)
            .filter(WorkflowVersion.workflow_id == workflow_id)
            .order_by(WorkflowVersion.id.desc())
            .first()
        )

        if not version:
            raise ValueError("Version not found for this workflow")

        payload.pop("workflow_id", None)
        payload.pop("workflow_id_str", None)

        for key, value in payload.items():
            setattr(version, key, value)

        self.db.commit()
        self.db.refresh(version)

        return version

    # ========================================= Execution ==========================================
    def generate_execution_key(self):
        last_execution = self.db.query(Execution).order_by(Execution.id.desc()).first()

        if last_execution and last_execution.execution_id_str:
            try:
                last_num = int(last_execution.execution_id_str.split("-")[1])
                return f"EXEC-{last_num + 1:03d}"
            except (IndexError, ValueError):
                return "EXEC-001"
        else:
            return "EXEC-001"

    # Add 'workflow_id_from_url' to the arguments
    def start_execution(self, workflow_id_from_url: str, payload: dict):
        # Now use that ID to lookup the workflow
        workflow = (
            self.db.query(Workflow)
            .filter_by(workflow_id_str=workflow_id_from_url)  # Use the one from the URL
            .first()
        )

        if not workflow:
            raise ValueError(f"Workflow {workflow_id_from_url} not found")

        # Generate a unique string for this execution (e.g., EXEC-123)
        # You should have a helper for this similar to generate_version_key
        execution_str = f"EXEC-{int(datetime.utcnow().timestamp())}"

        new_execution = Execution(
            workflow_id=workflow.id,  # Integer FK
            execution_id_str=execution_str,  # Human readable ID
            workflow_id_str=workflow_id_from_url,
            workflow_version_id=payload.get("workflow_version_id"),
            task_key=payload.get("task_key"),
            approval_key=payload.get("approval_key"),
            triggered_by=payload.get("triggered_by", "system"),
            status="RUNNING",
            started_at=datetime.utcnow(),
        )

        self.db.add(new_execution)
        self.db.commit()
        self.db.refresh(new_execution)
        return new_execution

    def finish_execution(self, execution_id: int, payload: dict):

        execution = (
            self.db.query(Execution).filter(Execution.id == execution_id).first()
        )

        if not execution:
            raise AppException(
                status_code=404,
                code="EXECUTION_NOT_FOUND",
                message="Execution not found",
            )

        execution.status = payload.get("status", execution.status)
        execution.logs = payload.get("logs")
        execution.finished_at = datetime.now(timezone.utc)

        self.db.commit()
        self.db.refresh(execution)

        return execution

    def delete_execution(self, execution_id: int):

        execution = (
            self.db.query(Execution).filter(Execution.id == execution_id).first()
        )

        if not execution:
            raise ValueError("Execution not found")

        self.db.delete(execution)
        self.db.commit()

        return {"message": "Execution deleted successfully"}
