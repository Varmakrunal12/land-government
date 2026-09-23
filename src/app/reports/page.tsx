"use client";

import { FileText, Download, CheckCircle2, Eye, Printer, Shield, ArrowRight } from "lucide-react";
import { useState } from "react";
import { generateOfficialGovernmentPdf, PdfReportData } from "@/utils/generatePdf";
import { useGlobalData } from "@/context/GlobalDataContext";

const initialReports = [
  {
    id: "REP-2026-09",
    title: "National Land Use Transition & Agricultural Preservation Report Q3 2026",
    date: "Sep 15, 2026",
    category: "National Overview",
    signatory: "Joint Secretary, DoLR",
    size: "4.8 MB"
  },
  {
    id: "REP-2026-08",
    title: "DILRMP Bhu-Aadhar (ULPIN) Implementation & Dispute Mitigation Impact",
    date: "Aug 28, 2026",
    category: "State Evaluation",
    signatory: "Director General, GIS Division",
    size: "3.2 MB"
  },
  {
    id: "REP-2026-07",
    title: "Coastal Soil Salinization & Agro-Zoning Recommendation Bulletin",
    date: "Jul 14, 2026",
    category: "Policy Advisory",
    signatory: "Technical Advisory Board",
    size: "6.1 MB"
  }
];

