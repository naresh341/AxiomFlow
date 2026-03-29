import {
  ChevronDown,
  Copy,
  Eye,
  Info,
  Laptop,
  Search,
  ShieldCheck,
  X,
} from "lucide-react";
import { Menu } from "primereact/menu";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DynamicTable from "../../Components/DynamicTable";
import FilterButton from "../../Components/MiniComponent/FilterButton";
import Paginator from "../../Components/Paginator";
// import { get_auditLogs } from "../../RTKThunk/AsyncThunk";
import { TableSchemas } from "../../Utils/TableSchemas";
import { get_auditLogs } from "../../RTKThunk/GovernanceThunk";
const UserAction = () => {
  const dispatch = useDispatch();
  const [first, setfirst] = useState(0);
  const rows = 10;
  const menuStatus = useRef(null);
  const menuactorType = useRef(null);
  const { loading, auditdata } = useSelector((state) => state.governance);
  const [filters, setFilters] = useState({
    status: "All",
    actorType: "All",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLog, setSelectedLog] = useState(null);

  useEffect(() => {
    dispatch(get_auditLogs("USER"));
  }, [dispatch]);

  const handleRowClick = (rowData) => {
    setSelectedLog(rowData.data);
  };

  const onPageChange = (page) => {
    setfirst(page + 1) * rows;
  };
  const statusItems = [
    {
      label: "All",
      className: filters.status === "All" ? "font-bold text-blue-600" : "",
      command: () => setFilters((prev) => ({ ...prev, status: "All" })),
    },
    {
      label: "Success",
      command: () => setFilters((prev) => ({ ...prev, status: "SUCCESS" })),
    },
    {
      label: "Failed",
      command: () => setFilters((prev) => ({ ...prev, status: "FAILED" })),
    },
  ];
  const actorType = [
    {
      label: "All",
      className: filters.actorType === "All" ? "font-bold text-blue-600" : "",
      command: () => setFilters((prev) => ({ ...prev, actorType: "All" })),
    },
    {
      label: "User",
      command: () => setFilters((prev) => ({ ...prev, actorType: "USER" })),
    },
    {
      label: "Admin",
      command: () => setFilters((prev) => ({ ...prev, actorType: "ADMIN" })),
    },
    {
      label: "System",
      command: () => setFilters((prev) => ({ ...prev, actorType: "SYSTEM" })),
    },
  ];

  const filteredData = auditdata?.filter((item) => {
    const matchesStatus =
      filters.status === "All" || item.status?.toUpperCase() === filters.status;

    const matchesActor =
      filters.actorType === "All" ||
      item.actorType?.toUpperCase() === filters.actorType;

    const matchesSearch =
      !searchQuery ||
      Object.values(item).some((val) =>
        String(val).toLowerCase().includes(searchQuery.toLowerCase()),
      );

    return matchesStatus && matchesActor && matchesSearch;
  });
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
        <div className="relative group">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#137fec] transition-colors"
            size={20}
          />
          <input
            className="w-full h-12 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl pl-12 pr-4 text-base focus:border-[#137fec] focus:ring-2 focus:ring-[#137fec]/20 outline-none transition-all"
            placeholder="Search logs..."
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
        <Menu
          model={actorType}
          popup
          ref={menuactorType}
          id="actorType_menu"
          className="cursor-pointer p-2 border-none shadow-2xl rounded-2xl bg-white dark:bg-gray-900 w-52"
          pt={{
            list: { className: "flex flex-col gap-1" },
            action: {
              className:
                "hover:bg-blue-100 dark:hover:bg-gray-800 rounded-lg transition-colors p-3",
            },
            label: {
              className: "text-sm font-bold text-gray-700 dark:text-gray-200",
            },
          }}
        />

        <FilterButton
          label="Action Type"
          value={filters.actorType}
          isActive={filters.actorType !== "All"}
          icon={<ChevronDown size={14} />}
          onClick={(e) => menuactorType.current.toggle(e)}
        />

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
              className: "text-sm font-bold text-gray-700 dark:text-gray-200",
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

        {(filters.status !== "All" || filters.actorType !== "All") && (
          <>
            <div className="flex items-center mb-3 ml-4">
              <button
                onClick={() =>
                  setFilters({
                    status: "All",
                    actorType: "All",
                  })
                }
                className="text-[#135bec] text-sm font-black uppercase tracking-tight hover:text-blue-700 cursor-pointer transition-colors"
              >
                Clear All
              </button>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8 grow">
        <div className="w-full lg:w-[68%] bg-white dark:bg-[#111418] border border-slate-200 dark:border-[#283039] rounded-2xl overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            {loading ? (
              <>
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              </>
            ) : (
              <DynamicTable
                tableHead={TableSchemas?.auditLogsUser}
                first={first}
                tableData={filteredData}
                handleRowClick={handleRowClick}
              />
            )}
          </div>

          <div className="p-6 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
            <Paginator
              first={first}
              rows={rows}
              onPageChange={onPageChange}
              totalRecords={filteredData?.length}
            />
          </div>
        </div>

        <aside className="w-full lg:w-[35%] flex flex-col gap-8 bg-white dark:bg-[#111820] border border-slate-200 dark:border-[#1f2937] rounded-2xl p-8 shadow-2xl sticky top-28 h-fit">
          {selectedLog ? (
            <>
              <div className="flex items-center gap-3 border-b  pb-5">
                <Info size={24} className="text-[#137fec]" />
                <h3 className="text-xl font-black uppercase">Log Details</h3>
              </div>

              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase text-slate-400">
                    Action Description
                  </label>
                  <p className="text-lg leading-relaxed">
                    {selectedLog?.description || "No description available"}
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black uppercase text-slate-400">
                    User Metadata (Snapshot)
                  </label>
                  <div className="bg-slate-50 dark:bg-slate-800/50 rounded-xl p-5 grid grid-cols-2 gap-y-5">
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">
                        Role
                      </p>
                      <p className="text-base font-bold text-[#137fec]">
                        {selectedLog?.role || "N/A"}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-slate-400 font-bold uppercase">
                        Dept
                      </p>
                      <p className="text-base font-bold">
                        {selectedLog?.dept || "N/A"}
                      </p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-slate-400 font-bold uppercase">
                        Location
                      </p>
                      <p className="text-base font-bold">
                        {selectedLog?.location || "Unknown"}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-xs font-black uppercase text-slate-400">
                    Source Device
                  </label>
                  <div className="flex items-center gap-4 p-5 bg-slate-50 ... rounded-xl">
                    <Laptop size={24} className="text-[#137fec]" />
                    <div>
                      <p className="text-base font-bold">
                        {selectedLog?.device || "Desktop"}
                      </p>
                      <p className="text-sm text-slate-400">
                        {selectedLog?.ip_address}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <label className="text-xs font-black uppercase tracking-widest text-slate-400">
                    Identifier
                  </label>
                  <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl font-mono text-sm">
                    <span className="truncate opacity-70">
                      {selectedLog?.id}
                    </span>
                    <button className="text-[#137fec] hover:scale-110 transition-transform">
                      <Copy size={18} />
                    </button>
                  </div>
                </div>
              </div>

              <button className="w-full py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 rounded-xl text-base font-black uppercase tracking-widest flex items-center justify-center gap-3 shadow-lg shadow-slate-200 dark:shadow-none transition-transform hover:-translate-y-0.5">
                <Eye size={20} />
                Inspect Payload
              </button>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center w-full   justify-center h-64 text-slate-400 animate-pulse">
                <ShieldCheck size={48} className="mb-4 text-blue-600" />
                <p className="font-black uppercase tracking-widest text-sm ">
                  Select User Log...
                </p>
              </div>
            </>
          )}
        </aside>
      </div>
    </div>
  );
};

export default UserAction;
