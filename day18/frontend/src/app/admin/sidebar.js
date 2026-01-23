"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  UserPlus,
  BarChart3,
  Shield,
  Settings,
  LogOut,
  User2Icon,
} from "lucide-react";
import { useAuth } from "@/context/authContext";

const menu = [
  { name: "Overview", icon: LayoutDashboard, path: "/admin" },
  { name: "Students", icon: Users, path: "/admin/students" },
  { name: "Teachers", icon: GraduationCap, path: "/admin/teachers" },
  { name: "Create User", icon: UserPlus, path: "/admin/create-user" },
  { name: "Analytics", icon: BarChart3, path: "/admin/analytics" },
  {
    name: "Roles & Permissions",
    icon: Shield,
    path: "/admin/roles",
  },
  { name: "Academics", icon: Shield, path: "/admin/academics" },
  //   { name: "Settings", icon: Settings, path: "/admin/settings" },
  { name: "All Users", icon: User2Icon, path: "/admin/all-users" },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { logout } = useAuth();

  return (
    <aside className="w-64 bg-[#0F1525] border-r border-white/10 flex flex-col">
      <div className="p-6 text-xl font-bold tracking-wider text-blue-400">
        Smart School
      </div>

      <nav className="flex-1 px-4 space-y-2">
        {menu.map((item) => {
          const Icon = item.icon;
          const active = pathname === item.path;

          return (
            <Link
              key={item.name}
              href={item.path}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition
                ${active ? "bg-blue-500/20 text-blue-400" : "hover:bg-white/5"}`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      <button
        onClick={logout}
        className="m-4 flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-red-500/10"
      >
        <LogOut size={18} />
        Logout
      </button>
    </aside>
  );
}
