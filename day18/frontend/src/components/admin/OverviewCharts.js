"use client";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function OverviewCharts({ roleData, growthData }) {
  const colors = ["#3B82F6", "#8B5CF6", "#FACC15"]; // Student, Teacher, Admin

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
        <h3 className="mb-4 font-semibold">Monthly User Growth</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={growthData}>
            <Line
              type="monotone"
              dataKey="users"
              stroke="#3B82F6"
              strokeWidth={2}
            />
            <Tooltip />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="bg-white/5 p-4 rounded-xl border border-white/10">
        <h3 className="mb-4 font-semibold">Role Distribution</h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={roleData}
              dataKey="value"
              innerRadius={60}
              outerRadius={90}
            >
              {roleData.map((_, i) => (
                <Cell key={i} fill={colors[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
