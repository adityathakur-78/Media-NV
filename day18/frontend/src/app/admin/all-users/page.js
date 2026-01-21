"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";

export default function AllUsersPage() {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("ALL");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [page, setPage] = useState(1);
  const perPage = 10;

  useEffect(() => {
    const loadUsers = async () => {
      const res = await api.get("/admin/all");
      setUsers(res.data.data);
    };
    loadUsers();
  }, []);

  const filtered = users
    .filter(
      (u) =>
        u.fullname.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()),
    )
    .filter((u) => (roleFilter === "ALL" ? true : u.role === roleFilter))
    .filter((u) =>
      statusFilter === "ALL"
        ? true
        : statusFilter === "ACTIVE"
          ? u.isActive
          : !u.isActive,
    )
    .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));

  const totalPages = Math.ceil(filtered.length / perPage);
  const start = (page - 1) * perPage;
  const paginated = filtered.slice(start, start + perPage);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">All Users</h1>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-4">
        <input
          placeholder="Search name or email..."
          className="bg-black/40 border border-white/10 p-2 rounded"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="bg-black/40 border border-white/10 p-2 rounded"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="ALL">All Roles</option>
          <option value="STUDENT">Student</option>
          <option value="TEACHER">Teacher</option>
          <option value="ADMIN">Admin</option>
        </select>

        <select
          className="bg-black/40 border border-white/10 p-2 rounded"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="ALL">All Status</option>
          <option value="ACTIVE">Active</option>
          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white/5 border border-white/10 rounded-xl">
        <table className="min-w-full text-sm">
          <thead className="bg-black/40 text-gray-300">
            <tr>
              <th className="p-2">S.No</th>
              <th className="p-2 text-left">Name</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2">Role</th>
              <th className="p-2">Gender</th>
              <th className="p-2">Phone</th>
              <th className="p-2">Status</th>
              <th className="p-2">Created At</th>
              <th className="p-2">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {paginated.map((u, i) => (
              <tr
                key={u.id}
                className="border-t border-white/10 hover:bg-white/5"
              >
                <td className="p-2 text-center">{start + i + 1}</td>
                <td className="p-2">{u.fullname}</td>
                <td className="p-2">{u.email}</td>
                <td
                  className={`p-2 font-semibold text-center ${
                    u.role === "ADMIN"
                      ? "text-yellow-400"
                      : u.role === "TEACHER"
                        ? "text-purple-400"
                        : "text-blue-400"
                  }`}
                >
                  {u.role}
                </td>
                <td className="p-2 text-center">{u.gender || "-"}</td>
                <td className="p-2">{u.phone || "-"}</td>
                <td
                  className={`p-2 font-bold text-center ${
                    u.isActive ? "text-green-400" : "text-red-400"
                  }`}
                >
                  {u.isActive ? "Active" : "Inactive"}
                </td>
                <td className="p-2 text-xs">
                  {new Date(u.createdAt).toLocaleString()}
                </td>
                <td className="p-2 text-xs">
                  {new Date(u.updatedAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 mt-4">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 bg-white/10 rounded disabled:opacity-40"
        >
          Prev
        </button>

        <span className="px-3 py-1">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 bg-white/10 rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}
