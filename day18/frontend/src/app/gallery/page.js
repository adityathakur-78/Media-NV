"use client";

import Navbar from "@/components/navbar";

export default function GalleryPage() {
  const images = [
    "https://images.unsplash.com/photo-1580582932707-520aed937b7b",
    "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f",
    "https://images.unsplash.com/photo-1509062522246-3755977927d7",
    "https://images.unsplash.com/photo-1523050854058-8df90110c9f1",
    "https://images.unsplash.com/photo-1529070538774-1843cb3265df",
    "https://images.unsplash.com/photo-1596495577886-d920f1fb7238",
  ];

  return (
    <div className="min-h-screen bg-[#0b0f19] text-white relative overflow-hidden">
      <Navbar />
      {/* Background Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-24">
        {/* Title */}
        <h1 className="text-5xl font-bold text-center mb-4">
          SmartSchool <span className="text-indigo-300">Gallery</span>
        </h1>
        <p className="text-gray-400 text-center max-w-3xl mx-auto mb-12">
          Explore our campus, classrooms, laboratories, events, and student
          life.
        </p>

        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {images.map((src, i) => (
            <div
              key={i}
              className="relative group rounded-xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-xl"
            >
              <img
                src={src}
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
    </div>
  );
}
