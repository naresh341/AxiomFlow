import {
  AlertTriangle,
  ChevronRight,
  Clock,
  Lock,
  ShieldAlert,
  X,
} from "lucide-react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { LockRolesAction } from "../RTKThunk/GovernanceThunk";
// import { LockRolesAction } from "../RTKThunk/AsyncThunk";
const LockRoles = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    duration: "",
    justification: "",
  });

  const dispatch = useDispatch();

  const createlock = () => {
    try {
      dispatch(LockRolesAction(formData)).unwrap();
      setFormData({
        duration: "",
        justification: "",
      });
      onClose();
    } catch (error) {
      console.error("Error", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-y-0 right-0 z-50 flex font-sans">
      {/* Subtle Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm -ml-[100vw]"
        onClick={onClose}
      />

      {/* Sidebar Container - 250px Width */}
      <div className="relative w-150 bg-[#101922] border-l border-[#2d3a4b] flex flex-col shadow-2xl h-full">
        {/* Header - Compact but Bold */}
        <div className="p-5 border-b border-[#2d3a4b] bg-[#f2b90d]/5">
          <div className="flex items-center justify-between mb-4">
            <div className="size-12 rounded-lg bg-[#f2b90d] flex items-center justify-center">
              <Lock size={30} className="text-[#101922]" />
            </div>
            <button
              onClick={onClose}
              className="text-slate-500 hover:text-white transition-colors"
            >
              <X size={30} />
            </button>
          </div>
          <h1 className="text-2xl font-extrabold text-white ">Role Lockdown</h1>
          <p className="text-md text-[#f2b90d] font-black uppercase tracking-widest mt-1">
            Governance v4.1
          </p>
        </div>

        {/* Content - Vertically Stacked */}
        <div className="flex-1 overflow-y-auto p-5 space-y-8">
          {/* Status Badge */}
          <div className="py-2 px-3 bg-emerald-500/10 border border-emerald-500/20 rounded-md flex items-center gap-2">
            <div className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-md font-bold text-emerald-500 uppercase">
              System: Active
            </span>
          </div>

          {/* Section: Impacts */}
          <div className="space-y-4">
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">
              Impact Summary
            </p>
            <div className="space-y-3">
              <ImpactRow
                icon={<ShieldAlert size={14} />}
                label="Freeze Roles"
              />
              <ImpactRow
                icon={<AlertTriangle size={14} />}
                label="Block Creation"
              />
              <ImpactRow icon={<Clock size={14} />} label="Deny Elevation" />
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-md font-bold text-slate-400">
                Duration
              </label>
              <select
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                className="w-full bg-[#1c2632] border border-[#2d3a4b] rounded-lg p-2 text-md text-white outline-none"
              >
                <option value="" disabled>
                  Select Duration
                </option>
                <option value="Manual Unlock">Manual Unlock</option>
                <option value="1 Hour">1 Hour</option>
                <option value="24 Hour">24 Hours</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-md font-bold text-slate-400">
                Justification
              </label>
              <textarea
                name="justification"
                value={formData.justification}
                onChange={handleChange}
                className="w-full h-24 bg-[#1c2632] border border-[#2d3a4b] rounded-lg p-3 text-md text-white outline-none placeholder:text-slate-600"
                placeholder="Ticket ID..."
              />
            </div>
          </div>
        </div>

        {/* Sticky Action Footer */}
        <div className="p-5 bg-[#1c2632] border-t border-[#2d3a4b]">
          <button
            type="submit"
            onClick={createlock}
            className=" cursor-pointer w-full h-12 bg-[#f2b90d] hover:brightness-110 active:scale-95 text-[#101922] font-black text-lg uppercase tracking-widest rounded-lg transition-all flex items-center justify-center gap-2"
          >
            Execute Lock <ChevronRight size={14} />
          </button>
          <button
            type="button"
            onClick={onClose}
            className=" cursor-pointer w-full mt-3 text-lg font-bold text-slate-500 hover:text-white transition-colors"
          >
            Cancel Process
          </button>
        </div>
      </div>
    </div>
  );
};

const ImpactRow = ({ icon, label }) => (
  <div className="flex items-center gap-3 text-slate-300">
    <div className="text-[#f2b90d]">{icon}</div>
    <span className="text-md font-medium">{label}</span>
  </div>
);

export default LockRoles;
