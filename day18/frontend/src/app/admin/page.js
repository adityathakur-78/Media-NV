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

// Build monthly growth from real createdAt
function buildMonthlyGrowth(users) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const map = {};

  users.forEach((u) => {
    if (!u.createdAt) return;
    const d = new Date(u.createdAt);
    const key = months[d.getMonth()];

    if (!map[key]) map[key] = { month: key, students: 0, teachers: 0 };

    if (u.role === "STUDENT") map[key].students++;
    if (u.role === "TEACHER") map[key].teachers++;
  });

  return Object.values(map);
}

export default function AdminOverview() {
  const [students, setStudents] = useState(0);
  const [teachers, setTeachers] = useState(0);
  const [users, setUsers] = useState(0);
  const [recentUsers, setRecentUsers] = useState([]);
  const [monthlyGrowth, setMonthlyGrowth] = useState([]);
  const [activeTrend, setActiveTrend] = useState([]);

  useEffect(() => {
    const loadStats = async () => {
      const all = await api.get("/admin/all");
      const std = await api.get("/admin/all-students");
      const tch = await api.get("/admin/all-teachers");

      const allUsers = all.data.data;

      setUsers(allUsers.length);
      setStudents(std.data.data.length);
      setTeachers(tch.data.data.length);

      // Monthly growth
      setMonthlyGrowth(buildMonthlyGrowth(allUsers));

      // Active vs Inactive
      setActiveTrend([
        { label: "Active", count: allUsers.filter((u) => u.isActive).length },
        {
          label: "Inactive",
          count: allUsers.filter((u) => !u.isActive).length,
        },
      ]);

      // Recent users
      const sorted = [...allUsers].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
      );
      setRecentUsers(sorted.slice(0, 5));
    };

    loadStats();
  }, []);

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
        <StatCard
          title="Active Users"
          value={activeTrend.find((x) => x.label === "Active")?.count || 0}
          color="text-emerald-400"
        />
        <StatCard title="System" value="Secure" color="text-cyan-400" />
      </div>

      {/* CHARTS */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <ChartBox title="Students vs Teachers Monthly Growth">
          <LineChart data={monthlyGrowth}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line dataKey="students" stroke="#3B82F6" strokeWidth={2} />
            <Line dataKey="teachers" stroke="#A855F7" strokeWidth={2} />
          </LineChart>
        </ChartBox>

        <ChartBox title="Monthly Registrations by Role">
          <BarChart data={monthlyGrowth}>
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="students" stackId="a" fill="#3B82F6" />
            <Bar dataKey="teachers" stackId="a" fill="#A855F7" />
          </BarChart>
        </ChartBox>

        <ChartBox title="Active vs Inactive Users">
          <AreaChart
            data={activeTrend.map((x) => ({ name: x.label, value: x.count }))}
          >
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Area dataKey="value" stroke="#22C55E" fill="#22C55E" />
          </AreaChart>
        </ChartBox>
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
                    className={`p-2 font-semibold ${
                      u.role === "ADMIN"
                        ? "text-yellow-400"
                        : u.role === "TEACHER"
                          ? "text-purple-400"
                          : "text-blue-400"
                    }`}
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
