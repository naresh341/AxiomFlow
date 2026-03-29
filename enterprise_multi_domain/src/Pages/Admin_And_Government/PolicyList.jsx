import { useDispatch } from "react-redux";
import DynamicTable from "../../Components/DynamicTable";
import Paginator from "../../Components/Paginator";
// import { delete_Policies } from "../../RTKThunk/AsyncThunk";
import { TableSchemas } from "../../Utils/TableSchemas";
import { delete_Policies } from "../../RTKThunk/GovernanceThunk";

const PolicyList = ({
  policies,
  error,
  loading,
  rows,
  first,
  onPageChange,
  onEdit,
}) => {
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(delete_Policies(id));
  };

  if (error)
    return (
      <div className="p-8 text-red-500 font-bold">
        Error loading policies: {error}
      </div>
    );
  return (
    <>
      <div className="overflow-hidden rounded-xl border border-slate-200 dark:border-[#3b4754] bg-white dark:bg-[#1c2127]">
        {loading ? (
          <>
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </>
        ) : (
          <DynamicTable
            tableData={policies}
            tableHead={TableSchemas.policies}
            rows={rows}
            first={first}
            onDelete={handleDelete}
            onEdit={onEdit}
          />
        )}
      </div>

      <div className="px-6 py-3 border-t border-slate-200 dark:border-[#2d3a4b] bg-slate-50 dark:bg-[#101922] shrink-0">
        {!loading && policies?.length > 0 && (
          <div className="px-6 py-3 border-t border-slate-200 dark:border-[#2d3a4b] bg-slate-50 dark:bg-[#101922]">
            <Paginator
              first={first}
              rows={rows}
              totalRecords={policies.length}
              onPageChange={onPageChange}
            />
          </div>
        )}

        {/* {isEditModalOpen && (
          <AssessmentModal
            isOpen={isEditModalOpen}
            onClose={() => {
              setIsEditModalOpen(false);
              setSelectedUser(null);
            }}
            editData={selectedUser}
            handleSubmit={(data) => {
              dispatch(update_Policies(data))
                .unwrap()
                .then(() => {
                  setIsEditModalOpen(false);
                  setSelectedUser(null);
                });
            }}
          />
        )} */}
      </div>
    </>
  );
};

export default PolicyList;
