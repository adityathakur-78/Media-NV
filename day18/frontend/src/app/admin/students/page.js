"use client";
import { useEffect, useState, useMemo } from "react";
import api from "@/lib/axios";
import StudentTable from "../studentTable";
import EditStudentModal from "../editStudentModal";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);

  const [sortOrder, setSortOrder] = useState("DESC"); // Newest first
  const [gender, setGender] = useState("ALL");

  const loadStudents = async () => {
    const res = await api.get("/admin/all-students");
    setStudents(res.data.data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const filteredAndSorted = useMemo(() => {
    let data = [...students];

    // Gender filter
    if (gender !== "ALL") {
      data = data.filter((s) => s.gender === gender);
    }

    // Date sort
    data.sort((a, b) => {
      const da = new Date(a.createdAt).getTime();
      const db = new Date(b.createdAt).getTime();
      return sortOrder === "ASC" ? da - db : db - da;
    });

    return data;
  }, [students, sortOrder, gender]);

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "ASC" ? "DESC" : "ASC"));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Students Management</h1>

        <div className="flex gap-3 items-center">
          <select
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className="p-2 bg-black/40 border border-white/10 rounded"
          >
            <option value="ALL">All Genders</option>
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>

          <button
            onClick={toggleSort}
            className="px-3 py-2 bg-white/10 border border-white/20 rounded text-sm"
          >
            Created Date {sortOrder === "ASC" ? "↑ Oldest" : "↓ Newest"}
          </button>
        </div>
      </div>

      <StudentTable students={filteredAndSorted} onEdit={setSelected} />

      {selected && (
        <EditStudentModal
          student={selected}
          onClose={() => setSelected(null)}
          onUpdated={loadStudents}
        />
      )}
    </div>
  );
}
