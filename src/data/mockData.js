export const doctors = [
  { id: '1', name: 'Dr. John Wick', specialty: 'General Medicine' },
  { id: '2', name: 'Dr. Thomas Shelby', specialty: 'Pediatrics' },
  { id: '3', name: 'Dr. Alex Ferguson', specialty: 'Cardiology' },
];

export const patients = [
  { id: '1', name: 'Raj B Shetty', contact: '9995559990' },
  { id: '2', name: 'Mohanlan', contact: '8884448880' },
  { id: '3', name: 'Kennady John Victor', contact: '7773337770' },
  { id: '4', name: 'Nani', contact: '6662226660' },
];

export const MOCK_USER = {
  email: 'staff@clinic.com',
  password: '123456',
};

export const timeSlots = Array.from({ length: 16 }, (_, i) => {
  const hour = Math.floor(i / 2) + 9; 
  const minute = (i % 2) * 30;
  return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
});

export const appointmentStatus = {
  SCHEDULED: 'scheduled',
  CONFIRMED: 'confirmed',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const appointmentTypes = {
  REGULAR: 'regular',
  FOLLOWUP: 'follow-up',
  EMERGENCY: 'emergency',
  CONSULTATION: 'consultation'
};