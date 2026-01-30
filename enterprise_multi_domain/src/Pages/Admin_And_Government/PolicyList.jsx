const PolicyList = () => {
  return (
    <table className="w-full text-left">
      <thead className="bg-slate-50 dark:bg-[#1c2127]/50 border-b border-slate-200 dark:border-slate-800">
        <tr>
          <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">
            Policy Name
          </th>
          <th className="px-8 py-4 text-[10px] font-black uppercase text-slate-400 tracking-widest">
            Version
          </th>
          <th className="px-8 py-4 text-right text-[10px] font-black uppercase text-slate-400 tracking-widest">
            Action
          </th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
        {[
          "Information Security Policy",
          "Data Privacy Policy",
          "Incident Response Plan",
        ].map((name) => (
          <tr
            key={name}
            className="hover:bg-slate-50 dark:hover:bg-blue-500/5 transition-colors group"
          >
            <td className="px-8 py-5 text-sm font-bold dark:text-white">
              {name}
            </td>
            <td className="px-8 py-5">
              <span className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-[10px] font-black">
                v2.1
              </span>
            </td>
            <td className="px-8 py-5 text-right">
              <button className="text-[#137fec] text-[10px] font-black uppercase tracking-widest hover:underline">
                Download PDF
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PolicyList;
