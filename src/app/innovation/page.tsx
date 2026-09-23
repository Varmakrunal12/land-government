"use client";

import { 
  Lightbulb, 
  Plus, 
  CheckCircle2, 
  FileText, 
  Send, 
  ThumbsUp, 
  User, 
  Award, 
  Tag, 
  Trophy, 
  Rocket, 
  Target, 
  BookOpen, 
  Calendar, 
  DollarSign, 
  ExternalLink, 
  Users, 
  Check, 
  Clock, 
  ChevronRight,
  Filter,
  Sparkles
} from "lucide-react";
import { useState } from "react";
import { useGlobalData } from "@/context/GlobalDataContext";

type InnovationTab = "grants" | "hackathons" | "pilots" | "challenges" | "competitions";

export default function InnovationHubPage() {
  const { proposals, addProposal, voteProposal, approveProposal } = useGlobalData();
  const [activeTab, setActiveTab] = useState<InnovationTab>("grants");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<"grant" | "hackathon" | "pilot" | "challenge">("grant");

  // Form State
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("AI & Remote Sensing");
  const [budget, setBudget] = useState("");
  const [state, setState] = useState("Gujarat");
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
    setTitle("");
    setAuthor("");
    setSummary("");
    alert("✅ Submission successfully registered in the DoLR National Innovation Hub!");
  };

  // Hackathon list
  const hackathons = [
    {
      id: "hack-1",
      title: "Smart India Hackathon 2026 — DoLR Land Governance Edition",
      theme: "AI, PostGIS & Blockchain for Transparent Cadastral Records (Problem ID: 26019)",
      status: "Registration Open",
      statusColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      deadline: "15 Oct 2026",
      prizePool: "₹50,00,000",
      teamsRegistered: 342,
      tracks: ["AI Cadastral Boundary Alignment", "Automated Title Mutation SLA", "Climate Land Resilience"],
      organizer: "DoLR & Ministry of Rural Development"
    },
    {
      id: "hack-2",
      title: "ISRO SAC & DoLR GeoAI Satellite Challenge 2026",
      theme: "High-Resolution Remote Sensing for Peri-Urban Land Encroachment Detection",
      status: "Submissions Under Review",
      statusColor: "bg-blue-100 text-blue-800 border-blue-200",
      deadline: "30 Sep 2026",
      prizePool: "₹25,00,000",
      teamsRegistered: 188,
      tracks: ["Sentinel-2 Change Detection", "Synthetic Aperture Radar (SAR)", "Urban Sprawl Modeling"],
      organizer: "ISRO Space Applications Centre"
    },
    {
      id: "hack-3",
      title: "National Bhu-Aadhar (ULPIN) Web3 Innovation Sprint",
      theme: "Zero-Knowledge Proofs for Verifiable Land Ownership Records & e-Registration",
      status: "Upcoming (Cohort 2)",
      statusColor: "bg-amber-100 text-amber-800 border-amber-200",
      deadline: "10 Nov 2026",
      prizePool: "₹35,00,000",
      teamsRegistered: 94,
      tracks: ["Zero-Knowledge Title Verification", "Gram Panchayat Ledger", "e-Courts Smart Contracts"],
      organizer: "NIC & DoLR Digital Cell"
    }
  ];

  // Pilot Projects list
  const pilotProjects = [
    {
      id: "pilot-1",
      title: "High-Precision Drone Orthophoto Cadastral Resurvey Pilot",
      state: "Uttar Pradesh (Varanasi & Gorakhpur)",
      budget: "₹1.45 Crore",
      leadOrg: "IIT Kanpur & UP Revenue Board",
      progress: 82,
      phase: "Phase 3: ULPIN Integration",
      metrics: "48,200 Parcels Mapped • 0.05m Accuracy • Dispute reduction: 44%",
      status: "Active Field Pilot"
    },
    {
      id: "pilot-2",
      title: "AI-Powered Pre-Mutation Boundary Conflict Detection Sandbox",
      state: "Gujarat (Ahmedabad & Gandhinagar Peri-Urban)",
      budget: "₹85 Lakhs",
      leadOrg: "ISRO SAC & Gujarat Revenue Dept",
      progress: 68,
      phase: "Phase 2: Live Revenue Circle Testing",
      metrics: "12,400 Mutation Requests Screened • 94.2% AI Accuracy • 21-day SLA reduced to 48 hrs",
      status: "Active Field Pilot"
    },
    {
      id: "pilot-3",
      title: "Blockchain-Backed Village Land Title Registry (Bhu-Locker)",
      state: "Karnataka (Belagavi District)",
      budget: "₹70 Lakhs",
      leadOrg: "IIIT Bangalore & Bhoomi Project Team",
      progress: 92,
      phase: "Phase 4: District Court Integration",
      metrics: "16 Panchayats Onboarded • 14,800 e-Title Deeds Issued • 0 Tampering Incidents",
      status: "Near Completion"
    },
    {
      id: "pilot-4",
      title: "Coastal Soil Salinity & Climate Land Vulnerability Monitoring",
      state: "Gujarat (Bharuch & Bhavnagar Belt)",
      budget: "₹60 Lakhs",
      leadOrg: "Gujarat Ecological Commission & IIT Gandhinagar",
      progress: 54,
      phase: "Phase 2: IoT Soil Sensor Array",
      metrics: "180 IoT Sensor Nodes • 38,000 Ha Monitored • Adaptive Crop Zoning Deployed",
      status: "Active Field Pilot"
    }
  ];

  // Challenges list
  const challenges = [
    {
      id: "ch-1",
      title: "Open Challenge: 24-Hour Land Mutation Clearance SLA Engine",
      description: "Develop an automated verification pipeline that parses sale deeds, validates survey boundaries via GIS, checks encumbrances, and auto-generates draft mutation certificates within 24 hours.",
      bounty: "₹15,00,000",
      submissions: 42,
      difficulty: "High (Systems + GIS + NLP)",
      benchmarkMetric: "Target SLA: < 24 Hours (Current baseline: 21 Days)",
      leadSponsor: "National Generic Document Registration System (NGDDRS)"
    },
    {
      id: "ch-2",
      title: "Multi-Dialect Indic Land Record OCR & Translation Challenge",
      description: "Extract and digitize historical handwritten land records in Modi script, Kaithi, Sharada, and Old Gujarati into standardized UNICODE and GeoJSON attributes.",
      bounty: "₹12,00,000",
      submissions: 68,
      difficulty: "Very High (Indic OCR + Computer Vision)",
      benchmarkMetric: "Target Character Error Rate: < 3.5%",
      leadSponsor: "Bhashini & DoLR Innovation Fund"
    },
    {
      id: "ch-3",
      title: "Peri-Urban Encroachment & Farmland Loss Early Warning Algorithm",
      description: "Predict illegal non-agricultural construction and unauthorized plotting in peri-urban green belts using bi-weekly Sentinel-2 / Cartosat change detection algorithms.",
      bounty: "₹10,00,000",
      submissions: 51,
      difficulty: "Medium-High (Satellite Remote Sensing)",
      benchmarkMetric: "Target F1 Score: > 92%",
      leadSponsor: "Town & Country Planning Organization (TCPO)"
    }
  ];

  // Knowledge Competitions list
  const competitions = [
    {
      id: "comp-1",
      title: "National Land Governance Policy Research Fellowship 2026",
      type: "Research Fellowship",
      eligibility: "Postgraduate & PhD Scholars in Geospatial, Public Policy, Law & Economics",
      stipend: "₹60,000 / month + ₹2 Lakhs Research Travel Grant",
      cohortSize: "25 Fellows All-India",
      deadline: "20 Nov 2026",
      keyFocus: "Evidence-Based Land Law Reforms, ULPIN Integration, Forest Rights Act GIS"
    },
    {
      id: "comp-2",
      title: "All-India Inter-University Geospatial Land Analytics Paper Competition",
      type: "Academic Paper Competition",
      eligibility: "Undergraduate & Graduate University Teams (max 3 members)",
      stipend: "1st Prize: ₹3,00,000 | 2nd Prize: ₹2,00,000 | 3rd Prize: ₹1,00,000",
      cohortSize: "Top 20 Papers Published in DoLR Annual Journal",
      deadline: "05 Dec 2026",
      keyFocus: "Spatial Economics, Satellite Change Detection, Climate Resilient Agriculture"
    },
    {
      id: "comp-3",
      title: "National Digital Land Governance Grand Quiz & Case Competition",
      type: "Interactive Knowledge Quiz",
      eligibility: "Open to Government Officers, Revenue Staff, Surveyors & Citizens",
      stipend: "National Recognition Certificate + ₹50,000 Merit Awards",
      cohortSize: "5,000+ Participants across 28 States",
      deadline: "Weekly Live Rounds",
      keyFocus: "DILRMP Best Practices, Bare Acts (RFCTLARR), SVAMITVA, NGDDRS"
    }
  ];

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded">
              SIH 2026 PROBLEM STATEMENT POINT 15
            </span>
            <span className="text-xs text-slate-400">Department of Land Resources (DoLR)</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <span>🏛️ National Land Innovation Hub</span>
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Dedicated portal supporting Research Grants, National Hackathons, On-Ground Pilot Projects, Open Innovation Challenges, and Knowledge Competitions.
          </p>
        </div>

        <button
          onClick={() => {
            setModalType("grant");
            setShowModal(true);
          }}
          className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-3 rounded-xl text-xs font-bold transition-all shadow-lg shadow-amber-500/10 shrink-0"
        >
          <Plus className="h-4 w-4" />
          <span>Submit Proposal / Application</span>
        </button>
      </div>

      {/* 5 Pillar Navigation Tabs */}
      <div className="bg-white rounded-xl p-2 border border-slate-200 shadow-sm">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
          {[
            { key: "grants", label: "Research Grants", icon: Lightbulb, count: proposals.length, desc: "Call for Research Proposals" },
            { key: "hackathons", label: "National Hackathons", icon: Trophy, count: hackathons.length, desc: "SIH & GeoAI Hackathons" },
            { key: "pilots", label: "Pilot Projects", icon: Rocket, count: pilotProjects.length, desc: "State Sandbox Implementations" },
            { key: "challenges", label: "Open Challenges", icon: Target, count: challenges.length, desc: "Problem Bounties & Tasks" },
            { key: "competitions", label: "Knowledge Competitions", icon: BookOpen, count: competitions.length, desc: "Fellowships & Quizzes" },
          ].map((tab) => {
            const isActive = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as InnovationTab)}
                className={`p-3 rounded-lg text-left transition-all flex flex-col justify-between border ${
                  isActive
                    ? "bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-amber-500/40"
                    : "bg-slate-50 hover:bg-slate-100 text-slate-700 border-slate-200"
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <tab.icon className={`h-5 w-5 ${isActive ? "text-amber-400" : "text-amber-600"}`} />
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive ? "bg-amber-500 text-slate-950" : "bg-slate-200 text-slate-700"
                  }`}>
                    {tab.count}
                  </span>
                </div>
                <div>
                  <p className="text-xs font-bold leading-tight">{tab.label}</p>
                  <p className={`text-[10px] mt-0.5 truncate ${isActive ? "text-slate-300" : "text-slate-500"}`}>{tab.desc}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* TAB 1: RESEARCH GRANTS */}
      {activeTab === "grants" && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-amber-50 border border-amber-200 rounded-xl p-4 text-amber-900">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500 text-slate-950 rounded-lg font-bold shrink-0">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold">DoLR Research Innovation Grants Scheme 2026-27</h3>
                <p className="text-xs text-amber-800">Financial assistance ranging from ₹25 Lakhs to ₹1.5 Crore for academic & institutional researchers in land governance.</p>
              </div>
            </div>
            <button
              onClick={() => {
                setModalType("grant");
                setShowModal(true);
              }}
              className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-lg text-xs font-bold shrink-0 shadow"
            >
              + Apply for Research Grant
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {proposals.map((p) => (
              <div key={p.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-amber-300 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4">
                
                <div className="space-y-2 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded">
                      {p.category}
                    </span>
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded border ${
                      p.status === "Approved for Pilot" ? "bg-emerald-100 text-emerald-800 border-emerald-200" : "bg-blue-100 text-blue-800 border-blue-200"
                    }`}>
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
                    <span>Peer Upvote ({p.votes})</span>
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
      )}

      {/* TAB 2: HACKATHONS */}
      {activeTab === "hackathons" && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-blue-900 text-white p-5 rounded-xl border border-blue-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">SIH & National GeoAI Competitions</span>
              </div>
              <h3 className="text-lg font-bold mt-1">National Land Records Hackathon Series 2026</h3>
              <p className="text-xs text-blue-200 mt-1 max-w-2xl">
                Open innovation challenge inviting students, startups, GIS specialists, and developer teams to build cutting-edge solutions for Indian land administration.
              </p>
            </div>
            <button
              onClick={() => {
                setModalType("hackathon");
                setShowModal(true);
              }}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2.5 rounded-lg text-xs font-bold shrink-0 shadow-lg"
            >
              Register Team / Submit Entry
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {hackathons.map((h) => (
              <div key={h.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-blue-400 transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${h.statusColor}`}>
                      {h.status}
                    </span>
                    <span className="text-xs font-mono font-bold text-emerald-600">{h.prizePool}</span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 leading-snug">{h.title}</h4>
                  <p className="text-xs text-slate-600">{h.theme}</p>

                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-1 text-xs">
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Organized by:</span>
                      <strong className="text-slate-800">{h.organizer}</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Deadline:</span>
                      <strong className="text-rose-600">{h.deadline}</strong>
                    </div>
                    <div className="flex items-center justify-between text-slate-600">
                      <span>Registered Teams:</span>
                      <strong className="text-blue-600">{h.teamsRegistered} Teams</strong>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[10px] font-bold text-slate-400 uppercase">Challenge Tracks:</span>
                    <div className="flex flex-wrap gap-1">
                      {h.tracks.map((t, i) => (
                        <span key={i} className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-medium">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Registration initiated for ${h.title}`)}
                  className="w-full bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Participate / View Problem Statement</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: PILOT PROJECTS */}
      {activeTab === "pilots" && (
        <div className="space-y-4 animate-in fade-in">
          <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 rounded-xl p-4 text-emerald-900">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-600 text-white rounded-lg font-bold shrink-0">
                <Rocket className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold">Live State Sandbox Pilot Projects</h3>
                <p className="text-xs text-emerald-800">Field trials and proof-of-concept deployments across State Revenue Departments before national scale-out.</p>
              </div>
            </div>
            <button
              onClick={() => {
                setModalType("pilot");
                setShowModal(true);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-xs font-bold shrink-0 shadow"
            >
              + Propose State Pilot Sandbox
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {pilotProjects.map((pilot) => (
              <div key={pilot.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-emerald-400 transition-all space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 px-2.5 py-0.5 rounded">
                    {pilot.status}
                  </span>
                  <span className="text-xs font-bold text-slate-700">Grant Budget: <strong className="text-emerald-700">{pilot.budget}</strong></span>
                </div>

                <div>
                  <h4 className="text-base font-bold text-slate-900">{pilot.title}</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Location: <strong className="text-slate-800">{pilot.state}</strong> • Lead: {pilot.leadOrg}</p>
                </div>

                {/* Progress Bar */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-600">{pilot.phase}</span>
                    <span className="text-emerald-700 font-mono">{pilot.progress}% Completed</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: `${pilot.progress}%` }}></div>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100 text-xs text-slate-700 font-mono">
                  <p className="text-[11px] text-slate-500 font-bold mb-0.5">LIVE FIELD METRICS:</p>
                  <p>{pilot.metrics}</p>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                  <span className="text-slate-500 font-medium">DoLR Sandbox Registry # {pilot.id.toUpperCase()}</span>
                  <button onClick={() => alert(`Detailed Sandbox Audit Log for ${pilot.title}`)} className="text-emerald-700 font-bold hover:underline flex items-center gap-1">
                    <span>View Sandbox Audit Logs</span>
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: CHALLENGES */}
      {activeTab === "challenges" && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-purple-900 text-white p-5 rounded-xl border border-purple-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <Target className="h-5 w-5 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Open Innovation Problem Bounties</span>
              </div>
              <h3 className="text-lg font-bold mt-1">High-Impact Land Administration Bounties</h3>
              <p className="text-xs text-purple-200 mt-1 max-w-2xl">
                Tackle specific bottleneck problems faced by revenue authorities and win direct bounty prizes & pilot implementation contracts.
              </p>
            </div>
            <button
              onClick={() => {
                setModalType("challenge");
                setShowModal(true);
              }}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2.5 rounded-lg text-xs font-bold shrink-0 shadow-lg"
            >
              Submit Challenge Solution
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {challenges.map((c) => (
              <div key={c.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-purple-400 transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-purple-100 text-purple-800 border border-purple-200 px-2 py-0.5 rounded">
                      {c.difficulty}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded border border-amber-200">
                      Bounty: {c.bounty}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 leading-snug">{c.title}</h4>
                  <p className="text-xs text-slate-600 leading-relaxed">{c.description}</p>

                  <div className="p-3 bg-purple-50/50 rounded-lg border border-purple-100 space-y-1 text-xs">
                    <span className="text-[10px] font-bold text-purple-700 uppercase">Benchmark Metric:</span>
                    <p className="text-purple-950 font-bold">{c.benchmarkMetric}</p>
                    <p className="text-[10px] text-slate-500 mt-1">Sponsor: {c.leadSponsor}</p>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Downloading challenge dataset and API specification for ${c.title}...`)}
                  className="w-full bg-purple-700 hover:bg-purple-800 text-white text-xs font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Download Test Dataset & Submit</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 5: KNOWLEDGE COMPETITIONS */}
      {activeTab === "competitions" && (
        <div className="space-y-4 animate-in fade-in">
          <div className="bg-gradient-to-r from-slate-900 to-amber-950 text-white p-5 rounded-xl border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-amber-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Fellowships, Essays & Quizzes</span>
              </div>
              <h3 className="text-lg font-bold mt-1">National Land Governance Knowledge & Fellowships</h3>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                Encouraging young researchers, policy students, and revenue officers through fellowships, annual paper awards, and nationwide knowledge quizzes.
              </p>
            </div>
            <button
              onClick={() => alert("Redirecting to National Fellowship Portal...")}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2.5 rounded-lg text-xs font-bold shrink-0 shadow-lg"
            >
              Apply for 2026 Fellowship
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {competitions.map((comp) => (
              <div key={comp.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-amber-400 transition-all flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-200 px-2 py-0.5 rounded">
                      {comp.type}
                    </span>
                    <span className="text-xs font-bold text-rose-600">{comp.deadline}</span>
                  </div>

                  <h4 className="text-sm font-bold text-slate-900 leading-snug">{comp.title}</h4>
                  
                  <div className="bg-slate-50 p-3 rounded-lg border border-slate-100 space-y-2 text-xs">
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Awards / Grant:</span>
                      <span className="font-bold text-emerald-700">{comp.stipend}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Eligibility:</span>
                      <span className="text-slate-600">{comp.eligibility}</span>
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase block">Focus Areas:</span>
                      <span className="text-slate-600">{comp.keyFocus}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Starting application process for ${comp.title}`)}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold py-2.5 rounded-lg transition-colors flex items-center justify-center gap-1.5"
                >
                  <span>Enter Competition / Apply</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal for Submission */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Send className="h-5 w-5 text-amber-500" />
                <span>Submit to National Innovation Hub</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700 text-sm font-bold">✕</button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Title of Proposal / Entry</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Satellite Cadastral Boundary Verification for Peri-Urban Belts"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Lead Researcher / Team Captain</label>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Grant / Budget (Lakhs ₹)</label>
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
                  <label className="block text-xs font-bold text-slate-700 mb-1">Pillar Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Research Grants">Research Grants</option>
                    <option value="Hackathon Entry">Hackathon Entry</option>
                    <option value="Pilot Project Sandbox">Pilot Project Sandbox</option>
                    <option value="Challenge Bounty">Challenge Bounty</option>
                    <option value="Knowledge Competition">Knowledge Competition</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Target Pilot State</label>
                  <select
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full border border-slate-300 rounded-lg p-2.5 text-xs text-slate-900 focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="Gujarat">Gujarat</option>
                    <option value="Maharashtra">Maharashtra</option>
                    <option value="Uttar Pradesh">Uttar Pradesh</option>
                    <option value="Madhya Pradesh">Madhya Pradesh</option>
                    <option value="Tamil Nadu">Tamil Nadu</option>
                    <option value="Karnataka">Karnataka</option>
                    <option value="Rajasthan">Rajasthan</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Executive Summary, Methodology & Policy Impact</label>
                <textarea
                  rows={3}
                  placeholder="Describe your research objectives, dataset requirements, spatial analysis approach, and anticipated policy impact..."
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
                  Submit to DoLR Innovation Hub
                </button>
              </div>
            </form>

          </div>
        </div>
      )}

    </div>
  );
}
