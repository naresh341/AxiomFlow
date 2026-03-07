import { CloudUpload, FileText, X } from "lucide-react";
import { useState } from "react";

const EvidenceModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    evidence_name: "",
    collection_date: "",
    description: "",
    control_id: "",
    file: null,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];

    setFormData((prev) => ({
      ...prev,
      file: file,
    }));
  };

  const handleSubmit = () => {
    const data = new FormData();

    data.append("evidence_name", formData.evidence_name);
    data.append("collection_date", formData.collection_date);
    data.append("description", formData.description);
    data.append("file", formData.file);

    onSubmit(formData.control_id, data);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-slate-900/70 backdrop-blur-md"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white dark:bg-[#1c2127] w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 dark:border-[#3b4754] flex flex-col max-h-[95vh]">
        {/* Header */}
        <div className="px-8 py-6 border-b border-slate-100 dark:border-[#3b4754] flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="size-12 rounded-xl bg-[#137fec]/10 text-[#137fec] flex items-center justify-center">
              <FileText size={28} />
            </div>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white">
              Upload Evidence
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white bg-slate-100 dark:bg-slate-800 rounded-full"
          >
            <X size={24} />
          </button>
        </div>

        {/* Body */}
        <div className="p-8 overflow-y-auto space-y-8">
          {/* Upload */}
          <label
            htmlFor="fileUpload"
            className="border-4 border-dashed border-slate-200 dark:border-[#3b4754] rounded-2xl p-12 bg-slate-50 dark:bg-[#283039]/30 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-slate-100 dark:hover:bg-[#283039]/50"
          >
            <div className="size-20 rounded-full bg-[#137fec]/10 flex items-center justify-center mb-4">
              <CloudUpload size={40} className="text-[#137fec]" />
            </div>

            <input
              type="file"
              className="hidden"
              id="fileUpload"
              accept=".pdf"
              onChange={handleFileChange}
            />

            {formData.file && (
              <p className="text-sm text-slate-500 mt-3">
                {formData.file.name}
              </p>
            )}
          </label>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Evidence Name */}
            <div className="col-span-2 space-y-2">
              <label className="text-sm font-black text-slate-500 uppercase tracking-[0.15em]">
                Evidence Name
              </label>
              <input
                type="text"
                name="evidence_name"
                value={formData.evidence_name}
                onChange={handleChange}
                className="w-full border-2 border-slate-200 rounded-xl px-5 py-4"
                placeholder="Access Logs Q4"
              />
            </div>

            {/* Control */}
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-500 uppercase tracking-[0.15em]">
                Associated Control
              </label>

              <select
                name="control_id"
                value={formData.control_id}
                onChange={handleChange}
                className="w-full border-2 border-slate-200 rounded-xl px-5 py-4"
              >
                <option value="">Select Control</option>
                <option value="1">CC6.1 - Access Control</option>
                <option value="2">CC1.2 - Integrity & Ethics</option>
                <option value="3">CC9.1 - Physical Access</option>
              </select>
            </div>

            {/* Collection Date */}
            <div className="space-y-2">
              <label className="text-sm font-black text-slate-500 uppercase tracking-[0.15em]">
                Collection Date
              </label>

              <input
                type="date"
                name="collection_date"
                value={formData.collection_date}
                onChange={handleChange}
                className="w-full border-2 border-slate-200 rounded-xl px-5 py-4"
              />
            </div>

            {/* Description */}
            <div className="col-span-2 space-y-2">
              <label className="text-sm font-black text-slate-500 uppercase tracking-[0.15em]">
                Notes
              </label>

              <textarea
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border-2 border-slate-200 rounded-xl px-5 py-4"
                placeholder="Provide context for the auditor"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-4 px-8 py-6 bg-slate-50 border-t">
          <button
            onClick={onClose}
            className="px-6 py-3 font-bold text-slate-600"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            className="flex items-center gap-3 px-8 py-3 font-bold text-white bg-[#137fec] rounded-xl"
          >
            <CloudUpload size={20} />
            Upload Evidence
          </button>
        </div>
      </div>
    </div>
  );
};

export default EvidenceModal;
