"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, 
  Map, 
  Search, 
  Activity, 
  Lightbulb, 
  Settings,
  ShieldCheck,
  LogOut,
  Upload,
  FileText,
  Users,
  MessageSquare,
  ChevronDown
} from "lucide-react";
import clsx from "clsx";
import { useEffect, useState } from "react";

export type RoleType = "researcher" | "ministry" | "state" | "admin";

const navConfig: Record<RoleType, Array<{ name: string; href: string; icon: any }>> = {
  researcher: [
    { name: "AI Knowledge Engine", href: "/research", icon: Search },
    { name: "GIS & Spatial Analytics", href: "/gis", icon: Map },
    { name: "Innovation & Research Portal", href: "/innovation", icon: Lightbulb },
    { name: "Expert Collaboration", href: "/collaboration", icon: MessageSquare },
  ],
  ministry: [
    { name: "National Policy Dashboard", href: "/dashboard", icon: LayoutDashboard },
    { name: "Policy Simulation Engine", href: "/policy", icon: Activity },
    { name: "RAG Literature Synthesis", href: "/research", icon: Search },
    { name: "Reports & Decision Support", href: "/reports", icon: FileText },
    { name: "Expert Collaboration", href: "/collaboration", icon: MessageSquare },
  ],
  state: [
    { name: "State Land Governance", href: "/state-dashboard", icon: LayoutDashboard },
    { name: "GIS Cadastral Map", href: "/gis", icon: Map },
    { name: "Ingest Datasets (Data Lake)", href: "/upload", icon: Upload },
    { name: "Policy Implementation Tracking", href: "/policy-tracking", icon: Activity },
    { name: "Expert Collaboration", href: "/collaboration", icon: MessageSquare },
  ],
  admin: [
    { name: "System Admin Console", href: "/admin", icon: LayoutDashboard },
    { name: "User & Role Management", href: "/users", icon: Users },
    { name: "Dataset Approval Queue", href: "/approvals", icon: ShieldCheck },
    { name: "System Audit Logs", href: "/logs", icon: Settings },
    { name: "Expert Collaboration", href: "/collaboration", icon: MessageSquare },
  ]
};

const roleDetails: Record<RoleType, { label: string; badgeColor: string; description: string }> = {
  researcher: { 
    label: "👨‍🔬 Researcher / Academic", 
    badgeColor: "bg-blue-100 text-blue-800 border-blue-200", 
    description: "Literature RAG, Datasets & Spatial Models" 
  },
  ministry: { 
    label: "🏛️ Ministry / Policymaker", 
    badgeColor: "bg-amber-100 text-amber-800 border-amber-200", 
    description: "National Level Policy & What-If Simulation" 
  },
  state: { 
    label: "🏢 State Revenue Dept", 
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200", 
    description: "State Cadastral Data & Local Implementation" 
  },
  admin: { 
    label: "⚙️ System Administrator", 
    badgeColor: "bg-purple-100 text-purple-800 border-purple-200", 
    description: "Governance, Data Approval & Audit Trail" 
  }
};

