export default function StatCard({ title, value, subtitle }) {
  return <div className="card stat"><p>{title}</p><h3>{value}</h3><small>{subtitle}</small></div>;
}
