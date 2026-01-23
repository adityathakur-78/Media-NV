"use client";
import { useEffect, useMemo, useState } from "react";
import api from "@/lib/axios";
import {
  ShieldCheck,
  Users,
  UserX,
  UserCheck,
  Filter,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const PAGE_SIZE = 8;

export default function RolesPermissionsPage() {
  const [users, setUsers] = useState([]);
  const [filterRole, setFilterRole] = useState("ALL");
  const [filterStatus, setFilterStatus] = useState("ALL"); // ALL | ACTIVE | INACTIVE
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const loadUsers = async () => {
    const t = await api.get("/admin/all-teachers");
    const s = await api.get("/admin/all-students");
    const all = [...(t.data?.data || []), ...(s.data?.data || [])];
    setUsers(all);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const toggleStatus = async (user) => {
    await api.patch(`/admin/users/${user.id}/status`, {
      isActive: !user.isActive,
    });
    loadUsers();
  };

  const filtered = useMemo(() => {
    return users.filter((u) => {
      const matchRole = filterRole === "ALL" ? true : u.role === filterRole;

      const matchStatus =
        filterStatus === "ALL"
          ? true
          : filterStatus === "ACTIVE"
            ? u.isActive
            : !u.isActive;

      const matchSearch =
        u.fullname.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase());

      return matchRole && matchStatus && matchSearch;
    });
  }, [users, filterRole, filterStatus, search]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const activeCount = users.filter((u) => u.isActive).length;
  const inactiveCount = users.filter((u) => !u.isActive).length;

  return (
    <div className="min-h-screen bg-[#021a27] p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-6">
          <ShieldCheck className="w-7 h-7 text-sky-400" />
          <div>
            <h1 className="text-2xl font-semibold text-white">
              Roles & Permissions
            </h1>
            <p className="text-white/60 text-sm">
              Activate or deactivate student and teacher accounts
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-5">
          <Stat title="Total Users" value={users.length} icon={Users} />
          <Stat title="Active Users" value={activeCount} icon={UserCheck} />
          <Stat title="Inactive Users" value={inactiveCount} icon={UserX} />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white/5 border border-white/10 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <Filter className="text-white/70 w-4 h-4" />

            {/* Role Filter */}
            <select
              className="bg-black/40 border border-white/20 rounded px-3 py-2 text-white"
              value={filterRole}
              onChange={(e) => {
                setFilterRole(e.target.value);
                setPage(1);
              }}
            >
              <option value="ALL">All Roles</option>
              <option value="STUDENT">Students</option>
              <option value="TEACHER">Teachers</option>
            </select>

            {/* Status Filter */}
            <select
              className="bg-black/40 border border-white/20 rounded px-3 py-2 text-white"
              value={filterStatus}
              onChange={(e) => {
                setFilterStatus(e.target.value);
                setPage(1);
              }}
            >
              <option value="ALL">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="INACTIVE">Inactive</option>
            </select>
          </div>

          {/* Search */}
          <div className="flex items-center gap-2 bg-black/40 border border-white/20 rounded px-3 py-2">
            <Search className="w-4 h-4 text-white/60" />
            <input
              className="bg-transparent outline-none text-white text-sm"
              placeholder="Search by name or email..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
            />
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <div className="grid grid-cols-5 gap-4 px-5 py-3 text-sm text-white/70 border-b border-white/10">
            <span>Name</span>
            <span>Email</span>
            <span>Role</span>
            <span>Status</span>
            <span>Action</span>
          </div>

          {paginated.map((u) => (
            <div
              key={u.id}
              className="grid grid-cols-5 gap-4 px-5 py-3 items-center text-white/80 hover:bg-white/10 transition"
            >
              <span className="font-medium">{u.fullname}</span>
              <span className="text-sm">{u.email}</span>

              <span
                className={`text-xs px-2 py-1 rounded-full w-fit ${
                  u.role === "TEACHER"
                    ? "bg-purple-600/20 text-purple-300"
                    : "bg-blue-600/20 text-blue-300"
                }`}
              >
                {u.role}
              </span>

              <span
                className={`text-xs px-2 py-1 rounded-full w-fit ${
                  u.isActive
                    ? "bg-emerald-600/20 text-emerald-300"
                    : "bg-red-600/20 text-red-300"
                }`}
              >
                {u.isActive ? "ACTIVE" : "INACTIVE"}
              </span>

              <button
                onClick={() => toggleStatus(u)}
                className={`px-3 py-1.5 rounded text-xs font-semibold transition ${
                  u.isActive
                    ? "bg-red-600/20 text-red-300 hover:bg-red-600/40"
                    : "bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/40"
                }`}
              >
                {u.isActive ? "Deactivate" : "Activate"}
              </button>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-end gap-3">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="p-2 bg-white/10 rounded disabled:opacity-40"
          >
            <ChevronLeft className="w-4 h-4 text-white" />
          </button>

          <span className="text-white text-sm">
            Page {page} of {totalPages || 1}
          </span>

          <button
            disabled={page === totalPages || totalPages === 0}
            onClick={() => setPage((p) => p + 1)}
            className="p-2 bg-white/10 rounded disabled:opacity-40"
          >
            <ChevronRight className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value, icon: Icon }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex items-center justify-between">
      <div>
        <p className="text-white/60 text-sm">{title}</p>
        <p className="text-2xl font-bold text-sky-300">{value}</p>
      </div>
      <Icon className="w-6 h-6 text-sky-300" />
    </div>
  );
}
