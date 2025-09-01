// Mock data for MediConnect application
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'clinician' | 'admin';
  avatar?: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  clinicianId: string;
  clinicianName: string;
  date: string;
  time: string;
  reason: string;
  status: 'upcoming' | 'completed' | 'cancelled';
  type: 'consultation' | 'checkup' | 'follow-up';
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: string;
  bloodType: string;
  allergies: string[];
  conditions: string[];
  vitals: {
    bloodPressure: string;
    heartRate: number;
    temperature: number;
    weight: number;
  };
  lastVisit: string;
  upcomingAppointment?: string;
}

export interface Clinician {
  id: string;
  name: string;
  specialty: string;
  status: 'available' | 'busy' | 'away';
  patientsToday: number;
}

// Mock Users
export const mockUsers: User[] = [
  { id: '1', name: 'Ananya Sharma', email: 'ananya@patient.com', role: 'patient' },
  { id: '2', name: 'Dr. Sarah Wilson', email: 'sarah@clinic.com', role: 'clinician' },
  { id: '3', name: 'Admin User', email: 'admin@mediconnect.com', role: 'admin' },
];

// Mock Patients
export const mockPatients: Patient[] = [
  {
    id: '1',
    name: 'Ananya Sharma',
    age: 28,
    gender: 'Female',
    bloodType: 'O+',
    allergies: ['Peanuts', 'Shellfish'],
    conditions: ['Hypertension'],
    vitals: {
      bloodPressure: '128/82',
      heartRate: 72,
      temperature: 98.6,
      weight: 65
    },
    lastVisit: '2024-08-15',
    upcomingAppointment: '2024-09-05'
  },
  {
    id: '2',
    name: 'John Davis',
    age: 45,
    gender: 'Male',
    bloodType: 'A-',
    allergies: ['Latex'],
    conditions: ['Diabetes Type 2'],
    vitals: {
      bloodPressure: '140/90',
      heartRate: 78,
      temperature: 99.1,
      weight: 80
    },
    lastVisit: '2024-08-20',
    upcomingAppointment: '2024-09-10'
  },
  {
    id: '3',
    name: 'Emily Chen',
    age: 34,
    gender: 'Female',
    bloodType: 'B+',
    allergies: [],
    conditions: ['Asthma'],
    vitals: {
      bloodPressure: '115/75',
      heartRate: 68,
      temperature: 98.4,
      weight: 58
    },
    lastVisit: '2024-08-25',
    upcomingAppointment: '2024-09-08'
  }
];

// Mock Appointments
export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: '1',
    patientName: 'Ananya Sharma',
    clinicianId: '2',
    clinicianName: 'Dr. Sarah Wilson',
    date: '2024-09-05',
    time: '10:00 AM',
    reason: 'Follow-up checkup',
    status: 'upcoming',
    type: 'follow-up'
  },
  {
    id: '2',
    patientId: '2',
    patientName: 'John Davis',
    clinicianId: '2',
    clinicianName: 'Dr. Sarah Wilson',
    date: '2024-09-05',
    time: '11:30 AM',
    reason: 'Diabetes management',
    status: 'upcoming',
    type: 'consultation'
  },
  {
    id: '3',
    patientId: '3',
    patientName: 'Emily Chen',
    clinicianId: '2',
    clinicianName: 'Dr. Sarah Wilson',
    date: '2024-09-05',
    time: '2:00 PM',
    reason: 'Asthma review',
    status: 'upcoming',
    type: 'checkup'
  },
  {
    id: '4',
    patientId: '1',
    patientName: 'Ananya Sharma',
    clinicianId: '2',
    clinicianName: 'Dr. Sarah Wilson',
    date: '2024-08-15',
    time: '9:00 AM',
    reason: 'Annual checkup',
    status: 'completed',
    type: 'checkup'
  }
];

// Mock Clinicians
export const mockClinicians: Clinician[] = [
  {
    id: '2',
    name: 'Dr. Sarah Wilson',
    specialty: 'Family Medicine',
    status: 'available',
    patientsToday: 8
  },
  {
    id: '4',
    name: 'Dr. Michael Brown',
    specialty: 'Cardiology',
    status: 'busy',
    patientsToday: 6
  },
  {
    id: '5',
    name: 'Dr. Lisa Garcia',
    specialty: 'Pediatrics',
    status: 'available',
    patientsToday: 4
  },
  {
    id: '6',
    name: 'Dr. James Kim',
    specialty: 'Orthopedics',
    status: 'away',
    patientsToday: 0
  }
];

// Mock KPIs for Admin Dashboard
export const mockKPIs = {
  totalAppointmentsToday: 18,
  patientsCheckedIn: 12,
  revenueToday: 8640,
  pendingClaims: 23
};

// First Aid Guides
export const firstAidGuides = [
  {
    id: '1',
    title: 'Burns',
    icon: '🔥',
    steps: [
      'Cool the burn with cold running water for at least 10 minutes',
      'Remove any clothing or jewelry near the burned area',
      'Cover with a sterile, non-stick bandage',
      'Take over-the-counter pain relievers if needed',
      'Seek medical attention for severe burns'
    ]
  },
  {
    id: '2',
    title: 'Choking',
    icon: '🫁',
    steps: [
      'Ask if the person can speak or cough',
      'If not, perform 5 back blows between shoulder blades',
      'If unsuccessful, perform 5 abdominal thrusts (Heimlich maneuver)',
      'Alternate between back blows and abdominal thrusts',
      'Call emergency services if object doesn\'t dislodge'
    ]
  },
  {
    id: '3',
    title: 'Bleeding',
    icon: '🩸',
    steps: [
      'Apply direct pressure to the wound with a clean cloth',
      'Raise the injured area above heart level if possible',
      'Don\'t remove the cloth if blood soaks through - add more layers',
      'Apply pressure to pressure points if bleeding continues',
      'Seek immediate medical attention for severe bleeding'
    ]
  },
  {
    id: '4',
    title: 'Heart Attack',
    icon: '❤️',
    steps: [
      'Call emergency services immediately',
      'Have the person sit down and rest',
      'Loosen any tight clothing',
      'If prescribed, help them take nitroglycerin',
      'If person becomes unconscious, begin CPR'
    ]
  }
];