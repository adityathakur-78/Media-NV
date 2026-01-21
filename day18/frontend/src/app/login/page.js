"use client";
import { useState } from "react";
import { useAuth } from "@/context/authContext";
import CyberCampusBackground from "@/components/CyberCampusBackground";
import { useRouter } from "next/navigation";
import {
  ShieldCheck,
  Cloud,
  Users,
  Lock,
  LayoutDashboard,
  GraduationCap,
  Mail,
  User,
} from "lucide-react";
import HexaBackground from "@/components/hexabackground";
import Link from "next/link";

export default function Login() {
  const { login } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 text-white overflow-hidden">
      {/* LEFT SIDE */}
      <div className="relative hidden md:flex flex-col justify-between px-16 py-10">
        <CyberCampusBackground />

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between text-sm text-gray-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            <span>Smart School System</span>
          </div>
          <div className="tracking-widest uppercase text-xs">
            Digital Campus v1.0
          </div>
        </div>

        {/* Center Content */}
        <div className="relative z-10 max-w-xl space-y-6">
          <h1 className=" font-bold ">
            <span className="bg-linear-to-r from-blue-300 via-purple-400 to-cyan-300 bg-clip-text italic text-6xl tracking-tight leading-tight -skew-x-3 text-transparent drop-shadow-[0_0_20px_rgba(124,107,255,0.25)]">
              Where Education
            </span>
            <br />
            <span className="text-white text-5xl">
              Evolves Into Intelligence
            </span>
          </h1>

          <p className="text-gray-400 text-lg">
            A unified digital campus where students learn, teachers guide, and
            administrators lead with clarity.
          </p>

          <div className="flex gap-10 text-sm text-gray-400 mt-6">
            <div>
              <p className="text-xl text-white">Learn</p>
              <p>Smart Classes</p>
            </div>
            <div>
              <p className="text-xl text-white">Teach</p>
              <p>Live Control</p>
            </div>
            <div>
              <p className="text-xl text-white">Lead</p>
              <p>Admin Power</p>
            </div>
            <div>
              <p className="text-xl text-white">Secure</p>
              <p>Role System</p>
            </div>
          </div>

          <p className="text-sm text-gray-500 italic mt-6">
            “From classrooms to control rooms — one intelligent system.”
          </p>
        </div>

        {/* Footer */}
        <div className="relative z-10 flex items-center justify-between text-xs text-gray-500">
          <span>© 2026 Smart School Platform</span>
          <span className="tracking-widest">LEARN • TEACH • LEAD</span>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="relative flex items-center justify-center bg-[#0a0c12]">
        <HexaBackground />
        <div className="relative z-10 w-full max-w-md min-h-150 flex flex-col justify-between rounded-2xl bg-[#12141a]/80 backdrop-blur-xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)] p-8">
          {/* Header */}
          <div className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              <GraduationCap className="w-7 h-7 text-blue-400" />
              <h1 className="bg-linear-to-r from-blue-300 via-purple-400 to-cyan-300 bg-clip-text italic font-semibold text-3xl tracking-tight leading-tight -skew-x-3 text-transparent drop-shadow-[0_0_20px_rgba(124,107,255,0.25)]">
                <Link href="/">Smart School Portal</Link>
              </h1>
            </div>
            <p className="text-xs text-green-400 flex items-center justify-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Secure Channel Active
            </p>
          </div>

          {/* Status Icons */}
          <div className="flex justify-around text-xs text-gray-400 mt-4">
            <div className="flex flex-col items-center">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              Secure
            </div>
            <div className="flex flex-col items-center">
              <Cloud className="w-5 h-5 text-purple-400" />
              Synced
            </div>
            <div className="flex flex-col items-center">
              <Users className="w-5 h-5 text-cyan-400" />
              Roles
            </div>
          </div>

          {/* Progress */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-gray-400">
              <span className="text-blue-400 flex items-center gap-1">
                <Lock size={12} /> Auth
              </span>
              <span className=" flex items-center gap-1">
                <User size={12} /> Profile
              </span>
              <span className="flex items-center gap-1">
                <LayoutDashboard size={12} /> Dashboard
              </span>
            </div>
            <div className="h-px bg-linear-to-r from-blue-500/50 via-purple-500/50 to-transparent mt-2" />
          </div>

          {/* Form */}
          <form onSubmit={submit} className="space-y-4 mt-6">
            <div>
              <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                {" "}
                <Mail size={16} /> Email
              </label>
              <input
                className="w-full px-3 py-2.5 rounded-md bg-[#0b0d12] border border-white/10 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm text-gray-400 mb-2">
                <Lock size={16} /> Password
              </label>
              <input
                type="password"
                className="w-full px-3 py-2.5 rounded-md bg-[#0b0d12] border border-white/10 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 outline-none"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              disabled={!email || !password}
              className={`w-full mt-3 py-2.5 rounded-md font-medium transition-all duration-300
                ${
                  !email || !password
                    ? "bg-white/10 text-gray-500 cursor-not-allowed"
                    : "bg-linear-to-r from-[#5B5FFF] to-[#7C6BFF] text-white hover:shadow-[0_0_20px_rgba(124,107,255,0.6)] hover:brightness-110"
                }
             `}
            >
              Enter Digital Campus →
            </button>
          </form>

          {/* Footer */}
          <div className="text-center text-xs text-gray-400 mt-6">
            <p className="italic mb-2">“Consistency builds champions.”</p>
            <p>
              Don’t have an account?{" "}
              <span
                onClick={() => router.push("/signup")}
                className="text-blue-400 hover:underline cursor-pointer"
              >
                Create one
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
