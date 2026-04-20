export default function SearchFilterBar({ search, setSearch, group, setGroup, status, setStatus }) {
  return (
    <div className="filters card">
      <input placeholder="Cari nama/unit/jabatan" value={search} onChange={(e) => setSearch(e.target.value)} />
      <select value={group} onChange={(e) => setGroup(e.target.value)}><option value="">Semua Kelompok</option><option>Direksi</option><option>Pengelola</option><option>Nakes</option></select>
      <select value={status} onChange={(e) => setStatus(e.target.value)}><option value="">Semua Status</option><option>Aktif</option><option>Nonaktif</option></select>
    </div>
  );
}
