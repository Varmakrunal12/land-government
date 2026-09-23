"use client";

import { Lightbulb, Plus, CheckCircle2, FileText, Send, ThumbsUp, User, Award, Tag } from "lucide-react";
import { useState } from "react";
import { useGlobalData } from "@/context/GlobalDataContext";

export default function InnovationPage() {
  const { proposals, addProposal, voteProposal, approveProposal } = useGlobalData();
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("AI & Remote Sensing");
  const [budget, setBudget] = useState("");
  const [state, setState] = useState("Uttar Pradesh");
  const [summary, setSummary] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !author) return;

    addProposal({
      title,
      author,
      category,
      budget: `₹${budget || 25} Lakhs`,
      state,
      summary: summary || "Proposed research innovation project for national land governance improvement."
    });

    setShowModal(false);
    // Reset
    setTitle("");
    setAuthor("");
    setSummary("");
    alert("✅ Innovation Proposal successfully submitted & logged across DoLR network!");
  };

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded">
              NATIONAL INNOVATION & RESEARCH PORTAL
            </span>
            <span className="text-xs text-slate-400">SIH 2026 Submission Platform</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Land Governance Innovation Grant Proposals
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Submit, evaluate, and pilot innovative research proposals for modernizing land records, DILRMP rollout, and GIS analytics.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-3 rounded-xl text-xs font-bold transition-all shadow-lg shadow-amber-500/10 shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Submit Project Proposal</span>
        </button>
      </div>

      {/* Proposals List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <span>Active Innovation & Pilot Proposals</span>
            <span className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded-full font-semibold">
              {proposals.length} Total
            </span>
          </h3>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {proposals.map((p) => (
            <div key={p.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-amber-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
              
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded">
                    {p.category}
                  </span>
                  <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${p.status === "Approved for Pilot" ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-blue-100 text-blue-800 border-blue-200"}`}>
                    {p.status}
                  </span>
                  <span className="text-xs text-slate-500 font-semibold">• Target State: <strong className="text-slate-800">{p.state}</strong></span>
                </div>

                <h4 className="text-base font-bold text-slate-900">{p.title}</h4>
                <p className="text-xs text-slate-500 font-medium">Submitted by: <strong className="text-slate-800">{p.author}</strong> • Grant Request: <strong className="text-emerald-600">{p.budget}</strong></p>
                <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">{p.summary}</p>
              </div>

              {/* Voting & Action */}
              <div className="flex md:flex-col items-center justify-between md:justify-center border-t md:border-t-0 md:border-l border-slate-200 pt-3 md:pt-0 md:pl-6 gap-3 shrink-0">
                <button
                  onClick={() => voteProposal(p.id)}
                  className="flex items-center space-x-2 bg-slate-100 hover:bg-amber-50 hover:text-amber-700 text-slate-700 px-4 py-2 rounded-xl text-xs font-bold transition-all border border-slate-200"
                >
                  <ThumbsUp className="h-4 w-4 text-amber-500" />
                  <span>Upvote ({p.votes})</span>
                </button>

                {p.status === "Under DoLR Review" && (
                  <button onClick={() => approveProposal(p.id)} className="text-xs font-bold text-emerald-600 hover:underline">
                    Approve for Pilot
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Modal for Submission */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Send className="h-5 w-5 text-amber-500" />
                <span>Submit Land Governance Proposal</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700 text-sm font-bold">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Proposal Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI-assisted Satellite Cadastral Boundary Alignment"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Principal Researcher / Lead</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Dr. A. K. Verma (IIT Delhi)"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Grant Budget (Lakhs ₹)</label>
                  <input
                    type="number"
                    placeholder="e.g. 40"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="AI & Remote Sensing">AI & Remote Sensing</option>
                    <option value="Blockchain & Governance">Blockchain & Governance</option>
                    <option value="Climate & Agriculture">Climate & Agriculture</option>
                    <option value="Legal & Land Dispute">Legal & Land Dispute</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Pilot State</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Gujarat">Gujarat</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Karnataka">Karnataka</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Executive Summary & Methodology</label>
                <textarea
                  rows={3}
                  placeholder="Describe your research objectives, dataset requirements, and anticipated policy impact..."
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                ></textarea>
              </div>

              <div className="flex items-center justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-300 rounded-lg text-xs font-bold text-slate-700 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold transition-all shadow-md"
                >
                  Submit Proposal to DoLR
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
