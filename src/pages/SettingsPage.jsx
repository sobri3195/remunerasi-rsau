import { useAppContext } from '../context/AppContext';
import { seedEmployees, seedInputRS, seedJobValue, seedReferences, seedSettings } from '../data/seeds';

export default function SettingsPage() {
  const { settings, setSettings, setEmployees, setInputRS, setJobValueFactors, setSources, resetAll, notify, employees, inputRS, iki, jobValueFactors, sources } = useAppContext();

  const exportAll = () => {
    const payload = { settings, employees, inputRS, iki, jobValueFactors, sources };
    const blob = new Blob([JSON.stringify(payload, null, 2)]);
    const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = 'remunerasi-backup.json'; a.click();
  };

  const importAll = (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (data.settings) setSettings(data.settings);
        if (data.employees) setEmployees(data.employees);
        if (data.inputRS) setInputRS(data.inputRS);
        if (data.jobValueFactors) setJobValueFactors(data.jobValueFactors);
        if (data.sources) setSources(data.sources);
        notify('Import data berhasil');
      } catch { notify('Import gagal', 'error'); }
    };
    reader.readAsText(file);
  };

  return <div className='grid gap'>
    <div className='card grid2'>
      <input value={settings.hospitalName} onChange={(e) => setSettings((p) => ({ ...p, hospitalName: e.target.value }))} placeholder='Nama RS' />
      <input value={settings.simulationName} onChange={(e) => setSettings((p) => ({ ...p, simulationName: e.target.value }))} placeholder='Nama Simulasi' />
      <select value={settings.theme} onChange={(e) => setSettings((p) => ({ ...p, theme: e.target.value }))}><option value='light'>Light</option><option value='dark'>Dark</option></select>
      <button className='btn' onClick={exportAll}>Export JSON</button>
      <input type='file' accept='application/json' onChange={(e) => e.target.files?.[0] && importAll(e.target.files[0])} />
    </div>
    <div className='row'>
      <button className='btn' onClick={() => { setSettings(seedSettings); setInputRS(seedInputRS); setEmployees(seedEmployees); setJobValueFactors(seedJobValue); setSources(seedReferences); notify('Seed default direstore'); }}>Restore Seed</button>
      <button className='btn danger' onClick={resetAll}>Reset Semua Data</button>
    </div>
  </div>;
}
