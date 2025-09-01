import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Calendar, 
  FileText, 
  Heart, 
  Activity, 
  Clock, 
  Plus, 
  MessageSquare, 
  Pill,
  MapPin,
  BookOpen,
  CreditCard
} from 'lucide-react';
import { mockPatients, mockAppointments, firstAidGuides } from '@/data/mockData';
import AppointmentBooking from './AppointmentBooking';

interface PatientDashboardProps {
  currentPatient: any;
}

const PatientDashboard: React.FC<PatientDashboardProps> = ({ currentPatient }) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showBooking, setShowBooking] = useState(false);

  const patient = mockPatients.find(p => p.id === '1') || mockPatients[0];
  const upcomingAppointments = mockAppointments.filter(
    apt => apt.patientId === '1' && apt.status === 'upcoming'
  );
  const pastAppointments = mockAppointments.filter(
    apt => apt.patientId === '1' && apt.status === 'completed'
  );

  const sidebarItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'appointments', label: 'Appointments', icon: Calendar },
    { id: 'records', label: 'My Records', icon: FileText },
    { id: 'first-aid', label: 'First-Aid Guide', icon: Heart },
    { id: 'wellness', label: 'Health & Wellness Hub', icon: BookOpen },
    { id: 'nearby', label: 'Find Nearby Care', icon: MapPin },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  const renderDashboard = () => (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Good Morning, {patient.name}!</h2>
        <p className="text-muted-foreground">Here's your health overview for today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Upcoming Appointment */}
        <Card className="medical-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary" />
              Next Appointment
            </CardTitle>
          </CardHeader>
          <CardContent>
            {upcomingAppointments.length > 0 ? (
              <div className="space-y-2">
                <p className="font-medium">{upcomingAppointments[0].date}</p>
                <p className="text-sm text-muted-foreground">{upcomingAppointments[0].time}</p>
                <p className="text-sm">{upcomingAppointments[0].reason}</p>
                <Badge variant="secondary">{upcomingAppointments[0].clinicianName}</Badge>
              </div>
            ) : (
              <p className="text-muted-foreground">No upcoming appointments</p>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="medical-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button 
              className="w-full justify-start medical-button-primary"
              onClick={() => setShowBooking(true)}
            >
              <Plus className="w-4 h-4 mr-2" />
              Book Appointment
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Pill className="w-4 h-4 mr-2" />
              Request Refill
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <MessageSquare className="w-4 h-4 mr-2" />
              Message Doctor
            </Button>
          </CardContent>
        </Card>

        {/* Health Vitals */}
        <Card className="medical-card">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center">
              <Activity className="w-5 h-5 mr-2 text-primary" />
              My Health Vitals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Blood Pressure</span>
              <span className="font-medium">{patient.vitals.bloodPressure}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Heart Rate</span>
              <span className="font-medium">{patient.vitals.heartRate} bpm</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Weight</span>
              <span className="font-medium">{patient.vitals.weight} kg</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Temperature</span>
              <span className="font-medium">{patient.vitals.temperature}°F</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderAppointments = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">My Appointments</h2>
        <Button 
          className="medical-button-primary"
          onClick={() => setShowBooking(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Book New
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upcoming Appointments */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle>Upcoming</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {upcomingAppointments.map((apt) => (
              <div key={apt.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{apt.clinicianName}</h4>
                  <Badge variant="secondary">{apt.type}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{apt.date} at {apt.time}</p>
                <p className="text-sm">{apt.reason}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Past Appointments */}
        <Card className="medical-card">
          <CardHeader>
            <CardTitle>Past Appointments</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {pastAppointments.map((apt) => (
              <div key={apt.id} className="p-4 border rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{apt.clinicianName}</h4>
                  <Badge variant="outline">{apt.status}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-1">{apt.date} at {apt.time}</p>
                <p className="text-sm">{apt.reason}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderFirstAid = () => (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">First-Aid Guide</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {firstAidGuides.map((guide) => (
          <Card key={guide.id} className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <span className="text-2xl mr-3">{guide.icon}</span>
                {guide.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ol className="space-y-2">
                {guide.steps.map((step, index) => (
                  <li key={index} className="text-sm">
                    <span className="font-medium text-primary">{index + 1}.</span> {step}
                  </li>
                ))}
              </ol>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'appointments':
        return renderAppointments();
      case 'first-aid':
        return renderFirstAid();
      case 'records':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">My Medical Records</h2>
            <Card className="medical-card">
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center">Medical records feature coming soon.</p>
              </CardContent>
            </Card>
          </div>
        );
      case 'wellness':
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">Health & Wellness Hub</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle>Symptom Checker</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Check your symptoms and get guidance.</p>
                  <Button className="w-full medical-button-primary">Start Check</Button>
                </CardContent>
              </Card>
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle>Pill Reminder</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Manage your medications.</p>
                  <Button className="w-full medical-button-primary">Set Reminders</Button>
                </CardContent>
              </Card>
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle>Health Articles</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Read curated health content.</p>
                  <Button className="w-full medical-button-primary">Browse Articles</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        );
      default:
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold">{sidebarItems.find(item => item.id === activeTab)?.label}</h2>
            <Card className="medical-card">
              <CardContent className="p-6">
                <p className="text-muted-foreground text-center">This feature is coming soon.</p>
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border">
        <div className="p-6">
          <h1 className="text-xl font-bold text-primary">MediConnect</h1>
          <p className="text-sm text-muted-foreground">Patient Portal</p>
        </div>
        <nav className="px-4 space-y-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`medical-nav-item w-full ${activeTab === item.id ? 'active' : ''}`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {renderContent()}
        </div>
      </div>

      {/* Appointment Booking Modal */}
      {showBooking && (
        <AppointmentBooking onClose={() => setShowBooking(false)} />
      )}
    </div>
  );
};

export default PatientDashboard;