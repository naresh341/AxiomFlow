import { useDispatch, useSelector } from "react-redux";
import Barchart from "../Components/Barchart ";
import DynamicTable from "../Components/DynamicTable";
import { setTableData } from "../Features/TableSlice";
import { TableSchemas } from "../Utils/TableSchemas";
import { useEffect, useState } from "react";
import Paginator from "../Components/Paginator";
import Linechart from "../Components/LineChart";
import { getApprovalList } from "../RTKThunk/WorkflowThunk";
// import { getApprovalList } from "../RTKThunk/AsyncThunk";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [first, setFirst] = useState(0); // starting index
  const rows = 5; // rows per page

  const { loading, data } = useSelector((state) => state.approval);

  const tabledata = data.data || [];

  useEffect(() => {
    dispatch(getApprovalList());
  }, [dispatch]);

  const handlePageChange = (event) => {
    setFirst(event + 1) * rows;
  };

  useEffect(() => {
    dispatch(setTableData({ schemakey: "dashboard", data: tabledata }));
  }, [dispatch, tabledata]);

  const DashboardData = [
    { label: "Total Users", value: 1500, icon: "up", data: "+5% this month" },
    {
      label: "Active Users",
      value: 1200,
      icon: "down",
      data: "-2% this month",
    },
    {
      label: "SLA Compliance",
      value: "98%",
      icon: "up",
      data: "+1% this month",
    },
    { label: "Critical Alerts", value: "23", icon: "-", data: "No Change" },
  ];

  const chartComponentMap = {
    bar: Barchart,
    line: Linechart,
  };
  const chartDataMap = {
    "Task Completion": [
      { name: "MON", value: 120 },
      { name: "TUE", value: 200 },
      { name: "WED", value: 150 },
      { name: "THR", value: 180 },
      { name: "FRI", value: 90 },
      { name: "SAT", value: 180 },
      { name: "SUN", value: 160 },
    ],
    "Performance Trends": [
      { name: "Jan", value: 400 },
      { name: "Feb", value: 300 },
      { name: "Mar", value: 500 },
      { name: "Apr", value: 450 },
    ],
  };
  const Charts = [
    {
      title: "Task Completion",
      options: ["Last 7 Days", "Last 30 Days", "Last 90 Days"],
      chartType: "bar",
    },
    {
      title: "Performance Trends",
      options: ["2026", "2025", "2024"],
      chartType: "line",
    },
  ];

  const systemMetrics = [
    { label: "API Runtime", value: 99.9 },
    { label: "DB Performance", value: 94.2 },
    { label: "Integration Status", value: 88 },
  ];

  const incidents = [
    { title: "Integration Delay", subtitle: "SalesForce Sync" },
    { title: "Slow Response", subtitle: "Reports API" },
  ];

  return (
    <div className="space-y-6 text-gray-900 dark:text-gray-100">
      <main className="mx-auto w-full px-4 lg:px-10 py-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-slate-900 dark:text-white">
              Executive Dashboard
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Real-time performance metrics across enterprise workflows.
            </p>
          </div>
          <label className="flex items-center gap-2 text-md font-semibold">
            Industry:
            <select className="border rounded-md px-2 py-1 bg-white dark:bg-slate-900 border-gray-300 dark:border-slate-700 outline-none">
              <option>All Industries</option>
              <option>Finance</option>
              <option>Healthcare</option>
              <option>Retail</option>
              <option>Technology</option>
            </select>
          </label>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DashboardData.map((item, index) => (
            <div
              key={index}
              className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-300 dark:border-slate-800 shadow-md"
            >
              <div className="flex justify-between items-start mb-4">
                <span className="text-lg font-semibold text-slate-600 dark:text-white uppercase">
                  {item.label}
                </span>
              </div>

              <div className="flex items-baseline gap-2">
                <h3 className="text-4xl font-bold">{item.value}</h3>
                <span
                  className={`text-md font-medium ${
                    item.icon === "up"
                      ? "text-emerald-500"
                      : item.icon === "down"
                        ? "text-rose-500"
                        : "text-slate-400 dark:text-slate-500"
                  }`}
                >
                  {item.data}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* CHARTS */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {Charts.map((chart, index) => {
            const ChartComponent = chartComponentMap[chart.chartType];
            const data = chartDataMap[chart.title];
            return (
              <div
                key={index}
                className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-300 dark:border-slate-800 shadow-md"
              >
                <div className="flex justify-between items-center mb-6">
                  <h4 className="font-bold text-lg uppercase">{chart.title}</h4>
                  <select className="text-md border border-gray-400 outline-0 bg-slate-50 dark:bg-slate-800 text-gray-900 dark:text-gray-100 rounded py-1 px-2">
                    {chart.options.map((opt) => (
                      <option key={opt}>{opt}</option>
                    ))}
                  </select>
                </div>

                <div className="h-52 w-full relative flex items-center justify-center text-slate-400 dark:text-slate-500 text-md">
                  {ChartComponent && data ? (
                    <ChartComponent data={data} />
                  ) : (
                    <div>Chart not Configured</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* TABLE + SYSTEM HEALTH */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white dark:bg-slate-900 rounded-xl border border-slate-300 dark:border-slate-800 shadow-md">
            <div className="p-6 border-b border-slate-200 dark:border-slate-800">
              <h4 className="font-bold text-lg uppercase  text-gray-900 dark:text-gray-100">
                Recent Approvals
              </h4>
            </div>
            <div className="p-4 text-slate-500 dark:text-slate-400 ">
              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                </div>
              ) : (
                <DynamicTable
                  tableData={tabledata}
                  tableHead={TableSchemas.approval}
                  first={first}
                  rows={rows}
                />
              )}
            </div>

            <Paginator
              totalRecords={tabledata.length}
              rows={rows}
              first={first}
              onPageChange={handlePageChange}
            />
          </div>

          {/* SYSTEM HEALTH */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-xl border border-slate-300 dark:border-slate-800 shadow-md">
            <h4 className="font-bold mb-6 text-lg uppercase">System Health</h4>

            {systemMetrics.map((metric, index) => (
              <div key={index} className="mb-4">
                <div className="flex justify-between text-md font-semibold mb-1">
                  <span className="text-slate-600 dark:text-slate-400">
                    {metric.label}
                  </span>
                  <span>{metric.value}%</span>
                </div>
                <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded">
                  <div
                    className={`h-2 rounded ${
                      metric.value > 90 ? "bg-emerald-500" : "bg-amber-500"
                    }`}
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
              </div>
            ))}

            <div className="mt-6">
              <h5 className="text-lg  font-bold uppercase text-slate-600 dark:text-slate-400 mb-3">
                Active Incidents
              </h5>

              {incidents.map((incident, index) => (
                <div key={index} className="flex gap-3 mb-4">
                  <div className="w-8 h-8 rounded bg-rose-100 dark:bg-rose-700 flex items-center justify-center text-rose-700 dark:text-rose-100">
                    ⚠️
                  </div>
                  <div>
                    <p className="text-lg  font-semibold">{incident.title}</p>
                    <p className="text-md text-slate-600 font-semibold dark:text-slate-400">
                      {incident.subtitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
