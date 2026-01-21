import React from "react";
import Link from "next/link";
import { GraduationCap } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="relative z-20 mt-6 w-[92%] max-w-7xl mx-auto rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_0_40px_rgba(255,255,255,0.08)]">
      <div className="flex items-center justify-between px-6 py-3 text-sm">
        <div className="flex items-center gap-6 text-gray-300">
          <div className="flex items-center justify-center gap-2">
            <GraduationCap className="w-7 h-7 " />
            <h1 className="bg-linear-to-r from-blue-300 via-purple-400 to-cyan-300 bg-clip-text italic font-semibold text-md tracking-tight leading-tight -skew-x-3 text-transparent drop-shadow-[0_0_20px_rgba(124,107,255,0.25)]">
              <Link href="/">Smart School Portal</Link>
            </h1>
          </div>
          <Link href="/about">About us</Link>
          <Link href="/gallery">Gallery</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/admissions">Admissions</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/signup" className="text-gray-300 hover:text-white">
            Sign in
          </Link>
          <Link
            href="/login"
            className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20"
          >
            Start Journey
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
