"use client";

import { Activity, CheckCircle2, Clock, AlertTriangle, ChevronRight } from "lucide-react";
import { useState } from "react";

const initialPolicies = [
  {
    id: 1,
    title: "Digital India Land Records Modernization Programme (DILRMP) Phase 4",
    leadDept: "DoLR & State Revenue Boards",
    progress: 88,
    status: "Active Rollout",
    districtsCovered: "680 / 766 Districts",
    targetDate: "Dec 2026",
    milestones: [
      { text: "100% Cadastral Map Digitization", done: true },
      { text: "ULPIN Bhu-Aadhar Assignment", done: true },
      { text: "Integration with High Court Litigation Database", done: false }
    ]
  },
  {
    id: 2,
    title: "National Generic Document Registration System (NGDDRS) Standardization",
    leadDept: "Ministry of Electronics & IT + DoLR",
    progress: 74,
    status: "State Adoption Phase",
    districtsCovered: "28 States & UTs",
    targetDate: "Mar 2027",
    milestones: [
      { text: "Single-window online land mutation", done: true },
      { text: "Biometric e-stamp verification", done: true },
      { text: "Real-time bank mortgage encumbrance check", done: false }
    ]
  },
  {
    id: 3,
    title: "Coastal Soil Salinity Reclamation & Zoning Directive 2025",
    leadDept: "MoEFCC & DoLR Agricultural Board",
    progress: 42,
    status: "Pilot Phase",
    districtsCovered: "14 Coastal Districts",
    targetDate: "Jun 2027",
    milestones: [
      { text: "Satellite soil salinity mapping", done: true },
      { text: "Buffer zone legislative notification", done: false },
      { text: "Farmer compensation distribution", done: false }
    ]
  }
];

export default function PolicyTrackingPage() {
  const [policies, setPolicies] = useState(initialPolicies);

  const toggleMilestone = (policyId: number, mIndex: number) => {
    setPolicies(prev => prev.map(p => {
      if (p.id !== policyId) return p;
      const updatedMs = [...p.milestones];
      updatedMs[mIndex].done = !updatedMs[mIndex].done;
      
      // recalculate progress
      const doneCount = updatedMs.filter(m => m.done).length;
      const newPct = Math.round((doneCount / updatedMs.length) * 100);

      return { ...p, milestones: updatedMs, progress: newPct };
    }));
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-md">
        <div className="flex items-center space-x-2 mb-1">
          <span className="text-[10px] uppercase font-bold tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded">
            POLICY IMPLEMENTATION & EXECUTION TRACKER
          </span>
          <span className="text-xs text-slate-400">Department of Land Resources</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          National Land Policy & Scheme Rollout Tracking
        </h1>
        <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
          Monitor state-by-state execution milestones for DILRMP, NGDDRS, ULPIN Bhu-Aadhar, and environmental land preservation directives.
        </p>
      </div>

      {/* Policy Tracking List */}
      <div className="space-y-4">
        {policies.map((p) => (
          <div key={p.id} className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold uppercase bg-emerald-100 text-emerald-800 px-2.5 py-0.5 rounded border border-emerald-200">
                    {p.status}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">Lead: <strong className="text-slate-800">{p.leadDept}</strong></span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{p.title}</h3>
              </div>

              <div className="text-right shrink-0">
                <span className="text-2xl font-black text-emerald-600">{p.progress}%</span>
                <span className="text-[10px] block text-slate-400 uppercase font-semibold">Target: {p.targetDate}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden border border-slate-200">
                <div className="bg-emerald-500 h-3 rounded-full transition-all duration-300" style={{ width: `${p.progress}%` }}></div>
              </div>
              <div className="flex justify-between text-[11px] text-slate-500 font-medium pt-0.5">
                <span>Coverage: <strong className="text-slate-800">{p.districtsCovered}</strong></span>
                <span>{p.progress}% Milestone Completed</span>
              </div>
            </div>

            {/* Milestones Checklist */}
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 space-y-2">
              <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">Key Directive Milestones (Click to toggle)</h4>
              {p.milestones.map((m, idx) => (
                <div
                  key={idx}
                  onClick={() => toggleMilestone(p.id, idx)}
                  className="flex items-center space-x-3 cursor-pointer p-2 rounded hover:bg-white transition-colors"
                >
                  <div className={`h-4 w-4 rounded flex items-center justify-center border transition-colors ${m.done ? "bg-emerald-500 border-emerald-600 text-white" : "border-slate-300 bg-white"}`}>
                    {m.done && <CheckCircle2 className="h-3.5 w-3.5" />}
                  </div>
                  <span className={`text-xs font-medium ${m.done ? "text-slate-800 font-semibold" : "text-slate-500"}`}>
                    {m.text}
                  </span>
                </div>
              ))}
            </div>

          </div>
        ))}
      </div>

    </div>
  );
}
