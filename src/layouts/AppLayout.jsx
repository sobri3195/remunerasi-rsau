import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import Toast from '../components/Toast';
import FlowGuide from '../components/FlowGuide';
import { useAppContext } from '../context/AppContext';

const titles = {
  '/': 'Dashboard', '/input-rs': 'Input RS', '/employees': 'Simulasi Pegawai', '/iki-iku': 'IKI & IKU', '/job-value': 'Job Value', '/rekap': 'Rekap', '/sources': 'Sumber Acuan', '/settings': 'Pengaturan'
};

export default function AppLayout() {
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const { pathname } = useLocation();
  const { toast } = useAppContext();

  return (
    <div className="app-shell">
      <Sidebar open={open} collapsed={collapsed} onClose={() => setOpen(false)} />
      {open && <button className="sidebar-backdrop" onClick={() => setOpen(false)} aria-label="Tutup navigasi" />}
      <div className="main">
        <Topbar
          title={titles[pathname] || 'Remunerasi'}
          onToggleSidebar={() => setOpen((o) => !o)}
          onToggleCollapse={() => setCollapsed((c) => !c)}
        />
        <main className="content">
          <FlowGuide />
          <Outlet />
        </main>
      </div>
      <Toast toast={toast} />
    </div>
  );
}
