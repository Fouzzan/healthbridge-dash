import React, { useState } from 'react';
import LoginPage from '@/components/LoginPage';
import PatientDashboard from '@/components/PatientDashboard';
import ClinicianDashboard from '@/components/ClinicianDashboard';
import AdminDashboard from '@/components/AdminDashboard';
import EmergencyButton from '@/components/EmergencyButton';

const Index = () => {
  const [currentUser, setCurrentUser] = useState<{
    role: 'patient' | 'clinician' | 'admin' | null;
    id: string;
    name: string;
  }>({ role: null, id: '', name: '' });

  const handleLogin = (role: 'patient' | 'clinician' | 'admin') => {
    // Mock user data based on role
    const userData = {
      patient: { id: '1', name: 'Ananya Sharma' },
      clinician: { id: '2', name: 'Dr. Sarah Wilson' },
      admin: { id: '3', name: 'Admin User' }
    };

    setCurrentUser({
      role,
      ...userData[role]
    });
  };

  const handleLogout = () => {
    setCurrentUser({ role: null, id: '', name: '' });
  };

  // Show login page if no user is logged in
  if (!currentUser.role) {
    return <LoginPage onLogin={handleLogin} />;
  }

  // Render appropriate dashboard based on user role
  const renderDashboard = () => {
    switch (currentUser.role) {
      case 'patient':
        return <PatientDashboard currentPatient={currentUser} />;
      case 'clinician':
        return <ClinicianDashboard currentClinician={currentUser} />;
      case 'admin':
        return <AdminDashboard currentAdmin={currentUser} />;
      default:
        return <LoginPage onLogin={handleLogin} />;
    }
  };

  return (
    <div className="relative">
      {renderDashboard()}
      <EmergencyButton userRole={currentUser.role} />
    </div>
  );
};

export default Index;
