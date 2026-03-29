import {
  CheckCircle2,
  Clock,
  Download,
  GitBranch,
  Info,
  Maximize2,
  TrendingUp,
} from "lucide-react";
import { useNavigate, useOutletContext } from "react-router-dom";
import DynamicTable from "../../Components/DynamicTable";
import Paginator from "../../Components/Paginator";
import WorkflowNode from "../../Components/WorkflowNode";
import { TableSchemas } from "../../Utils/TableSchemas";

const WorkflowOverview = () => {
  const { currentWorkflow } = useOutletContext();
  const navigate = useNavigate();
  const formatDateTime = (dateString) => {
    if (!dateString) return "Date not set";
    const date = new Date(dateString);

    const formatDate = date.toLocaleDateString("en-IN", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

    const formatTime = date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    return ` ${formatDate} ${formatTime}`;
  };
  const stats = [
    {
      label: "Total Runs",
      value: "1,240",
      trend: "+12.4%",
      trendType: "up",
      icon: <TrendingUp size={14} />,
    },
    {
      label: "Success Rate",
      value: "98.2%",
      trend: "Stable",
      trendType: "stable",
      icon: <CheckCircle2 size={14} />,
    },
    {
      label: "Avg. Time",
      value: "45.2s",
      trend: "+2.1s slower",
      trendType: "down",
      icon: <Clock size={14} />,
    },
    {
      label: "Last Run",
      value: "SUCCESS",
      trend: "5 mins ago",
      trendType: "neutral",
      icon: null,
    },
  ];

  return (
    <div className="grid grid-cols-12 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="col-span-12 lg:col-span-9 space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="p-5 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm"
            >
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-black">{stat.value}</p>
              <div
                className={`flex items-center gap-1 text-[11px] font-bold mt-2 ${
                  stat.trendType === "up" || stat.trendType === "stable"
                    ? "text-emerald-600"
                    : stat.trendType === "down"
                      ? "text-red-500"
                      : "text-slate-500"
                }`}
              >
                {stat.icon}
                <span>{stat.trend}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Workflow Diagram Preview Card */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center bg-slate-50/50 dark:bg-transparent">
            <h3 className="font-bold text-md text-slate-700 dark:text-slate-200">
              Workflow Logic Preview
            </h3>
            <button
              type="button"
              onClick={() =>
                navigate(
                  `/workflows/builder/${currentWorkflow?.workflow_id_str}`,
                )
              }
              className="text-blue-600 text-sm font-black flex items-center gap-1.5 hover:underline uppercase tracking-tighter"
            >
              <Maximize2 size={14} />
              Open Canvas
            </button>
          </div>

          <div className="p-12 bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center">
            {currentWorkflow?.version?.[0]?.definition?.nodes?.length > 0 ? (
              currentWorkflow?.versions[0].definition?.nodes
                ?.slice(0, 4)
                .map((node, index, array) => (
                  <div key={node.id} className="flex flex-col items-center">
                    <WorkflowNode
                      data={node.data}
                      type={node.type}
                      selected={index == 0}
                    />
                    {index < array.length - 1 && (
                      <div className="h-8 w-0.5 bg-slate-300 dark:bg-slate-700 my-1"></div>
                    )}
                  </div>
                ))
            ) : (
              <div className="text-center space-y-4">
                <div className="bg-white dark:bg-slate-800 p-4 rounded-full shadow-sm inline-block">
                  <GitBranch size={32} className="text-slate-300" />
                </div>
                <div>
                  <h4 className="font-bold text-slate-700 dark:text-slate-200">
                    No Logic Defined
                  </h4>
                  <p className="text-xs text-slate-500 max-w-50 mx-auto mt-1">
                    This workflow doesn't have any steps yet. Use the Canvas to
                    build your logic.
                  </p>
                </div>
                <button
                  onClick={() =>
                    navigate(
                      `/workflows/builder/${currentWorkflow.workflow_id_str}`,
                    )
                  }
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-black uppercase rounded-lg hover:bg-blue-700 transition-all"
                >
                  Configure Workflow
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center">
            <h3 className="font-bold text-md text-slate-700 dark:text-slate-200">
              Recent Executions
            </h3>
            <button
              onClick={() => navigate("/workflows/execution")}
              className="text-blue-600 text-sm font-bold hover:underline"
            >
              Full History
            </button>
          </div>
          <div className="overflow-x-auto">
            <DynamicTable
              tableHead={TableSchemas.execution}
              tableData={currentWorkflow}
            />
            <div className="flex justify-end">
              <Paginator />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT COLUMN: Contextual Metadata Sidebar */}
      <div className="col-span-12 lg:col-span-3">
        <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm p-6 sticky top-24">
          <h3 className="font-bold text-sm flex items-center gap-2 mb-6">
            <Info size={18} className="text-blue-600" />
            Metadata
          </h3>

          <div className="space-y-6">
            <MetaItem
              label="Created By"
              value={currentWorkflow.owner_name}
              avatar={currentWorkflow.owner_name
                .split(" ")
                .map((n) => n[0])
                .join("")}
              color="bg-blue-100 text-blue-700"
            />
            <MetaItem
              label="Created On"
              value={formatDateTime(currentWorkflow?.created_at)}
            />
            <MetaItem
              label="Last Modified"
              value={formatDateTime(currentWorkflow?.updated_at)}
              avatar="SM"
              color="bg-amber-100 text-amber-700"
            />

            <div className="flex flex-col gap-1">
              <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
                Version
              </label>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-900 text-xs font-bold border border-slate-200 dark:border-slate-700">
                  v{currentWorkflow.versions?.[0]?.version}
                </span>
                <button className="text-blue-600 text-[10px] font-black uppercase hover:underline">
                  Changelog
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100 dark:border-slate-700">
              <h4 className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3">
                Tags
              </h4>
              <div className="flex flex-wrap gap-2">
                {["Onboarding", "Security", "HR-Core"].map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-slate-100 dark:bg-slate-900 rounded-md text-[11px] font-bold text-slate-600 dark:text-slate-400"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <button className="w-full mt-4 flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-700 text-slate-500 hover:text-blue-600 hover:border-blue-300 hover:bg-blue-50/50 transition-all text-xs font-bold uppercase">
              <Download size={14} />
              Export Definition
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- INTERNAL SUB-COMPONENTS ---

const MetaItem = ({ label, value, avatar, color }) => (
  <div className="flex flex-col gap-1">
    <label className="text-[10px] uppercase font-black text-slate-400 tracking-widest">
      {label}
    </label>
    <div className="flex items-center gap-2">
      {avatar && (
        <div
          className={`size-6 rounded-full flex items-center justify-center text-[10px] font-black ${color}`}
        >
          {avatar}
        </div>
      )}
      <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
        {value}
      </p>
    </div>
  </div>
);

export default WorkflowOverview;
