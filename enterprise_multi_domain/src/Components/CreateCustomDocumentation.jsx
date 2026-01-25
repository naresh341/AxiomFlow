import {
  ArrowRight,
  BookOpen,
  Box,
  Circle,
  Code,
  Download,
  Headphones,
  Key,
  Layout,
  Search,
  ShieldCheck,
  Users,
} from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const CreateCustomDocumentation = () => {
  const [activeCategory, setActiveCategory] = useState("All Resources");
  const navigate = useNavigate();
  const categories = [
    "All Resources",
    "Guides",
    "API Reference",
    "Security",
    "Compliance",
  ];

  const gettingStarted = [
    {
      title: "Product Guides",
      desc: "Explore features and workflows to boost productivity.",
      icon: <Layout className="text-primary" />,
      img: "7",
    },
    {
      title: "Admin Console",
      desc: "Configure settings, manage users, and security policies.",
      icon: <ShieldCheck className="text-primary" />,
      img: "8",
    },
    {
      title: "Developer Portal",
      desc: "API references, SDKs, and integration tutorials.",
      icon: <Code className="text-primary" />,
      img: "9",
    },
  ];

  const popularTopics = [
    { title: "Setting up SSO (Single Sign-On)", icon: <Key size={20} /> },
    { title: "Managing and Securing API Keys", icon: <Box size={20} /> },
    { title: "User Roles and Permissions Overview", icon: <Users size={20} /> },
    {
      title: "Data Export and Compliance Basics",
      icon: <Download size={20} />,
    },
  ];

  return (
    <div className="bg-[#f6f6f8] dark:bg-[#101622] min-h-screen text-[#111318] dark:text-white font-sans transition-colors duration-200">
      <div className=" mx-auto">
        {/* Header */}
        <header className="px-6 py-10 lg:py-16 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="space-y-2">
            <h1 className="text-4xl lg:text-5xl font-black tracking-tight">
              Documentation Hub
            </h1>
            <p className="text-[#616f89] dark:text-gray-400 text-lg max-w-xl">
              Everything you need to master our platform, from initial setup to
              advanced API integrations.
            </p>
          </div>
          <button
            onClick={() => navigate("/Support")}
            className="bg-[#135bec] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-[#135bec]/20 hover:scale-105 transition-all flex items-center gap-2"
          >
            <Headphones size={18} />
            Contact Support
          </button>
        </header>

        {/* Search & Filters */}
        <section className="px-6">
          <div className="bg-white dark:bg-[#1a212e] rounded-2xl p-2 shadow-sm border border-gray-200 dark:border-gray-800">
            <div className="relative p-2">
              <Search
                className="absolute left-6 top-1/2 -translate-y-1/2 text-[#616f89]"
                size={22}
              />
              <input
                className="w-full h-14 pl-14 pr-6 rounded-xl bg-[#f0f2f4] dark:bg-[#252d3d] border-none text-lg focus:ring-2 focus:ring-[#135bec]/20 outline-none"
                placeholder="Search documentation (Cmd + K)"
              />
            </div>
            <div className="flex gap-2 p-3 flex-wrap border-t border-gray-100 dark:border-gray-800 mt-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`h-9 px-5 rounded-lg text-sm font-bold transition-all ${
                    activeCategory === cat
                      ? "bg-[#135bec] text-white shadow-md"
                      : "bg-[#f0f2f4] dark:bg-[#252d3d] text-[#616f89] dark:text-gray-300 hover:bg-gray-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Main Content */}
        <main className="px-6 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Getting Started */}
            <section>
              <h2 className="text-2xl font-black mb-6 flex items-center gap-2">
                <BookOpen className="text-[#135bec]" /> Getting Started
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {gettingStarted.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white dark:bg-[#1a212e] p-5 rounded-2xl border border-gray-200 dark:border-gray-800 shadow-sm hover:shadow-xl transition-all cursor-pointer group"
                  >
                    <div className="aspect-video rounded-xl mb-4 overflow-hidden relative">
                      <img
                        src={`https://picsum.photos/seed/${item.img}/400/225`}
                        alt={item.title}
                        className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-[#135bec]/10 opacity-60 group-hover:opacity-0 transition-opacity" />
                    </div>
                    <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                    <p className="text-sm text-[#616f89] dark:text-gray-400">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Popular Topics */}
            <section>
              <h2 className="text-2xl font-black mb-6">Popular Topics</h2>
              <div className="bg-white dark:bg-[#1a212e] rounded-2xl border border-gray-200 dark:border-gray-800 divide-y dark:divide-gray-800 overflow-hidden">
                {popularTopics.map((topic, idx) => (
                  <a
                    key={idx}
                    href="#"
                    className="flex items-center justify-between p-5 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-[#135bec]/10 rounded-lg text-[#135bec]">
                        {topic.icon}
                      </div>
                      <span className="font-bold">{topic.title}</span>
                    </div>
                    <ArrowRight
                      size={18}
                      className="text-gray-300 group-hover:text-[#135bec] group-hover:translate-x-1 transition-all"
                    />
                  </a>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-8">
            {/* System Status */}
            <div className="bg-white dark:bg-[#1a212e] rounded-2xl p-6 border border-gray-200 dark:border-gray-800 shadow-sm">
              <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest mb-4">
                System Status
              </h3>
              <div className="flex items-center gap-3 bg-green-50 dark:bg-green-900/10 p-4 rounded-xl border border-green-100 dark:border-green-900/20">
                <div className="relative flex h-3 w-3">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-75"></span>
                  <Circle
                    size={12}
                    fill="currentColor"
                    className="text-green-500"
                  />
                </div>
                <span className="text-green-700 dark:text-green-400 font-bold text-sm">
                  All Systems Operational
                </span>
              </div>
              <p className="text-[10px] text-gray-400 mt-4 text-center italic">
                Last updated: 5 minutes ago
              </p>
            </div>

            {/* Help Banner */}
            <div className="bg-[#135bec] rounded-2xl p-8 text-white shadow-xl shadow-[#135bec]/30 relative overflow-hidden group">
              <div className="relative z-10">
                <h3 className="text-xl font-black mb-2">Need a demo?</h3>
                <p className="text-blue-100 text-sm mb-6">
                  Schedule a 1:1 session with our product experts to get
                  onboarded faster.
                </p>
                <button className="w-full bg-white text-[#135bec] font-black py-3 rounded-xl hover:bg-blue-50 transition-all active:scale-95">
                  Book a Call
                </button>
              </div>
              <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:bg-white/20 transition-all" />
            </div>
          </aside>
        </main>

        {/* Footer */}
        <footer className="px-6 py-12 border-t border-gray-200 dark:border-gray-800 mt-12 mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[#135bec] rounded-lg flex items-center justify-center text-white">
              <BookOpen size={18} />
            </div>
            <span className="font-black text-lg">Enterprise Docs</span>
          </div>
          <div className="flex gap-6 text-sm font-bold text-[#616f89] dark:text-gray-400">
            {["Privacy", "Terms", "Community", "Blog"].map((link) => (
              <a
                key={link}
                href="#"
                className="hover:text-[#135bec] transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
          <p className="text-xs text-gray-400">
            © 2026 Enterprise SaaS Platform Inc.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default CreateCustomDocumentation;
