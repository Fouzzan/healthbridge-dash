import React, { useState } from 'react';
import LoginPage from '@/components/LoginPage';
import AuthPage from '@/components/AuthPage';
import PatientDashboard from '@/components/PatientDashboard';
import ClinicianDashboard from '@/components/ClinicianDashboard';
import AdminDashboard from '@/components/AdminDashboard';
import EmergencyButton from '@/components/EmergencyButton';
import { AuthProvider, useAuth } from '@/hooks/useAuth';

const AppContent = () => {
  const { user, loading } = useAuth();
  const [showAuth, setShowAuth] = useState<'signin' | 'signup' | null>(null);
  const [currentUser, setCurrentUser] = useState<{
    role: 'patient' | 'clinician' | 'admin' | null;
    id: string;
    name: string;
  }>({ role: null, id: '', name: '' });

  const handleLogin = (role: 'patient' | 'clinician' | 'admin') => {
    // Mock user data based on role
    const userData = {
      patient: { id: user?.id || '1', name: 'Patient User' },
      clinician: { id: user?.id || '2', name: 'Dr. Clinician' },
      admin: { id: user?.id || '3', name: 'Admin User' }
    };

    setCurrentUser({
      role,
      ...userData[role]
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    if (showAuth === 'signin' || showAuth === 'signup') {
      return <AuthPage onBack={() => setShowAuth(null)} />;
    }
    return (
      <LoginPage 
        onSignIn={() => setShowAuth('signin')}
        onSignUp={() => setShowAuth('signup')}
      />
    );
  }

  // Show role selection if user is authenticated but no role selected
  if (!currentUser.role) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-accent/10 flex items-center justify-center p-4">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Welcome!</h1>
            <p className="text-muted-foreground">Please select your role to continue</p>
          </div>
          <div className="space-y-3">
            <button
              onClick={() => handleLogin('patient')}
              className="w-full p-4 text-left border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="font-medium">Patient Portal</div>
              <div className="text-sm text-muted-foreground">Manage appointments, view records</div>
            </button>
            <button
              onClick={() => handleLogin('clinician')}
              className="w-full p-4 text-left border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="font-medium">Clinician Dashboard</div>
              <div className="text-sm text-muted-foreground">Patient management, schedules</div>
            </button>
            <button
              onClick={() => handleLogin('admin')}
              className="w-full p-4 text-left border rounded-lg hover:bg-accent transition-colors"
            >
              <div className="font-medium">Administrator Panel</div>
              <div className="text-sm text-muted-foreground">System management, analytics</div>
            </button>
          </div>
        </div>
      </div>
    );
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
        return null;
    }
  };

  return (
    <div className="relative">
      {renderDashboard()}
      <EmergencyButton userRole={currentUser.role} />
    </div>
  );
};

const Index = () => {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
};

export default Index;
