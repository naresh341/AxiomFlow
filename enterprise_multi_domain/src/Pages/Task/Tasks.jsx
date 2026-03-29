import { ChevronDown, Download, Search, X } from "lucide-react";
import { Menu } from "primereact/menu";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import DynamicTable from "../../Components/DynamicTable";
import FilterButton from "../../Components/MiniComponent/FilterButton";
import { useNotify } from "../../Components/MiniComponent/useNotify";
import Paginator from "../../Components/Paginator";
import { getTaskList } from "../../RTKThunk/WorkflowThunk";
import { TableSchemas } from "../../Utils/TableSchemas";

const Tasks = () => {
  const { status } = useParams();
  const activeTab = status || "MyTasks";
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);
  const rows = 10;
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const menuPriority = useRef(null);
  const [filters, setFilters] = useState({
    status: "All",
    priority: "All",
  });
  const { loading, data, total } = useSelector((state) => state.task);
  const notify = useNotify();
  useEffect(() => {
    try {
      dispatch(
        getTaskList({
          status: activeTab,
          page,
          limit: rows,
          search: debouncedSearch,
          priority: filters.priority,
        }),
      );
    } catch (error) {
      notify.error(error?.message || "Something went wrong");
    }
  }, [activeTab, dispatch, page, debouncedSearch, filters.priority, notify]);

  const onPageChange = (selectedPage) => {
    setPage(selectedPage + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400); // delay

    return () => clearTimeout(timer);
  }, [search]);

  const Tabs = [
    { label: "My Tasks", key: "MyTasks" },
    { label: "OverDue", key: "OverDue" },
    {
      label: "Due Today",
      key: "DueToday",
    },
  ];
  const handleTabChange = (key) => {
    navigate(`/tasks/${key}`);
  };

  // const statusItems = [
  //   {
  //     label: "All",
  //     className: filters.status === "All" ? "font-bold text-blue-600" : "",
  //     command: () => setFilters((prev) => ({ ...prev, status: "All" })),
  //   },
  //   {
  //     label: "Pending",
  //     command: () => setFilters((prev) => ({ ...prev, status: "PENDING" })),
  //   },
  //   {
  //     label: "Completed",
  //     command: () => setFilters((prev) => ({ ...prev, status: "COMPLETED" })),
  //   },
  // ];

  const priorityItems = [
    {
      label: "All Priority",
      command: () => setFilters((f) => ({ ...f, priority: "All" })),
    },
    {
      label: "High (8-10)",
      template: (item) => (
        <div className="flex items-center gap-2 p-2 text-red-600 font-bold">
          <div className="size-2 rounded-full bg-red-500" />
          {item.label}
        </div>
      ),
      command: () => setFilters((f) => ({ ...f, priority: "High" })),
    },
    {
      label: "Medium (5-7)",
      template: (item) => (
        <div className="flex items-center gap-2 p-2 text-amber-600 font-bold">
          <div className="size-2 rounded-full bg-amber-500" />
          {item.label}
        </div>
      ),
      command: () => setFilters((f) => ({ ...f, priority: "Medium" })),
    },
    {
      label: "Low (1-4)",
      template: (item) => (
        <div className="flex items-center gap-2 p-2 text-emerald-600 font-bold">
          <div className="size-2 rounded-full bg-emerald-500" />
          {item.label}
        </div>
      ),
      command: () => setFilters((f) => ({ ...f, priority: "Low" })),
    },
  ];

  return (
    <div className="flex-1 flex flex-col bg-[#f6f6f8] dark:bg-[#101622] min-h-screen">
      {/* Header */}
      <header className="bg-white dark:bg-[#101622] border-b border-[#dbdfe6] dark:border-gray-800">
        <div className=" mx-auto px-6 py-8 flex flex-wrap justify-between items-center gap-3">
          <div>
            <h1 className="text-[#111318] dark:text-white text-4xl font-black tracking-tight">
              Tasks Management
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Track and manage your enterprise operations
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#f0f2f4] dark:bg-gray-800 text-[#111318] dark:text-white rounded-xl font-bold text-sm hover:bg-gray-200 transition-all">
              <Download size={18} /> Export
            </button>
          </div>
        </div>
      </header>

      {/* Content Section */}
      <section className=" w-full mx-auto px-6 mt-6">
        <div className="bg-white dark:bg-[#101622] rounded-2xl shadow-sm border border-[#dbdfe6] dark:border-gray-800 overflow-hidden">
          {/* Tabs */}
          <div className="border-b border-[#dbdfe6] dark:border-gray-800 px-6 flex gap-8">
            {Tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => handleTabChange(tab.key)}
                className={`pb-4 pt-5 text-md font-black transition-all border-b-2 ${
                  activeTab === tab.key
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Filters Area */}
          <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-50/50 dark:bg-transparent">
            <div className="flex-1  relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search TasksID and Task Name..."
                className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-slate-200 dark:border-gray-700 rounded-xl text-sm focus:ring-2 focus:ring-blue-600 outline-none transition-all"
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
            <div className="flex gap-3 flex-wrap items-center ">
              {/* <Menu
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

              <FilterButton
                label="Status"
                value={filters.status}
                isActive={filters.status !== "All"}
                icon={<ChevronDown size={14} />}
                onClick={(e) => menuStatus.current.toggle(e)}
              /> */}
              <Menu
                model={priorityItems}
                popup
                ref={menuPriority}
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
              <FilterButton
                label="Priority"
                value={filters.priority}
                isActive={filters.priority !== "All"}
                icon={<ChevronDown size={14} />}
                onClick={(e) => menuPriority.current.toggle(e)}
              />

              {(filters.status !== "All" || filters.priority !== "All") && (
                <>
                  <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>
                  <button
                    onClick={() =>
                      setFilters({
                        status: "All",
                        priority: "All",
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

          {/* Table */}
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : (
              <DynamicTable
                tableData={data || []}
                first={(page - 1) * rows}
                tableHead={TableSchemas.task}
              />
            )}
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-100 dark:border-gray-800 flex items-center justify-between bg-slate-50/30">
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">
              Showing {data?.length || 0} Tasks
            </p>
            <div className="flex gap-2">
              <Paginator
                rows={rows}
                first={(page - 1) * rows}
                onPageChange={onPageChange}
                totalRecords={total}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Tasks;
