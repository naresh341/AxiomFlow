import React, { useState } from "react";
import { X, ShieldAlert, Search, ChevronDown, ShieldCheck } from "lucide-react";

const RiskModal = ({ isOpen, onClose, onSubmit, users }) => {
  const [formData, setFormData] = useState({
    risk_title: "",
    description: "",
    category: "Security",
    risk_owner: "",
    likelihood: "LOW",
    impact: "LOW",
    mitigation_plan: "",
  });

  const likelihoodScore = {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
  };

  const impactScore = {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    CRITICAL: 4,
  };

  const riskScore =
    (likelihoodScore[formData.likelihood] || 0) *
    (impactScore[formData.impact] || 0);

  const severity =
    riskScore >= 15
      ? "CRITICAL"
      : riskScore >= 10
        ? "HIGH RISK"
        : riskScore >= 5
          ? "MEDIUM"
          : "LOW";

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const payload = {
      ...formData,
    };

    onSubmit(payload);

    setFormData({
      risk_title: "",
      description: "",
      category: "Security",
      risk_owner: "",
      likelihood: "LOW",
      impact: "LOW",
      mitigation_plan: "",
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content - Increased to max-w-4xl */}
      <div className="relative bg-white dark:bg-[#1c2127] w-full max-w-4xl rounded-2xl shadow-2xl border border-slate-200 dark:border-[#3b4754] flex flex-col max-h-[95vh] animate-in zoom-in-95 duration-300">
        {/* Header - Increased Padding & Font */}
        <div className="px-8 py-6 border-b border-slate-200 dark:border-[#3b4754] flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="size-14 rounded-xl bg-[#137fec]/10 text-[#137fec] flex items-center justify-center shadow-inner">
              <ShieldAlert size={32} /> {/* Increased Icon Size */}
            </div>
            <div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                Log New Risk
              </h3>
              <p className="text-base text-slate-500 dark:text-[#9dabb9] mt-1">
                Enter details for the new compliance risk assessment profile.
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors bg-slate-100 dark:bg-slate-800 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* Scrollable Body - Increased text sizes throughout */}
        <div className="p-8 overflow-y-auto space-y-8 custom-scrollbar">
          <div className="space-y-6">
            <div>
              <label className="block text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">
                Risk Title
              </label>
              <input
                value={formData.risk_title}
                onChange={(e) => handleChange("risk_title", e.target.value)}
                type="text"
                className="w-full rounded-xl border-2 border-slate-200 dark:border-[#3b4754] bg-slate-50 dark:bg-[#283039] text-lg focus:ring-4 focus:ring-[#137fec]/20 focus:border-[#137fec] dark:text-white p-4 outline-none transition-all"
                placeholder="e.g., Potential data leakage in vendor API"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="block text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">
                Category
              </label>
              <div className="relative">
                <select
                  value={formData.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="w-full appearance-none rounded-xl border-2 border-slate-200 dark:border-[#3b4754] bg-slate-50 dark:bg-[#283039] text-lg dark:text-white p-4 outline-none cursor-pointer"
                >
                  <option value="Security">Security</option>
                  <option value="Operational">Operational</option>
                  <option value="Financial">Financial</option>
                  <option value="Compliance">Compliance</option>
                </select>
                <ChevronDown
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  size={20}
                />
              </div>
            </div>
            <div>
              <label className="block text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">
                Risk Owner
              </label>
              <div className="relative">
                {/* <Search
                  size={22}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                /> */}
                {/* <input
                  value={formData.risk_owner}
                  onChange={(e) => handleChange("risk_owner", e.target.value)}
                  type="text"
                  className="w-full pl-12 rounded-xl border-2 border-slate-200 dark:border-[#3b4754] bg-slate-50 dark:bg-[#283039] text-lg focus:ring-4 focus:ring-[#137fec]/20 focus:border-[#137fec] dark:text-white p-4 outline-none transition-all"
                  placeholder="Search team members..."
                /> */}
                <select
                  value={formData.risk_owner}
                  onChange={(e) => handleChange("risk_owner", e.target.value)}
                  className="w-full appearance-none rounded-xl border-2 border-slate-200 dark:border-[#3b4754] bg-slate-50 dark:bg-[#283039] text-lg dark:text-white p-4 outline-none cursor-pointer"
                >
                  <option>Select Risk Owner</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.first_name} {user.last_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Assessment Matrix Box - Larger Score Display */}
          <div className="bg-slate-50 dark:bg-[#283039]/50 rounded-2xl p-6 border-2 border-dashed border-slate-300 dark:border-[#3b4754]">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-sm font-black text-slate-500 dark:text-slate-400 uppercase tracking-[0.2em]">
                Risk Score Assessment
              </h4>
              <div className="flex items-center gap-3">
                <span className="text-sm font-bold text-slate-500">
                  Calculated Severity:
                </span>
                <span className="px-4 py-1.5 rounded-full text-sm font-black bg-orange-500/10 text-orange-600 border-2 border-orange-500/20 shadow-sm">
                  {riskScore} • {severity}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-1">
                  Likelihood (Probability)
                </label>
                <select
                  value={formData.likelihood}
                  onChange={(e) => handleChange("likelihood", e.target.value)}
                  className="w-full rounded-xl border-2 border-slate-200 dark:border-[#3b4754] bg-white dark:bg-[#283039] text-lg font-bold dark:text-white p-4 outline-none shadow-sm"
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH"> HIGH</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase ml-1">
                  Impact (Consequence)
                </label>
                <select
                  value={formData.impact}
                  onChange={(e) => handleChange("impact", e.target.value)}
                  className="w-full border p-3 rounded-lg"
                >
                  <option value="LOW">LOW</option>
                  <option value="MEDIUM">MEDIUM</option>
                  <option value="HIGH"> HIGH</option>
                  <option value="CRITICAL"> CRITICAL</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">
              Mitigation Strategy
            </label>
            <textarea
              rows="3"
              value={formData.mitigation_plan}
              onChange={(e) => handleChange("mitigation_plan", e.target.value)}
              className="w-full rounded-xl border-2 border-slate-200 dark:border-[#3b4754] bg-slate-50 dark:bg-[#283039] text-lg focus:ring-4 focus:ring-[#137fec]/20 focus:border-[#137fec] dark:text-white p-4 outline-none transition-all"
              placeholder="Outline the internal controls or steps to reduce this risk..."
            />
          </div>
          <div>
            <label className="block text-lg font-bold text-slate-800 dark:text-slate-200 mb-3">
              Risk Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleChange("description", e.target.value)}
              rows="4"
              className="w-full rounded-xl border-2 border-slate-200 dark:border-[#3b4754] bg-slate-50 dark:bg-[#283039] text-lg focus:ring-4 focus:ring-[#137fec]/20 focus:border-[#137fec] dark:text-white p-4 outline-none transition-all"
              placeholder="Describe the risk and its potential impact on the organization..."
            />
          </div>
        </div>

        {/* Footer - Bigger Buttons */}
        <div className="px-8 py-6 bg-slate-50 dark:bg-[#283039] border-t border-slate-200 dark:border-[#3b4754] flex items-center justify-end gap-5 rounded-b-2xl">
          <button
            onClick={onClose}
            className="cursor-pointer px-6 py-3 text-lg font-bold text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all"
          >
            Cancel Assessment
          </button>
          <button
            onClick={handleSubmit}
            className="flex cursor-pointer items-center gap-3 px-10 py-4 bg-[#137fec] text-white text-lg font-black rounded-xl hover:bg-blue-600 shadow-xl shadow-[#137fec]/30 transition-all active:scale-95"
          >
            <ShieldCheck size={22} />
            <span>Create Risk Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default RiskModal;
