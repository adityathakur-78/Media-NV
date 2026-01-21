"use client";
import Link from "next/link";
import Navbar from "@/components/navbar";

export default function AboutPage() {
  return (
    <>
      <div className="min-h-screen bg-[#0b0f19] text-white relative overflow-hidden">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

        {/* Navbar spacer */}
        <Navbar />

        {/* Hero Section */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 mt-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            About <span className="text-indigo-300">SmartSchool</span>
          </h1>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            SmartSchool is a next-generation School Management Platform designed
            to bring security, intelligence, and simplicity to modern education
            systems.
          </p>
        </section>

        {/* Mission & Vision */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 mt-20 grid md:grid-cols-2 gap-10">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-3 text-indigo-300">
              Our Mission
            </h3>
            <p className="text-gray-400">
              To empower schools with secure, scalable, and intelligent digital
              infrastructure that simplifies administration and enhances
              learning experiences.
            </p>
          </div>

          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-3 text-indigo-300">
              Our Vision
            </h3>
            <p className="text-gray-400">
              To become the operating system of education by connecting
              students, teachers, and administrators on a single smart platform.
            </p>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 mt-20">
          <h2 className="text-3xl font-bold text-center mb-10">
            Why Choose <span className="text-indigo-300">SmartSchool</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Enterprise Security",
                desc: "JWT, RBAC, encrypted data and audit logs.",
              },
              {
                title: "Smart Analytics",
                desc: "Real-time insights into performance and growth.",
              },
              {
                title: "Modern Experience",
                desc: "Fast, responsive, and beautifully designed UI.",
              },
              {
                title: "Role Based Access",
                desc: "Admin, Teacher, Student – fully controlled.",
              },
              {
                title: "Cloud Ready",
                desc: "Scalable architecture built for the future.",
              },
              {
                title: "All-in-One Platform",
                desc: "Attendance, exams, fees, reports, communication.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition"
              >
                <h4 className="font-semibold mb-2 text-indigo-300">
                  {item.title}
                </h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Stats */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 mt-24 grid md:grid-cols-4 gap-6 text-center">
          {[
            { label: "Students", value: "10,000+" },
            { label: "Teachers", value: "500+" },
            { label: "Institutions", value: "120+" },
            { label: "Years of Trust", value: "10+" },
          ].map((stat, i) => (
            <div
              key={i}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6"
            >
              <div className="text-3xl font-bold text-indigo-300">
                {stat.value}
              </div>
              <div className="text-gray-400 text-sm mt-1">{stat.label}</div>
            </div>
          ))}
        </section>

        {/* Call to Action */}
        <section className="relative z-10 max-w-7xl mx-auto px-6 mt-24 mb-24 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Transform Your School?
          </h2>
          <p className="text-gray-400 mb-6">
            Join SmartSchool and experience the future of digital education
            management.
          </p>
          <Link
            href="/register"
            className="inline-block px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur"
          >
            Get Started
          </Link>
        </section>
      </div>
    </>
  );
}
