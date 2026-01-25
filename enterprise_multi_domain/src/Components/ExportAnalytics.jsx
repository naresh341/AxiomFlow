import React, { useState } from "react";
import {
  X,
  Database,
  Filter,
  FileText,
  Send,
  Download,
  CheckCircle2,
  Mail,
  ChevronDown,
  FileCode,
  Table as TableIcon,
  FileBarChart,
} from "lucide-react";

const ExportAnalytics = ({ isOpen, onClose }) => {
  const [format, setFormat] = useState("excel");
  const [delivery, setDelivery] = useState("download");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Container - Desktop 720px */}
      <div className="relative w-200 max-h-[90vh] bg-[#f6f6f8] dark:bg-[#101622] rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 font-sans">
        {/* HEADER */}
        <div className="flex items-center justify-between p-6 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1c1f27]">
          <h2 className="text-slate-900 dark:text-white text-2xl font-black tracking-tight leading-tight">
            Export Analytics Data
          </h2>
          <button
            onClick={onClose}
            className="flex h-10 w-10 items-center justify-center rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* SCROLLABLE BODY */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar">
          {/* SECTION 1: DATA SCOPE */}
          <section className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1c1f27]/50 space-y-6">
            <div className="flex items-center gap-2.5">
              <Database className="text-[#135bec]" size={20} />
              <h3 className="text-slate-900 dark:text-white text-lg font-bold">
                Data Scope
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-bold">
                  Date Range
                </label>
                <div className="relative">
                  <select className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none appearance-none focus:ring-2 focus:ring-[#135bec]/20 focus:border-[#135bec] transition-all cursor-pointer">
                    <option value="7d">Last 7 Days</option>
                    <option value="30d" selected>
                      Last 30 Days
                    </option>
                    <option value="90d">Last 90 Days</option>
                    <option value="custom">Custom Range</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    size={18}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-bold">
                  Granularity
                </label>
                <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-xl gap-1">
                  {["Daily", "Weekly", "Monthly"].map((g) => (
                    <label
                      key={g}
                      className="flex-1 text-xs font-bold flex items-center justify-center h-10 rounded-lg cursor-pointer transition-all has-[:checked]:bg-white dark:has-[:checked]:bg-slate-700 has-[:checked]:shadow-sm has-[:checked]:text-[#135bec] text-slate-500 dark:text-slate-400"
                    >
                      {g}
                      <input
                        type="radio"
                        name="gran"
                        defaultChecked={g === "Daily"}
                        className="hidden"
                      />
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-slate-700 dark:text-slate-300 text-sm font-bold">
                Analytics Type
              </label>
              <div className="flex flex-wrap gap-2">
                {["Usage", "Workflow", "Approval", "SLA"].map((type) => {
                  const isActive = type !== "Approval";
                  return (
                    <button
                      key={type}
                      className={`flex h-9 items-center gap-2 rounded-full px-4 text-sm font-bold transition-all border ${
                        isActive
                          ? "bg-[#135bec]/10 border-[#135bec]/20 text-[#135bec]"
                          : "bg-slate-100 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-400"
                      }`}
                    >
                      {isActive && <CheckCircle2 size={14} />}
                      {type}
                    </button>
                  );
                })}
              </div>
            </div>
          </section>

          {/* SECTION 2: FILTERS */}
          <section className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1c1f27]/50 space-y-6">
            <div className="flex items-center gap-2.5">
              <Filter className="text-[#135bec]" size={20} />
              <h3 className="text-slate-900 dark:text-white text-lg font-bold">
                Apply Filters
              </h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-bold">
                  Organization
                </label>
                <div className="relative">
                  <select className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white outline-none appearance-none focus:ring-2 focus:ring-[#135bec]/20 focus:border-[#135bec] transition-all cursor-pointer">
                    <option>Acme Global Enterprise</option>
                    <option>Globex Corporation</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    size={18}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-slate-700 dark:text-slate-300 text-sm font-bold">
                    Team
                  </label>
                  <div className="flex flex-wrap gap-2 p-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 min-h-[48px]">
                    {["Product", "Engineering"].map((t) => (
                      <span
                        key={t}
                        className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300"
                      >
                        {t} <X size={12} className="cursor-pointer" />
                      </span>
                    ))}
                    <button className="text-[#135bec] text-xs font-bold px-1">
                      + Add
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-slate-700 dark:text-slate-300 text-sm font-bold">
                    User Role
                  </label>
                  <div className="flex flex-wrap gap-2 p-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 min-h-[48px]">
                    <span className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-700 px-2.5 py-1 rounded-lg text-xs font-bold text-slate-700 dark:text-slate-300">
                      Admin <X size={12} className="cursor-pointer" />
                    </span>
                    <button className="text-[#135bec] text-xs font-bold px-1">
                      + Select
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: FORMAT */}
          <section className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1c1f27]/50 space-y-6">
            <div className="flex items-center gap-2.5">
              <FileText className="text-[#135bec]" size={20} />
              <h3 className="text-slate-900 dark:text-white text-lg font-bold">
                Export Format
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-3">
              {[
                { id: "csv", label: "CSV", icon: <FileCode size={28} /> },
                { id: "excel", label: "Excel", icon: <TableIcon size={28} /> },
                { id: "pdf", label: "PDF", icon: <FileBarChart size={28} /> },
              ].map((f) => (
                <label key={f.id} className="cursor-pointer group">
                  <input
                    type="radio"
                    name="format"
                    className="hidden peer"
                    checked={format === f.id}
                    onChange={() => setFormat(f.id)}
                  />
                  <div className="flex flex-col items-center gap-3 p-4 rounded-2xl border-2 border-transparent bg-slate-50 dark:bg-slate-800 text-slate-500 dark:text-slate-400 peer-checked:border-[#135bec] peer-checked:bg-[#135bec]/5 peer-checked:text-[#135bec] transition-all group-hover:bg-slate-100 dark:group-hover:bg-slate-700">
                    {f.icon}
                    <span className="text-sm font-black">{f.label}</span>
                  </div>
                </label>
              ))}
            </div>

            <label className="flex items-start gap-3 cursor-pointer group pt-4 border-t border-slate-100 dark:border-slate-800">
              <input
                type="checkbox"
                className="mt-1 w-5 h-5 rounded border-slate-300 text-[#135bec] focus:ring-[#135bec]"
              />
              <div className="space-y-0.5">
                <p className="text-sm font-bold text-slate-900 dark:text-slate-300 group-hover:text-[#135bec] transition-colors">
                  Include visual charts as high-resolution images
                </p>
                <p className="text-xs text-slate-500">
                  Optimized for PDF and Excel reports.
                </p>
              </div>
            </label>
          </section>

          {/* SECTION 4: DELIVERY */}
          <section className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1c1f27]/50 space-y-6">
            <div className="flex items-center gap-2.5">
              <Send className="text-[#135bec]" size={20} />
              <h3 className="text-slate-900 dark:text-white text-lg font-bold">
                Delivery Method
              </h3>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: "download",
                  title: "Download immediately",
                  desc: "Your browser will start the download once processing is complete.",
                },
                {
                  id: "email",
                  title: "Email export when ready",
                  desc: "Great for large datasets. We'll send a secure link to your inbox.",
                },
              ].map((method) => (
                <label
                  key={method.id}
                  className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors group"
                >
                  <input
                    type="radio"
                    name="delivery"
                    checked={delivery === method.id}
                    onChange={() => setDelivery(method.id)}
                    className="mt-1 w-5 h-5 text-[#135bec] focus:ring-[#135bec] border-slate-300"
                  />
                  <div className="flex-1 space-y-3">
                    <div className="space-y-0.5">
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {method.title}
                      </p>
                      <p className="text-xs text-slate-500">{method.desc}</p>
                    </div>
                    {method.id === "email" && delivery === "email" && (
                      <div className="relative animate-in slide-in-from-top-2">
                        <input
                          type="email"
                          className="w-full h-11 px-4 pr-10 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-[#135bec]/20 focus:border-[#135bec] outline-none transition-all"
                          defaultValue="alex.morrison@enterprise.com"
                        />
                        <Mail
                          size={16}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                        />
                      </div>
                    )}
                  </div>
                </label>
              ))}
            </div>
          </section>
        </div>

        {/* FOOTER */}
        <div className="p-6 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#1c1f27] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 h-12 text-sm font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl transition-all"
          >
            Cancel
          </button>
          <button className="px-8 h-12 text-sm font-black text-white bg-[#135bec] hover:brightness-110 rounded-xl shadow-lg shadow-[#135bec]/20 transition-all flex items-center gap-2 active:scale-95">
            <Download size={20} />
            Export Data
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportAnalytics;
