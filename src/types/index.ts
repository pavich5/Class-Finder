export interface Classroom {
  id: string;
  number: string;
  floor: number;
  capacity: number;
  type: 'standard' | 'lab' | 'computer';
  x?: number; // Position for floor map
  y?: number;
}

export interface Booking {
  id: string;
  classroomId: string;
  teacherId: string;
  teacherName: string;
  subject: string;
  date: string;
  timeSlot: string;
  grade: string;
}

export interface Schedule {
  id: string;
  studentId: string;
  subject: string;
  teacherName: string;
  classroomId: string;
  date: string;
  timeSlot: string;
  day: string;
}

export interface User {
  id: string;
  name: string;
  role: 'teacher' | 'student';
}

export const TIME_SLOTS = [
  '08:00 - 08:45',
  '08:50 - 09:35',
  '09:40 - 10:25',
  '10:45 - 11:30',
  '11:35 - 12:20',
  '12:25 - 13:10',
  '13:15 - 14:00',
  '14:05 - 14:50'
];
