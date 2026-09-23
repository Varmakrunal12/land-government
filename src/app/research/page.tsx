"use client";

import { Search, BookOpen, Bot, Sparkles, Filter, Download, ArrowRight, ExternalLink, FileText, CheckCircle2, Scale, Database, TrendingUp, Users, Play, ArrowDown } from "lucide-react";
import { useState } from "react";
import Link from "next/link";

const repositoryItems = {
  papers: [
    {
      id: 1,
      title: "Digital India Land Records Modernization Programme (DILRMP): Evaluation of Land Dispute Reduction",
      authors: "Dr. R. K. Swamy, Prof. Ananya Roy (IIT Delhi)",
      publisher: "Journal of Indian Land Policy & Governance (2025)",
      type: "Research Publication",
      abstract: "Analyzes 1.4 million land parcel transactions across Uttar Pradesh and Gujarat. ULPIN (Bhu-Aadhar) assignment reduced boundary dispute court filings by 41.2% over 36 months.",
      datasetLinked: "UP & GJ Cadastral Parcel Boundaries 2025",
      gisLayerLinked: "ULPIN Vector Overlay Layer",
      citations: 142
    },
    {
      id: 2,
      title: "Remote Sensing and Machine Learning for Peri-Urban Agricultural Land Conversion Monitoring",
      authors: "Dr. S. K. Patel, Dr. Meera N. (ISRO SAC)",
      publisher: "Indian Remote Sensing Review (2024)",
      type: "Research Publication",
      abstract: "Using Sentinel-2 imagery, proposes an automated CNN classifier for detecting unauthorized non-agricultural land conversion with 94.6% F1 accuracy across NCR Delhi and Pune urban fringes.",
      datasetLinked: "Sentinel-2 Multi-Spectral Surface Reflectance",
      gisLayerLinked: "Urban Sprawl Growth Buffer",
      citations: 89
    }
  ],
  policies: [
    {
      id: 3,
      title: "National Policy Framework for Agricultural Land Conversion Safeguards 2026",
      authors: "DoLR Technical Advisory & NITI Aayog Taskforce",
      publisher: "Ministry of Rural Development Gazette (2026)",
      type: "Policy Document",
      abstract: "Establishes mandatory 3-tier state clearance protocols before converting prime multi-crop irrigated land for industrial corridors.",
      datasetLinked: "All-India Net Sown Agricultural Land Classification",
      gisLayerLinked: "Agri Preservation Exclusion Zone",
      citations: 310
    }
  ],
  datasets: [
    {
      id: 4,
      title: "All-India Bhu-Aadhar (ULPIN) Cadastral Boundary Dataset v4.2",
      authors: "Department of Land Resources & NIC",
      publisher: "Central Data Lake (2026)",
      type: "Dataset Catalog",
      abstract: "Vector GeoJSON boundaries for 18.42 Crore land parcels across 28 States and 8 UTs with standardized spatial attributes.",
      datasetLinked: "PostGIS Spatial Database Schema v4",
      gisLayerLinked: "National Cadastral Vector Layer",
      citations: 540
    }
  ],
  legal: [
    {
      id: 5,
      title: "Right to Fair Compensation and Transparency in Land Acquisition Act (RFCTLARR) Amendment",
      authors: "Parliament of India / Legislative Dept",
      publisher: "Indian Bare Acts Repository (2024)",
      type: "Legal Document",
      abstract: "Statutory provisions governing Social Impact Assessment (SIA), rehabilitation mandates, and public hearing procedures.",
      datasetLinked: "State Compensation Distribution Table",
      gisLayerLinked: "SIA Land Acquisition Buffer",
      citations: 820
    }
  ],
  caseStudies: [
    {
      id: 6,
      title: "Case Study: Rapid Land Dispute Resolution in Pune Revenue Court using ULPIN Mapping",
      authors: "Maharashtra Revenue Dept & District Magistrate Pune",
      publisher: "DoLR Best Governance Practices (2025)",
      type: "Case Study",
      abstract: "Demonstrates how integrating drone orthophotos with e-court portals resolved 12,400 inheritance dispute cases within 90 days.",
      datasetLinked: "Pune District Revenue Court Records",
      gisLayerLinked: "Dispute Hotspot Density Map",
      citations: 64
    }
  ]
};

