import { Classroom, Booking, Schedule } from '../types';

export const mockClassrooms: Classroom[] = [
  // Floor 0
  { id: '001', number: '001', floor: 0, capacity: 30, type: 'standard', x: 1, y: 1 },
  { id: '002', number: '002', floor: 0, capacity: 28, type: 'standard', x: 2, y: 1 },
  { id: '003', number: '003', floor: 0, capacity: 25, type: 'lab', x: 3, y: 1 },
  { id: '004', number: '004', floor: 0, capacity: 32, type: 'standard', x: 4, y: 1 },
  { id: '005', number: '005', floor: 0, capacity: 30, type: 'standard', x: 1, y: 2 },
  { id: '006', number: '006', floor: 0, capacity: 28, type: 'computer', x: 2, y: 2 },
  { id: '007', number: '007', floor: 0, capacity: 30, type: 'standard', x: 3, y: 2 },
  { id: '008', number: '008', floor: 0, capacity: 26, type: 'lab', x: 4, y: 2 },
  
  // Floor 1
  { id: '101', number: '101', floor: 1, capacity: 30, type: 'standard', x: 1, y: 1 },
  { id: '102', number: '102', floor: 1, capacity: 28, type: 'standard', x: 2, y: 1 },
  { id: '103', number: '103', floor: 1, capacity: 32, type: 'standard', x: 3, y: 1 },
  { id: '104', number: '104', floor: 1, capacity: 30, type: 'standard', x: 4, y: 1 },
  { id: '105', number: '105', floor: 1, capacity: 25, type: 'computer', x: 1, y: 2 },
  { id: '106', number: '106', floor: 1, capacity: 28, type: 'standard', x: 2, y: 2 },
  { id: '107', number: '107', floor: 1, capacity: 30, type: 'standard', x: 3, y: 2 },
  { id: '108', number: '108', floor: 1, capacity: 28, type: 'lab', x: 4, y: 2 },
  
  // Floor 2
  { id: '201', number: '201', floor: 2, capacity: 30, type: 'standard', x: 1, y: 1 },
  { id: '202', number: '202', floor: 2, capacity: 32, type: 'standard', x: 2, y: 1 },
  { id: '203', number: '203', floor: 2, capacity: 28, type: 'standard', x: 3, y: 1 },
  { id: '204', number: '204', floor: 2, capacity: 30, type: 'lab', x: 4, y: 1 },
  { id: '205', number: '205', floor: 2, capacity: 28, type: 'standard', x: 1, y: 2 },
  { id: '206', number: '206', floor: 2, capacity: 30, type: 'standard', x: 2, y: 2 },
  { id: '207', number: '207', floor: 2, capacity: 25, type: 'computer', x: 3, y: 2 },
  { id: '208', number: '208', floor: 2, capacity: 30, type: 'standard', x: 4, y: 2 },
];

export const mockBookings: Booking[] = [
  {
    id: 'b1',
    classroomId: '101',
    teacherId: '1',
    teacherName: 'Марија Петровска',
    subject: 'Математика',
    date: '2024-12-17',
    timeSlot: '08:00 - 08:45',
    grade: '3-А'
  },
  {
    id: 'b2',
    classroomId: '102',
    teacherId: '2',
    teacherName: 'Јован Николовски',
    subject: 'Физика',
    date: '2024-12-17',
    timeSlot: '08:00 - 08:45',
    grade: '4-Б'
  },
  {
    id: 'b3',
    classroomId: '103',
    teacherId: '1',
    teacherName: 'Марија Петровска',
    subject: 'Математика',
    date: '2024-12-17',
    timeSlot: '08:50 - 09:35',
    grade: '2-В'
  },
  {
    id: 'b4',
    classroomId: '201',
    teacherId: '3',
    teacherName: 'Елена Димитриевска',
    subject: 'Историја',
    date: '2024-12-17',
    timeSlot: '09:40 - 10:25',
    grade: '1-А'
  },
  {
    id: 'b5',
    classroomId: '105',
    teacherId: '4',
    teacherName: 'Петар Стојановски',
    subject: 'Информатика',
    date: '2024-12-17',
    timeSlot: '10:45 - 11:30',
    grade: '3-Б'
  }
];

export const mockSchedule: Schedule[] = [
  {
    id: 's1',
    studentId: '1',
    subject: 'Математика',
    teacherName: 'Марија Петровска',
    classroomId: '101',
    date: '2024-12-17',
    timeSlot: '08:00 - 08:45',
    day: 'Среда'
  },
  {
    id: 's2',
    studentId: '1',
    subject: 'Македонски јазик',
    teacherName: 'Сања Величковска',
    classroomId: '203',
    date: '2024-12-17',
    timeSlot: '08:50 - 09:35',
    day: 'Среда'
  },
  {
    id: 's3',
    studentId: '1',
    subject: 'Англиски јазик',
    teacherName: 'Никола Митревски',
    classroomId: '107',
    date: '2024-12-17',
    timeSlot: '09:40 - 10:25',
    day: 'Среда'
  },
  {
    id: 's4',
    studentId: '1',
    subject: 'Физичко',
    teacherName: 'Давид Тодоровски',
    classroomId: 'gym',
    date: '2024-12-17',
    timeSlot: '10:45 - 11:30',
    day: 'Среда'
  },
  {
    id: 's5',
    studentId: '1',
    subject: 'Биологија',
    teacherName: 'Ана Јовановска',
    classroomId: '003',
    date: '2024-12-17',
    timeSlot: '11:35 - 12:20',
    day: 'Среда'
  }
];
