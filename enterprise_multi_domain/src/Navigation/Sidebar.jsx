import {
  BarChart3,
  CheckSquare,
  ChevronsUpDown,
  ClipboardCheck,
  GitBranch,
  HelpCircle,
  LayoutDashboard,
  PanelLeftClose,
  PanelRightClose,
  Share2,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const sections = [
    {
      title: "Main Menu",
      items: [
        { icon: LayoutDashboard, label: "Dashboard", route: "Dashboard" },
        { icon: GitBranch, label: "WorkFlow", route: "workflows" },
        { icon: ClipboardCheck, label: "Tasks", route: "tasks" },
        { icon: CheckSquare, label: "Approvals", route: "approvals" },
      ],
    },
    {
      title: "Organization",
      items: [
        {
          icon: Users,
          label: "Users & Org",
          route: "UsersAndOraganization/Users",
        },
        { icon: BarChart3, label: "Analytics", route: "Analytics" },
        { icon: Share2, label: "Integrations", route: "Integrations" },
      ],
    },
    {
      title: "System",
      items: [
        { icon: ShieldCheck, label: "Governance", route: "Admin" },
        { icon: HelpCircle, label: "Support", route: "Support" },
      ],
    },
  ];

  return (
    <aside
      className={`${
        isCollapsed ? "w-20" : "w-72"
      } flex flex-col bg-white dark:bg-[#101922] border-r border-[#dbe0e6] dark:border-[#2d3945] h-full shrink-0 font-display transition-all duration-300 ease-in-out`}
    >
      {/* Header Section */}
      <div
        className={`h-16 flex items-center ${
          isCollapsed ? "justify-center" : "justify-between px-6"
        } border-b border-[#f0f2f4] dark:border-[#2d3945]`}
      >
        <div className="flex items-center gap-3">
          <div className="size-9 bg-[#137fec] rounded-lg flex items-center justify-center text-white shadow-md shrink-0">
            <GitBranch size={20} strokeWidth={2.5} />
          </div>
          {!isCollapsed && (
            <div className="flex flex-col overflow-hidden whitespace-nowrap">
              <h1 className="text-sm font-bold leading-none text-[#111418] dark:text-white">
                Enterprise
              </h1>
              <p className="text-[10px] text-[#617589] dark:text-slate-400 uppercase tracking-wider mt-1 font-bold">
                Workflow SaaS
              </p>
            </div>
          )}
        </div>
        {!isCollapsed && (
          <button
            onClick={() => setIsCollapsed(true)}
            className="text-[#617589] hover:text-[#137fec] dark:hover:text-white transition-colors p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-[#1a242f]"
          >
            <PanelLeftClose size={18} />
          </button>
        )}
      </div>

      {isCollapsed && (
        <div className="flex justify-center py-4 border-b border-[#f0f2f4] dark:border-[#2d3945]">
          <button
            onClick={() => setIsCollapsed(false)}
            className="text-[#617589] hover:text-[#137fec] dark:hover:text-white transition-colors p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-[#1a242f]"
          >
            <PanelRightClose size={18} />
          </button>
        </div>
      )}

      {/* Navigation Content */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-4 custom-scrollbar">
        {sections.map((section, idx) => (
          <div key={section.title}>
            {!isCollapsed ? (
              <p className="px-3 mb-2 text-[11px] font-bold text-[#617589] dark:text-slate-500 uppercase tracking-widest">
                {section.title}
              </p>
            ) : (
              idx !== 0 && (
                <div className="h-px bg-[#f0f2f4] dark:bg-[#2d3945] mx-2 mb-4" />
              )
            )}
            <div className="space-y-1">
              {section.items.map((item) => (
                <NavLink
                  key={item.route}
                  to={item.route}
                  title={isCollapsed ? item.label : ""}
                  className={({ isActive }) =>
                    `group flex items-center rounded-lg transition-all relative 
                     ${isCollapsed ? "justify-center size-10 mx-auto" : "gap-3 px-3 py-2.5"}
                     ${
                       isActive
                         ? "bg-[#137fec]/10 text-[#137fec] dark:bg-[#137fec]/20"
                         : "text-slate-600 dark:text-slate-400 hover:bg-[#f0f2f4] dark:hover:bg-[#1a242f] hover:text-[#137fec] dark:hover:text-white"
                     }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Active Indicator Strip */}
                      {isActive && (
                        <div className="absolute left-0 bg-[#137fec] rounded-r-full transition-all top-2 bottom-2 w-1" />
                      )}

                      <item.icon
                        size={18}
                        className={`transition-colors shrink-0 ${
                          isActive
                            ? "text-[#137fec]"
                            : "group-hover:text-[#137fec]"
                        }`}
                        strokeWidth={isActive ? 2.5 : 2}
                      />

                      {!isCollapsed && (
                        <p
                          className={`text-md whitespace-nowrap overflow-hidden ${
                            isActive ? "font-bold" : "font-medium"
                          }`}
                        >
                          {item.label}
                        </p>
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      {/* Footer Section */}
      <div className="mt-auto border-t border-[#f0f2f4] dark:border-[#2d3945] bg-[#fafbfc] dark:bg-[#0d141c] p-2 flex flex-col items-center gap-4 py-6">
        {/* Workspace Switcher */}
        <div
          className={`flex items-center bg-white dark:bg-[#1a242f] border border-[#dbe0e6] dark:border-[#2d3945] rounded-lg cursor-pointer shadow-sm hover:border-[#137fec] dark:hover:border-[#137fec] transition-all group
          ${isCollapsed ? "size-10 justify-center" : "w-full px-3 py-2 justify-between"}`}
        >
          <div className="flex items-center gap-2 overflow-hidden">
            <div className="size-6 rounded bg-[#137fec]/20 flex items-center justify-center shrink-0">
              <span className="text-[10px] font-bold text-[#137fec]">AC</span>
            </div>
            {!isCollapsed && (
              <p className="text-sm font-semibold truncate text-[#111418] dark:text-slate-200">
                Acme Corp HQ
              </p>
            )}
          </div>
          {!isCollapsed && (
            <ChevronsUpDown
              size={14}
              className="text-[#617589] dark:text-slate-500 group-hover:text-[#137fec]"
            />
          )}
        </div>

        {/* System Status */}
        <div
          className={`flex items-center ${
            isCollapsed ? "justify-center" : "justify-between w-full px-2"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </div>
            {!isCollapsed && (
              <p className="text-[11px] font-bold text-[#617589] dark:text-slate-500 uppercase tracking-tighter">
                Healthy
              </p>
            )}
          </div>
          {!isCollapsed && (
            <p className="text-[10px] text-[#617589] dark:text-slate-600 font-mono opacity-60">
              v2.4
            </p>
          )}
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
