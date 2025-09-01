import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  Users, 
  DollarSign, 
  FileText, 
  TrendingUp, 
  Clock,
  UserCheck,
  AlertCircle,
  Activity
} from 'lucide-react';
import { mockAppointments, mockClinicians, mockKPIs, mockPatients } from '@/data/mockData';

interface AdminDashboardProps {
  currentAdmin: any;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ currentAdmin }) => {
  const todaysAppointments = mockAppointments.filter(apt => apt.status === 'upcoming');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-success text-success-foreground';
      case 'busy':
        return 'bg-warning text-warning-foreground';
      case 'away':
        return 'bg-muted text-muted-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available':
        return <UserCheck className="w-4 h-4" />;
      case 'busy':
        return <Clock className="w-4 h-4" />;
      case 'away':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return <Activity className="w-4 h-4" />;
    }
  };

  return (
    <div className="h-screen bg-background p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Administrator Dashboard</h1>
        <p className="text-muted-foreground">System overview and operational management</p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <Card className="medical-stat-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Calendar className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockKPIs.totalAppointmentsToday}</p>
                <p className="text-sm text-muted-foreground">Appointments Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="medical-stat-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-success/10 rounded-lg">
                <UserCheck className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockKPIs.patientsCheckedIn}</p>
                <p className="text-sm text-muted-foreground">Patients Checked-In</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="medical-stat-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-medical-green/10 rounded-lg">
                <DollarSign className="w-6 h-6 text-success" />
              </div>
              <div>
                <p className="text-2xl font-bold">${mockKPIs.revenueToday.toLocaleString()}</p>
                <p className="text-sm text-muted-foreground">Revenue Today</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="medical-stat-card">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="p-2 bg-warning/10 rounded-lg">
                <FileText className="w-6 h-6 text-warning" />
              </div>
              <div>
                <p className="text-2xl font-bold">{mockKPIs.pendingClaims}</p>
                <p className="text-sm text-muted-foreground">Pending Claims</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Appointment Queue */}
        <div className="lg:col-span-2">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                Today's Appointment Queue
              </CardTitle>
              <CardDescription>
                Live view of all scheduled appointments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {todaysAppointments.map((apt) => (
                  <div key={apt.id} className="flex items-center justify-between p-3 border rounded-lg hover:bg-accent/50 transition-colors">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3">
                        <div className="flex-1">
                          <h4 className="font-medium">{apt.patientName}</h4>
                          <p className="text-sm text-muted-foreground">{apt.reason}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium">{apt.time}</p>
                          <p className="text-xs text-muted-foreground">{apt.clinicianName}</p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <Badge variant="secondary">{apt.type}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Doctor Status Panel */}
        <div>
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="w-5 h-5 mr-2 text-primary" />
                Doctor Status
              </CardTitle>
              <CardDescription>
                Current availability and workload
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {mockClinicians.map((doctor) => (
                <div key={doctor.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{doctor.name}</h4>
                    <p className="text-sm text-muted-foreground">{doctor.specialty}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {doctor.patientsToday} patients today
                    </p>
                  </div>
                  <Badge className={`${getStatusColor(doctor.status)} flex items-center space-x-1`}>
                    {getStatusIcon(doctor.status)}
                    <span className="capitalize">{doctor.status}</span>
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* System Stats */}
          <Card className="medical-card mt-6">
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 mr-2 text-primary" />
                System Statistics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span className="text-sm">Total Patients</span>
                <span className="font-medium">{mockPatients.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Active Clinicians</span>
                <span className="font-medium">{mockClinicians.filter(d => d.status !== 'away').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">System Uptime</span>
                <span className="font-medium text-success">99.9%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm">Server Load</span>
                <span className="font-medium">Low</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;