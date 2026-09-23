"use client";

import { 
  Scale, 
  AlertTriangle, 
  TrendingUp, 
  MapPin, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Download, 
  ShieldAlert, 
  FileText, 
  Layers, 
  ArrowRight,
  ShieldCheck,
  Search,
  ChevronRight,
  Building,
  Gavel
} from "lucide-react";
import { useState, useEffect } from "react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  PieChart, 
  Pie, 
  Cell, 
  LineChart, 
  Line, 
  Legend 
} from "recharts";
import Link from "next/link";
import { generateOfficialGovernmentPdf } from "@/utils/generatePdf";

// District Dispute Caseload Records
interface DistrictDisputeRecord {
  district: string;
  state: string;
  totalCases: number;
  resolvedCases: number;
  resolutionRate: number; // %
  avgResolutionDays: number;
  dominantType: string;
  riskLevel: "Critical" | "High" | "Moderate" | "Low";
  ulpinAssignedPct: number;
  hotspotCircle: string;
  aiRemediation: string;
}

const districtDisputeData: DistrictDisputeRecord[] = [
  {
    district: "Ahmedabad Peri-Urban",
    state: "Gujarat",
    totalCases: 28400,
    resolvedCases: 26120,
    resolutionRate: 92.0,
    avgResolutionDays: 38,
    dominantType: "Boundary Encroachment (Sanand & SG Highway)",
    riskLevel: "High",
    ulpinAssignedPct: 98.2,
    hotspotCircle: "Sanand & Daskroi Revenue Circles",
    aiRemediation: "Automate drone orthophoto boundary matching before issuing non-agricultural conversion certificate."
  },
  {
    district: "Surat",
    state: "Gujarat",
    totalCases: 24100,
    resolvedCases: 22410,
    resolutionRate: 93.0,
    avgResolutionDays: 34,
    dominantType: "Inheritance & Co-sharer Partition",
    riskLevel: "Moderate",
    ulpinAssignedPct: 97.4,
    hotspotCircle: "Olpad & Chorasi Industrial Zone",
    aiRemediation: "Integrate Bhu-Aadhar inheritance tree validation to prevent unnotified co-sharer transfers."
  },
  {
    district: "Kutch",
    state: "Gujarat",
    totalCases: 19800,
    resolvedCases: 16830,
    resolutionRate: 85.0,
    avgResolutionDays: 52,
    dominantType: "Grazing / Commons (Gochar) Encroachment",
    riskLevel: "Critical",
    ulpinAssignedPct: 91.5,
    hotspotCircle: "Bhuj Rural & Gandhidham Port Fringe",
    aiRemediation: "Deploy satellite SAR temporal change detection on government wasteland & common grazing buffers."
  },
  {
    district: "Banaskantha",
    state: "Gujarat",
    totalCases: 16500,
    resolvedCases: 14680,
    resolutionRate: 89.0,
    avgResolutionDays: 44,
    dominantType: "Survey Boundary Discrepancies",
    riskLevel: "Moderate",
    ulpinAssignedPct: 94.8,
    hotspotCircle: "Palanpur & Deesa Agri Belt",
    aiRemediation: "Establish CORS network differential GPS ground control points to recalibrate old revenue survey sheets."
  },
  {
    district: "Pune",
    state: "Maharashtra",
    totalCases: 36200,
    resolvedCases: 32210,
    resolutionRate: 89.0,
    avgResolutionDays: 41,
    dominantType: "Multiple Sales / Fraudulent Mutation",
    riskLevel: "Critical",
    ulpinAssignedPct: 96.8,
    hotspotCircle: "Haveli & Mulshi Talukas",
    aiRemediation: "Mandate real-time NGDDRS biometric deed authentication tied to 14-digit ULPIN spatial lock."
  },
  {
    district: "Varanasi",
    state: "Uttar Pradesh",
    totalCases: 31400,
    resolvedCases: 27940,
    resolutionRate: 89.0,
    avgResolutionDays: 46,
    dominantType: "Inheritance Partition Litigation",
    riskLevel: "High",
    ulpinAssignedPct: 95.2,
    hotspotCircle: "Pindra & Sadar Tehsils",
    aiRemediation: "Enable fast-track e-Court Lok Adalat hearings using certified GIS spatial boundary affidavits."
  },
  {
    district: "Indore",
    state: "Madhya Pradesh",
    totalCases: 21200,
    resolvedCases: 19500,
    resolutionRate: 92.0,
    avgResolutionDays: 36,
    dominantType: "Boundary Encroachment in Outer Ring",
    riskLevel: "Moderate",
    ulpinAssignedPct: 96.1,
    hotspotCircle: "Sanwer & Depalpur Circles",
    aiRemediation: "Activate automatic spatial buffer alert whenever building permission overlaps adjacent khasra."
  }
];

