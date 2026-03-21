import {
  Calendar,
  CheckSquare,
  ChevronLeft,
  ClipboardList,
  FileText,
  Fingerprint,
  Gavel,
  GitCompareArrows,
  GitFork,
  History,
  Info,
  Lock,
  Network,
  ShieldCheck,
  User,
  Zap,
} from "lucide-react";
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { get_Workflow_Versions } from "../../RTKThunk/AsyncThunk"; // Ensure path is correct

const WorkFlowVersionDetail = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { versionId, workflowId } = useParams();

  // Accessing the version list from Redux
  const { currentWorkflowVersions, loading } = useSelector(
    (state) => state.workflows,
  );

  // Fetch data if the store is empty (e.g., on direct page refresh)
  useEffect(() => {
    if (
      !currentWorkflowVersions?.data ||
      currentWorkflowVersions.data.length === 0
    ) {
      dispatch(get_Workflow_Versions(workflowId));
    }
  }, [dispatch, workflowId, currentWorkflowVersions]);

  // Find the specific version data from the array provided in your JSON
  const activeVersion = useMemo(() => {
    return currentWorkflowVersions?.data?.find(
      (v) => v.id.toString() === versionId || v.version_key === versionId,
    );
  }, [currentWorkflowVersions, versionId]);

  // Fallback UI for loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f6f6f8] dark:bg-[#101622]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#0f49bd]"></div>
      </div>
    );
  }

  // Data Mapping: Map API fields to UI fields
  const displayData = {
    id: activeVersion?.version_key || "N/A",
    versionNum: activeVersion?.version || "0.0.0",
    status: activeVersion?.status || "Unknown",
    author: activeVersion?.created_by || "System",
    date: activeVersion?.created_at
      ? new Date(activeVersion.created_at).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })
      : "N/A",
    hash: activeVersion?.id
      ? `sha256:8f2d...${activeVersion.id}`
      : "No Hash Available",
    // These fields are likely in 'definition' which is null in your JSON,
    // keeping defaults so components don't break.
    baseVersion: "v1.0.0-baseline",
  };

  return (
    <div className="bg-[#f6f6f8] dark:bg-[#101622] text-slate-900 dark:text-slate-100 min-h-screen font-sans">
      <main className="mx-auto px-6 py-8">
        {/* Breadcrumbs & Actions */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div className="space-y-2">
            <nav className="flex items-center gap-2 text-sm font-medium text-slate-500">
              <button onClick={() => navigate(-1)} className="hover:underline">
                Versions
              </button>
              <span>/</span>
              <span className="text-slate-900 dark:text-white font-semibold">
                {displayData.id}
              </span>
            </nav>
            <div className="flex items-center gap-4">
              <h1 className="text-4xl md:text-4xl font-black tracking-tight">
                Version {displayData.versionNum}
              </h1>
              <span
                className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${
                  displayData.status === "ACTIVE"
                    ? "bg-green-500/10 text-green-500 border-green-500/20"
                    : "bg-[#0f49bd]/10 text-[#0f49bd] border-[#0f49bd]/20"
                }`}
              >
                {displayData.status}
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
              <ChevronLeft size={18} /> Back
            </button>
          </div>
        </div>

        {/* Metadata Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <MetaCard
            icon={<User size={20} />}
            label="Created By"
            value={displayData.author}
          />
          <MetaCard
            icon={<Calendar size={20} />}
            label="Created On"
            value={displayData.date}
          />
          <MetaCard
            icon={<GitFork size={20} />}
            label="Version Key"
            value={displayData.id}
          />
        </div>

        {/* Impact Banner */}
        <div className="mb-8 p-4 bg-[#0f49bd]/10 border border-[#0f49bd]/20 rounded-xl flex items-center gap-4">
          <Info className="text-[#0f49bd] shrink-0" size={20} />
          <p className="text-sm font-medium text-slate-800 dark:text-blue-100">
            {activeVersion?.is_active
              ? "This version is currently live. Any changes must be made via a new draft."
              : "This version is in DRAFT. Changes here will not affect the production environment until activated."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 space-y-8">
            <Section title="Definition Metadata" icon={<FileText size={18} />}>
              <p className="text-slate-600 dark:text-[#9da6b9] text-sm leading-relaxed mb-6">
                {activeVersion?.definition
                  ? JSON.stringify(activeVersion.definition)
                  : "No custom definition logic defined for this version. This version inherits the base configuration of the parent workflow."}
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  displayData.status,
                  `ID: ${activeVersion?.id}`,
                  "V-System",
                ].map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-slate-100 dark:bg-[#282e39] text-slate-600 dark:text-slate-300 rounded-md text-xs font-medium border border-slate-200 dark:border-slate-700"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Section>

            {/* Workflow Snapshot - Static UI maintained as requested */}
            <Section title="Visual Preview" icon={<Network size={18} />}>
              <div className="space-y-0 relative">
                <WorkflowStep
                  icon={<Zap className="text-blue-500" size={20} />}
                  title="Trigger: Incoming Process"
                  type="System Input"
                  details={{
                    "Internal ID": activeVersion?.workflow_id_str || "N/A",
                    Status: activeVersion?.status || "DRAFT",
                  }}
                  isFirst
                />
                <WorkflowStep
                  icon={<CheckSquare className="text-slate-500" size={20} />}
                  title="Logic Deployment"
                  type="Cloud Node"
                  details={{
                    Version: activeVersion?.version || "1.0",
                    Runtime: "Standard v2",
                  }}
                  isLast
                />
              </div>
            </Section>
          </div>

          <div className="lg:col-span-4 space-y-8">
            <Section title="Governance Rules" icon={<Gavel size={18} />}>
              <div className="space-y-4">
                <RuleBox
                  label="Active State"
                  text={
                    activeVersion?.is_active
                      ? "Currently handling traffic."
                      : "Not handling production traffic."
                  }
                />
                <RuleBox
                  label="Permissions"
                  text={`Only users with system-admin or ${activeVersion?.created_by} privileges can modify.`}
                />
              </div>
            </Section>

            <Section title="System Logs" icon={<ClipboardList size={18} />}>
              <div className="divide-y divide-slate-100 dark:divide-slate-800">
                <AuditItem
                  title="Snapshot Created"
                  time={displayData.date}
                  user={activeVersion?.created_by}
                />
                <AuditItem
                  title="DB Synchronization"
                  time="Sync Complete"
                  user="Automated System"
                />
              </div>
              <button className="w-full py-3 bg-slate-50 dark:bg-[#151a26] text-[#0f49bd] text-[11px] font-bold uppercase tracking-wider hover:underline">
                View Full Audit History
              </button>
            </Section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-slate-200 dark:border-slate-800 mt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-[11px]">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-1">
            <ShieldCheck size={14} /> Certified Immutable
          </span>
          <span className="flex items-center gap-1">
            <Fingerprint size={14} /> ID: {activeVersion?.id} | Key:{" "}
            {displayData.id}
          </span>
        </div>
        <p>© 2026 WorkflowManager Enterprise Governance Suite</p>
      </footer>
    </div>
  );
};

// ... Sub-components remain the same as your provided code ...
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

export default WorkFlowVersionDetail;
