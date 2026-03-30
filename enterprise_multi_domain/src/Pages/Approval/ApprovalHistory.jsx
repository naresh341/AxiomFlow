import { Calendar, ChevronDown, Search, X } from "lucide-react";
import { Calendar as PrimeCalendar } from "primereact/calendar";
import { Menu } from "primereact/menu";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import DynamicTable from "../../Components/DynamicTable";
import FilterButton from "../../Components/MiniComponent/FilterButton";
import Paginator from "../../Components/Paginator";
import { getApprovalList } from "../../RTKThunk/WorkflowThunk";
import { TableSchemas } from "../../Utils/TableSchemas";
const ApprovalHistory = () => {
  const menuStatus = useRef(null);
  const menuPriority = useRef(null);
  const calendarRef = useRef(null);
  const [filters, setFilters] = useState({
    status: "All",
    priority: "All",
    dateRange: null,
  });
  const location = useLocation();
  const [page, setPage] = useState(1);
  const rows = 10;
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { data, total, loading } = useSelector((state) => state.approval);
  const dispatch = useDispatch();
  const isHistoryTab = location.pathname.includes("history");
  const onPageChange = (selectedPage) => {
    setPage(selectedPage + 1);
  };

  useEffect(() => {
    setFilters((prev) => {
      if (isHistoryTab) {
        return { ...prev, status: "HISTORY" };
      }

      if (prev.status === "HISTORY") {
        return { ...prev, status: "ALL_PENDING" };
      }

      return prev; // keep user selection
    });
  }, [isHistoryTab]);

  useEffect(() => {
    setPage(1);
  }, [search, filters.status, filters.priority, filters.dateRange]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400); // delay

    return () => clearTimeout(timer); // cleanup
  }, [search]);

  const statusItems = [
    {
      label: "All",
      className: filters.status === "All" ? "font-bold text-blue-600" : "",
      command: () => setFilters((prev) => ({ ...prev, status: "All" })),
    },
    {
      label: "Approved",
      command: () => setFilters((prev) => ({ ...prev, status: "APPROVED" })),
    },
    {
      label: "Rejected",
      command: () => setFilters((prev) => ({ ...prev, status: "REJECTED" })),
    },
  ];

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

  const getDateLabel = () => {
    if (!filters.dateRange) return "All Time";
    return new Date(filters.dateRange).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      dispatch(
        getApprovalList({
          status: filters.status,
          page: page,
          limit: rows,
          search: debouncedSearch,
          priority: filters.priority,
          date: filters.dateRange
            ? filters.dateRange.toISOString().split("T")[0]
            : "",
        }),
      );
    }, 500);

    return () => clearTimeout(delay);
  }, [page, filters, dispatch, debouncedSearch]);

  return (
    <div className="flex flex-col h-full min-h-0 bg-[#f6f6f8] dark:bg-[#101622] ">
      {/* --- Main Content --- */}
      <main className="flex-1 min-h-0 overflow-y-auto custom-scrollbar">
        {/* Toolbar & Filters */}
        <div className="">
          <div className="bg-white dark:bg-gray-900 p-4 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <div className="relative flex-1 min-w-75">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={18}
                />
                <input
                  className="w-full pl-10 pr-4 py-2.5 bg-gray-50 shadow-md dark:bg-gray-800 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#135bec]/20 outline-none"
                  placeholder="Search Approval ID ,Stage And Requester Name"
                  type="text"
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
                <FilterButton
                  label="Date"
                  value={getDateLabel()}
                  isActive={filters.dateRange}
                  icon={<Calendar size={14} />}
                  onClick={() => calendarRef.current.show()}
                />

                {/* The Calendar Component */}
                <div className="relative">
                  <PrimeCalendar
                    ref={calendarRef}
                    value={filters.dateRange}
                    onChange={(e) =>
                      setFilters((prev) => ({ ...prev, dateRange: e.value }))
                    }
                    selectionMode="single"
                    readOnlyInput
                    hideOnDateTimeSelect={true}
                    className="absolute opacity-0 pointer-events-none -top-10"
                    panelClassName="custom-calendar-panel"
                    pt={{
                      root: { className: "border-none" },
                      panel: {
                        className:
                          "bg-white dark:bg-[#1a2233] border border-[#dbdfe6] dark:border-gray-700 shadow-2xl rounded-2xl p-2 mt-2",
                      },
                      header: {
                        className:
                          "bg-transparent border-b border-gray-100 dark:border-gray-800 pb-2 mb-2",
                      },
                      title: {
                        className:
                          "text-sm font-bold text-gray-700 dark:text-gray-200",
                      },
                      dayLabel: {
                        className: "text-xs font-bold text-gray-400 uppercase",
                      },
                      day: ({ context }) => ({
                        className: `
          rounded-lg transition-all text-sm
          ${context.selected ? "bg-[#135bec] text-white" : "hover:bg-blue-50 dark:hover:bg-gray-800"}
          ${context.disabled ? "opacity-20" : ""}
        `,
                      }),
                    }}
                  />
                </div>
                {(filters.status !== "All" ||
                  filters.priority !== "All" ||
                  filters.dateRange) && (
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
          </div>

          {/* History Table */}
          <div className="mt-6 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm">
            <div className="">
              {loading ? (
                <>
                  <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                  </div>
                </>
              ) : (
                <DynamicTable
                  tableHead={TableSchemas.approval}
                  tableData={data}
                  first={(page - 1) * rows}
                  rows={rows}
                />
              )}

              <Paginator
                first={(page - 1) * rows}
                rows={rows}
                onPageChange={onPageChange}
                totalRecords={total}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ApprovalHistory;
