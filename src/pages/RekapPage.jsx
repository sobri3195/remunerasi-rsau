import DataTable from '../components/DataTable';
import SummaryCard from '../components/SummaryCard';
import HealthIndicator from '../components/HealthIndicator';
import { useAppContext } from '../context/AppContext';
import { formatCurrencyIDR } from '../utils/formatters';

export default function RekapPage() {
  const { rekap, employeesCalculated, inputRsCalc } = useAppContext();
  return <div className='grid gap'>
    <div className='grid cards-3'>
      <SummaryCard label='Total P1' value={formatCurrencyIDR(rekap.totalP1)} />
      <SummaryCard label='Total Pool P2' value={formatCurrencyIDR(rekap.totalPoolP2)} />
      <SummaryCard label='Grand Total' value={formatCurrencyIDR(rekap.grandTotal)} />
    </div>
    <div className='card'>Selisih Distribusi: {formatCurrencyIDR(rekap.difference)} <HealthIndicator diff={rekap.difference} /></div>
    <DataTable columns={[{ key: 'group', label: 'Kelompok' }, { key: 'activeCount', label: 'Pegawai Aktif' }, { key: 'totalP1', label: 'Total P1', render: (r) => formatCurrencyIDR(r.totalP1) }, { key: 'totalP2', label: 'Total P2', render: (r) => formatCurrencyIDR(r.totalP2) }, { key: 'totalRemuneration', label: 'Total', render: (r) => formatCurrencyIDR(r.totalRemuneration) }]} rows={Object.entries(rekap.byGroup).map(([group, data]) => ({ group, ...data }))} />
    <DataTable columns={[{ key: 'name', label: 'Top 10 Remunerasi' }, { key: 'totalRemuneration', label: 'Total', render: (r) => formatCurrencyIDR(r.totalRemuneration) }]} rows={[...employeesCalculated].sort((a,b)=>b.totalRemuneration-a.totalRemuneration).slice(0,10)} />
    <div className='card'>Pool Direksi: {formatCurrencyIDR(inputRsCalc.poolDireksi)} | Pengelola: {formatCurrencyIDR(inputRsCalc.poolPengelola)} | Nakes: {formatCurrencyIDR(inputRsCalc.poolNakes)}</div>
  </div>;
}
