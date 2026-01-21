"use client";
import { useState } from "react";
import { Pencil } from "lucide-react";

export default function TeacherTable({ teachers, onEdit }) {
  const [search, setSearch] = useState("");

  const filtered = teachers.filter(
    (t) =>
      t.fullname.toLowerCase().includes(search.toLowerCase()) ||
      t.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <input
        placeholder="Search teacher..."
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
          {filtered.map((t) => (
            <tr key={t.id} className="border-t border-white/10">
              <td className="p-2">{t.fullname}</td>
              <td className="p-2">{t.email}</td>
              <td className="p-2 text-purple-400">TEACHER</td>
              <td className="p-2 text-right">
                <button
                  onClick={() => onEdit(t)}
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
