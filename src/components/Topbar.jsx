export default function Topbar({ title, onToggleSidebar, onToggleCollapse }) {
  return (
    <header className="topbar">
      <div>
        <button onClick={onToggleSidebar} className="btn ghost">☰</button>
        <button onClick={onToggleCollapse} className="btn ghost">⇤</button>
      </div>
      <h1>{title}</h1>
    </header>
  );
}
