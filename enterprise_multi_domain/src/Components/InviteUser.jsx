import {
  ChevronDown,
  Eye,
  EyeOff,
  Lock,
  Mail,
  Send,
  Shield,
  User,
  Users,
  X,
} from "lucide-react";
import { MultiSelect } from "primereact/multiselect";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  get_teams,
  update_User,
} from "../RTKThunk/RoleAndOrganizationThunk";
import { useNotify } from "./MiniComponent/useNotify";

const InviteUser = ({ isOpen, onClose, editData = null }) => {
  const isEditMode = !!editData;
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const { data: teams = [] } = useSelector((state) => state.teams);
  const notify = useNotify();

  const [formData, setFormData] = useState({
    email: "",
    first_name: "",
    last_name: "",
    role: "",
    password: "",
    teams: [],
    is_active: true,
    sendEmail: true,
  });

  useEffect(() => {
    dispatch(get_teams());
  }, [dispatch]);

  useEffect(() => {
    try {
      if (editData) {
        setFormData({
          ...editData,
          teams: editData.teams?.map((t) => t.id) || [],
          password: "",
        });
      }
    } catch (error) {
      notify(error.message || "Error fetching teams", "error");
    }
  }, [editData, notify]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEditMode) {
        await dispatch(
          update_User({ id: editData.id, payload: formData }),
        ).unwrap();
      } else {
        const payload = {
          ...formData,
          is_active:
            formData.is_active === "True" || formData.is_active === true,
          team_ids: formData.teams,
        };
        await dispatch(addUser(payload)).unwrap();
        setFormData({
          email: "",
          first_name: "",
          last_name: "",
          role: "",
          password: "",
          teams: [],
          is_active: "",
          sendEmail: true,
        });
      }
      notify(
        isEditMode
          ? "User updated successfully"
          : "Invitation sent successfully",
        "success",
      );
      onClose();
    } catch (error) {
      console.error("User creation failed", error);
      notify(error.message || "Error creating user", "error");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const teamOptions = teams.map((team) => ({
    label: team.name,
    value: team.id,
  }));

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-[#0a0f14]/80 backdrop-blur-md"
        onClick={onClose}
      />

      {/* MODAL */}
      <div className="relative w-150 bg-white dark:bg-[#0f172a] rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden">
        {/* HEADER */}
        <div className="px-8 pt-8 pb-4 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-black text-slate-900 dark:text-white">
              Invite New User
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-sm mt-1">
              Add a new member to your organization.
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-900 dark:hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="px-8 py-4 space-y-6 overflow-y-auto max-h-[70vh]"
        >
          {/* EMAIL */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold flex items-center gap-2">
              <Mail size={16} /> Email Address*
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="name@company.com"
              className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none"
              required
            />
          </div>

          {/* NAME */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold flex items-center gap-2">
                <User size={16} /> First Name
              </label>

              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                placeholder="John"
                className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold flex items-center gap-2">
                <User size={16} /> Last Name
              </label>

              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder="Doe"
                className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none"
              />
            </div>
          </div>

          {/* ROLE */}
          <div className="flex flex-col gap-2">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold flex items-center gap-2">
                <Lock size={16} /> Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="********"
                  className="w-full h-12 px-4 pr-12 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* ROLE SELECT */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold flex items-center gap-2">
                  <Shield size={16} /> Role
                </label>
                <div className="relative">
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 appearance-none outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Role</option>
                    <option value="ADMIN">Administrator</option>
                    <option value="MANAGER">Manager</option>
                    <option value="EMPLOYEE">User</option>
                  </select>
                  <ChevronDown
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>

              {/* IS_ACTIVE SELECT */}
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold flex items-center gap-2">
                  <User size={16} /> Status
                </label>
                <div className="relative">
                  <select
                    name="is_active"
                    value={formData.is_active}
                    onChange={handleChange}
                    className="w-full h-12 px-4 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 appearance-none outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="" disabled>
                      Select isActive
                    </option>
                    <option value="true">Active</option>
                    <option value="false">Inactive </option>
                  </select>
                  <ChevronDown
                    size={18}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* TEAMS MULTISELECT */}
          <div className="flex flex-col gap-2">
            <label className="text-sm font-bold flex items-center gap-2 text-slate-700 dark:text-slate-200">
              <Users size={16} /> Assign to Teams
            </label>

            <MultiSelect
              value={formData.teams}
              options={teamOptions}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  teams: e.value,
                }))
              }
              placeholder="Select Teams"
              filter
              display="chip"
              appendTo={document.body}
              panelClassName="rounded-xl shadow-xl"
              className="w-full rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
            />
          </div>

          {/* SEND EMAIL */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="sendEmail"
              checked={formData.sendEmail}
              onChange={handleChange}
            />

            <label className="text-sm font-bold">Send invitation email</label>
          </div>

          {/* FOOTER */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 rounded-xl border border-slate-300 dark:border-slate-700"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="px-8 py-2 rounded-xl bg-[#0d7ff2] text-white flex items-center gap-2"
            >
              {isEditMode ? "Update User" : "Send Invite"} <Send size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InviteUser;
