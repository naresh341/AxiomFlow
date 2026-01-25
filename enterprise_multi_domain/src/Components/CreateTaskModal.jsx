import {
  ChevronDown,
  Copy,
  Link,
  Plus,
  Save,
  Settings2,
  Trash2,
  X,
} from "lucide-react";
import { useState } from "react";

const CreateTaskModal = ({ isOpen, onClose, onCreate }) => {
  const [taskData, setTaskData] = useState({
    name: "",
    type: "webhook",
    description: "",
    mode: "Sequential",
    retry: "Standard (3 attempts)",
    timeout: 30,
    failureBehavior: "Stop Workflow",
    parameters: [
      {
        id: 1,
        name: "customer_id",
        type: "String",
        required: true,
        defaultValue: "",
      },
      {
        id: 2,
        name: "api_version",
        type: "String",
        required: false,
        defaultValue: "v1.2",
      },
    ],
    webhook: {
      method: "POST",
      url: "",
      headers: [{ key: "Content-Type", value: "application/json" }],
      payload:
        '{\n  "customer": "{{input.customer_id}}",\n  "action": "sync",\n  "timestamp": "{{system.now}}"\n}',
    },
  });

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#101622] w-full max-w-[720px] h-[90vh] flex flex-col rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800">
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
            className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors text-slate-500"
          >
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-8">
          {/* Section 1: Basics */}
          <section>
            <h3 className="text-[#111318] dark:text-white text-lg font-bold mb-4">
              Basics
            </h3>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-slate-700 dark:text-slate-200 text-sm font-medium">
                    Task Name
                  </label>
                  <input
                    className="w-full rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white h-11 px-4 text-sm focus:ring-2 focus:ring-[#0f49bd] outline-none"
                    placeholder="e.g. Sync Customer Data"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-slate-700 dark:text-slate-200 text-sm font-medium">
                    Task Type
                  </label>
                  <div className="relative">
                    <select className="w-full appearance-none rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white h-11 px-4 text-sm focus:ring-2 focus:ring-[#0f49bd] outline-none">
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
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 dark:text-slate-200 text-sm font-medium">
                  Description
                </label>
                <textarea
                  className="w-full rounded-lg border border-slate-200 dark:border-slate-700 dark:bg-slate-900 dark:text-white min-h-[80px] p-4 text-sm focus:ring-2 focus:ring-[#0f49bd] outline-none resize-none"
                  placeholder="Describe what this task does..."
                />
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
                options={["Sequential", "Parallel"]}
              />
              <ConfigField
                label="Retry Policy"
                options={["No Retry", "Standard (3 attempts)", "Aggressive"]}
              />
              <div className="flex flex-col gap-2">
                <label className="text-slate-700 dark:text-slate-200 text-sm font-medium">
                  Timeout (seconds)
                </label>
                <input
                  type="number"
                  className="w-full rounded-lg border border-slate-200 dark:bg-white h-10 px-3 text-sm"
                  defaultValue={30}
                />
              </div>
              <ConfigField
                label="Failure Behavior"
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
              <button className="text-[#0f49bd] text-sm font-bold flex items-center gap-1 hover:underline">
                <Plus size={14} /> Add Parameter
              </button>
            </div>
            <div className="overflow-hidden border border-slate-200 dark:border-slate-700 rounded-lg">
              <table className="w-full text-left text-sm">
                <thead className="bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Type</th>
                    <th className="px-4 py-3 text-center">Required</th>
                    <th className="px-4 py-3">Default</th>
                    <th className="px-4 py-3 w-10"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                  {taskData.parameters.map((param) => (
                    <tr key={param.id} className="dark:bg-slate-900/20">
                      <td className="px-4 py-3">
                        <input
                          className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 font-medium"
                          defaultValue={param.name}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <select className="bg-transparent border-none p-0 text-sm focus:ring-0 text-[#0f49bd] font-bold">
                          <option>String</option>
                          <option>Number</option>
                          <option>Boolean</option>
                        </select>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <input
                          type="checkbox"
                          defaultChecked={param.required}
                          className="rounded text-[#0f49bd] focus:ring-[#0f49bd]"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <input
                          className="w-full bg-transparent border-none p-0 text-sm focus:ring-0 italic"
                          placeholder="None"
                          defaultValue={param.defaultValue}
                        />
                      </td>
                      <td className="px-4 py-3">
                        <button className="text-slate-400 hover:text-red-500 transition-colors">
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Section 4: Type-Specific (Webhook) */}
          <section className="border-t border-slate-100 dark:border-slate-800 pt-6">
            <h3 className="text-[#111318] dark:text-white text-lg font-bold mb-4 flex items-center gap-2">
              <Link size={18} className="text-[#0f49bd]" /> Webhook
              Configuration
            </h3>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-32">
                  <label className="text-xs font-bold uppercase text-slate-400 mb-1 block">
                    Method
                  </label>
                  <select className="w-full rounded-lg border border-slate-200 dark:bg-slate-900 h-11 px-3 text-sm font-black">
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
                    className="w-full rounded-lg border border-slate-200 dark:bg-slate-900 h-11 px-4 text-sm font-mono"
                    placeholder="https://api.service.com/endpoint"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-700 dark:text-slate-200 text-sm font-medium mb-2 block">
                  Payload Editor (JSON)
                </label>
                <div className="rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
                  <div className="bg-slate-50 dark:bg-slate-800 px-4 py-2 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
                    <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                      application/json
                    </span>
                    <Copy
                      size={14}
                      className="text-slate-400 cursor-pointer hover:text-slate-600"
                    />
                  </div>
                  <textarea
                    className="w-full bg-[#1e1e1e] text-emerald-400 font-mono text-xs p-4 min-h-[140px] border-none focus:ring-0"
                    spellCheck="false"
                    defaultValue={taskData.webhook.payload}
                  />
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3 bg-slate-50/50 dark:bg-[#101622] shrink-0">
          <button
            onClick={onClose}
            className="px-5 py-2.5 rounded-lg text-slate-700 dark:text-white text-sm font-bold border border-slate-200 dark:border-slate-700 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onCreate(taskData)}
            className="px-5 py-2.5 rounded-lg bg-[#0f49bd] text-white text-sm font-bold hover:bg-[#0f49bd]/90 transition-all shadow-lg flex items-center gap-2"
          >
            <Save size={16} /> Create Task
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper Component for the Execution Grid
const ConfigField = ({ label, options }) => (
  <div className="flex flex-col gap-2">
    <label className="text-slate-700 dark:text-slate-200 text-sm font-medium">
      {label}
    </label>
    <div className="relative">
      <select className="w-full appearance-none rounded-lg border border-slate-200 dark:bg-white h-10 px-3 text-sm outline-none focus:ring-2 focus:ring-[#0f49bd]">
        {options.map((opt) => (
          <option key={opt}>{opt}</option>
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
