import Link from "next/link";
import { ArrowRight, UserPlus, LogIn } from "lucide-react";

export default function CTASection() {
  return (
    <section className="relative z-10 mt-32 mb-2 flex justify-center px-6">
      <div className="relative w-full max-w-6xl bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-12 text-center shadow-[0_0_60px_rgba(255,255,255,0.08)]">
        {/* Glow */}
        <div className="absolute inset-0 rounded-2xl bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.15),transparent_60%)]" />

        <h2 className="relative text-4xl font-bold mb-4">
          Ready to Transform Your Institution?
        </h2>

        <p className="relative text-gray-400 mb-8 max-w-2xl mx-auto">
          Join SmartSchool and bring security, analytics, and intelligent
          management to your students, teachers, and administrators.
        </p>

        {/* Buttons */}
        <div className="relative flex flex-col sm:flex-row gap-4 justify-center mb-10">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur shadow-[0_0_25px_rgba(255,255,255,0.3)]"
          >
            <UserPlus className="w-4 h-4" />
            Get Started
          </Link>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-black/30 hover:bg-black/40 border border-white/10 backdrop-blur"
          >
            <LogIn className="w-4 h-4" />
            Log In
          </Link>
        </div>

        {/* Divider */}
        <div className="relative w-full h-px bg-white/10 mb-8" />

        {/* Micro Features */}
        <div className="relative grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm text-gray-400">
          <div>
            <span className="text-white font-medium">Secure by Design</span>
            <p className="mt-1 text-xs">JWT, RBAC, encrypted access control.</p>
          </div>
          <div>
            <span className="text-white font-medium">Smart Analytics</span>
            <p className="mt-1 text-xs">
              Real-time performance and growth insights.
            </p>
          </div>
          <div>
            <span className="text-white font-medium">Modern Experience</span>
            <p className="mt-1 text-xs">
              Fast, responsive, and beautifully designed.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
