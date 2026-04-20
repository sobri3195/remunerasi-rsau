import StatCard from '../components/StatCard';
import DataTable from '../components/DataTable';
import HealthIndicator from '../components/HealthIndicator';
import { useAppContext } from '../context/AppContext';
import { formatCurrencyIDR } from '../utils/formatters';

export default function DashboardPage() {
  const { inputRsCalc, employeesCalculated, rekap } = useAppContext();
  const activeCount = employeesCalculated.filter((e) => e.status === 'Aktif').length;
  const topRemun = [...employeesCalculated].sort((a, b) => b.totalRemuneration - a.totalRemuneration).slice(0, 5);
  const topFfs = [...employeesCalculated].sort((a, b) => b.ffsScore - a.ffsScore).slice(0, 5);

  return <div className="grid gap">
    <div className="grid cards-3">
      <StatCard title="Total Revenue" value={formatCurrencyIDR(inputRsCalc.totalRevenue)} />
      <StatCard title="Pool P2" value={formatCurrencyIDR(inputRsCalc.totalPoolP2)} />
      <StatCard title="Total P1" value={formatCurrencyIDR(rekap.totalP1)} subtitle={`Pegawai aktif: ${activeCount}`} />
      <StatCard title="P2 Terdistribusi" value={formatCurrencyIDR(rekap.totalP2Distributed)} />
      <StatCard title="Grand Total" value={formatCurrencyIDR(rekap.grandTotal)} />
      <StatCard title="Health Check" value={<HealthIndicator diff={rekap.difference} />} subtitle={`Selisih ${formatCurrencyIDR(rekap.difference)}`} />
    </div>
    <DataTable columns={[{ key: 'name', label: 'Top Remunerasi' }, { key: 'totalRemuneration', label: 'Total', render: (r) => formatCurrencyIDR(r.totalRemuneration) }]} rows={topRemun} />
    <DataTable columns={[{ key: 'name', label: 'Top FFS' }, { key: 'ffsScore', label: 'Skor FFS' }]} rows={topFfs} />
  </div>;
}
