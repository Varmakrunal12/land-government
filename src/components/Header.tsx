"use client";

import { Bell, User, Search, Globe, Shield, RefreshCw } from "lucide-react";
import { useState } from "react";

export default function Header() {
  const [lang, setLang] = useState<"EN" | "HI">("EN");
  const [notifCount, setNotifCount] = useState(3);
  const [showNotif, setShowNotif] = useState(false);

  return (
    <header className="flex flex-col border-b border-slate-200 bg-white shadow-sm z-10">
      
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
            className="flex items-center space-x-1 px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-amber-300 font-bold transition-colors"
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
      <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Search */}
        <div className="flex flex-1 items-center">
          <div className="flex w-full max-w-lg items-center rounded-lg border border-slate-300 bg-slate-50 px-3 py-1.5 focus-within:ring-2 focus-within:ring-amber-500 focus-within:bg-white transition-all">
            <Search className="h-4 w-4 text-slate-400 shrink-0" />
            <input
              type="text"
              placeholder={lang === "EN" ? "Search ULPIN, Cadastral Maps, Policies, or Research Papers..." : "यूएलपीआईएन, कैडस्ट्रल मानचित्र, नीतियां, या शोध पत्र खोजें..."}
              className="ml-2 w-full bg-transparent text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none"
            />
            <span className="hidden sm:inline text-[10px] bg-slate-200 text-slate-600 px-1.5 py-0.5 rounded font-mono">⌘K</span>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => setShowNotif(!showNotif)}
              className="relative p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
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
                <div className="space-y-3">
                  <div className="p-2 rounded bg-amber-50 border border-amber-100">
                    <p className="font-semibold text-slate-800">DILRMP Sync Alert</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">Maharashtra state synced 12,400 new Bhu-Aadhar land parcel IDs.</p>
                  </div>
                  <div className="p-2 rounded bg-blue-50 border border-blue-100">
                    <p className="font-semibold text-slate-800">AI Policy Simulation Ready</p>
                    <p className="text-slate-500 text-[11px] mt-0.5">Agricultural land transition model update completed.</p>
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
