"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/protectedRoute";
import { Roles } from "@/enums/role";
import api from "@/lib/axios";

const quotes = [
  "Dream big. Work hard. Stay consistent.",
  "Your future is created by what you do today, not tomorrow.",
  "Small progress every day leads to big success.",
  "Discipline is the bridge between goals and achievement.",
];

export default function StudentProfile() {
  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [quote] = useState(quotes[Math.floor(Math.random() * quotes.length)]);

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await api.get("/student/me");
      setStudent(res.data.data);
      setLoading(false);
    };
    fetchProfile();
  }, []);

  const handleChange = (e) => {
    setStudent({ ...student, [e.target.name]: e.target.value });
  };

  const handleUpdate = async () => {
    await api.patch(`/student/${student.id}`, {
      fullname: student.fullname,
      gender: student.gender,
      about: student.about,
      phone: student.phone,
      address: student.address,
    });
    setMessage("✨ Profile updated successfully");
  };

  if (loading) return <p className="text-white p-6">Loading profile...</p>;

  const avatarStyle =
    student.gender === "MALE"
      ? "avataaars"
      : student.gender === "FEMALE"
        ? "avataaars"
        : "bottts";

  const avatarUrl = `https://api.dicebear.com/7.x/${avatarStyle}/svg?seed=${student.id}`;

  return (
    <ProtectedRoute allowedRoles={[Roles.STUDENT]}>
      <div className="min-h-screen p-10 bg-linear-to-br from-[#0b1020] via-[#0e1628] to-[#020617]">
        {/* Hero Profile */}
        <div
          className="mb-10 rounded-3xl p-8 bg-linear-to-r from-cyan-500/10 to-blue-600/10 
                        border border-white/10 shadow-[0_0_60px_rgba(34,211,238,0.25)]"
        >
          <div className="flex items-center gap-6">
            {/* Avatar */}
            <div
              className="w-28 h-28 rounded-full overflow-hidden 
                            shadow-[0_0_30px_rgba(34,211,238,0.7)]
                            ring-2 ring-cyan-400/40 bg-black"
            >
              <img
                src={avatarUrl}
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            <div>
              <h1 className="text-3xl font-bold text-white">
                {student.fullname?.charAt(0).toUpperCase() +
                  student.fullname?.slice(1)}
              </h1>

              <p className="text-cyan-400">{student.role}</p>
              <p className="text-gray-400 text-sm">{student.email}</p>
              <p className="mt-3 text-gray-300 italic">“{quote}”</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <p className="text-gray-400 text-sm">Status</p>
            <p className="text-green-400 font-semibold">Active</p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <p className="text-gray-400 text-sm">Gender</p>
            <p className="text-white font-semibold">{student.gender}</p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <p className="text-gray-400 text-sm">Phone</p>
            <p className="text-white font-semibold">{student.phone}</p>
          </div>
          <div className="bg-white/5 p-4 rounded-xl border border-white/10">
            <p className="text-gray-400 text-sm">Location</p>
            <p className="text-white font-semibold">{student.address}</p>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Motivation */}
          <div
            className="bg-linear-to-br from-purple-500/10 to-pink-500/10 
                          border border-white/10 rounded-2xl p-6 shadow-xl"
          >
            <h3 className="text-white text-lg font-semibold mb-3">
              🎯 Today’s Focus
            </h3>
            <p className="text-gray-300 leading-relaxed">{student.about}</p>
            <div className="mt-4 p-3 rounded-lg bg-black/30 text-cyan-300 text-sm">
              Stay focused. Stay consistent. Greatness is built daily.
            </div>
          </div>

          {/* Editable Form */}
          <div
            className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 
                          rounded-2xl p-8 shadow-[0_0_40px_rgba(34,211,238,0.15)]"
          >
            <h2 className="text-2xl font-semibold text-white mb-6">
              ✏️ Edit Profile Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-gray-400 text-sm">Full Name</label>
                <input
                  name="fullname"
                  value={student.fullname}
                  onChange={handleChange}
                  className="w-full mt-1 bg-black/40 border border-white/10 text-white px-3 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm">Email (Locked)</label>
                <input
                  value={student.email}
                  disabled
                  className="w-full mt-1 bg-black/20 border border-white/10 text-gray-500 px-3 py-2 rounded-lg"
                />
              </div>

              <div>
                <label className="text-gray-400 text-sm">Gender</label>
                <select
                  name="gender"
                  value={student.gender}
                  onChange={handleChange}
                  className="w-full mt-1 bg-black/40 border border-white/10 text-white px-3 py-2 rounded-lg"
                >
                  <option>MALE</option>
                  <option>FEMALE</option>
                  <option>OTHER</option>
                </select>
              </div>

              <div>
                <label className="text-gray-400 text-sm">Phone</label>
                <input
                  name="phone"
                  value={student.phone}
                  onChange={handleChange}
                  className="w-full mt-1 bg-black/40 border border-white/10 text-white px-3 py-2 rounded-lg"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-gray-400 text-sm">About You</label>
                <textarea
                  name="about"
                  value={student.about}
                  onChange={handleChange}
                  rows={3}
                  className="w-full mt-1 bg-black/40 border border-white/10 text-white px-3 py-2 rounded-lg"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-gray-400 text-sm">Address</label>
                <textarea
                  name="address"
                  value={student.address}
                  onChange={handleChange}
                  rows={2}
                  className="w-full mt-1 bg-black/40 border border-white/10 text-white px-3 py-2 rounded-lg"
                />
              </div>
            </div>

            <div className="flex justify-between items-center mt-8">
              <p className="text-green-400 text-sm">{message}</p>

              <button
                onClick={handleUpdate}
                className="px-8 py-2 rounded-full 
                           bg-linear-to-r from-cyan-400 to-blue-600
                           text-black font-semibold shadow-lg
                           hover:scale-105 transition"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
