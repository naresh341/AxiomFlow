import React, { useEffect, useRef, useState } from "react";
import { Filter, Search, Eye, Upload, X, ChevronDown } from "lucide-react";
import DynamicTable from "../../Components/DynamicTable";
import { TableSchemas } from "../../Utils/TableSchemas";
import { useDispatch, useSelector } from "react-redux";
import { getControlEvidence } from "../../RTKThunk/AsyncThunk";
import Paginator from "../../Components/Paginator";
import FilterButton from "../../Components/MiniComponent/FilterButton";
import { Menu } from "primereact/menu";

const EvidenceList = () => {
  const dispatch = useDispatch();
  const menuStatus = useRef(null);
  const [filters, setFilters] = useState({
    status: "All",
  });
  const rows = 10;
  const [first, setfirst] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const { evidence, loading, error } = useSelector((state) => state.compliance);

  useEffect(() => {
    dispatch(getControlEvidence("all"));
  }, [dispatch]);

  if (error)
    return (
      <div className="p-8 text-rose-500 font-bold bg-rose-50 dark:bg-rose-900/10 rounded-xl">
        Error loading evidence: {error}
      </div>
    );

  const statusItems = [
    {
      label: "All",
      className: filters.status === "All" ? "font-bold text-blue-600" : "",
      command: () => setFilters((prev) => ({ ...prev, status: "All" })),
    },
    {
      label: "Valid",
      command: () => setFilters((prev) => ({ ...prev, status: "VALID" })),
    },
    {
      label: "Expired",
      command: () => setFilters((prev) => ({ ...prev, status: "EXPIRED" })),
    },
    {
      label: "UNDER REVIEW",
      command: () =>
        setFilters((prev) => ({ ...prev, status: "UNDER_REVIEW" })),
    },
  ];
  const onPageChange = (page) => {
    setfirst(page - 1) * rows;
  };
  const filteredData = evidence.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.evidence_name?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filters.status === "All" ||
      item.status?.toLowerCase() === filters.status.toLowerCase();

    return matchesStatus && matchesSearch;
  });
  return (
    <div className="flex flex-col flex-1">
      {/* Search and Filter Bar */}
      <div className="px-4 pt-6 pb-2">
        <div className="flex flex-wrap items-center gap-4 p-4 rounded-xl border border-slate-200 dark:border-[#3b4754] bg-white dark:bg-[#1c2127]">
          <div className="flex items-center gap-2 flex-1 ">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />
            <input
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 shadow-md dark:bg-gray-800 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#135bec]/20 outline-none"
              placeholder="Search Evidence Name"
              type="text"
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

            <FilterButton
              label="Status"
              value={filters.status}
              isActive={filters.status !== "All"}
              icon={<ChevronDown size={14} />}
              onClick={(e) => menuStatus.current.toggle(e)}
            />

            {filters.status !== "All" && (
              <>
                <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-2"></div>
                <button
                  onClick={() =>
                    setFilters({
                      status: "All",
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

      {/* Data Table */}
      <div className="px-4 py-4">
        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-[#3b4754] bg-white dark:bg-[#111418] shadow-sm">
          {loading ? (
            <>
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            </>
          ) : (
            <DynamicTable
              tableData={filteredData || []}
              tableHead={TableSchemas.evidence}
              rows={rows}
              first={first}
            />
          )}
        </div>
      </div>

      {/* Footer Info */}
      <div className="px-6 py-3 border-t border-slate-200 dark:border-[#2d3a4b] bg-slate-50 dark:bg-[#101922] shrink-0">
        <Paginator
          first={first}
          rows={rows}
          totalRecords={filteredData?.length || 0}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default EvidenceList;
