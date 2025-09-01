import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { 
  Calendar, 
  Clock, 
  User, 
  AlertTriangle, 
  MessageSquare, 
  FileText, 
  Activity,
  Heart,
  Thermometer,
  Weight,
  Stethoscope
} from 'lucide-react';
import { mockAppointments, mockPatients } from '@/data/mockData';

interface ClinicianDashboardProps {
  currentClinician: any;
}

const ClinicianDashboard: React.FC<ClinicianDashboardProps> = ({ currentClinician }) => {
  const [selectedPatient, setSelectedPatient] = useState<string | null>(null);
  const [newNote, setNewNote] = useState('');

  // Filter today's appointments for the clinician
  const todaysAppointments = mockAppointments.filter(
    apt => apt.clinicianId === '2' && apt.status === 'upcoming'
  );

  const selectedPatientData = selectedPatient 
    ? mockPatients.find(p => p.id === selectedPatient)
    : null;

  const urgentAlerts = [
    { id: 1, patient: 'John Davis', message: 'Critical lab results - High glucose levels', time: '2 hours ago' },
    { id: 2, patient: 'Emily Chen', message: 'Blood pressure reading outside normal range', time: '1 hour ago' }
  ];

  const pendingTasks = [
    { id: 1, task: 'Sign chart for Ananya Sharma', type: 'chart' },
    { id: 2, task: 'Approve prescription refill for John Davis', type: 'prescription' },
    { id: 3, task: 'Review lab results for Emily Chen', type: 'lab' }
  ];

  const patientMessages = [
    { id: 1, patient: 'Ananya Sharma', message: 'Question about medication side effects', time: '1 hour ago' },
    { id: 2, patient: 'John Davis', message: 'Requesting appointment rescheduling', time: '3 hours ago' }
  ];

  return (
    <div className="h-screen bg-background p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Clinician Dashboard</h1>
        <p className="text-muted-foreground">Welcome back, Dr. Sarah Wilson</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-140px)]">
        {/* Column 1: Today's Schedule */}
        <div className="space-y-4">
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Calendar className="w-5 h-5 mr-2 text-primary" />
                Today's Schedule
              </CardTitle>
              <CardDescription>
                {todaysAppointments.length} appointments scheduled
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {todaysAppointments.map((apt) => (
                <div
                  key={apt.id}
                  onClick={() => setSelectedPatient(apt.patientId)}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors hover:bg-accent ${
                    selectedPatient === apt.patientId ? 'bg-primary/10 border-primary' : ''
                  }`}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium">{apt.patientName}</h4>
                    <Badge variant="secondary" className="text-xs">
                      <Clock className="w-3 h-3 mr-1" />
                      {apt.time}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{apt.reason}</p>
                  <Badge variant="outline" className="mt-2">
                    {apt.type}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Column 2: Patient Chart Area */}
        <div className="space-y-4">
          {selectedPatientData ? (
            <>
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <User className="w-5 h-5 mr-2 text-primary" />
                    {selectedPatientData.name}
                  </CardTitle>
                  <CardDescription>
                    {selectedPatientData.age} years old • {selectedPatientData.gender} • {selectedPatientData.bloodType}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Vitals */}
                  <div>
                    <h4 className="font-medium mb-3 flex items-center">
                      <Activity className="w-4 h-4 mr-2" />
                      Current Vitals
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="flex items-center space-x-2">
                        <Heart className="w-4 h-4 text-destructive" />
                        <div>
                          <p className="text-xs text-muted-foreground">BP</p>
                          <p className="font-medium">{selectedPatientData.vitals.bloodPressure}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Activity className="w-4 h-4 text-primary" />
                        <div>
                          <p className="text-xs text-muted-foreground">HR</p>
                          <p className="font-medium">{selectedPatientData.vitals.heartRate} bpm</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Thermometer className="w-4 h-4 text-warning" />
                        <div>
                          <p className="text-xs text-muted-foreground">Temp</p>
                          <p className="font-medium">{selectedPatientData.vitals.temperature}°F</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Weight className="w-4 h-4 text-muted-foreground" />
                        <div>
                          <p className="text-xs text-muted-foreground">Weight</p>
                          <p className="font-medium">{selectedPatientData.vitals.weight} kg</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Conditions & Allergies */}
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-medium mb-2">Active Problems</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedPatientData.conditions.map((condition, index) => (
                          <Badge key={index} variant="destructive">{condition}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Allergies</h4>
                      <div className="flex flex-wrap gap-1">
                        {selectedPatientData.allergies.length > 0 ? (
                          selectedPatientData.allergies.map((allergy, index) => (
                            <Badge key={index} variant="destructive">{allergy}</Badge>
                          ))
                        ) : (
                          <span className="text-sm text-muted-foreground">No known allergies</span>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notes Section */}
              <Card className="medical-card">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="w-5 h-5 mr-2 text-primary" />
                    Clinical Notes
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea
                    placeholder="Add clinical notes for this patient..."
                    value={newNote}
                    onChange={(e) => setNewNote(e.target.value)}
                    rows={4}
                    className="mb-3"
                  />
                  <Button className="medical-button-primary">
                    Save Note
                  </Button>
                </CardContent>
              </Card>
            </>
          ) : (
            <Card className="medical-card">
              <CardContent className="p-12 text-center">
                <Stethoscope className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-medium mb-2">Select a Patient</h3>
                <p className="text-sm text-muted-foreground">
                  Click on a patient from today's schedule to view their chart
                </p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Column 3: Inbox & Tasks */}
        <div className="space-y-4">
          {/* Urgent Alerts */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center text-destructive">
                <AlertTriangle className="w-5 h-5 mr-2" />
                Urgent Alerts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {urgentAlerts.map((alert) => (
                <div key={alert.id} className="p-3 bg-destructive/10 border border-destructive/20 rounded-lg">
                  <h4 className="font-medium text-sm">{alert.patient}</h4>
                  <p className="text-xs text-muted-foreground mb-1">{alert.message}</p>
                  <p className="text-xs text-muted-foreground">{alert.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="w-5 h-5 mr-2 text-primary" />
                Pending Tasks
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {pendingTasks.map((task) => (
                <div key={task.id} className="flex items-center justify-between p-2 border rounded-lg">
                  <span className="text-sm">{task.task}</span>
                  <Button size="sm" variant="outline" className="text-xs">
                    Complete
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Patient Messages */}
          <Card className="medical-card">
            <CardHeader>
              <CardTitle className="flex items-center">
                <MessageSquare className="w-5 h-5 mr-2 text-primary" />
                Patient Messages
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {patientMessages.map((msg) => (
                <div key={msg.id} className="p-3 border rounded-lg">
                  <h4 className="font-medium text-sm">{msg.patient}</h4>
                  <p className="text-xs text-muted-foreground mb-1">{msg.message}</p>
                  <p className="text-xs text-muted-foreground">{msg.time}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ClinicianDashboard;