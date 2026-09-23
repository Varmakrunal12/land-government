"use client";

import { 
  ShieldCheck, 
  CloudRain, 
  Sun, 
  Flame, 
  AlertTriangle, 
  Activity, 
  Layers, 
  Sliders, 
  TrendingUp, 
  MapPin, 
  Download, 
  CheckCircle2, 
  ArrowRight,
  Info,
  Droplets,
  Trees,
  Waves
} from "lucide-react";
import { useState, useEffect } from "react";
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip,
  BarChart,
  Bar
} from "recharts";
import Link from "next/link";
import { generateOfficialGovernmentPdf } from "@/utils/generatePdf";

// District-level Climate & Land Resilience Dataset
interface DistrictClimateData {
  id: string;
  name: string;
  state: string;
  climateRisk: number; // 0-100
  floodRisk: number; // 0-100
  droughtRisk: number; // 0-100
  heatStress: number; // Surface temp in C or Index
  heatIndex: number; // 0-100
  landVulnerability: number; // 0-100
  soilSalinityEC: number; // dS/m
  groundwaterDepletion: number; // m/year
  resilienceScore: number; // 0-100 (higher is better)
  vulnerabilityCategory: "Critical" | "High" | "Moderate" | "Resilient";
  recommendedAction: string;
}

const districtData: DistrictClimateData[] = [
  {
    id: "kutch",
    name: "Kutch",
    state: "Gujarat",
    climateRisk: 86,
    floodRisk: 34,
    droughtRisk: 92,
    heatStress: 44.2,
    heatIndex: 88,
    landVulnerability: 84,
    soilSalinityEC: 7.2,
    groundwaterDepletion: 1.8,
    resilienceScore: 52,
    vulnerabilityCategory: "Critical",
    recommendedAction: "Desalination buffer bunds, saline-resistant halophyte agro-forestry, and drought-tolerant solar micro-grids."
  },
  {
    id: "banaskantha",
    name: "Banaskantha",
    state: "Gujarat",
    climateRisk: 78,
    floodRisk: 52,
    droughtRisk: 84,
    heatStress: 42.8,
    heatIndex: 80,
    landVulnerability: 76,
    soilSalinityEC: 3.4,
    groundwaterDepletion: 2.4,
    resilienceScore: 61,
    vulnerabilityCategory: "High",
    recommendedAction: "Groundwater recharge percolation shaft mandate & micro-irrigation drip subsidies across 14 talukas."
  },
  {
    id: "ahmedabad",
    name: "Ahmedabad Peri-Urban",
    state: "Gujarat",
    climateRisk: 72,
    floodRisk: 68,
    droughtRisk: 42,
    heatStress: 45.1,
    heatIndex: 94,
    landVulnerability: 70,
    soilSalinityEC: 2.1,
    groundwaterDepletion: 1.6,
    resilienceScore: 66,
    vulnerabilityCategory: "High",
    recommendedAction: "Urban Heat Island cooling green corridors, Sponge City wetland preservation along Sabarmati catchment."
  },
  {
    id: "bharuch",
    name: "Bharuch (Coastal)",
    state: "Gujarat",
    climateRisk: 82,
    floodRisk: 88,
    droughtRisk: 32,
    heatStress: 39.5,
    heatIndex: 68,
    landVulnerability: 81,
    soilSalinityEC: 8.6,
    groundwaterDepletion: 0.9,
    resilienceScore: 58,
    vulnerabilityCategory: "Critical",
    recommendedAction: "Narmada estuary flood bund reinforcement, mangrove belt afforestation, and sea-surge storm barriers."
  },
  {
    id: "surat",
    name: "Surat",
    state: "Gujarat",
    climateRisk: 64,
    floodRisk: 82,
    droughtRisk: 24,
    heatStress: 38.6,
    heatIndex: 62,
    landVulnerability: 58,
    soilSalinityEC: 4.2,
    groundwaterDepletion: 0.7,
    resilienceScore: 74,
    vulnerabilityCategory: "Moderate",
    recommendedAction: "Tapi river sluice gate modernization & urban flood drainage zoning buffers."
  },
  {
    id: "surendranagar",
    name: "Surendranagar",
    state: "Gujarat",
    climateRisk: 75,
    floodRisk: 40,
    droughtRisk: 86,
    heatStress: 43.4,
    heatIndex: 82,
    landVulnerability: 74,
    soilSalinityEC: 5.1,
    groundwaterDepletion: 1.9,
    resilienceScore: 63,
    vulnerabilityCategory: "High",
    recommendedAction: "Narmada branch canal tail-end moisture retention & dryland horticulture development."
  },
  {
    id: "pune",
    name: "Pune Rural",
    state: "Maharashtra",
    climateRisk: 62,
    floodRisk: 64,
    droughtRisk: 58,
    heatStress: 38.2,
    heatIndex: 60,
    landVulnerability: 54,
    soilSalinityEC: 1.8,
    groundwaterDepletion: 1.2,
    resilienceScore: 78,
    vulnerabilityCategory: "Moderate",
    recommendedAction: "Western Ghats watershed management & farm pond saturation scheme."
  },
  {
    id: "jodhpur",
    name: "Jodhpur (Thar Fringe)",
    state: "Rajasthan",
    climateRisk: 91,
    floodRisk: 22,
    droughtRisk: 96,
    heatStress: 46.8,
    heatIndex: 96,
    landVulnerability: 89,
    soilSalinityEC: 6.4,
    groundwaterDepletion: 2.8,
    resilienceScore: 46,
    vulnerabilityCategory: "Critical",
    recommendedAction: "Sand dune stabilization, shelterbelt afforestation, and Kandi watershed harvesting."
  }
];

