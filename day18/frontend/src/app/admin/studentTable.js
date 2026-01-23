"use client";
import { useState } from "react";
import { Pencil, Search, UserCheck, UserX } from "lucide-react";

export default function StudentTable({ students, onEdit }) {
  const [search, setSearch] = useState("");

  const filtered = students.filter(
    (s) =>
      s.fullname.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()) ||
      s.phone?.includes(search),
  );

  return (
    <div
      className="relative bg-white/5 backdrop-blur-xl border border-white/10 
                    rounded-2xl p-6 shadow-[0_0_40px_rgba(34,211,238,0.15)]"
    >
      {/* Search */}
      <div className="flex items-center gap-2 mb-4 bg-black/40 px-3 py-2 rounded-lg border border-white/10">
        <Search size={16} className="text-cyan-400" />
        <input
          placeholder="Search by name, email or phone..."
          className="bg-transparent outline-none w-full text-sm text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <thead>
            <tr className="text-gray-400 border-b border-white/10">
              <th className="text-left py-3 px-2">Name</th>
              <th className="text-left py-3 px-2">Email</th>
              <th className="text-left py-3 px-2">Role</th>
              <th className="text-left py-3 px-2">Gender</th>
              <th className="text-left py-3 px-2">Phone</th>
              <th className="text-left py-3 px-2">Address</th>
              <th className="text-left py-3 px-2">About</th>
              <th className="text-left py-3 px-2">Status</th>
              <th className="text-left py-3 px-2">Created</th>
              <th className="text-left py-3 px-2">Updated</th>
              <th className="text-right py-3 px-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map((s) => (
              <tr
                key={s.id}
                className="group border-b border-white/5 hover:bg-white/5 transition-all"
              >
                <td className="py-3 px-2 font-medium text-white">
                  {s.fullname}
                </td>
                <td className="py-3 px-2 text-gray-300">{s.email}</td>
                <td className="py-3 px-2 text-cyan-400 font-semibold">
                  {s.role}
                </td>

                <td className="py-3 px-2">
                  <span className="px-2 py-1 text-xs rounded-full bg-purple-500/10 text-purple-300">
                    {s.gender}
                  </span>
                </td>

                <td className="py-3 px-2 text-gray-300">{s.phone || "-"}</td>
                <td className="py-3 px-2 text-gray-300 truncate max-w-50">
                  {s.address || "-"}
                </td>
                <td className="py-3 px-2 text-gray-300 truncate max-w-50">
                  {s.about || "-"}
                </td>

                <td className="py-3 px-2">
                  {s.isActive ? (
                    <span className="flex items-center gap-1 text-green-400 text-xs">
                      <UserCheck size={14} /> Active
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-red-400 text-xs">
                      <UserX size={14} /> Inactive
                    </span>
                  )}
                </td>

                <td className="py-3 px-2 text-gray-400">
                  {new Date(s.createdAt).toLocaleDateString()}
                </td>

                <td className="py-3 px-2 text-gray-400">
                  {new Date(s.updatedAt).toLocaleDateString()}
                </td>

                <td className="py-3 px-2 text-right">
                  <button
                    onClick={() => onEdit(s)}
                    className="p-2 rounded-lg 
                               bg-yellow-400/10 text-yellow-400
                               hover:bg-yellow-400/20 hover:scale-110
                               transition-all"
                  >
                    <Pencil size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="text-center py-6 text-gray-400">
            No students found
          </div>
        )}
      </div>
    </div>
  );
}
