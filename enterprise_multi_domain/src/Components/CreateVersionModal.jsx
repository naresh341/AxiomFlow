import { AlertCircle, ChevronDown, Info, X } from "lucide-react";

const CreateVersionModal = ({
  isOpen,
  onClose,
  baseVersions = ["v2.0.4", "v2.0.3", "v2.0.2"],
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Modal Backdrop Overlay */}
      <div
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative z-50 w-full max-w-[640px] bg-white dark:bg-slate-900 rounded-xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-800 animate-in fade-in zoom-in duration-200">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-6 py-4">
          <h3 className="text-slate-900 dark:text-white text-xl font-bold leading-tight">
            Create New Version
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors p-1"
          >
            <X size={24} />
          </button>
        </div>

        {/* Form Body */}
        <div className="px-6 py-8 space-y-6">
          {/* Base Version Dropdown */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 pb-1">
              <label className="text-slate-900 dark:text-slate-200 text-sm font-semibold leading-normal">
                Base Version
              </label>
              <div className="group relative flex items-center">
                <Info size={14} className="text-slate-400 cursor-help" />
                <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block w-48 p-2 bg-slate-800 text-white text-[10px] rounded shadow-lg">
                  Select the existing version you want to branch or clone from.
                </span>
              </div>
            </div>
            <div className="relative">
              <select className="w-full appearance-none rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-4 focus:ring-primary/10 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary h-12 px-4 text-base font-normal transition-all outline-none">
                {baseVersions.map((v, i) => (
                  <option key={v} value={v}>
                    {v} {i === 0 ? "(Current Active)" : ""}
                  </option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <ChevronDown size={18} />
              </div>
            </div>
          </div>

          {/* New Version Number Input */}
          <div className="flex flex-col gap-2">
            <label className="text-slate-900 dark:text-slate-200 text-sm font-semibold leading-normal pb-1">
              New Version Number
            </label>
            <input
              type="text"
              className="w-full rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-4 focus:ring-primary/10 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary h-12 px-4 text-base font-normal transition-all outline-none"
              defaultValue="v2.1.0"
            />
          </div>

          {/* Change Summary Textarea */}
          <div className="flex flex-col gap-2">
            <label className="text-slate-900 dark:text-slate-200 text-sm font-semibold leading-normal pb-1">
              Change Summary <span className="text-red-500">*</span>
            </label>
            <textarea
              className="w-full resize-none rounded-lg text-slate-900 dark:text-white focus:outline-0 focus:ring-4 focus:ring-primary/10 border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 focus:border-primary min-h-[120px] placeholder:text-slate-400 p-4 text-base font-normal transition-all outline-none"
              placeholder="Describe what has changed in this version (e.g., Fixed webhook timeout, Added validation)..."
            ></textarea>
          </div>

          {/* Start As Radio Group */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2">
              <p className="text-slate-900 dark:text-slate-200 text-sm font-semibold leading-normal">
                Start As
              </p>
              <Info size={14} className="text-slate-400 cursor-help" />
            </div>
            <div className="flex gap-6">
              <label className="flex items-center cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    defaultChecked
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 dark:border-slate-600 checked:border-[#0f49bd] transition-all"
                    name="status"
                    type="radio"
                  />
                  <div className="absolute w-2.5 h-2.5 rounded-full bg-[#0f49bd] scale-0 peer-checked:scale-100 transition-transform"></div>
                </div>
                <div className="ml-3 flex flex-col">
                  <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                    Draft
                  </span>
                </div>
              </label>

              <label className="flex items-center cursor-pointer group">
                <div className="relative flex items-center justify-center">
                  <input
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded-full border border-slate-300 dark:border-slate-600 checked:border-[#0f49bd] transition-all"
                    name="status"
                    type="radio"
                  />
                  <div className="absolute w-2.5 h-2.5 rounded-full bg-[#0f49bd] scale-0 peer-checked:scale-100 transition-transform"></div>
                </div>
                <div className="ml-3 flex flex-col">
                  <span className="text-slate-700 dark:text-slate-300 text-sm font-medium">
                    Active
                  </span>
                </div>
              </label>
            </div>

            <div className="mt-2 p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-100 dark:border-amber-900/20 rounded-lg flex gap-3">
              <AlertCircle
                size={16}
                className="text-amber-600 shrink-0 mt-0.5"
              />
              <p className="text-[11px] text-amber-700 dark:text-amber-400 leading-normal">
                Setting a version to <strong>Active</strong> will immediately
                route production traffic to this new configuration. Ensure all
                tests have passed.
              </p>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-end gap-3 px-6 py-4 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-sm font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button className="px-5 py-2.5 text-sm font-semibold text-white bg-[#0f49bd] rounded-lg hover:bg-[#0f49bd]/90 transition-colors shadow-sm shadow-primary/20">
            Create Version
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateVersionModal;
