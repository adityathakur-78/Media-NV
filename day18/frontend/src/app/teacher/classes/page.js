"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import Link from "next/link";
import {
  BookOpen,
  Users,
  Layers,
  GraduationCap,
  BarChart3,
} from "lucide-react";

export default function MyClassesPage() {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/teacher/marks/my-classes");
      const data = res.data.data;

      setClasses(data.classes || []);
      setSubjects(data.subjects || []);
    };
    load();
  }, []);

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl p-6">
        <div>
          <h1 className="text-2xl font-semibold">Teaching Workspace</h1>
          <p className="text-gray-400 text-sm">
            Manage your classes, subjects, students and marks
          </p>
        </div>

        <div className="flex gap-6">
          <StatBox icon={BookOpen} label="Classes" value={classes.length} />
          <StatBox icon={Layers} label="Subjects" value={subjects.length} />
        </div>
      </div>

      {/* Subjects Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Layers className="w-5 h-5 text-purple-400" />
          Subjects You Teach
        </h2>

        <div className="grid grid-cols-4 gap-4">
          {subjects.map((sub) => (
            <div
              key={sub.id}
              className="bg-purple-600/10 border border-purple-400/20 rounded-xl p-4 hover:bg-purple-600/20 transition"
            >
              <div className="flex items-center gap-3 mb-2">
                <GraduationCap className="w-5 h-5 text-purple-300" />
                <h3 className="font-medium">{sub.name}</h3>
              </div>
              <p className="text-xs text-gray-400">Active Subject</p>
            </div>
          ))}
        </div>
      </div>

      {/* Classes Grid */}
      <div>
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-sky-400" />
          My Classes
        </h2>

        <div className="grid grid-cols-3 gap-6">
          {classes.map((cls) => (
            <Link
              key={cls.id}
              href={`/teacher/classes/${cls.id}`}
              className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/10 transition shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-sky-500/20 flex items-center justify-center">
                    <BookOpen className="text-sky-400 w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-semibold">{cls.name}</h3>
                </div>
                <BarChart3 className="w-5 h-5 text-white/50" />
              </div>

              <div className="space-y-2 text-sm text-gray-300">
                <p className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-sky-400" />
                  Students & Marks
                </p>
                <p className="text-xs text-gray-500">
                  Click to manage marks, attendance and performance
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* Small Stat Box */
function StatBox({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center gap-3 bg-black/30 px-4 py-2 rounded-lg border border-white/10">
      <Icon className="w-5 h-5 text-sky-400" />
      <div>
        <p className="text-xs text-gray-400">{label}</p>
        <p className="text-lg font-semibold">{value}</p>
      </div>
    </div>
  );
}
