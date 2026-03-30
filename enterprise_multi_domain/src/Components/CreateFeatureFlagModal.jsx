import {
  Calendar,
  HelpCircle,
  Info,
  Plus,
  Settings,
  ShieldCheck,
  Target,
  X,
  Search,
  Globe,
} from "lucide-react";
import { useState } from "react";
// import { create_Flag, get_Flag } from "../RTKThunk/AsyncThunk";
import { useDispatch } from "react-redux";
import { create_Flag, get_Flag } from "../RTKThunk/GovernanceThunk";
import { useNotify } from "./MiniComponent/useNotify";

const CreateFeatureFlagModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    flag_type: "on_off",
    rollout_percentage: 10,
    scope: "global",
    is_enabled: false,
  });
  const notify = useNotify();
  const generateKey = (name) => name.toLowerCase().replace(/\s+/g, "-");

  const handleCreate = () => {
    try {
      const payload = {
        ...formData,
        type: "beta",
        key: generateKey(formData.name),
      };

      notify.success("Feature flag created successfully!");

      dispatch(create_Flag(payload));
      dispatch(get_Flag());
      onClose();
    } catch (error) {
      console.error(`Error while creating Flag`, error);
      notify.error("Failed to create feature flag.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleToggle = () => {
    setFormData((prev) => ({
      ...prev,
      is_enabled: !prev.is_enabled,
    }));
  };

  const handleRolloutChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      rollout_percentage: Number(e.target.value),
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/70 backdrop-blur-md">
      {/* Increased max-width to 4xl for a much larger, "full-screen-lite" feel */}
      <div className="flex flex-col w-full max-w-4xl max-h-[92vh] bg-white dark:bg-[#101922] rounded-2xl border border-slate-200 dark:border-slate-800 shadow-full overflow-hidden transition-all">
        {/* Large Header Section */}
        <div className="flex flex-col gap-2 p-8 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101922]">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h1 className="text-slate-900 dark:text-white text-4xl font-extrabold tracking-tight">
                Create Feature Flag
              </h1>
              <p className="text-slate-500 dark:text-slate-400 text-base">
                Configure advanced targeting rules and governance controls for
                your feature.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white transition-colors rounded-full hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X size={28} />
            </button>
          </div>
        </div>

        {/* Spacious Scrollable Body */}
        <div className="overflow-y-auto flex-1 p-8 space-y-12 custom-scrollbar">
          {/* Section 1: Detailed Metadata */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600/10 rounded-lg">
                <Info className="text-blue-600" size={24} />
              </div>
              <h2 className="text-slate-900 dark:text-white text-xl font-bold">
                Flag Identification
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-3">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold uppercase tracking-wider">
                  Flag Name
                </label>
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white h-14 px-5 text-lg focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all"
                  placeholder="e.g. Next-Gen Checkout Flow"
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold uppercase tracking-wider flex items-center gap-2">
                  System Key <HelpCircle size={16} className="text-slate-400" />
                </label>
                <div className="flex h-14 w-full rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 px-5 items-center text-slate-500 dark:text-slate-400 font-mono text-base italic">
                  {formData.name
                    ? generateKey(formData.name)
                    : "auto-generated-key"}
                </div>
              </div>
              <div className="md:col-span-2 flex flex-col gap-3">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold uppercase tracking-wider">
                  Operational Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white min-h-30 p-5 text-base outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all"
                  placeholder="Explain why this flag exists and who should be allowed to change it..."
                />
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold uppercase">Scope</label>
                <select
                  name="scope"
                  value={formData.scope}
                  onChange={handleChange}
                  className="rounded-xl border p-3"
                >
                  <option value="global">Global</option>
                  <option value="org">Organization</option>
                  <option value="user">User</option>
                </select>
              </div>
              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold uppercase">Type</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="rounded-xl border p-3"
                >
                  <option value="release">Release</option>
                  <option value="beta">Beta</option>
                  <option value="experiment">Experiment</option>
                </select>
              </div>
            </div>
          </section>

          <hr className="border-slate-200 dark:border-slate-800" />

          {/* Section 2: Large Configuration Cards */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600/10 rounded-lg">
                <Settings className="text-blue-600" size={24} />
              </div>
              <h2 className="text-slate-900 dark:text-white text-xl font-bold">
                Traffic Configuration
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {["on_off", "percentage", "targeted"].map((type) => (
                <label
                  key={type}
                  className={`flex flex-col gap-3 p-6 rounded-2xl border-2 cursor-pointer transition-all ${
                    formData.flag_type === type
                      ? "border-blue-600 bg-blue-600/5 dark:bg-blue-600/10 shadow-md"
                      : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <input
                      type="radio"
                      name="flag_type"
                      checked={formData.flag_type === type}
                      onChange={() =>
                        setFormData((prev) => ({
                          ...prev,
                          flag_type: type,
                        }))
                      }
                      className="w-5 h-5 text-blue-600"
                    />
                    <div
                      className={`p-2 rounded-lg ${formData.flag_type === type ? "bg-blue-600 text-white" : "bg-slate-100 dark:bg-slate-800 text-slate-400"}`}
                    >
                      {type === "on_off" && <Globe size={20} />}
                      {type === "percentage" && <Target size={20} />}
                      {type === "targeted" && <Search size={20} />}
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="block text-slate-900 dark:text-white text-lg font-bold capitalize">
                      {type.replace("_", " / ")}
                    </span>
                    <span className="text-slate-500 dark:text-slate-400 text-sm leading-snug">
                      {type === "on_off"
                        ? "Global boolean switch for instant kill."
                        : type === "percentage"
                          ? "Incremental rollout to user base."
                          : "Rule-based targeting."}
                    </span>
                  </div>
                </label>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-6">
              <div className="flex items-center justify-between p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <div className="space-y-1">
                  <span className="block text-slate-900 dark:text-white text-base font-bold">
                    Initial State
                  </span>
                  <span className="text-slate-500 text-sm font-medium">
                    Flag value upon creation
                  </span>
                </div>
                <Toggle
                  scale="large"
                  checked={formData.is_enabled}
                  onChange={handleToggle}
                />
              </div>
              <div className="flex flex-col gap-4">
                <div className="flex justify-between items-end">
                  <label className="text-slate-700 dark:text-slate-300 text-sm font-bold uppercase tracking-widest">
                    Traffic Allocation
                  </label>
                  <span className="text-blue-600 text-2xl font-black">
                    {formData.rollout_percentage}%
                  </span>
                </div>
                <input
                  type="range"
                  value={formData.rollout_percentage}
                  onChange={handleRolloutChange}
                  className="w-full h-3 bg-slate-200 dark:bg-slate-700 rounded-full appearance-none cursor-pointer accent-blue-600"
                />
              </div>
            </div>
          </section>

          <hr className="border-slate-200 dark:border-slate-800" />

          {/* Section 3: Governance & Compliance */}
          <section className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-600/10 rounded-lg">
                <ShieldCheck className="text-blue-600" size={24} />
              </div>
              <h2 className="text-slate-900 dark:text-white text-xl font-bold">
                Governance & Compliance
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-start justify-between p-6 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-900/30">
                <div className="space-y-2">
                  <span className="block text-slate-900 dark:text-white text-base font-bold">
                    Enforce Peer Review
                  </span>
                  <p className="text-slate-500 text-sm max-w-60">
                    Requires approval from Engineering Manager before the flag
                    can be toggled in Production.
                  </p>
                </div>
                <Toggle defaultChecked />
              </div>

              <div className="flex flex-col gap-3">
                <label className="text-slate-700 dark:text-slate-300 text-sm font-semibold uppercase tracking-wider">
                  Mandatory Review Date
                </label>
                <div className="relative">
                  <Calendar
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                    size={20}
                  />
                  <input
                    type="date"
                    className="w-full rounded-xl border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white h-14 pl-12 pr-5 text-base focus:ring-4 focus:ring-blue-600/10 outline-none [scheme:light] dark:[scheme:dark]"
                    defaultValue="2024-12-31"
                  />
                </div>
                <p className="text-[12px] text-slate-500 italic px-1">
                  * GRC Policy: Feature flags must be reviewed every 90 days.
                </p>
              </div>
            </div>
          </section>
        </div>

        {/* Large Footer with Clear Actions */}
        <div className="p-8 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/50 flex items-center justify-end gap-6">
          <button
            type="button"
            onClick={onClose}
            className=" cursor-pointer px-8 h-14 text-slate-600 dark:text-slate-300 text-base font-bold rounded-xl border-2 border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            Discard Changes
          </button>
          <button
            type="submit"
            onClick={handleCreate}
            className="px-12 h-14 bg-blue-600 text-white text-lg font-bold rounded-xl hover:scale-[1.02] active:scale-95 transition-all flex items-center gap-3 shadow-xl shadow-blue-600/25 cursor-pointer"
          >
            <Plus size={20} strokeWidth={3} />
            Initialize Flag
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper Toggle with variable sizing
const Toggle = ({ checked, onChange, scale = "normal" }) => (
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={checked}
      onChange={onChange}
    />
    <div
      className={`
      ${scale === "large" ? "w-14 h-8" : "w-11 h-6"} 
      bg-slate-300 dark:bg-slate-700 rounded-full peer 
      peer-checked:after:translate-x-full after:content-[''] after:absolute 
      ${scale === "large" ? "after:top-1 after:left-1 after:h-6 after:w-6" : "after:top-0.5 after:left-0.5 after:h-5 after:w-5"}
      after:bg-white after:rounded-full after:transition-all peer-checked:bg-blue-600
    `}
    ></div>
  </label>
);

export default CreateFeatureFlagModal;
