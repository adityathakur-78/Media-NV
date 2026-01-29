"use client";

import Navbar from "@/components/navbar";

export default function AdmissionsPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white relative overflow-hidden">
      <Navbar />

      {/* Background lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-24">
        <h1 className="text-5xl font-bold text-center mb-4">
          Admissions at <span className="text-indigo-300">SmartSchool</span>
        </h1>
        <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
          Begin your journey with SmartSchool. Explore our admission process,
          fee structure, and apply online with ease.
        </p>

        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Admission <span className="text-indigo-300">Process</span>
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            {[
              {
                step: "1",
                title: "Fill Application",
                desc: "Submit online application form.",
              },
              {
                step: "2",
                title: "Document Verification",
                desc: "Upload required documents.",
              },
              {
                step: "3",
                title: "Entrance / Interview",
                desc: "Assessment or interaction round.",
              },
              {
                step: "4",
                title: "Confirmation",
                desc: "Fee payment and seat confirmation.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 text-center"
              >
                <div className="text-2xl font-bold text-indigo-300 mb-2">
                  Step {item.step}
                </div>
                <h4 className="font-semibold mb-1">{item.title}</h4>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-8 text-center">
            Fee <span className="text-indigo-300">Structure</span>
          </h2>

          <div className="overflow-x-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/10 text-gray-300">
                <tr>
                  <th className="p-4">Class</th>
                  <th className="p-4">Tuition Fee (Yearly)</th>
                  <th className="p-4">Admission Fee</th>
                  <th className="p-4">Total</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                {[
                  {
                    cls: "Primary (1-5)",
                    t: "₹40,000",
                    a: "₹5,000",
                    total: "₹45,000",
                  },
                  {
                    cls: "Middle (6-8)",
                    t: "₹50,000",
                    a: "₹6,000",
                    total: "₹56,000",
                  },
                  {
                    cls: "Secondary (9-10)",
                    t: "₹60,000",
                    a: "₹7,000",
                    total: "₹67,000",
                  },
                  {
                    cls: "Senior (11-12)",
                    t: "₹70,000",
                    a: "₹8,000",
                    total: "₹78,000",
                  },
                ].map((row, i) => (
                  <tr key={i} className="border-t border-white/10">
                    <td className="p-4">{row.cls}</td>
                    <td className="p-4">{row.t}</td>
                    <td className="p-4">{row.a}</td>
                    <td className="p-4">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">
            Apply <span className="text-indigo-300">Online</span>
          </h2>

          <div className="max-w-2xl mx-auto bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
            <form className="space-y-5">
              <input
                type="text"
                placeholder="Student Full Name"
                className="w-full bg-black/30 border border-white/10 rounded-md px-4 py-3 text-sm outline-none focus:border-indigo-400"
              />
              <input
                type="email"
                placeholder="Parent Email"
                className="w-full bg-black/30 border border-white/10 rounded-md px-4 py-3 text-sm outline-none focus:border-indigo-400"
              />
              <input
                type="tel"
                placeholder="Contact Number"
                className="w-full bg-black/30 border border-white/10 rounded-md px-4 py-3 text-sm outline-none focus:border-indigo-400"
              />
              <select className="w-full bg-black/30 border border-white/10 rounded-md px-4 py-3 text-sm outline-none focus:border-indigo-400">
                <option>Select Class</option>
                <option>Primary (1-5)</option>
                <option>Middle (6-8)</option>
                <option>Secondary (9-10)</option>
                <option>Senior (11-12)</option>
              </select>
              <textarea
                rows="4"
                placeholder="Additional Message"
                className="w-full bg-black/30 border border-white/10 rounded-md px-4 py-3 text-sm outline-none focus:border-indigo-400"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-md bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur transition"
              >
                Submit Application
              </button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
}
