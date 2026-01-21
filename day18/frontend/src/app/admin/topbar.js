"use client";
import { Bell, ShieldCheck } from "lucide-react";
import { useAuth } from "@/context/authContext";

export default function Topbar() {
  const { user } = useAuth();

  return (
    <header className="h-16 bg-[#0F1525] border-b border-white/10 flex items-center justify-between px-6">
      <div className="flex items-center gap-3 text-green-400">
        <ShieldCheck size={18} />
        <span className="text-sm">System Secure • JWT Active</span>
      </div>

      <div className="flex items-center gap-6">
        <Bell className="text-white/70" />

        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 flex items-center justify-center font-bold">
            {user?.fullname?.[0]?.toUpperCase() || "A"}
          </div>
          <div className="text-sm">
            <p className="font-medium">{user?.fullname}</p>
            <span className="text-xs text-yellow-400">ADMIN</span>
          </div>
        </div>
      </div>
    </header>
  );
}
