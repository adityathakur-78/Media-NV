"use client";
import { useState } from "react";
import api from "@/lib/axios";

export default function CreateUserPage() {
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      if (role === "STUDENT") {
        await api.post("/admin/student/create", {
          fullname,
          email,
          password,
        });
      } else {
        await api.post("/admin/teacher/create", {
          fullname,
          email,
          password,
        });
      }

      setMessage("User created successfully!");
      setFullname("");
      setEmail("");
      setPassword("");
    } catch (err) {
      setMessage("Failed to create user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Create New User</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4"
      >
        <div>
          <label className="text-sm text-gray-400">Full Name</label>
          <input
            className="w-full mt-1 p-2 bg-black/40 border border-white/10 rounded"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-400">Email</label>
          <input
            type="email"
            className="w-full mt-1 p-2 bg-black/40 border border-white/10 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-400">Password</label>
          <input
            type="password"
            className="w-full mt-1 p-2 bg-black/40 border border-white/10 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="text-sm text-gray-400">Role</label>
          <select
            className="w-full mt-1 p-2 bg-black/40 border border-white/10 rounded"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="STUDENT">Student</option>
            <option value="TEACHER">Teacher</option>
          </select>
        </div>

        <button
          disabled={loading}
          className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded font-semibold"
        >
          {loading ? "Creating..." : "Create User"}
        </button>

        {message && (
          <p className="text-center text-sm text-green-400 mt-2">{message}</p>
        )}
      </form>
    </div>
  );
}
