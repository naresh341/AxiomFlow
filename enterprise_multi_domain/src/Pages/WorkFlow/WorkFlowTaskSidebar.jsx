import { Info, ShieldCheck, Terminal, X } from "lucide-react";

const WorkFlowTaskSidebar = ({ task, onClose }) => {
  if (!task) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-slate-900/20 backdrop-blur-[2px] z-90"
        onClick={onClose}
      />

      {/* Sidebar Panel */}
      <div className="fixed top-0 right-0 h-full w-112.5 bg-white dark:bg-[#0f172a] shadow-2xl z-100 border-l border-slate-200 dark:border-slate-800 animate-in slide-in-from-right duration-300">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex justify-between items-center bg-slate-50/50 dark:bg-slate-900/50">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <ShieldCheck size={16} className="text-blue-600" />
                <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest">
                  Task Details
                </span>
              </div>
              <h2 className="text-xl font-black">{task.name}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-slate-200 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Status Section */}
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                  Current Status
                </p>
                <p className="text-sm font-bold flex items-center gap-2">
                  <span
                    className={`size-2 rounded-full ${task.status === "Completed" ? "bg-emerald-500" : "bg-blue-500"}`}
                  />
                  {task.status}
                </p>
              </div>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800">
                <p className="text-[10px] font-black text-slate-400 uppercase mb-1">
                  Duration
                </p>
                <p className="text-sm font-bold">{task.duration}</p>
              </div>
            </div>

            {/* Metadata */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase text-slate-400 flex items-center gap-2">
                <Info size={14} /> Information
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Task Type</span>
                  <span className="font-bold">{task.type}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Execution ID</span>
                  <span className="font-mono font-bold text-blue-600">
                    {task.id}
                  </span>
                </div>
              </div>
            </div>

            {/* Logs Section */}
            <div className="space-y-4">
              <h3 className="text-xs font-black uppercase text-slate-400 flex items-center gap-2">
                <Terminal size={14} /> Execution Logs
              </h3>
              <div className="p-4 bg-slate-900 rounded-xl font-mono text-xs text-emerald-400 leading-relaxed border border-slate-800 shadow-inner">
                <p className="text-slate-500 mb-2">{task.id}</p>
                {task.logs}
                <div className="mt-2 text-white">
                  Process finished with exit code 0
                </div>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex gap-3">
            <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
              Retry Task
            </button>
            <button className="px-6 py-3 border border-slate-200 dark:border-slate-700 rounded-xl font-bold text-sm hover:bg-white dark:hover:bg-slate-800 transition-colors">
              View JSON
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkFlowTaskSidebar;
