import {
  AlertCircle,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Copy,
  Download,
  Edit3,
  ExternalLink,
  FileText,
  GitBranch,
  Globe,
  History,
  Lock,
  Settings2,
  Terminal,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import RequestChangesModal from "../Components/RequestChangesModal";
import { NavLink } from "react-router-dom";

const ApprovalDetail = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="bg-[#f6f6f8] dark:bg-[#101622] text-slate-900 dark:text-slate-100 min-h-screen font-sans">
      <nav className="flex items-center gap-2 mb-6 text-sm font-medium text-slate-500">
        <NavLink
          to="/workflows"
          className="hover:text-blue-600 transition-colors"
        >
          Workflows
        </NavLink>
        <ChevronRight size={14} />
        <span className="text-slate-900 dark:text-white">
          Approval Detail - APR-1021
        </span>
      </nav>
      <main className=" ">
        <StickySubHeader onOpenModal={() => setIsModalOpen(true)} />

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content Area */}
          <div className="flex-1 space-y-8 min-w-0">
            <SummaryCard />
            <ApprovalChain />
            <DecisionSection />
            <AuditHistory />
          </div>

          {/* Right Sidebar (Context Panel) */}
          <aside className="lg:w-[320px] xl:w-[380px] space-y-6 shrink-0">
            <WorkflowMetadata />
            <ComplianceStatus />
            <QuickResources />
            <SystemHealth />
          </aside>
        </div>
      </main>

      <Footer />

      <RequestChangesModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

/* --- SUB-COMPONENTS --- */

