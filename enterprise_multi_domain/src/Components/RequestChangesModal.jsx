import { AlertCircle, FileEdit, Info, X } from "lucide-react";

const RequestChangesModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 dark:bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      {/* Modal Content */}
      <div className="relative bg-white dark:bg-[#1e293b] w-full max-w-lg rounded-xl shadow-2xl border border-slate-200 dark:border-slate-700 overflow-hidden flex flex-col animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold flex items-center gap-2">
            <FileEdit className="text-[#0f49bd]" size={20} />
            Request Changes for APR-1021
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-6">
          <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 rounded-lg flex gap-3">
            <AlertCircle
              size={18}
              className="text-blue-600 dark:text-blue-400 shrink-0 mt-0.5"
            />
            <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
              Provide specific feedback to the requester. This will return the
              approval to the Draft stage.
            </p>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex justify-between">
                Feedback & Instructions{" "}
                <span className="text-red-500 font-black">*</span>
              </label>
              <textarea
                className="w-full bg-slate-50 dark:bg-[#101622]/50 border border-slate-200 dark:border-slate-700 rounded-lg p-3 text-sm focus:ring-2 focus:ring-[#0f49bd] focus:border-transparent min-h-[120px] outline-none placeholder:text-slate-400"
                maxLength={500}
                placeholder="Specify required adjustments or missing documentation..."
              />
              <div className="flex justify-end">
                <span className="text-[10px] text-slate-500 uppercase font-medium">
                  0 / 500 characters
                </span>
              </div>
            </div>

            <label className="flex items-center gap-3 cursor-pointer group w-fit">
              <input
                type="checkbox"
                className="size-4 rounded border-slate-300 dark:border-slate-600 text-[#0f49bd] focus:ring-[#0f49bd] bg-transparent"
              />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300 group-hover:text-[#0f49bd] transition-colors">
                Mark as urgent
              </span>
            </label>
          </div>

          <div className="flex items-start gap-3 p-3 bg-slate-50 dark:bg-slate-800/40 rounded-lg border border-slate-100 dark:border-slate-700/50">
            <Info size={16} className="text-slate-400 mt-0.5" />
            <p className="text-xs text-slate-500 leading-normal">
              <span className="font-bold">Sarah Jenkins</span> will be notified
              and this action will be logged in the audit history.
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-slate-800/20 border-t border-slate-200 dark:border-slate-800 flex flex-row-reverse gap-3">
          <button className="px-5 py-2.5 bg-[#0f49bd] hover:bg-blue-700 text-white rounded-lg text-sm font-bold transition-all shadow-lg shadow-blue-900/20">
            Request Changes
          </button>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-lg text-sm font-bold transition-all"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default RequestChangesModal;
