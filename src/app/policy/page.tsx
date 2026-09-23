"use client";

import { Activity, Sliders, Play, RotateCcw, AlertTriangle, CheckCircle2, TrendingUp, Sparkles, Download, Layers, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { generateOfficialGovernmentPdf } from "@/utils/generatePdf";

const initialStates = [
  { id: "UP", name: "Uttar Pradesh", baseScore: 84.5 },
  { id: "MH", name: "Maharashtra", baseScore: 89.2 },
  { id: "GJ", name: "Gujarat", baseScore: 88.7 },
  { id: "MP", name: "Madhya Pradesh", baseScore: 82.1 },
  { id: "TN", name: "Tamil Nadu", baseScore: 86.4 },
];

export default function PolicySimulationPage() {
  // Step 1: Selected State & Policy Type
  const [selectedState, setSelectedState] = useState("Gujarat");
  const [policyType, setPolicyType] = useState("Agricultural-to-Industrial Conversion");

  // Step 2: Scenario A Parameters (Active Sliders)
  const [taxIncentive, setTaxIncentive] = useState(15);
  const [landSubsidy, setLandSubsidy] = useState(50);
  const [envBuffer, setEnvBuffer] = useState(2.5);
  const [labourMandate, setLabourMandate] = useState(40);
  const [timelineMonths, setTimelineMonths] = useState(24);

  // Scenario Comparison Toggle
  const [compareMode, setCompareMode] = useState(false);
  const [activePreset, setActivePreset] = useState<string | null>(null);

  // Scenario A Calculations
  const scenarioAScores = initialStates.map(st => {
    const taxBoost = (taxIncentive / 30) * 6;
    const subsidyBoost = (landSubsidy / 200) * 5;
    const envPenalty = (envBuffer / 10) * -4;
    const labourBoost = (labourMandate / 100) * 3;
    const timelinePenalty = timelineMonths < 18 ? -4 : 0;

    const delta = taxBoost + subsidyBoost + envPenalty + labourBoost + timelinePenalty;
    const finalScore = Math.min(100, Math.max(0, st.baseScore + delta));

    return { ...st, delta: Math.round(delta * 10) / 10, finalScore: Math.round(finalScore * 10) / 10 };
  });

  // Scenario B Baseline (Comparison Mode: High Environmental Protection)
  const scenarioBScores = initialStates.map(st => {
    const delta = (10 / 30) * 6 + (30 / 200) * 5 + (5.0 / 10) * -4 + (60 / 100) * 3;
    return { ...st, delta: Math.round(delta * 10) / 10, finalScore: Math.round((st.baseScore + delta) * 10) / 10 };
  });

  const handleExportScenarioPdf = () => {
    generateOfficialGovernmentPdf({
      title: `POLICY SCENARIO IMPACT REPORT: ${selectedState.toUpperCase()} - ${policyType.toUpperCase()}`,
      reportId: `SIM-SCENARIO-${Date.now().toString().substring(6)}`,
      category: "Policy Impact Simulation",
      signatory: "Director General, Policy Simulation Board",
      sections: [
        {
          heading: "1. Policy Experimentation Parameters (Scenario A)",
          content: `State Target: ${selectedState}\nPolicy Type: ${policyType}\n• Stamp Duty Incentive: ${taxIncentive}%\n• Land Acquisition Capital Subsidy: ₹${landSubsidy} Crore\n• Eco-Buffer Distance Constraint: ${envBuffer} km\n• Local Domicile Hiring Mandate: ${labourMandate}%\n• Single-Window Approval Timeline: ${timelineMonths} Months`
        },
        {
          heading: "2. Climate & Dispute Mitigation Assessment",
          content: taxIncentive >= 20 
            ? `Stamp duty incentive of ${taxIncentive}% significantly boosts industrial corridor feasibility by +14.2% across ${selectedState}.`
            : `Stamp duty incentive of ${taxIncentive}% is below the national benchmark (18%). Consider increasing to attract industrial capital.`
        }
      ],
      tableData: {
        headers: ["State Name", "Base Score", "Scenario A Final", "Scenario B (Eco-Preset)"],
        rows: scenarioAScores.map((s, idx) => [s.name, s.baseScore.toString(), s.finalScore.toString(), scenarioBScores[idx].finalScore.toString()])
      }
    });
  };

  const applyPreset = (preset: "fastTrack" | "agriProtect" | "ecoBalance") => {
    setActivePreset(preset);
    if (preset === "fastTrack") {
      setTaxIncentive(25); setLandSubsidy(120); setEnvBuffer(1.0); setLabourMandate(20); setTimelineMonths(15);
    } else if (preset === "agriProtect") {
      setTaxIncentive(10); setLandSubsidy(30); setEnvBuffer(5.0); setLabourMandate(60); setTimelineMonths(36);
    } else if (preset === "ecoBalance") {
      setTaxIncentive(18); setLandSubsidy(75); setEnvBuffer(3.5); setLabourMandate(50); setTimelineMonths(24);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded">
              WHAT-IF POLICY EXPERIMENTATION & SCENARIO LAB
            </span>
            <span className="text-xs text-slate-400">Department of Land Resources</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            National Policy Simulation & Scenario Comparison
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Test policy reforms, evaluate before-versus-after land conversion impacts, and compare Scenario A vs. Scenario B in real time.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button 
            onClick={() => setCompareMode(!compareMode)}
            className={`px-3 py-2 rounded-lg text-xs font-bold border transition-colors ${compareMode ? "bg-purple-600 text-white border-purple-500" : "bg-slate-800 text-slate-200 border-slate-700"}`}
          >
            {compareMode ? "Hide Scenario B" : "Compare Scenario A vs B"}
          </button>

          <button onClick={handleExportScenarioPdf} className="flex items-center space-x-1 bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-lg shadow-amber-500/10">
            <Download className="h-4 w-4" />
            <span>Export Decision PDF</span>
          </button>
        </div>
      </div>

      {/* Step 1: Target State & Policy Selection Bar (SIH Gap Requirement) */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">1. Select Target Experimentation State</label>
          <select
            value={selectedState}
            onChange={(e) => setSelectedState(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500"
          >
            <option value="Gujarat">Gujarat (Special Economic Zone & Coastal Belt)</option>
            <option value="Uttar Pradesh">Uttar Pradesh (Gangetic Plains & Industrial Expressway)</option>
            <option value="Maharashtra">Maharashtra (Delhi-Mumbai Industrial Corridor)</option>
            <option value="Madhya Pradesh">Madhya Pradesh (Central Agricultural Zone)</option>
            <option value="Tamil Nadu">Tamil Nadu (Southern Industrial Park Network)</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold text-slate-700 mb-1">2. Select Proposed Policy Reform Directive</label>
          <select
            value={policyType}
            onChange={(e) => setPolicyType(e.target.value)}
            className="w-full bg-slate-50 border border-slate-300 text-slate-900 text-xs font-bold rounded-lg p-2.5 focus:ring-2 focus:ring-amber-500"
          >
            <option value="Agricultural-to-Industrial Conversion">Agricultural-to-Industrial Land Conversion Directive</option>
            <option value="Coastal Soil Salinity Eco-Zoning">Coastal Soil Salinity Eco-Zoning Buffer Policy</option>
            <option value="Single-Window Land Mutation Speed-up">Single-Window Land Title Mutation Fast-Track</option>
          </select>
        </div>
      </div>

      {/* Preset Scenario Buttons */}
      <div className="bg-white rounded-xl p-4 border border-slate-200 shadow-sm flex flex-wrap items-center justify-between gap-3">
        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="h-4 w-4 text-amber-500" />
          <span>Apply Standard Policy Presets:</span>
        </span>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => applyPreset("fastTrack")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${activePreset === "fastTrack" ? "bg-amber-500 text-slate-950 border-amber-500 shadow-md" : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"}`}
          >
            🚀 Fast-Track Industrial Corridor
          </button>
          <button
            onClick={() => applyPreset("agriProtect")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${activePreset === "agriProtect" ? "bg-emerald-600 text-white border-emerald-600 shadow-md" : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"}`}
          >
            🌾 Maximum Agricultural Protection
          </button>
          <button
            onClick={() => applyPreset("ecoBalance")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border ${activePreset === "ecoBalance" ? "bg-blue-600 text-white border-blue-600 shadow-md" : "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-200"}`}
          >
            🛡️ Coastal & Ecological Buffer Zone
          </button>
        </div>
      </div>

      {/* Controls & Results Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Policy Sliders Control Panel (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-6">
          <h3 className="text-base font-bold text-slate-900 border-b border-slate-100 pb-3 flex items-center justify-between">
            <span className="flex items-center gap-2">
              <Sliders className="h-5 w-5 text-amber-500" />
              <span>Scenario A Parameters ({selectedState})</span>
            </span>
            <span className="text-[10px] bg-amber-100 text-amber-800 px-2 py-0.5 rounded font-mono font-bold">SCENARIO A</span>
          </h3>

          {/* Slider 1: Tax Incentive */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">State Stamp Duty Tax Incentive</span>
              <span className="font-mono font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded">{taxIncentive}%</span>
            </div>
            <input
              type="range" min="0" max="30" value={taxIncentive}
              onChange={(e) => setTaxIncentive(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-amber-500"
            />
          </div>

          {/* Slider 2: Land Acquisition Subsidy */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">Land Acquisition Capital Subsidy</span>
              <span className="font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded">₹{landSubsidy} Crore</span>
            </div>
            <input
              type="range" min="0" max="200" step="5" value={landSubsidy}
              onChange={(e) => setLandSubsidy(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
            />
          </div>

          {/* Slider 3: Environmental Buffer Zone */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">Eco-Buffer Distance Constraint</span>
              <span className="font-mono font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">{envBuffer} km</span>
            </div>
            <input
              type="range" min="0.5" max="10" step="0.5" value={envBuffer}
              onChange={(e) => setEnvBuffer(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-500"
            />
          </div>

          {/* Slider 4: Local Labour Mandate */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-slate-800">Local Domicile Hiring Mandate</span>
              <span className="font-mono font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">{labourMandate}%</span>
            </div>
            <input
              type="range" min="10" max="90" step="5" value={labourMandate}
              onChange={(e) => setLabourMandate(Number(e.target.value))}
              className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-purple-500"
            />
          </div>
        </div>

        {/* Live State Impact Results & Scenario Comparison (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-sm space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <Activity className="h-5 w-5 text-emerald-600" />
                <span>Simulated Feasibility Index {compareMode && "(Scenario A vs B)"}</span>
              </h3>
              <span className="text-xs text-slate-500">Base vs. Simulated Output</span>
            </div>

            <div className="space-y-3">
              {scenarioAScores.map((st, idx) => (
                <div key={st.id} className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="font-bold text-sm text-slate-900">{st.name}</span>
                    <div className="flex items-center space-x-3 text-xs text-slate-500">
                      <span>Base: <strong className="text-slate-700">{st.baseScore}</strong></span>
                      <span>Impact Delta: 
                        <strong className={`ml-1 ${st.delta >= 0 ? "text-emerald-600" : "text-rose-600"}`}>
                          {st.delta >= 0 ? `+${st.delta}` : st.delta}
                        </strong>
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="text-right">
                      <span className="text-xl font-black text-amber-600">{st.finalScore}</span>
                      <span className="text-[10px] block text-slate-400 uppercase font-bold">Scenario A</span>
                    </div>

                    {compareMode && (
                      <div className="text-right pl-3 border-l border-slate-300">
                        <span className="text-xl font-black text-purple-600">{scenarioBScores[idx].finalScore}</span>
                        <span className="text-[10px] block text-slate-400 uppercase font-bold">Scenario B</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* AI Automated Policy Risk Assessment */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-slate-200 shadow-lg space-y-3">
            <div className="flex items-center space-x-2 text-amber-400 font-bold text-sm">
              <Sparkles className="h-4 w-4" />
              <span>AI Automated Policy Risk & Climate Vulnerability Assessment</span>
            </div>
            <div className="text-xs space-y-2 text-slate-300 leading-relaxed">
              <p className="text-emerald-300">✅ <strong>{selectedState} Impact:</strong> Tax incentive of {taxIncentive}% and ₹{landSubsidy} Cr capital subsidy increases overall industrial site viability score to <strong>{scenarioAScores.find(s => s.name.toLowerCase().includes(selectedState.toLowerCase()))?.finalScore || 90.2}</strong>.</p>
              <p className="text-blue-300">🌊 <strong>Climate Vulnerability Score:</strong> 78.4/100 (Eco-buffer of {envBuffer} km protects coastal agricultural soil from tidal salinization).</p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
