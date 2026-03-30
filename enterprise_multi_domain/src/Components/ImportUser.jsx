import React, { useState } from "react";
import {
  X,
  UploadCloud,
  FileSpreadsheet,
  Info,
  Download,
  CheckCircle2,
  AlertCircle,
  Users,
  Mail,
  TableProperties,
} from "lucide-react";

const ImportUser = ({ isOpen, onClose }) => {
  const [isEmailEnabled, setIsEmailEnabled] = useState(true);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-220 bg-white dark:bg-[#1a2130] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 dark:bg-blue-500/10 rounded-lg">
              <Users className="text-[#135bec]" size={20} />
            </div>
            <h2 className="text-slate-900 dark:text-white text-xl font-bold tracking-tight">
              Import Users
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
          {/* Section 1: Upload Zone */}
          <section className="space-y-4">
            <div className="group relative flex flex-col items-center justify-center gap-4 p-10 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/20 hover:border-[#135bec] dark:hover:border-[#135bec] transition-all cursor-pointer">
              <div className="size-14 bg-[#135bec]/10 rounded-full flex items-center justify-center text-[#135bec] group-hover:scale-110 transition-transform">
                <UploadCloud size={32} />
              </div>
              <div className="text-center">
                <p className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">
                  Drag & drop CSV file here
                </p>
                <p className="text-slate-500 dark:text-slate-400 text-sm">
                  Accepted format: .csv (Max size: 5MB)
                </p>
              </div>
              <button className="px-6 cursor-pointer py-2.5 bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-xl text-sm font-bold text-slate-900 dark:text-white shadow-sm hover:bg-slate-50 transition-all">
                Browse Files
              </button>
              <input
                type="file"
                className="absolute inset-0 opacity-0 cursor-pointer"
                accept=".csv"
              />
            </div>

            {/* Template Download */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-5 rounded-2xl border border-blue-100 dark:border-slate-700 bg-blue-50/30 dark:bg-slate-800/40 gap-4">
              <div className="flex gap-3">
                <Info className="text-[#135bec] shrink-0" size={20} />
                <div className="space-y-0.5">
                  <p className="text-slate-900 dark:text-white text-sm font-bold tracking-tight">
                    Download sample CSV template
                  </p>
                  <p className="text-slate-500 dark:text-slate-400 text-xs">
                    Ensure your data matches our system format for a smooth
                    import.
                  </p>
                </div>
              </div>
              <button className="flex cursor-pointer  items-center gap-2 px-4 py-2 bg-[#135bec] text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors whitespace-nowrap">
                <Download size={16} />
                CSV Template
              </button>
            </div>
          </section>

          {/* Section 2: Import Settings */}
          <section className="space-y-6">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight border-l-4 border-[#135bec] pl-3">
              Import Settings
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  Default Role
                </label>
                <select className="w-full h-11 px-4 rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white focus:ring-[#135bec] focus:border-[#135bec] text-sm">
                  <option>Viewer</option>
                  <option>Editor</option>
                  <option>Admin</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  Assign to Team
                </label>
                <div className="flex flex-wrap gap-2 p-2 border rounded-xl border-slate-200 dark:border-slate-700 dark:bg-slate-800 min-h-[44px]">
                  {["Engineering", "Design"].map((team) => (
                    <span
                      key={team}
                      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-blue-50 dark:bg-[#135bec]/10 text-[#135bec] text-xs font-bold"
                    >
                      {team} <X size={12} className="cursor-pointer" />
                    </span>
                  ))}
                  <input
                    className="flex-1 min-w-[80px] border-none p-0 text-sm focus:ring-0 bg-transparent"
                    placeholder="Add team..."
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-12 pt-2">
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  User Status
                </label>
                <div className="flex items-center gap-6">
                  {["Active", "Invited", "Inactive"].map((status) => (
                    <label
                      key={status}
                      className="flex items-center gap-2.5 cursor-pointer group"
                    >
                      <input
                        type="radio"
                        name="status"
                        defaultChecked={status === "Active"}
                        className="w-4 h-4 text-[#135bec] focus:ring-[#135bec] border-slate-300 dark:bg-slate-800"
                      />
                      <span className="text-sm text-slate-600 dark:text-slate-300 group-hover:text-slate-900 transition-colors">
                        {status}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="space-y-3">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  Notification
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setIsEmailEnabled(!isEmailEnabled)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-slate-400 transition-colors duration-200 ease-in-out ${isEmailEnabled ? "bg-[#135bec]" : "bg-slate-300 dark:bg-slate-700"}`}
                  >
                    <span
                      className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${isEmailEnabled ? "translate-x-5" : "translate-x-0"}`}
                    />
                  </button>
                  <span className="text-sm cursor-pointer font-bold text-slate-600 dark:text-slate-300 flex items-center gap-2">
                    <Mail size={16} className="text-slate-400" /> Send
                    Invitation Email
                  </span>
                </div>
              </div>
            </div>
          </section>

          {/* Section 3: Duplicate Handling */}
          <section className="space-y-4">
            <h3 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight border-l-4 border-[#135bec] pl-3">
              Duplicate Handling
            </h3>
            <div className="grid gap-3">
              {[
                {
                  label: "Skip duplicates",
                  sub: "If a user with the same email exists, ignore the new record.",
                  icon: <CheckCircle2 size={16} />,
                },
                {
                  label: "Update existing users",
                  sub: "Overwrite metadata for existing emails with new data from CSV.",
                  icon: <AlertCircle size={16} />,
                },
                {
                  label: "Fail entire import",
                  sub: "Stop the import process if any duplicate email is detected.",
                  icon: <X size={16} />,
                },
              ].map((option, idx) => (
                <label
                  key={option.label}
                  className="flex items-start gap-4 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="duplicates"
                    defaultChecked={idx === 0}
                    className="mt-1 w-4 h-4 text-[#135bec] focus:ring-[#135bec] border-slate-300"
                  />
                  <div className="space-y-0.5">
                    <span className="text-sm font-bold dark:text-white group-hover:text-[#135bec] transition-colors">
                      {option.label}
                    </span>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {option.sub}
                    </p>
                  </div>
                </label>
              ))}
            </div>
          </section>

          {/* Section 4: Validation Preview */}
          <section className="space-y-4 pb-4">
            <div className="flex items-center justify-between">
              <h3 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight border-l-4 border-[#135bec] pl-3">
                Validation Preview
              </h3>
              <span className="text-xs font-medium text-slate-400">
                0 rows detected
              </span>
            </div>
            <div className="border border-slate-200 dark:border-slate-700 rounded-2xl overflow-hidden bg-slate-50/30 dark:bg-slate-800/20">
              <table className="w-full text-left">
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr>
                    <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">
                      Row
                    </th>
                    <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-4 text-xs font-black text-slate-500 uppercase tracking-wider">
                      Message
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="px-6 py-16 text-center" colSpan="4">
                      <div className="flex flex-col items-center gap-3 opacity-40">
                        <TableProperties size={40} className="text-slate-400" />
                        <p className="text-slate-500 text-sm italic">
                          Upload a file to preview validation results
                        </p>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 px-8 py-5 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-sm font-bold text-slate-600 dark:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-all"
          >
            Cancel
          </button>
          <div className="group relative">
            <button
              disabled
              className="px-8  py-2.5 bg-[#135bec] text-white text-sm font-black rounded-xl opacity-50 cursor-not-allowed shadow-lg shadow-blue-500/20"
            >
              Start Import
            </button>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover:block w-52 p-3 bg-slate-900 text-white text-[11px] font-bold rounded-xl shadow-2xl text-center leading-relaxed">
              Please upload a valid CSV file to begin the batch process
              <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-900"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportUser;
