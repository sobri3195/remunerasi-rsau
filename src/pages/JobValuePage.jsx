import { useState } from 'react';
import DataTable from '../components/DataTable';
import { useAppContext } from '../context/AppContext';

export default function JobValuePage() {
  const { jobValueFactors } = useAppContext();
  const [scores, setScores] = useState({});
  const total = jobValueFactors.reduce((s, f) => s + (scores[f.id] || 0) * f.weight, 0);
  return <div className='grid gap'>
    <DataTable columns={[{ key: 'factor', label: 'Faktor' }, { key: 'weight', label: 'Bobot' }, { key: 'scale', label: 'Skala' }, { key: 'description', label: 'Deskripsi' }]} rows={jobValueFactors} />
    <div className='card grid2'>
      {jobValueFactors.map((f) => <label key={f.id}>{f.factor}<input type='number' min={1} max={5} value={scores[f.id] || ''} onChange={(e) => setScores((p) => ({ ...p, [f.id]: Number(e.target.value) }))} /></label>)}
      <strong>Preview Job Value: {total.toFixed(2)}</strong>
    </div>
  </div>;
}
