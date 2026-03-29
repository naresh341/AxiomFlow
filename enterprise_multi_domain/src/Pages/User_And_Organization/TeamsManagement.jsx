import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CreateTeam from "../../Components/CreateTeam";
import DynamicTable from "../../Components/DynamicTable";
import Paginator from "../../Components/Paginator";
// import { delete_Teams, get_teams } from "../../RTKThunk/AsyncThunk";
import { TableSchemas } from "../../Utils/TableSchemas";
import {
  delete_Teams,
  get_teams,
} from "../../RTKThunk/RoleAndOrganizationThunk";

const TeamsManagement = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.teams);
  const [first, setFirst] = useState(0);
  const rows = 10;

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleDelete = (id) => {
    dispatch(delete_Teams(id));
  };

  const handleEditClick = (user) => {
    setSelectedUser(user);
    setIsEditModalOpen(true);
  };

  useEffect(() => {
    dispatch(get_teams());
  }, [dispatch]);

  const handleCustomPageChange = (page) => {
    setFirst(page * rows);
  };
  return (
    <main className="flex-1 overflow-y-auto bg-slate-50 dark:bg-slate-950">
      {/* Teams Table */}
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          ) : (
            <DynamicTable
              tableHead={TableSchemas.team}
              tableData={data}
              first={first}
              rows={rows}
              onDelete={handleDelete}
              onEdit={handleEditClick}
            />
          )}
        </div>
        <div className="px-6 py-4 border-t border-slate-100 dark:border-gray-800  dark:bg-gray-900 flex items-center justify-center bg-slate-50/30">
          <div className="p-4 border-t border-gray-200 dark:border-gray-800 dark:bg-gray-900">
            <Paginator
              first={first}
              rows={rows}
              totalRecords={data.length}
              onPageChange={handleCustomPageChange}
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 py-8 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row justify-between items-center text-xs text-slate-500 gap-4">
        <p>© 2024 Enterprise SaaS Inc. All rights reserved.</p>
        <div className="flex gap-6">
          <a
            className="hover:underline hover:text-blue-600 transition-colors"
            href="#privacy"
          >
            Privacy Policy
          </a>
          <a
            className="hover:underline hover:text-blue-600 transition-colors"
            href="#terms"
          >
            Terms of Service
          </a>
          <a
            className="hover:underline hover:text-blue-600 transition-colors"
            href="#status"
          >
            System Status
          </a>
        </div>
      </footer>

      {isEditModalOpen && (
        <CreateTeam
          isOpen={isEditModalOpen}
          onClose={() => {
            setIsEditModalOpen(false);
            setSelectedUser(null);
          }}
          editData={selectedUser}
        />
      )}
    </main>
  );
};

export default TeamsManagement;
