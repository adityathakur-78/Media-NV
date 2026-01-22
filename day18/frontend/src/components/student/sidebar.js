"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/authContext";
import {
  LayoutDashboard,
  User,
  FileText,
  LogOut,
  GraduationCap,
} from "lucide-react";

export default function StudentSidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  const menu = [
    { name: "Dashboard", path: "/student", icon: LayoutDashboard },
    { name: "My Profile", path: "/student/profile", icon: User },
    { name: "Report Card", path: "/student/report-card", icon: FileText },
  ];

  return (
    <aside
      className="w-64 bg-linear-to-b from-[#0a0f1f] via-[#0b1228] to-[#020617] 
                      shadow-[0_0_40px_rgba(34,211,238,0.15)] 
                      border-r border-white/10 backdrop-blur-xl
                      flex flex-col h-screen"
    >
      <div
        className="p-5 text-xl font-semibold tracking-wide text-white 
                      bg-linear-to-r from-cyan-400/20 to-blue-500/10 
                      border-b border-white/10"
      >
        <div className="flex items-center justify-center gap-2">
          <GraduationCap className="w-7 h-7 " />
          <h1 className="bg-linear-to-r from-blue-300 via-purple-400 to-cyan-300 bg-clip-text italic font-semibold text-md tracking-tight leading-tight -skew-x-3 text-transparent drop-shadow-[0_0_20px_rgba(124,107,255,0.25)]">
            Smart School Portal
          </h1>
        </div>
      </div>

      {/* Menu */}
      <nav className="mt-4 flex-1">
        {menu.map((item) => {
          const active = pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-6 py-3 relative overflow-hidden
                transition-all duration-300 ease-out
                ${
                  active
                    ? "text-cyan-300 bg-white/5 font-semibold shadow-[inset_0_0_0_1px_rgba(34,211,238,0.3)]"
                    : "text-slate-300 hover:text-white"
                }
              `}
            >
              <Icon
                size={18}
                className={`relative z-10 transition-transform duration-300 ${
                  active ? "text-cyan-300" : "text-slate-400"
                }`}
              />

              <span className="relative z-10">{item.name}</span>

              {/* Active neon rail */}
              {active && (
                <span
                  className="absolute left-0 top-0 h-full w-0.5
                                 bg-linear-to-b from-cyan-300 to-blue-500
                                 shadow-[0_0_12px_rgba(34,211,238,0.8)]"
                />
              )}

              {/* Hover glow wave */}
              <span
                className="absolute inset-0 bg-linear-to-r 
                               from-cyan-500/10 via-transparent to-blue-500/10
                               opacity-0 hover:opacity-100 transition-opacity duration-300"
              />
            </Link>
          );
        })}
      </nav>

      {/* Logout bottom */}
      <div className="p-4 border-t border-white/10">
        <button
          onClick={logout}
          className="flex items-center gap-3 w-full text-left px-6 py-3
                   rounded-xl border border-red-100/20
                   text-red-100 relative overflow-hidden
                   transition-all duration-300 ease-out
                   hover:text-red-100 hover:bg-red-500/10 hover:border-red-500/40
                   shadow-[0_0_18px_rgba(239,68,68,0.12)]"
        >
          <LogOut size={18} className="relative z-10" />
          <span className="relative z-10">Logout</span>

          <span
            className="absolute inset-0 bg-linear-to-r 
                         from-red-500/10 to-pink-500/10
                         opacity-0 hover:opacity-100 transition-opacity"
          />
        </button>
      </div>
    </aside>
  );
}
