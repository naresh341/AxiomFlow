import {
  Archive,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  Edit2,
  Eye,
  Plus,
  Search,
  Settings2,
  Webhook,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getWorkflow } from "../../RTKThunk/AsyncThunk";
import DynamicTable from "../../Components/DynamicTable";
import { TableSchemas } from "../../Utils/TableSchemas";
import Paginator from "../../Components/Paginator";
const WorkFlows = () => {
  const [activeTab, setActiveTab] = useState("active");
  const navigate = useNavigate();
  const handleRowClick = (id) => {
    navigate(`/workflows/${id}`);
  };
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.workflows);
  const [first, setFirst] = useState(0);
  const rows = 10;

  useEffect(() => {
    dispatch(getWorkflow("active"));
  }, [dispatch]);

  const onPageChange = (pageIndex) => {
    setFirst(pageIndex * rows);
  };

  const workflows = [
    {
      id: 1,
      name: "User Onboarding V2",
      trigger: "REST API",
      triggerIcon: <Settings2 size={16} />,
      status: "Active",
      version: "v3.4.12",
      owner: "John Doe",
      initials: "JD",
      modified: "2 hours ago",
      modifiedDate: "Oct 24, 2023 10:45 AM",
    },
    {
      id: 2,
      name: "Quarterly Compliance Audit",
      trigger: "Scheduled",
      triggerIcon: <Calendar size={16} />,
      status: "Draft",
      version: "v0.1.0",
      owner: "Sarah Reed",
      initials: "SR",
      modified: "Yesterday",
      modifiedDate: "Oct 23, 2023 04:12 PM",
    },
    {
      id: 3,
      name: "Threat Detection Response",
      trigger: "Webhook",
      triggerIcon: <Webhook size={16} />,
      status: "Active",
      version: "v1.2.0",
      owner: "Mark Tech",
      initials: "MT",
      modified: "3 days ago",
      modifiedDate: "Oct 21, 2023 09:00 AM",
    },
  ];

  return (
    <div className="w-full space-y-6">
      {/* Page Title & CTA Area */}
      <main className="mx-auto w-full px-4 lg:px-10 py-8 space-y-8">
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div>
            <h2 className="text-[#111318] dark:text-white text-4xl font-black tracking-tight">
              Workflows
            </h2>
            <p className="text-[#616f89] dark:text-gray-400 text-sm mt-1">
              Manage and automate your enterprise operations logic.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative w-64 hidden md:block">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[#616f89]"
                size={18}
              />
              <input
                className="w-full pl-10 pr-4 py-2 bg-white dark:bg-white/5 border border-[#dbdfe6] dark:border-[#2d3748] rounded-lg text-sm focus:ring-2 focus:ring-blue-500/50 outline-none text-[#111318] dark:text-white"
                placeholder="Search workflows..."
              />
            </div>
            <button
              onClick={() => navigate("/workflows/create")}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all font-bold text-sm shadow-lg shadow-blue-600/20"
            >
              <Plus size={18} />
              <span>Create Workflow</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-[#dbdfe6] dark:border-[#2d3748] gap-8">
          {["active", "draft", "archived"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex flex-col items-center justify-center border-b-2 pb-3 pt-4 px-1 transition-all capitalize ${
                activeTab === tab
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-[#616f89] dark:text-gray-400 hover:text-[#111318] dark:hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2">
                <p className="text-md font-bold tracking-wide">{tab}</p>
                {tab !== "archived" && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                      activeTab === tab
                        ? "bg-blue-600/10 text-blue-600"
                        : "bg-[#f0f2f4] dark:bg-white/5"
                    }`}
                  >
                    {tab === "active" ? "24" : "8"}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Data Table */}
        <div className="bg-white dark:bg-[#101622] border border-[#dbdfe6] dark:border-[#2d3748] rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            {/* <table className="w-full text-left border-collapse">
              <thead className="bg-[#f8fafc] dark:bg-white/5 border-b border-[#dbdfe6] dark:border-[#2d3748]">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-[#616f89] dark:text-gray-400 uppercase tracking-wider">
                    Workflow Name
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-[#616f89] dark:text-gray-400 uppercase tracking-wider">
                    Trigger Type
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-[#616f89] dark:text-gray-400 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-[#616f89] dark:text-gray-400 uppercase tracking-wider">
                    Version
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-[#616f89] dark:text-gray-400 uppercase tracking-wider">
                    Owner
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-[#616f89] dark:text-gray-400 uppercase tracking-wider">
                    Last Modified
                  </th>
                  <th className="px-6 py-4 text-xs font-bold text-[#616f89] dark:text-gray-400 uppercase tracking-wider text-right">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#dbdfe6] dark:divide-[#2d3748]">
                {workflows.map((wf) => (
                  <tr
                    key={wf.id}
                    onClick={() => handleRowClick(wf.id)}
                    className="hover:bg-blue-600/5 dark:hover:bg-blue-600/10 transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-blue-600">
                          <Clock size={18} />
                        </div>
                        <span className="text-sm font-bold text-[#111318] dark:text-white">
                          {wf.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-sm text-[#616f89] dark:text-gray-400">
                        <span className="text-blue-500/70">
                          {wf.triggerIcon}
                        </span>
                        <span>{wf.trigger}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${
                          wf.status === "Active"
                            ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400"
                            : "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        }`}
                      >
                        {wf.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-[#616f89] dark:text-gray-400">
                      {wf.version}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="size-6 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center text-[10px] font-bold text-blue-600">
                          {wf.initials}
                        </div>
                        <span className="text-sm text-[#616f89] dark:text-gray-400">
                          {wf.owner}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm text-[#111318] dark:text-white font-medium">
                          {wf.modified}
                        </span>
                        <span className="text-[10px] text-[#616f89] dark:text-gray-500 uppercase tracking-tighter">
                          {wf.modifiedDate}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRowClick(wf.id);
                          }}
                          className="p-2 rounded-lg hover:bg-white dark:hover:bg-white/10 text-[#616f89] dark:text-gray-400 hover:text-blue-600 transition-colors shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
                        >
                          <Eye size={16} />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-white dark:hover:bg-white/10 text-[#616f89] dark:text-gray-400 hover:text-blue-600 transition-colors shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                          <Edit2 size={16} />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-white dark:hover:bg-white/10 text-[#616f89] dark:text-gray-400 hover:text-blue-600 transition-colors shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
                          <Copy size={16} />
                        </button>
                        <button className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-[#616f89] dark:text-gray-400 hover:text-red-500 transition-colors shadow-sm border border-transparent hover:border-red-100 dark:hover:border-red-900">
                          <Archive size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}

            {loading ? (
              <p>Loading...</p>
            ) : (
              <>
                <DynamicTable
                  tableData={data}
                  tableHead={TableSchemas.workflows}
                  handleRowClick={handleRowClick}
                />

                <div className="flex items-center justify-between px-6 py-4 bg-[#f8fafc] dark:bg-white/5 border-t border-[#dbdfe6] dark:border-[#2d3748]">
                  <p className="text-sm text-[#616f89] dark:text-gray-400 font-medium">
                    Showing 1 to 3 of 24 workflows
                  </p>
                  <div className="flex items-center gap-2">
                    <Paginator
                      totalRecords={data.length}
                      rows={rows}
                      first={first}
                      onPageChange={onPageChange}
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Footer Pagination */}
        </div>
      </main>
    </div>
  );
};

export default WorkFlows;
