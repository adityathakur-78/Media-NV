"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import api from "@/lib/axios";
import { Pencil } from "lucide-react";

export default function ClassStudentsPage() {
  const { classId } = useParams();
  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState("");
  const [selectedStudent, setSelectedStudent] = useState(null);

  const loadStudents = async () => {
    const res = await api.get(`/teacher/marks/class/${classId}/students`);
    setStudents(res.data.data || []);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const giveMarks = async () => {
    await api.post("/teacher/marks", {
      studentId: selectedStudent.user.id,
      marks: Number(marks),
    });
    setSelectedStudent(null);
    setMarks("");
    loadStudents();
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Class Students & Marks</h1>

      <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-white/10">
            <tr>
              <th className="p-3 text-left">Roll</th>
              <th className="p-3 text-left">Student</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Marks</th>
              <th className="p-3 text-left">Action</th>
            </tr>
          </thead>
          <tbody>
            {students.map((s) => (
              <tr key={s.id} className="border-t border-white/10">
                <td className="p-3">{s.rollNo}</td>
                <td className="p-3 font-medium">{s.user.fullname}</td>
                <td className="p-3 text-gray-400">{s.user.email}</td>
                <td className="p-3">
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      s.user.isActive
                        ? "bg-green-500/20 text-green-400"
                        : "bg-red-500/20 text-red-400"
                    }`}
                  >
                    {s.user.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-3">{s.marks ?? "-"}</td>
                <td className="p-3">
                  <button
                    onClick={() => setSelectedStudent(s)}
                    className="text-sky-400 flex items-center gap-1"
                  >
                    <Pencil className="w-4 h-4" /> Enter / Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Marks Modal */}
      {selectedStudent && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
          <div className="bg-[#021a27] border border-white/20 rounded-xl p-6 w-96">
            <h3 className="text-lg mb-1">{selectedStudent.user.fullname}</h3>
            <p className="text-sm text-gray-400 mb-3">
              Roll No: {selectedStudent.rollNo}
            </p>

            <input
              type="number"
              value={marks}
              onChange={(e) => setMarks(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 mb-4"
              placeholder="Enter Marks"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setSelectedStudent(null)}
                className="text-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={giveMarks}
                className="bg-sky-600 px-4 py-2 rounded text-white"
              >
                Save Marks
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
