"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { BookOpen, Users, ClipboardList, User, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";

function StatCard({ title, value, icon: Icon }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex justify-between items-center">
      <div>
        <p className="text-sm text-white/60">{title}</p>
        <p className="text-2xl font-bold text-sky-300">{value}</p>
      </div>
      <Icon className="w-6 h-6 text-sky-300" />
    </div>
  );
}

function QuickLink({ title, path, icon: Icon }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.push(path)}
      className="bg-white/5 border border-white/10 rounded-xl p-5 flex justify-between items-center hover:bg-white/10 transition"
    >
      <div className="flex items-center gap-3">
        <Icon className="w-5 h-5 text-sky-300" />
        <span className="font-medium">{title}</span>
      </div>
      <ArrowRight className="w-4 h-4 text-white/60" />
    </button>
  );
}

export default function TeacherHomePage() {
  const [profile, setProfile] = useState(null);
  const [classes, setClasses] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const load = async () => {
      const me = await api.get("/teacher/me");
      const cls = await api.get("/teacher/marks/my-classes");
      const std = await api.get("/teacher/allStudents");

      setProfile(me.data.data);
      setClasses(cls.data.data || []);
      setStudents(std.data.data || []);
    };
    load();
  }, []);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
        <h1 className="text-2xl font-semibold">Welcome, {profile?.fullname}</h1>
        <p className="text-white/60 mt-1">
          Role: {profile?.role} | Manage your classes, students, and marks
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-5">
        <StatCard title="My Classes" value={classes.length} icon={BookOpen} />
        <StatCard title="Total Students" value={students.length} icon={Users} />
        <StatCard title="Marks Records" value="Active" icon={ClipboardList} />
        <StatCard title="My Profile" value="Updated" icon={User} />
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-lg font-semibold mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-4">
          <QuickLink
            title="View My Classes"
            path="/teacher/classes"
            icon={BookOpen}
          />
          <QuickLink
            title="Manage Students"
            path="/teacher/students"
            icon={Users}
          />
          <QuickLink
            title="Enter / Update Marks"
            path="/teacher/marks"
            icon={ClipboardList}
          />
          <QuickLink
            title="Edit My Profile"
            path="/teacher/profile"
            icon={User}
          />
        </div>
      </div>
    </div>
  );
}
