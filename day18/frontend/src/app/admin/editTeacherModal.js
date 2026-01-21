"use client";
import { useState } from "react";
import api from "@/lib/axios";

export default function EditTeacherModal({ teacher, onClose, onUpdated }) {
  const [fullname, setFullname] = useState(teacher.fullname);
  const [email, setEmail] = useState(teacher.email);

  const update = async () => {
    await api.patch(`/admin/teacher/update/${teacher.id}`, {
      fullname,
      email,
    });
    onUpdated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-[#0F1525] p-6 rounded-xl w-96">
        <h2 className="text-lg font-bold mb-4">Edit Teacher</h2>

        <input
          className="w-full mb-3 p-2 bg-black/40 border border-white/10 rounded"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
        />

        <input
          className="w-full mb-4 p-2 bg-black/40 border border-white/10 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-600 rounded">
            Cancel
          </button>
          <button onClick={update} className="px-4 py-2 bg-purple-600 rounded">
            Update
          </button>
        </div>
      </div>
    </div>
  );
}
