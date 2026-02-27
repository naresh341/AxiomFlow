export const resolveData = (data, path) => {
  if (!data || !path) return "";
  return path.split(".").reduce((acc, field) => {
    if (Array.isArray(acc)) {
      acc = acc[0];
    }
    return acc ? acc[field] : null;
  }, data);
};

export const TableSchemas = {
  users: [
    { header: "User", field: "name" },
    { header: "Email", field: "email" },
    { header: "Role", field: "role" },
    { header: "Team", field: "team" },
    { header: "Status", field: "status" },
    { header: "Last Active", field: "lastActive" },
  ],

  dashboard: [
    { header: "Request ID", field: "requestID" },
    { header: "Type", field: "type" },
    { header: "Requestor", field: "requestor" },
    { header: "Status", field: "status" },
    { header: "Date", field: "Date", type: "date" },
  ],

  workflows: [
    { header: "Sr.NO", field: "srno" },
    { header: "Workflow ID", field: "workflow_id_str" },
    { header: "Workflow Name", field: "name" },
    { header: "Trigger", field: "trigger" },
    { header: "Owner", field: "owner_name" },
    { header: "Version", field: "versions.version" },
    { header: "Status", field: "status" },
    { header: "Created At", field: "created_at", type: "date" },
    { header: "Updated At", field: "updated_at", type: "date" },
    { header: "Action", field: "action" },
  ],

  execution: [
    { header: "Sr.NO", field: "srno" },
    { header: "Execution ID", field: "execution_id_str" },
    { header: "Workflow ID", field: "workflow_id_str" },
    { header: "Status ", field: "status" },
    { header: "started_at", field: "started_at", type: "date" },
    { header: "finished_at", field: "finished_at", type: "date" },
    { header: "Triggered By", field: "triggered_by" },
    { header: "Action", field: "action" },
  ],

  task: [
    { header: "Sr.NO", field: "srno" },
    { header: "Task ID", field: "task_field" },
    { header: "Task Name", field: "name" },
    { header: "Status", field: "status" },
    { header: "Assigned To", field: "assignee_role" },
    { header: "Priority", field: "priority" },
    { header: "Created At", field: "created_at", type: "date" },
    { header: "Updated At", field: "updated_at", type: "date" },
    { header: "Due At", field: "due_at", type: "date" },
  ],

  approval: [
    { header: "Sr.No", field: "srno" },
    { header: "Approval ID", field: "approval_field" },
    { header: "Stage", field: "stage" },
    { header: "Requester Name", field: "requester_name" },
    { header: "Priority", field: "priority" },
    { header: "Status", field: "status" },
    { header: "SLA Hours", field: "sla_hours" },
    { header: "Created At", field: "created_at", type: "date" },
    { header: "Action", field: "action" },
  ],
  versions: [
    { header: "Sr.No", field: "srno" },
    { header: "Version", field: "version" },
    { header: "Version ID", field: "version_field" },
    { header: "Status", field: "status" },
    { header: "Created By", field: "created_by" },
    { header: "Created At", field: "created_at", type: "date" },
    { header: "Is Active", field: "is_active", type: "boolean" },
    { header: "Action", field: "action" },
  ],
  
  team: [
    { header: "Sr.No", field: "srno" },
    { header: "Name", field: "name" },
    { header: "Lead", field: "lead_id" },
    { header: "Description", field: "description" },
    { header: "Status", field: "status" },
    { header: "Is Active", field: "is_active", type: "boolean" },
    { header: "Created At", field: "created_at", type: "date" },
    { header: "Action", field: "action" },
  ],
};
