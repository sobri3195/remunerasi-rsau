export default function Topbar({ title, onToggleSidebar, onToggleCollapse }) {
  const today = new Date().toLocaleDateString('id-ID', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' });

  return (
    <header className="topbar card">
      <div className="row">
        <button onClick={onToggleSidebar} className="btn ghost icon-btn" aria-label="Buka menu">☰</button>
        <button onClick={onToggleCollapse} className="btn ghost icon-btn desktop-only" aria-label="Collapse menu">⇤</button>
        <div>
          <h1>{title}</h1>
          <small className="muted">{today}</small>
        </div>
      </div>
      <span className="badge green">Remunerasi Center</span>
    </header>
  );
}
