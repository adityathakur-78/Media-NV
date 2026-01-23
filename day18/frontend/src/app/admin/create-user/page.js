"use client";
import { useState } from "react";
import api from "@/lib/axios";

export default function CreateUserPage() {
  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    role: "STUDENT",
    gender: "MALE",
    phone: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (form.role === "STUDENT") {
        await api.post("/admin/student/create", form);
      } else {
        await api.post("/admin/teacher/create", form);
      }

      setMessage("User created successfully!");
      setForm({
        fullname: "",
        email: "",
        password: "",
        role: "STUDENT",
        gender: "MALE",
        phone: "",
      });
    } catch (err) {
      setMessage("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8">
      {/* Left Info Panel */}
      <div className="col-span-1 bg-linear-to-b from-purple-900/40 to-blue-900/20 border border-white/10 rounded-xl p-6">
        <h2 className="text-xl font-bold mb-2">Smart School Admin</h2>
        <p className="text-sm text-gray-400 mb-4">
          Create and manage Students & Teachers with role-based access control.
        </p>

        <div className="space-y-3 text-sm text-gray-300">
          <p>✔ Secure JWT Authentication</p>
          <p>✔ Role Based Permissions</p>
          <p>✔ Auto Profile Generation</p>
          <p>✔ Analytics Ready</p>
        </div>

        <div className="mt-6 p-4 bg-black/40 rounded-lg border border-white/10">
          <p className="text-xs text-gray-400">Preview</p>
          <p className="font-semibold">{form.fullname || "Full Name"}</p>
          <p className="text-sm text-gray-400">{form.email || "Email"}</p>
          <span className="inline-block mt-2 px-2 py-1 text-xs bg-purple-600/30 rounded">
            {form.role}
          </span>
        </div>
      </div>

      {/* Main Form */}
      <div className="col-span-2">
        <h1 className="text-3xl font-bold mb-2 bg-linear-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Create New User
        </h1>
        <p className="text-gray-400 mb-6">
          Fill the details to onboard a new Student or Teacher into the system.
        </p>

        <form
          onSubmit={handleSubmit}
          className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Full Name</label>
              <input
                name="fullname"
                className="w-full mt-1 p-2 bg-black/40 border border-white/10 rounded"
                value={form.fullname}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Email</label>
              <input
                type="email"
                name="email"
                className="w-full mt-1 p-2 bg-black/40 border border-white/10 rounded"
                value={form.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Password</label>
              <input
                type="password"
                name="password"
                className="w-full mt-1 p-2 bg-black/40 border border-white/10 rounded"
                value={form.password}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label className="text-sm text-gray-400">Phone</label>
              <input
                name="phone"
                className="w-full mt-1 p-2 bg-black/40 border border-white/10 rounded"
                value={form.phone}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm text-gray-400">Role</label>
              <select
                name="role"
                className="w-full mt-1 p-2 bg-black/40 border border-white/10 rounded"
                value={form.role}
                onChange={handleChange}
              >
                <option value="STUDENT">Student</option>
                <option value="TEACHER">Teacher</option>
              </select>
            </div>

            <div>
              <label className="text-sm text-gray-400">Gender</label>
              <select
                name="gender"
                className="w-full mt-1 p-2 bg-black/40 border border-white/10 rounded"
                value={form.gender}
                onChange={handleChange}
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
              </select>
            </div>
          </div>

          <button
            disabled={loading}
            className="w-full py-3 bg-linear-to-r from-blue-600 to-purple-600 rounded-lg font-semibold text-lg shadow-lg hover:scale-[1.02] transition"
          >
            {loading ? "Creating User..." : "Create User"}
          </button>

          {message && (
            <p className="text-center text-sm text-green-400 mt-2">{message}</p>
          )}
        </form>
      </div>
    </div>
  );
}
