"use client";
import { useState } from "react";
import api from "../../lib/axios";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullname: "",
    role: "student",
  });

  const handleRegister = async () => {
    await api.post("/auth/register", form);
    router.push("/login");
  };

  return (
    <div>
      <h2>Register</h2>

      <input
        placeholder="Full Name"
        onChange={(e) => setForm({ ...form, fullname: e.target.value })}
      />
      <input
        placeholder="Email"
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />

      <select onChange={(e) => setForm({ ...form, role: e.target.value })}>
        <option value="student">Student</option>
        <option value="teacher">Teacher</option>
        <option value="admin">Admin</option>
      </select>

      <button onClick={handleRegister}>Register</button>
    </div>
  );
}
