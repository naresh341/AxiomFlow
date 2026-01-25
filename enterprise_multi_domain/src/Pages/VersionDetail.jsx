import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Network,
  Search,
  ChevronLeft,
  GitCompareArrows,
  History,
  User,
  Calendar,
  GitFork,
  Info,
  FileText,
  Lock,
  Zap,
  CheckSquare,
  UserCheck,
  Gavel,
  ClipboardList,
  ShieldCheck,
  Fingerprint,
} from "lucide-react";

const VersionDetail = () => {
  const navigate = useNavigate();
  const { versionId, workflowId } = useParams();

  // In a real app, you would fetch version-specific data using versionId
  const versionData = {
    id: versionId || "v2.1.0",
    status: "Active",
    author: "Sarah J.",
    date: "Oct 12, 2023",
    baseVersion: "v2.0.0",
    hash: "8f2d...e91a",
  };

  return (
    <div className="bg-[#f6f6f8] dark:bg-[#101622] text-slate-900 dark:text-slate-100 min-h-screen font-sans">
      <main className=" mx-auto px-6 py-8">
        {/* Breadcrumbs & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-2">
            <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <button onClick={() => navigate(-1)} className="hover:underline">
                Versions
              </button>
              <span>/</span>
              <span className="text-slate-900 dark:text-white font-semibold">
                {versionData.id}
              </span>
            </nav>
            <div className="flex items-center gap-4">
              <h1 className="text-3xl md:text-4xl font-black tracking-tight">
                Workflow Version {versionData.id}
              </h1>
              <span className="px-3 py-1 bg-[#0f49bd]/10 text-[#0f49bd] border border-[#0f49bd]/20 rounded-full text-xs font-bold uppercase tracking-wider">
                Current Status: {versionData.status}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-[#282e39] border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-bold hover:bg-slate-50 transition-colors">
              <GitCompareArrows size={18} /> Compare
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-[#0f49bd] text-white rounded-lg text-sm font-bold hover:bg-blue-700 transition-shadow shadow-lg shadow-blue-900/20">
              <History size={18} /> Rollback
            </button>
            <button
              onClick={() => navigate(-1)}
              className="flex items-center gap-2 px-4 py-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors text-sm font-bold"
            >
              <ChevronLeft size={18} /> Back to Versions
            </button>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <MetaCard
            icon={<User size={20} />}
            label="Created By"
            value={versionData.author}
          />
          <MetaCard
            icon={<Calendar size={20} />}
            label="Created On"
            value={versionData.date}
          />
          <MetaCard
            icon={<GitFork size={20} />}
            label="Based on Version"
            value={versionData.baseVersion}
          />
        </div>

        {/* Impact Banner */}
        <div className="mb-8 p-4 bg-[#0f49bd]/10 border border-[#0f49bd]/20 rounded-xl flex items-center gap-4">
          <Info className="text-[#0f49bd] shrink-0" size={20} />
          <p className="text-sm font-medium text-slate-800 dark:text-blue-100">
            Changing versions does not affect running executions. Only new
            executions will use the selected workflow version.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-8">
            {/* Version Summary */}
            <Section title="Version Summary" icon={<FileText size={18} />}>
              <p className="text-slate-600 dark:text-[#9da6b9] text-sm leading-relaxed mb-6">
                This version includes updated compliance validation steps and a
                revised escalation path for finance-related triggers. The SLA
                for the initial review phase has been tightened from 48 hours to
                24 hours to meet new quarterly performance targets.
              </p>
              <div className="flex flex-wrap gap-2">
                {["SLA Changed", "New Task Added", "Compliance v3"].map(
                  (tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-slate-100 dark:bg-[#282e39] text-slate-600 dark:text-slate-300 rounded-md text-xs font-medium border border-slate-200 dark:border-slate-700"
                    >
                      {tag}
                    </span>
                  ),
                )}
              </div>
            </Section>

            {/* Workflow Snapshot */}
            <Section title="Workflow Snapshot" icon={<Network size={18} />}>
              <div className="space-y-0 relative">
                <WorkflowStep
                  icon={<Zap className="text-blue-500" size={20} />}
                  title="Trigger: Incoming Invoice"
                  type="Input Node"
                  details={{
                    Source: "ERP Integration API",
                    Condition: "Amount > $10,000",
                  }}
                  isFirst
                />
                <WorkflowStep
                  icon={<CheckSquare className="text-slate-500" size={20} />}
                  title="Task: Compliance Check"
                  type="Process Node"
                  details={{
                    Handler: "Compliance-Service-v2",
                    Timeout: "5 Minutes",
                  }}
                />
                <WorkflowStep
                  icon={<UserCheck className="text-amber-500" size={20} />}
                  title="Approval: Manager Review"
                  type="Human Node"
                  details={{
                    AssignedTo: "Finance Dept Group",
                    SLA: "24 Hours",
                  }}
                  isLast
                />
              </div>
            </Section>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            <Section title="Versioned Rules" icon={<Gavel size={18} />}>
              <div className="space-y-4">
                <RuleBox
                  label="Escalation Logic"
                  text="If Approval exceeds SLA, re-route to VP Finance automatically."
                />
                <RuleBox
                  label="Reject Action"
                  text="Terminal state. Notify ERP system with error code E-401."
                />
              </div>
            </Section>

            <Section title="Audit Trail" icon={<ClipboardList size={18} />}>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                <AuditItem
                  title="Version Created"
                  time="Oct 12, 14:20"
                  user="Sarah J. (System Admin)"
                />
                <AuditItem
                  title="Compared to v2.0.0"
                  time="Oct 12, 14:15"
                  user="Sarah J. (System Admin)"
                />
                <AuditItem
                  title="SLA Override Applied"
                  time="Oct 11, 09:30"
                  user="Auto-Gen System"
                />
              </div>
              <button className="w-full py-3 bg-slate-50 dark:bg-[#151a26] text-[#0f49bd] text-[11px] font-bold uppercase tracking-wider hover:underline">
                View Full Logs
              </button>
            </Section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-slate-200 dark:border-slate-800 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-[11px]">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1">
            <ShieldCheck size={14} /> Certified Immutable Snapshot
          </span>
          <span className="flex items-center gap-1">
            <Fingerprint size={14} /> Hash: {versionData.hash}
          </span>
        </div>
        <p>© 2026 WorkflowManager Enterprise Governance Suite</p>
      </footer>
    </div>
  );
};

/* --- Sub-Components --- */

const MetaCard = ({ icon, label, value }) => (
  <div className="bg-white dark:bg-[#1c2331] p-5 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
    <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-500">
      {icon}
    </div>
    <div>
      <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">
        {label}
      </p>
      <p className="text-sm font-bold">{value}</p>
    </div>
  </div>
);

const Section = ({ title, icon, children }) => (
  <section className="bg-white dark:bg-[#1c2331] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
    <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-slate-400">{icon}</span>
        <h3 className="font-bold">{title}</h3>
      </div>
      <Lock className="text-slate-400" size={14} />
    </div>
    <div className="p-6">{children}</div>
  </section>
);

const WorkflowStep = ({ icon, title, type, details, isFirst, isLast }) => (
  <div className="relative flex items-start gap-6 pb-10 last:pb-0">
    {!isLast && (
      <div className="absolute left-[19px] top-10 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700 z-0" />
    )}
    <div className="w-10 h-10 rounded-full border-2 border-current flex items-center justify-center bg-white dark:bg-[#1c2331] z-10 shrink-0">
      {icon}
    </div>
    <div className="flex-1 p-4 bg-slate-50 dark:bg-[#282e39] rounded-lg border border-slate-200 dark:border-slate-700">
      <div className="flex justify-between items-start mb-2">
        <h4 className="font-bold text-sm uppercase">{title}</h4>
        <span className="text-[10px] font-bold text-slate-400 uppercase">
          {type}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 text-xs">
        {Object.entries(details).map(([k, v]) => (
          <div key={k}>
            <p className="text-slate-500">{k}</p>
            <p className="font-medium">{v}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

const RuleBox = ({ label, text }) => (
  <div className="p-3 bg-slate-50 dark:bg-[#282e39] rounded border border-slate-200 dark:border-slate-700">
    <p className="text-slate-400 text-[10px] font-bold uppercase mb-1">
      {label}
    </p>
    <p className="text-xs leading-relaxed">{text}</p>
  </div>
);

const AuditItem = ({ title, time, user }) => (
  <div className="px-6 py-4">
    <div className="flex items-center justify-between mb-1">
      <span className="text-xs font-bold">{title}</span>
      <span className="text-slate-400 text-[10px]">{time}</span>
    </div>
    <p className="text-[#9da6b9] text-[11px]">{user}</p>
  </div>
);

export default VersionDetail;
