"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "@/components/protectedRoute";
import { Roles } from "@/enums/role";
import api from "@/lib/axios";

export default function ReportCardPage() {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      const res = await api.get("/student/report-card");
      setReport(res.data.data);
      setLoading(false);
    };
    fetchReport();
  }, []);

  if (loading) return <p className="p-6 text-white">Loading report card...</p>;

  const totalMarks = report.subjects.reduce((sum, s) => sum + s.marks, 0);
  const maxMarks = report.subjects.length * 100;
  const percentage = ((totalMarks / maxMarks) * 100).toFixed(2);
  const result = percentage >= 35 ? "PASS" : "FAIL";

  return (
    <ProtectedRoute allowedRoles={[Roles.STUDENT]}>
      <div className="min-h-screen p-10 bg-linear-to-br from-[#0f172a] via-[#111827] to-[#020617]">
        {/* Centered Report Card */}
        <div className="flex justify-center">
          <div
            className="p-6 rounded-2xl bg-linear-to-br from-gray-400/20 via-gray-300/10 to-white/5
                          shadow-[0_0_80px_rgba(255,255,255,0.15)]"
          >
            {/* Report Paper */}
            <div
              id="report-card"
              style={{ background: "#f3f4f6" }}
              className="w-225 p-10 shadow-2xl border border-gray-400 relative"
            >
              {/* Watermark */}
              <div
                className="absolute inset-0 flex items-center justify-center text-gray-400 
                              text-7xl font-bold opacity-10 rotate-[-20deg] pointer-events-none"
              >
                SMART SCHOOL
              </div>

              {/* Header */}
              <div className="text-center border-b pb-4 mb-6 relative z-10">
                <h1 className="text-3xl font-bold tracking-wide">
                  SMART SCHOOL
                </h1>
                <p className="text-sm text-gray-700">
                  Affiliated to Central Board of Secondary Education (CBSE)
                </p>
                <p className="text-xs text-gray-600">
                  MG Road, Bengaluru - 560001 | Phone: +91 98765 43210
                </p>
                <h2 className="mt-3 text-xl font-semibold underline">
                  ANNUAL REPORT CARD
                </h2>
              </div>

              {/* Student Info */}
              <div className="grid grid-cols-2 gap-4 mb-6 text-sm relative z-10">
                <p>
                  <strong>Student Name:</strong>{" "}
                  {report.studentName || "Student"}
                </p>
                <p>
                  <strong>Class & Section:</strong> {report.className}
                </p>
                <p>
                  <strong>Roll Number:</strong> {report.rollNo}
                </p>
                <p>
                  <strong>Academic Year:</strong> 2025 - 2026
                </p>
              </div>

              {/* Table */}
              <table className="w-full border-collapse border text-sm mb-6 relative z-10">
                <thead>
                  <tr className="bg-gray-300">
                    <th className="border p-2">Subject</th>
                    <th className="border p-2">Marks</th>
                    <th className="border p-2">Grade</th>
                    <th className="border p-2">Teacher</th>
                    <th className="border p-2">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {report.subjects.map((item, index) => (
                    <tr key={item.subjectId || index}>
                      <td className="border p-2">{item.subjectName}</td>
                      <td className="border p-2 text-center">{item.marks}</td>
                      <td className="border p-2 text-center font-semibold">
                        {item.grade}
                      </td>
                      <td className="border p-2">{item.teacherName}</td>
                      <td className="border p-2">{item.remarks}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Result */}
              <div className="grid grid-cols-3 gap-4 text-sm mb-12 relative z-10">
                <p>
                  <strong>Total:</strong> {totalMarks}/{maxMarks}
                </p>
                <p>
                  <strong>Percentage:</strong> {percentage}%
                </p>
                <p>
                  <strong>Result:</strong>{" "}
                  <span
                    className={
                      result === "PASS" ? "text-green-700" : "text-red-700"
                    }
                  >
                    {result}
                  </span>
                </p>
              </div>

              {/* Signatures */}
              <div className="flex justify-between items-end mt-20 relative z-10">
                <div className="text-center">
                  <div className="text-3xl italic text-gray-700 font-[cursive]">
                    A. Sharma
                  </div>
                  <div className="h-px bg-gray-600 w-48 mt-1"></div>
                  <p className="text-sm mt-1">Class Teacher</p>
                </div>

                <div className="text-center">
                  <div className="text-3xl italic text-gray-700 font-[cursive]">
                    R. K. Verma
                  </div>
                  <div className="h-px bg-gray-600 w-48 mt-1"></div>
                  <p className="text-sm mt-1">Principal</p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-10 border-t pt-4 text-center text-xs text-gray-600 relative z-10">
                Digitally generated and authenticated by Smart School ERP System
              </div>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
