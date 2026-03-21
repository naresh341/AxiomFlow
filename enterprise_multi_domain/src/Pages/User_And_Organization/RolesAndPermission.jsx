import { Edit3, Eye, ShieldCheck, UserPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { get_Roles, update_Roles } from "../../RTKThunk/AsyncThunk";
import { ROLE_POLICY } from "../../Utils/rbac";

const RolesAndPermissions = () => {
  const dispatch = useDispatch(); 

  const { roles } = useSelector((state) => state.roleOrg);
  const user = useSelector((state) => state.islogin.user);

  const orgId = user?.organization_id;

  const [activeRole, setActiveRole] = useState(null);
  const [activeRolePermissions, setActiveRolePermissions] = useState({});

  useEffect(() => {
    if (!orgId) return;
    dispatch(get_Roles(orgId));
  }, [orgId, dispatch]);

  useEffect(() => {
    if (roles?.length > 0 && !activeRole) {
      const firstRole = roles[0];
      setActiveRole(firstRole.name);
      setActiveRolePermissions(firstRole.permissions || {});
    }
  }, [roles]);

  const handleSelectRole = (role) => {
    setActiveRole(role.name);
    setActiveRolePermissions(role.permissions || {});
  };

  const handlePermissionChange = (moduleId, action) => {
    setActiveRolePermissions((prev) => {
      const modulePerms = prev?.[moduleId] || {};

      return {
        ...prev,
        [moduleId]: {
          ...modulePerms,
          [action]: !modulePerms[action],
        },
      };
    });
  };

  const handleSavePermissions = async () => {
    const role = roles.find((r) => r.name === activeRole);
    if (!role) return;

    const result = await dispatch(
      update_Roles({
        id: role.id,
        payload: {
          permissions: activeRolePermissions,
        },
      }),
    );

    // 🔥 IMPORTANT: refresh roles after update
    if (result?.meta?.requestStatus === "fulfilled") {
      dispatch(get_Roles(orgId));
    }
  };
  const isDisabled = (roleName, action) => {
    const policy = ROLE_POLICY?.[roleName];

    if (!policy) return false;

    if (policy.disableAll) return true;

    if (policy.restrictedActions?.[action]) return true;

    return false;
  };

  const roleIcons = {
    "Super Admin": <ShieldCheck size={18} />,
    Admin: <UserPlus size={18} />,
    Manager: <Edit3 size={18} />,
    Employee: <Eye size={18} />,
  };

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
              {roles && roles.length > 0 ? (
                roles.map((role) => (
                  <tr
                    key={role.id}
                    onClick={() => handleSelectRole(role)}
                    className={`cursor-pointer transition-colors ${
                      activeRole === role.name
                        ? "bg-blue-50/50 dark:bg-blue-900/10 border-l-4 border-l-blue-600"
                        : "hover:bg-gray-50/50 dark:hover:bg-gray-800/30"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-blue-600">
                          {roleIcons[role.name]}
                        </span>
                        <span className="font-semibold dark:text-white">
                          {role.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {role.desc || role.description}
                    </td>

                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400">
                        {role.users || 0} Users
                      </span>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleSelectRole(role)}
                        className="text-sm font-bold text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-4 font-bold text-lg text-center text-red-600 dark:text-gray-500"
                  >
                    No Data Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ================= PERMISSIONS MATRIX ================= */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2 mt-3">
          <h2 className="text-xl font-bold dark:text-white">
            Permissions: {activeRole} Role
          </h2>

          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-bold border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-white dark:hover:bg-slate-800 transition-colors dark:text-white">
              Discard Changes
            </button>

            <button
              onClick={handleSavePermissions}
              className="px-4 py-2 text-sm font-bold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
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

                  {["view", "create", "edit", "delete"].map((action) => (
                    <th
                      key={action}
                      className="px-6 py-4 text-sm font-bold text-center w-32 dark:text-white"
                    >
                      {action}
                    </th>
                  ))}
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
                          checked={!!activeRolePermissions?.[mod.id]?.[action]}
                          disabled={isDisabled(activeRole, action)}
                          onChange={() =>
                            handlePermissionChange(mod.id, action)
                          }
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

      {/* FOOTER (UNCHANGED) */}
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
