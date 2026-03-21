import {
  ChevronDown,
  Link,
  Plus,
  Save,
  Settings2,
  Trash2,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_UserOrg } from "../RTKThunk/AsyncThunk";

const CreateTaskModal = ({
  isOpen,
  onClose,
  onCreate,
  workflowId,
  editData,
  onUpdate,
}) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.UserOrg);
  const roles = [...new Set(data?.map((u) => u.role).filter(Boolean))];

  useEffect(() => {
    dispatch(get_UserOrg());
  }, [dispatch]);

  console.log(data, "data");
  const [taskData, setTaskData] = useState({
    name: "",
    type: "webhook",
    description: "",
    mode: "Sequential",
    assignee_id: "",
    assignee_role: "",
    due_at: "",

    retry: "Standard (3 attempts)",
    timeout: 30,
    failureBehavior: "Stop Workflow",
    parameters: [],
    webhook: {
      method: "POST",
      url: "",
      headers: [{ key: "Content-Type", value: "application/json" }],
      payload: '{\n  "customer_id": "{{customer_id}}"\n}',
    },
  });
  const { currentWorkflowVersions } = useSelector((state) => state.workflows);
  // Handle Simple Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Webhook Nested Changes
  const handleWebhookChange = (field, value) => {
    setTaskData((prev) => ({
      ...prev,
      webhook: { ...prev.webhook, [field]: value },
    }));
  };

  // Parameter Management
  const addParameter = () => {
    const newParam = {
      id: Date.now(),
      name: "",
      type: "String",
      required: false,
      defaultValue: "",
    };
    setTaskData((prev) => ({
      ...prev,
      parameters: [...prev.parameters, newParam],
    }));
  };

  const removeParameter = (id) => {
    setTaskData((prev) => ({
      ...prev,
      parameters: prev.parameters.filter((p) => p.id !== id),
    }));
  };

  const updateParameter = (id, field, value) => {
    setTaskData((prev) => ({
      ...prev,
      parameters: prev.parameters.map((p) =>
        p.id === id ? { ...p, [field]: value } : p,
      ),
    }));
  };

  const handleSubmit = async () => {
    try {
      if (!taskData.name) {
        alert("Task name is required");
        return;
      }

      if (taskData.type === "webhook" && !taskData.webhook.url) {
        alert("Webhook URL is required");
        return;
      }

      const activeVersionId =
        currentWorkflowVersions?.length > 0
          ? currentWorkflowVersions[0].id
          : null;

      const payload = {
        name: taskData.name,
        type: taskData.type,
        priority: Number(taskData.priority) || 5,
        workflow_id: workflowId,
        assignee_id: taskData.assignee_id || null,
        assignee_role: taskData.assignee_role || null,
        due_at: taskData.due_at || null,
        workflow_version_id: activeVersionId,

        input_data: {
          execution: {
            mode: taskData.mode,
            retry: taskData.retry,
            timeout: taskData.timeout,
            failureBehavior: taskData.failureBehavior,
          },

          webhook: taskData.webhook,

          parameters: taskData.parameters,
        },
      };

      if (!workflowId) {
        console.error("Workflow ID missing");
        return;
      }
      if (editData) {
        await onUpdate(editData.id, payload);
      } else {
        await onCreate(workflowId, payload);
      }

      onClose();
    } catch (error) {
      console.error("Task creation failed:", error);
    }
  };

  useEffect(() => {
    if (!editData) return;
    setTaskData((prev) => ({
      ...prev,
      ...editData,
    }));
  }, [editData]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#101622] w-full max-w-[720px] h-[90vh] flex flex-col rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 dark:border-slate-800 flex justify-between items-start shrink-0">
          <div>
            <h1 className="text-[#111318] dark:text-white text-2xl font-bold tracking-tight">
              Create Task
            </h1>
            <p className="text-[#616f89] dark:text-slate-400 text-sm">
              Define a reusable task for workflows
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full text-slate-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
          {/* Section 1: Basics */}
          <section className="space-y-4">
            <h3 className="text-[#111318] dark:text-white text-lg font-bold">
              Basics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 dark:text-slate-200 text-sm font-medium">
                  Task Name
                </label>
                <input
                  name="name"
                  value={taskData.name}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white h-11 px-4 text-sm outline-none focus:ring-2 focus:ring-[#0f49bd]"
                  placeholder="e.g. Sync Customer Data"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 dark:text-slate-200 text-sm font-medium">
                  Task Type
                </label>
                <div className="relative">
                  <select
                    name="type"
                    value={taskData.type}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white h-11 px-4 text-sm outline-none"
                  >
                    <option value="userTask">User Task</option>
                    <option value="webhook">Webhook</option>
                    <option value="system">System</option>
                    <option value="approval">Approval</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 dark:text-slate-200 text-sm font-medium">
                  Priority
                </label>
                <div className="relative">
                  <select
                    name="priority"
                    value={taskData.priority}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white h-11 px-4 text-sm outline-none"
                  >
                    <option value={1}>Critical</option>
                    <option value={3}>High</option>
                    <option value={5}>Medium</option>
                    <option value={7}>Low</option>
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 dark:text-slate-200 text-sm font-medium">
                  Assign To
                </label>
                <div className="relative">
                  <select
                    name="assignee_id"
                    value={taskData.assignee_id}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white h-11 px-4 text-sm outline-none"
                  >
                    <option value="">Assign User</option>
                    {data?.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.first_name} {user.last_name}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 dark:text-slate-200 text-sm font-medium">
                  Assign Role
                </label>
                <div className="relative">
                  <select
                    name="assignee_role"
                    value={taskData.assignee_role}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white h-11 px-4 text-sm outline-none"
                  >
                    <option value="">Assign Role</option>
                    {roles?.map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                  <ChevronDown
                    size={16}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 dark:text-slate-200 text-sm font-medium">
                  Due Date
                </label>
                <div className="relative">
                  <input
                    type="date"
                    name="due_at"
                    value={taskData.due_at || ""}
                    onChange={handleChange}
                    className="w-full appearance-none rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white h-11 px-4 text-sm outline-none"
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 2: Execution Config */}
          <section className="p-5 rounded-xl bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800">
            <h3 className="text-[#111318] dark:text-white text-lg font-bold mb-4 flex items-center gap-2">
              <Settings2 size={18} className="text-[#0f49bd]" /> Execution
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
              <ConfigField
                label="Execution Mode"
                name="mode"
                value={taskData.mode}
                onChange={handleChange}
                options={["Sequential", "Parallel"]}
              />
              <ConfigField
                label="Retry Policy"
                name="retry"
                value={taskData.retry}
                onChange={handleChange}
                options={["No Retry", "Standard (3 attempts)", "Aggressive"]}
              />
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 dark:text-slate-200 text-sm font-medium">
                  Timeout (seconds)
                </label>
                <input
                  type="number"
                  name="timeout"
                  value={taskData.timeout}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-slate-200 dark:bg-white h-10 px-3 text-sm"
                />
              </div>
              <ConfigField
                label="Failure Behavior"
                name="failureBehavior"
                value={taskData.failureBehavior}
                onChange={handleChange}
                options={["Stop Workflow", "Continue", "Rollback"]}
              />
            </div>
          </section>

          {/* Section 3: Input Parameters */}
          <section>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-[#111318] dark:text-white text-lg font-bold">
                Input Parameters
              </h3>
              <button
                onClick={addParameter}
                className="text-[#0f49bd] text-sm font-bold flex items-center gap-1 hover:underline"
              >
                <Plus size={14} /> Add Parameter
              </button>
            </div>
            <div className="overflow-hidden border border-slate-200 dark:border-slate-700 rounded-lg">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3 text-center">Required</th>
                    <th className="px-4 py-3 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {taskData.parameters.map((param) => (
                    <tr key={param.id}>
                      <td className="px-4 py-3">
                        <input
                          className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 font-medium dark:text-white"
                          value={param.name}
                          onChange={(e) =>
                            updateParameter(param.id, "name", e.target.value)
                          }
                          placeholder="param_name"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <select
                          className="bg-transparent border-none p-0 text-sm focus:ring-0 text-[#0f49bd] font-bold"
                          value={param.type}
                          onChange={(e) =>
                            updateParameter(param.id, "type", e.target.value)
                          }
                        >
                          <option>String</option>
                          <option>Number</option>
                          <option>Boolean</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          checked={param.required}
                          onChange={(e) =>
                            updateParameter(
                              param.id,
                              "required",
                              e.target.checked,
                            )
                          }
                          className="rounded text-[#0f49bd]"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <button
                          onClick={() => removeParameter(param.id)}
                          className="text-slate-400 hover:text-red-500"
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {taskData.parameters.length === 0 && (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-4 py-8 text-center text-slate-400 italic"
                      >
                        No parameters defined
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Webhook Config */}
          {taskData.type === "webhook" && (
            <section className="border-t border-slate-100 dark:border-slate-800 pt-6 space-y-4">
              <h3 className="text-[#111318] dark:text-white text-lg font-bold flex items-center gap-2">
                <Link size={18} className="text-[#0f49bd]" /> Webhook
                Configuration
              </h3>
              <div className="flex gap-4">
                <div className="w-32">
                  <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">
                    Method
                  </label>
                  <select
                    value={taskData.webhook.method}
                    onChange={(e) =>
                      handleWebhookChange("method", e.target.value)
                    }
                    className="w-full rounded-lg border border-slate-200 dark:bg-slate-900 dark:text-white h-11 px-3 text-sm font-black"
                  >
                    <option>POST</option>
                    <option>GET</option>
                    <option>PUT</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">
                    URL
                  </label>
                  <input
                    value={taskData.webhook.url}
                    onChange={(e) => handleWebhookChange("url", e.target.value)}
                    className="w-full rounded-lg border border-slate-200 dark:bg-slate-900 dark:text-white h-11 px-4 text-sm font-mono"
                    placeholder="https://api.service.com/endpoint"
                  />
                </div>
              </div>
              <div>
                <label className="text-slate-700 dark:text-slate-200 text-sm font-medium mb-2 block">
                  Payload Editor (JSON)
                </label>
                <textarea
                  value={taskData.webhook.payload}
                  onChange={(e) =>
                    handleWebhookChange("payload", e.target.value)
                  }
                  className="w-full bg-[#1e1e1e] text-emerald-400 font-mono text-xs p-4 min-h-[140px] rounded-lg border-none focus:ring-2 focus:ring-[#0f49bd]"
                  spellCheck="false"
                />
              </div>
            </section>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3 bg-slate-50/50 dark:bg-[#101622] shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-slate-700 dark:text-white text-sm font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-100"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-5 py-2.5 rounded-lg bg-[#0f49bd] text-white text-sm font-bold hover:bg-[#0f49bd]/90 shadow-lg flex items-center gap-2"
          >
            <Save size={16} /> Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

const ConfigField = ({ label, name, value, onChange, options }) => (
  <div className="flex flex-col gap-2">
    <label className="text-slate-700 dark:text-slate-200 text-sm font-medium">
      {label}
    </label>
    <div className="relative">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="w-full appearance-none rounded-lg border border-slate-200 dark:bg-white h-10 px-3 text-sm outline-none focus:ring-2 focus:ring-[#0f49bd]"
      >
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
      <ChevronDown
        size={14}
        className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  </div>
);

export default CreateTaskModal;
