import { ChevronRight, Edit3, Play } from "lucide-react";
import { useState } from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import RunWorkflowModal from "../Components/RunWorkflowModal";
import WorkflowSuccessfullModal from "../Components/WorkflowSuccessfullModal";

const allWorkflows = [
  {
    id: "1",
    name: "User Onboarding V2",
    status: "Active",
    owner: "John Doe",
    modified: "2 hours ago",
  },
  {
    id: "2",
    name: "Quarterly Compliance Audit",
    status: "Draft",
    owner: "Sarah Reed",
    modified: "Yesterday",
  },
  {
    id: "3",
    name: "Threat Detection Response",
    status: "Active",
    owner: "Mark Tech",
    modified: "3 days ago",
  },
];

const WorkflowDetailLayout = () => {
  const { workflowId } = useParams();
  const [lastExecutionId, setLastExecutionId] = useState("");
  const [activeModal, setActiveModal] = useState(null);
  const currentWorkflow =
    allWorkflows.find((wf) => wf.id === workflowId) || allWorkflows[0];

  const tabs = [
    { name: "Overview", path: "" },
    { name: "Tasks", path: "tasks" },
    { name: "Approvals", path: "approvals" },
    { name: "Execution History", path: "execution" },
    { name: "Version", path: "version" },
  ];

  const handleRunWorkflow = () => {
    // 1. Simulate API Call logic here
    const mockId = `EXEC-${Math.floor(10000 + Math.random() * 90000)}-${currentWorkflow.id}`;
    setLastExecutionId(mockId);

    // 2. Switch to Success Modal
    setActiveModal("success");
  };

  return (
    <div className="min-h-screen bg-[#f6f6f8] dark:bg-[#101622] text-[#111318] dark:text-white font-sans">
      <main className="mx-auto px-6 py-8">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 mb-6 text-sm font-medium text-slate-500">
          <Link
            to="/workflows"
            className="hover:text-blue-600 transition-colors"
          >
            Workflows
          </Link>
          <ChevronRight size={14} />
          <span className="text-slate-900 dark:text-white">
            {currentWorkflow.name}
          </span>
        </nav>

        <div className="animate-in fade-in duration-500">
          {/* Header Section */}
          <div className="flex flex-wrap justify-between items-start gap-6 mb-8">
            <div>
              <div className="flex items-center gap-4 mb-2">
                <h1 className="text-3xl font-black tracking-tight">
                  {currentWorkflow.name}
                </h1>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                    currentWorkflow.status === "Active"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-amber-100 text-amber-700"
                  }`}
                >
                  {currentWorkflow.status}
                </span>
              </div>
              <p className="text-slate-500 text-sm">
                ID: {currentWorkflow.id} • Owner:{" "}
                <span className="font-semibold">{currentWorkflow.owner}</span>
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setActiveModal("config")}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-sm shadow-lg shadow-blue-600/20 transition-all"
              >
                <Play size={18} fill="currentColor" /> Run Workflow
              </button>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 text-slate-900 dark:text-white rounded-xl font-bold text-sm">
                <Edit3 size={18} /> Edit
              </button>
            </div>
          </div>

          {/* Tab Navigation using NavLink (True Routing) */}
          <div className="mb-8 border-b border-slate-200 dark:border-slate-800">
            <div className="flex gap-8">
              {tabs.map((tab) => (
                <NavLink
                  key={tab.name}
                  to={tab.path}
                  end={tab.path === ""}
                  className={({ isActive }) =>
                    `pb-4 text-sm font-black transition-all border-b-2 outline-none ${
                      isActive
                        ? "border-blue-600 text-blue-600"
                        : "border-transparent text-slate-400 hover:text-slate-600"
                    }`
                  }
                >
                  {tab.name}
                </NavLink>
              ))}
            </div>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Outlet context={{ currentWorkflow }} />
          </div>
        </div>
      </main>
      <RunWorkflowModal
        isOpen={activeModal === "config"}
        activeId={currentWorkflow.id}
        onClose={() => setActiveModal(null)}
        onRun={handleRunWorkflow}
      />

      {/* MODAL 2: SUCCESS */}
      <WorkflowSuccessfullModal
        isOpen={activeModal === "success"}
        executionId={lastExecutionId}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
};

export default WorkflowDetailLayout;
