"use client";

import { 
  FileText, 
  Database, 
  Users, 
  TrendingUp, 
  ArrowRight, 
  Download, 
  RefreshCw, 
  Filter, 
  CheckCircle2, 
  ShieldCheck, 
  Map, 
  AlertTriangle,
  Lightbulb,
  Scale,
  Satellite,
  Sparkles
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from "recharts";
import { useState, useEffect } from "react";
import { useGlobalData } from "@/context/GlobalDataContext";
import { generateOfficialGovernmentPdf } from "@/utils/generatePdf";
import Link from "next/link";

const nationalLandMetrics = [
  { state: "Uttar Pradesh", parcels: 34200000, ulpinPct: 98.2, disputeResolved: 84.5 },
  { state: "Maharashtra", parcels: 28900000, ulpinPct: 96.7, disputeResolved: 89.1 },
  { state: "Madhya Pradesh", parcels: 22400000, ulpinPct: 94.1, disputeResolved: 91.2 },
  { state: "Gujarat", parcels: 19800000, ulpinPct: 97.4, disputeResolved: 93.0 },
  { state: "Tamil Nadu", parcels: 18400000, ulpinPct: 92.8, disputeResolved: 87.4 },
  { state: "Rajasthan", parcels: 21100000, ulpinPct: 91.5, disputeResolved: 82.0 },
];

const landUseTrendData = [
  { year: "2019", netSownArea: 140.1, forestCover: 71.2, nonAgriUrban: 26.4, fallowLand: 24.8 },
  { year: "2020", netSownArea: 139.8, forestCover: 71.4, nonAgriUrban: 27.1, fallowLand: 24.5 },
  { year: "2021", netSownArea: 139.5, forestCover: 71.8, nonAgriUrban: 28.0, fallowLand: 24.1 },
  { year: "2022", netSownArea: 139.2, forestCover: 72.1, nonAgriUrban: 28.9, fallowLand: 23.8 },
  { year: "2023", netSownArea: 138.9, forestCover: 72.4, nonAgriUrban: 29.8, fallowLand: 23.4 },
  { year: "2024", netSownArea: 138.5, forestCover: 72.8, nonAgriUrban: 30.7, fallowLand: 23.0 },
];

export default function MinistryDashboard() {
  const { stats } = useGlobalData();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedState, setSelectedState] = useState("All");
  const [message, setMessage] = useState("");

  useEffect(() => setIsMounted(true), []);

  const handleExportReport = () => {
    generateOfficialGovernmentPdf({
      title: "NATIONAL LAND GOVERNANCE & DILRMP EXECUTIVE BRIEF 2026",
      reportId: `DOLR-EXEC-${Date.now().toString().substring(6)}`,
      category: "National Policy Overview",
      signatory: "Joint Secretary, Department of Land Resources",
      sections: [
        {
          heading: "1. Key Performance Indicators",
          content: `Total ULPIN Bhu-Aadhar assigned land parcels stands at 18.42 Crore across 28 States & UTs. Data Lake currently holds ${stats.approvedDatasets} fully validated datasets. Active innovation grant proposals count: ${stats.totalProposals}.`
        },
        {
          heading: "2. Climate Resilience & Dispute Mitigation",
          content: "National Climate Vulnerability Resilience score stands at 78.4/100. Average court dispute resolution turn-around duration reduced to 42 days under NGDDRS."
        }
      ],
      tableData: {
        headers: ["State Name", "Digitized Parcels", "ULPIN Coverage %", "Dispute Resolution %"],
        rows: nationalLandMetrics.map(m => [m.state, (m.parcels / 10000000).toFixed(2) + " Cr", m.ulpinPct + "%", m.disputeResolved + "%"])
      }
    });

    setMessage("✅ Official DoLR National Land Governance PDF generated and downloaded!");
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-white flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-md">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] uppercase tracking-wider font-bold bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded">
              NATIONAL POLICY DASHBOARD
            </span>
            <span className="text-xs text-slate-400">DoLR • Ministry of Rural Development</span>
          </div>
          <h1 className="text-2xl font-black mt-1 text-white tracking-tight">
            National Land Records & Policy Analytics Portal
          </h1>
          <p className="text-xs text-slate-300 mt-1">
            Real-time synthesis of DILRMP progress, ULPIN (Bhu-Aadhar) coverage, dispute stats, and climate resilience indices.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <select 
            value={selectedState} 
            onChange={(e) => setSelectedState(e.target.value)}
            className="bg-slate-800 border border-slate-700 text-slate-200 text-xs rounded-lg px-3 py-2 font-medium focus:ring-2 focus:ring-amber-500"
          >
            <option value="All">All India (28 States & 8 UTs)</option>
            <option value="UP">Uttar Pradesh</option>
            <option value="MH">Maharashtra</option>
            <option value="MP">Madhya Pradesh</option>
            <option value="GJ">Gujarat</option>
            <option value="TN">Tamil Nadu</option>
          </select>

          <button 
            onClick={handleExportReport}
            className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-lg shadow-amber-500/10"
          >
            <Download className="h-4 w-4" />
            <span>Export Official PDF Report</span>
          </button>
        </div>
      </div>

      {message && (
        <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs font-semibold flex items-center justify-between">
          <span>{message}</span>
          <button onClick={() => setMessage("")} className="text-emerald-600 hover:underline">Dismiss</button>
        </div>
      )}

      {/* 5 Core Feature Navigation Shortcuts */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        
        {/* 1. Climate Resilience */}
        <Link 
          href="/climate-resilience"
          className="bg-white hover:bg-emerald-50/60 p-3.5 rounded-xl border border-slate-200 hover:border-emerald-400 shadow-sm transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-emerald-700">Resilience</span>
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-2">
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-emerald-700">Climate & Land Resilience</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Flood, Drought, Heat & Salinity Models</p>
          </div>
          <span className="text-[10px] font-bold text-emerald-600 mt-2 flex items-center gap-0.5">
            Launch Dashboard →
          </span>
        </Link>

        {/* 2. Land Disputes */}
        <Link 
          href="/land-disputes"
          className="bg-white hover:bg-rose-50/60 p-3.5 rounded-xl border border-slate-200 hover:border-rose-400 shadow-sm transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-rose-700">Intelligence</span>
            <Scale className="h-4 w-4 text-rose-600" />
          </div>
          <div className="mt-2">
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-rose-700">Land Dispute Analytics</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">District Caseloads & 42-day Turnaround</p>
          </div>
          <span className="text-[10px] font-bold text-rose-600 mt-2 flex items-center gap-0.5">
            Track Disputes →
          </span>
        </Link>

        {/* 3. Remote Sensing */}
        <Link 
          href="/remote-sensing"
          className="bg-white hover:bg-cyan-50/60 p-3.5 rounded-xl border border-slate-200 hover:border-cyan-400 shadow-sm transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-cyan-700">ISRO SAC</span>
            <Satellite className="h-4 w-4 text-cyan-600" />
          </div>
          <div className="mt-2">
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-cyan-700">Earth Observation (RS)</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Ahmedabad 2018-2026 Urban Sprawl</p>
          </div>
          <span className="text-[10px] font-bold text-cyan-600 mt-2 flex items-center gap-0.5">
            View Satellite →
          </span>
        </Link>

        {/* 4. Innovation Hub */}
        <Link 
          href="/innovation"
          className="bg-white hover:bg-amber-50/60 p-3.5 rounded-xl border border-slate-200 hover:border-amber-400 shadow-sm transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-amber-700">Pillar 15</span>
            <Lightbulb className="h-4 w-4 text-amber-600" />
          </div>
          <div className="mt-2">
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-amber-700">National Innovation Hub</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">Grants, Hackathons & Pilot Sandboxes</p>
          </div>
          <span className="text-[10px] font-bold text-amber-600 mt-2 flex items-center gap-0.5">
            Explore Hub →
          </span>
        </Link>

        {/* 5. Evidence-Backed AI Engine */}
        <Link 
          href="/research"
          className="bg-white hover:bg-blue-50/60 p-3.5 rounded-xl border border-slate-200 hover:border-blue-400 shadow-sm transition-all group flex flex-col justify-between"
        >
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase text-blue-700">Multi-RAG</span>
            <Sparkles className="h-4 w-4 text-blue-600" />
          </div>
          <div className="mt-2">
            <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-700">Evidence-Backed AI</h4>
            <p className="text-[10px] text-slate-500 mt-0.5">4-Silo RAG with Exact Citations [1-4]</p>
          </div>
          <span className="text-[10px] font-bold text-blue-600 mt-2 flex items-center gap-0.5">
            Query AI →
          </span>
        </Link>

      </div>

      {/* KPI Cards including Climate Resilience & Land Dispute Statistics (SIH Gap Requirements) */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {[
          { name: "Integrated Data Lake Datasets", value: `${stats.approvedDatasets} Synced`, icon: Database, note: "PostGIS Store" },
          { name: "DILRMP Cadastral Maps", value: "96.8%", icon: FileText, note: "5,82,000 Villages" },
          { name: "Land Dispute Resolution Rate", value: "88.4%", icon: TrendingUp, note: "Avg 42 Days (NGDDRS)" },
          { name: "Climate Resilience Index", value: "78.4 / 100", icon: ShieldCheck, note: "Soil & Salinity Risk" },
          { name: "Innovation Pilot Grants", value: `${stats.totalProposals} Active`, icon: Users, note: "Research Grants" },
        ].map((stat) => (
          <div key={stat.name} className="relative overflow-hidden rounded-xl bg-white p-4 shadow-sm border border-slate-200 hover:border-amber-400 transition-all">
            <dt className="flex items-center justify-between">
              <span className="text-xs font-medium text-slate-500 truncate">{stat.name}</span>
              <div className="rounded-lg bg-amber-50 p-1.5 border border-amber-100 shrink-0">
                <stat.icon className="h-4 w-4 text-amber-600" aria-hidden="true" />
              </div>
            </dt>
            <dd className="mt-2">
              <p className="text-xl font-bold text-slate-900 tracking-tight">{stat.value}</p>
              <p className="text-[10px] text-slate-500 mt-0.5 font-mono">{stat.note}</p>
            </dd>
          </div>
        ))}
      </div>

      {/* Mini GIS Spatial Insights Map Banner (SIH Gap Requirement) */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-blue-500/30 rounded-xl p-5 text-white flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center space-x-2">
            <Map className="h-5 w-5 text-blue-400" />
            <span className="font-bold text-sm text-white">Geospatial GIS Insights & Layered Spatial Analytics</span>
          </div>
          <p className="text-xs text-slate-300">
            View multi-layer GIS spatial maps including Cadastral Boundaries, Sentinel-2 Remote Sensing, Infrastructure, and Coastal Climate Risk overlays.
          </p>
        </div>

        <Link href="/gis" className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg text-xs font-bold transition-all shadow-lg shadow-blue-600/20 shrink-0 flex items-center gap-1.5">
          <span>Open GIS Spatial Map Viewer</span>
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        
        {/* Chart 1: Land Use Transition */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">National Land-Use Transition Trends</h3>
              <p className="text-xs text-slate-500">Area in Million Hectares (Mha) from 2019 to 2024</p>
            </div>
            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-1 rounded font-semibold">DoLR Survey Data</span>
          </div>

          <div className="h-72 w-full">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={landUseTrendData} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.05)' }} />
                  <Line type="monotone" dataKey="netSownArea" stroke="#10b981" strokeWidth={2.5} dot={{ r: 4 }} name="Net Sown Agri Area (Mha)" />
                  <Line type="monotone" dataKey="forestCover" stroke="#059669" strokeWidth={2.5} dot={{ r: 4 }} name="Forest Cover (Mha)" />
                  <Line type="monotone" dataKey="nonAgriUrban" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4 }} name="Non-Agri Built-up (Mha)" />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Chart 2: State-wise ULPIN Progress & Dispute Statistics */}
        <div className="rounded-xl bg-white p-6 shadow-sm border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">State Land Dispute & ULPIN Coverage Stats</h3>
              <p className="text-xs text-slate-500">ULPIN Coverage (%) & Land Dispute Resolution Rate (%)</p>
            </div>
            <span className="text-[10px] bg-amber-50 text-amber-700 px-2 py-1 rounded font-semibold border border-amber-200">Live API</span>
          </div>

          <div className="h-72 w-full">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={nationalLandMetrics} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="state" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} domain={[70, 100]} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                  <Bar dataKey="ulpinPct" fill="#f59e0b" name="ULPIN Coverage %" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="disputeResolved" fill="#10b981" name="Dispute Resolved %" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

      </div>

    </div>
  );
}
