import {
  AlertTriangle,
  Calendar,
  ChevronDown,
  Link as LinkIcon,
  X,
  FileText,
} from "lucide-react";
import { useEffect, useState } from "react";

const AssessmentModal = ({ isOpen, onClose, policies = [], handleSubmit }) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    regulation_type: "",
    owner_id: 1,
    responsible_team_id: 1,
    effective_from: "",
    review_frequency: "annual",
    next_review_date: "",
    likelihood: 3,
    impact: 3,
    evidenceUrl: "",
  });

  // Auto-calculate Next Review Date
  useEffect(() => {
    if (formData.effective_from && formData.review_frequency !== "ad-hoc") {
      const date = new Date(formData.effective_from);
      const intervals = {
        quarterly: 90,
        "semi-annual": 182,
        annual: 365,
      };

      date.setDate(
        date.getDate() + (intervals[formData.review_frequency] || 0),
      );
      setFormData((prev) => ({
        ...prev,
        next_review_date: date.toISOString().split("T")[0],
      }));
    }
  }, [formData.effective_from, formData.review_frequency]);

  if (!isOpen) return null;

  const riskScore = formData.likelihood * formData.impact;

  const getRiskLevel = (score) => {
    if (score <= 6)
      return {
        label: "low",
        class: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      };
    if (score <= 12)
      return {
        label: "medium",
        class: "bg-amber-500/10 text-amber-500 border-amber-500/20",
      };
    return {
      label: "critical",
      class: "bg-red-500/10 text-red-500 border-red-500/20",
    };
  };

  const riskMeta = getRiskLevel(riskScore);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFinalSubmit = () => {
    const submissionData = {
      ...formData,
      risk_level: riskMeta.label.toUpperCase(),
      owner_id: Number(formData.owner_id),
      responsible_team_id: Number(formData.responsible_team_id),
    };
    handleSubmit(submissionData);
  };
  const regulationTypes = Array.from(
    new Set(
      (policies || [])
        .filter((p) => p?.regulation_type)
        .map((p) => p.regulation_type),
    ),
  );
  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-slate-900/40 dark:bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="relative flex flex-col w-full max-w-4xl h-[90vh] bg-white dark:bg-[#111418] border border-slate-200 dark:border-[#283039] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-slate-100 dark:border-[#283039]">
          <div className="flex flex-col gap-1">
            <h2 className="text-slate-900 dark:text-white text-2xl font-black tracking-tight">
              New Compliance Assessment
            </h2>
            <p className="text-slate-500 dark:text-[#9dabb9] text-base font-medium">
              Quantify risk and map governance timeline.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:bg-slate-100 dark:hover:bg-[#283039] transition-colors rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-12 custom-scrollbar">
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-3">
              <label className="text-slate-700 dark:text-white text-base font-bold">
                Assessment Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full h-14 px-5 rounded-xl bg-slate-50 dark:bg-[#283039] border-2 border-transparent focus:border-[#137fec] outline-none text-lg dark:text-white"
                placeholder="e.g., Q1 NIST Security Review"
              />
            </div>

            {/* DYNAMIC DROP_DOWN: Derived from the policies prop */}
            {regulationTypes.length > 0 && (
              <div className="flex flex-col gap-3">
                <label className="text-slate-700 dark:text-white text-base font-bold">
                  Target Framework
                </label>

                <div className="relative">
                  <select
                    name="regulation_type"
                    value={formData.regulation_type}
                    onChange={handleChange}
                    className="w-full h-14 px-5 rounded-xl bg-slate-50 dark:bg-[#283039] appearance-none outline-none cursor-pointer text-lg dark:text-white"
                  >
                    <option value="">Select a policy...</option>

                    {regulationTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>

                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>
            )}
          </section>

          <section className="space-y-6">
            <h3 className="text-[#137fec] text-sm font-black uppercase tracking-[0.2em] flex items-center gap-3">
              <Calendar size={18} /> Governance & Validity
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="flex flex-col gap-3">
                <label className="text-slate-700 dark:text-white text-sm font-bold">
                  Effective From
                </label>
                <input
                  type="date"
                  name="effective_from"
                  value={formData.effective_from}
                  onChange={handleChange}
                  className="w-full h-14 px-4 rounded-xl bg-slate-50 dark:bg-[#283039] border-2 border-transparent focus:border-[#137fec] outline-none text-lg dark:text-white"
                />
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-slate-700 dark:text-white text-sm font-bold">
                  Review Frequency
                </label>
                <div className="relative">
                  <select
                    name="review_frequency"
                    value={formData.review_frequency}
                    onChange={handleChange}
                    className="w-full h-14 px-4 rounded-xl bg-slate-50 dark:bg-[#283039] appearance-none outline-none cursor-pointer text-lg dark:text-white"
                  >
                    <option value="quarterly">Quarterly</option>
                    <option value="semi-annual">Semi-Annual</option>
                    <option value="annual">Annual</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    size={20}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-slate-700 dark:text-white text-sm font-bold">
                  Next Review Date
                </label>
                <input
                  type="date"
                  name="next_review_date"
                  value={formData.next_review_date}
                  readOnly
                  className="w-full h-14 px-4 rounded-xl bg-slate-100 dark:bg-[#1c2229] border-2 border-dashed border-slate-300 dark:border-[#3b4754] outline-none text-lg text-slate-500 cursor-not-allowed"
                />
              </div>
            </div>
          </section>

          <section className="p-8 rounded-2xl bg-slate-50 dark:bg-[#1c2229] border border-slate-200 dark:border-[#283039] space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-[#137fec] text-sm font-black uppercase tracking-widest flex items-center gap-3">
                <AlertTriangle size={18} /> Risk Assessment Matrix
              </h3>
              <div
                className={`px-4 py-1.5 rounded-full text-sm font-black border-2 shadow-sm ${riskMeta.class}`}
              >
                SCORE: {riskScore} • {riskMeta.label.toUpperCase()}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex justify-between">
                  Likelihood <span>{formData.likelihood}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  name="likelihood"
                  value={formData.likelihood}
                  onChange={handleChange}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#137fec]"
                />
              </div>
              <div className="space-y-4">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest flex justify-between">
                  Impact <span>{formData.impact}</span>
                </label>
                <input
                  type="range"
                  min="1"
                  max="5"
                  name="impact"
                  value={formData.impact}
                  onChange={handleChange}
                  className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#137fec]"
                />
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-4">
            <div className="flex flex-col gap-3">
              <label className="text-slate-700 dark:text-white text-base font-bold">
                Evidence Link
              </label>
              <div className="relative">
                <input
                  name="evidenceUrl"
                  value={formData.evidenceUrl}
                  onChange={handleChange}
                  className="w-full h-14 pl-12 pr-5 rounded-xl bg-slate-50 dark:bg-[#283039] border-2 border-transparent focus:border-[#137fec] outline-none text-lg dark:text-white"
                  placeholder="https://jira.company.com/SEC-101"
                />
                <LinkIcon
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#137fec]"
                  size={20}
                />
              </div>
            </div>
          </section>

          <section className="flex flex-col gap-3">
            <label className="text-slate-700 dark:text-white text-base font-bold flex items-center gap-2">
              <FileText size={18} /> Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full min-h-24 p-5 rounded-xl bg-slate-50 dark:bg-[#283039] border-2 border-transparent focus:border-[#137fec] text-lg dark:text-white resize-none"
              placeholder="Provide context for the backend audit log..."
            />
          </section>
        </div>

        <div className="p-8 border-t border-slate-100 dark:border-[#283039] bg-slate-50 dark:bg-[#111418] flex items-center justify-end gap-5">
          <button
            type="button"
            onClick={onClose}
            className="px-8 h-14 rounded-xl text-slate-500 font-bold hover:bg-slate-200 transition-all"
          >
            Discard
          </button>
          <button
            type="button"
            onClick={handleFinalSubmit}
            className="px-10 h-14 rounded-xl bg-[#137fec] text-white text-lg font-black shadow-xl hover:brightness-110 active:scale-95 transition-all"
          >
            Finalize Assessment
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssessmentModal;
