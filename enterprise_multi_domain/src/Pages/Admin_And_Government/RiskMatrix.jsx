import { ChevronDown, Info, Search, X } from "lucide-react";
import { Menu } from "primereact/menu";
import { useEffect, useMemo, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DynamicTable from "../../Components/DynamicTable";
import FilterButton from "../../Components/MiniComponent/FilterButton";
import Paginator from "../../Components/Paginator";
import RiskModal from "../../Components/RiskModal";
// import { delete_Risk, getRisks, update_Risk } from "../../RTKThunk/AsyncThunk";
import { TableSchemas } from "../../Utils/TableSchemas";
import { delete_Risk, getRisks, update_Risk } from "../../RTKThunk/GovernanceThunk";

const RiskMatrix = () => {
  const dispatch = useDispatch();
  const menuStatus = useRef(null);
  const [filters, setFilters] = useState({
    status: "All",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const { risks, loading, error } = useSelector((state) => state.compliance);
  const rows = 10;
  const [first, setfirst] = useState(0);

  useEffect(() => {
    dispatch(getRisks());
  }, [dispatch]);

  const [selectedRisk, setSelectedRisk] = useState(null);
  const [isRiskModalOpen, setIsRiskModalOpen] = useState(false);

  const handleEdit = (risk) => {
    setSelectedRisk(risk);
    setIsRiskModalOpen(true);
  };
  const handleDeleteRisk = async (id) => {
    try {
      await dispatch(delete_Risk(id)).unwrap();
      dispatch(getRisks());
    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleUpdateRisk = async (id, payload) => {
    try {
      await dispatch(update_Risk({ id, payload })).unwrap();
      dispatch(getRisks());
    } catch (error) {
      console.error("Update failed:", error);
    }
  };

  const statusItems = [
    {
      label: "All",
      className: filters.status === "All" ? "font-bold text-blue-600" : "",
      command: () => setFilters((prev) => ({ ...prev, status: "All" })),
    },
    {
      label: "Open",
      command: () => setFilters((prev) => ({ ...prev, status: "OPEN" })),
    },
    {
      label: "Mitigated",
      command: () => setFilters((prev) => ({ ...prev, status: "MITIGATED" })),
    },
    {
      label: "Accepted",
      command: () => setFilters((prev) => ({ ...prev, status: "ACCEPTED" })),
    },
    {
      label: "Closed",
      command: () => setFilters((prev) => ({ ...prev, status: "CLOSED" })),
    },
  ];
  const onPageChange = (page) => {
    setfirst(page - 1) * rows;
  };
  const weight = {
    LOW: 1,
    MEDIUM: 2,
    HIGH: 3,
    CRITICAL: 4,
    VERY_HIGH: 5,
  };
  const riskStats = useMemo(() => {
    const counts = { Critical: 0, High: 0, Medium: 0, Low: 0 };
    const matrixMap = Array(5)
      .fill(0)
      .map(() => Array(5).fill(0));

    risks.forEach((r) => {
      const impactStr = r.impact?.toUpperCase();
      if (impactStr === "CRITICAL") counts.Critical++;
      else if (impactStr === "HIGH") counts.High++;
      else if (impactStr === "MEDIUM") counts.Medium++;
      else if (impactStr === "LOW") counts.Low++;
      const lVal = weight[r.likelihood?.toUpperCase()] || 1;
      const iVal = weight[r.impact?.toUpperCase()] || 1;

      const lIdx = Math.min(Math.max(lVal - 1, 0), 4);
      const iIdx = Math.min(Math.max(iVal - 1, 0), 4);

      matrixMap[lIdx][iIdx]++;
    });

    return { counts, matrixMap };
  }, [risks]);

  const filteredData = risks.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.risk_code?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filters.status === "All" ||
      item.status?.toLowerCase() === filters.status.toLowerCase();

    return matchesStatus && matchesSearch;
  });

  if (error) return <div className="p-10 text-rose-500">Error: {error}</div>;
  return (
    <div className="flex flex-col gap-8 p-6 animate-in fade-in duration-500">
      {/* 1. Heatmap Summary Section */}
      <section>
        <h3 className="text-slate-900 dark:text-white text-xl font-bold mb-4 flex items-center gap-2">
          Risk Matrix (Likelihood vs Impact)
          <Info size={16} className="text-slate-400 cursor-help" />
        </h3>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-white dark:bg-[#1c2127] p-6 rounded-xl border border-slate-200 dark:border-[#3b4754] shadow-sm">
          {/* Visual Matrix */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="flex w-full max-w-100">
              {/* Y-Axis Label */}
              <div className="flex items-center justify-center [writing-mode:vertical-lr] rotate-180 text-[10px] font-black text-slate-500 uppercase tracking-widest mr-2">
                Likelihood
              </div>
              {/* The 5x5 Grid */}
              <div className="grid grid-cols-5 grid-rows-5 gap-1 w-full aspect-square border-l border-b border-slate-300 dark:border-slate-700">
                {/* Render Matrix from Top-Down (Likelihood 5 to 1) */}
                {[4, 3, 2, 1, 0].map((rowIdx) =>
                  [0, 1, 2, 3, 4].map((colIdx) => {
                    const count = riskStats.matrixMap[rowIdx][colIdx];
                    let bgColor = "bg-emerald-500/20"; // Low
                    if (rowIdx + colIdx >= 6)
                      bgColor = "bg-red-600/60 text-white"; // Critical
                    else if (rowIdx + colIdx >= 4)
                      bgColor = "bg-orange-500/40"; // High
                    else if (rowIdx + colIdx >= 2) bgColor = "bg-yellow-400/20"; // Medium

                    return (
                      <div
                        key={`${rowIdx}-${colIdx}`}
                        className={`flex items-center justify-center text-xs font-bold border border-white/5 ${bgColor}`}
                      >
                        {count > 0 ? count : ""}
                      </div>
                    );
                  }),
                )}
              </div>
            </div>
            <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mt-2 ml-6">
              Impact
            </div>
          </div>

          {/* Severity Counters */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="grid grid-cols-2 gap-4">
              <SeverityCard
                count={riskStats.counts.Critical}
                label="Critical Risks"
                color="text-red-500"
                bg="bg-red-500/10"
                border="border-red-500/20"
              />
              <SeverityCard
                count={riskStats.counts.High}
                label="High Risks"
                color="text-orange-500"
                bg="bg-orange-500/10"
                border="border-orange-500/20"
              />
              <SeverityCard
                count={riskStats.counts.Medium}
                label="Medium Risks"
                color="text-yellow-600"
                bg="bg-yellow-500/10"
                border="border-yellow-500/20"
              />
              <SeverityCard
                count={riskStats.counts.Low}
                label="Low Risks"
                color="text-emerald-500"
                bg="bg-emerald-500/10"
                border="border-emerald-500/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Risk Registry Table Section */}
      <section className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h3 className="text-slate-900 dark:text-white text-xl font-bold">
            Risk Registry
          </h3>
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-75">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                className="w-full pl-10 pr-4 py-2.5 bg-gray-50 shadow-md dark:bg-gray-800 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-[#135bec]/20 outline-none"
                placeholder="Search Risk ID"
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

        <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-[#3b4754] bg-white dark:bg-[#1c2127]">
          {loading ? (
            <div className="flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#137fec]"></div>
            </div>
          ) : (
            <DynamicTable
              tableData={filteredData || []}
              tableHead={TableSchemas.risks}
              rows={rows}
              first={first}
              onEdit={handleEdit}
              onDelete={handleDeleteRisk}
            />
          )}
        </div>
        <div className="px-6 py-3 border-t border-slate-200 dark:border-[#2d3a4b] bg-slate-50 dark:bg-[#101922] shrink-0">
          <Paginator
            first={first}
            rows={rows}
            totalRecords={filteredData?.length || 0}
            onPageChange={onPageChange}
          />
        </div>
      </section>
      <RiskModal
        isOpen={isRiskModalOpen}
        onClose={() => {
          setIsRiskModalOpen(false);
          setSelectedRisk(null);
        }}
        editData={selectedRisk}
        onSubmit={(data) => {
          if (!selectedRisk) return;
          handleUpdateRisk(selectedRisk.id, data);
        }}
      />
    </div>
  );
};

// Internal Helper Components
const SeverityCard = ({ count, label, color, bg, border }) => (
  <div className={`p-4 rounded-lg border ${bg} ${border}`}>
    <div className={`${color} text-2xl font-black`}>{count}</div>
    <div className="text-slate-500 dark:text-slate-400 text-[10px] font-bold uppercase tracking-wider">
      {label}
    </div>
  </div>
);

export default RiskMatrix;