// Dispute Types Categorization
const disputeTypesData = [
  { name: "Boundary Encroachment & Survey Errors", value: 38, count: "1,46,110", color: "#f59e0b" },
  { name: "Inheritance & Co-sharer Partition", value: 27, count: "1,03,820", color: "#3b82f6" },
  { name: "Fraudulent Sale & Multiple Mutation", value: 16, count: "61,520", color: "#ef4444" },
  { name: "Tenancy & Agri Land Alienation", value: 12, count: "46,140", color: "#8b5cf6" },
  { name: "Common / Grazing (Gochar) Land Encroachment", value: 7, count: "26,930", color: "#10b981" },
];

// 5-Year Pre vs Post-ULPIN Trend
const disputeTrendData = [
  { year: "2020 (Pre-ULPIN)", totalDisputes: 580000, resolved: 268000, resolutionPct: 46.2, avgDays: 240 },
  { year: "2021", totalDisputes: 540000, resolved: 312000, resolutionPct: 57.8, avgDays: 185 },
  { year: "2022 (DILRMP Rollout)", totalDisputes: 490000, resolved: 348000, resolutionPct: 71.0, avgDays: 120 },
  { year: "2023", totalDisputes: 450000, resolved: 365000, resolutionPct: 81.1, avgDays: 84 },
  { year: "2024", totalDisputes: 410000, resolved: 356000, resolutionPct: 86.8, avgDays: 56 },
  { year: "2026 (ULPIN Single-Truth)", totalDisputes: 384520, resolved: 339915, resolutionPct: 88.4, avgDays: 42 },
];

