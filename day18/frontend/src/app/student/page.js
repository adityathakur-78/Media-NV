"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/protectedRoute";
import { Roles } from "@/enums/role";
import { useAuth } from "@/context/authContext";
import api from "@/lib/axios";

import { Pie, Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import DoughnutLabel from "chartjs-plugin-doughnutlabel-v3";

ChartJS.register(ArcElement, Tooltip, Legend, DoughnutLabel);

export default function StudentPage() {
  const { user } = useAuth();
  const [report, setReport] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchReportCard = async () => {
      const res = await api.get("/student/report-card");
      setReport(res.data.data);
    };
    fetchReportCard();
  }, []);

  const filteredSubjects = report?.subjects?.filter((sub) =>
    sub.subjectName.toLowerCase().includes(search.toLowerCase()),
  );

  const avg =
    report?.subjects?.reduce((a, b) => a + b.marks, 0) /
    (report?.subjects?.length || 1);

  const donutData = {
    labels: ["Score", "Remaining"],
    datasets: [
      {
        data: [avg, 100 - avg],
        backgroundColor: ["#22d3ee", "#020617"],
        borderWidth: 0,
        hoverOffset: 15,
        cutout: "78%",
      },
    ],
  };

  const donutOptions = {
    plugins: {
      legend: { display: false },
      doughnutlabel: {
        labels: [
          {
            text: `${Math.round(avg)}%`,
            font: { size: 40, weight: "bold" },
            color: "#22d3ee",
          },
          {
            text: "Overall Score",
            font: { size: 14 },
            color: "#94a3b8",
          },
        ],
      },
    },
    animation: {
      duration: 2000,
      easing: "easeInOutQuart",
    },
  };

  const pieData = {
    labels: report?.subjects?.map((s) => s.subjectName),
    datasets: [
      {
        data: report?.subjects?.map((s) => s.marks),
        backgroundColor: [
          "#22d3ee",
          "#6366f1",
          "#a855f7",
          "#10b981",
          "#f59e0b",
          "#ef4444",
        ],
        borderColor: "#020617",
        borderWidth: 3,
        hoverOffset: 18,
      },
    ],
  };

  const pieOptions = {
    plugins: {
      legend: {
        position: "right",
        labels: { color: "#cbd5f5" },
      },
    },
    animation: {
      duration: 1800,
      easing: "easeOutCubic",
    },
  };

  return (
    <ProtectedRoute allowedRoles={[Roles.STUDENT]}>
      <div className="min-h-screen p-8 bg-linear-to-br from-slate-900 via-black to-slate-900 text-white">
        {/* Header */}
        <h2 className="text-4xl font-bold mb-2">
          Welcome,{" "}
          <span className="text-cyan-400">
            {user?.fullname
              ? user.fullname.charAt(0).toUpperCase() + user.fullname.slice(1)
              : "Student"}
          </span>
          👋
        </h2>
        <p className="text-gray-400 mb-10">
          Smart Academic Analytics Dashboard
        </p>

        {/* Info Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {[
            { title: "Class", value: report?.className || "Not Assigned" },
            { title: "Roll No", value: report?.rollNo || "N/A" },
            {
              title: "Status",
              value: "Active Student",
              color: "text-green-400",
            },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-white/10 backdrop-blur-xl p-6 rounded-2xl border border-white/20 
                         hover:scale-105 transition-all shadow-lg hover:shadow-cyan-500/30"
            >
              <p className="text-gray-400">{item.title}</p>
              <p className={`text-2xl mt-2 font-semibold ${item.color || ""}`}>
                {item.value}
              </p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid md:grid-cols-2 gap-10 mb-12">
          <div
            className="bg-white/5 backdrop-blur-2xl p-8 rounded-3xl 
                          border border-cyan-500/20 shadow-[0_0_40px_#22d3ee30]"
          >
            <h3 className="text-cyan-300 mb-4 font-semibold">
              🎯 Overall Performance Ring
            </h3>
            <Doughnut data={donutData} options={donutOptions} />
          </div>

          <div
            className="bg-white/5 backdrop-blur-2xl p-8 rounded-3xl 
                          border border-purple-500/20 shadow-[0_0_40px_#a855f730]"
          >
            <h3 className="text-purple-300 mb-4 font-semibold">
              📊 Subject Intelligence Map
            </h3>
            <Pie data={pieData} options={pieOptions} />
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Search subject..."
          className="mb-6 w-full md:w-1/3 px-4 py-2 rounded-lg 
                     bg-white/10 border border-white/20 
                     focus:ring-2 focus:ring-cyan-400 outline-none"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        {/* Subject List */}
        <div
          className="bg-linear-to-br from-slate-800/40 to-slate-900/60 
                backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white tracking-wide">
              Subject Performance
            </h3>
            <span className="text-sm text-slate-400">Academic Overview</span>
          </div>

          <div className="space-y-5">
            {filteredSubjects?.map((sub, i) => (
              <div
                key={i}
                className="relative p-4 rounded-xl bg-white/5 border border-white/10
                   hover:border-cyan-400/40 transition-all duration-300"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-white font-medium">
                    {sub.subjectName}
                  </span>
                  <span className="text-cyan-300 font-semibold">
                    {sub.marks}
                    <span className="text-slate-400 text-xs ml-1">/100</span>
                  </span>
                </div>

                {/* Progress Track */}
                <div className="relative h-2 rounded-full bg-slate-700 overflow-hidden">
                  <div
                    className="absolute left-0 top-0 h-full 
                       bg-linear-to-r from-cyan-400 to-blue-500
                       transition-all duration-700 ease-out"
                    style={{ width: `${sub.marks}%` }}
                  />
                </div>

                {/* Soft glow accent */}
                <div
                  className="absolute inset-x-0 bottom-0 h-px 
                        bg-linear-to-r from-transparent via-cyan-400/40 to-transparent"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Badge */}
        <div className="mt-8 flex justify-end">
          <div
            className="px-6 py-3 rounded-full bg-linear-to-r from-cyan-500 to-blue-600 
                          text-black font-semibold shadow-lg animate-pulse"
          >
            🚀 AI Analytics Mode Enabled
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
