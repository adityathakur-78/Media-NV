"use client";

import StudentSidebar from "@/components/student/sidebar";
import StudentTopbar from "@/components/student/topbar";

export default function StudentLayout({ children }) {
  return (
    <div className="flex h-screen bg-gray-100 overflow-hidden">
      {/* Sidebar */}
      <StudentSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <StudentTopbar />

        {/* Page Content (Scrollable) */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
