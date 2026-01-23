"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

export default function AssignTeacherPage() {
  const router = useRouter();

  const [teachers, setTeachers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [userId, setUserId] = useState("");
  const [classIds, setClassIds] = useState([]);
  const [subjectIds, setSubjectIds] = useState([]);

  useEffect(() => {
    const load = async () => {
      const t = await api.get("/admin/all-teachers");
      const c = await api.get("/admin/classes");
      const s = await api.get("/admin/subjects");

      setTeachers(t.data?.data || t.data || []);
      setClasses(c.data?.data || c.data || []);
      setSubjects(s.data?.data || s.data || []);
    };
    load();
  }, []);

  const toggle = (id, list, setList) => {
    setList(list.includes(id) ? list.filter((x) => x !== id) : [...list, id]);
  };

  const assign = async () => {
    await api.post("/admin/assign-teacher", { userId, classIds, subjectIds });
    alert("Teacher Assigned Successfully");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      {/* Header with Back */}
      <div className="flex items-start gap-4 bg-linear-to-r from-indigo-600/20 to-purple-600/20 border border-white/10 rounded-2xl p-8">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
        >
          <ArrowLeft className="w-5 h-5 text-white" />
        </button>

        <div>
          <h1 className="text-4xl font-bold mb-1">Teacher Assignment Center</h1>
          <p className="text-gray-300">
            Map teachers to multiple classes and subjects with role-based
            control.
          </p>
        </div>
      </div>

      {/* Teacher Select */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-6">
        <label className="block text-sm text-gray-400 mb-2">
          Select Teacher
        </label>
        <select
          className="w-full p-3 bg-black/40 border border-white/10 rounded-lg"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        >
          <option value="">Choose Teacher</option>
          {teachers.map((t) => (
            <option key={t.id} value={t.id}>
              {t.fullname} — {t.email}
            </option>
          ))}
        </select>
      </div>

      {/* Class & Subject Panels */}
      <div className="grid grid-cols-2 gap-8">
        {/* Classes */}
        <div className="bg-linear-to-br from-blue-500/10 to-blue-900/20 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">Assign Classes</h2>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {classes.map((cls) => (
              <label
                key={cls.id}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${
                  classIds.includes(cls.id)
                    ? "bg-blue-600/20 border border-blue-400/40"
                    : "hover:bg-white/5"
                }`}
              >
                <input
                  type="checkbox"
                  checked={classIds.includes(cls.id)}
                  onChange={() => toggle(cls.id, classIds, setClassIds)}
                />
                <span className="font-medium">{cls.name}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Subjects */}
        <div className="bg-linear-to-br from-purple-500/10 to-purple-900/20 border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-3">Assign Subjects</h2>
          <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
            {subjects.map((sub) => (
              <label
                key={sub.id}
                className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition ${
                  subjectIds.includes(sub.id)
                    ? "bg-purple-600/20 border border-purple-400/40"
                    : "hover:bg-white/5"
                }`}
              >
                <input
                  type="checkbox"
                  checked={subjectIds.includes(sub.id)}
                  onChange={() => toggle(sub.id, subjectIds, setSubjectIds)}
                />
                <span className="font-medium">{sub.name}</span>
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <button
        onClick={assign}
        disabled={!userId || !classIds.length || !subjectIds.length}
        className="w-full py-4 text-lg font-semibold rounded-xl
                   bg-linear-to-r from-emerald-500 to-green-600
                   shadow-lg shadow-emerald-500/30
                   hover:scale-[1.02] transition
                   disabled:opacity-40 disabled:shadow-none"
      >
        Assign Teacher to Selected Classes & Subjects
      </button>
    </div>
  );
}
