import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DynamicTable from "../../Components/DynamicTable";
import Paginator from "../../Components/Paginator";
import { get_UserOrg } from "../../RTKThunk/AsyncThunk";
import { TableSchemas } from "../../Utils/TableSchemas";

const Users = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.UserOrg);
  const [first, setFirst] = useState(0);
  const rows = 10;

  useEffect(() => {
    dispatch(get_UserOrg());
  }, [dispatch]);

  const handleCustomPageChange = (page) => {
    setFirst(page * rows);
  };

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
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <DynamicTable tableData={data} tableHead={TableSchemas.users} />
        )}

        <div className="mt-6 flex items-center justify-between rounded-xl bg-gray-50 dark:bg-gray-800 px-6 py-4">
          <Paginator
            totalRecords={data.length}
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
