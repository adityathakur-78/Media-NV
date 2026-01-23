"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { BookOpen, Users, ClipboardCheck, Save } from "lucide-react";

export default function TeacherMarksPage() {
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [students, setStudents] = useState([]);

  const [classId, setClassId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [studentProfileId, setStudentProfileId] = useState("");

  const [marks, setMarks] = useState("");
  const [remarks, setRemarks] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/teacher/marks/my-classes");
      setClasses(res.data.data.classes || []);
      setSubjects(res.data.data.subjects || []);
    };
    load();
  }, []);

  useEffect(() => {
    if (!classId) return;

    const loadStudents = async () => {
      const res = await api.get(`/teacher/marks/class/${classId}/students`);
      setStudents(res.data.data || []);
    };

    loadStudents();
  }, [classId]);

  const submitMarks = async () => {
    await api.post("/teacher/marks", {
      studentProfileId,
      subjectId,
      marks: Number(marks),
      remarks,
    });

    setMessage("Marks submitted successfully!");
    setMarks("");
    setRemarks("");
    setStudentProfileId("");
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-linear-to-r from-indigo-600/20 to-purple-600/20 border border-white/10 rounded-2xl p-8">
        <h1 className="text-3xl font-bold mb-2 flex items-center gap-2">
          <ClipboardCheck className="text-sky-400" /> Marks Entry Panel
        </h1>
        <p className="text-gray-300">
          Select class, subject, student and assign marks with remarks.
        </p>
      </div>

      {/* Selection Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Class */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <label className="text-sm text-gray-400 mb-2  flex items-center gap-2">
            <BookOpen size={16} /> Select Class
          </label>
          <select
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
            className="w-full p-3 bg-black/40 border border-white/10 rounded"
          >
            <option value="">Choose Class</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        {/* Subject */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <label className="text-sm text-gray-400 mb-2 block">
            Select Subject
          </label>
          <select
            value={subjectId}
            onChange={(e) => setSubjectId(e.target.value)}
            className="w-full p-3 bg-black/40 border border-white/10 rounded"
          >
            <option value="">Choose Subject</option>
            {subjects.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        {/* Student */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-5">
          <label className="text-sm text-gray-400 mb-2 flex items-center gap-2">
            <Users size={16} /> Select Student
          </label>
          <select
            value={studentProfileId}
            onChange={(e) => setStudentProfileId(e.target.value)}
            className="w-full p-3 bg-black/40 border border-white/10 rounded"
          >
            <option value="">Choose Student</option>
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.user.fullname} (Roll: {s.rollNo})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Marks Form */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-linear-to-br from-emerald-500/10 to-emerald-900/20 border border-white/10 rounded-xl p-6">
          <label className="block text-sm mb-2">Marks</label>
          <input
            type="number"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            className="w-full p-3 bg-black/40 border border-white/10 rounded"
            placeholder="Enter Marks (0-100)"
          />
        </div>

        <div className="bg-linear-to-br from-cyan-500/10 to-cyan-900/20 border border-white/10 rounded-xl p-6">
          <label className="block text-sm mb-2">Remarks</label>
          <textarea
            value={remarks}
            onChange={(e) => setRemarks(e.target.value)}
            className="w-full p-3 bg-black/40 border border-white/10 rounded"
            placeholder="Very Good / Needs Improvement..."
          />
        </div>
      </div>

      {/* Submit */}
      <button
        onClick={submitMarks}
        disabled={!classId || !subjectId || !studentProfileId || !marks}
        className="w-full py-4 text-lg font-semibold rounded-xl
                   bg-linear-to-r from-sky-500 to-blue-600
                   shadow-lg shadow-sky-500/30
                   hover:scale-[1.02] transition
                   disabled:opacity-40"
      >
        <Save className="inline mr-2" /> Submit Marks
      </button>

      {message && (
        <div className="text-center text-green-400 font-medium">{message}</div>
      )}
    </div>
  );
}
