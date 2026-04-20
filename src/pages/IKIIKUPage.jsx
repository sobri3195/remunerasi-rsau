import DataTable from '../components/DataTable';
import { useAppContext } from '../context/AppContext';

export default function IKIIKUPage() {
  const { iki } = useAppContext();
  const indicators = iki.indicators.map((x) => ({ ...x, weighted: (x.weight * x.score) / 100 }));
  const total = indicators.reduce((s, x) => s + x.weighted, 0);
  return <div className='grid gap'>
    <div className='card'>{iki.grades.map((g) => <span key={g.label} className='badge'>{g.label}: {g.value}</span>)}</div>
    <DataTable columns={[{ key: 'name', label: 'Indikator' }, { key: 'weight', label: 'Bobot' }, { key: 'score', label: 'Skor' }, { key: 'weighted', label: 'Skor Berbobot' }, { key: 'note', label: 'Catatan' }]} rows={indicators} />
    <div className='card'><strong>Total Skor Simulatif: {total.toFixed(2)}</strong></div>
  </div>;
}
