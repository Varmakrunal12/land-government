"use client";

import { ShieldCheck, Database, CheckCircle2, XCircle, ArrowRight, Eye } from "lucide-react";
import { useGlobalData } from "@/context/GlobalDataContext";

export default function ApprovalsPage() {
  const { datasets, approveDataset, rejectDataset } = useGlobalData();

  const pendingDatasets = datasets.filter(d => d.status === "Pending Validation");

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
              DATA LAKE INGESTION APPROVAL QUEUE
            </span>
            <span className="text-xs text-slate-400">DoLR Governance Board</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            State Dataset Validation & Indexing Queue
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Review uploaded cadastral maps, soil surveys, and policy documentation before committing them to the national PostGIS database.
          </p>
        </div>

        <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg font-bold shrink-0">
          {pendingDatasets.length} Datasets Pending Review
        </span>
      </div>

      {/* Queue List */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
        
        {pendingDatasets.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <CheckCircle2 className="h-12 w-12 text-emerald-500 mx-auto" />
            <h4 className="text-base font-bold text-slate-900">All Datasets Evaluated!</h4>
            <p className="text-xs text-slate-500">There are no pending dataset validation requests in the queue.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingDatasets.map((item) => (
              <div key={item.id} className="p-4 border border-slate-200 rounded-xl bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:border-emerald-300 transition-all">
                
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded border border-amber-200">{item.status}</span>
                    <span className="text-xs font-mono text-slate-500">{item.format} • {item.size} • State: {item.state}</span>
                  </div>
                  <h4 className="font-bold text-sm text-slate-900 flex items-center">
                    <Database className="h-4 w-4 mr-2 text-emerald-600" /> {item.title}
                  </h4>
                  <p className="text-xs text-slate-500">Uploaded by: <strong className="text-slate-800">{item.uploader}</strong></p>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => rejectDataset(item.id)}
                    className="px-3 py-1.5 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-lg text-xs font-bold transition-colors"
                  >
                    Reject
                  </button>
                  <button
                    onClick={() => approveDataset(item.id)}
                    className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition-all shadow-md shadow-emerald-600/20"
                  >
                    Approve & Index Data Lake
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>

    </div>
  );
}
