import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useParams } from "react-router-dom";
import {
  AlertCircle,
  Check,
  ChevronRight,
  Clock,
  Download,
  GitBranch,
  Maximize2,
  Play,
  RefreshCw,
  Terminal,
  User,
  X,
  Navigation,
} from "lucide-react";
import { get_Workflow_Executions } from "../../RTKThunk/WorkflowThunk";
// import { get_Workflow_Executions } from "../../RTKThunk/AsyncThunk";

const WorkFlowExecutionDetail = () => {
  const { workflowId, executionId } = useParams();
  const dispatch = useDispatch();

  // 1. Pull data from Redux
  const { currentWorkflowExecutions, loading } = useSelector(
    (state) => state.workflows
  );

  // 2. Fetch data if missing (e.g., on page refresh)
  useEffect(() => {
    if (currentWorkflowExecutions.length === 0 && !loading) {
      dispatch(get_Workflow_Executions(workflowId));
    }
  }, [dispatch, workflowId, currentWorkflowExecutions.length, loading]);

  // 3. Find the active execution object
  const activeExec = useMemo(() => {
    return currentWorkflowExecutions?.find(
      (ex) => String(ex.execution_id_str) === String(executionId)
    );
  }, [currentWorkflowExecutions, executionId]);

  if (loading) return <div className="p-20 text-center font-bold">Synchronizing Logs...</div>;
  if (!activeExec) return <div className="p-20 text-center font-bold">Execution {executionId} not found.</div>;

  // UI Helpers based on status
  const isFailed = activeExec.status === "FAILED";
  const statusColor = activeExec.status === "RUNNING" ? "text-amber-500 bg-amber-500/10" : 
                    activeExec.status === "SUCCESS" ? "text-green-500 bg-green-500/10" : 
                    "text-red-500 bg-red-500/10";

  return (
    <div className="bg-[#f6f6f8] dark:bg-[#0a0c10] font-sans text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      <main className="flex-1 mx-auto w-full px-6 py-8">
        
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-4 text-sm font-medium">
          <NavLink to="/workflows" className="text-slate-500 hover:text-[#0f49bd]">Workflows</NavLink>
          <ChevronRight size={14} className="text-slate-400" />
          <NavLink to={`/workflows/${workflowId}`} className="text-slate-500 hover:text-[#0f49bd]">
            {activeExec.workflow_id_str || "Workflow"}
          </NavLink>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-slate-900 dark:text-white font-bold bg-slate-200 dark:bg-[#161b22] px-2 py-0.5 rounded uppercase text-xs">
            {activeExec.execution_id_str}
          </span>
        </div>

        {/* Page Heading */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Execution: {activeExec.execution_id_str}
            </h1>
            <div className="flex items-center gap-4 text-slate-500 text-sm mt-2">
              <span className="flex items-center gap-1.5"><User size={16} /> {activeExec.triggered_by}</span>
              <span className="flex items-center gap-1.5">
                <Clock size={16} /> Start: {new Date(activeExec.started_at).toLocaleTimeString()}
              </span>
              <span className="flex items-center gap-1.5 text-[#0f49bd]">
                <Navigation size={16} /> Version {activeExec.workflow_version_id}
              </span>
            </div>
          </div>
          <div className={`${statusColor} border border-current px-4 py-2 rounded-lg flex items-center gap-2 font-bold text-sm uppercase`}>
            {activeExec.status === "RUNNING" && <span className="w-2 h-2 bg-amber-500 rounded-full animate-ping" />}
            {activeExec.status}
          </div>
        </div>

        {/* Logic for Error Summary (Only show if FAILED) */}
        {isFailed && (
          <div className="mb-10 rounded-xl border-l-4 border-red-500 bg-red-500/5 dark:bg-red-500/10 p-6 flex items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="bg-red-500/20 p-2 rounded-lg text-red-500"><AlertCircle size={32} /></div>
              <div>
                <p className="text-lg font-bold text-slate-900 dark:text-white">Failure Summary</p>
                <p className="text-slate-600 dark:text-slate-300 text-base max-w-2xl">
                   {activeExec.logs || "No specific error logs provided by the engine."}
                </p>
              </div>
            </div>
            <button className="flex items-center gap-2 bg-[#0f49bd] text-white px-6 py-2.5 rounded-lg font-bold shadow-lg hover:brightness-110 transition-all text-sm shrink-0">
              <RefreshCw size={18} /> Retry Execution
            </button>
          </div>
        )}

        {/* Execution Timeline */}
        <div className="flex items-center justify-between mb-6 border-b border-slate-200 dark:border-[#30363d] pb-3">
          <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
            <GitBranch size={22} /> Execution Timeline
          </h2>
        </div>

        <div className="relative pl-8 space-y-0">
          <div className="absolute left-3 top-2 bottom-8 w-0.5 border-l-2 border-dashed border-[#30363d]" />
          
          {/* Example Step 1 - Data from Payload */}
          <TimelineItem 
            title="Workflow Initiation" 
            id="init_001" 
            status="success" 
            time="0.1s" 
            desc={`Triggered via ${activeExec.triggered_by}. Workflow engine acknowledged.`} 
          />

          {/* Conditional Step for Tasks */}
          {activeExec.task_key && (
            <TimelineItem 
              title="Current Task Task" 
              id={activeExec.task_key} 
              status={activeExec.status === "FAILED" ? "failed" : "success"} 
              time="--" 
              desc={`Active task key detected: ${activeExec.task_key}`} 
            />
          )}

          {/* Terminal Logs Section */}
          <div className="relative pb-10">
             <TerminalSection logs={activeExec.logs} />
          </div>
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="sticky bottom-0 bg-white dark:bg-[#161b22] border-t border-slate-200 dark:border-[#30363d] px-10 py-4 shadow-2xl z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 text-sm font-bold">
            <span className={`w-2.5 h-2.5 rounded-full ${isFailed ? "bg-red-500" : "bg-green-500"}`} />
            Status: {activeExec.status}
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 border border-slate-300 dark:border-[#30363d] px-5 py-2 rounded-lg text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
              <Download size={18} /> Export Logs
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* --- Refactored Sub-components --- */

const TimelineItem = ({ title, id, status, time, desc }) => (
  <div className="relative pb-10">
    <div className={`absolute -left-11 top-1 w-6 h-6 rounded-full flex items-center justify-center z-10 ${status === "success" ? "bg-green-600" : "bg-red-500"}`}>
      {status === "success" ? <Check size={14} className="text-white" /> : <X size={14} className="text-white" />}
    </div>
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <h3 className="text-slate-900 dark:text-white font-bold">{title} <span className="text-xs font-mono text-slate-500">ID: {id}</span></h3>
        <span className="text-sm font-medium text-slate-500">{time}</span>
      </div>
      <p className="text-sm text-slate-500">{desc}</p>
    </div>
  </div>
);

const TerminalSection = ({ logs }) => (
  <div className="bg-[#0d1117] rounded-xl border border-[#30363d] overflow-hidden mt-4">
    <div className="flex justify-between items-center bg-slate-800/50 px-4 py-2 border-b border-[#30363d]">
      <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
        <Terminal size={14} /> execution_logs.txt
      </div>
    </div>
    <div className="p-4 font-mono text-sm text-slate-300">
      {logs ? (
        <div className="flex gap-4">
          <span className="text-slate-600">TIMESTAMP</span>
          <span className="text-blue-400">[INFO]</span>
          <span>{logs}</span>
        </div>
      ) : (
        <p className="text-slate-500 italic">No execution logs available for this run.</p>
      )}
    </div>
  </div>
);

export default WorkFlowExecutionDetail;