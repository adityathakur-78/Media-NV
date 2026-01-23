"use client";

import { GraduationCap, Users, Wifi } from "lucide-react";

export default function AppLoader() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage:
          "url('https://varthana.com/school/wp-content/uploads/2024/04/B869-School.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Dark cinematic overlay */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      {/* Light rays from top */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.15),transparent_60%)] animate-pulse" />

      {/* Crowd depth gradient */}
      <div className="absolute bottom-0 w-full h-60 bg-linear-to-t from-black via-black/80 to-transparent" />

      {/* Neon glow orbs */}
      <div className="absolute w-96 h-96 bg-purple-500/30 blur-3xl top-10 left-10 animate-pulse" />
      <div className="absolute w-96 h-96 bg-cyan-500/30 blur-3xl bottom-10 right-10 animate-pulse" />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* Rotating neon ring */}
        <div className="relative w-36 h-36 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full border-4 border-t-pink-500 border-r-blue-500 border-b-purple-500 border-l-cyan-400 animate-spin" />
          <div className="absolute w-24 h-24 bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 blur-xl opacity-80 animate-pulse" />
          <GraduationCap className="w-14 h-14 text-white animate-bounce relative" />
        </div>

        {/* Title */}
        <h1 className="text-white text-2xl tracking-[0.5em] uppercase font-bold glow">
          SMART SCHOOL
        </h1>

        {/* Status */}
        <div className="flex items-center gap-2 text-white/70 text-sm">
          <Wifi className="w-4 h-4 animate-pulse" />
          Campus Network Online
        </div>

        {/* Crowd feeling */}
        <div className="flex items-center gap-2 text-white/60 text-xs">
          <Users className="w-4 h-4" />
          Thousands of Students Connecting...
        </div>

        {/* Animated loading bar */}
        <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden">
          <div className="h-full w-1/2 bg-linear-to-r from-pink-500 via-purple-500 to-blue-500 animate-[loading_1.4s_linear_infinite]" />
        </div>

        <p className="text-white/50 text-xs tracking-widest animate-pulse">
          Booting Secure Academic Cloud...
        </p>
      </div>

      <style jsx>{`
        @keyframes loading {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(200%);
          }
        }
        .glow {
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.6);
        }
      `}</style>
    </div>
  );
}
