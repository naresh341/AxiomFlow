import React, { useState } from "react";
import {
  X,
  ChevronDown,
  ShieldCheck,
  AlertTriangle,
  Calendar,
  Lock,
  Globe,
  Zap,
} from "lucide-react";

const GenerateApiKeyModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    environment: "production",
    expiry: "",
  });

  const scopes = [
    { id: "users:read", label: "users:read" },
    { id: "users:write", label: "users:write" },
    { id: "analytics:read", label: "analytics:read" },
    { id: "billing:read", label: "billing:read" },
    { id: "webhooks:manage", label: "webhooks:manage" },
    { id: "logs:view", label: "logs:view" },
  ];

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-180 bg-white dark:bg-[#101622] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-200">
        {/* Header */}
        <header className="flex items-center justify-between px-8 py-5 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#135bec]/10 rounded-lg text-[#135bec]">
              <Zap size={20} fill="currentColor" />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900 dark:text-white leading-none">
                Generate API Key
              </h3>
              <p className="text-xs text-slate-500 mt-1 font-medium">
                Create credentials for your application
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 transition-colors"
          >
            <X size={20} />
          </button>
        </header>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
          {/* Key Name */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              Key Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              placeholder="e.g., Mobile App Production"
              className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-[#135bec]/20 focus:border-[#135bec] transition-all outline-none"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </div>

          {/* Environment */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
              Environment
            </label>
            <div className="relative">
              <select
                className="w-full h-12 px-4 appearance-none rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-[#135bec]/20 transition-all outline-none cursor-pointer font-bold"
                value={formData.environment}
                onChange={(e) =>
                  setFormData({ ...formData, environment: e.target.value })
                }
              >
                <option value="production">Production</option>
                <option value="development">Development</option>
                <option value="staging">Staging</option>
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                size={18}
              />
            </div>
          </div>

          {/* Scopes Grid */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-300">
                Scopes
              </label>
              <span className="text-[10px] font-black uppercase tracking-widest text-[#135bec]">
                Granular Control
              </span>
            </div>
            <div className="grid grid-cols-2 gap-3 p-5 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-100 dark:border-slate-800">
              {scopes.map((scope) => (
                <label
                  key={scope.id}
                  className="flex items-center gap-3 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-slate-300 text-[#135bec] focus:ring-[#135bec] transition-all cursor-pointer dark:bg-slate-800 dark:border-slate-600"
                  />
                  <span className="text-xs font-mono font-medium text-slate-600 dark:text-slate-400 group-hover:text-[#135bec] transition-colors">
                    {scope.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Expiry */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-300 flex items-center gap-2">
              Expiry Date{" "}
              <span className="text-slate-400 font-normal">(Optional)</span>
            </label>
            <div className="relative">
              <Calendar
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="date"
                className="w-full h-12 pl-12 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-[#135bec]/20 transition-all outline-none"
                value={formData.expiry}
                onChange={(e) =>
                  setFormData({ ...formData, expiry: e.target.value })
                }
              />
            </div>
            <p className="text-[10px] text-slate-500 pl-1">
              Key will automatically expire and be revoked after this date.
            </p>
          </div>

          {/* Warning Block */}
          <div className="flex gap-4 p-4 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-900/30 rounded-xl">
            <div className="mt-0.5">
              <AlertTriangle className="text-amber-600" size={18} />
            </div>
            <p className="text-xs text-amber-800 dark:text-amber-200 leading-relaxed font-medium">
              Keep your API keys secure. They will{" "}
              <span className="font-bold underline">
                only be displayed once
              </span>
              . If you lose this key, you will need to regenerate a new one.
            </p>
          </div>
        </div>

        {/* Footer */}
        <footer className="px-8 py-6 bg-slate-50 dark:bg-slate-800/30 border-t border-slate-100 dark:border-slate-800 flex items-center justify-end gap-4">
          <button
            onClick={onClose}
            className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white transition-all"
          >
            Cancel
          </button>
          <button
            disabled={!formData.name}
            className={`px-8 py-2.5 rounded-xl text-sm font-black flex items-center gap-2 transition-all shadow-lg ${
              formData.name
                ? "bg-[#135bec] text-white hover:brightness-110 shadow-[#135bec]/20 active:scale-95"
                : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none"
            }`}
          >
            <Lock size={16} />
            Generate Key
          </button>
        </footer>
      </div>
    </div>
  );
};

export default GenerateApiKeyModal;
