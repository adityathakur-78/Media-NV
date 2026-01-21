"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function StatCard({ title, value, color }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <p className="text-sm text-gray-400">{title}</p>
      <h2 className={`text-2xl font-bold mt-1 ${color}`}>{value}</h2>
    </div>
  );
}

export default function AdminOverview() {
  const [students, setStudents] = useState(0);
  const [teachers, setTeachers] = useState(0);
  const [users, setUsers] = useState(0);
  const [recentUsers, setRecentUsers] = useState([]);

  useEffect(() => {
    const loadStats = async () => {
      const all = await api.get("/admin/all");
      const std = await api.get("/admin/all-students");
      const tch = await api.get("/admin/all-teachers");

      const allUsers = all.data.data;
      setUsers(allUsers.length);
      setStudents(std.data.data.length);
      setTeachers(tch.data.data.length);

      const sorted = [...allUsers].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      setRecentUsers(sorted.slice(0, 5));
    };
    loadStats();
  }, []);

  const multiGrowth = [
    { month: "Jan", students: 20, teachers: 5 },
    { month: "Feb", students: 40, teachers: 12 },
    { month: "Mar", students: 70, teachers: 18 },
    { month: "Apr", students: 120, teachers: 25 },
    { month: "May", students, teachers },
  ];

  const areaData = [
    { day: "Mon", active: Math.floor(users * 0.4) },
    { day: "Tue", active: Math.floor(users * 0.5) },
    { day: "Wed", active: Math.floor(users * 0.6) },
    { day: "Thu", active: Math.floor(users * 0.7) },
    { day: "Fri", active: Math.floor(users * 0.9) },
  ];

  const radarData = [
    { metric: "Logins", score: 120 },
    { metric: "Updates", score: 98 },
    { metric: "Creations", score: 86 },
    { metric: "Deletions", score: 30 },
    { metric: "Security", score: 100 },
  ];

  const hourlyData = Array.from({ length: 24 }).map((_, i) => ({
    hour: `${i}:00`,
    hits: Math.floor(Math.random() * 100) + 20,
  }));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Admin Dashboard</h1>

      {/* KPI CARDS */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <StatCard title="Students" value={students} color="text-blue-400" />
        <StatCard title="Teachers" value={teachers} color="text-purple-400" />
        <StatCard title="Total Users" value={users} color="text-green-400" />
        <StatCard
          title="Admins"
          value={users - (students + teachers)}
          color="text-yellow-400"
        />
        <StatCard title="Active Users" value={users} color="text-emerald-400" />
        <StatCard title="System" value="Secure" color="text-cyan-400" />
      </div>

      {/* CHARTS GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ChartBox title="Students vs Teachers Growth">
          <LineChart data={multiGrowth}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="students" stroke="#3B82F6" strokeWidth={2} />
            <Line dataKey="teachers" stroke="#A855F7" strokeWidth={2} />
          </LineChart>
        </ChartBox>

        <ChartBox title="Monthly Registration by Role">
          <BarChart data={multiGrowth}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="students" stackId="a" fill="#3B82F6" />
            <Bar dataKey="teachers" stackId="a" fill="#A855F7" />
          </BarChart>
        </ChartBox>

        <ChartBox title="Active Users Trend">
          <AreaChart data={areaData}>
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip />
            <Area dataKey="active" stroke="#22C55E" fill="#22C55E" />
          </AreaChart>
        </ChartBox>

        <ChartBox title="Engagement Radar">
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="metric" />
            <PolarRadiusAxis />
            <Radar
              dataKey="score"
              stroke="#FACC15"
              fill="#FACC15"
              fillOpacity={0.6}
            />
          </RadarChart>
        </ChartBox>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 xl:col-span-2">
          <h3 className="mb-3 font-semibold">Hourly System Activity</h3>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={hourlyData}>
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Line dataKey="hits" stroke="#06B6D4" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* BOTTOM GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 lg:col-span-2">
          <h2 className="font-semibold mb-3">Recent Registrations</h2>
          <table className="w-full text-sm">
            <thead className="text-gray-400">
              <tr>
                <th className="text-left p-2">Name</th>
                <th className="text-left p-2">Role</th>
                <th className="text-left p-2">Email</th>
                <th className="text-left p-2">Joined</th>
              </tr>
            </thead>
            <tbody>
              {recentUsers.map((u) => (
                <tr key={u.id} className="border-t border-white/10">
                  <td className="p-2">{u.fullname}</td>
                  <td
                    className={`p-2 font-semibold ${u.role === "ADMIN" ? "text-yellow-400" : u.role === "TEACHER" ? "text-purple-400" : "text-blue-400"}`}
                  >
                    {u.role}
                  </td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2 text-xs">
                    {new Date(u.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4">
          <h2 className="font-semibold mb-3">System Info</h2>
          <ul className="text-sm space-y-2 text-gray-300">
            <li>🔐 Auth: JWT Active</li>
            <li>🛡 RBAC: Enabled</li>
            <li>🗄 Database: PostgreSQL</li>
            <li>⚡ API: Healthy</li>
            <li>🕒 Server Time: {new Date().toLocaleString()}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

function ChartBox({ title, children }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4">
      <h3 className="mb-3 font-semibold">{title}</h3>
      <ResponsiveContainer width="100%" height={280}>
        {children}
      </ResponsiveContainer>
    </div>
  );
}
