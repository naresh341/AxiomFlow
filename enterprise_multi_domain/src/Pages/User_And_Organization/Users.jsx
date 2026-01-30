import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DynamicTable from "../../Components/DynamicTable";
import Paginator from "../../Components/Paginator";
import { setTableData } from "../../Features/TableSlice";
import { TableSchemas } from "../../Utils/TableSchemas";

const Users = () => {
  const dispatch = useDispatch();

  const [first, setFirst] = useState(0); // starting index
  const [rows, setRows] = useState(5); // rows per page
  const totalRecords = 1; // ← later this comes from backend

  const tabledata = useSelector(
    (state) => state?.table?.TableData?.["users"] || [],
  );

  const paginatedData = tabledata.slice(first, first + rows);
  const handleCustomPageChange = (selectedPage) => {
    const newFirst = selectedPage * rows;
    setFirst(newFirst);
  };

  // const statusStyles = {
  //   Active:
  //     "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400",
  //   Suspended: "bg-gray-200 text-gray-700 dark:bg-gray-800 dark:text-gray-400",
  //   Pending: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
  // };

  useEffect(() => {
    dispatch(setTableData({ schemakey: "users", data: tabledata }));
  }, [dispatch, tabledata]);

  const columns = TableSchemas["users"].map((col) => ({
    field: col.key,
    header: col.label,
    sortable: col.sortable,
  }));
  return (
    <>
      {/* <div className="flex items-start justify-between border-b border-gray-200 dark:border-gray-800 pb-6">
        <div>
          <h1 className="text-5xl font-bold tracking-tight">
            Users & Organization
          </h1>
          <p className="mt-2 text-[20px] font-semibold  text-gray-500 dark:text-gray-400 max-w-2xl">
            Manage users, roles, teams, and access across your organization.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            type="button"
            className="px-4 py-2 cursor-pointer rounded-lg border bg-white dark:bg-gray-800 font-semibold hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <div className="flex items-center justify-between gap-3">
              <Upload />
              Import Users
            </div>
          </button>
          <button
            type="button"
            className=" cursor-pointer px-4 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700"
          >
            <div className="flex justify-between items-center gap-3">
              <UserPlus />
              Invite User
            </div>
          </button>
        </div>
      </div> */}

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
          />
        </div>
        <select className="px-4 py-3 rounded-lg border bg-white dark:bg-gray-800 dark:border-gray-700">
          <option value="All">All Status</option>
          <option value="Active">Active</option>
          <option value="Suspended">Suspended</option>
          <option value="Pending">Pending</option>
        </select>
      </div>
      <div className="mt-6 ">
        <DynamicTable tableData={paginatedData} tableHead={columns} />

        <div className="mt-6 flex items-center justify-between rounded-xl bg-gray-50 dark:bg-gray-800 px-6 py-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            Showing {first + 1} to {Math.min(first + rows, totalRecords)} of{" "}
            {totalRecords} users
          </div>

          <Paginator
            totalRecords={totalRecords}
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