export default function LandDisputeAnalyticsPage() {
  const [selectedState, setSelectedState] = useState<string>("All");
  const [searchDistrict, setSearchDistrict] = useState<string>("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const filteredDistricts = districtDisputeData.filter(d => {
    const matchesState = selectedState === "All" || d.state === selectedState;
    const matchesSearch = d.district.toLowerCase().includes(searchDistrict.toLowerCase()) || d.hotspotCircle.toLowerCase().includes(searchDistrict.toLowerCase());
    return matchesState && matchesSearch;
  });

  const handleExportPdf = () => {
    generateOfficialGovernmentPdf({
      title: "NATIONAL LAND DISPUTE INTELLIGENCE & RESOLUTION AUDIT 2026",
      reportId: `DOLR-DISP-${Date.now().toString().substring(6)}`,
      category: "Land Dispute Analytics & e-Courts Integration",
      signatory: "Registrar General of Land Records & Dispute Mitigation, DoLR",
      sections: [
        {
          heading: "1. National Dispute Statistics Executive Summary",
          content: "Total tracked active land disputes across monitored revenue circles stand at 3,84,520 cases with a nationwide resolution rate of 88.4%. Implementation of 14-digit ULPIN (Bhu-Aadhar) has reduced average litigation turnaround from 240 days down to 42 days."
        },
        {
          heading: "2. Typology of Land Disputes",
          content: "Boundary Encroachment and Survey Discrepancies constitute 38% of all filings, followed by Inheritance/Co-sharer Partition at 27%, and Fraudulent Sales/Multiple Registrations at 16%."
        },
        {
          heading: "3. Hotspot Interventions & AI Preventative Recommendations",
          content: "Pre-emptive AI spatial validation algorithms have flagged 1,420 high-risk overlaps in peri-urban belts (notably Sanand, Mulshi, Pindra). Automated GIS boundary locks before mutation have arrested title fraud by 78.4%."
        }
      ],
      tableData: {
        headers: ["District", "Total Cases", "Resolved Cases", "Resolution %", "Avg Days", "Primary Cause"],
        rows: districtDisputeData.map(d => [d.district, d.totalCases.toLocaleString(), d.resolvedCases.toLocaleString(), `${d.resolutionRate}%`, `${d.avgResolutionDays} Days`, d.dominantType.split("(")[0]])
      }
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider bg-rose-500/20 text-rose-400 border border-rose-500/30 px-2 py-0.5 rounded">
              SIH PROBLEM STATEMENT — LAND DISPUTES INTELLIGENCE
            </span>
            <span className="text-xs text-slate-400">DoLR • Ministry of Rural Development • e-Courts</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>⚖️ Land Dispute Analytics & Intelligence</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Real-time analytics on land dispute volume, district-wise caseloads, typological classification, pre/post ULPIN resolution rates, and high-risk hotspot mitigation.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/gis"
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
          >
            <Layers className="h-4 w-4 text-amber-400" />
            <span>Dispute GIS Overlay</span>
          </Link>
          <button
            onClick={handleExportPdf}
            className="flex items-center space-x-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-amber-500/10"
          >
            <Download className="h-4 w-4" />
            <span>Export Dispute Intelligence Audit</span>
          </button>
        </div>
      </div>

      {/* Required Progression Flow Bar (SIH PS Requirement) */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-rose-500/40 rounded-xl p-4 text-white shadow-md">
        <span className="text-[10px] font-bold uppercase tracking-wider text-rose-400 block mb-2">
          LAND DISPUTE INTELLIGENCE & RESOLUTION WORKFLOW:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center text-xs">
          {[
            { step: "1. Total Disputes", desc: "3,84,520 Tracked Cases", color: "bg-slate-800/80 text-white border-slate-700" },
            { step: "2. District-wise", desc: "Caseload Heat Ranking", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
            { step: "3. Dispute Type", desc: "5 Categorical Classes", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
            { step: "4. Trend Analysis", desc: "5-Year Resolution Shift", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
            { step: "5. Resolution Rate", desc: "88.4% (42-Day SLA)", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-bold" },
            { step: "6. High-risk Areas", desc: "AI Alert & Spatial Lock", color: "bg-rose-500/20 text-rose-300 border-rose-500/30 font-bold" },
          ].map((item, idx) => (
            <div key={idx} className={`p-2.5 rounded-lg border flex flex-col justify-center ${item.color}`}>
              <span className="font-bold text-xs">{item.step}</span>
              <span className="text-[10px] opacity-80 mt-0.5">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 4 Executive KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Total Disputes */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase">Total Tracked Disputes</span>
            <div className="p-1.5 bg-rose-50 rounded-lg text-rose-600">
              <Gavel className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-slate-900">3,84,520</p>
          <p className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
            <TrendingUp className="h-3 w-3" />
            <span>Down 33.7% from 2020 peak</span>
          </p>
        </div>

        {/* Resolution Rate */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase">Dispute Resolution Rate</span>
            <div className="p-1.5 bg-emerald-50 rounded-lg text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-emerald-600">88.4%</p>
          <p className="text-[10px] text-slate-500 font-mono">3,39,915 cases settled via e-Courts</p>
        </div>

        {/* Turnaround Time */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase">Avg Resolution Turnaround</span>
            <div className="p-1.5 bg-amber-50 rounded-lg text-amber-600">
              <Clock className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-amber-600">42 Days</p>
          <p className="text-[10px] text-slate-500 font-mono">Reduced from 240 days (Pre-ULPIN)</p>
        </div>

        {/* Pre-emptive AI Flags */}
        <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-1">
          <div className="flex items-center justify-between text-slate-500">
            <span className="text-xs font-bold uppercase">AI Pre-Emptive Flags</span>
            <div className="p-1.5 bg-purple-50 rounded-lg text-purple-600">
              <ShieldAlert className="h-4 w-4" />
            </div>
          </div>
          <p className="text-2xl font-black text-purple-600">1,420 Parcels</p>
          <p className="text-[10px] text-slate-500 font-mono">Boundary overlap locked before mutation</p>
        </div>

      </div>

      {/* Charts Grid: Typology & Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Pie Chart: Dispute Types (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Typology of Land Disputes (National)</h3>
              <p className="text-xs text-slate-500">Classification of 3.84 Lakh active litigation cases</p>
            </div>
            <span className="text-[10px] bg-amber-50 text-amber-800 px-2 py-0.5 rounded font-bold">e-Courts AI</span>
          </div>

          <div className="h-60 w-full flex items-center justify-center">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={disputeTypesData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {disputeTypesData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val: any) => [`${val}% of Total`, 'Share']} contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="space-y-1.5 text-xs">
            {disputeTypesData.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-1.5 rounded hover:bg-slate-50">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                  <span className="text-slate-700 font-medium truncate max-w-[200px]">{item.name}</span>
                </div>
                <div className="flex items-center gap-2 font-mono">
                  <span className="text-slate-400 text-[11px]">{item.count}</span>
                  <span className="font-bold text-slate-900">{item.value}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Line Chart: 5-Year Resolution Trend & Pre/Post ULPIN (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900">5-Year Land Dispute Trajectory & ULPIN Impact</h3>
              <p className="text-xs text-slate-500">Total Registered Disputes vs. Resolution Rate (%)</p>
            </div>
            <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">DILRMP Benchmark</span>
          </div>

          <div className="h-72 w-full">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={disputeTrendData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                  <YAxis yAxisId="left" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 10 }} />
                  <YAxis yAxisId="right" orientation="right" axisLine={false} tickLine={false} tick={{ fill: '#059669', fontSize: 10 }} domain={[30, 100]} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Line yAxisId="left" type="monotone" dataKey="totalDisputes" stroke="#ef4444" strokeWidth={2.5} name="Total Disputes Registered" dot={{ r: 4 }} />
                  <Line yAxisId="left" type="monotone" dataKey="resolved" stroke="#3b82f6" strokeWidth={2.5} name="Resolved Cases" dot={{ r: 4 }} />
                  <Line yAxisId="right" type="monotone" dataKey="resolutionPct" stroke="#10b981" strokeWidth={3} name="Resolution Rate (%)" dot={{ r: 5 }} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>

          <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 text-xs text-emerald-900 flex items-center justify-between">
            <span className="font-semibold">💡 Impact Finding: ULPIN assignment slashed average resolution duration from 240 days down to 42 days.</span>
          </div>
        </div>

      </div>

      {/* District-wise Drilldown & High-Risk Areas Table */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <ShieldAlert className="h-5 w-5 text-rose-600" />
              <span>District-Wise Land Dispute Intelligence & High-Risk Hotspot Clusters</span>
            </h3>
            <p className="text-xs text-slate-500">Live caseload monitoring, primary dispute types, and automated AI remediation instructions</p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-rose-500"
            >
              <option value="All">All States</option>
              <option value="Gujarat">Gujarat</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Uttar Pradesh">Uttar Pradesh</option>
              <option value="Madhya Pradesh">Madhya Pradesh</option>
            </select>

            <div className="relative">
              <Search className="absolute left-2.5 top-2 h-3.5 w-3.5 text-slate-400" />
              <input
                type="text"
                value={searchDistrict}
                onChange={(e) => setSearchDistrict(e.target.value)}
                placeholder="Filter district or circle..."
                className="bg-slate-50 border border-slate-300 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-900 focus:ring-2 focus:ring-rose-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Table View */}
        <div className="overflow-x-auto">
          <table className="min-w-full text-xs text-left">
            <thead className="bg-slate-50 text-slate-600 font-bold border-b border-slate-200 uppercase text-[10px]">
              <tr>
                <th className="py-2.5 px-3">District / State</th>
                <th className="py-2.5 px-3">Total Cases</th>
                <th className="py-2.5 px-3">Resolution Rate</th>
                <th className="py-2.5 px-3">Avg Days</th>
                <th className="py-2.5 px-3">ULPIN Coverage</th>
                <th className="py-2.5 px-3">High-Risk Circle Hotspot</th>
                <th className="py-2.5 px-3">AI Automated Remediation Mandate</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-sans">
              {filteredDistricts.map((d, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-3 px-3">
                    <span className="font-bold text-slate-900 block">{d.district}</span>
                    <span className="text-[10px] text-slate-500">{d.state}</span>
                  </td>
                  <td className="py-3 px-3 font-mono font-bold text-slate-800">
                    {d.totalCases.toLocaleString()}
                  </td>
                  <td className="py-3 px-3">
                    <span className="font-mono font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded">
                      {d.resolutionRate}%
                    </span>
                  </td>
                  <td className="py-3 px-3 font-mono text-slate-700">
                    {d.avgResolutionDays} Days
                  </td>
                  <td className="py-3 px-3 font-mono text-blue-700 font-semibold">
                    {d.ulpinAssignedPct}%
                  </td>
                  <td className="py-3 px-3">
                    <span className="text-rose-700 font-semibold block">{d.hotspotCircle}</span>
                    <span className="text-[10px] text-slate-500">{d.dominantType}</span>
                  </td>
                  <td className="py-3 px-3 max-w-xs text-slate-600 leading-relaxed bg-slate-50/50 rounded p-2">
                    {d.aiRemediation}
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
