import { ChevronRight, Edit3, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import RunWorkflowModal from "../../Components/RunWorkflowModal";
import WorkflowSuccessfullModal from "../../Components/WorkflowSuccessfullModal";
import { getWorkflowById } from "../../RTKThunk/AsyncThunk";

const WorkflowDetailLayout = () => {
  const { workflow_id_str } = useParams();
  const dispatch = useDispatch();
  const { currentWorkflow, loading, currentWorkflowExecutions } = useSelector(
    (state) => state.workflows,
  );
  const [lastExecutionId, setLastExecutionId] = useState("");
  const [activeModal, setActiveModal] = useState(null);

  const tabs = [
    { name: "Overview", path: "" },
    { name: "Tasks", path: "tasks" },
    { name: "Approvals", path: "approvals" },
    { name: "Execution History", path: "execution" },
    { name: "Version", path: "version" },
  ];

  useEffect(() => {
    if (workflow_id_str) {
      dispatch(getWorkflowById(workflow_id_str));
    }
  }, [dispatch, workflow_id_str]);

  if (loading || !currentWorkflow) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-xl font-bold animate-pulse text-blue-600">
          Loading Workflow Details...
        </div>
      </div>
    );
  }

  const handleRunWorkflow = () => {
    const mockId = `EXEC-${Math.floor(10000 + Math.random() * 90000)}-${currentWorkflow.workflow_id_str}`;
    setLastExecutionId(mockId);

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
                <h1 className="text-4xl font-black tracking-tight">
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
                ID: {currentWorkflow.workflow_id_str} • Owner:{" "}
                <span className="font-semibold">
                  {currentWorkflow.owner_name}
                </span>
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
                    `pb-4 text-md font-black transition-all border-b-2 outline-none ${
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
            <Outlet context={{ currentWorkflow, currentWorkflowExecutions }} />
          </div>
        </div>
      </main>

      <RunWorkflowModal
        isOpen={activeModal === "config"}
        activeId={currentWorkflow.workflow_id_str}
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
