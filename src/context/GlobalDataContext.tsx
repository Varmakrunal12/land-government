"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface DatasetItem {
  id: string;
  title: string;
  uploader: string;
  size: string;
  format: string;
  status: "Pending Validation" | "Approved & Synced" | "Rejected";
  state: string;
  date: string;
}

export interface ProposalItem {
  id: string;
  title: string;
  author: string;
  category: string;
  budget: string;
  state: string;
  votes: number;
  status: "Under DoLR Review" | "Approved for Pilot" | "Rejected";
  summary: string;
  date: string;
}

export interface UserItem {
  id: string;
  name: string;
  role: string;
  org: string;
  email: string;
  status: "Active" | "Pending" | "Suspended";
}

export interface AuditLogItem {
  timestamp: string;
  type: "INFO" | "WARN" | "ERROR" | "SYSTEM";
  message: string;
  module: string;
}

interface GlobalDataContextType {
  datasets: DatasetItem[];
  addDataset: (dataset: Omit<DatasetItem, "id" | "status" | "date">) => void;
  approveDataset: (id: string) => void;
  rejectDataset: (id: string) => void;

  proposals: ProposalItem[];
  addProposal: (proposal: Omit<ProposalItem, "id" | "votes" | "status" | "date">) => void;
  voteProposal: (id: string) => void;
  approveProposal: (id: string) => void;

  users: UserItem[];
  toggleUserStatus: (id: string) => void;
  addUser: (user: Omit<UserItem, "id" | "status">) => void;

  auditLogs: AuditLogItem[];
  addLog: (type: "INFO" | "WARN" | "ERROR" | "SYSTEM", message: string, module: string) => void;

  // Global Stat Counters derived from state
  stats: {
    totalDatasets: number;
    approvedDatasets: number;
    totalProposals: number;
    approvedProposals: number;
    activeUsers: number;
    disputeResolutionPct: number;
  };
}

const initialDatasets: DatasetItem[] = [
  { id: "ds-1", title: "Gujarat Coastal Salinity Survey 2026", uploader: "State Dept Gujarat", size: "45 MB", format: "GeoJSON Vector", status: "Approved & Synced", state: "Gujarat", date: "2026-09-18" },
  { id: "ds-2", title: "Punjab Agricultural Yield & Soil Quality Overlay", uploader: "Agri Board Punjab", size: "120 MB", format: "ESRI SHP", status: "Pending Validation", state: "Punjab", date: "2026-09-19" },
  { id: "ds-3", title: "Maharashtra Pune District Cadastral Boundaries", uploader: "Revenue Dept Maharashtra", size: "85 MB", format: "OGC WFS GeoJSON", status: "Approved & Synced", state: "Maharashtra", date: "2026-09-19" }
];

const initialProposals: ProposalItem[] = [
  { id: "prop-1", title: "AI-Driven Satellite Verification for High-Speed Land Title Mutation", author: "Dr. Arvind Subramanian (IIT Bombay)", category: "AI & Remote Sensing", budget: "₹45 Lakhs", state: "Maharashtra", votes: 124, status: "Approved for Pilot", summary: "Automating boundary comparison between drone orthophotos and revenue cadastral maps.", date: "2026-09-15" },
  { id: "prop-2", title: "Blockchain-Backed Land Dispute Prevention Ledger for Gram Panchayats", author: "Prof. Sunita Rao (NIT Surathkal)", category: "Blockchain & Governance", budget: "₹38 Lakhs", state: "Karnataka", votes: 98, status: "Under DoLR Review", summary: "Immutable distributed ledger for local land inheritance registries at village level.", date: "2026-09-17" }
];

const initialUsers: UserItem[] = [
  { id: "usr-1", name: "Dr. A. Sharma", role: "Researcher", org: "IIT Delhi", email: "sharma@iitd.ac.in", status: "Active" },
  { id: "usr-2", name: "Smt. K. Verma", role: "State Revenue Officer", org: "Revenue Dept, UP", email: "k.verma@up.gov.in", status: "Active" },
  { id: "usr-3", name: "Shri Rahul Singh", role: "Ministry Policymaker", org: "DoLR, New Delhi", email: "rahul.singh@gov.in", status: "Active" },
  { id: "usr-4", name: "Dr. S. K. Patel", role: "GIS Specialist", org: "ISRO SAC", email: "patel@sac.isro.gov.in", status: "Active" }
];

const initialAuditLogs: AuditLogItem[] = [
  { timestamp: "2026-09-19 12:40:11", type: "INFO", message: "User Dr. A. Sharma executed RAG Policy Synthesis query: 'ULPIN dispute resolution'.", module: "Knowledge Engine" },
  { timestamp: "2026-09-19 12:45:34", type: "INFO", message: "Dataset 'Maharashtra Pune Cadastral Boundaries' ingested into Data Lake.", module: "State Ingestion" },
  { timestamp: "2026-09-19 12:50:00", type: "SYSTEM", message: "PostGIS Spatial RAG index rebuilt. 1,240 new embeddings added.", module: "System Core" }
];

const GlobalDataContext = createContext<GlobalDataContextType | undefined>(undefined);

