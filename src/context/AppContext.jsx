import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { seedEmployees, seedIKI, seedInputRS, seedJobValue, seedReferences, seedSettings, STORAGE_KEYS } from '../data/seeds';
import { loadFromStorage, saveToStorage } from '../utils/storage';
import { calculateEmployeeRemuneration, calculateInputRS, calculateRekap } from '../utils/calculations';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);
  const [settings, setSettings] = useState(seedSettings);
  const [inputRS, setInputRS] = useState(seedInputRS);
  const [employees, setEmployees] = useState(seedEmployees);
  const [iki, setIki] = useState(seedIKI);
  const [jobValueFactors, setJobValueFactors] = useState(seedJobValue);
  const [sources, setSources] = useState(seedReferences);

  useEffect(() => {
    setSettings(loadFromStorage(STORAGE_KEYS.settings, seedSettings));
    setInputRS(loadFromStorage(STORAGE_KEYS.inputRS, seedInputRS));
    setEmployees(loadFromStorage(STORAGE_KEYS.employees, seedEmployees));
    setIki(loadFromStorage(STORAGE_KEYS.iki, seedIKI));
    setJobValueFactors(loadFromStorage(STORAGE_KEYS.jobValue, seedJobValue));
    setSources(loadFromStorage(STORAGE_KEYS.sources, seedReferences));
    setLoading(false);
  }, []);

  useEffect(() => saveToStorage(STORAGE_KEYS.settings, settings), [settings]);
  useEffect(() => saveToStorage(STORAGE_KEYS.inputRS, inputRS), [inputRS]);
  useEffect(() => saveToStorage(STORAGE_KEYS.employees, employees), [employees]);
  useEffect(() => saveToStorage(STORAGE_KEYS.iki, iki), [iki]);
  useEffect(() => saveToStorage(STORAGE_KEYS.jobValue, jobValueFactors), [jobValueFactors]);
  useEffect(() => saveToStorage(STORAGE_KEYS.sources, sources), [sources]);

  useEffect(() => {
    document.body.dataset.theme = settings.theme;
  }, [settings.theme]);

  const inputRsCalc = useMemo(() => calculateInputRS(inputRS), [inputRS]);
  const employeesCalculated = useMemo(() => calculateEmployeeRemuneration(employees, inputRsCalc), [employees, inputRsCalc]);
  const rekap = useMemo(() => calculateRekap(employeesCalculated, inputRsCalc), [employeesCalculated, inputRsCalc]);

  const notify = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const resetAll = () => {
    setSettings(seedSettings);
    setInputRS(seedInputRS);
    setEmployees(seedEmployees);
    setIki(seedIKI);
    setJobValueFactors(seedJobValue);
    setSources(seedReferences);
    notify('Seluruh data berhasil direset');
  };

  const value = {
    loading,
    toast,
    notify,
    settings,
    setSettings,
    inputRS,
    setInputRS,
    employees,
    setEmployees,
    iki,
    setIki,
    jobValueFactors,
    setJobValueFactors,
    sources,
    setSources,
    inputRsCalc,
    employeesCalculated,
    rekap,
    resetAll
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export const useAppContext = () => useContext(AppContext);
