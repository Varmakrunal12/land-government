"use client";

import { Shield, GraduationCap, Building2, MapPin, Settings, ChevronRight, Globe, CheckCircle2 } from "lucide-react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = (role: "researcher" | "ministry" | "state" | "admin", defaultPath: string) => {
    localStorage.setItem("userRole", role);
    router.push(defaultPath);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950">
      
      {/* Top National Header Bar */}
      <div className="bg-slate-900 border-b border-slate-800 text-slate-300 text-xs px-6 py-2 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1.5 font-semibold text-white">
            <span className="text-base">🇮🇳</span>
            <span>भारत सरकार | Government of India</span>
          </span>
          <span className="text-slate-700">|</span>
          <span className="text-slate-400">ग्रामीण विकास मंत्रालय | Ministry of Rural Development</span>
          <span className="text-slate-700">|</span>
          <span className="text-amber-400 font-medium">भूमि संसाधन विभाग (DoLR)</span>
        </div>
        <div className="flex items-center space-x-4 text-slate-400 text-xs">
          <span>SIH 2026 Problem ID: <strong className="text-amber-400">26019</strong></span>
          <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded-full text-[11px] font-semibold">
            ● System Status: Online
          </span>
        </div>
      </div>

      {/* Tricolor Stripe Accent */}
      <div className="h-1.5 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]"></div>
        <div className="h-full w-1/3 bg-white"></div>
        <div className="h-full w-1/3 bg-[#138808]"></div>
      </div>

      {/* Main Hero / Portal Section */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 relative overflow-hidden bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-slate-950">
        
        {/* Subtle Map Mesh Backdrop */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/India_satellite_image.png/1200px-India_satellite_image.png')] bg-center bg-no-repeat bg-cover pointer-events-none"></div>

        <div className="z-10 w-full max-w-5xl px-2">
          
          {/* Emblem & Portal Title */}
          <div className="text-center mb-10 space-y-3">
            <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-b from-amber-400/20 to-amber-600/10 border border-amber-500/40 text-amber-400 mb-2 shadow-xl shadow-amber-500/10">
              <span className="text-3xl">🏛️</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-black tracking-tight text-white">
              National Digital Platform for Land Governance
            </h1>
            <p className="text-amber-400 font-semibold text-base md:text-lg max-w-2xl mx-auto">
              Research & Policy Innovation System (DoLR, Govt. of India)
            </p>
            <p className="text-slate-400 text-xs md:text-sm max-w-3xl mx-auto leading-relaxed">
              Empowering evidence-based policymaking through integrated GIS analytics, AI knowledge engines, policy what-if simulations, and multi-tier stakeholder collaboration across 28 States & 8 UTs.
            </p>
          </div>

          {/* 4 Role Selection Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            
            {/* 1. Researcher */}
            <div 
              onClick={() => handleLogin('researcher', '/research')}
              className="group cursor-pointer bg-slate-900/90 hover:bg-slate-800/90 border-2 border-slate-800 hover:border-blue-500/80 rounded-2xl p-6 transition-all duration-200 shadow-xl relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 rounded-bl-full group-hover:bg-blue-500/10 transition-colors"></div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-blue-500/10 border border-blue-500/30 text-blue-400 flex items-center justify-center text-xl font-bold group-hover:bg-blue-500 group-hover:text-white transition-all">
                    <GraduationCap className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-bold text-blue-400 bg-blue-500/10 border border-blue-500/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    MODULE 01
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors flex items-center gap-2">
                  👨‍🔬 Researcher / Academic Workspace
                </h3>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  Access AI RAG Literature Assistant, national land datasets, spatial analytics tools, and submit innovation project proposals.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800 text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                <span>Launch Knowledge Engine</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 2. Ministry / Policymaker */}
            <div 
              onClick={() => handleLogin('ministry', '/dashboard')}
              className="group cursor-pointer bg-slate-900/90 hover:bg-slate-800/90 border-2 border-slate-800 hover:border-amber-500/80 rounded-2xl p-6 transition-all duration-200 shadow-xl relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/5 rounded-bl-full group-hover:bg-amber-500/10 transition-colors"></div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center text-xl font-bold group-hover:bg-amber-500 group-hover:text-slate-950 transition-all">
                    <Building2 className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    MODULE 02
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-amber-300 transition-colors flex items-center gap-2">
                  🏛️ Ministry / Policymaker Portal
                </h3>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  Analyze national land dashboards, run Policy What-If simulations, state-wise benchmarks, and evidence-based decision reports.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800 text-xs font-semibold text-amber-400 group-hover:text-amber-300">
                <span>Launch National Policy Dashboard</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 3. State / Government Dept */}
            <div 
              onClick={() => handleLogin('state', '/state-dashboard')}
              className="group cursor-pointer bg-slate-900/90 hover:bg-slate-800/90 border-2 border-slate-800 hover:border-emerald-500/80 rounded-2xl p-6 transition-all duration-200 shadow-xl relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 rounded-bl-full group-hover:bg-emerald-500/10 transition-colors"></div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center text-xl font-bold group-hover:bg-emerald-500 group-hover:text-slate-950 transition-all">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    MODULE 03
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-emerald-300 transition-colors flex items-center gap-2">
                  🏢 State Revenue & Land Department
                </h3>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  Manage state-level land records, ingest cadastral GeoJSON datasets, view GIS layers, and track DILRMP policy execution.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800 text-xs font-semibold text-emerald-400 group-hover:text-emerald-300">
                <span>Launch State Land Portal</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* 4. System Admin */}
            <div 
              onClick={() => handleLogin('admin', '/admin')}
              className="group cursor-pointer bg-slate-900/90 hover:bg-slate-800/90 border-2 border-slate-800 hover:border-purple-500/80 rounded-2xl p-6 transition-all duration-200 shadow-xl relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-bl-full group-hover:bg-purple-500/10 transition-colors"></div>
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="h-12 w-12 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center text-xl font-bold group-hover:bg-purple-500 group-hover:text-white transition-all">
                    <Settings className="h-6 w-6" />
                  </div>
                  <span className="text-[10px] font-bold text-purple-400 bg-purple-500/10 border border-purple-500/30 px-2.5 py-1 rounded-full uppercase tracking-wider">
                    MODULE 04
                  </span>
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors flex items-center gap-2">
                  ⚙️ System Administration & Governance
                </h3>
                <p className="text-slate-400 text-xs mt-2 leading-relaxed">
                  User role approvals, dataset validation queues, content moderation, security access control, and live audit logging.
                </p>
              </div>
              <div className="mt-6 flex items-center justify-between pt-4 border-t border-slate-800 text-xs font-semibold text-purple-400 group-hover:text-purple-300">
                <span>Launch Admin Control Center</span>
                <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

          </div>

          {/* Quick Metrics Footer Bar */}
          <div className="mt-8 bg-slate-900/60 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-around gap-4 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              <span>DILRMP Digitization: <strong className="text-white">96.8% Covered</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-amber-400" />
              <span>Bhu-Aadhar (ULPIN): <strong className="text-white">18.4 Crore Parcels</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-blue-400" />
              <span>NGDDRS States Implemented: <strong className="text-white">28 States/UTs</strong></span>
            </div>
          </div>

        </div>
      </div>

      {/* Official Footnote */}
      <footer className="bg-slate-950 border-t border-slate-900 py-3 px-6 text-center text-xs text-slate-500">
        Department of Land Resources, Ministry of Rural Development, Govt. of India | Smart India Hackathon 2026 Submission
      </footer>

    </div>
  );
}
