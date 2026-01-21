"use client";
import Navbar from "@/components/navbar";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-[#0b0f19] text-white relative overflow-hidden">
      <Navbar />
      {/* Background lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.12),transparent_60%)]" />
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/80" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-24">
        {/* Title */}
        <h1 className="text-5xl font-bold text-center mb-4">
          Contact <span className="text-indigo-300">SmartSchool</span>
        </h1>
        <p className="text-gray-400 text-center max-w-3xl mx-auto mb-16">
          Have questions? Want a demo? Reach out to us and our team will get
          back to you as soon as possible.
        </p>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-indigo-300 mb-2">
                Address
              </h3>
              <p className="text-gray-400">
                SmartSchool HQ, Tech Park Road, Bangalore, India
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-indigo-300 mb-2">
                Email
              </h3>
              <p className="text-gray-400">support@smartschool.com</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-indigo-300 mb-2">
                Phone
              </h3>
              <p className="text-gray-400">+91 90000 00000</p>
            </div>

            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
              <h3 className="text-lg font-semibold text-indigo-300 mb-2">
                Working Hours
              </h3>
              <p className="text-gray-400">
                Monday – Friday: 9:00 AM – 6:00 PM
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-8">
            <h3 className="text-xl font-semibold mb-6 text-indigo-300">
              Send us a Message
            </h3>

            <form className="space-y-5">
              <input
                type="text"
                placeholder="Full Name"
                className="w-full bg-black/30 border border-white/10 rounded-md px-4 py-3 text-sm outline-none focus:border-indigo-400"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full bg-black/30 border border-white/10 rounded-md px-4 py-3 text-sm outline-none focus:border-indigo-400"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full bg-black/30 border border-white/10 rounded-md px-4 py-3 text-sm outline-none focus:border-indigo-400"
              />

              <textarea
                rows="4"
                placeholder="Your Message"
                className="w-full bg-black/30 border border-white/10 rounded-md px-4 py-3 text-sm outline-none focus:border-indigo-400"
              />

              <button
                type="submit"
                className="w-full py-3 rounded-md bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Map Section (Optional Placeholder) */}
        <div className="mt-20 bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl h-80 flex items-center justify-center text-gray-400">
          Google Map Integration Area
        </div>
      </div>
    </div>
  );
}