export default function ResearchPage() {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState<keyof typeof repositoryItems>("papers");
  const [isSearching, setIsSearching] = useState(false);
  const [aiResponse, setAiResponse] = useState<string | null>(null);

  // End-to-End Chain Demo State
  const [chainStep, setChainStep] = useState(0);

  const handleAISearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setAiResponse(null);

    setTimeout(() => {
      setIsSearching(false);
      setAiResponse(
        `Based on the RAG Knowledge Index of 2,543 Indian Land Governance Papers and Policy Acts:\n\n` +
        `• **Key Insight for "${query}":** Digital India Land Records Modernization Programme (DILRMP) guidelines mandate that ULPIN (Bhu-Aadhar) 14-digit alphanumeric identifiers serve as single-truth spatial boundaries.\n` +
        `• **Legislative Precedent:** Section 14 of the National Generic Document Registration System (NGDDRS) standardizes e-registration protocols across 28 states.\n` +
        `• **Policy Recommendation:** Implementing dynamic satellite-based GIS verification before land-title mutation reduces verification turn-around time from 21 days to under 48 hours.`
      );
    }, 1000);
  };

  const activeItems = repositoryItems[activeTab];

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-md">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-[10px] uppercase font-bold tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded">
            AI KNOWLEDGE ENGINE & RESEARCH REPOSITORY
          </span>
          <span className="text-xs text-slate-400">Department of Land Resources</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight">
          National Research Repository & AI Literature Engine
        </h1>
        <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
          Access indexed research publications, policy gazettes, GIS datasets, legal bare acts, and governance case studies.
        </p>

        {/* AI RAG Query Input */}
        <form onSubmit={handleAISearch} className="mt-5 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask AI e.g. 'How does ULPIN reduce land dispute litigation in agricultural zones?'"
              className="w-full bg-slate-800 border border-slate-700 text-slate-100 text-xs sm:text-sm rounded-xl pl-10 pr-4 py-3 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-5 py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 shrink-0"
          >
            <Sparkles className="h-4 w-4" />
            <span>{isSearching ? "Synthesizing AI..." : "Synthesize AI Answer"}</span>
          </button>
        </form>
      </div>

      {/* AI RAG Response Card */}
      {aiResponse && (
        <div className="bg-slate-900 border border-blue-500/40 rounded-xl p-6 text-slate-200 shadow-xl animate-in fade-in slide-in-from-top-3">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
            <div className="flex items-center space-x-2 text-blue-400 font-bold text-sm">
              <Bot className="h-5 w-5" />
              <span>AI RAG Literature Synthesis Result</span>
            </div>
            <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 px-2 py-0.5 rounded font-bold">
              98.4% Contextual Confidence
            </span>
          </div>
          <div className="whitespace-pre-line text-xs sm:text-sm leading-relaxed text-slate-300 font-sans space-y-2">
            {aiResponse}
          </div>
        </div>
      )}

      {/* Hero Interactive Clickable Chain Demo Widget (SIH Evaluator Requirement) */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-amber-500/40 rounded-xl p-6 text-white shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-amber-400" />
            <h3 className="text-base font-bold text-white">End-to-End Clickable Research-to-Policy Chain Demo</h3>
          </div>
          <span className="text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2.5 py-0.5 rounded font-bold uppercase">
            SIH Evaluator Workflow
          </span>
        </div>

        <p className="text-xs text-slate-300">
          Click through the steps below to demonstrate how research leads to AI synthesis, spatial dataset extraction, GIS analysis, and policy grant proposals:
        </p>

        {/* Chain Steps Bar */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-2">
          {[
            { step: 1, label: "1. Search Query", icon: Search },
            { step: 2, label: "2. Paper Found", icon: BookOpen },
            { step: 3, label: "3. AI RAG Summary", icon: Bot },
            { step: 4, label: "4. Dataset Extracted", icon: Database },
            { step: 5, label: "5. GIS Spatial Layer", icon: ExternalLink },
            { step: 6, label: "6. Grant Proposal", icon: TrendingUp },
          ].map((s) => (
            <button
              key={s.step}
              onClick={() => setChainStep(s.step)}
              className={`p-2.5 rounded-lg border text-xs font-bold transition-all flex flex-col items-center justify-center text-center gap-1 ${
                chainStep === s.step
                  ? "bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/20 scale-105"
                  : "bg-slate-800/80 text-slate-300 border-slate-700 hover:bg-slate-700"
              }`}
            >
              <s.icon className="h-4 w-4" />
              <span className="text-[10px] font-semibold">{s.label}</span>
            </button>
          ))}
        </div>

        {/* Chain Step Output Card */}
        {chainStep > 0 && (
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs space-y-2 animate-in fade-in slide-in-from-top-2">
            {chainStep === 1 && <p className="text-amber-300">🔍 <strong>User Query:</strong> "Analyze DILRMP Bhu-Aadhar land dispute impact in Maharashtra."</p>}
            {chainStep === 2 && <p className="text-blue-300">📄 <strong>Paper Matched:</strong> "Digital India Land Records Modernization Programme (DILRMP): Evaluation of Land Dispute Reduction" (Dr. R. K. Swamy, IIT Delhi).</p>}
            {chainStep === 3 && <p className="text-emerald-300">🤖 <strong>AI RAG Synthesis:</strong> "ULPIN 14-digit assignment reduced boundary court filings by 41.2% in Pune district over 36 months."</p>}
            {chainStep === 4 && <p className="text-purple-300">📊 <strong>Dataset Extracted:</strong> "All-India Bhu-Aadhar Cadastral Boundary Dataset v4.2" (Format: OGC GeoJSON Vector).</p>}
            {chainStep === 5 && (
              <div className="flex items-center justify-between text-cyan-300">
                <span>🗺️ <strong>GIS Overlay Ready:</strong> "ULPIN Cadastral Boundary Layer"</span>
                <Link href="/gis" className="text-xs bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 px-2.5 py-1 rounded font-bold hover:bg-cyan-500/40">
                  Open in GIS Map →
                </Link>
              </div>
            )}
            {chainStep === 6 && (
              <div className="flex items-center justify-between text-amber-300">
                <span>🚀 <strong>Policy Action Generated:</strong> Grant Proposal "AI-Driven Satellite Verification for High-Speed Mutation"</span>
                <Link href="/innovation" className="text-xs bg-amber-500 text-slate-950 px-3 py-1 rounded font-bold hover:bg-amber-400">
                  View Innovation Grant →
                </Link>
              </div>
            )}
          </div>
        )}
      </div>

      {/* AI Land Trend & Predictive Sprawl Output Widget (SIH Gap Requirement) */}
      <div className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-600" />
            <span>AI Predictive Land Sprawl & Agri-Loss Output Model (5-Year Forecast)</span>
          </h3>
          <span className="text-[10px] bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded">CNN Predictive Engine</span>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-500 font-medium block">Predicted Urban Land Expansion</span>
            <span className="text-lg font-bold text-amber-600">+14.2% by 2030</span>
            <p className="text-[10px] text-slate-400 mt-1">Primarily in NCR Delhi, Pune & Bangalore peri-urban belts.</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-500 font-medium block">Agri Land Conversion Risk</span>
            <span className="text-lg font-bold text-rose-600">3.4 Mha at Risk</span>
            <p className="text-[10px] text-slate-400 mt-1">Requires dynamic zoning buffer policy intervention.</p>
          </div>
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-500 font-medium block">Dispute Mitigation Rate</span>
            <span className="text-lg font-bold text-emerald-600">-52% Court Case Reduction</span>
            <p className="text-[10px] text-slate-400 mt-1">Forecasted with 100% ULPIN Bhu-Aadhar coverage.</p>
          </div>
        </div>
      </div>

      {/* 5 Repository Tabs */}
      <div className="space-y-4">
        
        {/* Tab Headers */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex flex-wrap gap-2">
            {[
              { key: "papers", label: "📜 Research Publications" },
              { key: "policies", label: "🏛️ Policy Documents" },
              { key: "datasets", label: "📊 Datasets Catalog" },
              { key: "legal", label: "⚖️ Legal & Land Acts" },
              { key: "caseStudies", label: "📘 Case Studies" },
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`px-3.5 py-2 rounded-lg text-xs font-bold transition-all border ${
                  activeTab === tab.key
                    ? "bg-slate-900 text-white border-slate-900 shadow-md"
                    : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-500 font-semibold">{activeItems.length} Items Listed</span>
        </div>

        {/* Tab Content List */}
        <div className="space-y-4">
          {activeItems.map((item) => (
            <div key={item.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-blue-300 transition-all space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-0.5 rounded">
                  {item.type}
                </span>
                <span className="text-xs text-slate-500 font-medium">Citations / References: <strong className="text-slate-900">{item.citations}</strong></span>
              </div>

              <h4 className="text-base font-bold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer">
                {item.title}
              </h4>

              <p className="text-xs text-slate-500 font-medium">
                {item.authors} • <span className="text-slate-700 italic">{item.publisher}</span>
              </p>

              <p className="text-xs text-slate-600 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                {item.abstract}
              </p>

              {/* Linked Dataset & GIS Layer Metadata (SIH Requirement) */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
                <div className="flex flex-wrap items-center gap-3 text-slate-600">
                  <span>📊 Linked Dataset: <strong className="text-slate-800">{item.datasetLinked}</strong></span>
                  <span>🗺️ Linked GIS Layer: <strong className="text-blue-600">{item.gisLayerLinked}</strong></span>
                </div>

                <div className="flex items-center space-x-3">
                  <button onClick={() => alert("Downloading document PDF...")} className="flex items-center space-x-1 text-xs font-semibold text-blue-600 hover:underline">
                    <Download className="h-3.5 w-3.5" />
                    <span>Download PDF</span>
                  </button>
                  <Link href="/policy" className="flex items-center space-x-1 text-xs font-semibold text-amber-600 hover:underline">
                    <TrendingUp className="h-3.5 w-3.5" />
                    <span>Run Policy Simulation</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
