import React from "react";
import { X, CloudUpload, ShieldCheck, Calendar, FileText } from "lucide-react";

const EvidenceModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative bg-white dark:bg-[#1c2127] w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 dark:border-[#3b4754] flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 dark:border-[#3b4754] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-[#137fec]/10 text-[#137fec] flex items-center justify-center">
              <FileText size={28} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Upload Evidence
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors bg-slate-100 dark:bg-slate-800 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-8 overflow-y-auto space-y-8 custom-scrollbar">
          {/* Drag & Drop Zone */}
          <div className="border-4 border-dashed border-slate-200 dark:border-[#3b4754] rounded-2xl p-12 bg-slate-50 dark:bg-[#283039]/30 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-100 dark:hover:bg-[#283039]/50 transition-all group">
            <div className="size-20 rounded-full bg-[#137fec]/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-sm">
              <CloudUpload size={40} className="text-[#137fec]" />
            </div>
            <div className="space-y-2">
              <p className="text-xl font-bold text-slate-900 dark:text-white">
                Click to upload or drag and drop
              </p>
              <p className="text-sm text-slate-500 dark:text-[#9dabb9] tracking-tight font-medium">
                PDF, PNG, JPG or DOCX (max. 10MB per file)
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="col-span-2 space-y-2">
              <label className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em] ml-1">
                Evidence Name
              </label>
              <input
                type="text"
                className="w-full bg-white dark:bg-[#283039] border-2 border-slate-200 dark:border-[#3b4754] rounded-xl px-5 py-4 text-lg focus:ring-4 focus:ring-[#137fec]/20 focus:border-[#137fec] text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-all font-medium"
                placeholder="e.g. Access Logs Q4 2023"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em] ml-1">
                Associated Control
              </label>
              <div className="relative">
                <select className="w-full bg-white dark:bg-[#283039] border-2 border-slate-200 dark:border-[#3b4754] rounded-xl px-5 py-4 text-lg focus:ring-4 focus:ring-[#137fec]/20 focus:border-[#137fec] text-slate-900 dark:text-white outline-none appearance-none cursor-pointer font-medium">
                  <option>Select a control...</option>
                  <option>CC6.1 - Access Control</option>
                  <option>CC1.2 - Integrity & Ethics</option>
                  <option>CC9.1 - Physical Access</option>
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em] ml-1">
                Collection Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  className="w-full bg-white dark:bg-[#283039] border-2 border-slate-200 dark:border-[#3b4754] rounded-xl px-5 py-4 text-lg focus:ring-4 focus:ring-[#137fec]/20 focus:border-[#137fec] text-slate-900 dark:text-white outline-none font-medium"
                />
              </div>
            </div>

            <div className="col-span-2 space-y-2">
              <label className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.15em] ml-1">
                Add Notes or Comments
              </label>
              <textarea
                rows="4"
                className="w-full bg-white dark:bg-[#283039] border-2 border-slate-200 dark:border-[#3b4754] rounded-xl px-5 py-4 text-lg focus:ring-4 focus:ring-[#137fec]/20 focus:border-[#137fec] text-slate-900 dark:text-white placeholder:text-slate-400 outline-none transition-all font-medium"
                placeholder="Provide additional context for the auditor..."
              ></textarea>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-5 px-8 py-6 bg-slate-50 dark:bg-[#283039] border-t border-slate-100 dark:border-[#3b4754] rounded-b-2xl">
          <button
            onClick={onClose}
            className="px-6 py-3 text-lg font-bold text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button className="flex items-center gap-3 px-10 py-4 text-lg font-black text-white bg-[#137fec] rounded-xl hover:bg-blue-600 shadow-xl shadow-[#137fec]/30 transition-all active:scale-95">
            <CloudUpload size={22} />
            <span>Upload Evidence</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvidenceModal;
