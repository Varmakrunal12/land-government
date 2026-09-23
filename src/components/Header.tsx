"use client";

import { Bell, User, Search, Globe, Shield, RefreshCw, ChevronRight, Sparkles, Map, Scale, Satellite, Lightbulb, ShieldCheck } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Header() {
  const router = useRouter();
  const [lang, setLang] = useState<"EN" | "HI">("EN");
  const [notifCount, setNotifCount] = useState(3);
  const [showNotif, setShowNotif] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);

  const searchIndex = [
    { title: "National Innovation Hub", subtitle: "Grants, Hackathons, Pilots & Competitions", href: "/innovation", icon: Lightbulb, color: "text-amber-500" },
    { title: "Climate & Land Resilience Dashboard", subtitle: "Flood, Drought, Heat & Salinity Modeling", href: "/climate-resilience", icon: ShieldCheck, color: "text-emerald-500" },
    { title: "Land Dispute Intelligence", subtitle: "Caseloads, 5 Dispute Types & Resolution SLA", href: "/land-disputes", icon: Scale, color: "text-rose-500" },
    { title: "Earth Observation & Remote Sensing", subtitle: "Ahmedabad 2018-2026 Urban Sprawl Visualizer", href: "/remote-sensing", icon: Satellite, color: "text-cyan-500" },
    { title: "Evidence-Backed AI Knowledge Engine", subtitle: "4-Silo RAG with Exact Source Citations [1-4]", href: "/research", icon: Sparkles, color: "text-blue-500" },
    { title: "Multi-Layer GIS Spatial Data Viewer", subtitle: "Cadastral boundaries, ULPIN & Remote sensing", href: "/gis", icon: Map, color: "text-purple-500" },
    { title: "What-If Policy Simulation Engine", subtitle: "Scenario A vs Scenario B Comparison", href: "/policy", icon: Shield, color: "text-amber-600" },
    { title: "Official Decision PDF Reports", subtitle: "Generate signed Government of India PDF", href: "/reports", icon: Shield, color: "text-slate-600" },
  ];

  const filteredSearch = searchIndex.filter(item => 
    item.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    item.subtitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectRoute = (href: string) => {
    setShowSearchDropdown(false);
    setSearchTerm("");
    router.push(href);
  };

  return (
    <header className="flex flex-col border-b border-slate-200 bg-white shadow-sm z-30">
      
      {/* Top National Portal Bar */}
      <div className="bg-slate-900 text-slate-300 text-[11px] px-4 sm:px-6 py-1 flex items-center justify-between border-b border-slate-800">
        <div className="flex items-center space-x-3">
          <span className="flex items-center space-x-1 font-semibold text-slate-200">
            <span>🇮🇳</span>
            <span>भारत सरकार | Government of India</span>
          </span>
          <span className="text-slate-600">|</span>
          <span className="hidden md:inline text-slate-400">ग्रामीण विकास मंत्रालय | Ministry of Rural Development</span>
          <span className="text-slate-600 hidden md:inline">|</span>
          <span className="hidden lg:inline text-amber-400 font-medium">भूमि संसाधन विभाग (DoLR)</span>
        </div>

        <div className="flex items-center space-x-3">
          <button 
            onClick={() => setLang(lang === "EN" ? "HI" : "EN")}
            className="flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold transition-colors cursor-pointer"
          >
            <Globe className="h-3 w-3" />
            <span>{lang === "EN" ? "हिन्दी" : "English"}</span>
          </button>
          
          <span className="text-slate-600">|</span>
          <span className="hidden sm:inline text-slate-400">SIH 2026 ID: <strong className="text-white">26019</strong></span>
          <span className="text-xs bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Live Data Engine
          </span>
        </div>
      </div>

      {/* Main Bar */}
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8 relative">
        
        {/* Search */}
        <div className="flex flex-1 items-center relative">
          <div className="flex w-full max-w-lg items-center rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 focus-within:ring-2 focus-within:ring-amber-500 focus-within:bg-white transition-all">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowSearchDropdown(true);
              }}
              onFocus={() => setShowSearchDropdown(true)}
              placeholder={lang === "EN" ? "Search ULPIN, Remote Sensing, Disputes, Climate or Policies..." : "यूएलपीआईएन, रिमोट सेंसिंग, विवाद, जलवायु या नीतियां खोजें..."}
              className="ml-2 w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm("")} className="text-slate-400 hover:text-slate-600 text-xs font-bold mr-1">✕</button>
            )}
            <span className="hidden sm:inline text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-mono">⌘K</span>
          </div>

          {/* Search Results Dropdown */}
          {showSearchDropdown && searchTerm.trim() && (
            <div className="absolute left-0 top-11 w-full max-w-lg bg-white border border-slate-200 rounded-xl shadow-2xl p-2 z-50 text-xs space-y-1 animate-in fade-in slide-in-from-top-2">
              <div className="px-2 py-1 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex justify-between">
                <span>Matching Modules & Tools</span>
                <button onClick={() => setShowSearchDropdown(false)} className="text-slate-400 hover:text-slate-700">Close</button>
              </div>

              {filteredSearch.length === 0 ? (
                <p className="p-3 text-slate-500 italic text-center">No exact match found. Try &apos;Climate&apos;, &apos;Disputes&apos;, &apos;Remote Sensing&apos;, or &apos;Innovation&apos;.</p>
              ) : (
                filteredSearch.map((item, idx) => (
                  <div
                    key={idx}
                    onClick={() => handleSelectRoute(item.href)}
                    className="p-2.5 rounded-lg hover:bg-amber-50 cursor-pointer transition-colors flex items-center justify-between group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 bg-slate-100 rounded-md group-hover:bg-white transition-colors">
                        <item.icon className={`h-4 w-4 ${item.color}`} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-900 group-hover:text-amber-700">{item.title}</p>
                        <p className="text-[10px] text-slate-500">{item.subtitle}</p>
                      </div>
                    </div>
                    <ChevronRight className="h-3.5 w-3.5 text-slate-400 group-hover:text-amber-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                ))
              )}
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotif(!showNotif)}
              className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
            >
              <Bell className="h-5 w-5" />
              {notifCount > 0 && (
                <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-slate-950">
                  {notifCount}
                </span>
              )}
            </button>

            {showNotif && (
              <div className="absolute right-0 mt-2 w-80 rounded-xl bg-white border border-slate-200 shadow-xl p-4 text-xs z-50 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 mb-3">
                  <span className="font-bold text-slate-800">DoLR Portal Notifications</span>
                  <button onClick={() => setNotifCount(0)} className="text-[10px] text-blue-600 hover:underline">Mark read</button>
                </div>
                <div className="space-y-2.5">
                  <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200">
                    <p className="font-bold text-slate-800 text-xs">DILRMP Sync Alert</p>
                    <p className="text-slate-600 text-[11px] mt-0.5">Gujarat state synced 18,400 new Bhu-Aadhar land parcel IDs.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-blue-50 border border-blue-200">
                    <p className="font-bold text-slate-800 text-xs">Earth Observation Sentinel-2 Alert</p>
                    <p className="text-slate-600 text-[11px] mt-0.5">Ahmedabad peri-urban conversion model updated.</p>
                  </div>
                  <div className="p-2.5 rounded-lg bg-emerald-50 border border-emerald-200">
                    <p className="font-bold text-slate-800 text-xs">Innovation Grant Proposal #48</p>
                    <p className="text-slate-600 text-[11px] mt-0.5">Submitted by IIT Delhi for AI Cadastral Alignment.</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* User Profile Badge */}
          <div className="flex items-center space-x-3 pl-3 border-l border-slate-200">
            <div className="hidden sm:flex flex-col text-right">
              <span className="text-xs font-bold text-slate-800 leading-tight">National Governance Portal</span>
              <span className="text-[10px] text-amber-600 font-semibold leading-tight">Ministry of Rural Development</span>
            </div>
            <div className="h-9 w-9 overflow-hidden rounded-lg bg-slate-900 border border-amber-500/50 flex items-center justify-center text-amber-400 shadow-sm">
              <Shield className="h-5 w-5" />
            </div>
          </div>

        </div>

      </div>
    </header>
  );
}
