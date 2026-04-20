import { useMemo, useState } from 'react';
import DataTable from '../components/DataTable';
import SearchFilterBar from '../components/SearchFilterBar';
import EmployeeFormModal from '../components/EmployeeFormModal';
import ConfirmModal from '../components/ConfirmModal';
import { useAppContext } from '../context/AppContext';
import { formatCurrencyIDR } from '../utils/formatters';
import { seedEmployees } from '../data/seeds';

export default function EmployeesPage() {
  const { employees, setEmployees, employeesCalculated, notify } = useAppContext();
  const [search, setSearch] = useState(''); const [group, setGroup] = useState(''); const [status, setStatus] = useState('');
  const [editing, setEditing] = useState(null); const [deleteId, setDeleteId] = useState(null);
  const rows = useMemo(() => employeesCalculated.filter((e) => {
    const hit = `${e.name} ${e.unit} ${e.position}`.toLowerCase().includes(search.toLowerCase());
    return hit && (!group || e.group === group) && (!status || e.status === status);
  }), [employeesCalculated, search, group, status]);

  const saveEmployee = (emp) => {
    setEmployees((prev) => {
      const idx = prev.findIndex((x) => x.id === emp.id);
      if (idx >= 0) { const copy = [...prev]; copy[idx] = emp; return copy; }
      return [...prev, emp];
    });
    setEditing(null); notify('Data pegawai disimpan');
  };

  return <div className="grid gap">
    <SearchFilterBar search={search} setSearch={setSearch} group={group} setGroup={setGroup} status={status} setStatus={setStatus} />
    <div className="row">
      <button className="btn primary" onClick={() => setEditing({})}>Tambah</button>
      <button className="btn" onClick={() => { setEmployees(seedEmployees); notify('Seed data diimport'); }}>Import seed</button>
      <button className="btn" onClick={() => { const blob = new Blob([JSON.stringify(employees, null, 2)]); const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'employees.json'; a.click(); }}>Export</button>
    </div>
    <DataTable columns={[
      { key: 'id', label: 'ID' }, { key: 'name', label: 'Nama' }, { key: 'group', label: 'Kelompok' }, { key: 'status', label: 'Status' },
      { key: 'ffsScore', label: 'FFS' }, { key: 'p2Individual', label: 'P2', render: (r) => formatCurrencyIDR(r.p2Individual) },
      { key: 'totalRemuneration', label: 'Total', render: (r) => formatCurrencyIDR(r.totalRemuneration) },
      { key: 'action', label: 'Aksi', render: (r) => <div className='row'><button className='btn' onClick={() => setEditing(r)}>Edit</button><button className='btn danger' onClick={() => setDeleteId(r.id)}>Hapus</button></div> }
    ]} rows={rows} />
    <EmployeeFormModal open={editing !== null} employee={editing?.id ? editing : null} onClose={() => setEditing(null)} onSave={saveEmployee} />
    <ConfirmModal open={!!deleteId} title="Hapus pegawai?" onClose={() => setDeleteId(null)} onConfirm={() => { setEmployees((p) => p.filter((e) => e.id !== deleteId)); setDeleteId(null); notify('Pegawai dihapus'); }} />
  </div>;
}
