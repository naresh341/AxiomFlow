import {
  AlertCircle,
  Check,
  ChevronRight,
  Clock,
  Copy,
  Download,
  GitBranch,
  Maximize2,
  Navigation,
  Play,
  RefreshCw,
  Search,
  Terminal,
  User,
  X,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const ExecutionDetail = () => {
  return (
    <div className="bg-[#f6f6f8] dark:bg-[#0a0c10] font-sans text-slate-900 dark:text-slate-100 min-h-screen flex flex-col">
      <main className="flex-1  mx-auto w-full px-6 py-8">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 mb-4 text-sm font-medium">
          <span className="text-slate-500 hover:text-[#0f49bd] cursor-pointer">
            Workflows
          </span>
          <ChevronRight size={14} className="text-slate-400" />
          <NavLink
            to={"/"}
            className="text-slate-500 hover:text-[#0f49bd] cursor-pointer"
          >
            Customer Onboarding Flow
          </NavLink>
          <ChevronRight size={14} className="text-slate-400" />
          <span className="text-slate-900 dark:text-white font-bold bg-slate-200 dark:bg-[#161b22] px-2 py-0.5 rounded uppercase tracking-wider text-xs">
            EXEC-9921
          </span>
        </div>

        {/* Page Heading */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-black tracking-tight text-slate-900 dark:text-white">
              Execution: EXEC-9921
            </h1>
            <div className="flex items-center gap-4 text-slate-500 text-sm mt-2">
              <span className="flex items-center gap-1.5">
                <User size={16} /> Alex Reed
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={16} /> 10:00:01 — 10:00:45
              </span>
              <span className="flex items-center gap-1.5 text-[#0f49bd]">
                <Navigation size={16} /> Manual Trigger
              </span>
            </div>
          </div>
          <div className="bg-red-500/10 text-red-500 border border-red-500/20 px-4 py-2 rounded-lg flex items-center gap-2 font-bold text-sm">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
            Failed
          </div>
        </div>

        {/* Failure Summary Card */}
        <div className="mb-10 rounded-xl border-l-4 border-red-500 bg-red-500/5 dark:bg-red-500/10 p-6 flex items-center justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="bg-red-500/20 p-2 rounded-lg text-red-500">
              <AlertCircle size={32} />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900 dark:text-white">
                Failure Summary
              </p>
              <p className="text-slate-600 dark:text-slate-300 text-base max-w-2xl">
                Error:{" "}
                <span className="font-mono text-red-500">
                  Connection Timeout
                </span>{" "}
                at 'Create Record' step. (Code: 504). Salesforce API did not
                respond within 3000ms.
              </p>
            </div>
          </div>
          <button className="flex items-center gap-2 bg-[#0f49bd] text-white px-6 py-2.5 rounded-lg font-bold shadow-lg shadow-[#0f49bd]/20 hover:brightness-110 transition-all text-sm shrink-0">
            <RefreshCw size={18} /> Retry Execution
          </button>
        </div>

        {/* Timeline Section */}
        <div className="flex items-center justify-between mb-6 border-b border-slate-200 dark:border-[#30363d] pb-3">
          <h2 className="text-xl font-bold flex items-center gap-2 text-slate-900 dark:text-white">
            <GitBranch size={22} /> Execution Timeline
          </h2>
          <div className="flex gap-2 text-xs font-bold">
            <span className="bg-green-500/10 text-green-500 px-2.5 py-1 rounded-full">
              2 Passed
            </span>
            <span className="bg-red-500/10 text-red-500 px-2.5 py-1 rounded-full">
              1 Failed
            </span>
          </div>
        </div>

        <div className="relative pl-8 space-y-0">
          <div className="absolute left-3 top-2 bottom-8 w-0.5 border-l-2 border-dashed border-[#30363d]" />

          <TimelineItem
            title="Validate Input"
            id="vld_882"
            status="success"
            time="1.2s"
            desc="Schema validation and sanitization of incoming payload."
          />
          <TimelineItem
            title="Manager Approval"
            id="apr_122"
            status="success"
            time="45m 12s"
            desc="External human intervention required for limit overrides."
          />

          {/* Failed Step with Terminal */}
          <div className="relative pb-10">
            <div className="absolute -left-11 top-1 w-6 h-6 rounded-full bg-red-500 flex items-center justify-center z-10 ring-4 ring-red-500/20">
              <X size={14} className="text-white font-bold" />
            </div>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <h3 className="text-red-500 font-black flex items-center gap-2">
                  Create Record{" "}
                  <span className="text-xs font-mono opacity-70">
                    ID: rec_990
                  </span>
                </h3>
                <span className="text-sm font-medium text-red-500">0.4s</span>
              </div>

              {/* Console/Terminal */}
              <div className="bg-[#0d1117] rounded-xl border border-[#30363d] overflow-hidden">
                <div className="flex justify-between items-center bg-slate-800/50 px-4 py-2 border-b border-[#30363d]">
                  <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                    <Terminal size={14} className="text-slate-400" /> logs
                    --step rec_990
                  </div>
                  <div className="flex gap-4">
                    <button className="text-slate-400 hover:text-white text-xs flex items-center gap-1">
                      <Copy size={12} /> Copy
                    </button>
                    <button className="text-slate-400 hover:text-white text-xs flex items-center gap-1">
                      <Maximize2 size={12} /> Fullscreen
                    </button>
                  </div>
                </div>
                <div className="p-4 font-mono text-sm space-y-1">
                  <LogLine
                    time="10:00:45.021"
                    level="INFO"
                    msg="Attempting connection to salesforce_api_v3..."
                  />
                  <LogLine
                    time="10:00:45.422"
                    level="ERROR"
                    msg="ETIMEDOUT: Connection to 10.244.12.8:443 timed out"
                    error
                  />
                  <div className="ml-24 text-slate-500 text-xs mt-2 space-y-1 italic">
                    <div>
                      at Connection.connect
                      (/app/node_modules/sf-api/lib/conn.js:210:9)
                    </div>
                    <div>
                      at Object.executeStep (/app/worker/executor.js:45:18)
                    </div>
                  </div>
                </div>
                <div className="bg-slate-900/50 p-3 border-t border-[#30363d] flex justify-end">
                  <button className="bg-slate-700 hover:bg-slate-600 text-white text-xs font-bold px-4 py-1.5 rounded flex items-center gap-2">
                    <Play size={12} fill="currentColor" /> Retry Step
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Sticky Footer */}
      <footer className="sticky bottom-0 bg-white dark:bg-[#161b22] border-t border-slate-200 dark:border-[#30363d] px-10 py-4 shadow-2xl z-50">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500" />
              <span className="text-sm font-bold text-slate-900 dark:text-white">
                Failure at Step 3
              </span>
            </div>
            <span className="text-slate-400">|</span>
            <span className="text-sm text-slate-500">
              Automatic roll-back:{" "}
              <span className="text-green-500 font-medium">Completed</span>
            </span>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 border border-slate-300 dark:border-[#30363d] px-5 py-2 rounded-lg text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
              <Download size={18} /> Export Logs
            </button>
            <button className="bg-[#0f49bd] text-white px-6 py-2 rounded-lg font-bold shadow-lg shadow-[#0f49bd]/30 hover:brightness-110 transition-all text-sm flex items-center gap-2">
              <RefreshCw size={18} /> Retry Execution
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* Sub-components for cleaner structure */
const NavItem = ({ label, active }) => (
  <a
    className={`text-sm font-medium transition-colors ${active ? "border-b-2 border-[#0f49bd] text-[#0f49bd]" : "hover:text-[#0f49bd]"}`}
    href="#"
  >
    {label}
  </a>
);

const TimelineItem = ({ title, id, status, time, desc }) => (
  <div className="relative pb-10">
    <div
      className={`absolute -left-11 top-1 w-6 h-6 rounded-full flex items-center justify-center z-10 ${status === "success" ? "bg-green-600" : "bg-red-500"}`}
    >
      <Check size={14} className="text-white font-bold" />
    </div>
    <div className="flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <h3 className="text-slate-900 dark:text-white font-bold">
          {title}{" "}
          <span className="text-xs font-mono text-slate-500">ID: {id}</span>
        </h3>
        <span className="text-sm font-medium text-slate-500">{time}</span>
      </div>
      <p className="text-sm text-slate-500">{desc}</p>
    </div>
  </div>
);

const LogLine = ({ time, level, msg, error }) => (
  <div className="flex gap-4">
    <span className="text-slate-600 shrink-0">{time}</span>
    <span className={error ? "text-red-500" : "text-slate-400"}>[{level}]</span>
    <span className={error ? "text-red-500 font-bold" : "text-slate-300"}>
      {msg}
    </span>
  </div>
);

export default ExecutionDetail;
