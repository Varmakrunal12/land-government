"use client";

import { FileText, Map, Database, Activity, Upload, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const stateDistrictData: Record<string, Array<{ district: string; parcels: string; ulpinPct: number; maps: string; status: string }>> = {
  "Maharashtra": [
    { district: "Pune District", parcels: "4,250,000", ulpinPct: 98.4, maps: "Vector GeoJSON", status: "100% Synced" },
    { district: "Nagpur District", parcels: "3,120,000", ulpinPct: 96.2, maps: "Vector GeoJSON", status: "Synced" },
    { district: "Nashik District", parcels: "2,840,000", ulpinPct: 94.8, maps: "Processing AI", status: "Verification" },
    { district: "Thane District", parcels: "3,890,000", ulpinPct: 97.1, maps: "Vector GeoJSON", status: "100% Synced" },
  ],
  "Uttar Pradesh": [
    { district: "Lucknow District", parcels: "5,100,000", ulpinPct: 99.1, maps: "Vector GeoJSON", status: "100% Synced" },
    { district: "Varanasi District", parcels: "3,850,000", ulpinPct: 97.8, maps: "Vector GeoJSON", status: "100% Synced" },
    { district: "Kanpur Nagar", parcels: "4,200,000", ulpinPct: 95.4, maps: "Processing AI", status: "Verification" },
  ],
  "Gujarat": [
    { district: "Ahmedabad District", parcels: "3,950,000", ulpinPct: 98.8, maps: "Vector GeoJSON", status: "100% Synced" },
    { district: "Surat District", parcels: "3,600,000", ulpinPct: 97.5, maps: "Vector GeoJSON", status: "100% Synced" },
    { district: "Kutch District", parcels: "2,980,000", ulpinPct: 93.4, maps: "Processing AI", status: "Verification" },
  ]
};

export default function StateDashboard() {
  const [selectedState, setSelectedState] = useState("Maharashtra");

  const districts = stateDistrictData[selectedState] || stateDistrictData["Maharashtra"];

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
              STATE REVENUE & LAND RECORDS PORTAL
            </span>
            <span className="text-xs text-slate-400">Department of Land Resources</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            {selectedState} State Land Governance Console
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Manage cadastral map digitization, Bhu-Aadhar (ULPIN) generation, data lake ingestion, and DILRMP district progress tracking.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-amber-300 text-xs rounded-lg px-3 py-2 font-bold focus:ring-2 focus:ring-amber-500"
          >
            <option value="Maharashtra">State: Maharashtra</option>
            <option value="Uttar Pradesh">State: Uttar Pradesh</option>
            <option value="Gujarat">State: Gujarat</option>
          </select>

          <Link
            href="/upload"
            className="flex items-center space-x-2 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-lg shadow-emerald-600/20"
          >
            <Upload className="h-4 w-4" />
            <span>Ingest Datasets</span>
          </Link>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { name: "Total Land Parcels", value: "1.84 Crore", icon: Map, color: "text-emerald-600", bg: "bg-emerald-100", note: "Bhu-Aadhar Assigned" },
          { name: "Cadastral Geo-reference", value: "97.4%", icon: Database, color: "text-blue-600", bg: "bg-blue-100", note: "Vector OGC Layers" },
          { name: "Pending Mutation Apps", value: "1,240", icon: Activity, color: "text-amber-600", bg: "bg-amber-100", note: "Avg 48hr Resolution" },
          { name: "DILRMP Implementation", value: "Active", icon: CheckCircle2, color: "text-purple-600", bg: "bg-purple-100", note: "Phase 4 Rollout" },
        ].map((stat) => (
          <div key={stat.name} className="relative overflow-hidden rounded-xl bg-white p-5 shadow-sm border border-slate-200">
            <dt className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500">{stat.name}</span>
              <div className={`rounded-lg ${stat.bg} p-2`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} aria-hidden="true" />
              </div>
            </dt>
            <dd className="mt-2">
              <p className="text-2xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
              <p className="text-[11px] text-slate-500 mt-0.5 font-medium">{stat.note}</p>
            </dd>
          </div>
        ))}
      </div>

      {/* District Progress Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h3 className="text-base font-bold text-slate-900">District-wise Cadastral & ULPIN Sync Status</h3>
            <p className="text-xs text-slate-500">Live progress feed from {selectedState} State Data Lake</p>
          </div>
          <span className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full font-semibold">
            {districts.length} Active Districts Listed
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="text-left text-xs font-bold text-slate-600 uppercase tracking-wider py-3 px-4">District Name</th>
                <th className="text-left text-xs font-bold text-slate-600 uppercase tracking-wider py-3 px-4">Total Parcels</th>
                <th className="text-left text-xs font-bold text-slate-600 uppercase tracking-wider py-3 px-4">ULPIN Coverage %</th>
                <th className="text-left text-xs font-bold text-slate-600 uppercase tracking-wider py-3 px-4">Cadastral Format</th>
                <th className="text-left text-xs font-bold text-slate-600 uppercase tracking-wider py-3 px-4">Sync Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {districts.map((d, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-4 text-xs font-bold text-slate-900">{d.district}</td>
                  <td className="py-4 px-4 text-xs font-medium text-slate-700">{d.parcels}</td>
                  <td className="py-4 px-4 text-xs font-bold text-emerald-600">{d.ulpinPct}%</td>
                  <td className="py-4 px-4 text-xs text-slate-600"><span className="bg-slate-100 px-2 py-0.5 rounded font-mono text-[10px]">{d.maps}</span></td>
                  <td className="py-4 px-4">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${d.status === "100% Synced" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
