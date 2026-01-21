"use client";
import ProtectedRoute from "@/components/protectedRoute";
import { Roles } from "@/enums/role";
import Sidebar from "./sidebar";
import Topbar from "./topbar";

export default function AdminLayout({ children }) {
  return (
    <ProtectedRoute allowedRoles={[Roles.ADMIN]}>
      <div className="flex h-screen bg-[#0B0F1A] text-white">
        <Sidebar />
        <div className="flex flex-col flex-1">
          <Topbar />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </ProtectedRoute>
  );
}