function getRoleFromPathname(path: string): RoleType {
  if (["/admin", "/users", "/approvals", "/logs"].includes(path)) return "admin";
  if (["/state-dashboard", "/upload", "/policy-tracking"].includes(path)) return "state";
  if (["/dashboard", "/policy", "/reports"].includes(path)) return "ministry";
  return "researcher";
}

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [role, setRole] = useState<RoleType>("researcher");
  const [showRoleSelector, setShowRoleSelector] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole") as RoleType;
    if (storedRole && navConfig[storedRole]) {
      setRole(storedRole);
    } else {
      const inferred = getRoleFromPathname(pathname);
      setRole(inferred);
      localStorage.setItem("userRole", inferred);
    }
  }, [pathname]);

  const handleRoleSwitch = (newRole: RoleType) => {
    setRole(newRole);
    localStorage.setItem("userRole", newRole);
    setShowRoleSelector(false);
    
    const defaultRoute = navConfig[newRole][0].href;
    router.push(defaultRoute);
  };

  const navigation = navConfig[role] || navConfig.researcher;

  return (
    <aside className="flex h-full w-64 flex-col bg-slate-900 border-r border-slate-800 text-slate-100 select-none shadow-xl z-20">
      
      {/* DoLR Official Header */}
      <div className="flex h-20 flex-col justify-center px-4 border-b border-slate-800 bg-slate-950/60">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center shrink-0">
            <span className="text-xl font-black text-amber-400">🏛️</span>
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase block leading-none mb-1">Govt. of India</span>
            <span className="text-sm font-bold text-white tracking-tight leading-tight block">DoLR Digital Platform</span>
            <span className="text-[10px] text-slate-400 font-normal block leading-tight">Land Governance Innovation</span>
          </div>
        </div>
      </div>
      
      {/* Tricolor Stripe Accent */}
      <div className="h-1 w-full flex">
        <div className="h-full w-1/3 bg-[#FF9933]"></div>
        <div className="h-full w-1/3 bg-white"></div>
        <div className="h-full w-1/3 bg-[#138808]"></div>
      </div>

      {/* Role Selector Card */}
      <div className="p-3 border-b border-slate-800 bg-slate-800/40 relative">
        <div className="flex items-center justify-between mb-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ACTIVE WORKSPACE ROLE</span>
        </div>
        
        <button
          onClick={() => setShowRoleSelector(!showRoleSelector)}
          className="w-full text-left p-2.5 rounded-lg bg-slate-800 hover:bg-slate-700/80 border border-slate-700 transition-all flex items-center justify-between"
        >
          <div>
            <p className="text-xs font-bold text-white">{roleDetails[role].label}</p>
            <p className="text-[10px] text-slate-400 truncate max-w-[170px]">{roleDetails[role].description}</p>
          </div>
          <ChevronDown className={clsx("h-4 w-4 text-slate-400 transition-transform", showRoleSelector && "rotate-180")} />
        </button>

        {/* Dropdown Role Selector */}
        {showRoleSelector && (
          <div className="absolute left-3 right-3 top-20 bg-slate-800 border border-slate-700 rounded-lg shadow-2xl py-1 z-50 animate-in fade-in slide-in-from-top-2">
            <div className="px-3 py-1.5 border-b border-slate-700/60 text-[10px] font-semibold text-slate-400">
              SWITCH MODULE ROLE
            </div>
            {(Object.keys(roleDetails) as RoleType[]).map((rKey) => (
              <button
                key={rKey}
                onClick={() => handleRoleSwitch(rKey)}
                className={clsx(
                  "w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between",
                  role === rKey ? "bg-amber-500/20 text-amber-300 font-bold" : "text-slate-300 hover:bg-slate-700"
                )}
              >
                <span>{roleDetails[rKey].label}</span>
                {role === rKey && <span className="text-[10px] bg-amber-500 text-slate-900 px-1.5 py-0.5 rounded font-bold">Active</span>}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Main Nav Items */}
      <div className="flex-1 overflow-y-auto py-3 px-2 space-y-1">
        <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">MODULE NAVIGATION</p>
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "group flex items-center rounded-lg px-3 py-2.5 text-xs font-medium transition-all duration-150",
                isActive
                  ? "bg-amber-500 text-slate-950 font-bold shadow-md shadow-amber-500/20"
                  : "text-slate-300 hover:bg-slate-800/80 hover:text-white"
              )}
            >
              <item.icon
                className={clsx(
                  "mr-3 h-4 w-4 flex-shrink-0 transition-colors",
                  isActive ? "text-slate-950" : "text-amber-400 group-hover:text-amber-300"
                )}
                aria-hidden="true"
              />
              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Return to Main Portal / Login */}
      <div className="border-t border-slate-800 p-3 bg-slate-950/40">
        <button
          onClick={() => {
            localStorage.removeItem("userRole");
            router.push("/");
          }}
          className="w-full flex items-center justify-center rounded-md px-3 py-2 text-xs font-semibold text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/60 transition-colors"
        >
          <LogOut className="mr-2 h-4 w-4 text-amber-400" />
          Role Selection Portal
        </button>
      </div>

    </aside>
  );
}
