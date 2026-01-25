import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";

const DynamicTable = ({ tableData = [], tableHead = [] }) => {
  if (!tableHead.length) {
    return (
      <div className="p-10 text-center text-gray-500 italic">
        Table Configuration missing...
      </div>
    );
  }

  return (
    <div className="mx-auto w-full  ">
      {/* 1. Outside Border Container */}
      <div className="overflow-hidden rounded-xl border border-gray-300 shadow-sm dark:border-gray-700">
        <DataTable
          value={tableData}
          emptyMessage={
            <div className="flex items-center justify-center py-10 text-2xl font-bold text-red-600">
              No Data Found
            </div>
          }
          stripedRows
          showGridlines
          responsiveLayout="scroll"
          className="w-full"
          tableStyle={{ minWidth: "100%" }}
        >
          {tableHead.map((col) => (
            <Column
              key={col.field}
              field={col.field}
              header={col.header}
              sortable
              alignHeader="center"
              align="center"
              headerClassName="bg-gray-200 uppercase  dark:bg-gray-800 text-[15px] text-gray-700 dark:text-gray-200 font-bold p-4 border-b border-r border-gray-300 dark:border-gray-600 last:border-r-0"
              bodyClassName="p-4 border-r border-gray-200 dark:border-gray-700 last:border-r-0 text-gray-600 dark:text-gray-400"
            />
          ))}
        </DataTable>
      </div>
    </div>
  );
};

export default DynamicTable;
