import {
  ChevronDown,
  ChevronRight,
  History,
  Plus,
  RotateCcw,
  Search,
  ShieldCheck,
  Workflow,
  X,
} from "lucide-react";
import { Menu } from "primereact/menu";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import CreateVersionModal from "../../Components/CreateVersionModal";
import DynamicTable from "../../Components/DynamicTable";
import FilterButton from "../../Components/MiniComponent/FilterButton";
import { useNotify } from "../../Components/MiniComponent/useNotify";
import Paginator from "../../Components/Paginator";
import {
  add_Version,
  delete_Version,
  get_Workflow_Versions,
  update_Version,
} from "../../RTKThunk/WorkflowThunk";
import { TableSchemas } from "../../Utils/TableSchemas";

const WorkflowVersions = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const { workflowId } = useParams();
  const [page, setPage] = useState(1);
  const rows = 10;
  const dispatch = useDispatch();
  const menuStatus = useRef(null);
  const notify = useNotify();
  const [filters, setFilters] = useState({
    status: "All",
  });
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedVersion, setSelectedVersion] = useState(null);
  const { loading, currentWorkflowVersions, total } = useSelector(
    (state) => state.workflows,
  );
  const versionData = currentWorkflowVersions || [];
  
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, filters.status]);

  useEffect(() => {
    try {
      dispatch(
        get_Workflow_Versions({
          workflowId,
          page,
          limit: rows,
          search: debouncedSearch,
          status: filters.status,
        }),
      );
    } catch (error) {
      notify.error(error?.message || " Something Went Wrong");
    }
  }, [workflowId, dispatch, notify, page, debouncedSearch, filters.status]);

  const onPageChange = (selectedPage) => {
    setPage(selectedPage + 1);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 400); // delay

    return () => clearTimeout(timer);
  }, [search]);

  const handleRowClick = (event) => {
    const rowData = event.data;

    const id = rowData?.id;

    if (!id) {
      console.error("No ID found in row data:", rowData);
      return;
    }

    // Navigate using the ID from the data property
    navigate(`/workflows/${workflowId}/version/${id}`);
  };

  const handleCreateVersion = async (workflowId, payload) => {
    try {
      await dispatch(add_Version({ workflowId, payload })).unwrap();
      await dispatch(
        get_Workflow_Versions({ workflowId, page, limit: rows }),
      ).unwrap();
      notify.success("Successful");
    } catch (error) {
      console.error("Error creating task:", error);
      notify.error(error?.message || " Something Went Wrong");
    }
  };

  const handleEdit = (risk) => {
    setSelectedVersion(risk);
    setIsModalOpen(true);
  };

  const handleDeleteVersion = async (id) => {
    try {
      await dispatch(delete_Version({ id })).unwrap();

      await dispatch(
        get_Workflow_Versions({ workflowId, page, limit: rows }),
      ).unwrap();
      notify.success("Successful");
    } catch (error) {
      console.error("Delete failed:", error);
      notify.error(error?.message || " Something Went Wrong");
    }
  };

  const handleUpdateVersion = async (id, payload) => {
    try {
      await dispatch(update_Version({ id, payload })).unwrap();

      await dispatch(
        get_Workflow_Versions({ workflowId, page, limit: rows }),
      ).unwrap();
      notify.success("Successful");
    } catch (error) {
      console.error("Update failed:", error);
      notify.error(error?.message || " Something Went Wrong");
    }
  };

  const statusItems = [
    {
      label: "All",
      className: filters.status === "All" ? "font-bold text-blue-600" : "",
      command: () => setFilters((prev) => ({ ...prev, status: "All" })),
    },
    {
      label: "Active",
      command: () => setFilters((prev) => ({ ...prev, status: "ACTIVE" })),
    },
    {
      label: "Draft",
      command: () => setFilters((prev) => ({ ...prev, status: "DRAFT" })),
    },
    {
      label: "Archived",
      command: () => setFilters((prev) => ({ ...prev, status: "ARCHIVED" })),
    },
  ];

  return (
    <div className="bg-[#f6f6f8] dark:bg-[#101622] text-slate-900 dark:text-slate-100 min-h-screen font-display">
      <main className="mx-auto px-10 py-8">
        {/* Page Heading */}
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <nav className="flex items-center gap-2 mb-6 text-sm font-medium text-slate-500">
              <NavLink
                to="/workflows"
                className="hover:text-blue-600 transition-colors"
              >
                Workflows
              </NavLink>
              <ChevronRight size={14} />
              <NavLink
                to={`/workflows/${workflowId}`}
                className="text-slate-900 dark:text-white hover:text-blue-600 transition-colors"
              >
                {workflowId}
              </NavLink>
              <ChevronRight size={14} />
              <span className="text-slate-900 dark:text-slate-300">
                Versions
              </span>
            </nav>
            <h1 className="text-4xl font-black leading-tight tracking-tight">
              Workflow Versions
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-base max-w-2xl leading-relaxed">
              Track and manage changes, deployments, and lifecycle states for
              your automation workflows. Roll back to previous versions or
              create new drafts for testing.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="flex items-center justify-center rounded-lg h-10 px-4 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-sm font-bold hover:bg-slate-50 transition-colors">
              <History size={18} className="mr-2" /> Audit Logs
            </button>
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="pointer-cursor flex items-center justify-center rounded-lg h-10 px-5 bg-[#0f49bd] text-white text-sm font-bold hover:bg-[#0f49bd]/90 transition-all shadow-sm"
            >
              <Plus size={18} className="mr-2" /> Create New Version
            </button>
          </div>
        </div>

        {/* Tabs Component */}
        <div className="flex gap-3 py-3 justify-between flex-wrap items-center ">
          <div className=" relative h-12 w-full ">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              size={18}
            />
            <input
              className="w-full h-full pl-10 pr-4 rounded-lg border border-gray-300 dark:border-slate-700 bg-white dark:bg-[#1f2937] text-sm focus:ring-2 focus:ring-[#0f49bd] outline-none shadow-md "
              type="text"
              placeholder="Search by Version ID"
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
          <div className="flex items-center gap-2">
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

            {/* The Calendar Component */}
            {filters.status !== "All" && (
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

        {/* Table Component */}
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex justify-center items-center h-48">
                <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#137fec]"></div>
              </div>
            ) : (
              <DynamicTable
                tableData={versionData}
                tableHead={TableSchemas.versions}
                rows={rows}
                first={(page - 1) * rows}
                handleRowClick={handleRowClick}
                onEdit={handleEdit}
                onDelete={handleDeleteVersion}
              />
            )}
          </div>
          {/* Pagination */}
          <div className="flex items-center justify-center px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50">
            <Paginator
              first={(page - 1) * rows}
              rows={rows}
              totalRecords={total}
              onPageChange={onPageChange}
            />
          </div>
        </div>

        {/* Footer Info Cards */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          <InfoCard
            icon={<ShieldCheck size={18} />}
            title="Version Immutability"
            desc="Active versions are read-only. To make changes, clone the version into a new draft."
            primary
          />
          <InfoCard
            icon={<RotateCcw size={18} />}
            title="Auto-Archiving"
            desc="Versions older than 6 months without activity are automatically archived."
          />
          <InfoCard
            icon={<Workflow size={18} />}
            title="Collaborative Drafting"
            desc="Multiple users can edit a draft. Review audit logs to track field changes."
          />
        </div>
      </main>
      <CreateVersionModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setSelectedVersion(null);
        }}
        workflowId={workflowId}
        editData={selectedVersion}
        onCreate={handleCreateVersion}
        onUpdate={handleUpdateVersion}
      />
    </div>
  );
};

const InfoCard = ({ icon, title, desc, primary }) => (
  <div
    className={`p-5 rounded-xl border ${primary ? "bg-[#0f49bd]/5 border-[#0f49bd]/10" : "bg-white dark:bg-slate-800/50 border-slate-200 dark:border-slate-700"}`}
  >
    <div
      className={`flex items-center gap-3 mb-3 ${primary ? "text-[#0f49bd]" : "text-slate-700 dark:text-slate-300"}`}
    >
      {icon} <h3 className="font-bold text-sm">{title}</h3>
    </div>
    <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
      {desc}
    </p>
  </div>
);

export default WorkflowVersions;
