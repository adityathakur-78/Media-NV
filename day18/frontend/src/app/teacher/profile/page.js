"use client";
import { useEffect, useState } from "react";
import api from "@/lib/axios";
import {
  User,
  Edit3,
  Save,
  X,
  ShieldCheck,
  Calendar,
  Phone,
  MapPin,
  Info,
  Users,
} from "lucide-react";

export default function TeacherProfilePage() {
  const [profile, setProfile] = useState(null);
  const [editMode, setEditMode] = useState(false);

  useEffect(() => {
    const load = async () => {
      const res = await api.get("/teacher/me");
      setProfile(res.data.data);
    };
    load();
  }, []);

  const update = async () => {
    const { fullname, gender, about, phone, address } = profile;
    await api.patch(`/teacher/${profile.id}`, {
      fullname,
      gender,
      about,
      phone,
      address,
    });
    setEditMode(false);
  };

  if (!profile) return null;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold">Teacher Profile</h1>
          <p className="text-gray-400 text-sm">
            View and manage your personal and professional information
          </p>
        </div>

        {!editMode ? (
          <button
            onClick={() => setEditMode(true)}
            className="flex items-center gap-2 px-4 py-2 bg-sky-600 rounded-lg text-white hover:bg-sky-700"
          >
            <Edit3 className="w-4 h-4" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={update}
              className="flex items-center gap-2 px-4 py-2 bg-emerald-600 rounded-lg text-white"
            >
              <Save className="w-4 h-4" /> Save
            </button>
            <button
              onClick={() => setEditMode(false)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-600 rounded-lg text-white"
            >
              <X className="w-4 h-4" /> Cancel
            </button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* LEFT PANEL */}
        <div className="space-y-6">
          {/* Profile Card */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-24 h-24 rounded-full bg-sky-500/20 flex items-center justify-center mb-3">
                <User className="w-10 h-10 text-sky-400" />
              </div>
              <h2 className="text-lg font-semibold">{profile.fullname}</h2>
              <p className="text-sm text-gray-400">{profile.email}</p>
              <span className="mt-2 px-3 py-1 rounded-full text-xs bg-purple-600/20 text-purple-300">
                {profile.role}
              </span>
            </div>

            <div className="mt-5 border-t border-white/10 pt-4 space-y-2 text-sm text-gray-300">
              <p className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-green-400" />
                Status: {profile.isActive ? "Active" : "Inactive"}
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-blue-400" />
                Joined: {new Date(profile.createdAt).toLocaleDateString()}
              </p>
              <p className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-yellow-400" />
                Updated: {new Date(profile.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Personal Info Summary */}
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-sky-400" /> Personal Information
            </h3>

            <div className="space-y-3 text-sm text-gray-300">
              <p className="flex items-center gap-2">
                <Users className="w-4 h-4 text-gray-400" />
                Gender: {profile.gender || "Not set"}
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-gray-400" />
                Phone: {profile.phone || "Not set"}
              </p>
              <p className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-gray-400" />
                Address: {profile.address || "Not set"}
              </p>
              <p className="flex items-start gap-2">
                <Info className="w-4 h-4 text-gray-400 mt-1" />
                About: {profile.about || "Not set"}
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="col-span-2 bg-white/5 border border-white/10 rounded-2xl p-6">
          <h3 className="text-lg font-semibold mb-4">Edit Details</h3>

          <div className="grid grid-cols-2 gap-5">
            <Field
              label="Full Name"
              value={profile.fullname}
              editable={editMode}
              onChange={(v) => setProfile({ ...profile, fullname: v })}
            />

            <Field
              label="Gender"
              value={profile.gender || ""}
              editable={editMode}
              type="select"
              options={["MALE", "FEMALE", "OTHER"]}
              onChange={(v) => setProfile({ ...profile, gender: v })}
            />

            <Field
              label="Phone"
              value={profile.phone || ""}
              editable={editMode}
              onChange={(v) => setProfile({ ...profile, phone: v })}
            />

            <Field
              label="Address"
              value={profile.address || ""}
              editable={editMode}
              onChange={(v) => setProfile({ ...profile, address: v })}
            />

            <div className="col-span-2">
              <Field
                label="About"
                value={profile.about || ""}
                editable={editMode}
                type="textarea"
                onChange={(v) => setProfile({ ...profile, about: v })}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* Field Component */
function Field({
  label,
  value,
  editable,
  onChange,
  type = "text",
  options = [],
}) {
  return (
    <div>
      <label className="text-xs text-gray-400 mb-1 block">{label}</label>

      {!editable ? (
        <div className="px-3 py-2 rounded-lg bg-black/40 border border-white/10 text-white">
          {value || <span className="text-gray-500">Not set</span>}
        </div>
      ) : type === "textarea" ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-sky-500"
        />
      ) : type === "select" ? (
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-sky-500"
        >
          <option value="">Select</option>
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-white/10 border border-white/20 focus:ring-2 focus:ring-sky-500"
        />
      )}
    </div>
  );
}