export function GlobalDataProvider({ children }: { children: React.ReactNode }) {
  const [datasets, setDatasets] = useState<DatasetItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dolr_datasets");
      if (saved) try { return JSON.parse(saved); } catch (e) {}
    }
    return initialDatasets;
  });

  const [proposals, setProposals] = useState<ProposalItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dolr_proposals");
      if (saved) try { return JSON.parse(saved); } catch (e) {}
    }
    return initialProposals;
  });

  const [users, setUsers] = useState<UserItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dolr_users");
      if (saved) try { return JSON.parse(saved); } catch (e) {}
    }
    return initialUsers;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogItem[]>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("dolr_audit_logs");
      if (saved) try { return JSON.parse(saved); } catch (e) {}
    }
    return initialAuditLogs;
  });

  // Sync to LocalStorage on change
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("dolr_datasets", JSON.stringify(datasets));
      localStorage.setItem("dolr_proposals", JSON.stringify(proposals));
      localStorage.setItem("dolr_users", JSON.stringify(users));
      localStorage.setItem("dolr_audit_logs", JSON.stringify(auditLogs));
    }
  }, [datasets, proposals, users, auditLogs]);

  // Helper to append logs
  const addLog = (type: "INFO" | "WARN" | "ERROR" | "SYSTEM", message: string, module: string) => {
    const newLog: AuditLogItem = {
      timestamp: new Date().toISOString().replace("T", " ").substring(0, 19),
      type,
      message,
      module
    };
    setAuditLogs(prev => [newLog, ...prev]);
  };

  // Dataset Actions
  const addDataset = (dataset: Omit<DatasetItem, "id" | "status" | "date">) => {
    const newDs: DatasetItem = {
      ...dataset,
      id: `ds-${Date.now()}`,
      status: "Pending Validation",
      date: new Date().toISOString().split("T")[0]
    };
    setDatasets(prev => [newDs, ...prev]);
    addLog("INFO", `New dataset '${dataset.title}' uploaded by ${dataset.uploader}. Queued for Admin approval.`, "Dataset Upload");
  };

  const approveDataset = (id: string) => {
    let title = "";
    setDatasets(prev => prev.map(d => {
      if (d.id === id) {
        title = d.title;
        return { ...d, status: "Approved & Synced" };
      }
      return d;
    }));
    addLog("INFO", `Admin APPROVED dataset '${title}' -> Ingested into PostGIS Data Lake.`, "Admin Approvals");
  };

  const rejectDataset = (id: string) => {
    let title = "";
    setDatasets(prev => prev.map(d => {
      if (d.id === id) {
        title = d.title;
        return { ...d, status: "Rejected" };
      }
      return d;
    }));
    addLog("WARN", `Admin REJECTED dataset '${title}' due to schema mismatch.`, "Admin Approvals");
  };

  // Proposal Actions
  const addProposal = (proposal: Omit<ProposalItem, "id" | "votes" | "status" | "date">) => {
    const newProp: ProposalItem = {
      ...proposal,
      id: `prop-${Date.now()}`,
      votes: 1,
      status: "Under DoLR Review",
      date: new Date().toISOString().split("T")[0]
    };
    setProposals(prev => [newProp, ...prev]);
    addLog("INFO", `Researcher '${proposal.author}' submitted new innovation proposal '${proposal.title}'.`, "Innovation Portal");
  };

  const voteProposal = (id: string) => {
    setProposals(prev => prev.map(p => p.id === id ? { ...p, votes: p.votes + 1 } : p));
  };

  const approveProposal = (id: string) => {
    let title = "";
    setProposals(prev => prev.map(p => {
      if (p.id === id) {
        title = p.title;
        return { ...p, status: "Approved for Pilot" };
      }
      return p;
    }));
    addLog("INFO", `DoLR Technical Board APPROVED innovation proposal '${title}' for Pilot Grant.`, "Innovation Portal");
  };

  // User Actions
  const toggleUserStatus = (id: string) => {
    let name = "";
    let newStatus = "";
    setUsers(prev => prev.map(u => {
      if (u.id === id) {
        name = u.name;
        newStatus = u.status === "Active" ? "Suspended" : "Active";
        return { ...u, status: newStatus as UserItem["status"] };
      }
      return u;
    }));
    addLog("WARN", `Admin toggled status for user '${name}' to '${newStatus}'.`, "User Management");
  };

  const addUser = (user: Omit<UserItem, "id" | "status">) => {
    const newU: UserItem = {
      ...user,
      id: `usr-${Date.now()}`,
      status: "Active"
    };
    setUsers(prev => [newU, ...prev]);
    addLog("INFO", `Admin provisioned new user account for '${user.name}' (${user.role}).`, "User Management");
  };

  // Dynamic Derived Stats
  const stats = {
    totalDatasets: datasets.length,
    approvedDatasets: datasets.filter(d => d.status === "Approved & Synced").length,
    totalProposals: proposals.length,
    approvedProposals: proposals.filter(p => p.status === "Approved for Pilot").length,
    activeUsers: users.filter(u => u.status === "Active").length,
    disputeResolutionPct: 88.4
  };

  return (
    <GlobalDataContext.Provider value={{
      datasets, addDataset, approveDataset, rejectDataset,
      proposals, addProposal, voteProposal, approveProposal,
      users, toggleUserStatus, addUser,
      auditLogs, addLog,
      stats
    }}>
      {children}
    </GlobalDataContext.Provider>
  );
}

export function useGlobalData() {
  const context = useContext(GlobalDataContext);
  if (!context) {
    throw new Error("useGlobalData must be used within a GlobalDataProvider");
  }
  return context;
}
