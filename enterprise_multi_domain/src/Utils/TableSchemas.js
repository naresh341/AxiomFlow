export const TableSchemas = {
  users: [
    { label: "User", key: "name" },
    { label: "Email", key: "email" },
    { label: "Role", key: "role" },
    { label: "Team", key: "team" },
    { label: "Status", key: "status" },
    { label: "Last Active", key: "lastActive" },
  ],

  dashboard: [
    { label: "Request ID", key: "requestID" },
    { label: "Type", key: "type" },
    { label: "Requestor", key: "requestor" },
    { label: "Status", key: "status" },
    { label: "Date", key: "Date" },
  ],

  workflows: [
    { header: "ID", field: "id" },
    { header: "Workflow Name", field: "name" },
    { header: "Trigger", field: "trigger" },
    { header: "Owner", field: "owner_id" },
    { header: "Version", field: "version" },
    { header: "Status", field: "status" },
    { header: "Created At", field: "created_at" },
    { header: "Action", field: "action" },
  ],
};
