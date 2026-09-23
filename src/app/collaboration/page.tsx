"use client";

import { MessageSquare, Users, ShieldCheck, CheckCircle2, Clock, Send, FileText, User, Award } from "lucide-react";
import { useState } from "react";
import { useGlobalData } from "@/context/GlobalDataContext";

const initialExperts = [
  { name: "Dr. A. K. Sharma", role: "GIS & Remote Sensing Specialist", org: "ISRO Space Applications Centre", status: "Sign-off Approved ✅" },
  { name: "Smt. K. Verma", role: "State Revenue Land Commissioner", org: "Revenue Dept, Govt. of UP", status: "Sign-off Approved ✅" },
  { name: "Dr. S. Patel", role: "Environmental Impact Auditor", org: "MoEFCC Coastal Board", status: "Sign-off Approved ✅" },
  { name: "Shri R. P. Mehta", role: "Legal & Land Title Specialist", org: "National Land Law Institute", status: "Review Pending ⏳" },
];

const initialDiscussions = [
  {
    id: 1,
    author: "Dr. A. K. Sharma (GIS Specialist)",
    date: "2026-09-19 14:10",
    project: "DILRMP Uttar Pradesh Cadastral Boundary Alignment",
    comment: "Verified Sentinel-2 spatial orthophotos against 34,000 village revenue maps. Vector geometry alignment passes OGC WFS 1.1 specs with 99.1% boundary precision.",
    status: "Verified"
  },
  {
    id: 2,
    author: "Dr. S. Patel (Environmental Expert)",
    date: "2026-09-19 14:45",
    project: "Gujarat Coastal Soil Salinity Reclamation Project",
    comment: "Recommending a 500m mandatory mangrove eco-buffer along the Kutch coastline before industrial land monetization approval.",
    status: "Recommendation Added"
  }
];

export default function CollaborationPage() {
  const { addLog } = useGlobalData();
  const [discussions, setDiscussions] = useState(initialDiscussions);
  const [commentText, setCommentText] = useState("");
  const [selectedProject, setSelectedProject] = useState("DILRMP Uttar Pradesh Cadastral Boundary Alignment");
  const [selectedRole, setSelectedRole] = useState("GIS & Remote Sensing Specialist");

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    const newComment = {
      id: Date.now(),
      author: `Expert User (${selectedRole})`,
      date: new Date().toISOString().replace("T", " ").substring(0, 16),
      project: selectedProject,
      comment: commentText,
      status: "Peer Review Added"
    };

    setDiscussions([newComment, ...discussions]);
    addLog("INFO", `Expert (${selectedRole}) added peer review validation on '${selectedProject}'.`, "Expert Collaboration");
    setCommentText("");
    alert("✅ Expert validation comment & sign-off submitted to DoLR National Board!");
  };

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded">
              INTER-DISCIPLINARY EXPERT COLLABORATION & PEER REVIEW
            </span>
            <span className="text-xs text-slate-400">Department of Land Resources</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Expert Peer Review & Multi-Tier Sign-off Portal
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Collaborative workspace enabling GIS Remote Sensing Analysts, State Revenue Officers, Environmental Auditors, and Legal Experts to validate policy decisions before national implementation.
          </p>
        </div>

        <span className="text-xs bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 rounded-lg font-bold shrink-0 flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4" />
          <span>3/4 Experts Signed Off</span>
        </span>
      </div>

      {/* Expert Roster Panel */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
          <Users className="h-5 w-5 text-amber-500" />
          <span>Assigned Interdisciplinary Policy Evaluation Board</span>
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {initialExperts.map((exp, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col justify-between space-y-2">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">EXPERT #{idx + 1}</span>
                  <span className={`text-[10px] font-bold ${exp.status.includes("Approved") ? "text-emerald-600" : "text-amber-600"}`}>{exp.status}</span>
                </div>
                <h4 className="font-bold text-xs text-slate-900">{exp.name}</h4>
                <p className="text-[11px] text-slate-600 font-medium mt-0.5">{exp.role}</p>
                <p className="text-[10px] text-slate-400 mt-0.5 font-mono">{exp.org}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Add Peer Review Form & Discussion Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Peer Review Form (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <MessageSquare className="h-5 w-5 text-amber-500" />
            <span>Submit Expert Validation Comment</span>
          </h3>

          <form onSubmit={handleAddComment} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Select Policy / GIS Project</label>
              <select
                value={selectedProject}
                onChange={(e) => setSelectedProject(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-amber-500"
              >
                <option value="DILRMP Uttar Pradesh Cadastral Boundary Alignment">DILRMP Uttar Pradesh Cadastral Boundary Alignment</option>
                <option value="Gujarat Coastal Soil Salinity Reclamation Project">Gujarat Coastal Soil Salinity Reclamation Project</option>
                <option value="National Agriculture-to-Urban Land Zoning Directive">National Agriculture-to-Urban Land Zoning Directive</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Your Expert Specialization Role</label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 font-medium focus:ring-2 focus:ring-amber-500"
              >
                <option value="GIS & Remote Sensing Specialist">GIS & Remote Sensing Specialist</option>
                <option value="Environmental Impact Auditor">Environmental Impact Auditor</option>
                <option value="State Revenue Land Commissioner">State Revenue Land Commissioner</option>
                <option value="Legal & Land Title Specialist">Legal & Land Title Specialist</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Technical Review Comments & Sign-off Notes</label>
              <textarea
                rows={4}
                required
                placeholder="Enter technical findings, spatial validation results, or policy approval conditions..."
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-md flex items-center justify-center space-x-2"
            >
              <Send className="h-4 w-4" />
              <span>Submit Expert Peer Review & Sign-off</span>
            </button>
          </form>
        </div>

        {/* Live Discussion Stream (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
              <FileText className="h-5 w-5 text-emerald-600" />
              <span>Live Multi-Disciplinary Discussion Feed</span>
            </h3>
            <span className="text-xs bg-slate-100 text-slate-700 px-2.5 py-0.5 rounded-full font-semibold">
              {discussions.length} Comments
            </span>
          </div>

          <div className="space-y-3">
            {discussions.map((d) => (
              <div key={d.id} className="p-4 rounded-xl border border-slate-200 bg-slate-50 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-slate-900">{d.author}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{d.date}</span>
                </div>
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded inline-block">
                  Project: {d.project}
                </span>
                <p className="text-xs text-slate-700 leading-relaxed bg-white p-3 rounded-lg border border-slate-200">{d.comment}</p>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
