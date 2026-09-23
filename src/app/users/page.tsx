"use client";

import { Users, UserPlus, Shield, CheckCircle2, Search, Filter } from "lucide-react";
import { useState } from "react";

const initialUsers = [
  { id: 1, name: "Dr. A. Sharma", role: "Researcher", org: "IIT Delhi", email: "sharma@iitd.ac.in", status: "Active" },
  { id: 2, name: "Smt. K. Verma", role: "State Official", org: "Revenue Dept, UP", email: "k.verma@up.gov.in", status: "Active" },
  { id: 3, name: "Rahul Singh", role: "Ministry Policymaker", org: "DoLR, New Delhi", email: "rahul.singh@gov.in", status: "Active" },
  { id: 4, name: "Dr. S. K. Patel", role: "GIS Specialist", org: "ISRO SAC", email: "patel@sac.isro.gov.in", status: "Active" },
  { id: 5, name: "Priya Nair", role: "State Official", org: "Revenue Dept, Kerala", email: "priya@kerala.gov.in", status: "Pending" }
];

export default function UsersPage() {
  const [users, setUsers] = useState(initialUsers);
  const [search, setSearch] = useState("");

  const toggleStatus = (id: number) => {
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u));
  };

  const filteredUsers = users.filter(u => u.name.toLowerCase().includes(search.toLowerCase()) || u.org.toLowerCase().includes(search.toLowerCase()) || u.role.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="space-y-6">
      
      {/* Title Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 text-white shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 mb-1">
            <span className="text-[10px] uppercase font-bold tracking-wider bg-purple-500/20 text-purple-400 border border-purple-500/30 px-2 py-0.5 rounded">
              USER ACCESS & ROLE MANAGEMENT
            </span>
            <span className="text-xs text-slate-400">Department of Land Resources</span>
          </div>
          <h1 className="text-2xl font-black text-white tracking-tight">
            Registered Platform Users & Role Assignment
          </h1>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl leading-relaxed">
            Manage authenticated Ministry officials, State Revenue Officers, GIS Analysts, and University Researchers across 4 role tiers.
          </p>
        </div>

        <button onClick={() => alert("Opening new user invite portal...")} className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-purple-600/20 shrink-0">
          <UserPlus className="h-4 w-4" />
          <span>Provision New User Account</span>
        </button>
      </div>

      {/* Directory Table */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6 space-y-4">
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-2 border-b border-slate-100">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search user name, organization, or role..."
              className="w-full bg-slate-50 border border-slate-300 text-xs rounded-lg pl-9 pr-3 py-2 text-slate-900 focus:ring-2 focus:ring-purple-500 focus:bg-white focus:outline-none"
            />
          </div>

          <span className="text-xs text-slate-500 font-semibold">{filteredUsers.length} Users Listed</span>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">User Name</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Assigned Role</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Organization</th>
                <th className="px-4 py-3 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right text-xs font-bold text-slate-600 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-slate-200">
              {filteredUsers.map((u) => (
                <tr key={u.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-4 py-4 whitespace-nowrap text-xs font-bold text-slate-900">
                    {u.name}
                    <span className="block text-[10px] text-slate-400 font-mono font-normal">{u.email}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs font-semibold text-purple-700">
                    <span className="bg-purple-50 border border-purple-200 px-2.5 py-0.5 rounded-full">{u.role}</span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-xs text-slate-600 font-medium">{u.org}</td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span className={`px-2.5 py-0.5 inline-flex text-[10px] font-bold rounded-full ${
                      u.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                      u.status === 'Pending' ? 'bg-amber-100 text-amber-800' :
                      'bg-rose-100 text-rose-800'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right">
                    <button
                      onClick={() => toggleStatus(u.id)}
                      className="text-xs font-bold text-blue-600 hover:underline"
                    >
                      {u.status === "Active" ? "Suspend Access" : "Activate User"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </div>
  );
}
