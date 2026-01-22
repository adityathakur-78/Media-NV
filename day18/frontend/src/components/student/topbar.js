"use client";

import { useAuth } from "@/context/authContext";
import { GraduationCap } from "lucide-react";

export default function StudentTopbar() {
  const { user } = useAuth();

  return (
    <div className="relative">
      <header
        className="relative bg-linear-to-r from-[#0a0f1f] via-[#0b1228] to-[#020617]
                         border-b border-white/10 backdrop-blur-xl
                         shadow-[0_10px_30px_rgba(34,211,238,0.08)]
                         px-6 py-4 flex justify-between items-center overflow-hidden z-10"
      >
        {/* Inner Light */}
        <div
          className="pointer-events-none absolute bottom-0 left-0 w-full h-8
                     bg-linear-to-t from-white/20 via-white/10 to-transparent
                     blur-xl"
        />

        <h1 className="relative z-10 flex items-center gap-4 text-white">
          {/* Icon with glow */}
          <span className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_8px_30px_rgba(0,0,0,0.35)]">
            <span className="absolute -inset-1 rounded-2xl bg-linear-to-r from-cyan-400/30 via-purple-400/30 to-pink-400/30 blur-md"></span>
            <GraduationCap className="relative w-5 h-5 text-cyan-200 drop-shadow-md" />
          </span>

          {/* Title with gradient + shadow */}
          <span className="relative">
            <span className="text-3xl font-extrabold tracking-wide bg-linear-to-r from-cyan-100 via-purple-100 to-pink-300 bg-clip-text text-transparent drop-shadow-[0_4px_10px_rgba(0,0,0,0.4)]">
              Student Dashboard
            </span>

            {/* Underline glow */}
            <div className="h-px bg-linear-to-r from-white/80 via-gray-400/60 to-transparent mt-2 shadow-[0_0_18px_rgba(255,255,255,0.45)]" />
          </span>
        </h1>

        <div className="flex items-center gap-4 relative z-10">
          <div className="text-right leading-tight">
            <p className="font-medium text-white">
              {user?.fullname
                ? user.fullname.charAt(0).toUpperCase() + user.fullname.slice(1)
                : "Student"}
            </p>
            <span className="text-sm text-cyan-400/80 tracking-wide">
              {user?.role}
            </span>
          </div>

          <div
            className="w-10 h-10 rounded-full 
                       bg-linear-to-br from-cyan-400 to-blue-600
                       text-black font-bold flex items-center justify-center
                       shadow-[0_0_20px_rgba(34,211,238,0.6)]
                       ring-2 ring-cyan-300/40
                       transition-transform duration-300 hover:scale-105"
          >
            {user?.fullname?.charAt(0).toUpperCase() || "S"}
          </div>
        </div>
      </header>

      {/* Outer Sun Rays (outside header) */}
      <div
        className="pointer-events-none absolute top-full left-0 w-full h-20
                   bg-linear-to-b from-white/20 via-white/10 to-transparent
                   blur-2xl"
      />
    </div>
  );
}
