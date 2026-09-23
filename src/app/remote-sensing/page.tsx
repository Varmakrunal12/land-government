"use client";

import { 
  Satellite, 
  Layers, 
  Eye, 
  TrendingUp, 
  MapPin, 
  Calendar, 
  Sliders, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  Download, 
  ShieldAlert, 
  Sparkles,
  RefreshCw,
  Maximize2,
  Cpu,
  Compass
} from "lucide-react";
import { useState, useEffect } from "react";
import { 
  AreaChart, 
  Area, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from "recharts";
import Link from "next/link";
import { generateOfficialGovernmentPdf } from "@/utils/generatePdf";

// Ahmedabad Temporal Expansion Data (2018 - 2026)
const ahmedabadTimeSeries = [
  { year: "2018", builtUpSqKm: 246, agriSqKm: 412, waterSqKm: 42, barrenSqKm: 118, forestSqKm: 58 },
  { year: "2020", builtUpSqKm: 272, agriSqKm: 394, waterSqKm: 41, barrenSqKm: 112, forestSqKm: 57 },
  { year: "2022", builtUpSqKm: 298, agriSqKm: 375, waterSqKm: 40, barrenSqKm: 106, forestSqKm: 57 },
  { year: "2024", builtUpSqKm: 326, agriSqKm: 354, waterSqKm: 39, barrenSqKm: 99, forestSqKm: 58 },
  { year: "2026", builtUpSqKm: 351, agriSqKm: 336, waterSqKm: 39, barrenSqKm: 94, forestSqKm: 56 },
];

export default function RemoteSensingPage() {
  const [selectedCity, setSelectedCity] = useState<string>("Ahmedabad");
  const [selectedSensor, setSelectedSensor] = useState<string>("Sentinel-2 MSI (10m)");
  const [activeSpectralIndex, setActiveSpectralIndex] = useState<"RGB" | "NDVI" | "NDBI" | "NDWI">("RGB");
  const [compareYear, setCompareYear] = useState<"2018" | "2022" | "2026">("2026");
  const [sliderPosition, setSliderPosition] = useState<number>(50); // 0 to 100 for split screen
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const handleExportReport = () => {
    generateOfficialGovernmentPdf({
      title: "EARTH OBSERVATION & SATELLITE CHANGE DETECTION AUDIT: AHMEDABAD (2018-2026)",
      reportId: `DOLR-SAT-AMD-${Date.now().toString().substring(6)}`,
      category: "Satellite Remote Sensing & Urban Expansion",
      signatory: "Chief Remote Sensing Scientist, ISRO SAC & DoLR Geospatial Cell",
      sections: [
        {
          heading: "1. Earth Observation Sensor & Land Cover Metadata",
          content: "Sensor: Sentinel-2 Multi-Spectral (10m Resolution) and Cartosat-3 PAN (0.28m). Cloud Cover: < 2.4%. Atmospheric Correction: Sen2Cor Level-2A BOA Reflectance."
        },
        {
          heading: "2. Ahmedabad Urban Sprawl & Agri-Conversion Analysis",
          content: "Between 2018 and 2026, Ahmedabad peri-urban built-up area expanded from 246 sq km to 351 sq km (+42.7% growth). High-yielding irrigated agricultural land decreased from 412 sq km to 336 sq km (-18.4% loss), primarily along the Sanand, Changodar, and Dholera express corridors."
        },
        {
          heading: "3. Automated Policy Alerts & Zonal Recommendations",
          content: "Automated CNN change detection flagged 1,420 Hectares of unauthorized agricultural-to-industrial conversions lacking Section 14 Land Revenue NOC. Immediate spatial freeze recommended on unverified khasra numbers."
        }
      ],
      tableData: {
        headers: ["Observation Year", "Built-up (sq km)", "Agri Land (sq km)", "Water Bodies", "Barren Land"],
        rows: ahmedabadTimeSeries.map(t => [t.year, `${t.builtUpSqKm} sq km`, `${t.agriSqKm} sq km`, `${t.waterSqKm} sq km`, `${t.barrenSqKm} sq km`])
      }
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-md flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 px-2 py-0.5 rounded">
              EARTH OBSERVATION & REMOTE SENSING ENGINE
            </span>
            <span className="text-xs text-slate-400">DoLR • ISRO SAC • Sentinel-2 / Cartosat-3</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>🛰️ Earth Observation & Remote Sensing Portal</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Multi-temporal satellite imagery, AI Land Use Land Cover (LULC) classification, change detection, and peri-urban agricultural conversion monitoring.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Link
            href="/gis"
            className="flex items-center space-x-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
          >
            <Layers className="h-4 w-4 text-cyan-400" />
            <span>Open in Cadastral GIS</span>
          </Link>
          <button
            onClick={handleExportReport}
            className="flex items-center space-x-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-cyan-500/10"
          >
            <Download className="h-4 w-4" />
            <span>Export Satellite Audit PDF</span>
          </button>
        </div>
      </div>

      {/* Required Progression Flow Bar (SIH PS Requirement) */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-cyan-500/40 rounded-xl p-4 text-white shadow-md">
        <span className="text-[10px] font-bold uppercase tracking-wider text-cyan-400 block mb-2">
          EARTH OBSERVATION & REMOTE SENSING WORKFLOW PIPELINE:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2 text-center text-xs">
          {[
            { step: "1. Satellite Imagery", desc: "Sentinel-2 & Cartosat", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
            { step: "2. Land Cover Detection", desc: "CNN LULC AI Classifier", color: "bg-purple-500/20 text-purple-300 border-purple-500/30" },
            { step: "3. Change Detection", desc: "Bi-Temporal Delta Model", color: "bg-amber-500/20 text-amber-300 border-amber-500/30" },
            { step: "4. Urban Expansion", desc: "Built-up Sprawl (+42.7%)", color: "bg-rose-500/20 text-rose-300 border-rose-500/30" },
            { step: "5. Agri Conversion", desc: "Farmland Loss (-18.4%)", color: "bg-orange-500/20 text-orange-300 border-orange-500/30" },
            { step: "6. Policy Insight", desc: "Automated Zonal Alerts", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-bold" },
          ].map((item, idx) => (
            <div key={idx} className={`p-2.5 rounded-lg border flex flex-col justify-center ${item.color}`}>
              <span className="font-bold text-xs">{item.step}</span>
              <span className="text-[10px] opacity-80 mt-0.5">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Control Bar: City, Sensor & Spectral Index */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-4">
        
        {/* City Selector */}
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-cyan-600" />
          <span className="text-xs font-bold text-slate-700">Target Region:</span>
          <select
            value={selectedCity}
            onChange={(e) => setSelectedCity(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-900 focus:ring-2 focus:ring-cyan-500"
          >
            <option value="Ahmedabad">Ahmedabad Peri-Urban Corridor (Gujarat)</option>
            <option value="Surat">Surat Hazira Coastal Industrial Belt (Gujarat)</option>
            <option value="Pune">Pune PCMC Urban Sprawl (Maharashtra)</option>
            <option value="NCR">NCR Delhi - Noida Peri-Urban Extension</option>
          </select>
        </div>

        {/* Sensor Selector */}
        <div className="flex items-center gap-2">
          <Satellite className="h-4 w-4 text-blue-600" />
          <span className="text-xs font-bold text-slate-700">Sensor:</span>
          <select
            value={selectedSensor}
            onChange={(e) => setSelectedSensor(e.target.value)}
            className="bg-slate-50 border border-slate-300 rounded-lg px-3 py-1.5 text-xs font-semibold text-slate-900 focus:ring-2 focus:ring-cyan-500"
          >
            <option value="Sentinel-2 MSI (10m)">Sentinel-2 MSI (10m Multi-Spectral)</option>
            <option value="Cartosat-3 PAN (0.28m)">Cartosat-3 PAN (0.28m High-Res)</option>
            <option value="Landsat-9 OLI-2 (30m)">Landsat-9 OLI-2 (30m Thermal/Optical)</option>
            <option value="RISAT-1A SAR (C-Band)">RISAT-1A SAR (C-Band Radar)</option>
          </select>
        </div>

        {/* Spectral Index Buttons */}
        <div className="flex items-center gap-1.5">
          {[
            { key: "RGB", label: "True Color (RGB)" },
            { key: "NDVI", label: "Vegetation (NDVI)" },
            { key: "NDBI", label: "Built-up (NDBI)" },
            { key: "NDWI", label: "Water Index (NDWI)" },
          ].map((btn) => (
            <button
              key={btn.key}
              onClick={() => setActiveSpectralIndex(btn.key as any)}
              className={`px-3 py-1 rounded-lg text-xs font-bold transition-all border ${
                activeSpectralIndex === btn.key
                  ? "bg-cyan-600 text-white border-cyan-600 shadow-sm"
                  : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"
              }`}
            >
              {btn.label}
            </button>
          ))}
        </div>

      </div>

      {/* HERO VISUALIZER: Ahmedabad 2018 -> 2026 Urban Expansion & Land Cover Transition */}
      <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl p-6 text-white space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded font-bold uppercase">
                TEMPORAL SATELLITE COMPARISON (AHMEDABAD 2018 ➔ 2026)
              </span>
              <span className="text-xs text-slate-400 font-mono">ISRO SAC Level-2A Imagery</span>
            </div>
            <h2 className="text-xl font-black mt-1 text-white tracking-tight">
              Urban Expansion & Agricultural Land Conversion Visualizer
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Analyzing 8-year peri-urban transformation along SG Highway, Sanand GIDC, and Changodar industrial belts.
            </p>
          </div>

          {/* Compare Year Selector */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Compare Baseline (2018) against:</span>
            <div className="flex bg-slate-900 border border-slate-700 p-1 rounded-xl">
              {(["2018", "2022", "2026"] as const).map((yr) => (
                <button
                  key={yr}
                  onClick={() => setCompareYear(yr)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    compareYear === yr
                      ? "bg-cyan-500 text-slate-950 shadow-md font-black"
                      : "text-slate-400 hover:text-white"
                  }`}
                >
                  {yr}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Visual Map Simulator Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          
          {/* Visual Canvas (8 Cols) */}
          <div className="lg:col-span-8 bg-slate-900 rounded-xl border border-slate-800 p-5 relative overflow-hidden flex flex-col justify-between min-h-[380px]">
            
            {/* Top Canvas Bar */}
            <div className="flex items-center justify-between text-xs z-10">
              <div className="flex items-center gap-2">
                <span className="bg-slate-950/80 backdrop-blur px-2.5 py-1 rounded-md border border-slate-700 font-mono text-[11px] text-amber-400 font-bold">
                  2018 Baseline vs {compareYear} Observation
                </span>
                <span className="bg-slate-950/80 backdrop-blur px-2 py-1 rounded-md border border-slate-700 text-[10px] text-cyan-300 font-mono">
                  Spectral Mode: {activeSpectralIndex}
                </span>
              </div>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded border border-emerald-500/30 font-mono">
                ● 10m Ground Resolution
              </span>
            </div>

            {/* Geometric Land Classification Visual Representation */}
            <div className="my-6 grid grid-cols-3 gap-3">
              
              {/* Sector 1: North Ahmedabad / Gandhinagar Corridor */}
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Sector A: Gandhinagar Corridor</span>
                <div className="h-16 w-full rounded-lg bg-gradient-to-br from-rose-900/40 via-amber-900/30 to-emerald-900/40 border border-slate-700 flex flex-col items-center justify-center text-center p-2">
                  <span className="text-xs font-bold text-amber-300">Built-Up Expansion</span>
                  <span className="text-[10px] text-slate-300 font-mono">+38.4% Built-up density</span>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Agri Converted:</span>
                  <span className="text-rose-400 font-bold">1,820 Ha</span>
                </div>
              </div>

              {/* Sector 2: West / Sanand Industrial Belt */}
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Sector B: Sanand Auto Corridor</span>
                <div className="h-16 w-full rounded-lg bg-gradient-to-br from-rose-900/60 via-purple-900/40 to-slate-800 border border-slate-700 flex flex-col items-center justify-center text-center p-2">
                  <span className="text-xs font-bold text-rose-300">Rapid Industrial Sprawl</span>
                  <span className="text-[10px] text-slate-300 font-mono">+64.2% Non-Agri Expansion</span>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Agri Converted:</span>
                  <span className="text-rose-400 font-bold">3,450 Ha</span>
                </div>
              </div>

              {/* Sector 3: South / Changodar & Dholera SIR Route */}
              <div className="p-4 rounded-xl bg-slate-950/90 border border-slate-800 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase">Sector C: Dholera SIR Buffer</span>
                <div className="h-16 w-full rounded-lg bg-gradient-to-br from-amber-900/50 via-emerald-900/30 to-cyan-900/40 border border-slate-700 flex flex-col items-center justify-center text-center p-2">
                  <span className="text-xs font-bold text-cyan-300">Expressway Logistic Sprawl</span>
                  <span className="text-[10px] text-slate-300 font-mono">+48.1% Built-up density</span>
                </div>
                <div className="flex justify-between text-[11px] font-mono text-slate-400">
                  <span>Agri Converted:</span>
                  <span className="text-rose-400 font-bold">2,330 Ha</span>
                </div>
              </div>

            </div>

            {/* Split Screen Slider Control */}
            <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800 space-y-1 z-10">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="text-amber-400">◀ 2018 (Baseline Agriculture)</span>
                <span className="text-slate-400 font-mono text-[10px]">Interactive Split Viewer ({sliderPosition}%)</span>
                <span className="text-cyan-400">{compareYear} (Urban Expansion) ▶</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={sliderPosition}
                onChange={(e) => setSliderPosition(Number(e.target.value))}
                className="w-full accent-cyan-400 cursor-pointer"
              />
            </div>

          </div>

          {/* Stats & Key Metrics (4 Cols) */}
          <div className="lg:col-span-4 bg-slate-900/80 rounded-xl border border-slate-800 p-5 flex flex-col justify-between space-y-4">
            <div>
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <TrendingUp className="h-4 w-4 text-cyan-400" />
                <span>8-Year Conversion Statistics</span>
              </h3>
              <p className="text-xs text-slate-400">Ahmedabad Peri-Urban Geographic Area: 856 sq km</p>
            </div>

            <div className="space-y-3 text-xs">
              
              {/* Built-up Growth */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Urban Built-up Area:</span>
                  <span className="text-rose-400 font-bold font-mono">246 ➔ 351 sq km</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Growth Rate:</span>
                  <span className="text-rose-400 font-bold">+42.7% Built-up Expansion</span>
                </div>
              </div>

              {/* Agri Farmland Loss */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Agricultural Farmland:</span>
                  <span className="text-amber-400 font-bold font-mono">412 ➔ 336 sq km</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Net Farmland Diverted:</span>
                  <span className="text-amber-400 font-bold">-18.4% (7,600 Hectares)</span>
                </div>
              </div>

              {/* Water Bodies & Sabarmati */}
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800 space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Water Bodies & Wetlands:</span>
                  <span className="text-cyan-400 font-bold font-mono">42 ➔ 39 sq km</span>
                </div>
                <div className="flex justify-between text-[11px]">
                  <span className="text-slate-500">Stability:</span>
                  <span className="text-cyan-300 font-semibold">-7.1% (Sponge Buffer Risk)</span>
                </div>
              </div>

            </div>

            <Link
              href="/policy"
              className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 text-xs font-bold py-2.5 rounded-lg text-center transition-colors flex items-center justify-center gap-1.5"
            >
              <span>Run Land Conversion Policy Simulation</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>

        </div>

      </div>

      {/* Recharts Area Chart: 2018 - 2026 Transition Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-8 bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-3">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <div>
              <h3 className="text-sm font-bold text-slate-900">Ahmedabad Land-Cover Composition Trend (2018 - 2026)</h3>
              <p className="text-xs text-slate-500">Area in Square Kilometers (sq km) derived from Sentinel-2 Multi-Spectral time series</p>
            </div>
            <span className="text-[10px] bg-cyan-50 text-cyan-800 px-2 py-0.5 rounded font-mono font-bold">ISRO SAC AI Model</span>
          </div>

          <div className="h-64 w-full">
            {isMounted && (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={ahmedabadTimeSeries} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="year" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 11 }} />
                  <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e2e8f0' }} />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                  <Area type="monotone" dataKey="builtUpSqKm" stackId="1" stroke="#f43f5e" fill="#fb7185" name="Urban Built-up (sq km)" />
                  <Area type="monotone" dataKey="agriSqKm" stackId="1" stroke="#10b981" fill="#6ee7b7" name="Agricultural Farmland (sq km)" />
                  <Area type="monotone" dataKey="barrenSqKm" stackId="1" stroke="#f59e0b" fill="#fcd34d" name="Barren / Open Land (sq km)" />
                  <Area type="monotone" dataKey="waterSqKm" stackId="1" stroke="#0ea5e9" fill="#7dd3fc" name="Water Bodies (sq km)" />
                </AreaChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* Automated AI Policy Insights & Zonal Alerts (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <ShieldAlert className="h-4 w-4 text-rose-600" />
              <span>Automated Zonal Policy Alerts</span>
            </h3>
            <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded font-bold">3 Red Flags</span>
          </div>

          <div className="space-y-3 text-xs">
            
            {/* Alert 1 */}
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-rose-800 uppercase">🚨 Section 14 NOC Violation</span>
                <span className="text-[10px] text-rose-600 font-mono">Sanand Corridor</span>
              </div>
              <p className="text-slate-800 font-semibold leading-snug">
                1,420 Ha of prime multi-crop irrigated land converted without State Revenue conversion clearance.
              </p>
              <p className="text-[10px] text-slate-500">Action: Revenue Inspector notice dispatched.</p>
            </div>

            {/* Alert 2 */}
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-amber-800 uppercase">⚠️ Peri-Urban Green Buffer Loss</span>
                <span className="text-[10px] text-amber-600 font-mono">Daskroi Tehsil</span>
              </div>
              <p className="text-slate-800 font-semibold leading-snug">
                Vegetation index (NDVI) dropped by 0.32 in peri-urban belt due to unauthorized plotting.
              </p>
              <p className="text-[10px] text-slate-500">Action: Satellite boundary lock initiated.</p>
            </div>

            {/* Alert 3 */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg space-y-1">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-emerald-800 uppercase">✅ Catchment Afforestation</span>
                <span className="text-[10px] text-emerald-600 font-mono">Sabarmati River</span>
              </div>
              <p className="text-slate-800 font-semibold leading-snug">
                Riparian green tree canopy increased +6.2% along riverfront conservation zone.
              </p>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}