const StickySubHeader = ({ onOpenModal }) => (
  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8 bg-slate-100 dark:bg-[#1e293b] p-6 rounded-xl border border-slate-200 dark:border-slate-800">
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-black tracking-tight">
          Approval ID: APR-1021
        </h1>
        <span className="bg-amber-500/20 text-amber-500 px-3 py-0.5 rounded-full text-xs font-bold uppercase">
          Pending
        </span>
      </div>
      <div className="flex items-center gap-2 text-slate-500">
        <Clock size={16} />
        <p className="text-sm font-medium">
          2h 15m remaining • SLA Priority: High
        </p>
      </div>
    </div>
    <div className="flex flex-wrap items-center gap-3">
      <ActionBtn icon={<Download size={18} />} label="Download" />
      <ActionBtn icon={<X size={18} />} label="Reject" color="text-red-500" />
      <ActionBtn
        icon={<Edit3 size={18} />}
        onClick={onOpenModal}
        label="Request Changes"
      />
      <button className="flex items-center gap-2 px-6 py-2 bg-[#0f49bd] hover:bg-blue-700 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-900/20">
        <CheckCircle2 size={18} /> Approve
      </button>
    </div>
  </div>
);

const ActionBtn = ({ icon, label, color = "", onClick }) => (
  <button
    onClick={onClick}
    className={`flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-sm font-bold transition-all border border-slate-200 dark:border-slate-700 ${color}`}
  >
    {icon} <span>{label}</span>
  </button>
);

const SummaryCard = () => (
  <section className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
    <div className="border-b border-slate-200 dark:border-slate-800 px-6 py-4 flex justify-between items-center">
      <h3 className="font-bold flex items-center gap-2">
        <FileText size={18} className="text-[#0f49bd]" /> Entity Summary:
        Invoice #INV-8921
      </h3>
      <span className="text-xs text-slate-500">Triggered: Oct 24, 2023</span>
    </div>
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="space-y-4">
        <InfoField
          label="Requester"
          value={
            <div className="flex items-center gap-3 mt-1">
              <div className="size-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-[#0f49bd] font-bold">
                SJ
              </div>
              <div>
                <p className="text-sm font-bold">Sarah Jenkins</p>
                <p className="text-xs text-slate-500">Finance Specialist</p>
              </div>
            </div>
          }
        />
        <InfoField
          label="Workflow Source"
          value="Finance Disbursement Workflow"
        />
      </div>
      <div className="space-y-4">
        <InfoField
          label="Amount"
          value={
            <p className="text-xl font-black text-[#0f49bd] mt-1">
              $42,850.00 USD
            </p>
          }
        />
        <InfoField label="Cost Center" value="Marketing Operations (MKT-402)" />
      </div>
    </div>
  </section>
);

const InfoField = ({ label, value }) => (
  <div>
    <label className="text-xs uppercase tracking-widest text-slate-500 font-bold">
      {label}
    </label>
    <div className="text-sm mt-1 font-medium">{value}</div>
  </div>
);

const ApprovalChain = () => (
  <section className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-800 p-6">
    <h3 className="font-bold mb-6 flex items-center gap-2">
      <GitBranch size={18} className="text-[#0f49bd]" /> Approval Chain
    </h3>
    <div className="space-y-8">
      <ChainStep
        status="complete"
        title="Finance Manager"
        desc="Approved by David Chen • Oct 24, 09:12 AM"
        icon={<Check size={12} />}
      />
      <ChainStep
        status="current"
        title="Department Head (Current)"
        desc="Awaiting your decision • 21h 45m elapsed"
        icon={<Clock size={12} />}
      />
      <ChainStep
        status="upcoming"
        title="VP Finance"
        desc="Final review stage"
        icon={<Lock size={12} />}
      />
    </div>
  </section>
);

const ChainStep = ({ status, title, desc, icon }) => {
  const colors = {
    complete: "bg-green-500",
    current: "bg-[#0f49bd] ring-4 ring-blue-500/20",
    upcoming: "border-2 border-slate-600 text-slate-500",
  };
  return (
    <div className="relative flex gap-4">
      {status !== "upcoming" && (
        <div
          className={`absolute left-3 top-6 w-0.5 h-10 ${status === "complete" ? "bg-[#0f49bd]" : "bg-slate-700"}`}
        />
      )}
      <div
        className={`z-10 size-6 rounded-full flex items-center justify-center shrink-0 text-white ${colors[status]}`}
      >
        {icon}
      </div>
      <div>
        <p
          className={`text-sm font-bold ${status === "current" ? "text-[#0f49bd]" : status === "upcoming" ? "opacity-50" : ""}`}
        >
          {title}
        </p>
        <p className="text-xs text-slate-500">{desc}</p>
      </div>
    </div>
  );
};

const DecisionSection = () => (
  <section className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-800 p-6">
    <h3 className="font-bold mb-4 flex items-center gap-2 text-sm">
      <CheckCircle2 size={18} className="text-[#0f49bd]" /> Decision Comments
    </h3>
    <textarea
      className="w-full bg-slate-50 dark:bg-[#101622]/50 border border-slate-200 dark:border-slate-700 rounded-lg p-4 text-sm outline-none focus:ring-1 focus:ring-[#0f49bd]"
      placeholder="Provide justification..."
      rows="4"
    ></textarea>
    <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-500">
      <span className="flex items-center gap-1 text-green-500">
        <Check size={12} /> Professional language detected
      </span>
      <span>0 / 500 characters</span>
    </div>
  </section>
);

const AuditHistory = () => (
  <section className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden">
    <div className="border-b border-slate-200 dark:border-slate-800 px-6 py-4">
      <h3 className="font-bold flex items-center gap-2">
        <History size={18} className="text-[#0f49bd]" /> Audit History
      </h3>
    </div>
    <div className="divide-y divide-slate-200 dark:divide-slate-800">
      <AuditItem
        title="System Auto-Validation Complete"
        time="Oct 24, 08:30:12"
        desc="Invoice integrity checks passed"
        icon={<Settings2 size={16} />}
      />
      <AuditItem
        title="Request Created"
        time="Oct 24, 08:25:45"
        desc="Initial submission by Sarah Jenkins"
        icon={<User size={16} />}
      />
    </div>
  </section>
);

const AuditItem = ({ title, time, desc, icon }) => (
  <div className="p-4 flex items-start gap-4 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
    <div className="size-8 rounded bg-slate-100 dark:bg-slate-800 flex items-center justify-center shrink-0 text-slate-500">
      {icon}
    </div>
    <div className="flex-1">
      <div className="flex justify-between items-start">
        <p className="text-sm font-bold">{title}</p>
        <span className="text-[10px] text-slate-500 uppercase">{time}</span>
      </div>
      <p className="text-xs text-slate-500 mt-1">{desc}</p>
    </div>
  </div>
);

const WorkflowMetadata = () => (
  <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-800 p-6">
    <h4 className="text-xs uppercase font-black text-slate-500 mb-4 tracking-tighter">
      Workflow Metadata
    </h4>
    <div className="space-y-4 text-sm">
      <MetaRow label="Definition" value="Standard Finance Approval" />
      <div className="grid grid-cols-2 gap-4">
        <MetaRow label="Version" value="v4.2.1-stable" />
        <MetaRow
          label="Environment"
          value={<span className="text-green-500">Production</span>}
        />
      </div>
      <div>
        <label className="text-xs text-slate-500">Execution ID</label>
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-[#101622] p-2 rounded mt-1 border border-slate-200 dark:border-slate-800">
          <code className="text-[10px] flex-1">EXEC-9921-XDA</code>
          <Copy
            size={12}
            className="opacity-50 hover:opacity-100 cursor-pointer"
          />
        </div>
      </div>
    </div>
  </div>
);

const MetaRow = ({ label, value }) => (
  <div>
    <p className="text-xs text-slate-500">{label}</p>
    <p className="font-bold">{value}</p>
  </div>
);

const ComplianceStatus = () => (
  <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-800 p-6">
    <h4 className="text-xs uppercase font-black text-slate-500 mb-4 tracking-tighter">
      Compliance Status
    </h4>
    <div className="space-y-4">
      <div className="flex justify-between text-xs font-bold mb-1">
        <span className="text-[#0f49bd]">SLA Progress</span>
        <span>91%</span>
      </div>
      <div className="h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
        <div className="h-full bg-[#0f49bd]" style={{ width: "91%" }}></div>
      </div>
      <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex gap-2">
        <AlertCircle size={14} className="text-red-500 shrink-0 mt-0.5" />
        <p className="text-[10px] text-slate-500 leading-tight">
          Auto-escalation to{" "}
          <span className="font-bold">Regional Director</span> in 2h 15m.
        </p>
      </div>
    </div>
  </div>
);

const QuickResources = () => (
  <div className="bg-white dark:bg-[#1e293b] rounded-xl border border-slate-200 dark:border-slate-800 p-6">
    <h4 className="text-xs uppercase font-black text-slate-500 mb-4 tracking-tighter">
      Quick Resources
    </h4>
    <ul className="space-y-3">
      <ResourceLink
        icon={<GitBranch size={14} />}
        label="Workflow Definition"
      />
      <ResourceLink icon={<Globe size={14} />} label="Global Approvals" />
      <ResourceLink icon={<Terminal size={14} />} label="Raw Execution Logs" />
    </ul>
  </div>
);

const ResourceLink = ({ icon, label }) => (
  <li>
    <a
      href="#"
      className="flex items-center justify-between text-xs font-bold text-[#0f49bd] hover:underline"
    >
      <span className="flex items-center gap-2">
        {icon} {label}
      </span>
      <ExternalLink size={12} />
    </a>
  </li>
);

const SystemHealth = () => (
  <div className="px-2 flex items-center gap-2 opacity-40">
    <span className="relative flex h-2 w-2">
      <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"></span>
      <span className="relative h-2 w-2 rounded-full bg-green-500"></span>
    </span>
    <span className="text-[10px] uppercase font-bold tracking-widest">
      Auditable System Online
    </span>
  </div>
);

const Footer = () => (
  <footer className="max-w-[1440px] mx-auto px-10 py-8 border-t border-slate-200 dark:border-slate-800 mt-12 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-[10px] font-bold">
    <p>© 2026 Enterprise Workflow Governance Platform. Region: US-East-1</p>
    <div className="flex items-center gap-6">
      <a className="hover:text-[#0f49bd]" href="#">
        Security Policy
      </a>
      <a className="hover:text-[#0f49bd]" href="#">
        Data Sovereignty
      </a>
    </div>
  </footer>
);

export default ApprovalDetail;
