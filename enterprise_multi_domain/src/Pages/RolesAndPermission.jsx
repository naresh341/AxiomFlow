import { Edit3, Eye, Plus, ShieldCheck, UserPlus } from "lucide-react";
import { useState } from "react";

const RolesAndPermissions = () => {
  const [activeRole, setActiveRole] = useState("Admin");

  const roles = [
    {
      name: "Super Admin",
      icon: <ShieldCheck size={18} />,
      desc: "Full access to all system features including billing and security.",
      users: 8,
    },
    {
      name: "Admin",
      icon: <UserPlus size={18} />,
      desc: "Manage users, organization settings, and view all reports.",
      users: 12,
    },
    {
      name: "Editor",
      icon: <Edit3 size={18} />,
      desc: "Can create, edit, and delete content within projects.",
      users: 45,
    },
    {
      name: "Viewer",
      icon: <Eye size={18} />,
      desc: "Read-only access to dashboards and basic reports.",
      users: 102,
    },
  ];

  const modules = [
    { id: "dash", name: "Dashboard", perms: ["view", "edit"] },
    {
      id: "user",
      name: "Users Management",
      perms: ["view", "create", "edit", "delete"],
    },
    { id: "repo", name: "Reports & Analytics", perms: ["view", "create"] },
    { id: "bill", name: "Billing & Subscriptions", perms: ["view"] },
    {
      id: "proj",
      name: "Project Configuration",
      perms: ["view", "create", "edit", "delete"],
    },
  ];

  return (
    <>
      <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 dark:bg-slate-800/50">
              <tr>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                  Role Name
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                  Description
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500">
                  Users
                </th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-gray-500 text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
              {roles.map((role) => (
                <tr
                  key={role.name}
                  onClick={() => setActiveRole(role.name)}
                  className={`cursor-pointer transition-colors ${
                    activeRole === role.name
                      ? "bg-blue-50/50 dark:bg-blue-900/10 border-l-4 border-l-blue-600"
                      : "hover:bg-gray-50/50 dark:hover:bg-gray-800/30"
                  }`}
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="text-blue-600">{role.icon}</span>
                      <span className="font-semibold dark:text-white">
                        {role.name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {role.desc}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                      {role.users} Users
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-sm font-bold text-blue-600 hover:underline">
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Permissions Matrix */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2 mt-3">
          <h2 className="text-xl font-bold dark:text-white">
            Permissions: {activeRole} Role
          </h2>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-bold border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors dark:text-white">
              Discard Changes
            </button>
            <button className="px-4 py-2 text-sm font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
              Save Changes
            </button>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-gray-50 dark:bg-slate-800/50 border-b border-gray-200 dark:border-gray-700">
                <tr>
                  <th className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">
                    Module
                  </th>
                  <th className="px-6 py-4 text-sm font-bold text-center w-32 dark:text-white">
                    View
                  </th>
                  <th className="px-6 py-4 text-sm font-bold text-center w-32 dark:text-white">
                    Create
                  </th>
                  <th className="px-6 py-4 text-sm font-bold text-center w-32 dark:text-white">
                    Edit
                  </th>
                  <th className="px-6 py-4 text-sm font-bold text-center w-32 dark:text-white">
                    Delete
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                {modules.map((mod) => (
                  <tr
                    key={mod.id}
                    className="hover:bg-gray-50/50 dark:hover:bg-gray-800/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium dark:text-gray-200">
                      {mod.name}
                    </td>
                    {["view", "create", "edit", "delete"].map((action) => (
                      <td key={action} className="px-6 py-4 text-center">
                        <input
                          type="checkbox"
                          defaultChecked={mod.perms.includes(action)}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500 h-5 w-5 cursor-pointer dark:bg-slate-800 dark:border-gray-600"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-12 py-8 border-t border-gray-200 dark:border-gray-700 flex flex-wrap justify-between items-center text-xs text-gray-500 gap-4">
        <p>© 2024 Enterprise SaaS Inc. All rights reserved.</p>
        <div className="flex gap-4">
          <a className="hover:underline" href="#privacy">
            Privacy Policy
          </a>
          <a className="hover:underline" href="#terms">
            Terms of Service
          </a>
          <a className="hover:underline" href="#status">
            System Status
          </a>
        </div>
      </footer>
    </>
  );
};

export default RolesAndPermissions;