// 10-Year historical climate risk & land degradation trend
const historicalClimateTrend = [
  { year: "2016", avgTempC: 32.4, droughtDays: 48, floodInstances: 14, landDegradedMha: 28.2, resilienceIndex: 72 },
  { year: "2018", avgTempC: 32.9, droughtDays: 54, floodInstances: 18, landDegradedMha: 29.4, resilienceIndex: 69 },
  { year: "2020", avgTempC: 33.3, droughtDays: 61, floodInstances: 22, landDegradedMha: 30.8, resilienceIndex: 66 },
  { year: "2022", avgTempC: 33.8, droughtDays: 68, floodInstances: 26, landDegradedMha: 31.9, resilienceIndex: 64 },
  { year: "2024", avgTempC: 34.2, droughtDays: 74, floodInstances: 31, landDegradedMha: 33.2, resilienceIndex: 61 },
  { year: "2026", avgTempC: 34.7, droughtDays: 82, floodInstances: 36, landDegradedMha: 34.5, resilienceIndex: 59 },
];

export default function ClimateResiliencePage() {
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>("kutch");
  const [isMounted, setIsMounted] = useState(false);

  // Simulation Sliders
  const [afforestationBuffer, setAfforestationBuffer] = useState<number>(15); // %
  const [percolationPits, setPercolationPits] = useState<number>(25); // %
  const [mangroveProtection, setMangroveProtection] = useState<boolean>(true);

  useEffect(() => setIsMounted(true), []);

  const currentDistrict = districtData.find(d => d.id === selectedDistrictId) || districtData[0];

  // Calculate simulated resilience score with adaptation inputs
  const adaptationBonus = Math.round(
    (afforestationBuffer * 0.3) + 
    (percolationPits * 0.25) + 
    (mangroveProtection ? 6 : 0)
  );
  const simulatedResilienceScore = Math.min(100, currentDistrict.resilienceScore + adaptationBonus);

  // Radar chart data comparing current district metrics
  const radarData = [
    { subject: "Flood Risk", value: currentDistrict.floodRisk, fullMark: 100 },
    { subject: "Drought Risk", value: currentDistrict.droughtRisk, fullMark: 100 },
    { subject: "Heat Stress", value: currentDistrict.heatIndex, fullMark: 100 },
    { subject: "Land Vulnerability", value: currentDistrict.landVulnerability, fullMark: 100 },
    { subject: "Soil Salinity", value: Math.min(100, Math.round(currentDistrict.soilSalinityEC * 10)), fullMark: 100 },
    { subject: "Resilience Score", value: simulatedResilienceScore, fullMark: 100 },
  ];

  const handleExportPdf = () => {
    generateOfficialGovernmentPdf({
      title: `CLIMATE & LAND RESILIENCE REPORT: ${currentDistrict.name.toUpperCase()} (${currentDistrict.state})`,
      reportId: `DOLR-CLIM-${currentDistrict.id.toUpperCase()}-${Date.now().toString().substring(7)}`,
      category: "Climate & Sustainability Assessment",
      signatory: "Director of Climate Resilience, Ministry of Rural Development",
      sections: [
        {
          heading: "1. Climate Risk & Multi-Hazard Profile",
          content: `Overall Climate Risk Score: ${currentDistrict.climateRisk}/100. Category: ${currentDistrict.vulnerabilityCategory}. Drought Risk: ${currentDistrict.droughtRisk}/100, Flood Risk: ${currentDistrict.floodRisk}/100, Extreme Heat Stress: ${currentDistrict.heatStress}°C.`
        },
        {
          heading: "2. Soil & Land Degradation Index",
          content: `Soil Salinity EC: ${currentDistrict.soilSalinityEC} dS/m. Groundwater Depletion Rate: ${currentDistrict.groundwaterDepletion} m/year. Baseline Resilience Score: ${currentDistrict.resilienceScore}/100.`
        },
        {
          heading: "3. Actionable Mitigation Mandate",
          content: currentDistrict.recommendedAction
        }
      ],
      tableData: {
        headers: ["District", "Climate Risk", "Flood Risk", "Drought Risk", "Heat Temp", "Resilience Score"],
        rows: districtData.map(d => [d.name, `${d.climateRisk}/100`, `${d.floodRisk}/100`, `${d.droughtRisk}/100`, `${d.heatStress}°C`, `${d.resilienceScore}/100`])
      }
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
              NATIONAL CLIMATE & LAND RESILIENCE MISSION
            </span>
            <span className="text-xs text-slate-400">Department of Land Resources</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>🌱 Climate & Land Resilience Dashboard</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Multi-hazard geospatial vulnerability modeling: Flood Risk, Drought Aridity, Heat Stress, Soil Salinity, and Land Resilience scoring across districts.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/gis"
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
          >
            <Layers className="h-4 w-4 text-emerald-400" />
            <span>Overlay on GIS Map</span>
          </Link>
          <button
            onClick={handleExportPdf}
            className="flex items-center space-x-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-emerald-500/10"
          >
            <Download className="h-4 w-4" />
            <span>Export District Climate Brief</span>
          </button>
        </div>
      </div>

      {/* Required Progression Flow Bar (SIH PS Requirement) */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-emerald-500/40 rounded-xl p-4 text-white shadow-md">
        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-400 block mb-2">
          CLIMATE & LAND RESILIENCE EVALUATION PIPELINE:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center text-xs">
          {[
            { step: "1. Climate Risk", desc: "Multi-Hazard Baseline", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
            { step: "2. Flood Risk", desc: "Inundation & Monsoon Surge", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
            { step: "3. Drought Risk", desc: "SPEI Aridity Index", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
            { step: "4. Heat Stress", desc: "Surface Temp & UHI", color: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
            { step: "5. Land Vulnerability", desc: "Soil Salinity & Erosion", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
            { step: "6. Resilience Score", desc: "0-100 Adaptation Gauge", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-bold" },
          ].map((item, idx) => (
            <div key={idx} className={`p-2.5 rounded-lg border flex flex-col justify-center ${item.color}`}>
              <span className="font-bold text-xs">{item.step}</span>
              <span className="text-[10px] opacity-80 mt-0.5">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* District / State GIS Selector Bar */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-slate-100 rounded-lg text-slate-700">
            <MapPin className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              SELECT TARGET DISTRICT / REGION FOR VULNERABILITY DRILLDOWN
            </label>
            <select
              value={selectedDistrictId}
              onChange={(e) => setSelectedDistrictId(e.target.value)}
              className="mt-1 bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-sm font-bold text-slate-900 focus:ring-2 focus:ring-emerald-500 focus:bg-white"
            >
              {districtData.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name} ({d.state}) — {d.vulnerabilityCategory} Risk (Score: {d.resilienceScore}/100)
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-slate-500 font-medium">Category:</span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${
            currentDistrict.vulnerabilityCategory === "Critical" ? "bg-rose-100 text-rose-800 border-rose-200" :
            currentDistrict.vulnerabilityCategory === "High" ? "bg-amber-100 text-amber-800 border-amber-200" :
            "bg-emerald-100 text-emerald-800 border-emerald-200"
          }`}>
            ● {currentDistrict.vulnerabilityCategory} Vulnerability Zone
          </span>
        </div>
      </div>

      {/* 6 Key Parameter Scorecards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        {/* 1. Climate Risk */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase">1. Climate Risk</span>
            <AlertTriangle className="h-4 w-4 text-amber-500" />
          </div>
          <p className="text-2xl font-black text-slate-900">{currentDistrict.climateRisk}<span className="text-xs font-normal text-slate-400">/100</span></p>
          <p className="text-[10px] text-slate-500 mt-1">Multi-hazard index</p>
        </div>

        {/* 2. Flood Risk */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase">2. Flood Risk</span>
            <CloudRain className="h-4 w-4 text-blue-500" />
          </div>
          <p className="text-2xl font-black text-blue-600">{currentDistrict.floodRisk}<span className="text-xs font-normal text-slate-400">/100</span></p>
          <p className="text-[10px] text-slate-500 mt-1">Inundation frequency</p>
        </div>

        {/* 3. Drought Risk */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase">3. Drought Risk</span>
            <Sun className="h-4 w-4 text-orange-500" />
          </div>
          <p className="text-2xl font-black text-orange-600">{currentDistrict.droughtRisk}<span className="text-xs font-normal text-slate-400">/100</span></p>
          <p className="text-[10px] text-slate-500 mt-1">SPEI Aridity Index</p>
        </div>

        {/* 4. Heat Stress */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase">4. Heat Stress</span>
            <Flame className="h-4 w-4 text-rose-500" />
          </div>
          <p className="text-2xl font-black text-rose-600">{currentDistrict.heatStress}°C</p>
          <p className="text-[10px] text-slate-500 mt-1">Peak summer surface temp</p>
        </div>

        {/* 5. Land Vulnerability */}
        <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 mb-1">
            <span className="text-[10px] font-bold uppercase">5. Land Vulnerability</span>
            <Droplets className="h-4 w-4 text-purple-500" />
          </div>
          <p className="text-2xl font-black text-purple-600">{currentDistrict.landVulnerability}<span className="text-xs font-normal text-slate-400">/100</span></p>
          <p className="text-[10px] text-slate-500 mt-1">Salinity: {currentDistrict.soilSalinityEC} dS/m</p>
        </div>

        {/* 6. Resilience Score */}
        <div className="bg-emerald-50 rounded-xl p-4 border border-emerald-300 shadow-sm">
          <div className="flex items-center justify-between text-emerald-800 mb-1">
            <span className="text-[10px] font-bold uppercase">6. Resilience Score</span>
            <ShieldCheck className="h-4 w-4 text-emerald-600" />
          </div>
          <p className="text-2xl font-black text-emerald-700">{simulatedResilienceScore}<span className="text-xs font-normal text-emerald-600">/100</span></p>
          <p className="text-[10px] text-emerald-800 mt-1 font-semibold">
            {adaptationBonus > 0 ? `+${adaptationBonus} with adaptation` : "Baseline score"}
          </p>
        </div>

      </div>

      {/* Main Analysis & Simulator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Radar & Policy Recommendation (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Radar Chart Card */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-sm font-bold text-slate-900">
                  Multi-Dimensional Climate Risk Profile — {currentDistrict.name}
                </h3>
                <p className="text-xs text-slate-500">6-axis spider evaluation of environmental pressures</p>
              </div>
              <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-mono font-bold">
                Sentinel-3 & IMD Data
              </span>
            </div>

            <div className="h-64 w-full">
              {isMounted && (
                <ResponsiveContainer width="100%" height="100%">
                  <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                    <PolarGrid stroke="#e2e8f0" />
                    <PolarAngleAxis dataKey="subject" tick={{ fill: '#475569', fontSize: 11, fontWeight: 600 }} />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" />
                    <Radar name={currentDistrict.name} dataKey="value" stroke="#059669" fill="#10b981" fillOpacity={0.4} />
                    <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                  </RadarChart>
                </ResponsiveContainer>
              )}
            </div>
          </div>

          {/* Actionable Policy Recommendation Card */}
          <div className="bg-slate-900 text-white rounded-xl p-5 border border-slate-800 shadow-md space-y-3">
            <div className="flex items-center justify-between border-b border-slate-800 pb-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Info className="h-4 w-4" />
                <span>Actionable Land Resilience Policy Mandate</span>
              </span>
              <span className="text-[10px] bg-emerald-500/20 text-emerald-400 px-2 py-0.5 rounded border border-emerald-500/30">
                DoLR Priority Intervention
              </span>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed font-sans">
              {currentDistrict.recommendedAction}
            </p>

            <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-2 text-xs">
              <span className="text-slate-400">Groundwater Depletion: <strong className="text-rose-400">{currentDistrict.groundwaterDepletion} m/yr</strong></span>
              <span className="text-slate-400">Soil Salinity: <strong className="text-amber-400">{currentDistrict.soilSalinityEC} dS/m</strong></span>
              <Link href="/policy" className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-bold">
                <span>Test in Policy Simulator</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>

        </div>

        {/* What-If Adaptation Simulator & Comparison (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Interactive What-If Climate Adaptation Simulator */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                <Sliders className="h-4 w-4 text-emerald-600" />
                <span>What-If Climate Adaptation Simulator</span>
              </h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded font-bold">Live Model</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Adjust adaptation policy levers to evaluate their real-time impact on {currentDistrict.name}&apos;s Land Resilience Score:
            </p>

            <div className="space-y-4 text-xs">
              {/* Slider 1: Afforestation Buffer */}
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="flex items-center gap-1 text-slate-700">
                    <Trees className="h-3.5 w-3.5 text-emerald-600" />
                    <span>Afforestation & Shelterbelts:</span>
                  </span>
                  <span className="font-mono text-emerald-700 font-bold">+{afforestationBuffer}% Cover</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="40"
                  value={afforestationBuffer}
                  onChange={(e) => setAfforestationBuffer(Number(e.target.value))}
                  className="w-full accent-emerald-600 cursor-pointer"
                />
              </div>

              {/* Slider 2: Percolation Pits */}
              <div>
                <div className="flex justify-between font-semibold mb-1">
                  <span className="flex items-center gap-1 text-slate-700">
                    <Droplets className="h-3.5 w-3.5 text-blue-600" />
                    <span>Groundwater Percolation Pits:</span>
                  </span>
                  <span className="font-mono text-blue-700 font-bold">+{percolationPits}% Saturation</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="50"
                  value={percolationPits}
                  onChange={(e) => setPercolationPits(Number(e.target.value))}
                  className="w-full accent-blue-600 cursor-pointer"
                />
              </div>

              {/* Toggle 3: Mangrove & Saline Bunds */}
              <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg border border-slate-200">
                <span className="flex items-center gap-1.5 font-semibold text-slate-800">
                  <Waves className="h-4 w-4 text-cyan-600" />
                  <span>Deploy Mangrove & Saline Bunds</span>
                </span>
                <input
                  type="checkbox"
                  checked={mangroveProtection}
                  onChange={(e) => setMangroveProtection(e.target.checked)}
                  className="h-4 w-4 accent-emerald-600 cursor-pointer"
                />
              </div>
            </div>

            {/* Impact Output Banner */}
            <div className="p-3 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-emerald-700 font-bold uppercase block">Simulated Score:</span>
                <span className="text-xl font-black text-emerald-900">{simulatedResilienceScore} / 100</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-emerald-700 font-bold uppercase block">Net Gain:</span>
                <span className="text-sm font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                  +{adaptationBonus} Resilience Pts
                </span>
              </div>
            </div>
          </div>

          {/* District Ranking Comparison Bar */}
          <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
              District Resilience Comparison (Gujarat & Regions)
            </h4>
            <div className="space-y-2 text-xs">
              {districtData.slice(0, 5).map((d) => (
                <div 
                  key={d.id}
                  onClick={() => setSelectedDistrictId(d.id)}
                  className={`p-2 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                    selectedDistrictId === d.id ? "bg-emerald-50 border-emerald-400 font-bold" : "bg-slate-50 border-slate-200 hover:bg-slate-100"
                  }`}
                >
                  <span className="text-slate-800">{d.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 font-mono text-[11px]">{d.resilienceScore}/100</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                      d.vulnerabilityCategory === "Critical" ? "bg-rose-100 text-rose-700" :
                      d.vulnerabilityCategory === "High" ? "bg-amber-100 text-amber-700" :
                      "bg-emerald-100 text-emerald-700"
                    }`}>
                      {d.vulnerabilityCategory}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Historical Trend Chart (10-Year Trend) */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div>
            <h3 className="text-sm font-bold text-slate-900">National 10-Year Climate Risk & Land Degradation Trajectory</h3>
            <p className="text-xs text-slate-500">Historical progression of Aridity Drought Days vs. Degraded Land Area (Mha)</p>
          </div>
          <span className="text-[10px] bg-slate-100 text-slate-700 px-2.5 py-1 rounded font-semibold">DoLR & Desertification Atlas</span>
        </div>

        <div className="h-64 w-full">
          {isMounted && (
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={historicalClimateTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorDrought" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f97316" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorDegraded" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                <Area type="monotone" dataKey="droughtDays" stroke="#f97316" strokeWidth={2.5} fillOpacity={1} fill="url(#colorDrought)" name="Annual Drought Days" />
                <Area type="monotone" dataKey="landDegradedMha" stroke="#ef4444" strokeWidth={2.5} fillOpacity={1} fill="url(#colorDegraded)" name="Degraded Land (Mha)" />
              </AreaChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

    </div>
  );
}
