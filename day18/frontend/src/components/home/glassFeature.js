import { GraduationCap, BookOpen, Brain, Sparkles } from "lucide-react";

export default function GlassMotivation() {
  const items = [
    {
      icon: GraduationCap,
      title: "Empowering Every Student",
      desc: "We believe every learner has the potential to achieve greatness when guided with the right tools, support, and digital infrastructure.",
    },
    {
      icon: BookOpen,
      title: "Learning Without Limits",
      desc: "SmartSchool creates an environment where knowledge flows seamlessly and education becomes accessible, organized, and inspiring.",
    },
    {
      icon: Brain,
      title: "Building Intelligent Minds",
      desc: "Through technology and structure, we help schools nurture critical thinking, creativity, and lifelong learning habits.",
    },
    {
      icon: Sparkles,
      title: "Shaping the Future",
      desc: "Our platform supports institutions in preparing students for tomorrow’s world with confidence, clarity, and excellence.",
    },
  ];

  return (
    <section className="relative z-10 mt-32 max-w-7xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-8">
        {items.map((item, i) => (
          <div
            key={i}
            className="relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:bg-white/10 transition"
          >
            {/* Icon + Title Row */}
            <div className="flex items-center gap-3 mb-3">
              <item.icon className="w-5 h-5 text-indigo-300" />
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
            </div>

            {/* Description */}
            <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
