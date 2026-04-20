import { NavLink } from 'react-router-dom';

const menus = [
  ['/', 'Dashboard'],
  ['/input-rs', 'Input RS'],
  ['/employees', 'Simulasi Pegawai'],
  ['/iki-iku', 'IKI & IKU'],
  ['/job-value', 'Job Value'],
  ['/rekap', 'Rekap'],
  ['/sources', 'Sumber Acuan'],
  ['/settings', 'Pengaturan']
];

export default function Sidebar({ open, onClose, collapsed }) {
  return (
    <aside className={`sidebar ${open ? 'open' : ''} ${collapsed ? 'collapsed' : ''}`}>
      <div className="brand-wrap">
        <img src="/logo-remunerasi.svg" alt="Logo Remunerasi RS" className="brand-logo" />
        <div className="brand-text">
          <strong className="brand">Remunerasi RS</strong>
          <small>Simulasi distribusi remun</small>
        </div>
      </div>
      {menus.map(([to, label]) => (
        <NavLink key={to} to={to} onClick={onClose} className={({ isActive }) => `menu ${isActive ? 'active' : ''}`}>
          {label}
        </NavLink>
      ))}
    </aside>
  );
}
