const FilterButton = ({ label, value, icon, onClick, isActive }) => {
  return (
    <button
      onClick={onClick}
      className={`
          flex h-10 cursor-pointer items-center gap-x-3 rounded-xl border px-4 shadow-sm transition-all group whitespace-nowrap
          ${
            isActive
              ? "bg-[#135bec]/5 border-[#135bec] dark:bg-blue-900/20 dark:border-blue-500"
              : "bg-white dark:bg-gray-800 border-[#dbdfe6] dark:border-gray-700 hover:border-[#135bec]"
          }
        `}
    >
      <div className="flex cursor-pointer items-center gap-1.5">
        <span
          className={`text-[12px] font-black uppercase tracking-wider ${isActive ? "text-[#135bec]" : "text-gray-700"}`}
        >
          {label}
        </span>
        <span className="h-3 w-px bg-gray-200 dark:bg-gray-700" />
        <span
          className={`text-xs font-bold ${isActive ? "text-[#111318] dark:text-white" : "text-gray-600 dark:text-gray-300"}`}
        >
          {value}
        </span>
      </div>

      <span
        className={`cursor-pointer transition-transform duration-200 ${isActive ? "text-[#135bec]" : "text-gray-400 group-hover:text-[#135bec]"}`}
      >
        {icon}
      </span>
    </button>
  );
};
export default FilterButton;
