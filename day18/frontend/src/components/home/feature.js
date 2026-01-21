import { Shield, BarChart3, GraduationCap, School } from "lucide-react";

export default function FeaturesSection() {
  const features = [
    {
      icon: Shield,
      title: "Enterprise Security",
      desc: "JWT, RBAC, encrypted data & audit logs.",
    },
    {
      icon: BarChart3,
      title: "Smart Analytics",
      desc: "Real-time insights & performance tracking.",
    },
    {
      icon: GraduationCap,
      title: "Student Management",
      desc: "Profiles, attendance, exams, results.",
    },
    {
      icon: School,
      title: "Institution Control",
      desc: "One dashboard for complete operations.",
    },
  ];

  return (
    <section className="relative z-10 mt-40 max-w-7xl mx-auto px-6">
      <h2 className="text-4xl font-bold text-center mb-14">
        Built for <span className="text-indigo-300">Modern Education</span>
      </h2>

      <div className="grid md:grid-cols-4 gap-6">
        {features.map((f, i) => (
          <div
            key={i}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6 hover:bg-white/10 transition"
          >
            <f.icon className="w-6 h-6 text-indigo-300 mb-4" />
            <h3 className="font-semibold mb-1">{f.title}</h3>
            <p className="text-sm text-gray-400">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
