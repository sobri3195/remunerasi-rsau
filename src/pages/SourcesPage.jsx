import DataTable from '../components/DataTable';
import { useAppContext } from '../context/AppContext';

export default function SourcesPage() {
  const { sources } = useAppContext();
  return <DataTable columns={[{ key: 'id', label: 'No' }, { key: 'document', label: 'Nama Dokumen' }, { key: 'concept', label: 'Konsep' }, { key: 'summary', label: 'Ringkasan' }, { key: 'notes', label: 'Catatan' }]} rows={sources} />;
}
