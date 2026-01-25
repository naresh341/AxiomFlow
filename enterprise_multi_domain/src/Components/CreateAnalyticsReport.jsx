import {
  BarChart3,
  Calendar,
  ChevronDown,
  Clock,
  Filter,
  Info,
  LineChart,
  ListFilter,
  Mail,
  Save,
  X,
} from "lucide-react";
import { useState } from "react";

const CreateAnalyticsReport = ({ isOpen, onClose }) => {
  const [scheduleType, setScheduleType] = useState("once");
  const [reportName, setReportName] = useState("");

  if (!isOpen) return null;

  const metricCategories = [
    {
      title: "Usage Metrics",
      metrics: ["Active users", "Feature adoption", "Session duration"],
    },
    {
      title: "Workflow Metrics",
      metrics: ["Success rate", "Avg execution time", "Failure count"],
    },
    {
      title: "Approval Metrics",
      metrics: ["Approval time", "Rejection rate", "Escalations"],
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-[1024px] bg-white dark:bg-[#101622] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden border border-slate-200 dark:border-slate-800 animate-in zoom-in-95 duration-300">
        {/* Header */}
        <header className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-8 py-5 flex-none bg-white dark:bg-[#1c1f27]">
          <div className="flex items-center gap-4">
            <div className="bg-[#135bec]/10 p-2.5 rounded-xl text-[#135bec]">
              <BarChart3 size={24} />
            </div>
            <div>
              <h2 className="text-slate-900 dark:text-white text-xl font-black tracking-tight">
                Create Analytics Report
              </h2>
              <p className="text-slate-500 text-xs font-medium">
                Configure custom insights and automated scheduling
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={24} />
          </button>
        </header>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-8 space-y-10 grow custom-scrollbar">
          {/* Section 1: Report Details */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Info size={16} className="text-slate-400" />
              <h3 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">
                Report Details
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-bold">
                  Report Name
                </label>
                <input
                  type="text"
                  value={reportName}
                  onChange={(e) => setReportName(e.target.value)}
                  className="w-full h-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 px-4 text-sm focus:ring-2 focus:ring-[#135bec]/20 focus:border-[#135bec] outline-none transition-all placeholder:text-slate-400"
                  placeholder="e.g. Q1 Performance Audit"
                />
              </div>
              <div className="space-y-2">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-bold">
                  Report Type
                </label>
                <div className="relative">
                  <select className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm appearance-none focus:ring-2 focus:ring-[#135bec]/20 outline-none transition-all cursor-pointer">
                    <option>Performance Overview</option>
                    <option>Compliance Audit</option>
                    <option>Executive Summary</option>
                  </select>
                  <ChevronDown
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                    size={18}
                  />
                </div>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-bold">
                  Description
                </label>
                <textarea
                  rows="2"
                  className="w-full p-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm focus:ring-2 focus:ring-[#135bec]/20 outline-none transition-all resize-none placeholder:text-slate-400"
                  placeholder="Describe the objective of this report..."
                />
              </div>
            </div>
          </section>

          {/* Section 2: Metrics Selection */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <ListFilter size={16} className="text-slate-400" />
              <h3 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">
                Select Metrics
              </h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-slate-50 dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-100 dark:border-slate-800">
              {metricCategories.map((cat) => (
                <div key={cat.title} className="space-y-4">
                  <h4 className="text-[#135bec] text-[10px] font-black uppercase tracking-[0.1em]">
                    {cat.title}
                  </h4>
                  <div className="space-y-3">
                    {cat.metrics.map((metric) => (
                      <label
                        key={metric}
                        className="flex items-center gap-3 cursor-pointer group"
                      >
                        <div className="relative flex items-center">
                          <input
                            type="checkbox"
                            className="peer w-5 h-5 rounded border-slate-300 dark:border-slate-600 text-[#135bec] focus:ring-[#135bec] dark:bg-slate-800"
                          />
                          <div className="absolute inset-0 m-auto w-3 h-3 bg-[#135bec] scale-0 peer-checked:scale-100 transition-transform rounded-[2px]" />
                        </div>
                        <span className="text-slate-600 dark:text-slate-300 text-sm font-medium group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                          {metric}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 3: Filters */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Filter size={16} className="text-slate-400" />
              <h3 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">
                Filters
              </h3>
            </div>
            <div className="flex flex-wrap gap-4">
              <div className="flex-1 min-w-[200px] space-y-2">
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                  Date Range
                </p>
                <div className="relative">
                  <Calendar
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
                    size={16}
                  />
                  <input
                    className="w-full h-11 pl-10 pr-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold"
                    defaultValue="Last 30 Days"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-[200px] space-y-2">
                <p className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">
                  Team Assignment
                </p>
                <div className="flex flex-wrap gap-1.5 p-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 min-h-[44px]">
                  {["Product", "Engineering"].map((tag) => (
                    <span
                      key={tag}
                      className="bg-[#135bec]/10 text-[#135bec] text-[10px] font-black px-2.5 py-1 rounded-lg flex items-center gap-1.5"
                    >
                      {tag} <X size={12} className="cursor-pointer" />
                    </span>
                  ))}
                  <input
                    className="flex-1 min-w-[60px] border-none p-0 text-xs bg-transparent"
                    placeholder="Add..."
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Schedule */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-slate-400" />
              <h3 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">
                Schedule Report
              </h3>
            </div>
            <div className="space-y-6">
              <div className="flex gap-8">
                {["once", "recurring"].map((type) => (
                  <label
                    key={type}
                    className="flex items-center gap-3 cursor-pointer group"
                  >
                    <input
                      type="radio"
                      name="schedule"
                      checked={scheduleType === type}
                      onChange={() => setScheduleType(type)}
                      className="w-4 h-4 text-[#135bec] focus:ring-[#135bec] border-slate-300"
                    />
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-300 capitalize">
                      {type.replace("_", " ")}
                    </span>
                  </label>
                ))}
              </div>

              <div
                className={`grid grid-cols-1 md:grid-cols-3 gap-4 p-5 rounded-2xl border transition-all ${
                  scheduleType === "recurring"
                    ? "bg-[#135bec]/5 border-[#135bec]/20 opacity-100 scale-100"
                    : "bg-slate-50 dark:bg-slate-800/20 border-slate-200 dark:border-slate-800 opacity-60 pointer-events-none"
                }`}
              >
                <div className="space-y-1.5">
                  <p className="text-[10px] font-black uppercase text-slate-500">
                    Frequency
                  </p>
                  <select className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold">
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] font-black uppercase text-slate-500">
                    Delivery Time
                  </p>
                  <input
                    type="time"
                    className="w-full h-10 px-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm font-bold"
                    defaultValue="09:00"
                  />
                </div>
                <div className="space-y-1.5">
                  <p className="text-[10px] font-black uppercase text-slate-500">
                    Recipients
                  </p>
                  <div className="relative">
                    <Mail
                      size={14}
                      className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                    />
                    <input
                      className="w-full h-10 pl-9 pr-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-sm"
                      placeholder="Add email..."
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Section 5: Preview */}
          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <LineChart size={16} className="text-slate-400" />
                <h3 className="text-slate-900 dark:text-white text-lg font-bold tracking-tight">
                  Report Preview
                </h3>
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />{" "}
                Live View
              </span>
            </div>
            <div className="h-44 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-800/10 transition-all hover:bg-slate-100/50">
              <div className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-sm mb-3">
                <BarChart3 size={32} className="text-slate-300" />
              </div>
              <p className="text-slate-400 text-sm font-medium">
                Configure metrics and filters to generate report preview
              </p>
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer className="flex items-center justify-end gap-3 px-8 py-6 border-t border-slate-100 dark:border-slate-800 bg-slate-50 dark:bg-[#1c1f27]">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-800 font-bold text-sm transition-all"
          >
            Cancel
          </button>
          <button
            disabled={!reportName}
            className={`px-8 py-2.5 rounded-xl font-black text-sm flex items-center gap-2 transition-all shadow-lg ${
              reportName
                ? "bg-[#135bec] text-white hover:brightness-110 shadow-[#135bec]/20 active:scale-95"
                : "bg-slate-200 dark:bg-slate-800 text-slate-400 cursor-not-allowed shadow-none"
            }`}
          >
            <Save size={18} />
            Save Report
          </button>
        </footer>
      </div>
    </div>
  );
};

export default CreateAnalyticsReport;
