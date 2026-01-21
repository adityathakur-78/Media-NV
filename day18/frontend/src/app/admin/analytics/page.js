"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function AnalyticsPage() {
  const [students, setStudents] = useState(0);
  const [teachers, setTeachers] = useState(0);
  const [users, setUsers] = useState(0);

  useEffect(() => {
    const load = async () => {
      const all = await api.get("/admin/all");
      const std = await api.get("/admin/all-students");
      const tch = await api.get("/admin/all-teachers");

      setUsers(all.data.data.length);
      setStudents(std.data.data.length);
      setTeachers(tch.data.data.length);
    };
    load();
  }, []);

  const roleData = [
    { name: "Students", count: students },
    { name: "Teachers", count: teachers },
  ];

  const growthData = [
    { month: "Jan", users: Math.floor(users * 0.2) },
    { month: "Feb", users: Math.floor(users * 0.4) },
    { month: "Mar", users: Math.floor(users * 0.6) },
    { month: "Apr", users: Math.floor(users * 0.8) },
    { month: "May", users: users },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">System Analytics</h1>

      {/* KPI */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Kpi title="Total Users" value={users} color="text-green-400" />
        <Kpi title="Students" value={students} color="text-blue-400" />
        <Kpi title="Teachers" value={teachers} color="text-purple-400" />
        <Kpi title="Security" value="JWT Active" color="text-yellow-400" />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <h3 className="mb-4 font-semibold">Students vs Teachers</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={roleData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white/5 p-4 rounded-xl border border-white/10">
          <h3 className="mb-4 font-semibold">User Growth</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={growthData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="users" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Activity Heatmap (waiting for backend logs API) */}
      <div className="mt-6 bg-white/5 p-6 rounded-xl border border-white/10">
        <h3 className="mb-3 font-semibold">Activity Heatmap</h3>
        <p className="text-sm text-gray-400">
          Will become real after adding login/activity logs API
        </p>
        <div className="grid grid-cols-12 gap-2 mt-4">
          {[...Array(60)].map((_, i) => (
            <div key={i} className="w-4 h-4 rounded bg-green-500/30" />
          ))}
        </div>
      </div>
    </div>
  );
}

function Kpi({ title, value, color }) {
  return (
    <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <h2 className={`text-2xl font-bold mt-1 ${color}`}>{value}</h2>
    </div>
  );
}
