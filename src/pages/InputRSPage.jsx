import { useAppContext } from '../context/AppContext';
import { calculateInputRS, validateAllocation } from '../utils/calculations';
import { formatCurrencyIDR } from '../utils/formatters';
import { seedInputRS } from '../data/seeds';

const labels = {
  revenueJKN: 'Revenue JKN',
  revenueNonJKN: 'Revenue Non JKN',
  poolPercentJKN: 'Pool % JKN',
  poolPercentNonJKN: 'Pool % Non JKN',
  p2Direksi: 'Alokasi Direksi (%)',
  p2Pengelola: 'Alokasi Pengelola (%)',
  p2Nakes: 'Alokasi Nakes (%)'
};

export default function InputRSPage() {
  const { inputRS, setInputRS, notify } = useAppContext();
  const calc = calculateInputRS(inputRS);
  const alloc = validateAllocation(inputRS);
  const set = (k, v) => setInputRS((p) => ({ ...p, [k]: v }));

  return <div className="grid gap">
    <div className="card grid gap">
      <div className="section-head">
        <strong>Form Input RS</strong>
        <small className="muted">Lengkapi dari atas ke bawah agar perhitungan konsisten.</small>
      </div>
      <div className="grid2">
        <label className="field"><span>Periode</span><input type="month" value={inputRS.periode} onChange={(e) => set('periode', e.target.value)} /></label>
        {['revenueJKN', 'revenueNonJKN', 'poolPercentJKN', 'poolPercentNonJKN', 'p2Direksi', 'p2Pengelola', 'p2Nakes'].map((k) => (
          <label className="field" key={k}>
            <span>{labels[k]}</span>
            <input type="number" min={0} value={inputRS[k]} onChange={(e) => set(k, Number(e.target.value))} />
          </label>
        ))}
      </div>
      {!alloc.isValid && <div className="badge yellow">Warning: total alokasi {alloc.total}% belum 100%</div>}
      <div className="row"><button className="btn" onClick={() => { setInputRS(seedInputRS); notify('Reset ke default'); }}>Reset Default</button></div>
    </div>
    <div className="card">
      <div className="section-head">
        <strong>Ringkasan Otomatis</strong>
        <small className="muted">Pastikan total dan alokasi sudah sesuai kebijakan.</small>
      </div>
      <p>Total Revenue: {formatCurrencyIDR(calc.totalRevenue)}</p><p>Total Pool P2: {formatCurrencyIDR(calc.totalPoolP2)}</p>
      <p>Pool Direksi: {formatCurrencyIDR(calc.poolDireksi)}</p><p>Pool Pengelola: {formatCurrencyIDR(calc.poolPengelola)}</p><p>Pool Nakes: {formatCurrencyIDR(calc.poolNakes)}</p>
    </div>
  </div>;
}
