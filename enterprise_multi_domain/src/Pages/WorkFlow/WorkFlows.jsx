import { Plus, Search, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DynamicTable from "../../Components/DynamicTable";
import Paginator from "../../Components/Paginator";
import { TableSchemas } from "../../Utils/TableSchemas";
import { getWorkflow } from "../../RTKThunk/WorkflowThunk";

const WorkFlows = () => {
  const { status } = useParams;
  const [activeTab, setActiveTab] = useState(status || "active");
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const rows = 10;
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const handleRowClick = (row) => {
    const workflow_id_str = row.data.workflow_id_str;
    navigate(`/workflows/${workflow_id_str}`);
  };
  const dispatch = useDispatch();
  const { data, total, loading } = useSelector((state) => state.workflows);

  useEffect(() => {
    dispatch(
      getWorkflow({
        activeTab,
        page: page,
        limit: rows,
        search: debouncedSearch,
      }),
    );
  }, [dispatch, activeTab, page, debouncedSearch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400); // delay

    return () => clearTimeout(timer);
  }, [search]);

  const onPageChange = (selectedPage) => {
    setPage(selectedPage + 1);
  };

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
          <div className="flex w-full items-center gap-3">
            <div className="flex-1  relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search WorkflowID and WorkflowName..."
                className="w-full shadow-md pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  <X size={14} />
                </button>
              )}
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
                    {tab === "active"}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* Data Table */}
        <div className="bg-white dark:bg-[#101622] border border-[#dbdfe6] dark:border-[#2d3748] rounded-xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <>
                <DynamicTable
                  tableData={data.data}
                  tableHead={TableSchemas.workflows}
                  handleRowClick={handleRowClick}
                  first={(page - 1) * rows}
                  rows={rows}
                />

                <div className="flex items-center justify-between px-6 py-4 bg-[#f8fafc] dark:bg-white/5 border-t border-[#dbdfe6] dark:border-[#2d3748]">
                  <p className="text-sm text-[#616f89] dark:text-gray-400 font-medium">
                    Showing {page + 1} to {Math.min(page + rows, data.total)} of{" "}
                    {data.total} workflows
                  </p>
                  <div className="flex items-center gap-2">
                    <Paginator
                      first={(page - 1) * rows}
                      rows={rows}
                      onPageChange={onPageChange}
                      totalRecords={total}
                    />
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default WorkFlows;
