import { Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from '../layouts/AppLayout';
import DashboardPage from '../pages/DashboardPage';
import InputRSPage from '../pages/InputRSPage';
import EmployeesPage from '../pages/EmployeesPage';
import IKIIKUPage from '../pages/IKIIKUPage';
import JobValuePage from '../pages/JobValuePage';
import RekapPage from '../pages/RekapPage';
import SourcesPage from '../pages/SourcesPage';
import SettingsPage from '../pages/SettingsPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/input-rs" element={<InputRSPage />} />
        <Route path="/employees" element={<EmployeesPage />} />
        <Route path="/iki-iku" element={<IKIIKUPage />} />
        <Route path="/job-value" element={<JobValuePage />} />
        <Route path="/rekap" element={<RekapPage />} />
        <Route path="/sources" element={<SourcesPage />} />
        <Route path="/settings" element={<SettingsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
