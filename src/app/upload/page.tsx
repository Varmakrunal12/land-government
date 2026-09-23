"use client";

import { UploadCloud, File, CheckCircle2, Database, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useGlobalData } from "@/context/GlobalDataContext";

export default function UploadPage() {
  const { addDataset } = useGlobalData();

  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploaded, setUploaded] = useState(false);
  const [fileName, setFileName] = useState("pune_cadastral_parcels_2026.geojson");
  const [category, setCategory] = useState("Cadastral GeoJSON Boundaries");
  const [state, setState] = useState("Maharashtra");
  const [uploader, setUploader] = useState("State Revenue Dept");

  const handleUpload = () => {
    setUploading(true);
    setProgress(20);

    setTimeout(() => setProgress(60), 400);
    setTimeout(() => setProgress(90), 800);
    setTimeout(() => {
      setProgress(100);
      setUploading(false);
      setUploaded(true);

      // Add to global state so it immediately appears in Admin Approvals & Logs!
      addDataset({
        title: fileName,
        uploader: uploader,
        size: "42.5 MB",
        format: category,
        state: state
      });
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-md">
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
            CENTRAL DATA LAKE INGESTION PORTAL
          </span>
          <span className="text-xs text-slate-400">DoLR PostGIS & Vector DB pipeline</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          State Land Records & GeoJSON Dataset Upload
        </h1>
        <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
          Uploaded datasets will automatically be routed to the System Admin Queue for validation before PostGIS spatial indexing.
        </p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-8">
        {!uploaded ? (
          <div className="space-y-6">
            
            {/* Drag & Drop Area */}
            <div 
              onClick={handleUpload}
              className="border-2 border-dashed border-slate-300 rounded-2xl p-10 bg-slate-50 hover:bg-emerald-50/50 hover:border-emerald-400 transition-all cursor-pointer text-center space-y-3"
            >
              <div className="h-14 w-14 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                <UploadCloud className="h-7 w-7" />
              </div>
              <h3 className="text-base font-bold text-slate-800">Drag & Drop GeoJSON, SHP, CSV or PDF files here</h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Supports OGC Vector GeoJSON, ESRI Shapefile (.zip), CSV land parcel records, and PDF policy acts (Up to 500MB).
              </p>
              <button type="button" className="px-4 py-2 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100 shadow-sm">
                Select File from Disk
              </button>
            </div>

            {/* Metadata Inputs */}
            <div className="space-y-4 pt-2">
              <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Dataset Meta Specification</h4>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Dataset File Name</label>
                  <input
                    type="text"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Dataset Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Cadastral GeoJSON Boundaries">Cadastral GeoJSON Boundaries</option>
                    <option value="ULPIN / Bhu-Aadhar Mapping Table">ULPIN / Bhu-Aadhar Mapping Table</option>
                    <option value="Agricultural Soil Salinity Survey">Agricultural Soil Salinity Survey</option>
                    <option value="State Policy Legislation PDF">State Policy Legislation PDF</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Origin State</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Submitting Organization</label>
                  <input
                    type="text"
                    value={uploader}
                    onChange={(e) => setUploader(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Upload Button & Progress */}
            {uploading && (
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs font-bold text-slate-700">
                  <span>Validating OGC GeoJSON Schema & Inter-Module Routing...</span>
                  <span>{progress}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2.5 overflow-hidden">
                  <div className="bg-emerald-500 h-2.5 rounded-full transition-all duration-300" style={{ width: `${progress}%` }}></div>
                </div>
              </div>
            )}

            <button
              onClick={handleUpload}
              disabled={uploading}
              className={`w-full py-3.5 rounded-xl text-white font-bold text-xs sm:text-sm flex justify-center items-center space-x-2 transition-all shadow-lg ${uploading ? 'bg-emerald-400' : 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/20'}`}
            >
              <Database className="h-4 w-4" />
              <span>{uploading ? "Ingesting into Data Lake..." : "Validate & Dispatch to Admin Approval Queue"}</span>
            </button>

          </div>
        ) : (
          /* Success Screen */
          <div className="py-10 text-center space-y-4 animate-in fade-in zoom-in-95">
            <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-10 w-10" />
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Dataset Sent to Admin Approval Queue!</h2>
            <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
              <strong className="text-slate-900">{fileName}</strong> has been routed to the System Admin Queue & logged in System Audit Trail.
            </p>

            <div className="pt-4 flex items-center justify-center gap-3">
              <button
                onClick={() => { setUploaded(false); setProgress(0); }}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-bold transition-colors"
              >
                Upload Another Dataset
              </button>
              <Link
                href="/approvals"
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold transition-all flex items-center space-x-1"
              >
                <span>Check Admin Approvals Queue</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
