"use client";
import { useState } from "react";
import api from "@/lib/axios";

export default function EditTeacherModal({ teacher, onClose, onUpdated }) {
  const [form, setForm] = useState({
    fullname: teacher.fullname || "",
    gender: teacher.gender || "",
    about: teacher.about || "",
    phone: teacher.phone || "",
    address: teacher.address || "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const update = async () => {
    await api.patch(`/admin/teacher/update/${teacher.id}`, form);
    onUpdated();
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="bg-[#0F1525] p-6 rounded-xl w-112.5">
        <h2 className="text-lg font-bold mb-4">Edit Teacher</h2>

        <input
          name="fullname"
          value={form.fullname}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full mb-3 p-2 bg-black/40 border border-white/10 rounded"
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full mb-3 p-2 bg-black/40 border border-white/10 rounded"
        >
          <option value="MALE">MALE</option>
          <option value="FEMALE">FEMALE</option>
        </select>

        <textarea
          name="about"
          value={form.about}
          onChange={handleChange}
          placeholder="About"
          className="w-full mb-3 p-2 bg-black/40 border border-white/10 rounded"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone"
          className="w-full mb-3 p-2 bg-black/40 border border-white/10 rounded"
        />

        <input
          name="address"
          value={form.address}
          onChange={handleChange}
          placeholder="Address"
          className="w-full mb-4 p-2 bg-black/40 border border-white/10 rounded"
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
