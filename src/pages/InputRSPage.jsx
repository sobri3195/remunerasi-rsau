import { useAppContext } from '../context/AppContext';
import { calculateInputRS, validateAllocation } from '../utils/calculations';
import { formatCurrencyIDR } from '../utils/formatters';
import { seedInputRS } from '../data/seeds';

export default function InputRSPage() {
  const { inputRS, setInputRS, notify } = useAppContext();
  const calc = calculateInputRS(inputRS);
  const alloc = validateAllocation(inputRS);
  const set = (k, v) => setInputRS((p) => ({ ...p, [k]: v }));

  return <div className="grid gap">
    <div className="card grid2">
      <input type="month" value={inputRS.periode} onChange={(e) => set('periode', e.target.value)} />
      {['revenueJKN', 'revenueNonJKN', 'poolPercentJKN', 'poolPercentNonJKN', 'p2Direksi', 'p2Pengelola', 'p2Nakes'].map((k) => (
        <input key={k} type="number" min={0} value={inputRS[k]} onChange={(e) => set(k, Number(e.target.value))} placeholder={k} />
      ))}
      {!alloc.isValid && <div className="badge yellow">Warning: total alokasi {alloc.total}% belum 100%</div>}
      <div className="row"><button className="btn" onClick={() => { setInputRS(seedInputRS); notify('Reset ke default'); }}>Reset Default</button></div>
    </div>
    <div className="card">
      <p>Total Revenue: {formatCurrencyIDR(calc.totalRevenue)}</p><p>Total Pool P2: {formatCurrencyIDR(calc.totalPoolP2)}</p>
      <p>Pool Direksi: {formatCurrencyIDR(calc.poolDireksi)}</p><p>Pool Pengelola: {formatCurrencyIDR(calc.poolPengelola)}</p><p>Pool Nakes: {formatCurrencyIDR(calc.poolNakes)}</p>
    </div>
  </div>;
}
