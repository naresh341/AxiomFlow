import { ChevronDown, Plus, User, Users, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addTeams, update_Teams } from "../RTKThunk/RoleAndOrganizationThunk";
import { useNotify } from "./MiniComponent/useNotify";
// import { addTeams, update_Teams } from "../RTKThunk/AsyncThunk"; // Verify this path

const CreateTeam = ({ isOpen, onClose, editData = false }) => {
  const isEditMode = !!editData;
  const dispatch = useDispatch();
  const notify = useNotify();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    is_active: true,
    users: editData?.users?.map((u) => u.id) || [],
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
    };

    try {
      if (isEditMode) {
        await dispatch(update_Teams({ id: editData.id, payload })).unwrap();
      } else {
        await dispatch(addTeams(payload)).unwrap();
        setFormData({});
      }
      onClose();
      notify(
        `Team ${isEditMode ? "updated" : "created"} successfully!`,
        "success",
      );
    } catch (error) {
      console.error("Operation failed:", error);
      notify(error.message || "An error occurred. Please try again.", "error");
    }
  };
  useEffect(() => {
    if (editData) {
      setFormData({
        ...editData,
        name: editData.name || "",
        description: editData.description || "",
        is_active: editData.is_active ?? true,
        users: editData.users?.map((u) => u.id) || [],
      });
    } else {
      // Reset for Create mode
      setFormData({ name: "", description: "", is_active: true, users: [] });
    }
  }, [editData]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      <form
        onSubmit={handleSubmit}
        className="relative w-180 bg-white dark:bg-[#111318] rounded-4xl shadow-2xl border border-slate-200 dark:border-[#282e39] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300"
      >
        {/* HEADER */}
        <div className="px-8 py-6 border-b border-slate-100 dark:border-[#282e39] flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="bg-[#135bec]/10 p-2 rounded-xl">
              <Users className="text-[#135bec]" size={24} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Create Team
            </h1>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        {/* CONTENT */}
        <div className="flex-1 overflow-y-auto px-8 py-6 space-y-8 max-h-[75vh]">
          {/* Team Name */}
          <div className="space-y-2.5">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
              Team Name
            </label>
            <input
              required
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="e.g., Product Design"
              className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#282e39] text-slate-900 dark:text-white outline-none focus:border-[#135bec] transition-all"
            />
          </div>

          {/* Description */}
          <div className="space-y-2.5">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-200">
              Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="3"
              placeholder="Explain the purpose of this team..."
              className="w-full p-4 rounded-xl bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#282e39] text-slate-900 dark:text-white outline-none focus:border-[#135bec] transition-all resize-none"
            />
          </div>

          {/* Team Lead - This maps to lead_id in your TeamModel */}
          {/* <div className="space-y-2.5">
            <label className="text-sm font-bold text-slate-700 dark:text-slate-200 flex items-center gap-2">
              <UserCircle size={16} className="text-[#135bec]" /> Team Lead
            </label>
            <div className="relative">
              <select
                name="lead_id"
                value={formData.lead_id}
                onChange={handleChange}
                className="w-full h-12 px-4 rounded-xl bg-slate-50 dark:bg-[#111318] border border-slate-200 dark:border-[#282e39] text-slate-900 dark:text-white outline-none appearance-none cursor-pointer focus:border-[#135bec]"
              >
                <option value="">Select a lead (Optional)</option>
                <option value="1">Alex Rivera</option>
                <option value="2">Jordan Smith</option>
              </select>
              <ChevronDown
                size={18}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
              />
            </div>
          </div> */}
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

        {/* FOOTER */}
        <div className="px-8 py-6 bg-slate-50 dark:bg-[#111318]/50 border-t border-slate-100 dark:border-[#282e39] flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl text-slate-600 dark:text-slate-300 font-bold hover:bg-slate-200 transition-all"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-8 py-2.5 rounded-xl bg-[#135bec] text-white font-bold flex items-center gap-2 hover:brightness-110 active:scale-95 transition-all"
          >
            Create Team <Plus size={18} />
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeam;
