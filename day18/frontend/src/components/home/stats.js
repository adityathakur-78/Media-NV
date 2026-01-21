export default function StatsSection() {
  const stats = [
    { label: "Students", value: "10K+" },
    { label: "Teachers", value: "500+" },
    { label: "Institutions", value: "120+" },
    { label: "Years of Trust", value: "10+" },
  ];

  return (
    <section className="relative z-10 mt-32 mb-10 max-w-6xl mx-auto px-6">
      <div className="grid md:grid-cols-4 gap-6 text-center">
        {stats.map((s, i) => (
          <div
            key={i}
            className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6"
          >
            <div className="text-3xl font-bold text-indigo-300">{s.value}</div>
            <div className="text-gray-400 text-sm mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
