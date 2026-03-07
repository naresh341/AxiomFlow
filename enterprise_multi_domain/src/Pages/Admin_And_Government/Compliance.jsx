import {
  Activity,
  AlertCircle,
  CheckCircle,
  Plus,
  ShieldCheck,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";
import EvidenceList from "./EvidenceList";
import PolicyList from "./PolicyList";
import RiskMatrix from "./RiskMatrix";
import RiskModal from "../../Components/RiskModal";
import EvidenceModal from "../../Components/EvidenceModal";
import AssessmentModal from "../../Components/AssessmentModal";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewPolicy,
  addRisk,
  get_UserOrg,
  getPolicies,
  uploadControlEvidence,
} from "../../RTKThunk/AsyncThunk";

const Compliance = () => {
  const rows = 10;
  const dispatch = useDispatch();
  const [first, setfirst] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("Policy Documents");
  const [isEvidenceModalOpen, setIsEvidenceModalOpen] = useState(false);
  const [isAssessmentModalOpen, setIsAssessmentModalOpen] = useState(false);
  const { policies, risks, evidence, loading, error } = useSelector(
    (state) => state.compliance,
  );

  const { data } = useSelector((state) => state.UserOrg);

  useEffect(() => {
    dispatch(get_UserOrg());
  }, [dispatch]);

  const onPageChange = (page) => {
    setfirst(page - 1) * rows;
  };

  useEffect(() => {
    dispatch(getPolicies("active"));
  }, [dispatch]);

  const handleSubmit = async (formdata) => {
    try {
      const response = await dispatch(addNewPolicy(formdata)).unwrap();
      setIsAssessmentModalOpen(false);
      dispatch(getPolicies());
      return response;
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddRisk = async (data) => {
    try {
      await dispatch(addRisk(data)).unwrap();
      setIsModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleUploadEvidence = async (data) => {
    try {
      await dispatch(
        uploadControlEvidence({
          controlId: data.control_id,
          formData: data,
        }),
      ).unwrap();

      setIsEvidenceModalOpen(false);
    } catch (error) {
      console.error(error);
    }
  };

  const stats = [
    {
      id: 1,
      label: "SOC 2 Type II",
      score: 94,
      risk: "LOW RISK",
      date: "Oct 2023",
      offset: 15,
    },
    {
      id: 2,
      label: "ISO 27001",
      score: 88,
      risk: "LOW RISK",
      date: "Oct 2023",
      offset: 30,
    },
  ];

  // Data for the 4 Risk Cards
  const riskStats = [
    {
      id: 1,
      title: "SOC 2 Type II",
      detail: "92% Compliant • Active",
      icon: <ShieldCheck size={30} className="text-[#137fec]" />,
      bgColor: "bg-blue-500/10",
    },
    {
      id: 2,
      title: "ISO 27001",
      detail: "85% Compliant • Under Audit",
      icon: <Activity size={30} className="text-amber-500" />,
      bgColor: "bg-amber-500/10",
    },
    {
      id: 3,
      title: "HIPAA",
      detail: "100% Compliant • Active",
      icon: <CheckCircle size={30} className="text-emerald-500" />,
      bgColor: "bg-emerald-500/10",
    },
    {
      id: 4,
      title: "GDPR",
      detail: "78% Compliant • GAP Analysis",
      icon: <AlertCircle size={30} className="text-slate-400" />,
      bgColor: "bg-slate-400/10",
    },
  ];

  const renderHeaderButton = () => {
    const btnClass =
      "flex items-center gap-2 px-6 py-2.5 bg-[#137fec] text-white cursor-pointer font-bold rounded-lg hover:bg-blue-600 transition-all shadow-lg active:scale-95 text-lg";
    if (activeTab === "Evidence Tracker") {
      return (
        <button
          onClick={() => setIsEvidenceModalOpen(true)}
          className={btnClass}
        >
          <Upload size={18} /> <span>Bulk Upload Evidence</span>
        </button>
      );
    }
    if (activeTab === "Risk Assessments") {
      return (
        <button onClick={() => setIsModalOpen(true)} className={btnClass}>
          <Plus size={18} /> <span>Log New Risk</span>
        </button>
      );
    }
    return (
      <button
        onClick={() => setIsAssessmentModalOpen(true)}
        className={btnClass}
      >
        <Plus size={18} /> <span>New Assessment</span>
      </button>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0e11] text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <div className="mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="flex justify-between items-start mb-10">
          <div>
            <h1 className="text-4xl font-black mb-2 tracking-tight dark:text-white">
              Compliance Center
            </h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">
              Enterprise SaaS compliance and regulatory oversight center.
            </p>
          </div>
          {renderHeaderButton()}
        </div>

        {/* DYNAMIC STATS AREA */}
        {activeTab === "Risk Assessments" ? (
          /* The 4 Cards Row for Risk */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
            {riskStats.map((risk) => (
              <div
                key={risk.id}
                className="bg-white dark:bg-[#161b22] border border-slate-200 dark:border-[#2d333b] rounded-2xl p-8 flex items-center justify-between shadow-md hover:border-[#137fec] transition-colors"
              >
                <div className={`p-2  rounded-lg h-fit ${risk.bgColor}`}>
                  {risk.icon}
                </div>
                <div className="flex flex-col gap-1">
                  <h2 className="text-slate-900 dark:text-white text-lg font-bold">
                    {risk.title}
                  </h2>
                  <p className="text-slate-500 dark:text-slate-400 text-lg">
                    {risk.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* The 2 Circular Gauge Cards for Policy/Evidence */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {stats.map((stat) => (
              <div
                key={stat.id}
                className="bg-white dark:bg-[#161b22] border border-slate-200 dark:border-[#2d333b] rounded-2xl p-8 flex items-center justify-between shadow-md hover:border-[#137fec] transition-colors"
              >
                <div className="space-y-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-black uppercase tracking-widest dark:text-white">
                      {stat.label}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-black uppercase bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      {stat.risk}
                    </span>
                  </div>
                  <div className="text-5xl font-black tracking-tighter dark:text-white">
                    {stat.score}%
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">
                    Last Audit: {stat.date}
                  </div>
                </div>
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full -rotate-90">
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="currentColor"
                      strokeWidth="8"
                      fill="transparent"
                      className="text-slate-100 dark:text-slate-800"
                    />
                    <circle
                      cx="48"
                      cy="48"
                      r="40"
                      stroke="#137fec"
                      strokeWidth="8"
                      fill="transparent"
                      strokeDasharray="251.2"
                      strokeDashoffset={stat.offset}
                      strokeLinecap="round"
                      className="transition-all duration-1000"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center text-lg font-black text-[#137fec]">
                    {stat.score}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tab Selection */}
        <div className="flex gap-8 border-b border-slate-200 dark:border-slate-800 mb-8">
          {["Policy Documents", "Evidence Tracker", "Risk Assessments"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-4 text-xs font-bold cursor-pointer uppercase tracking-widest transition-all  ${
                  activeTab === tab
                    ? "border-b-[3px] border-[#137fec] text-[#137fec]"
                    : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-200"
                }`}
              >
                {tab}
              </button>
            ),
          )}
        </div>

        {/* Swappable Layout Content */}
        <div className="bg-white dark:bg-[#111418] border border-slate-200 dark:border-[#2d333b] rounded-2xl overflow-hidden shadow-md">
          {activeTab === "Policy Documents" && (
            <PolicyList
              policies={policies}
              error={error}
              loading={loading}
              rows={rows}
              first={first}
              onPageChange={onPageChange}
            />
          )}
          {activeTab === "Evidence Tracker" && <EvidenceList />}
          {activeTab === "Risk Assessments" && <RiskMatrix />}
        </div>
      </div>

      <RiskModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleAddRisk}
        users={data}
      />
      <EvidenceModal
        isOpen={isEvidenceModalOpen}
        onClose={() => setIsEvidenceModalOpen(false)}
        onSubmit={handleUploadEvidence}
      />
      <AssessmentModal
        isOpen={isAssessmentModalOpen}
        onClose={() => setIsAssessmentModalOpen(false)}
        policies={policies}
        handleSubmit={handleSubmit}
      />
    </div>
  );
};

export default Compliance;
