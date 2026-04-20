import { useState, useEffect } from 'react';

const initial = { id: '', name: '', group: 'Nakes', position: '', unit: '', status: 'Aktif', baseSalary: 0, fixedRemun: 0, ffsScore: 80, iki: 1, notes: '' };

export default function EmployeeFormModal({ open, onClose, onSave, employee }) {
  const [form, setForm] = useState(initial);
  useEffect(() => setForm(employee || { ...initial, id: `EMP${Date.now().toString().slice(-6)}` }), [employee]);
  if (!open) return null;
  const set = (k, v) => setForm((p) => ({ ...p, [k]: v }));
  return (
    <div className="modal-backdrop"><div className="modal large"><h3>{employee ? 'Edit' : 'Tambah'} Pegawai</h3>
      <div className="grid2">
        <input value={form.id} onChange={(e) => set('id', e.target.value)} placeholder="ID" />
        <input value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Nama" />
        <select value={form.group} onChange={(e) => set('group', e.target.value)}><option>Direksi</option><option>Pengelola</option><option>Nakes</option></select>
        <input value={form.position} onChange={(e) => set('position', e.target.value)} placeholder="Jabatan" />
        <input value={form.unit} onChange={(e) => set('unit', e.target.value)} placeholder="Unit" />
        <select value={form.status} onChange={(e) => set('status', e.target.value)}><option>Aktif</option><option>Nonaktif</option></select>
        <input type="number" value={form.baseSalary} onChange={(e) => set('baseSalary', Number(e.target.value))} placeholder="Gaji Pokok" />
        <input type="number" value={form.fixedRemun} onChange={(e) => set('fixedRemun', Number(e.target.value))} placeholder="Remun Tetap" />
        <input type="number" value={form.ffsScore} onChange={(e) => set('ffsScore', Number(e.target.value))} placeholder="Skor FFS" />
        <input type="number" step="0.1" value={form.iki} onChange={(e) => set('iki', Number(e.target.value))} placeholder="IKI" />
      </div>
      <textarea value={form.notes} onChange={(e) => set('notes', e.target.value)} placeholder="Catatan" />
      <div className="row"><button className="btn primary" onClick={() => onSave(form)}>Simpan</button><button className="btn" onClick={onClose}>Batal</button></div>
    </div></div>
  );
}
