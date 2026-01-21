"use client";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import { Roles } from "@/enums/role";
import HexaBackground from "@/components/hexabackground";
import { useRouter } from "next/navigation";
import { User, Mail, Lock, GraduationCap, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Signup() {
  const { register } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
    fullname: "",
    role: Roles.STUDENT,
  });
  const router = useRouter();

  const submit = (e) => {
    e.preventDefault();
    register(form);
  };

  return (
    <div className="relative h-screen flex flex-col overflow-hidden overflow-x-hidden text-white">
      <HexaBackground />

      {/* HEADER */}
      <header className="relative z-10 h-14 flex items-center justify-center border-b border-white/10 bg-black/30 backdrop-blur">
        <div className="flex items-center gap-2 text-base font-semibold">
          <GraduationCap size={20} />
          Smart School Management System
        </div>
      </header>

      {/* CENTER */}
      <div className="flex-1 flex items-center justify-center">
        <div className="relative z-10 w-full max-w-md rounded-2xl bg-[#12141a]/80 backdrop-blur-xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)] px-8 py-10">
          <div className="flex items-center justify-center gap-2">
            <GraduationCap className="w-7 h-7 text-blue-400" />
            <h1 className="bg-linear-to-r from-blue-300 via-purple-400 to-cyan-300 bg-clip-text italic font-semibold text-3xl tracking-tight leading-tight -skew-x-3 text-transparent drop-shadow-[0_0_20px_rgba(124,107,255,0.25)]">
              <Link href="/">Smart School Portal</Link>
            </h1>
          </div>
          <p className="text-sm text-gray-400 text-center mb-2">
            Create your account to access the digital campus
          </p>

          <div className="flex items-center justify-center gap-2 text-sm text-gray-400 mb-5">
            <ShieldCheck size={16} />
            Secure role-based access
          </div>

          {/* ROLE */}
          <div className="mb-5">
            <p className="text-sm text-gray-400 mb-2 text-center">
              Are you a Teacher? Select your role
            </p>

            <div className="grid grid-cols-2 gap-3">
              <div
                onClick={() => setForm({ ...form, role: Roles.STUDENT })}
                className={`cursor-pointer rounded-lg px-4 py-3 transition relative
                  ${
                    form.role === Roles.STUDENT
                      ? "border border-blue-500"
                      : "border border-white/10 hover:border-white/30"
                  }
                `}
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1529070538774-1843cb3265df')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black/50 rounded-lg" />
                <p className="relative text-white text-sm font-medium text-center">
                  Student
                </p>
              </div>

              <div
                onClick={() => setForm({ ...form, role: Roles.TEACHER })}
                className={`cursor-pointer rounded-lg px-4 py-3 transition relative
                  ${
                    form.role === Roles.TEACHER
                      ? "border border-purple-500"
                      : "border border-white/10 hover:border-white/30"
                  }
                `}
                style={{
                  backgroundImage:
                    "url('https://images.unsplash.com/photo-1523240795612-9a054b0db644')",
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                }}
              >
                <div className="absolute inset-0 bg-black/50 rounded-lg" />
                <p className="relative text-white text-sm font-medium text-center">
                  Teacher
                </p>
              </div>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={submit} className="space-y-4">
            <div>
              <label className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                <User size={16} /> Full Name
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-md bg-[#0b0d12] border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-base"
                onChange={(e) => setForm({ ...form, fullname: e.target.value })}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                <Mail size={16} /> Email
              </label>
              <input
                className="w-full px-4 py-2.5 rounded-md bg-[#0b0d12] border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-base"
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-gray-400 mb-1">
                <Lock size={16} /> Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-2.5 rounded-md bg-[#0b0d12] border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-base"
                onChange={(e) => setForm({ ...form, password: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={!form.fullname || !form.email || !form.password}
              className={`w-full mt-4 py-2.5 rounded-md text-base font-medium transition-all
                ${
                  !form.fullname || !form.email || !form.password
                    ? "bg-white/10 text-gray-500 cursor-not-allowed"
                    : "bg-linear-to-r from-[#5B5FFF] to-[#7C6BFF] text-white hover:brightness-110"
                }
              `}
            >
              Create Account →
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-4">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-blue-400 hover:underline cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <footer className="relative z-10 h-10 flex items-center justify-center text-sm text-gray-500 border-t border-white/10 bg-black/30 backdrop-blur">
        © {new Date().getFullYear()} Smart School Platform
      </footer>
    </div>
  );
}
