import { CheckCircle, Copy } from "lucide-react";
import { NavLink } from "react-router-dom";

const WorkflowSuccessfullModal = ({ isOpen, onClose, executionId }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-300 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-[#1a2b1d] w-full max-w-md rounded-xl shadow-2xl border border-[#13ec37]/20 overflow-hidden animate-in zoom-in duration-300">
        <div className="h-1.5 w-full bg-[#13ec37]"></div>
        <div className="p-8 flex flex-col items-center text-center">
          <div className="size-16 rounded-full bg-[#13ec37]/10 flex items-center justify-center mb-6">
            <CheckCircle className="text-[#13ec37]" size={48} />
          </div>
          <h2 className="text-2xl font-bold mb-2 tracking-tight text-white">
            Workflow started successfully
          </h2>
          <p className="text-slate-400 mb-8 text-sm">
            Instance initialized and currently running on cluster-alpha. Monitor
            logs in real-time.
          </p>
          <div className="w-full bg-[#102213] rounded-lg p-4 mb-8 border border-white/5 flex items-center justify-between text-left">
            <div>
              <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block mb-1">
                Execution ID
              </span>
              <span className="text-sm font-mono font-semibold text-[#13ec37]">
                {executionId}
              </span>
            </div>
            <button className="p-2 hover:bg-white/10 rounded-md text-slate-500">
              <Copy size={18} />
            </button>
          </div>
          <div className="flex flex-col w-full gap-3">
            <NavLink
              to={"/workflow-execution/" + executionId}
              onClick={onClose}
              className="w-full bg-[#13ec37] text-[#102213] font-bold py-3 rounded-lg hover:brightness-110 transition-all"
            >
              View Execution Detail Detail
            </NavLink>
            <button
              onClick={onClose}
              className="w-full text-slate-400 font-semibold py-2 text-sm"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkflowSuccessfullModal;
