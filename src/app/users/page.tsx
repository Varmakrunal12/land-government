"use client";

import { Users, UserPlus, Shield, CheckCircle2, Search, Filter, Plus, Send } from "lucide-react";
import { useState } from "react";
import { useGlobalData } from "@/context/GlobalDataContext";

export default function UsersPage() {
  const { users, toggleUserStatus, addUser } = useGlobalData();
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);

  // Form State
  const [name, setName] = useState("");
  const [role, setRole] = useState("Researcher");
  const [org, setOrg] = useState("");
  const [email, setEmail] = useState("");

  const handleCreateUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    addUser({
      name,
      role,
      org: org || "National Research Institute",
      email
    });

    setShowModal(false);
    setName("");
    setEmail("");
    setOrg("");
    alert(`✅ New user account for ${name} (${role}) provisioned successfully!`);
  };

  const filteredUsers = users.filter(u => 
    u.name.toLowerCase().includes(search.toLowerCase()) || 
    u.org.toLowerCase().includes(search.toLowerCase()) || 
    u.role.toLowerCase().includes(search.toLowerCase())
  );

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

        <button 
          onClick={() => setShowModal(true)} 
          className="flex items-center space-x-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2.5 rounded-xl text-xs font-bold transition-all shadow-lg shadow-purple-600/20 shrink-0"
        >
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
                      onClick={() => toggleUserStatus(u.id)}
                      className={`text-xs font-bold ${u.status === "Active" ? "text-rose-600 hover:underline" : "text-emerald-600 hover:underline"}`}
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

      {/* Provision User Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-slate-950/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <UserPlus className="h-5 w-5 text-purple-600" />
                <span>Provision User Account</span>
              </h3>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-700 font-bold">✕</button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-700 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dr. Rajesh K. Mehta"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Official Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. r.mehta@iitb.ac.in"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Role Tier</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-purple-500"
                >
                  <option value="Researcher">Researcher / Academic</option>
                  <option value="Ministry Policymaker">Ministry Policymaker</option>
                  <option value="State Revenue Official">State Revenue Official</option>
                  <option value="GIS Specialist">GIS Specialist</option>
                  <option value="System Administrator">System Administrator</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Organization / Department</label>
                <input
                  type="text"
                  placeholder="e.g. IIT Bombay / Gujarat Revenue Dept"
                  value={org}
                  onChange={(e) => setOrg(e.target.value)}
                  className="w-full border border-slate-300 rounded-lg p-2.5 text-slate-900 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg font-bold hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-purple-600 text-white rounded-lg font-bold hover:bg-purple-500 shadow-md"
                >
                  Provision Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
