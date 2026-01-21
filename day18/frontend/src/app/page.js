"use client";
import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  User,
  BarChart3,
  Shield,
  School,
} from "lucide-react";
import Navbar from "@/components/navbar";
import FeaturesSection from "@/components/home/feature";
import StatsSection from "@/components/home/stats";
import CTASection from "@/components/home/cta";
import Footer from "@/components/home/footer";
import GlassFeatures from "@/components/home/glassFeature";

const icons = [GraduationCap, BookOpen, User, BarChart3, Shield, School];

function getPointOnCurve(t) {
  const p0 = { x: 0, y: 80 };
  const p1 = { x: 960, y: 400 };
  const p2 = { x: 1920, y: 80 };

  const x =
    Math.pow(1 - t, 2) * p0.x + 2 * (1 - t) * t * p1.x + Math.pow(t, 2) * p2.x;

  const y =
    Math.pow(1 - t, 2) * p0.y + 2 * (1 - t) * t * p1.y + Math.pow(t, 2) * p2.y;

  return { x, y };
}

export default function HomePage() {
  return (
    <div className="min-h-screen relative overflow-hidden bg-[#0b0f19] text-white flex flex-col items-center">
      {/* Base Dark */}
      <div className="absolute inset-0 bg-[#0b0f19]" />

      {/* Sun Rays from Top Left */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(115deg,
              rgba(255,255,255,0.18) 0%,
              rgba(255,255,255,0.08) 15%,
              rgba(255,255,255,0.02) 30%,
              rgba(0,0,0,0.0) 60%
            )
          `,
        }}
      />

      {/* Parallel Light Beams */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            repeating-linear-gradient(
              115deg,
              rgba(255,255,255,0.08) 0px,
              rgba(255,255,255,0.04) 2px,
              rgba(255,255,255,0.0) 12px,
              rgba(255,255,255,0.0) 28px
            )
          `,
          maskImage:
            "radial-gradient(circle at top left, black 0%, transparent 70%)",
          WebkitMaskImage:
            "radial-gradient(circle at top left, black 0%, transparent 70%)",
        }}
      />

      {/* Light Bloom */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.25),transparent_60%)]" />

      {/* Vignette */}
      <div className="absolute inset-0 bg-linear-to-b from-black/40 via-transparent to-black/80" />

      {/* Glass Navbar */}
      <Navbar />

      {/* Hero */}
      <section className="relative z-10 flex flex-col items-center text-center pt-18 w-full">
        <h1 className="text-5xl font-bold max-w-4xl leading-tight">
          Where Education Meets Technology
          <span className="block text-indigo-300">
            And Administration Becomes Effortless
          </span>
        </h1>

        <p className="mt-6 text-gray-400 max-w-2xl">
          Secure login, role-based access, analytics, and system monitoring in
          one unified platform.
        </p>

        <div className="mt-8">
          <Link
            href="/login"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur border border-white/20 shadow-[0_0_25px_rgba(255,255,255,0.25)]"
          >
            Login to SmartSchool
          </Link>
        </div>

        {/* Moon Arc */}
        <div className="absolute top-39.5 left-0 w-full h-105 pointer-events-none">
          <svg
            className="absolute inset-0 w-full h-full"
            viewBox="0 0 1920 420"
            fill="none"
          >
            <defs>
              <filter id="arcGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="7" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              <linearGradient
                id="moonGradient"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                <stop offset="40%" stopColor="rgba(210,210,210,0.7)" />
                <stop offset="50%" stopColor="rgba(255,255,255,1)" />
                <stop offset="60%" stopColor="rgba(210,210,210,0.7)" />
                <stop offset="100%" stopColor="rgba(255,255,255,0)" />
              </linearGradient>
            </defs>

            <path
              d="M0 80 Q960 400 1920 80"
              stroke="url(#moonGradient)"
              strokeWidth="4"
              filter="url(#arcGlow)"
              fill="none"
            />
          </svg>

          {/* Lucide Icons on Curve */}
          {icons.map((Icon, i) => {
            const t = 0.15 + i * 0.14;
            const { x, y } = getPointOnCurve(t);

            return (
              <div
                key={i}
                className="absolute"
                style={{
                  left: `${(x / 1920) * 100}%`,
                  top: `${(y / 420) * 100}%`,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/40 backdrop-blur flex items-center justify-center shadow-[0_0_25px_rgba(255,255,255,0.7)]">
                  <Icon className="w-5 h-5 text-gray-200" />
                </div>
              </div>
            );
          })}
        </div>
      </section>
      <GlassFeatures />
      <CTASection />
      <FeaturesSection />
      <StatsSection />
      <Footer />
    </div>
  );
}
