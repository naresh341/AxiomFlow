import React, { useState } from "react";
import {
  X,
  ChevronRight,
  ChevronLeft,
  Info,
  BarChart3,
  Database,
  CalendarDays,
} from "lucide-react";

const CreateReportModal = ({ isOpen, onClose }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    description: "",
  });

  if (!isOpen) return null;

  const handleNext = () => setStep((s) => Math.min(s + 1, 3));
  const handleBack = () => setStep((s) => Math.max(s - 1, 1));

  const steps = [
    { id: 1, label: "Details", icon: <BarChart3 size={16} /> },
    { id: 2, label: "Data Source", icon: <Database size={16} /> },
    { id: 3, label: "Schedule", icon: <CalendarDays size={16} /> },
  ];

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative bg-white dark:bg-slate-900 w-full max-w-3xl rounded-xl shadow-2xl flex flex-col overflow-hidden animate-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-200 dark:border-slate-800">
          <div>
            <h2 className="text-2xl font-black tracking-tight text-slate-900 dark:text-white">
              Create New Report
            </h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Configure your custom enterprise analytics report.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Stepper Indicator */}
        <div className="px-8 py-4 bg-slate-50 dark:bg-slate-800/30 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center justify-between max-w-lg mx-auto">
            {steps.map((s, idx) => (
              <React.Fragment key={s.id}>
                <div
                  className={`flex items-center gap-3 transition-opacity ${step >= s.id ? "opacity-100" : "opacity-40"}`}
                >
                  <div
                    className={`size-8 rounded-full flex items-center justify-center text-sm font-bold ${
                      step >= s.id
                        ? "bg-blue-600 text-white"
                        : "border-2 border-slate-300 dark:border-slate-600 text-slate-500"
                    }`}
                  >
                    {s.id}
                  </div>
                  <span
                    className={`text-sm font-bold ${step >= s.id ? "text-blue-600" : "text-slate-500"}`}
                  >
                    {s.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div
                    className={`flex-1 h-px mx-4 ${step > s.id ? "bg-blue-600" : "bg-slate-200 dark:bg-slate-700"}`}
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Form Content */}
        <div className="px-8 py-8 flex flex-col gap-6 flex-1 overflow-y-auto min-h-[400px]">
          {step === 1 && (
            <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  Report Name <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  className="w-full h-11 px-4 rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  placeholder="e.g., Monthly Executive Summary"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  Report Category <span className="text-rose-500">*</span>
                </label>
                <select
                  className="w-full h-11 px-4 rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-600"
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option value="">Select a category</option>
                  <option value="usage">Usage Analytics</option>
                  <option value="financial">Financial Performance</option>
                  <option value="operational">Operational Efficiency</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
                  Description
                </label>
                <textarea
                  className="w-full px-4 py-3 rounded-lg border-slate-200 dark:border-slate-700 dark:bg-slate-800 text-sm focus:ring-2 focus:ring-blue-600 min-h-[120px]"
                  placeholder="Describe the purpose and target audience..."
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                />
                <div className="flex items-center gap-1.5 text-slate-400 mt-1">
                  <Info size={14} />
                  <p className="text-xs">Shown on the report cover page.</p>
                </div>
              </div>
            </div>
          )}

          {step > 1 && (
            <div className="flex flex-col items-center justify-center py-12 text-center animate-in slide-in-from-right-4 duration-300">
              <div className="size-16 bg-blue-50 dark:bg-blue-900/20 text-blue-600 rounded-full flex items-center justify-center mb-4">
                {steps.find((s) => s.id === step)?.icon}
              </div>
              <h3 className="text-lg font-bold dark:text-white">
                Step {step} Configuration
              </h3>
              <p className="text-slate-500 max-w-xs">
                This section would contain specific configuration for{" "}
                {steps.find((s) => s.id === step)?.label.toLowerCase()}.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-8 py-6 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30 flex items-center justify-between">
          <span className="text-sm font-medium text-slate-500">
            Step {step} of 3
          </span>
          <div className="flex gap-3">
            {step > 1 ? (
              <button
                onClick={handleBack}
                className="flex items-center gap-2 px-6 h-11 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-bold dark:text-white hover:bg-white dark:hover:bg-slate-800 transition-all"
              >
                <ChevronLeft size={18} /> Back
              </button>
            ) : (
              <button
                onClick={onClose}
                className="px-6 h-11 rounded-lg border border-slate-200 dark:border-slate-700 text-sm font-bold dark:text-white hover:bg-white dark:hover:bg-slate-800 transition-all"
              >
                Cancel
              </button>
            )}

            <button
              onClick={handleNext}
              disabled={step === 1 && !formData.name}
              className="flex items-center gap-2 px-8 h-11 rounded-lg bg-blue-600 text-white text-sm font-bold shadow-sm hover:bg-blue-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {step === 3 ? "Generate Report" : "Next"}
              {step < 3 && <ChevronRight size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateReportModal;
