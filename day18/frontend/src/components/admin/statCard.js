export default function StatCard({ title, value, color }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5 shadow-lg">
      <p className="text-sm text-gray-400">{title}</p>
      <h2 className={`text-3xl font-bold mt-2 ${color}`}>{value}</h2>
    </div>
  );
}
