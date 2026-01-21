"use client";
import { useState } from "react";
import { Pencil } from "lucide-react";

export default function StudentTable({ students, onEdit }) {
  const [search, setSearch] = useState("");

  const filtered = students.filter(
    (s) =>
      s.fullname.toLowerCase().includes(search.toLowerCase()) ||
      s.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <input
        placeholder="Search student..."
        className="mb-4 w-full bg-black/40 p-2 rounded border border-white/10"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <table className="w-full text-sm">
        <thead className="text-gray-400">
          <tr>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Email</th>
            <th className="text-left p-2">Status</th>
            <th className="text-right p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((s) => (
            <tr key={s.id} className="border-t border-white/10">
              <td className="p-2">{s.fullname}</td>
              <td className="p-2">{s.email}</td>
              <td className="p-2 text-blue-400">STUDENT</td>
              <td className="p-2 text-right">
                <button
                  onClick={() => onEdit(s)}
                  className="text-yellow-400 hover:text-yellow-300"
                >
                  <Pencil size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
