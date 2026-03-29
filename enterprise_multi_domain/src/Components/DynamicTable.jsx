import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { resolveData } from "../Utils/TableSchemas";
import { Archive, CheckCircle, Copy, Edit2, Eye, XCircle } from "lucide-react";
import PriorityBadge from "./MiniComponent/PriorityBadge";

const DynamicTable = ({
  tableData = [],
  tableHead = [],
  handleRowClick,
  first,
  onDelete,
  onEdit,
}) => {
  const statuStyle = (status) => {
    const s = status?.toLowerCase();
    switch (s) {
      case "active":
        return "bg-green-100 text-green-700 border-green-200";
      case "draft":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "archived":
        return "bg-yellow-100 text-yellow-700 border-gray-200";
      case "pending":
        return "bg-yellow-100 text-yellow-700 border-gray-200";
      case "approved":
        return "bg-green-100 text-green-700 border-green-200";
      case "escalated":
        return "bg-blue-100 text-blue-700 border-blue-200";
      case "rejected":
        return "bg-red-100 text-red-700 border-red-200";
      default:
        return "bg-gray-50 text-gray-500";
    }
  };

  const renderCell = (rowData, col, opt) => {
    const value = resolveData(rowData, col.field);

    if (col.field == "status") {
      return (
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold border ${statuStyle(value)}`}
        >
          {value || "Unknown"}
        </span>
      );
    }
    if (col.field == "file") {
      return (
        <button
          onClick={() => window.open(rowData.file, "_blank")}
          className="text-[#135bec] font-bold text-xs hover:underline"
        >
          Download
        </button>
      );
    }
    if (col.field == "priority" || col.field == "risk_score") {
      return <PriorityBadge value={value} />;
    }

    if (col.field == "srno") {
      return <span>{first + opt.rowIndex + 1}</span>;
    }

    if (col.type === "date") {
      if (!value) return "N/A";
      return new Date(value).toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    }

    if (col.type == "boolean") {
      return value ? "Yes" : "No";
    }

    if (col.field == "action") {
      return (
        <>
          <div className="flex justify-center  gap-1  ">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                handleRowClick({ data: rowData });
              }}
              className="p-2 rounded-lg cursor-pointer  dark:hover:bg-white/10 text-[#616f89] dark:text-gray-400 hover:text-blue-600 transition-colors shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            >
              <Eye size={16} />
            </button>
            <button
              type="button"
              onClick={() => onEdit(rowData)}
              className="p-2 rounded-lg hover:bg-white dark:hover:bg-white/10 text-[#616f89] dark:text-gray-400 hover:text-blue-600 transition-colors shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            >
              <Edit2 size={16} />
            </button>
            <button className="p-2 rounded-lg hover:bg-white dark:hover:bg-white/10 text-[#616f89] dark:text-gray-400 hover:text-blue-600 transition-colors shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700">
              <Copy size={16} />
            </button>
            <button
              type="button"
              onClick={() => onDelete(rowData.id)}
              className="p-2 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-[#616f89] dark:text-gray-400 hover:text-red-500 transition-colors shadow-sm border border-transparent hover:border-red-100 dark:hover:border-red-900"
            >
              <Archive size={16} />
            </button>
          </div>
        </>
      );
    }
    if (col.field == "approval") {
      return (
        <>
          <div className="flex justify-center  gap-1  ">
            <button
              onClick={() => handleApprove(rowData.id)}
              title="Approve"
              className="p-2 rounded-lg cursor-pointer  dark:hover:bg-white/10 text-green-600 dark:text-green-600 hover:bg-green-100 transition-colors shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            >
              <CheckCircle size={18} />
            </button>
            <button
              onClick={() => handleReject(rowData.id)}
              className="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-white/10 text-red-600  dark:text-red-600 hover:text-red-600 transition-colors shadow-sm border border-transparent hover:border-slate-200 dark:hover:border-slate-700"
            >
              <XCircle size={18} />
            </button>
          </div>
        </>
      );
    }

    return value || "N/A";
  };
  return (
    <div className="mx-auto w-full  ">
      {/* 1. Outside Border Container */}
      <div className="overflow-hidden rounded-xl  shadow-sm dark:border-gray-700">
        <DataTable
          value={Array.isArray(tableData) ? tableData : []}
          onRowClick={handleRowClick}
          emptyMessage={
            <div className="flex whitespace-nowrap items-center justify-center py-10 text-2xl font-bold text-red-600">
              No Data Found
            </div>
          }
          responsiveLayout="scroll"
          className="w-full font-medium text-gray-950 cursor-pointer whitespace-nowrap "
          tableStyle={{ minWidth: "100%" }}
        >
          {tableHead.map((col) => (
            <Column
              key={col.field}
              field={col.field}
              header={col.header}
              body={(rowData, opt) => renderCell(rowData, col, opt)}
              sortable={col.field !== "srno" && col.field !== "action"}
              alignHeader="center"
              align="center"
              headerClassName=" uppercase whitespace-nowrap border-b border-gray-300  dark:bg-gray-800 text-[15px] text-gray-700 dark:text-gray-200 font-bold p-4  dark:border-gray-600 "
              bodyClassName="p-4  whitespace-nowrap dark:border-gray-700 last:border-r-0 text-gray-600 dark:text-gray-400"
            />
          ))}
        </DataTable>
      </div>
    </div>
  );
};

export default DynamicTable;
