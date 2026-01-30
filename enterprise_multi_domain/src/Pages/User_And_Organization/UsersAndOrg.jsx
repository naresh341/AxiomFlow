import { Shield, Upload, UserPlus, Users } from "lucide-react";
import { useState } from "react";
import { NavLink, Outlet, useLocation } from "react-router-dom";
import InviteUser from "../../Components/InviteUser";
import ImportUser from "../../Components/ImportUser";
import CreateRole from "../../Components/CreateRole";
import CreateTeam from "../../Components/CreateTeam";

const UsersAndOrg = () => {
  const location = useLocation();

  // 1. STATE MANAGEMENT FOR MODAL
  const [activeModal, setActiveModal] = useState(null);

  const tabConfig = {
    "/UsersAndOraganization/users": {
      title: "Users & Organization",
      subtitle:
        "Manage users, roles, teams, and access across your organization.",
      buttons: [
        { label: "Import Users", icon: <Upload size={18} />, primary: false },
        { label: "Invite User", icon: <UserPlus size={18} />, primary: true },
      ],
    },
    "/UsersAndOraganization/roles-permissions": {
      title: "Roles & Permissions",
      subtitle:
        "Define and manage granular access levels for your organization members.",
      buttons: [
        { label: "Add Role", icon: <Shield size={18} />, primary: true },
      ],
    },
    "/UsersAndOraganization/teams": {
      title: "Teams Management",
      subtitle:
        "Organize your workforce into departments and functional groups.",
      buttons: [
        { label: "Create Team", icon: <Users size={18} />, primary: true },
      ],
    },
    "/UsersAndOraganization/organization-settings": {
      title: " Organization Settings",
      subtitle:
        "Manage your organization's general information, localization, and security preferences",
      buttons: [],
    },
  };

  const currentPath = location.pathname;
  const current =
    tabConfig[currentPath] || tabConfig["/UsersAndOraganization/users"];

  const tabs = [
    { name: "Users", path: "users" },
    { name: "Roles & Permissions", path: "roles-permissions" },
    { name: "Teams", path: "teams" },
    { name: "Organization Settings", path: "organization-settings" },
  ];

  return (
    <div className="min-h-screen bg-[#f6f7f8] dark:bg-[#0f172a] text-gray-900 dark:text-white relative">
      <div className="mx-auto px-6 py-8">
        {/* HEADER */}
        <div className="flex items-start justify-between pb-6 animate-in fade-in slide-in-from-top-2 duration-300">
          <div>
            <h1 className="text-4xl font-black tracking-tight text-gray-900 dark:text-white">
              {current.title}
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              {current.subtitle}
            </p>
          </div>

          {/* BUTTONS MAPPED TO STATE */}
          {current.buttons && current.buttons.length > 0 && (
            <div className="flex gap-3">
              {current.buttons.map((btn, i) => (
                <button
                  key={i}
                  onClick={() => setActiveModal(btn.label)}
                  className={`px-4 py-2 rounded-lg font-semibold flex items-center gap-2 transition ${
                    btn.primary
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20"
                      : "border bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-200 dark:border-gray-700"
                  }`}
                >
                  {btn.icon} {btn.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* NAVIGATION */}
        <div className="flex gap-8 border-b border-gray-200 dark:border-gray-800 mt-4">
          {tabs.map((tab) => (
            <NavLink
              key={tab.path}
              to={tab.path}
              className={({ isActive }) =>
                `pb-4 text-lg font-semibold border-b-2 transition ${
                  isActive
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-blue-600"
                }`
              }
            >
              {tab.name}
            </NavLink>
          ))}
        </div>

        <div className="mt-6">
          <Outlet />
        </div>
      </div>

      {/* Invite User Modal */}
      <InviteUser
        isOpen={activeModal === "Invite User"}
        onClose={() => setActiveModal(null)}
      />
      <ImportUser
        isOpen={activeModal === "Import Users"}
        onClose={() => setActiveModal(null)}
      />
      <CreateRole
        isOpen={activeModal === "Add Role"}
        onClose={() => setActiveModal(null)}
      />
      <CreateTeam
        isOpen={activeModal === "Create Team"}
        onClose={() => setActiveModal(null)}
      />
    </div>
  );
};

export default UsersAndOrg;
