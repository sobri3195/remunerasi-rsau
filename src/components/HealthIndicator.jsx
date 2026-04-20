export default function HealthIndicator({ diff }) {
  const abs = Math.abs(diff);
  const status = abs < 1 ? 'green' : abs < 10000 ? 'yellow' : 'red';
  return <span className={`badge ${status}`}>{status === 'green' ? 'Sehat' : status === 'yellow' ? 'Perlu Cek' : 'Bermasalah'}</span>;
}
