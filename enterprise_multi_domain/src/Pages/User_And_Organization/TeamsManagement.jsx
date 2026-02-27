import { Box, Megaphone, MoreVertical, Palette, Terminal } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_teams } from "../../RTKThunk/AsyncThunk";
import DynamicTable from "../../Components/DynamicTable";
import { TableSchemas } from "../../Utils/TableSchemas";
import Paginator from "../../Components/Paginator";

const TEAMS_DATA = [
  {
    id: 1,
    name: "Product Strategy",
    description: "Core roadmap development and prioritization.",
    members: ["p3", "p4"],
    extraMembers: 12,
    lead: { name: "Sarah Jenkins", avatar: "p5" },
    status: "Active",
    icon: <Box size={20} />,
    colorClass:
      "bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400",
  },
  {
    id: 2,
    name: "Brand & Design",
    description: "Visual identity, UI/UX, and marketing assets.",
    members: ["p6"],
    extraMembers: 4,
    lead: { name: "Marcus Aurelius", avatar: "p7" },
    status: "Active",
    icon: <Palette size={20} />,
    colorClass:
      "bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400",
  },
  {
    id: 3,
    name: "Backend Eng",
    description: "Infrastructure, API performance, and security.",
    members: ["p8", "p9"],
    extraMembers: 28,
    lead: { name: "Alex Chen", avatar: "p10" },
    status: "Active",
    icon: <Terminal size={20} />,
    colorClass:
      "bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400",
  },
  {
    id: 4,
    name: "Growth Ops",
    description: "Paid acquisition, SEO, and lead generation.",
    members: ["p11"],
    extraMembers: 8,
    lead: { name: "David Miller", avatar: "p12" },
    status: "Inactive",
    icon: <Megaphone size={20} />,
    colorClass:
      "bg-indigo-100 text-indigo-600 dark:bg-indigo-900/30 dark:text-indigo-400",
  },
];

const TeamsManagement = () => {
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.teams);
  const [first, setFirst] = useState(0);
  const rows = 10;

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
          {/* <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-800">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Team Name
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Description
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Members
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Lead / Manager
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {TEAMS_DATA.map((team) => (
                <tr
                  key={team.id}
                  className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`size-10 rounded flex items-center justify-center ${team.colorClass}`}
                      >
                        {team.icon}
                      </div>
                      <span className="font-semibold dark:text-white whitespace-nowrap">
                        {team.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 min-w-50">
                    {team.description}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex -space-x-2">
                      {team.members.map((m, idx) => (
                        <div
                          key={idx}
                          className="size-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-200 bg-cover bg-center"
                          style={{
                            backgroundImage: `url('https://api.dicebear.com/7.x/avataaars/svg?seed=${m}')`,
                          }}
                        />
                      ))}
                      <div className="size-8 rounded-full border-2 border-white dark:border-slate-900 bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold dark:text-slate-400">
                        +{team.extraMembers}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <img
                        src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${team.lead.avatar}`}
                        className="size-7 rounded-full bg-slate-100"
                        alt={team.lead.name}
                      />
                      <span className="text-sm font-medium dark:text-slate-200 whitespace-nowrap">
                        {team.lead.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        team.status === "Active"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                          : "bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300"
                      }`}
                    >
                      {team.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-3">
                      <button className="text-sm font-bold text-blue-600 hover:underline">
                        Edit
                      </button>
                      <button className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
                        <MoreVertical size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table> */}
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
    </main>
  );
};

export default TeamsManagement;
