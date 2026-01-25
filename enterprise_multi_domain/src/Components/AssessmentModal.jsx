import {
  AlertTriangle,
  Calendar,
  ChevronDown,
  FileText,
  Info,
  Plus,
  Users,
  X,
} from "lucide-react";

const AssessmentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 dark:bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative flex flex-col w-full max-w-200 h-[90vh] bg-white dark:bg-[#111418] border border-slate-200 dark:border-[#283039] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-slate-100 dark:border-[#283039] bg-white dark:bg-[#111418]">
          <div className="flex flex-col gap-1">
            <h2 className="text-slate-900 dark:text-white text-2xl font-black tracking-tight leading-tight">
              New Compliance Assessment
            </h2>
            <p className="text-slate-500 dark:text-[#9dabb9] text-base font-medium">
              Create and track compliance posture across frameworks.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 dark:text-[#9dabb9] hover:text-slate-600 dark:hover:text-white transition-colors bg-slate-50 dark:bg-[#283039] hover:bg-slate-100 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-8 space-y-12 bg-white dark:bg-[#111418]">
          {/* Section 1: Basics */}
          <section className="space-y-6">
            <h3 className="text-[#137fec] text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3">
              <Info size={18} />
              Assessment Basics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <label className="flex flex-col gap-3">
                <span className="text-slate-700 dark:text-white text-base font-bold">
                  Assessment Name
                </span>
                <input
                  className="w-full h-14 px-5 rounded-xl bg-slate-50 dark:bg-[#283039] border-2 border-slate-100 dark:border-transparent focus:border-[#137fec] focus:bg-white dark:focus:bg-[#283039] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#5c6e80] outline-none transition-all text-lg"
                  placeholder="e.g., Q4 SOC 2 Internal Audit"
                />
              </label>
              <label className="flex flex-col gap-3">
                <span className="text-slate-700 dark:text-white text-base font-bold">
                  Compliance Framework
                </span>
                <div className="relative">
                  <select className="w-full h-14 px-5 rounded-xl bg-slate-50 dark:bg-[#283039] border-2 border-slate-100 dark:border-transparent focus:border-[#137fec] focus:bg-white dark:focus:bg-[#283039] text-slate-900 dark:text-white appearance-none outline-none cursor-pointer text-lg">
                    <option value="">Select framework</option>
                    <option value="soc2">SOC 2 Type II</option>
                    <option value="iso27001">ISO 27001:2022</option>
                    <option value="hipaa">HIPAA Compliance</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#9dabb9] pointer-events-none"
                    size={20}
                  />
                </div>
              </label>
            </div>
          </section>

          {/* Section 2: Timeline */}
          <section className="space-y-6">
            <h3 className="text-[#137fec] text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3">
              <Calendar size={18} />
              Scope & Timeline
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <span className="text-slate-700 dark:text-white text-base font-bold">
                  Assessment Type
                </span>
                <div className="flex gap-2 p-1.5 bg-slate-100 dark:bg-[#1c2229] rounded-xl border border-slate-200 dark:border-[#283039]">
                  {["Initial", "Periodic", "Re-cert"].map((type) => (
                    <label key={type} className="flex-1">
                      <input
                        name="type"
                        type="radio"
                        className="hidden peer"
                        defaultChecked={type === "Initial"}
                      />
                      <div className="cursor-pointer text-center py-3 text-sm font-bold rounded-lg text-slate-500 dark:text-[#9dabb9] peer-checked:bg-white dark:peer-checked:bg-[#283039] peer-checked:text-[#137fec] dark:peer-checked:text-white peer-checked:shadow-sm transition-all border border-transparent peer-checked:border-slate-200 dark:peer-checked:border-transparent">
                        {type}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <label className="flex flex-col gap-3">
                <span className="text-slate-700 dark:text-white text-base font-bold">
                  Assessment Period
                </span>
                <div className="relative">
                  <input
                    className="w-full h-14 px-5 pl-14 rounded-xl bg-slate-50 dark:bg-[#283039] border-2 border-slate-100 dark:border-transparent text-slate-600 dark:text-white cursor-default text-lg"
                    readOnly
                    value="Oct 01, 2023 - Dec 31, 2023"
                  />
                  <Calendar
                    className="absolute left-5 top-1/2 -translate-y-1/2 text-[#137fec]"
                    size={22}
                  />
                </div>
              </label>
            </div>
          </section>

          {/* Section 3: Ownership */}
          <section className="space-y-6">
            <h3 className="text-[#137fec] text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3">
              <Users size={18} />
              Ownership & Responsibility
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <span className="text-slate-700 dark:text-white text-base font-bold">
                  Assessment Owner
                </span>
                <div className="relative">
                  <input
                    className="w-full h-14 px-5 pl-14 rounded-xl bg-slate-50 dark:bg-[#283039] border-2 border-slate-100 dark:border-transparent focus:border-[#137fec] focus:bg-white dark:focus:bg-[#283039] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#5c6e80] outline-none text-lg"
                    placeholder="Search for owner..."
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#137fec]/10 dark:bg-[#137fec]/20 rounded-full flex items-center justify-center overflow-hidden border border-[#137fec]/20 dark:border-[#137fec]/30">
                    <img
                      alt="User"
                      src="https://ui-avatars.com/api/?name=Admin&bg=137fec&color=fff"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </div>
              <label className="flex flex-col gap-3">
                <span className="text-slate-700 dark:text-white text-base font-bold">
                  Responsible Team
                </span>
                <div className="relative">
                  <select className="w-full h-14 px-5 rounded-xl bg-slate-50 dark:bg-[#283039] border-2 border-slate-100 dark:border-transparent focus:border-[#137fec] focus:bg-white dark:focus:bg-[#283039] text-slate-900 dark:text-white appearance-none outline-none text-lg">
                    <option value="eng">Engineering Security</option>
                    <option value="grc">GRC & Legal</option>
                    <option value="ops">Cloud Operations</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#9dabb9] pointer-events-none"
                    size={20}
                  />
                </div>
              </label>
            </div>
          </section>

          {/* Section 4: Risk */}
          <section className="space-y-6">
            <h3 className="text-[#137fec] text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3">
              <AlertTriangle size={18} />
              Risk Overview
            </h3>
            <div className="space-y-6">
              <div className="flex flex-col gap-3">
                <span className="text-slate-700 dark:text-white text-base font-bold">
                  Initial Risk Level
                </span>
                <div className="flex gap-4">
                  {["Low", "Medium", "High"].map((level) => (
                    <label key={level} className="cursor-pointer">
                      <input
                        className="hidden peer"
                        name="risk"
                        type="radio"
                        defaultChecked={level === "Medium"}
                      />
                      <div
                        className={`px-8 py-3 rounded-full border-2 border-slate-100 dark:border-[#283039] bg-slate-50 dark:bg-transparent text-slate-500 dark:text-[#9dabb9] text-base font-bold transition-all
                        peer-checked:bg-opacity-10 dark:peer-checked:bg-opacity-20 peer-checked:shadow-sm
                        ${level === "Low" ? "peer-checked:border-emerald-500 peer-checked:text-emerald-500 peer-checked:bg-emerald-500/30" : ""}
                        ${level === "Medium" ? "peer-checked:border-amber-500 peer-checked:text-amber-500 peer-checked:bg-amber-500/30" : ""}
                        ${level === "High" ? "peer-checked:border-red-500 peer-checked:text-red-500 peer-checked:bg-red-500/30" : ""}
                      `}
                      >
                        {level}
                      </div>
                    </label>
                  ))}
                </div>
              </div>
              <label className="flex flex-col gap-3">
                <span className="text-slate-700 dark:text-white text-base font-bold">
                  Notes & Exclusions
                </span>
                <textarea
                  className="w-full min-h-30 p-5 rounded-xl bg-slate-50 dark:bg-[#283039] border-2 border-slate-100 dark:border-transparent focus:border-[#137fec] focus:bg-white dark:focus:bg-[#283039] text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-[#5c6e80] outline-none transition-all resize-none text-lg"
                  placeholder="Add internal context or scope exclusions..."
                ></textarea>
              </label>
            </div>
          </section>

          {/* Section 5: Policies */}
          <section className="space-y-6 pb-4">
            <h3 className="text-[#137fec] text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3">
              <FileText size={18} />
              Policy Association
            </h3>
            <div className="flex flex-col gap-4">
              <div className="relative group">
                <div className="w-full min-h-17.5 p-3 pr-14 rounded-xl bg-slate-50 dark:bg-[#283039] border-2 border-slate-200 dark:border-[#3e4853] flex flex-wrap gap-3 items-center group-focus-within:border-[#137fec] group-focus-within:bg-white dark:group-focus-within:bg-[#283039] transition-all">
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-[#1c2229] border border-slate-200 dark:border-[#3e4853] rounded-lg text-sm font-bold text-slate-700 dark:text-white shadow-sm">
                    Access Control Policy{" "}
                    <X
                      size={14}
                      className="cursor-pointer text-red-500 dark:text-red-400"
                    />
                  </div>
                  <div className="flex items-center gap-2 px-4 py-1.5 bg-white dark:bg-[#1c2229] border border-slate-200 dark:border-[#3e4853] rounded-lg text-sm font-bold text-slate-700 dark:text-white shadow-sm">
                    Encryption Standard{" "}
                    <X
                      size={14}
                      className="cursor-pointer text-red-500 dark:text-red-400"
                    />
                  </div>
                  <input
                    className="bg-transparent border-none focus:ring-0 text-slate-900 dark:text-white text-lg p-2 flex-1 min-w-37.5 outline-none"
                    placeholder="Link policies..."
                  />
                  <Plus
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-slate-400 dark:text-[#9dabb9]"
                    size={24}
                  />
                </div>
              </div>
              <p className="text-slate-500 dark:text-[#9dabb9] text-sm font-medium leading-relaxed italic">
                Linking policies automatically maps evidence requests to the
                relevant internal standards for the auditor.
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <div className="p-8 border-t border-slate-100 dark:border-[#283039] bg-slate-50 dark:bg-[#111418] flex items-center justify-end gap-5">
          <button
            onClick={onClose}
            className="px-8 h-14 rounded-xl text-slate-500 dark:text-[#9dabb9] text-lg font-bold hover:bg-slate-200 dark:hover:bg-[#283039] hover:text-slate-900 dark:hover:text-white transition-all"
          >
            Cancel
          </button>
          <button className="px-10 h-14 rounded-xl bg-[#137fec] text-white text-lg font-black shadow-xl shadow-blue-200 dark:shadow-[#137fec]/20 hover:brightness-110 active:scale-95 transition-all">
            Create Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentModal;
