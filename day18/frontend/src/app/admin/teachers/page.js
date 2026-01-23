"use client";
import { useEffect, useState, useMemo } from "react";
import api from "@/lib/axios";
import TeacherTable from "../teacherTable";
import EditTeacherModal from "../editTeacherModal";

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([]);
  const [selected, setSelected] = useState(null);

  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("ALL");
  const [date, setDate] = useState("");
  const [sortOrder, setSortOrder] = useState("DESC"); // DESC by default

  const [page, setPage] = useState(1);
  const pageSize = 6;

  const loadTeachers = async () => {
    const res = await api.get("/admin/all-teachers");
    setTeachers(res.data.data);
  };

  useEffect(() => {
    loadTeachers();
  }, []);

  const filteredAndSorted = useMemo(() => {
    let data = teachers.filter((t) => {
      const matchSearch =
        t.fullname.toLowerCase().includes(search.toLowerCase()) ||
        t.email?.toLowerCase().includes(search.toLowerCase());

      const matchGender = gender === "ALL" || t.gender === gender;

      const matchDate = date
        ? new Date(t.createdAt).toISOString().split("T")[0] === date
        : true;

      return matchSearch && matchGender && matchDate;
    });

    data.sort((a, b) => {
      const da = new Date(a.createdAt).getTime();
      const db = new Date(b.createdAt).getTime();
      return sortOrder === "ASC" ? da - db : db - da;
    });

    return data;
  }, [teachers, search, gender, date, sortOrder]);

  const totalPages = Math.ceil(filteredAndSorted.length / pageSize);
  const paginated = filteredAndSorted.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const toggleSort = () => {
    setSortOrder((prev) => (prev === "ASC" ? "DESC" : "ASC"));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Teachers Management</h1>
        <button
          onClick={toggleSort}
          className="px-3 py-1 bg-white/10 border border-white/20 rounded text-sm"
        >
          Date Modified
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white/5 border border-white/10 rounded-xl p-4 grid grid-cols-4 gap-4">
        <input
          placeholder="Search by name or email..."
          className="p-2 bg-black/40 border border-white/10 rounded col-span-2"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />

        <select
          className="p-2 bg-black/40 border border-white/10 rounded"
          value={gender}
          onChange={(e) => {
            setGender(e.target.value);
            setPage(1);
          }}
        >
          <option value="ALL">All Genders</option>
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>

        <input
          type="date"
          className="p-2 bg-black/40 border border-white/10 rounded"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setPage(1);
          }}
        />
      </div>

      <TeacherTable teachers={paginated} onEdit={setSelected} />

      {/* Pagination */}
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-400">
          Page {page} of {totalPages}
        </span>

        <div className="flex gap-2">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="px-3 py-1 bg-white/10 rounded disabled:opacity-40"
          >
            Prev
          </button>
          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="px-3 py-1 bg-white/10 rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>

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
