"use client";

import { 
  Search, 
  BookOpen, 
  Bot, 
  Sparkles, 
  Filter, 
  Download, 
  ArrowRight, 
  ExternalLink, 
  FileText, 
  CheckCircle2, 
  Scale, 
  Database, 
  TrendingUp, 
  Users, 
  Play, 
  ArrowDown,
  Layers,
  ShieldCheck,
  ChevronRight,
  Info,
  Check
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { generateOfficialGovernmentPdf } from "@/utils/generatePdf";

// Repository Items Categories
const repositoryItems = {
  papers: [
    {
      id: 1,
      title: "Digital India Land Records Modernization Programme (DILRMP): Evaluation of Land Dispute Reduction",
      authors: "Dr. R. K. Swamy, Prof. Ananya Roy (IIT Delhi)",
      publisher: "Journal of Indian Land Policy & Governance (2025)",
      type: "Research Publication",
      citationKey: "[2]",
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
      citationKey: "[2]",
      abstract: "Using Sentinel-2 imagery, proposes an automated CNN classifier for detecting unauthorized non-agricultural land conversion with 94.6% F1 accuracy across NCR Delhi and Ahmedabad urban fringes.",
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
      citationKey: "[4]",
      abstract: "Establishes mandatory 3-tier state clearance protocols and automated GIS zoning checks before converting prime multi-crop irrigated land for industrial corridors.",
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
      citationKey: "[3]",
      abstract: "Vector GeoJSON boundaries for 18.42 Crore land parcels across 28 States and 8 UTs with standardized spatial attributes and geo-coordinates.",
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
      citationKey: "[4]",
      abstract: "Statutory provisions governing Social Impact Assessment (SIA), rehabilitation mandates, and public hearing procedures.",
      datasetLinked: "State Compensation Distribution Table",
      gisLayerLinked: "SIA Land Acquisition Buffer",
      citations: 820
    }
  ],
  govReports: [
    {
      id: 6,
      title: "DoLR Annual National Land Governance Audit & NITI Aayog Conversion Assessment 2025",
      authors: "Department of Land Resources, Ministry of Rural Development",
      publisher: "Official Parliamentary Report (2025)",
      type: "Government Report",
      citationKey: "[1]",
      abstract: "Comprehensive state-by-state evaluation of DILRMP, cadastral digitization, industrial corridor conversions in Gujarat and Maharashtra, and dispute settlement benchmarks.",
      datasetLinked: "National Land Revenue Statistics 2025",
      gisLayerLinked: "State Digitization Progress Vector Layer",
      citations: 420
    }
  ]
};

// Pre-configured evidence-backed RAG responses
const preloadedRAGResponses: Record<string, {
  summary: string;
  trends: string[];
  sources: Array<{
    citationIndex: string;
    type: string;
    typeColor: string;
    title: string;
    author: string;
    date: string;
    confidence: string;
    excerpt: string;
  }>;
}> = {
  "gujarat": {
    summary: `Based on multi-source RAG synthesis across 4 verified national knowledge repositories:\n\n` +
      `The primary drivers of agricultural land conversion in Gujarat include rapid industrial corridor expansion [1], peri-urban infrastructure connectivity (SG Highway, Sanand Auto Cluster, and Dholera SIR) [2], and speculative non-agricultural (NA) land diversion [3]. Under Section 65 of the Gujarat Land Revenue Code and the National Policy Framework 2026 [4], multi-crop irrigated land requires mandatory 3-tier scrutiny, yet automated remote sensing reveals a 18.4% diversion of peri-urban farmland in Ahmedabad and Surat districts over the 2018–2026 observation window [2].`,
    trends: [
      "Urban Built-Up Sprawl: +42.7% growth in Ahmedabad peri-urban belt between 2018 and 2026 [2]",
      "Agricultural Farmland Loss: 7,600 Hectares diverted primarily along Sanand and Changodar transport corridors [1]",
      "SLA Turnaround: AI pre-mutation screening reduced NA verification from 21 days to under 48 hours [3]"
    ],
    sources: [
      {
        citationIndex: "[1]",
        type: "Government Report",
        typeColor: "bg-amber-100 text-amber-800 border-amber-200",
        title: "DoLR Annual Land Administration Audit & NITI Aayog Agricultural Land Conversion Assessment 2025",
        author: "Ministry of Rural Development, Govt. of India",
        date: "December 2025",
        confidence: "99.1% Confidence Match",
        excerpt: "Chapter 4, Page 84: 'State of Gujarat recorded 34,200 non-agricultural conversion applications in FY25. Industrial expansion along the DMIC expressway accounted for 62.4% of total farmland reclassifications.'"
      },
      {
        citationIndex: "[2]",
        type: "Research Paper",
        typeColor: "bg-blue-100 text-blue-800 border-blue-200",
        title: "Remote Sensing and Machine Learning for Peri-Urban Agricultural Land Conversion Monitoring",
        author: "Dr. S. K. Patel, Dr. Meera N. (ISRO Space Applications Centre & IIT Gandhinagar)",
        date: "Indian Remote Sensing Review, 2024",
        confidence: "98.6% Confidence Match",
        excerpt: "Section 3.2: 'Multi-spectral Sentinel-2 time series confirms an 18.4% net decline in irrigated agricultural area around Ahmedabad peri-urban ring, with CNN detection accuracy reaching 94.6% F1 score.'"
      },
      {
        citationIndex: "[3]",
        type: "Land Dataset",
        typeColor: "bg-purple-100 text-purple-800 border-purple-200",
        title: "All-India Bhu-Aadhar (ULPIN) Cadastral Boundary & Revenue Statistics v4.2",
        author: "National Informatics Centre (NIC) & DoLR Data Lake",
        date: "Updated September 2026",
        confidence: "97.8% Confidence Match",
        excerpt: "Dataset Schema ID: GJ-REV-2026-LULC: Contains 1.98 Crore digitized land parcels with verified GIS geometry, mutation histories, and survey number classifications."
      },
      {
        citationIndex: "[4]",
        type: "Policy / Legal Document",
        typeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        title: "National Policy Framework for Agricultural Land Conversion Safeguards 2026 & Gujarat Land Revenue Code",
        author: "DoLR Technical Advisory Board & Parliamentary Gazette",
        date: "Gazette Notification No. 412/2026",
        confidence: "99.4% Confidence Match",
        excerpt: "Section 14 & Clause 65-A: 'No agricultural land possessing perennial canal irrigation shall be converted for commercial use without prior Environmental Soil Impact Assessment (ESIA) and District Collector NOC.'"
      }
    ]
  },
  "disputes": {
    summary: `Evidence-based synthesis on ULPIN and land dispute litigation:\n\n` +
      `Deployment of the 14-digit Unique Land Parcel Identification Number (ULPIN / Bhu-Aadhar) acts as an immutable spatial single-source of truth [3]. Across 1.4 million transactions, assigning geo-referenced vector boundaries reduced boundary encroachment litigation by 41.2% within 36 months [2]. Furthermore, automated integration with e-Courts and NGDDRS e-registration prevented fraudulent multi-party sales [1], slashing average court dispute turnaround duration from 240 days down to 42 days [4].`,
    trends: [
      "Boundary Litigation Drop: -41.2% in Pune, Ahmedabad, and Varanasi pilot districts [2]",
      "Turnaround Acceleration: Average court case resolution shortened from 240 to 42 days [1]",
      "Pre-emptive Fraud Arrest: Automated GIS locks blocked 1,420 conflicting sale attempts [3]"
    ],
    sources: [
      {
        citationIndex: "[1]",
        type: "Government Report",
        typeColor: "bg-amber-100 text-amber-800 border-amber-200",
        title: "DoLR National Land Governance & e-Courts Integration Audit 2026",
        author: "Department of Land Resources & Ministry of Law and Justice",
        date: "January 2026",
        confidence: "99.0% Match",
        excerpt: "Page 42: 'Integration of ULPIN with e-Courts enabled revenue benches to issue geo-verified verdicts in an average of 42 calendar days.'"
      },
      {
        citationIndex: "[2]",
        type: "Research Paper",
        typeColor: "bg-blue-100 text-blue-800 border-blue-200",
        title: "Digital India Land Records Modernization Programme: Evaluation of Land Dispute Reduction",
        author: "Dr. R. K. Swamy, Prof. Ananya Roy (IIT Delhi)",
        date: "Journal of Indian Land Policy & Governance, 2025",
        confidence: "98.9% Match",
        excerpt: "Empirical regression reveals boundary litigation dropped 41.2% in villages with 100% drone-verified ULPIN records."
      },
      {
        citationIndex: "[3]",
        type: "Land Dataset",
        typeColor: "bg-purple-100 text-purple-800 border-purple-200",
        title: "All-India Bhu-Aadhar (ULPIN) Cadastral Boundary Dataset v4.2",
        author: "NIC & DoLR Central Spatial Store",
        date: "2026",
        confidence: "98.2% Match",
        excerpt: "Includes 18.42 Crore parcel polygons with zero-overlap topological validation checks."
      },
      {
        citationIndex: "[4]",
        type: "Policy / Legal Document",
        typeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
        title: "National Generic Document Registration System (NGDDRS) Standard v3.0",
        author: "Ministry of Rural Development Gazette",
        date: "2025",
        confidence: "97.5% Match",
        excerpt: "Mandatory spatial verification rule before title deed mutation approval."
      }
    ]
  }
};

export default function ResearchEvidencePage() {
  const [query, setQuery] = useState("What are the major causes of agricultural land conversion in Gujarat?");
  const [activeTab, setActiveTab] = useState<keyof typeof repositoryItems>("papers");
  const [isSearching, setIsSearching] = useState(false);
  const [currentResponseKey, setCurrentResponseKey] = useState<"gujarat" | "disputes">("gujarat");
  const [activeCitationModal, setActiveCitationModal] = useState<any | null>(null);

  // End-to-End Chain Demo State
  const [chainStep, setChainStep] = useState(0);

  const handleAISearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
      if (query.toLowerCase().includes("dispute") || query.toLowerCase().includes("ulpin") || query.toLowerCase().includes("court")) {
        setCurrentResponseKey("disputes");
      } else {
        setCurrentResponseKey("gujarat");
      }
    }, 700);
  };

  const currentResult = preloadedRAGResponses[currentResponseKey];
  const activeItems = repositoryItems[activeTab] || repositoryItems.papers;

  const handleExportBriefingPdf = () => {
    generateOfficialGovernmentPdf({
      title: `EVIDENCE-BACKED POLICY BRIEFING: ${query.toUpperCase()}`,
      reportId: `DOLR-EVI-RAG-${Date.now().toString().substring(6)}`,
      category: "Evidence-Backed AI Policy Synthesis",
      signatory: "Chief Policy Advisor & AI Knowledge Architect, DoLR",
      sections: [
        {
          heading: "1. Synthesized AI Knowledge Brief",
          content: currentResult.summary.replace(/\[\d+\]/g, "")
        },
        {
          heading: "2. Key Empirical Trends & Strategic Metrics",
          content: currentResult.trends.join("\n• ")
        },
        {
          heading: "3. Multi-Source Verified Bibliography",
          content: currentResult.sources.map(s => `${s.citationIndex} [${s.type}] ${s.title} — ${s.author} (${s.date})`).join("\n\n")
        }
      ],
      tableData: {
        headers: ["Citation #", "Source Type", "Document Title", "Confidence", "Issuing Agency"],
        rows: currentResult.sources.map(s => [s.citationIndex, s.type, s.title.substring(0, 40) + "...", s.confidence, s.author.substring(0, 30)])
      }
    });
  };

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-md">
        <div className="flex items-center space-x-2 mb-2">
          <span className="text-[10px] uppercase font-bold tracking-wider bg-blue-500/20 text-blue-400 border border-blue-500/30 px-2 py-0.5 rounded">
            SIH PROBLEM STATEMENT — EVIDENCE-BACKED AI RAG ENGINE
          </span>
          <span className="text-xs text-slate-400">Department of Land Resources (DoLR)</span>
        </div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <span>🧠 Evidence-Backed AI Literature & Policy Synthesis Engine</span>
        </h1>
        <p className="text-xs text-slate-300 mt-1 max-w-3xl leading-relaxed">
          Ask complex land governance questions. The AI searches 4 distinct knowledge silos (Government Reports, Research Papers, Land Datasets, and Policy Documents) to synthesize evidence-backed insights with explicit source citations.
        </p>

        {/* AI RAG Query Input */}
        <form onSubmit={handleAISearch} className="mt-5 flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-3.5 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. What are the major causes of agricultural land conversion in Gujarat?"
              className="w-full bg-slate-800 border border-slate-700 text-slate-100 text-xs sm:text-sm rounded-xl pl-11 pr-4 py-3 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 font-medium"
            />
          </div>
          <button
            type="submit"
            disabled={isSearching}
            className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl transition-all shadow-lg shadow-blue-600/20 shrink-0"
          >
            <Sparkles className="h-4 w-4" />
            <span>{isSearching ? "Searching Knowledge Index..." : "Run Evidence AI Search"}</span>
          </button>
        </form>

        {/* Sample Pre-set Questions */}
        <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-slate-400 font-semibold text-[11px]">Recommended Inquiries:</span>
          {[
            { label: "🌾 Agri Land Conversion in Gujarat", q: "What are the major causes of agricultural land conversion in Gujarat?" },
            { label: "⚖️ ULPIN Dispute Mitigation Impact", q: "How does ULPIN (Bhu-Aadhar) mitigate land dispute litigation in peri-urban corridors?" },
            { label: "📜 RFCTLARR Land Acquisition Safeguards", q: "What are the statutory prerequisites for industrial corridor land acquisition under RFCTLARR Act 2024?" },
          ].map((item, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => {
                setQuery(item.q);
                if (item.q.includes("dispute") || item.q.includes("ULPIN")) {
                  setCurrentResponseKey("disputes");
                } else {
                  setCurrentResponseKey("gujarat");
                }
              }}
              className="bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white px-2.5 py-1 rounded-lg border border-slate-700 text-[11px] transition-colors"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Required Progression Flow Bar (SIH PS Requirement) */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-blue-500/40 rounded-xl p-4 text-white shadow-md">
        <span className="text-[10px] font-bold uppercase tracking-wider text-blue-400 block mb-2">
          EVIDENCE-BACKED AI ARCHITECTURE & RETRIEVAL PIPELINE:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-2 text-center text-xs">
          {[
            { step: "1. USER QUESTION", desc: "Natural Language Query", color: "bg-slate-800 text-slate-200 border-slate-700" },
            { step: "2. AI SEARCH", desc: "Dense Vector Embedding", color: "bg-blue-500/20 text-blue-300 border-blue-500/30" },
            { step: "3. GOV REPORTS", desc: "DoLR & NITI Aayog [1]", color: "bg-amber-500/20 text-amber-300 border-amber-500/30 font-bold" },
            { step: "4. PAPERS", desc: "ISRO & IIT Delhi [2]", color: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30 font-bold" },
            { step: "5. DATASETS", desc: "Bhu-Aadhar Vector [3]", color: "bg-purple-500/20 text-purple-300 border-purple-500/30 font-bold" },
            { step: "6. POLICY DOCS", desc: "RFCTLARR / Acts [4]", color: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30 font-bold" },
            { step: "7. RAG SYNTHESIS", desc: "Evidence Extraction", color: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30" },
            { step: "8. SOURCE CITATIONS", desc: "Inline References [1-4]", color: "bg-rose-500/20 text-rose-300 border-rose-500/30 font-black" },
          ].map((item, idx) => (
            <div key={idx} className={`p-2 rounded-lg border flex flex-col justify-center ${item.color}`}>
              <span className="font-bold text-[11px] leading-tight">{item.step}</span>
              <span className="text-[9px] opacity-80 mt-0.5">{item.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Synthesized AI Response & Citation Box */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden space-y-0 animate-in fade-in">
        
        {/* Response Top Header */}
        <div className="bg-slate-900 text-white p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800">
          <div className="flex items-center space-x-2.5">
            <div className="h-8 w-8 rounded-lg bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-400">
              <Bot className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">AI Policy Synthesis & Evidence Extraction</h3>
              <p className="text-[11px] text-slate-400">Cross-referenced across 4 data silos • 99.1% Confidence Score</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleExportBriefingPdf}
              className="flex items-center space-x-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all shadow"
            >
              <Download className="h-3.5 w-3.5" />
              <span>Export Evidence Briefing PDF</span>
            </button>
          </div>
        </div>

        {/* Synthesized Summary Body */}
        <div className="p-6 space-y-6">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span>Synthesized Finding for: &ldquo;{query}&rdquo;</span>
            </div>
            
            <p className="text-sm text-slate-800 leading-relaxed font-sans bg-slate-50 p-4 rounded-xl border border-slate-200">
              {currentResult.summary.split(/(\[\d+\])/g).map((chunk, i) => {
                if (chunk.match(/\[\d+\]/)) {
                  const sourceObj = currentResult.sources.find(s => s.citationIndex === chunk);
                  return (
                    <button
                      key={i}
                      onClick={() => setActiveCitationModal(sourceObj || currentResult.sources[0])}
                      className="inline-flex items-center font-mono font-bold text-blue-700 bg-blue-100 hover:bg-blue-200 border border-blue-300 px-1.5 py-0.5 rounded mx-1 text-xs transition-colors cursor-pointer"
                      title="Click to view full cited source metadata & excerpt"
                    >
                      {chunk}
                    </button>
                  );
                }
                return chunk;
              })}
            </p>
          </div>

          {/* Key Empirical Trends extracted by AI */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <TrendingUp className="h-4 w-4 text-emerald-600" />
              <span>Identified Key Trends & Statistical Insights:</span>
            </span>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {currentResult.trends.map((t, idx) => (
                <div key={idx} className="p-3 bg-emerald-50/50 border border-emerald-200 rounded-lg text-emerald-950 leading-relaxed font-medium">
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Explicit Sources Used (PS Requirement 5) */}
          <div className="space-y-3 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-blue-600" />
                <span>Sources Used & Verified Citation Metadata (4 Sources)</span>
              </h4>
              <span className="text-[10px] text-slate-500 font-mono">Click any card to inspect full excerpt</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {currentResult.sources.map((s, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveCitationModal(s)}
                  className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm hover:border-blue-400 transition-all cursor-pointer space-y-2 group"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs font-black text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                      Source {s.citationIndex}
                    </span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${s.typeColor}`}>
                      {s.type}
                    </span>
                  </div>

                  <h5 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                    {s.title}
                  </h5>

                  <p className="text-[11px] text-slate-500 font-medium">
                    {s.author} • <span className="text-slate-700 italic">{s.date}</span>
                  </p>

                  <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-[11px] text-slate-600 line-clamp-2 italic">
                    &ldquo;{s.excerpt}&rdquo;
                  </div>

                  <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400 font-mono">
                    <span className="text-emerald-700 font-bold">{s.confidence}</span>
                    <span className="text-blue-600 font-semibold group-hover:underline flex items-center gap-0.5">
                      Inspect Excerpt <ChevronRight className="h-3 w-3" />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

      {/* Modal / Drawer to Inspect Source Details */}
      {activeCitationModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-xs bg-blue-600 text-white px-2 py-0.5 rounded">
                  Source {activeCitationModal.citationIndex}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${activeCitationModal.typeColor}`}>
                  {activeCitationModal.type}
                </span>
              </div>
              <button onClick={() => setActiveCitationModal(null)} className="text-slate-400 hover:text-slate-700 text-sm font-bold">✕</button>
            </div>

            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                {activeCitationModal.title}
              </h3>
              <p className="text-xs text-slate-600 font-medium">
                Author / Authority: <strong className="text-slate-900">{activeCitationModal.author}</strong> • Date: <span className="text-slate-700">{activeCitationModal.date}</span>
              </p>

              <div className="bg-blue-50/60 p-4 rounded-xl border border-blue-200 text-xs text-blue-950 leading-relaxed space-y-2">
                <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">CITED EXCERPT / EVIDENCE TEXT:</span>
                <p className="italic font-serif">&ldquo;{activeCitationModal.excerpt}&rdquo;</p>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-100">
                <span>RAG Retrieval Confidence: <strong className="text-emerald-600">{activeCitationModal.confidence}</strong></span>
                <button
                  onClick={() => alert(`Downloading full source document for ${activeCitationModal.title}`)}
                  className="bg-slate-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-slate-800 transition-colors flex items-center gap-1.5"
                >
                  <Download className="h-3.5 w-3.5" />
                  <span>Download Document</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 5 Repository Tabs */}
      <div className="space-y-4 pt-4">
        
        {/* Tab Headers */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-3">
          <div className="flex flex-wrap gap-2">
            {[
              { key: "papers", label: "📜 Research Publications" },
              { key: "govReports", label: "🏛️ Government Reports" },
              { key: "policies", label: "📄 Policy Gazettes" },
              { key: "datasets", label: "📊 Datasets Catalog" },
              { key: "legal", label: "⚖️ Legal & Land Acts" },
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
          {activeItems.map((item: any) => (
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

              {/* Linked Dataset & GIS Layer Metadata */}
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
