import {
  ChevronDown,
  ChevronRight,
  History,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  Workflow,
  X,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CreateVersionModal from "../../Components/CreateVersionModal";
import DynamicTable from "../../Components/DynamicTable";
import Paginator from "../../Components/Paginator";
import { get_Workflow_Versions } from "../../RTKThunk/AsyncThunk";
import { TableSchemas } from "../../Utils/TableSchemas";
import FilterButton from "../../Components/MiniComponent/FilterButton";
import { Menu } from "primereact/menu";

const WorkflowVersions = () => {
  const [activeTab, setActiveTab] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { workflowId } = useParams();
  const [first, setfirst] = useState(0);
  const rows = 10;
  const dispatch = useDispatch();
  const menuStatus = useRef(null);
  const [filters, setFilters] = useState({
    status: "All",
    priority: "All",
  });
  const [searchQuery, setSearchQuery] = useState("");

  const { loading, currentWorkflowVersions } = useSelector(
    (state) => state.workflows,
  );

  const versionData = currentWorkflowVersions || [];
  useEffect(() => {
    dispatch(get_Workflow_Versions(workflowId));
  }, [workflowId, dispatch]);

  const onPageChange = (page) => {
    setfirst((page + 1) * rows);
  };

  const handleRowClick = (versionId) => {
    navigate(`${versionId}?workflowId=${workflowId}`);
  };

  const statusItems = [
    {
      label: "All",
      className: filters.status === "All" ? "font-bold text-blue-600" : "",
      command: () => setFilters((prev) => ({ ...prev, status: "All" })),
    },
    {
      label: "Active",
      command: () => setFilters((prev) => ({ ...prev, status: "ACTIVE" })),
    },
    {
      label: "Draft",
      command: () => setFilters((prev) => ({ ...prev, status: "DRAFT" })),
    },
    {
      label: "Archived",
      command: () => setFilters((prev) => ({ ...prev, status: "ARCHIVED" })),
    },
  ];

  // const versions = [
  //   {
  //     id: "v2.0.0",
  //     status: "Active",
  //     lineage: "Cloned from v1.2.0",
  //     lineageIcon: <Copy size={14} />,
  //     author: "Jane Doe",
  //     date: "Oct 24, 2023",
  //     summary:
  //       "Added conditional logic to the approval step and optimized API call frequency...",
  //     avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  //   },
  //   {
  //     id: "v2.1.0",
  //     status: "Draft",
  //     lineage: "New Workflow",
  //     lineageIcon: <Plus size={14} />,
  //     author: "John Smith",
  //     date: "Oct 26, 2023",
  //     summary: "Initial draft for the new Q4 customer onboarding flow...",
  //     avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=John",
  //   },
  //   {
  //     id: "v1.0.0",
  //     status: "Archived",
  //     lineage: "Initial baseline",
  //     author: "Jane Doe",
  //     date: "Sep 12, 2023",
  //     summary: "Legacy version kept for compliance and audit requirements...",
  //     avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
  //   },
  // ];
  const filteredData = versionData.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.version_key?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filters.status === "All" ||
      item.status?.toLowerCase() === filters.status.toLowerCase();

    return matchesStatus && matchesSearch;
  });
  return (
    <div className="bg-[#f6f6f8] dark:bg-[#101622] text-slate-900 dark:text-slate-100 min-h-screen font-display">
      <main className="mx-auto px-10 py-8">
        {/* Page Heading */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <nav className="flex items-center gap-2 mb-6 text-sm font-medium text-slate-500">
              <NavLink
                to="/workflows"
                className="hover:text-blue-600 transition-colors"
              >
                Workflows
              </NavLink>
              <ChevronRight size={14} />
              <NavLink
                to={`/workflows/${workflowId}`}
                className="text-slate-900 dark:text-white hover:text-blue-600 transition-colors"
              >
                {workflowId}
              </NavLink>
              <ChevronRight size={14} />
              <span className="text-slate-900 dark:text-slate-300">
                Versions
              </span>
            </nav>
            <h1 className="text-4xl font-black leading-tight tracking-tight">
              Workflow Versions
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base max-w-2xl leading-relaxed">
              Track and manage changes, deployments, and lifecycle states for
              your automation workflows. Roll back to previous versions or
              create new drafts for testing.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-50 transition-colors">
              <History size={18} className="mr-2" /> Audit Logs
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="pointer-cursor flex items-center justify-center rounded-lg h-10 px-5 bg-[#0f49bd] text-white text-sm font-bold hover:bg-[#0f49bd]/90 transition-all shadow-sm"
            >
              <Plus size={18} className="mr-2" /> Create New Version
            </button>
          </div>
        </div>

        {/* Tabs Component */}
        <div className="flex gap-3 py-3 justify-between flex-wrap items-center ">
          <div className=" relative h-12 w-full ">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              className="w-full h-full pl-10 pr-4 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-[#1f2937] text-sm focus:ring-2 focus:ring-[#0f49bd] outline-none shadow-md "
              type="text"
              placeholder="Search by Version ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X size={14} />
              </button>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Menu
              model={statusItems}
              popup
              ref={menuStatus}
              id="status_menu"
              className="cursor-pointer p-2 border-none shadow-2xl rounded-2xl bg-white dark:bg-gray-900 w-48"
              pt={{
                list: { className: "flex flex-col gap-1" },
                action: {
                  className:
                    "hover:bg-blue-100 dark:hover:bg-gray-800 rounded-lg transition-colors p-3",
                },
                label: {
                  className:
                    "text-sm font-bold text-gray-700 dark:text-gray-200",
                },
              }}
            />

            {/* Status Filter Button */}
            <FilterButton
              label="Status"
              value={filters.status}
              isActive={filters.status !== "All"}
              icon={<ChevronDown size={14} />}
              onClick={(e) => menuStatus.current.toggle(e)}
            />

            {/* The Calendar Component */}
            {filters.status !== "All" && (
              <>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>
                <button
                  onClick={() =>
                    setFilters({
                      status: "All",
                      priority: "All",
                      dateRange: null,
                    })
                  }
                  className="text-[#135bec] text-xs font-black uppercase tracking-tight hover:text-blue-700 cursor-pointer transition-colors"
                >
                  Clear All
                </button>
              </>
            )}
          </div>
        </div>

        {/* Table Component */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            {/* <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
                  <th className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                    Version
                  </th>
                  <th className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                    Source Lineage
                  </th>
                  <th className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                    Created By
                  </th>
                  <th className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                    Created On
                  </th>
                  <th className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
                    Change Summary
                  </th>
                  <th className="px-6 py-4 text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 dark:divide-slate-800">
                {versions.map((v) => (
                  <tr
                    key={v.id}
                    onClick={() => handleRowClick(v.id)}
                    className={`hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors group cursor-pointer ${v.status === "Archived" ? "opacity-75" : ""}`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1.5">
                        <span className="text-slate-900 dark:text-white font-bold text-sm">
                          {v.id}
                        </span>
                        <StatusBadge status={v.status} />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-slate-500 dark:text-slate-400 text-sm">
                        {v.lineageIcon} {v.lineage}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={v.avatar}
                          className="size-8 rounded-full border border-slate-200"
                          alt={v.author}
                        />
                        <span className="text-slate-900 dark:text-slate-200 text-sm font-medium">
                          {v.author}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {v.date}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 max-w-[300px]">
                        <p className="text-slate-500 dark:text-slate-400 text-sm truncate">
                          {v.summary}
                        </p>
                        <Info
                          size={14}
                          className="text-slate-300 cursor-help"
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      {v.status === "Draft" ? (
                        <div className="flex justify-end gap-2">
                          <button className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold rounded hover:bg-slate-200 transition-colors">
                            Edit
                          </button>
                          <button className="px-3 py-1.5 bg-[#0f49bd]/10 text-[#0f49bd] text-xs font-bold rounded hover:bg-[#0f49bd]/20 transition-colors">
                            Activate
                          </button>
                        </div>
                      ) : (
                        <div className="flex justify-end gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                          <ActionButton
                            icon={<Copy size={18} />}
                            title="Clone"
                          />
                          <ActionButton
                            icon={<Archive size={18} />}
                            title="Archive"
                          />
                          <ActionButton
                            icon={<MoreVertical size={18} />}
                            title="More"
                          />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
            <DynamicTable
              tableData={filteredData}
              tableHead={TableSchemas.versions}
              rows={rows}
              first={first}
              handleRowClick={handleRowClick}
            />
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-center px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50">
            <Paginator
              first={first}
              rows={rows}
              totalRecords={filteredData.length}
              onPageChange={onPageChange}
            />
          </div>
        </div>

        {/* Footer Info Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<ShieldCheck size={18} />}
            title="Version Immutability"
            desc="Active versions are read-only. To make changes, clone the version into a new draft."
            primary
          />
          <InfoCard
            icon={<RotateCcw size={18} />}
            title="Auto-Archiving"
            desc="Versions older than 6 months without activity are automatically archived."
          />
          <InfoCard
            icon={<Workflow size={18} />}
            title="Collaborative Drafting"
            desc="Multiple users can edit a draft. Review audit logs to track field changes."
          />
        </div>
      </main>
      <CreateVersionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

const InfoCard = ({ icon, title, desc, primary }) => (
  <div
    className={`p-5 rounded-xl border ${primary ? "bg-[#0f49bd]/5 border-[#0f49bd]/10" : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"}`}
  >
    <div
      className={`flex items-center gap-3 mb-3 ${primary ? "text-[#0f49bd]" : "text-slate-700 dark:text-slate-300"}`}
    >
      {icon} <h3 className="font-bold text-sm">{title}</h3>
    </div>
    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
      {desc}
    </p>
  </div>
);

export default WorkflowVersions;
