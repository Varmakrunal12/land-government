"use client";

import { Activity, Download, RefreshCw, Filter, Search } from "lucide-react";
import { useState } from "react";
import { useGlobalData } from "@/context/GlobalDataContext";

export default function LogsPage() {
  const { auditLogs, addLog } = useGlobalData();
  const [filterType, setFilterType] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");

  const handleRefresh = () => {
    addLog("INFO", "Admin requested manual security log refresh. Inter-module communication stream healthy.", "Audit Console");
  };

  const handleExport = () => {
    alert("Exporting official audit log file (.txt)...");
  };

  const filteredLogs = auditLogs.filter(log => {
    const matchesType = filterType === "ALL" || log.type === filterType;
    const matchesQuery = log.message.toLowerCase().includes(searchQuery.toLowerCase()) || log.timestamp.includes(searchQuery) || log.module.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesQuery;
  });

  return (
    <div className="space-y-6 h-full flex flex-col">
      
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded">
              INTER-MODULE AUDIT TRAIL
            </span>
            <span className="text-xs text-slate-400">Department of Land Resources</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Interconnected System Audit & Governance Logs
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Real-time cross-module audit stream recording actions taken across Researcher, Ministry, State Revenue, and Admin workspaces.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button onClick={handleRefresh} className="flex items-center space-x-1 bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-lg text-xs font-bold border border-slate-700">
            <RefreshCw className="h-3.5 w-3.5 text-amber-400" />
            <span>Sync Feed</span>
          </button>
          <button onClick={handleExport} className="flex items-center space-x-1 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg shadow-purple-600/20">
            <Download className="h-4 w-4" />
            <span>Export Log File</span>
          </button>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        
        {/* Search */}
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search log messages, modules, or timestamps..."
            className="w-full bg-slate-50 border border-slate-300 text-xs rounded-lg pl-9 pr-3 py-2 text-slate-900 focus:ring-2 focus:ring-purple-500 focus:bg-white focus:outline-none"
          />
        </div>

        {/* Level Selector */}
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-slate-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="bg-white border border-slate-300 text-slate-800 text-xs rounded-lg px-3 py-1.5 font-bold focus:ring-2 focus:ring-purple-500"
          >
            <option value="ALL">All Log Levels</option>
            <option value="INFO">INFO Only</option>
            <option value="WARN">WARN Only</option>
            <option value="ERROR">ERROR Only</option>
            <option value="SYSTEM">SYSTEM Only</option>
          </select>
        </div>
      </div>

      {/* Console Viewer */}
      <div className="bg-slate-950 rounded-xl p-6 border border-slate-800 shadow-2xl flex-1 flex flex-col min-h-[350px]">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3 text-slate-400 text-xs font-semibold">
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-purple-400" />
            <span>Interconnected Audit Stream ({filteredLogs.length} Entries)</span>
          </div>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
            ● Real-Time Inter-Module Sync Active
          </span>
        </div>

        <div className="font-mono text-xs space-y-2.5 overflow-y-auto flex-1 pr-2">
          {filteredLogs.map((log, idx) => (
            <div key={idx} className="flex flex-col sm:flex-row sm:items-start space-y-1 sm:space-y-0 sm:space-x-3 p-2 rounded hover:bg-slate-900/80 transition-colors border-b border-slate-900">
              <span className="text-slate-500 shrink-0 font-mono text-[11px]">[{log.timestamp}]</span>
              
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold shrink-0 text-center ${
                log.type === "INFO" ? "bg-blue-500/20 text-blue-400 border border-blue-500/30" :
                log.type === "WARN" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" :
                log.type === "ERROR" ? "bg-rose-500/20 text-rose-400 border border-rose-500/30" :
                "bg-purple-500/20 text-purple-400 border border-purple-500/30"
              }`}>
                {log.type}
              </span>

              <span className="text-amber-400 text-[10px] shrink-0 font-mono bg-slate-900 px-1.5 py-0.5 rounded border border-slate-800">
                [{log.module}]
              </span>

              <span className="text-slate-300 font-sans text-xs leading-relaxed flex-1">{log.message}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
