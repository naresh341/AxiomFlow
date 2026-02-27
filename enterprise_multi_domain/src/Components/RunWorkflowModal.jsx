import {
  AlertTriangle,
  Bolt,
  FlaskConical,
  Play,
  Settings2,
  X,
} from "lucide-react";
import { useState } from "react";

const RunWorkflowModal = ({
  isOpen,
  onClose,
  onRun,
  workflowName,
  workflowId,
}) => {
  const [mode, setMode] = useState("standard");
  const [acknowledged, setAcknowledged] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/40 dark:bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white dark:bg-[#1a242e] border border-slate-200 dark:border-[#283039] w-full max-w-2xl rounded-xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100 dark:border-[#283039] flex justify-between items-start">
          <div>
            <h2 className="text-slate-900 dark:text-white text-2xl font-bold">
              Run Workflow
            </h2>
            <p className="text-slate-500 dark:text-[#9dabb9] text-sm mt-1">
              Configure manual execution parameters.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 dark:text-[#9dabb9] hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Summary Card */}
          <div className="bg-slate-50 dark:bg-[#111922] border border-slate-200 dark:border-[#283039] rounded-lg p-4 flex items-center justify-between">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <p className="text-slate-900 dark:text-white text-base font-bold">
                  {workflowName}
                </p>
                <span className="bg-slate-200 dark:bg-[#283039] text-slate-600 dark:text-[#9dabb9] text-[10px] px-2 py-0.5 rounded font-mono uppercase tracking-wider">
                  Active
                </span>
              </div>
              <p className="text-slate-500 dark:text-[#9dabb9] text-xs font-mono">
                ID: {workflowId} | Version: v3.4.12
              </p>
            </div>
            <div className="size-10 rounded-lg bg-blue-50 dark:bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-500">
              <Settings2 size={20} />
            </div>
          </div>

          {/* Execution Mode */}
          <div className="space-y-3">
            <label className="text-slate-400 dark:text-white/60 text-[11px] font-bold uppercase tracking-wider">
              Execution Mode
            </label>
            <div className="grid grid-cols-2 gap-4">
              {/* Standard Mode Card */}
              <div
                onClick={() => setMode("standard")}
                className={`cursor-pointer rounded-lg border p-4 transition-all ${
                  mode === "standard"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-500/5 ring-1 ring-blue-500"
                    : "border-slate-200 dark:border-[#283039] hover:bg-slate-50 dark:hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <Bolt
                    size={16}
                    className={
                      mode === "standard"
                        ? "text-blue-600 dark:text-blue-500"
                        : "text-slate-400 dark:text-[#9dabb9]"
                    }
                  />
                  <span
                    className={`text-sm font-bold ${mode === "standard" ? "text-blue-700 dark:text-white" : "text-slate-600 dark:text-[#9dabb9]"}`}
                  >
                    Standard Run
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-[#9dabb9]">
                  Full execution with live side effects.
                </p>
              </div>

              {/* Dry Run Mode Card */}
              <div
                onClick={() => setMode("dry")}
                className={`cursor-pointer rounded-lg border p-4 transition-all ${
                  mode === "dry"
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-500/5 ring-1 ring-blue-500"
                    : "border-slate-200 dark:border-[#283039] hover:bg-slate-50 dark:hover:bg-white/5"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <FlaskConical
                    size={16}
                    className={
                      mode === "dry"
                        ? "text-blue-600 dark:text-blue-500"
                        : "text-slate-400 dark:text-[#9dabb9]"
                    }
                  />
                  <span
                    className={`text-sm font-bold ${mode === "dry" ? "text-blue-700 dark:text-white" : "text-slate-600 dark:text-[#9dabb9]"}`}
                  >
                    Dry Run
                  </span>
                </div>
                <p className="text-xs text-slate-500 dark:text-[#9dabb9]">
                  Validate logic without API calls.
                </p>
              </div>
            </div>
          </div>

          {/* JSON Payload Preview */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <label className="text-slate-400 dark:text-white/60 text-[11px] font-bold uppercase tracking-wider">
                Input Payload
              </label>
              <span className="text-slate-400 dark:text-[#4b5563] text-xs font-mono">
                READ-ONLY
              </span>
            </div>
            <div className="bg-slate-900 dark:bg-[#0b0f14] rounded-lg border border-slate-800 dark:border-[#283039] p-4 font-mono text-sm leading-relaxed text-[#9cdcfe]">
              <pre className="overflow-x-auto">{`{
  "user_id": "usr_9921",
  "sync_metadata": {
    "force_refresh": true
  }
}`}</pre>
            </div>
          </div>

          {/* Impact Warning */}
          <div className="bg-amber-50 dark:bg-yellow-500/5 border border-amber-200 dark:border-yellow-500/20 p-3 rounded-lg flex gap-3">
            <AlertTriangle
              className="text-amber-600 dark:text-yellow-500 shrink-0"
              size={18}
            />
            <p className="text-xs text-amber-800 dark:text-yellow-200/80">
              <span className="font-bold text-amber-700 dark:text-yellow-500 uppercase">
                Live Execution:
              </span>{" "}
              External APIs will be called. Real data will be modified in
              connected third-party platforms.
            </p>
          </div>

          {/* Acknowledge */}
          <label className="flex items-start gap-3 cursor-pointer group pt-2">
            <input
              type="checkbox"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              className="mt-1 h-4 w-4 rounded border-slate-300 dark:border-[#283039] bg-white dark:bg-transparent text-blue-500 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-500 dark:text-[#9dabb9] group-hover:text-slate-800 dark:group-hover:text-white transition-colors">
              I understand this action will start a live workflow execution and
              cannot be easily undone.
            </span>
          </label>
        </div>

        {/* Footer */}
        <div className="p-6 bg-slate-50 dark:bg-[#111922] border-t border-slate-100 dark:border-[#283039] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2 rounded-lg text-slate-600 dark:text-white text-sm font-semibold border border-slate-200 dark:border-[#283039] hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onRun(mode)}
            disabled={!acknowledged}
            className={`flex items-center gap-2 px-6 py-2 rounded-lg bg-blue-500 text-white text-sm font-bold shadow-lg transition-all ${
              !acknowledged
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-blue-600 shadow-blue-500/20"
            }`}
          >
            <Play size={18} fill="currentColor" /> Run Workflow
          </button>
        </div>
      </div>
    </div>
  );
};

export default RunWorkflowModal;
