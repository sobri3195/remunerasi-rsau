import { NavLink, useLocation } from 'react-router-dom';

const steps = [
  { to: '/input-rs', label: '1. Input RS', help: 'Tetapkan periode, revenue, dan alokasi pool.' },
  { to: '/employees', label: '2. Simulasi Pegawai', help: 'Kelola data pegawai dan parameter FFS.' },
  { to: '/iki-iku', label: '3. IKI & IKU', help: 'Atur performa unit dan individual.' },
  { to: '/rekap', label: '4. Rekap', help: 'Review hasil final distribusi remunerasi.' }
];

export default function FlowGuide() {
  const { pathname } = useLocation();
  const activeIndex = Math.max(steps.findIndex((item) => pathname === item.to), 0);

  return (
    <section className="flow-guide card">
      <div className="flow-guide-head">
        <strong>Flow Simulasi</strong>
        <span className="badge">Langkah {activeIndex + 1} dari {steps.length}</span>
      </div>
      <div className="flow-items">
        {steps.map((item, index) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `flow-item ${isActive ? 'active' : ''} ${index <= activeIndex ? 'passed' : ''}`}
          >
            <span className="flow-label">{item.label}</span>
            <small>{item.help}</small>
          </NavLink>
        ))}
      </div>
    </section>
  );
}
