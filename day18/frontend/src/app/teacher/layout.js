"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  BookOpen,
  Users,
  ClipboardList,
  User,
  LogOut,
  Bell,
  GraduationCap,
} from "lucide-react";
import { useAuth } from "@/context/authContext";

export default function TeacherLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logout, user } = useAuth();

  const menu = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/teacher/dashboard" },
    { name: "My Classes", icon: BookOpen, path: "/teacher/classes" },
    { name: "Students", icon: Users, path: "/teacher/students" },
    { name: "Marks", icon: ClipboardList, path: "/teacher/marks" },
    { name: "Profile", icon: User, path: "/teacher/profile" },
  ];

  const handleLogout = () => {
    logout(); // clear token & context
    router.push("/login"); // redirect to login
  };

  return (
    <div className="flex min-h-screen bg-[#021a27] text-white">
      {/* Sidebar */}
      <aside className="w-64 bg-white/5 border-r border-white/10 p-5 flex flex-col">
        <div className="flex items-center mb-7 justify-center gap-2">
          <GraduationCap className="w-7 h-7 text-blue-400" />
          <h1 className="bg-linear-to-r from-blue-300 via-purple-400 to-cyan-300 bg-clip-text italic font-semibold text-xl tracking-tight leading-tight -skew-x-3 text-transparent drop-shadow-[0_0_20px_rgba(124,107,255,0.25)]">
            <Link href="">Smart School Portal</Link>
          </h1>
        </div>

        <nav className="space-y-2 flex-1">
          {menu.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition
                ${pathname === item.path ? "bg-sky-600" : "hover:bg-white/10"}`}
            >
              <item.icon className="w-4 h-4" />
              {item.name}
            </Link>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="mt-6 flex items-center gap-2 text-red-400 hover:text-red-300 transition"
        >
          <LogOut className="w-4 h-4" /> Logout
        </button>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="h-16 bg-white/5 border-b border-white/10 flex items-center justify-between px-6">
          <h1
            className="inline-flex items-center gap-3 px-4 py-2 rounded-xl 
               bg-white/10 border border-white/20 backdrop-blur
               text-white text-lg font-semibold tracking-wide shadow-sm"
          >
            <span className="w-4 h-4 rounded-full bg-emerald-400 animate-pulse" />
            Teacher Management System
          </h1>

          <div className="flex items-center gap-4">
            <Bell className="w-5 h-5 text-white/70" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-sky-500/30 flex items-center justify-center">
                <User className="w-4 h-4 text-sky-300" />
              </div>
              <span className="text-sm">{user?.role}</span>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
