"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import {
  Users,
  BookOpen,
  GraduationCap,
  TrendingUp,
  ChevronDown,
  User,
  ClipboardList,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function StatBox({ title, value, icon: Icon, items = [] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative bg-white/5 border border-white/10 rounded-xl p-5">
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-between items-center cursor-pointer"
      >
        <div>
          <p className="text-white/60 text-sm">{title}</p>
          <p className="text-2xl font-bold text-sky-300">{value}</p>
        </div>
        <div className="flex items-center gap-2">
          <Icon className="w-6 h-6 text-sky-300" />
          <ChevronDown
            className={`w-4 h-4 transition ${open ? "rotate-180" : ""}`}
          />
        </div>
      </div>

      {open && (
        <div className="absolute left-0 right-0 mt-3 bg-[#021a27] border border-white/10 rounded-xl z-20 max-h-48 overflow-y-auto">
          {items.map((item, i) => (
            <div
              key={i}
              className="px-4 py-2 text-sm text-white/80 border-b border-white/10 last:border-none"
            >
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function TeacherDashboard() {
  const [profile, setProfile] = useState(null);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const load = async () => {
      const me = await api.get("/teacher/me");
      const cls = await api.get("/teacher/marks/my-classes");
      const std = await api.get("/teacher/allStudents");

      setProfile(me.data.data);

      const classData = cls.data?.data?.classes || [];
      const subjectData = cls.data?.data?.subjects || [];
      setSubjects(subjectData);
      setStudents(std.data?.data || []);

      const classWithCounts = await Promise.all(
        classData.map(async (c) => {
          const res = await api.get(`/teacher/marks/class/${c.id}/students`);
          return {
            ...c,
            studentCount: res.data?.data?.length || 0,
          };
        }),
      );

      setClasses(classWithCounts);
    };

    load();
  }, []);

  const chartData = classes.map((c) => ({
    name: c.name,
    students: c.studentCount,
  }));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center bg-white/5 border border-white/10 rounded-xl p-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-sky-600/20 rounded-full flex items-center justify-center">
            <User className="text-sky-400" />
          </div>
          <div>
            <h1 className="text-xl font-semibold">
              Welcome, {profile?.fullname}
            </h1>
            <p className="text-sm text-gray-400">
              Role: TEACHER | Academic Panel
            </p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="bg-sky-600 px-4 py-2 rounded text-white flex items-center gap-2">
            <BookOpen size={16} /> My Classes
          </button>
          <button className="bg-emerald-600 px-4 py-2 rounded text-white flex items-center gap-2">
            <ClipboardList size={16} /> Give Marks
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-5">
        <StatBox
          title="Classes"
          value={classes.length}
          icon={BookOpen}
          items={classes.map((c) => `${c.name} (${c.studentCount})`)}
        />
        <StatBox
          title="Students"
          value={students.length}
          icon={Users}
          items={students.map((s) => s.fullname)}
        />
        <StatBox
          title="Subjects"
          value={subjects.length}
          icon={GraduationCap}
          items={subjects.map((s) => s.name)}
        />
        <StatBox
          title="Status"
          value="Active"
          icon={TrendingUp}
          items={["Account Active", "All Permissions Granted"]}
        />
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Chart */}
        <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-5">
          <h3 className="mb-3 font-semibold">Students per Class</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="students" fill="#38bdf8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold mb-2">Subjects</h3>
            {subjects.map((s) => (
              <div key={s.id} className="text-sm text-gray-300 py-1">
                • {s.name}
              </div>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold mb-2">Classes</h3>
            {classes.map((c) => (
              <div key={c.id} className="flex justify-between text-sm py-1">
                <span>{c.name}</span>
                <span className="text-sky-400">{c.studentCount} students</span>
              </div>
            ))}
          </div>

          <div className="bg-white/5 border border-white/10 rounded-xl p-4">
            <h3 className="font-semibold mb-2">Recent Students</h3>
            {students.slice(0, 5).map((s) => (
              <div key={s.id} className="text-sm text-gray-300 py-1">
                {s.fullname}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
