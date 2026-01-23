"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function AssignStudentPage() {
  const router = useRouter();

  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);

  const [userId, setUserId] = useState("");
  const [classId, setClassId] = useState("");
  const [rollNo, setRollNo] = useState("");

  useEffect(() => {
    const load = async () => {
      const s = await api.get("/admin/all-students");
      const c = await api.get("/admin/classes");
      const t = await api.get("/admin/all-teachers");

      setStudents(s.data?.data || s.data || []);
      setClasses(c.data?.data || c.data || []);
      setTeachers(t.data?.data || t.data || []);
    };
    load();
  }, []);

  const assign = async () => {
    await api.post("/admin/assign-student", {
      userId,
      classId,
      rollNo: Number(rollNo),
    });
    alert("Student Assigned Successfully");
  };

  const selectedClassTeacher = teachers.find((t) =>
    t.classes?.some((c) => c.id === classId),
  );

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Header with Back */}
      <div className="flex items-start gap-4 bg-linear-to-r from-cyan-600/20 to-blue-600/20 border border-white/10 rounded-2xl p-8">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <div>
          <h1 className="text-4xl font-bold mb-1">Student Enrollment Center</h1>
          <p className="text-gray-300">
            Assign students to classes with roll numbers and teacher mapping.
          </p>
        </div>
      </div>

      {/* Student Selector */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <label className="block text-sm text-gray-400 mb-2">
          Select Student
        </label>
        <select
          className="w-full p-3 bg-black/40 border border-white/10 rounded-lg"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="">Choose Student</option>
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.fullname} — {s.email}
            </option>
          ))}
        </select>
      </div>

      {/* Class + Roll */}
      <div className="grid grid-cols-2 gap-8">
        <div className="bg-linear-to-br from-indigo-500/10 to-indigo-900/20 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">Select Class</h2>
          <select
            className="w-full p-3 bg-black/40 border border-white/10 rounded-lg"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
          >
            <option value="">Choose Class</option>
            {classes.map((cls) => (
              <option key={cls.id} value={cls.id}>
                {cls.name}
              </option>
            ))}
          </select>

          {selectedClassTeacher && (
            <p className="mt-3 text-sm text-gray-300">
              Class Teacher:{" "}
              <span className="font-semibold">
                {selectedClassTeacher.fullname}
              </span>
            </p>
          )}
        </div>

        <div className="bg-linear-to-br from-emerald-500/10 to-emerald-900/20 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">Assign Roll Number</h2>
          <input
            type="number"
            placeholder="Enter Roll No"
            className="w-full p-3 bg-black/40 border border-white/10 rounded-lg"
            value={rollNo}
            onChange={(e) => setRollNo(e.target.value)}
          />
        </div>
      </div>

      {/* Action */}
      <button
        onClick={assign}
        disabled={!userId || !classId || !rollNo}
        className="w-full py-4 text-lg font-semibold rounded-xl
                   bg-linear-to-r from-cyan-500 to-blue-600
                   shadow-lg shadow-cyan-500/30
                   hover:scale-[1.02] transition
                   disabled:opacity-40"
      >
        Enroll Student into Class
      </button>
    </div>
  );
}
