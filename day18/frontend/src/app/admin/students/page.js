"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import StudentTable from "../studentTable";
import EditStudentModal from "../editStudentModal";

export default function StudentsPage() {
  const [students, setStudents] = useState([]);
  const [selected, setSelected] = useState(null);

  const loadStudents = async () => {
    const res = await api.get("/admin/all-students");
    setStudents(res.data.data);
  };

  useEffect(() => {
    loadStudents();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Students Management</h1>

      <StudentTable students={students} onEdit={setSelected} />

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
