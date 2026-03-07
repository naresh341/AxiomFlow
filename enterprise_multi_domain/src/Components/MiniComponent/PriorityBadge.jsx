const PriorityBadge = ({ value }) => {
  const p = Number(value);

  const config =
    p >= 10
      ? {
          label: "CRITICAL",
          css: "bg-purple-100 text-purple-700 border-purple-200",
          dot: "bg-purple-500",
        }
      : p >= 7
        ? {
            label: "HIGH",
            css: "bg-red-100 text-red-700 border-red-200",
            dot: "bg-red-500",
          }
        : p >= 4
          ? {
              label: "MEDIUM",
              css: "bg-amber-100 text-amber-700 border-amber-200",
              dot: "bg-amber-500",
            }
          : {
              label: "LOW",
              css: "bg-emerald-100 text-emerald-700 border-emerald-200",
              dot: "bg-emerald-500",
            };

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full border ${config.css}`}
    >
      <span className={`size-1.5 rounded-full ${config.dot}`}></span>
      <span className="text-[12px] font-bold uppercase">
        {config.label} {p}
      </span>
    </div>
  );
};

export default PriorityBadge;
