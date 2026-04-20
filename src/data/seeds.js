export const STORAGE_KEYS = {
  settings: 'remun_app_settings',
  inputRS: 'remun_input_rs',
  employees: 'remun_employees',
  iki: 'remun_iki',
  jobValue: 'remun_jobvalue',
  sources: 'remun_sources'
};

export const seedSettings = {
  hospitalName: 'RSAU Simulasi',
  simulationName: 'Simulasi Remunerasi Bulanan',
  theme: 'light',
  currency: 'IDR'
};

export const seedInputRS = {
  periode: '2026-04',
  revenueJKN: 2500000000,
  revenueNonJKN: 900000000,
  poolPercentJKN: 20,
  poolPercentNonJKN: 15,
  p2Direksi: 15,
  p2Pengelola: 30,
  p2Nakes: 55
};

export const seedIKI = {
  grades: [
    { label: 'Sangat Baik', value: 1.1 },
    { label: 'Baik', value: 1.0 },
    { label: 'Cukup', value: 0.9 },
    { label: 'Kurang', value: 0.8 }
  ],
  indicators: [
    { id: 1, name: 'Kehadiran / jam praktik', weight: 25, score: 92, note: '' },
    { id: 2, name: 'Ketepatan waktu layanan', weight: 20, score: 88, note: '' },
    { id: 3, name: 'Kelengkapan RM/RME', weight: 20, score: 90, note: '' },
    { id: 4, name: 'Produktivitas', weight: 20, score: 85, note: '' },
    { id: 5, name: 'Kepatuhan administrasi', weight: 15, score: 95, note: '' }
  ]
};

export const seedJobValue = [
  { id: 1, factor: 'Kompetensi / spesialisasi', weight: 0.25, scale: 5, description: 'Kompetensi klinis dan sertifikasi' },
  { id: 2, factor: 'Risiko klinis', weight: 0.2, scale: 5, description: 'Paparan risiko pasien' },
  { id: 3, factor: 'Kompleksitas kasus', weight: 0.2, scale: 5, description: 'Kerumitan kasus' },
  { id: 4, factor: 'Jabatan manajerial', weight: 0.15, scale: 5, description: 'Kewenangan dan koordinasi' },
  { id: 5, factor: 'Masa kerja / loyalitas', weight: 0.1, scale: 5, description: 'Pengalaman berkelanjutan' },
  { id: 6, factor: 'FTE / komitmen waktu', weight: 0.1, scale: 5, description: 'Jam kerja efektif' }
];

export const seedReferences = [
  { id: 1, document: 'Panduan remunerasi dokter', concept: 'Skema P1 dan P2', summary: 'Pedoman pembagian komponen tetap dan variabel', notes: 'Acuan internal' },
  { id: 2, document: 'Juknis remunerasi rumah sakit', concept: 'Aturan alokasi pool', summary: 'Batasan alokasi per kelompok pegawai', notes: 'Perlu validasi periodik' },
  { id: 3, document: 'Benchmark job value', concept: 'Pembobotan faktor jabatan', summary: 'Benchmark faktor kompetensi dan risiko', notes: 'Untuk analisis hybrid' },
  { id: 4, document: 'Contoh formula P1/P2/IKI/IKU', concept: 'Rumus simulasi', summary: 'Contoh formula spreadsheet lama', notes: 'Migrasi ke aplikasi' }
];

export const seedEmployees = [
  { id: 'EMP001', name: 'dr. Andi Pratama', group: 'Direksi', position: 'Direktur Medis', unit: 'Direksi', status: 'Aktif', baseSalary: 35000000, fixedRemun: 12000000, ffsScore: 95, iki: 1.1, notes: '', competency: 5, risk: 4, complexity: 5, tenure: 12 },
  { id: 'EMP002', name: 'Sinta Maharani', group: 'Pengelola', position: 'Kepala Keuangan', unit: 'Keuangan', status: 'Aktif', baseSalary: 18000000, fixedRemun: 5500000, ffsScore: 87, iki: 1.0, notes: '', competency: 4, risk: 3, complexity: 4, tenure: 8 },
  { id: 'EMP003', name: 'dr. Budi Kurnia', group: 'Nakes', position: 'Spesialis Bedah', unit: 'Bedah', status: 'Aktif', baseSalary: 25000000, fixedRemun: 9000000, ffsScore: 98, iki: 1.1, notes: '', competency: 5, risk: 5, complexity: 5, tenure: 10 },
  { id: 'EMP004', name: 'Rina Kusuma', group: 'Nakes', position: 'Perawat Senior', unit: 'Rawat Inap', status: 'Aktif', baseSalary: 9000000, fixedRemun: 2500000, ffsScore: 84, iki: 1.0, notes: '', competency: 4, risk: 3, complexity: 3, tenure: 7 },
  { id: 'EMP005', name: 'Ahmad Fauzi', group: 'Pengelola', position: 'Staf SDM', unit: 'SDM', status: 'Nonaktif', baseSalary: 7000000, fixedRemun: 1800000, ffsScore: 72, iki: 0.9, notes: 'Cuti panjang', competency: 3, risk: 2, complexity: 2, tenure: 4 }
];
