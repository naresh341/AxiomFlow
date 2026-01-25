import React from "react";
import {
  X,
  Mail,
  User,
  Shield,
  Users,
  Send,
  ChevronDown,
  CircleDot,
} from "lucide-react";

const InviteUser = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#0a0f14]/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Container - Desktop Standard (600px) */}
      <div className="relative w-200 bg-white dark:bg-[#0f172a] rounded-4xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden animate-in zoom-in-95 duration-300 font-sans">
        {/* HEADER */}
        <div className="px-8 pt-8 pb-4 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
              Invite New User
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Fill in the details below to add a new member to your
              organization.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* FORM BODY */}
        <div className="px-8 py-4 space-y-6 overflow-y-auto max-h-[70vh]">
          {/* Email Address */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <Mail size={16} className="text-[#0d7ff2]" /> Email Address*
            </label>
            <input
              type="email"
              placeholder="name@company.com"
              className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:ring-2 focus:ring-[#0d7ff2]/20 focus:border-[#0d7ff2] transition-all"
              required
            />
          </div>

          {/* Names Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <User size={16} className="text-[#0d7ff2]" /> First Name
              </label>
              <input
                type="text"
                placeholder="Jane"
                className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-[#0d7ff2] transition-all"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <User size={16} className="text-[#0d7ff2]" /> Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
                className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none focus:border-[#0d7ff2] transition-all"
              />
            </div>
          </div>

          {/* Role Selection */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <Shield size={16} className="text-[#0d7ff2]" /> Role
            </label>
            <div className="relative">
              <select className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none appearance-none cursor-pointer focus:border-[#0d7ff2]">
                <option value="" disabled selected>
                  Select a role...
                </option>
                <option value="admin">Administrator</option>
                <option value="editor">Editor</option>
                <option value="viewer">Viewer</option>
              </select>
              <ChevronDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div>

          {/* Team Tagging Area */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <Users size={16} className="text-[#0d7ff2]" /> Assign to Teams
            </label>
            <div className="flex flex-wrap gap-2 p-2 min-h-[3.5rem] bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl">
              {/* Marketing Tag */}
              <span className="flex items-center gap-1.5 bg-[#0d7ff2]/10 text-[#0d7ff2] px-3 py-1 rounded-lg text-sm font-bold">
                Marketing <X size={14} className="cursor-pointer" />
              </span>
              {/* Product Tag */}
              <span className="flex items-center gap-1.5 bg-[#0d7ff2]/10 text-[#0d7ff2] px-3 py-1 rounded-lg text-sm font-bold">
                Product <X size={14} className="cursor-pointer" />
              </span>
              <input
                type="text"
                placeholder="Search teams..."
                className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-sm px-2 dark:text-white"
              />
            </div>
          </div>

          {/* Status & Notification Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
                <CircleDot size={16} className="text-[#0d7ff2]" /> Status
              </label>
              <div className="relative">
                <select className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white outline-none appearance-none cursor-pointer focus:border-[#0d7ff2]">
                  <option value="pending">Pending Invite</option>
                  <option value="active">Active</option>
                </select>
                <ChevronDown
                  size={18}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 md:pt-8">
              <div className="relative flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  id="sendEmail"
                  defaultChecked
                  className="w-5 h-5 rounded border-slate-300 dark:border-slate-700 text-[#0d7ff2] focus:ring-[#0d7ff2] bg-white dark:bg-slate-900"
                />
              </div>
              <label
                htmlFor="sendEmail"
                className="text-sm font-bold text-slate-700 dark:text-slate-200 cursor-pointer select-none"
              >
                Send invitation email
              </label>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="mt-4 px-8 py-6 bg-slate-50 dark:bg-slate-800/50 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
          >
            Cancel
          </button>
          <button className="px-8 py-2.5 rounded-xl bg-[#0d7ff2] text-white font-black flex items-center gap-2 hover:bg-[#0c72d9] shadow-lg shadow-[#0d7ff2]/20 active:scale-95 transition-all">
            Send Invite <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default InviteUser;
