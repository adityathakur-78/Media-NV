"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import TeacherTable from "../teacherTable";
import EditTeacherModal from "../editTeacherModal";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [selected, setSelected] = useState(null);

  const loadTeachers = async () => {
    const res = await api.get("/admin/all-teachers");
    setTeachers(res.data.data);
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Teachers Management</h1>

      <TeacherTable teachers={teachers} onEdit={setSelected} />

      {selected && (
        <EditTeacherModal
          teacher={selected}
          onClose={() => setSelected(null)}
          onUpdated={loadTeachers}
        />
      )}
    </div>
  );
}
