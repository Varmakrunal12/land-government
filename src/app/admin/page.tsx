"use client";

import { Users, ShieldCheck, Activity, Database, CheckCircle2, XCircle, RefreshCw, Cpu, Key, Globe, Layers } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useGlobalData } from "@/context/GlobalDataContext";

const initialUserRequests = [
  { id: 1, name: "Dr. A. Sharma", role: "Researcher", org: "IIT Delhi", email: "sharma@iitd.ac.in" },
  { id: 2, name: "Smt. K. Verma", role: "State Official", org: "Revenue Dept, UP", email: "k.verma@up.gov.in" },
  { id: 3, name: "Public User / Citizen", role: "Public Read-Only Guest", org: "Citizen Access Portal", email: "citizen@india.gov.in" }
];

const apiEndpoints = [
  { name: "DoLR DILRMP REST API v4", endpoint: "/api/v4/dilrmp/cadastral", status: "Active (99.9% Uptime)", rateLimit: "10,000 req/hr", auth: "OAuth2 / JWT" },
  { name: "NGDDRS e-Registration SOAP Bus", endpoint: "/api/ngddrs/registration", status: "Active", rateLimit: "5,000 req/hr", auth: "Govt Mutual TLS" },
  { name: "ISRO Bhuvan WMS Satellite Layer", endpoint: "/wms/bhuvan/sentinel2", status: "Active", rateLimit: "Unlimited", auth: "API Key" },
];

export default function AdminDashboard() {
  const { datasets, approveDataset, rejectDataset, auditLogs } = useGlobalData();
  const [userRequests, setUserRequests] = useState(initialUserRequests);

  const pendingDatasets = datasets.filter(d => d.status === "Pending Validation");

  const handleUserAction = (id: number, action: "approve" | "deny") => {
    setUserRequests(prev => prev.filter(u => u.id !== id));
    alert(`User request ${action.toUpperCase()}D successfully!`);
  };

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded">
              SYSTEM ADMINISTRATION & GOVERNANCE CONSOLE
            </span>
            <span className="text-xs text-slate-400">Governance & Security Operations</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            DoLR Platform Governance, API Management & RBAC Control
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Manage user roles (including Public Read-Only access), dataset catalog metadata, API governance, and live security audit logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/users" className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-lg text-xs font-bold border border-slate-700">
            User Directory
          </Link>
          <Link href="/logs" className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-xs font-bold shadow-lg shadow-purple-600/20">
            Audit Logs
          </Link>
        </div>
      </div>

      {/* API Governance & Data Management Layer (SIH Gap Requirement) */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-purple-600" />
            <span>Government Interoperability API Governance & Gateway</span>
          </h3>
          <span className="text-xs bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded font-bold font-mono">
            3 APIs Connected
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {apiEndpoints.map((api, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2 text-xs">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-900">{api.name}</span>
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded">{api.status}</span>
              </div>
              <p className="font-mono text-[11px] text-purple-700 font-semibold">{api.endpoint}</p>
              <div className="flex justify-between text-slate-500 pt-1 border-t border-slate-200 text-[10px]">
                <span>Rate Limit: {api.rateLimit}</span>
                <span>Auth: {api.auth}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid for User & Dataset Approvals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* User Requests */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Users className="h-5 w-5 text-purple-600" />
              <span>Pending Role Access Requests (Incl. Public Role)</span>
            </h3>
            <span className="text-xs bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full font-bold">
              {userRequests.length} Pending
            </span>
          </div>

          {userRequests.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center italic">No pending user approval requests.</p>
          ) : (
            <div className="space-y-3">
              {userRequests.map((u) => (
                <div key={u.id} className="p-3.5 border border-slate-200 rounded-lg bg-slate-50 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-xs text-slate-900">{u.name}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">{u.role} • {u.org}</p>
                    <p className="text-[10px] text-slate-400 font-mono">{u.email}</p>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => handleUserAction(u.id, "deny")}
                      className="px-2.5 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded text-xs font-bold transition-colors"
                    >
                      Deny
                    </button>
                    <button
                      onClick={() => handleUserAction(u.id, "approve")}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold transition-all shadow-sm"
                    >
                      Approve
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Dataset Data Governance Queue */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <Database className="h-5 w-5 text-emerald-600" />
              <span>Data Governance Dataset Ingestion Queue</span>
            </h3>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">
              {pendingDatasets.length} In Queue
            </span>
          </div>

          {pendingDatasets.length === 0 ? (
            <p className="text-xs text-slate-400 py-6 text-center italic">All datasets validated & indexed into PostGIS.</p>
          ) : (
            <div className="space-y-3">
              {pendingDatasets.map((d) => (
                <div key={d.id} className="p-3.5 border border-slate-200 rounded-lg bg-slate-50 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-xs text-slate-900">{d.title}</p>
                    <p className="text-[11px] text-slate-500 mt-0.5">Source Dept: {d.uploader} • State: {d.state}</p>
                    <div className="flex gap-2 mt-1">
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.2 rounded font-mono">{d.format}</span>
                      <span className="text-[10px] text-slate-400 font-mono">{d.size}</span>
                    </div>
                  </div>
                  <div className="flex space-x-1">
                    <button
                      onClick={() => rejectDataset(d.id)}
                      className="px-2.5 py-1 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded text-xs font-bold transition-colors"
                    >
                      Reject
                    </button>
                    <button
                      onClick={() => approveDataset(d.id)}
                      className="px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-bold transition-all shadow-sm"
                    >
                      Ingest DB
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

      {/* Live Audit Log Section */}
      <div className="bg-slate-900 rounded-xl p-6 border border-slate-800 shadow-xl space-y-3">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h3 className="text-sm font-bold text-amber-400 flex items-center gap-2">
            <Activity className="h-4 w-4" />
            <span>Live Audit Log Stream</span>
          </h3>
          <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-mono">
            ● Security Gateway Active
          </span>
        </div>

        <div className="font-mono text-xs text-slate-300 bg-slate-950 p-4 rounded-lg space-y-2 h-40 overflow-y-auto border border-slate-800">
          {auditLogs.slice(0, 5).map((log, idx) => (
            <p key={idx} className="leading-relaxed">
              <span className="text-emerald-400">[{log.timestamp}]</span> [{log.module}] {log.message}
            </p>
          ))}
        </div>
      </div>

    </div>
  );
}
