"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Layers, Search, Map, ShieldCheck, AlertTriangle, Database, Cpu } from "lucide-react";

// Dynamically import map component to avoid SSR issues
const MapComponent = dynamic(() => import("@/components/MapComponent"), {
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full bg-slate-900 rounded-xl flex items-center justify-center text-slate-400 font-mono text-xs">
      Loading Interactive Leaflet GIS Vector Engine...
    </div>
  ),
});

export default function GISPage() {
  const [searchRecord, setSearchRecord] = useState("");
  const [searchResult, setSearchResult] = useState<string | null>(null);

  // 7 Required GIS Spatial Layers (SIH Gap Requirement)
  const [layers, setLayers] = useState({
    cadastral: true,
    landUse: true,
    infrastructure: true,
    socioEconomic: true,
    climateRisk: true,
    disputeHotspots: false,
    remoteSensingNDVI: true,
  });

  const toggleLayer = (layerKey: keyof typeof layers) => {
    setLayers(prev => ({ ...prev, [layerKey]: !prev[layerKey] }));
  };

  const handleRecordSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchRecord.trim()) return;

    setSearchResult(`Found Land Record ULPIN: ${searchRecord.toUpperCase()} • Location: Pune Rural (Survey No. 142/A) • Owner: R. K. Patil • Land Use: Agriculture Multi-Crop • Status: Clear Title (0 Disputes)`);
  };

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded">
              NATIONAL GIS & MULTI-LAYER SPATIAL ANALYTICS
            </span>
            <span className="text-xs text-slate-400">Department of Land Resources</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Integrated Multi-Layer GIS Spatial Data Viewer
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Overlay cadastral boundaries, land-use classifications, satellite remote sensing, socio-economic population data, and climate risk maps.
          </p>
        </div>

        <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg font-bold shrink-0 font-mono">
          OGC WFS 1.1 Vector Layers Active
        </span>
      </div>

      {/* ULPIN & Land Record Search Bar (SIH Gap Requirement) */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm space-y-3">
        <form onSubmit={handleRecordSearch} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchRecord}
              onChange={(e) => setSearchRecord(e.target.value)}
              placeholder="Search Land Record by 14-digit ULPIN / Bhu-Aadhar ID or Survey No. (e.g. MH-PN-2026-4892)"
              className="w-full bg-slate-50 border border-slate-300 text-xs rounded-lg pl-9 pr-3 py-2.5 text-slate-900 font-mono focus:ring-2 focus:ring-blue-500 focus:bg-white focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold px-4 py-2.5 rounded-lg transition-all shadow-md shrink-0"
          >
            Locate Land Parcel
          </button>
        </form>

        {searchResult && (
          <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs font-medium text-emerald-900 flex items-center justify-between">
            <span>{searchResult}</span>
            <button onClick={() => setSearchResult(null)} className="text-emerald-700 font-bold hover:underline">Dismiss</button>
          </div>
        )}
      </div>

      {/* Main Map & Layer Toggle Control Panel Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Layer Controls (4 Cols) */}
        <div className="lg:col-span-4 bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2 flex items-center justify-between">
            <span className="flex items-center gap-1.5">
              <Layers className="h-4 w-4 text-blue-600" />
              <span>Spatial GIS Data Layers (7 Layers)</span>
            </span>
            <span className="text-[10px] bg-blue-100 text-blue-800 px-2 py-0.5 rounded font-bold font-mono">OGC WFS</span>
          </h3>

          <div className="space-y-2 text-xs">
            {[
              { key: "cadastral", label: "☑ Land Parcel Boundaries (Cadastral / ULPIN)", color: "text-emerald-700" },
              { key: "landUse", label: "☑ Land Use Categories (Agri / Urban / Forest)", color: "text-blue-700" },
              { key: "infrastructure", label: "☑ Roads & Infrastructure Development", color: "text-amber-700" },
              { key: "socioEconomic", label: "☑ Population & Socio-Economic Datasets", color: "text-purple-700" },
              { key: "climateRisk", label: "☑ Climate Vulnerability & Soil Salinity Risk", color: "text-rose-700" },
              { key: "disputeHotspots", label: "☑ Land Title Dispute Hotspots", color: "text-orange-700" },
              { key: "remoteSensingNDVI", label: "☑ Sentinel-2 Remote Sensing NDVI Derived Overlay", color: "text-cyan-700" },
            ].map((layer) => (
              <div
                key={layer.key}
                onClick={() => toggleLayer(layer.key as keyof typeof layers)}
                className={`p-2.5 rounded-lg border cursor-pointer transition-all flex items-center justify-between ${
                  layers[layer.key as keyof typeof layers]
                    ? "bg-slate-50 border-blue-400 font-bold"
                    : "bg-white border-slate-200 text-slate-400"
                }`}
              >
                <span className={`text-xs ${layers[layer.key as keyof typeof layers] ? layer.color : "text-slate-400"}`}>
                  {layer.label}
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono font-bold ${
                  layers[layer.key as keyof typeof layers] ? "bg-emerald-100 text-emerald-800" : "bg-slate-100 text-slate-500"
                }`}>
                  {layers[layer.key as keyof typeof layers] ? "ON" : "OFF"}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500 space-y-1 font-mono">
            <p>● Datum: WGS 84 / UTM Zone 43N</p>
            <p>● Resolution: 10m Sentinel-2 / Drone 5cm</p>
          </div>
        </div>

        {/* Leaflet Map Viewer (8 Cols) */}
        <div className="lg:col-span-8 bg-slate-900 rounded-xl overflow-hidden border border-slate-800 shadow-xl flex flex-col">
          <div className="bg-slate-950 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-300 font-semibold">
            <span>Live Interactive Map Viewer</span>
            <span className="text-[10px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded font-mono">
              ● Rendering 7 Spatial Layers
            </span>
          </div>

          <div className="flex-1 min-h-[480px]">
            <MapComponent activeLayers={layers} />
          </div>
        </div>

      </div>

    </div>
  );
}
