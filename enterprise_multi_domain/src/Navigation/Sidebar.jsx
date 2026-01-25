import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const items = [
    {
      icon: "dashboard",
      id: "dashboard",
      label: "Dashboard",
      route: "Dashboard",
    },
    {
      icon: "dashboard",
      id: "WorkFlow",
      label: "WorkFlow",
      route: "workflows",
    },
    {
      icon: "dashboard",
      id: "Task",
      label: "Tasks",
      route: "tasks",
    },
    {
      icon: "dashboard",
      id: "Approvals",
      label: "Approvals",
      route: "approvals",
    },
    {
      icon: "dashboard",
      id: "UsersOrg",
      label: "Users And Oraganization",
      route: "UsersAndOraganization/Users",
    },
    {
      icon: "dashboard",
      id: "Analytics",
      label: "Analytics",
      route: "Analytics",
    },
    {
      icon: "dashboard",
      id: "Integrations",
      label: "Integrations",
      route: "Integrations",
    },
    {
      icon: "dashboard",
      id: "Admin",
      label: "Admin and Government",
      route: "Admin",
    },
    { icon: "dashboard", id: "Support", label: "Support", route: "Support" },
  ];

  return (
    <div className="w-64 shrink-0 flex flex-col border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950">
      {/* Logo Section */}
      <div className="p-6 flex items-center gap-3">
        <div className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
          <span className="text-white"></span>
        </div>
        <h1 className="font-bold text-lg tracking-tight text-gray-900 dark:text-gray-100">
          Enterprise SaaS
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 mt-4 space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.route}
            to={item.route}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2 text-md whitespace-nowrap font-medium rounded-md transition-colors
                 ${
                   isActive
                     ? "bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-300"
                     : "text-slate-900 dark:text-slate-400 hover:bg-slate-300 dark:hover:bg-slate-900"
                 }`
            }
          >
            <span className="w-4 h-4 bg-gray-400 rounded dark:bg-gray-500"></span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* User Section */}
      <div className="p-4 flex items-center gap-3 border-t border-slate-200 dark:border-slate-800 mt-auto">
        <div className="w-10 h-10 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="text-sm">
          <div className="font-medium text-gray-900 dark:text-gray-100">
            Admin User
          </div>
          <div className="text-gray-500 dark:text-gray-400">
            admin@company.com
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
