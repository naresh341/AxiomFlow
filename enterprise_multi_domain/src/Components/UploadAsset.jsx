import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileUp,
  X,
} from "lucide-react";

const UploadAsset = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Container - Desktop 640px */}
      <div className="relative w-180 bg-white dark:bg-[#1c1f27] rounded-2xl shadow-2xl border border-slate-200 dark:border-[#3b4354] flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
        {/* HEADER */}
        <div className="px-8 py-6 border-b border-slate-100 dark:border-[#3b4354] flex items-center justify-between">
          <div className="space-y-1">
            <h1 className="text-xl font-black text-slate-900 dark:text-white tracking-tight">
              Upload Organization Asset
            </h1>
            <p className="text-slate-500 dark:text-[#9da6b9] text-sm">
              Add new documents and media for organizational compliance.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* FORM BODY */}
        <div className="px-8 py-6 space-y-8 overflow-y-auto">
          {/* Row: Type and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-white">
                Upload Type
              </label>
              <div className="relative group">
                <select className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-[#3b4354] bg-slate-50 dark:bg-[#111318] text-slate-900 dark:text-white text-sm outline-none appearance-none focus:ring-2 focus:ring-[#135bec]/20 focus:border-[#135bec] transition-all cursor-pointer">
                  <option disabled selected>
                    Select type
                  </option>
                  <option value="logo">Logo</option>
                  <option value="policy">Policy</option>
                  <option value="compliance">Compliance</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={18}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-white">
                Document Category
              </label>
              <div className="relative">
                <select className="w-full h-11 px-4 rounded-xl border border-slate-200 dark:border-[#3b4354] bg-slate-50 dark:bg-[#111318] text-slate-900 dark:text-white text-sm outline-none appearance-none focus:ring-2 focus:ring-[#135bec]/20 focus:border-[#135bec] transition-all cursor-pointer">
                  <option disabled selected>
                    Select category...
                  </option>
                  <option value="internal">Internal Only</option>
                  <option value="external">Public Facing</option>
                </select>
                <ChevronDown
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={18}
                />
              </div>
            </div>
          </div>

          {/* Upload Zone */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-white">
              Upload File
            </label>
            <div className="relative group flex flex-col items-center justify-center p-10 rounded-2xl border-2 border-dashed border-slate-200 dark:border-[#3b4354] bg-slate-50/50 dark:bg-[#111318] hover:border-[#135bec] dark:hover:border-[#135bec] transition-all cursor-pointer">
              <div className="size-14 bg-[#135bec]/10 rounded-full flex items-center justify-center text-[#135bec] mb-4 group-hover:scale-110 transition-transform">
                <FileUp size={30} />
              </div>
              <div className="text-center space-y-1 mb-4">
                <p className="font-bold text-slate-900 dark:text-white">
                  Drag and drop files here
                </p>
                <p className="text-xs text-slate-500 dark:text-[#9da6b9]">
                  PDF, PNG, JPG (Max 50MB)
                </p>
              </div>
              <button className="px-6 py-2 bg-slate-200 dark:bg-[#282e39] rounded-lg text-sm font-bold text-slate-900 dark:text-white hover:brightness-110 transition-all">
                Select File
              </button>
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
            </div>
          </div>

          {/* Row: Date and Notes */}
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Simple Date Picker View */}
            <div className="w-full md:w-65 space-y-2">
              <label className="text-sm font-bold text-slate-700 dark:text-white">
                Effective Date
              </label>
              <div className="p-4 border border-slate-200 dark:border-[#3b4354] rounded-2xl bg-white dark:bg-[#111318] shadow-sm">
                <input type="date" />
              </div>
            </div>

            {/* Notes */}
            <div className="flex-1 w-full space-y-2 self-stretch flex flex-col">
              <label className="text-sm font-bold text-slate-700 dark:text-white">
                Notes
              </label>
              <textarea
                className="flex-1 w-full min-h-35 p-4 rounded-2xl border border-slate-200 dark:border-[#3b4354] bg-slate-50 dark:bg-[#111318] text-slate-900 dark:text-white text-sm outline-none focus:ring-2 focus:ring-[#135bec]/20 focus:border-[#135bec] transition-all resize-none"
                placeholder="Add any relevant details or compliance notes here..."
              />
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-8 py-5 bg-slate-50 dark:bg-[#1c1f27] border-t border-slate-100 dark:border-[#3b4354] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-500 dark:text-[#9da6b9] hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
          >
            Cancel
          </button>
          <button className="px-8 py-2.5 rounded-xl bg-[#135bec] text-white text-sm font-black shadow-lg shadow-[#135bec]/20 hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-2">
            <CheckCircle2 size={18} />
            Upload Asset
          </button>
        </div>
      </div>
    </div>
  );
};

// Internal Helper for Select Arrow
const ChevronDown = ({ className, size }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export default UploadAsset;