export default function ReportsPage() {
  const { datasets, proposals, stats } = useGlobalData();
  const [reports, setReports] = useState(initialReports);
  const [selectedReport, setSelectedReport] = useState<typeof initialReports[0] | null>(null);

  const handleRealPdfDownload = (report: typeof initialReports[0]) => {
    const pdfData: PdfReportData = {
      title: report.title,
      reportId: report.id,
      category: report.category,
      signatory: report.signatory,
      sections: [
        {
          heading: "1. Executive Summary & National DILRMP Metrics",
          content: `Under the Digital India Land Records Modernization Programme (DILRMP), national cadastral map digitization has reached 96.8% across 5,82,000 villages. Total Unique Land Parcel Identification Numbers (ULPIN / Bhu-Aadhar) assigned stands at 18.42 Crore. Currently, ${stats.approvedDatasets} datasets are fully synced into the PostGIS Central Data Lake.`
        },
        {
          heading: "2. Land Dispute Resolution & NGDDRS Performance",
          content: "Implementation of the National Generic Document Registration System (NGDDRS) across 28 States & UTs has reduced average land title dispute resolution duration from 180 days to 42 days. State-level e-registrations demonstrate an 88.4% dispute clearance rate."
        },
        {
          heading: "3. Policy Recommendations & Innovation Pilot Grants",
          content: `The DoLR Technical Evaluation Board has reviewed ${stats.totalProposals} research grant proposals, approving ${stats.approvedProposals} proposals for active pilot grant deployment in coastal and peri-urban zones.`
        }
      ],
      tableData: {
        headers: ["State Name", "Parcels (Cr)", "ULPIN %", "Dispute Resolution %"],
        rows: [
          ["Uttar Pradesh", "3.42", "98.2%", "84.5%"],
          ["Maharashtra", "2.89", "96.7%", "89.1%"],
          ["Madhya Pradesh", "2.24", "94.1%", "91.2%"],
          ["Gujarat", "1.98", "97.4%", "93.0%"],
          ["Tamil Nadu", "1.84", "92.8%", "87.4%"]
        ]
      }
    };

    generateOfficialGovernmentPdf(pdfData);
  };

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider bg-amber-500/20 text-amber-400 border border-amber-500/30 px-2 py-0.5 rounded">
              DECISION SUPPORT & POLICY REPORTS
            </span>
            <span className="text-xs text-slate-400">Department of Land Resources</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Official Policy Decision Reports & Executive Briefs
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Click "Download PDF" on any report to instantly generate & download a real signed Government of India PDF document with live data lake metrics!
          </p>
        </div>

        <button 
          onClick={() => handleRealPdfDownload(reports[0])} 
          className="flex items-center space-x-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-3 rounded-xl text-xs font-bold transition-all shadow-lg shadow-amber-500/10 shrink-0"
        >
          <Printer className="h-4 w-4" />
          <span>Generate Real Executive PDF</span>
        </button>
      </div>

      {/* Reports List */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <FileText className="h-5 w-5 text-amber-500" />
          <span>Published Government Reports (Real PDF Downloads Enabled)</span>
        </h3>

        <div className="space-y-3">
          {reports.map((r) => (
            <div key={r.id} className="bg-white rounded-xl p-5 border border-slate-200 shadow-sm hover:border-amber-300 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              
              <div className="space-y-1 flex-1">
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-bold text-slate-500 font-mono bg-slate-100 px-2 py-0.5 rounded">{r.id}</span>
                  <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded">{r.category}</span>
                  <span className="text-xs text-slate-400">• {r.date}</span>
                </div>
                <h4 className="text-base font-bold text-slate-900">{r.title}</h4>
                <p className="text-xs text-slate-500 font-medium">Approved Signatory: <strong className="text-slate-800">{r.signatory}</strong> • Format: <span className="font-mono text-emerald-600 font-bold">Real PDF Document</span></p>
              </div>

              <div className="flex items-center space-x-2 shrink-0">
                <button
                  onClick={() => setSelectedReport(r)}
                  className="flex items-center space-x-1 bg-slate-100 hover:bg-slate-200 text-slate-800 px-3 py-2 rounded-lg text-xs font-bold transition-colors"
                >
                  <Eye className="h-4 w-4 text-slate-600" />
                  <span>Preview Letterhead</span>
                </button>

                <button
                  onClick={() => handleRealPdfDownload(r)}
                  className="flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-md shadow-emerald-600/20"
                >
                  <Download className="h-4 w-4" />
                  <span>Download PDF</span>
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>

      {/* Preview Modal */}
      {selectedReport && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 border border-slate-300">
            
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <div className="flex items-center space-x-2 text-slate-900 font-bold">
                <Shield className="h-5 w-5 text-amber-500" />
                <span>Government Letterhead Preview</span>
              </div>
              <button onClick={() => setSelectedReport(null)} className="text-slate-400 hover:text-slate-700 text-sm font-bold">✕</button>
            </div>

            <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4 text-slate-800 font-serif">
              <div className="text-center border-b border-slate-300 pb-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-600">भारत सरकार | Government of India</p>
                <p className="text-sm font-bold text-slate-900 mt-1">DEPARTMENT OF LAND RESOURCES (DoLR)</p>
                <p className="text-xs text-slate-500">Ministry of Rural Development, NITI Aayog Tower, New Delhi</p>
              </div>

              <div className="space-y-2 text-xs font-sans">
                <p className="font-bold text-slate-900">{selectedReport.title}</p>
                <p className="text-slate-500">Document Reference: {selectedReport.id} | Date: {selectedReport.date}</p>
                <div className="p-3 bg-white rounded border border-slate-200 text-slate-700 leading-relaxed">
                  "Synthesizing live data from 28 states, the implementation of Digital India Land Records Modernization Programme (DILRMP) has achieved 96.8% cadastral map vectorization. Recommend continuation of ULPIN integration for all Gram Panchayat registries."
                </div>
              </div>

              <div className="pt-4 border-t border-slate-300 flex items-center justify-between text-xs font-sans">
                <div>
                  <p className="font-bold text-slate-900">{selectedReport.signatory}</p>
                  <p className="text-slate-500">Department of Land Resources</p>
                </div>
                <span className="bg-emerald-100 text-emerald-800 px-3 py-1 rounded font-bold text-[10px] uppercase">Digitally Signed ✅</span>
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button onClick={() => setSelectedReport(null)} className="px-4 py-2 bg-slate-100 text-slate-700 rounded-lg text-xs font-bold">Close</button>
              <button onClick={() => { handleRealPdfDownload(selectedReport); setSelectedReport(null); }} className="px-5 py-2 bg-amber-500 text-slate-950 rounded-lg text-xs font-bold flex items-center gap-1.5">
                <Download className="h-4 w-4" />
                <span>Download Real PDF Now</span>
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
