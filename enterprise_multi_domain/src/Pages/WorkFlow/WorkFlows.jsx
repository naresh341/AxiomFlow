import { Plus, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DynamicTable from "../../Components/DynamicTable";
import Paginator from "../../Components/Paginator";
import { getWorkflow } from "../../RTKThunk/AsyncThunk";
import { TableSchemas } from "../../Utils/TableSchemas";
const WorkFlows = () => {
  const { status } = useParams;
  const [activeTab, setActiveTab] = useState(status || "active");
  const navigate = useNavigate();

  const handleRowClick = (row) => {
    const workflow_id_str = row.data.workflow_id_str;
    navigate(`/workflows/${workflow_id_str}`);
  };
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => state.workflows);
  const [first, setFirst] = useState(0);
  const rows = 10;

  useEffect(() => {
    dispatch(getWorkflow(activeTab));
  }, [dispatch, activeTab]);

  const onPageChange = (pageIndex) => {
    setFirst(pageIndex * rows);
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
                    {tab === "active" ? `${data.length}` : `${data.length}`}
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
                  tableData={data}
                  tableHead={TableSchemas.workflows}
                  handleRowClick={handleRowClick}
                  first={first}
                />

                <div className="flex items-center justify-between px-6 py-4 bg-[#f8fafc] dark:bg-white/5 border-t border-[#dbdfe6] dark:border-[#2d3748]">
                  <p className="text-sm text-[#616f89] dark:text-gray-400 font-medium">
                    Showing {first + 1} to {Math.min(first + rows, data.length)}{" "}
                    of {data.length} workflows
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
        </div>
      </main>
    </div>
  );
};

export default WorkFlows;
