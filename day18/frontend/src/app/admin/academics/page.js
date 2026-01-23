"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import { useRouter } from "next/navigation";
import {
  GraduationCap,
  Users,
  BookOpen,
  UserCheck,
  List,
  ChevronRight,
  TrendingUp,
  Plus,
  ArrowRight,
  Layers,
  PlusCircle,
  BookPlus,
  Pencil,
  Trash2,
} from "lucide-react";

export default function AcademicsPage() {
  const router = useRouter();

  const [className, setClassName] = useState("");
  const [subjectName, setSubjectName] = useState("");

  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  const [editItem, setEditItem] = useState(null); // { type, id, name }

  const loadData = async () => {
    const c = await api.get("/admin/classes");
    const s = await api.get("/admin/subjects");
    const t = await api.get("/admin/all-teachers");
    const st = await api.get("/admin/all-students");

    setClasses(c.data?.data || c.data || []);
    setSubjects(s.data?.data || s.data || []);
    setTeachers(t.data?.data || t.data || []);
    setStudents(st.data?.data || st.data || []);
  };

  useEffect(() => {
    loadData();
  }, []);

  const createClass = async () => {
    if (!className.trim()) return;
    await api.post("/admin/class", { name: className });
    setClassName("");
    loadData();
  };

  const createSubject = async () => {
    if (!subjectName.trim()) return;
    await api.post("/admin/subject", { name: subjectName });
    setSubjectName("");
    loadData();
  };

  const updateItem = async () => {
    const endpoint =
      editItem.type === "class"
        ? `/admin/classes/${editItem.id}`
        : `/admin/subjects/${editItem.id}`;

    await api.patch(endpoint, { name: editItem.name });
    setEditItem(null);
    loadData();
  };

  const deleteItem = async (type, id) => {
    if (!confirm("Are you sure you want to delete?")) return;

    const endpoint =
      type === "class" ? `/admin/classes/${id}` : `/admin/subjects/${id}`;

    await api.delete(endpoint);
    loadData();
  };

  return (
    <div className="min-h-screen bg-[#021a27] p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-start gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur">
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-white/10">
            <GraduationCap className="w-6 h-6 text-sky-300" />
          </div>

          <div>
            <h1 className="text-2xl font-semibold text-white flex items-center gap-2">
              Academic Management
              <BookOpen className="w-5 h-5 text-white/70" />
            </h1>

            <p className="text-white/60 mt-1 flex items-center gap-3 text-sm">
              <Users className="w-4 h-4" /> Classes & Students
              <UserCheck className="w-4 h-4 ml-3" /> Teachers & Subjects
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-5">
          <Stat title="Total Classes" value={classes.length} />
          <Stat title="Total Subjects" value={subjects.length} />
          <Stat title="Total Teachers" value={teachers.length} />
          <Stat title="Total Students" value={students.length} />
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <ActionButton
            label="Assign Teacher"
            onClick={() => router.push("/admin/assign-teacher")}
          />
          <ActionButton
            label="Assign Student"
            onClick={() => router.push("/admin/assign-student")}
          />
        </div>

        {/* Create */}
        <div className="grid grid-cols-2 gap-6">
          <Card title="Create Class" icon={Layers}>
            <input
              className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 mb-3 text-white"
              placeholder="Class Name (e.g. 10-A)"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
            />
            <button
              onClick={createClass}
              disabled={!className.trim()}
              className="w-full py-2 rounded bg-sky-600 text-white disabled:opacity-40"
            >
              Create Class
            </button>
          </Card>

          <Card title="Create Subject" icon={BookPlus}>
            <input
              className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 mb-3 text-white"
              placeholder="Subject Name (e.g. Mathematics)"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
            />
            <button
              onClick={createSubject}
              disabled={!subjectName.trim()}
              className="w-full py-2 rounded bg-purple-600 text-white disabled:opacity-40"
            >
              Create Subject
            </button>
          </Card>
        </div>

        {/* Tables */}
        <div className="grid grid-cols-2 gap-6">
          <Table
            title="Classes"
            data={classes}
            onEdit={(item) => setEditItem({ ...item, type: "class" })}
            onDelete={(id) => deleteItem("class", id)}
          />
          <Table
            title="Subjects"
            data={subjects}
            onEdit={(item) => setEditItem({ ...item, type: "subject" })}
            onDelete={(id) => deleteItem("subject", id)}
          />
        </div>
      </div>

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-[#021a27] border border-white/20 rounded-xl p-6 w-96">
            <h3 className="text-white mb-3">Edit {editItem.type}</h3>
            <input
              className="w-full bg-white/10 border border-white/20 rounded px-3 py-2 text-white mb-4"
              value={editItem.name}
              onChange={(e) =>
                setEditItem({ ...editItem, name: e.target.value })
              }
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setEditItem(null)}
                className="text-white/60"
              >
                Cancel
              </button>
              <button
                onClick={updateItem}
                className="px-4 py-2 bg-sky-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ---------- UI Components ---------- */

function Stat({ title, value, icon: Icon = TrendingUp }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-5 flex justify-between">
      <div>
        <p className="text-white/60 text-sm">{title}</p>
        <p className="text-2xl font-bold text-sky-300">{value}</p>
      </div>
      <Icon className="w-6 h-6 text-sky-300" />
    </div>
  );
}

function ActionButton({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-5 py-2 rounded bg-white/10 text-white hover:bg-white/20 flex items-center gap-2"
    >
      {label}
      <ArrowRight className="w-4 h-4" />
    </button>
  );
}

function Card({ title, icon: Icon, children }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-6">
      <div className="flex items-center gap-2 mb-3">
        <Icon className="w-5 h-5 text-sky-300" />
        <h3 className="text-white">{title}</h3>
      </div>
      {children}
    </div>
  );
}

function Table({ title, data, onEdit, onDelete }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
      <div className="px-4 py-3 border-b border-white/10 text-white flex gap-2">
        <List className="w-4 h-4" /> {title}
      </div>

      {data.map((item, i) => (
        <div
          key={item.id}
          className="flex justify-between items-center px-4 py-2 text-white/80 hover:bg-white/10"
        >
          <span>
            {i + 1}. {item.name}
          </span>
          <div className="flex gap-3">
            <Pencil
              onClick={() => onEdit(item)}
              className="w-4 h-4 cursor-pointer text-sky-400"
            />
            <Trash2
              onClick={() => onDelete(item.id)}
              className="w-4 h-4 cursor-pointer text-red-400"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
