"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import AppLoader from "@/components/pageLoader";
import { Plus, Pencil, Users, X, Save } from "lucide-react";

const PAGE_SIZE = 8;

export default function TeacherStudentsPage() {
  const [students, setStudents] = useState([]);
  const [search, setSearch] = useState("");
  const [genderFilter, setGenderFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const [editStudent, setEditStudent] = useState(null);
  const [createMode, setCreateMode] = useState(false);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
    gender: "",
    phone: "",
    address: "",
    about: "",
  });

  const loadStudents = async () => {
    try {
      setLoading(true);
      const res = await api.get("/teacher/allStudents");
      setStudents(res.data.data || []);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents();
  }, []);

  const openEdit = (s) => {
    setEditStudent(s);
    setForm({
      fullname: s.fullname || "",
      gender: s.gender || "",
      phone: s.phone || "",
      address: s.address || "",
      about: s.about || "",
    });
  };

  const saveEdit = async () => {
    try {
      setLoading(true);
      const payload = {};
      if (form.fullname) payload.fullname = form.fullname;
      if (form.gender) payload.gender = form.gender;
      if (form.phone) payload.phone = form.phone;
      if (form.address) payload.address = form.address;
      if (form.about) payload.about = form.about;

      await api.patch(`/teacher/student/${editStudent.id}`, payload);
      setEditStudent(null);
      await loadStudents();
    } finally {
      setLoading(false);
    }
  };

  const createStudent = async () => {
    try {
      setLoading(true);
      await api.post("/teacher/student/create", {
        fullname: form.fullname,
        email: form.email,
        password: form.password,
      });
      setCreateMode(false);
      await loadStudents();
    } finally {
      setLoading(false);
    }
  };

  const filtered = students
    .filter((s) => s.fullname.toLowerCase().includes(search.toLowerCase()))
    .filter((s) => (genderFilter ? s.gender === genderFilter : true))
    .filter((s) =>
      statusFilter === ""
        ? true
        : statusFilter === "ACTIVE"
          ? s.isActive
          : !s.isActive,
    );

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <>
      {loading && <AppLoader />}

      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-semibold flex items-center gap-2">
            <Users className="text-sky-400" /> Student Management
          </h1>
          <button
            onClick={() => {
              setForm({ fullname: "", email: "", password: "" });
              setCreateMode(true);
            }}
            className="bg-sky-600 px-4 py-2 rounded text-white flex items-center gap-2"
          >
            <Plus size={16} /> Add Student
          </button>
        </div>

        {/* Filters */}
        <div className="grid grid-cols-4 gap-4">
          <input
            placeholder="Search by name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="p-2 bg-black/40 border border-white/10 rounded"
          />

          <select
            value={genderFilter}
            onChange={(e) => setGenderFilter(e.target.value)}
            className="p-2 bg-black/40 border border-white/10 rounded"
          >
            <option value="">All Genders</option>
            <option value="MALE">MALE</option>
            <option value="FEMALE">FEMALE</option>
          </select>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="p-2 bg-black/40 border border-white/10 rounded"
          >
            <option value="">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>

          <div className="text-sm text-gray-400 flex items-center">
            Total: {filtered.length} Students
          </div>
        </div>

        {/* Table */}
        <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-white/10">
              <tr>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-left">Email</th>
                <th className="p-3 text-left">Gender</th>
                <th className="p-3 text-left">Phone</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map((s) => (
                <tr key={s.id} className="border-t border-white/10">
                  <td className="p-3">{s.fullname}</td>
                  <td className="p-3">{s.email}</td>
                  <td className="p-3">{s.gender || "-"}</td>
                  <td className="p-3">{s.phone || "-"}</td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        s.isActive
                          ? "bg-green-500/20 text-green-400"
                          : "bg-red-500/20 text-red-400"
                      }`}
                    >
                      {s.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => openEdit(s)}
                      className="text-sky-400 flex items-center gap-1"
                    >
                      <Pencil size={14} /> Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={`px-3 py-1 rounded ${
                page === i + 1
                  ? "bg-sky-600 text-white"
                  : "bg-white/10 text-gray-300"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>

        {/* Modal */}
        {(editStudent || createMode) && (
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-[#021a27] border border-white/20 rounded-xl p-6 w-125 space-y-4">
              <h3 className="text-lg font-semibold">
                {editStudent ? "Edit Student" : "Create Student"}
              </h3>

              {editStudent ? (
                <>
                  <input
                    placeholder="Full Name"
                    value={form.fullname}
                    onChange={(e) =>
                      setForm({ ...form, fullname: e.target.value })
                    }
                    className="w-full p-2 bg-black/40 border border-white/10 rounded"
                  />

                  <select
                    value={form.gender}
                    onChange={(e) =>
                      setForm({ ...form, gender: e.target.value })
                    }
                    className="w-full p-2 bg-black/40 border border-white/10 rounded"
                  >
                    <option value="">Select Gender</option>
                    <option value="MALE">MALE</option>
                    <option value="FEMALE">FEMALE</option>
                  </select>

                  <input
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) =>
                      setForm({ ...form, phone: e.target.value })
                    }
                    className="w-full p-2 bg-black/40 border border-white/10 rounded"
                  />

                  <input
                    placeholder="Address"
                    value={form.address}
                    onChange={(e) =>
                      setForm({ ...form, address: e.target.value })
                    }
                    className="w-full p-2 bg-black/40 border border-white/10 rounded"
                  />

                  <textarea
                    placeholder="About"
                    value={form.about}
                    onChange={(e) =>
                      setForm({ ...form, about: e.target.value })
                    }
                    className="w-full p-2 bg-black/40 border border-white/10 rounded"
                  />
                </>
              ) : (
                <>
                  <input
                    placeholder="Full Name"
                    value={form.fullname}
                    onChange={(e) =>
                      setForm({ ...form, fullname: e.target.value })
                    }
                    className="w-full p-2 bg-black/40 border border-white/10 rounded"
                  />

                  <input
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    className="w-full p-2 bg-black/40 border border-white/10 rounded"
                  />

                  <input
                    type="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="w-full p-2 bg-black/40 border border-white/10 rounded"
                  />
                </>
              )}

              <div className="flex justify-end gap-3 pt-3">
                <button
                  onClick={() => {
                    setEditStudent(null);
                    setCreateMode(false);
                  }}
                  className="px-4 py-2 bg-gray-600 rounded text-white flex items-center gap-2"
                >
                  <X size={16} /> Cancel
                </button>

                <button
                  onClick={editStudent ? saveEdit : createStudent}
                  className="px-4 py-2 bg-sky-600 rounded text-white flex items-center gap-2"
                >
                  <Save size={16} /> {editStudent ? "Update" : "Create"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
