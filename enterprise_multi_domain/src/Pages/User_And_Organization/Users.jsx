import { ChevronDown, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DynamicTable from "../../Components/DynamicTable";
import Paginator from "../../Components/Paginator";
import { get_UserOrg } from "../../RTKThunk/AsyncThunk";
import { TableSchemas } from "../../Utils/TableSchemas";
import FilterButton from "../../Components/MiniComponent/FilterButton";
import { Menu } from "primereact/menu";

const Users = () => {
  const rows = 10;
  const dispatch = useDispatch();
  const menuStatus = useRef(null);
  const [first, setFirst] = useState(0);
  const { loading, data } = useSelector((state) => state.UserOrg);

  const [filters, setFilters] = useState({
    status: "All",
  });
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(() => {
    dispatch(get_UserOrg());
  }, [dispatch]);

  const handleCustomPageChange = (page) => {
    setFirst(page * rows);
  };

  const statusItems = [
    {
      label: "All",
      className: filters.status === "All" ? "font-bold text-blue-600" : "",
      command: () => setFilters((prev) => ({ ...prev, status: "All" })),
    },
    {
      label: "Escalated",
      command: () => setFilters((prev) => ({ ...prev, status: "ESCALATED" })),
    },
    {
      label: "Pending",
      command: () => setFilters((prev) => ({ ...prev, status: "PENDING" })),
    },
  ];

  const filteredData = data.filter((item) => {
    const matchesSearch =
      !searchQuery ||
      item.approval_key?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      filters.status === "All" ||
      item.status?.toLowerCase() === filters.status.toLowerCase();

    return matchesStatus && matchesSearch;
  });

  return (
    <>
      <div className="flex flex-wrap items-center gap-4 mt-6">
        <div className="relative flex-1">
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
          <input
            type="text"
            className="w-full rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-[#1a242f] py-3 pl-12 pr-4 text-[#111418] dark:text-white focus:border-blue-600 focus:ring-2 focus:ring-blue-600/20 outline-none transition-all"
            placeholder="Search by name or keyword..."
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

        {/* Status Filter Button */}
        <FilterButton
          label="Status"
          value={filters.status}
          isActive={filters.status !== "All"}
          icon={<ChevronDown size={14} />}
          onClick={(e) => menuStatus.current.toggle(e)}
        />
      </div>
      <div className="mt-6 ">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <DynamicTable
            tableData={filteredData}
            tableHead={TableSchemas.users}
            first={first}
            rows={rows}
          />
        )}

        <div className="mt-6 flex items-center justify-between rounded-xl bg-gray-50 dark:bg-gray-800 px-6 py-4">
          <Paginator
            totalRecords={filteredData.length}
            rows={rows}
            first={first}
            onPageChange={handleCustomPageChange}
          />
        </div>
      </div>
    </>
  );
};

export default Users;
