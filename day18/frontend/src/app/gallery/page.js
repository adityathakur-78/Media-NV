"use client";

import { useState } from "react";
import Navbar from "@/components/navbar";

const images = [
  {
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b",
    category: "Campus",
  },
  {
    src: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    category: "Library",
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    category: "Classroom",
  },
  {
    src: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    category: "Graduation",
  },
  {
    src: "https://images.unsplash.com/photo-1529070538774-1843cb3265df",
    category: "Students",
  },
  {
    src: "https://images.unsplash.com/photo-1596495577886-d920f1fb7238",
    category: "Laboratory",
  },
];

export default function GalleryPage() {
  const [selected, setSelected] = useState("All");
  const [preview, setPreview] = useState(null);

  const filtered =
    selected === "All" ? images : images.filter((i) => i.category === selected);

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white relative overflow-hidden">
      <Navbar />

      {/* Background Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-24">
        {/* Title */}
        <h1 className="text-5xl font-bold text-center mb-4">
          SmartSchool <span className="text-indigo-300">Gallery</span>
        </h1>
        <p className="text-gray-400 text-center max-w-3xl mx-auto mb-8">
          Explore our campus, classrooms, laboratories, events, and student
          life.
        </p>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {[
            "All",
            "Campus",
            "Library",
            "Classroom",
            "Laboratory",
            "Students",
            "Graduation",
          ].map((cat) => (
            <button
              key={cat}
              onClick={() => setSelected(cat)}
              className={`px-4 py-2 rounded-full text-sm border backdrop-blur transition ${
                selected === cat
                  ? "bg-indigo-500/20 border-indigo-400 text-indigo-300"
                  : "bg-white/5 border-white/10 hover:bg-white/10"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.map((img, i) => (
            <div
              key={i}
              onClick={() => setPreview(img.src)}
              className="cursor-pointer relative group rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
            >
              <img
                src={img.src}
                alt="SmartSchool Gallery"
                className="object-cover w-full h-64 group-hover:scale-110 transition-transform duration-500"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                <span className="text-sm text-gray-200">View</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {preview && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur z-50 flex items-center justify-center"
          onClick={() => setPreview(null)}
        >
          <img
            src={preview}
            className="max-h-[90vh] max-w-[90vw] rounded-xl border border-white/20"
          />
        </div>
      )}
    </div>
  );
}
