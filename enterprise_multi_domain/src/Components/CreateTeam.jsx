import React from "react";
import {
  X,
  Users,
  Info,
  UserCircle,
  Search,
  ChevronDown,
  ShieldCheck,
  Plus,
} from "lucide-react";

const CreateTeam = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Mock data for the tags shown in your HTML
  const members = [
    { id: 1, name: "Sarah Johnson", img: "https://i.pravatar.cc/150?u=sarah" },
    { id: 2, name: "Marcus Lee", img: "https://i.pravatar.cc/150?u=marcus" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop - High contrast dark overlay with blur */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Container - Desktop Standard (640px) */}
      <div className="relative w-180 bg-white dark:bg-[#111318] rounded-4xl shadow-2xl border border-slate-200 dark:border-[#282e39] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 font-sans">
        {/* HEADER */}
        <div className="px-8 py-6 border-b border-slate-100 dark:border-[#282e39] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#135bec]/10 p-2 rounded-xl">
              <Users className="text-[#135bec]" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Create Team
            </h1>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* SCROLLABLE FORM CONTENT */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8 max-h-[75vh]">
          {/* Team Name */}
          <div className="space-y-2.5">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
              Team Name
            </label>
            <input
              type="text"
              placeholder="e.g., Product Design"
              className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#282e39] text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[#135bec]/30 focus:border-[#135bec] transition-all"
            />
            <p className="text-xs text-slate-500 dark:text-[#bab29c] flex items-center gap-1.5">
              <Info size={12} /> Pick a name that identifies your team across
              the organization.
            </p>
          </div>

          {/* Description */}
          <div className="space-y-2.5">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
              Description
            </label>
            <textarea
              rows="3"
              placeholder="Explain the purpose of this team..."
              className="w-full p-4 rounded-xl bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#282e39] text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[#135bec]/30 focus:border-[#135bec] transition-all resize-none"
            />
          </div>

          {/* Team Lead */}
          <div className="space-y-2.5">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <UserCircle size={16} className="text-[#135bec]" /> Team Lead
            </label>
            <div className="relative">
              <select className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#282e39] text-slate-900 dark:text-white outline-none appearance-none cursor-pointer focus:border-[#135bec]">
                <option value="" disabled selected>
                  Select a lead
                </option>
                <option value="1">Alex Rivera (Product Manager)</option>
                <option value="2">Jordan Smith (Lead Designer)</option>
                <option value="3">Casey Chen (CTO)</option>
              </select>
              <ChevronDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Members Multi-select */}
          <div className="space-y-2.5">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
              Members
            </label>
            <div className="flex flex-wrap gap-2 p-2.5 min-h-14 bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#282e39] rounded-xl">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="flex items-center gap-2 bg-[#135bec]/20 text-[#135bec] px-2 py-1.5 rounded-lg text-sm font-bold border border-[#135bec]/20"
                >
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-5 h-5 rounded-full object-cover"
                  />
                  <span>{member.name}</span>
                  <button className="hover:text-white transition-colors">
                    <X size={14} />
                  </button>
                </div>
              ))}
              <div className="flex items-center flex-1 min-w-37.5 px-2">
                <Search size={14} className="text-slate-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search members..."
                  className="w-full bg-transparent border-none outline-none text-sm dark:text-white"
                />
              </div>
            </div>
          </div>

          {/* Default Role */}
          <div className="space-y-2.5 pb-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#135bec]" /> Default
              Member Role
            </label>
            <div className="relative">
              <select className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#282e39] text-slate-900 dark:text-white outline-none appearance-none cursor-pointer focus:border-[#135bec]">
                <option value="viewer">Viewer (Can only view projects)</option>
                <option value="contributor" selected>
                  Contributor (Can edit and manage projects)
                </option>
                <option value="admin">Admin (Full permissions)</option>
              </select>
              <ChevronDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
            <p className="text-xs text-slate-500 dark:text-[#bab29c]">
              New members will be assigned this role by default.
            </p>
          </div>
        </div>

        {/* FOOTER */}
        <div className="px-8 py-6 bg-slate-50 dark:bg-[#111318]/50 border-t border-slate-100 dark:border-[#282e39] flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-[#3d3725] transition-all"
          >
            Cancel
          </button>
          <button className="px-8 py-2.5 rounded-xl bg-[#135bec] text-[#181611] font-black flex items-center gap-2 hover:brightness-110 shadow-lg shadow-[#135bec]/20 active:scale-95 transition-all">
            Create Team <Plus size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateTeam;
