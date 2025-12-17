import React from 'react';
import { mockClassrooms } from '../data/mockData';
import { Booking } from '../types';

interface FloorMapProps {
  floor: number;
  bookings: Booking[];
  date: string;
  timeSlot: string;
}

export default function FloorMap({ floor, bookings, date, timeSlot }: FloorMapProps) {
  const floorClassrooms = mockClassrooms.filter(c => c.floor === floor);
  
  const isBooked = (classroomId: string) => {
    return bookings.some(
      b => b.classroomId === classroomId && b.date === date && b.timeSlot === timeSlot
    );
  };

  const getBookingInfo = (classroomId: string) => {
    return bookings.find(
      b => b.classroomId === classroomId && b.date === date && b.timeSlot === timeSlot
    );
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <div className="flex items-center gap-6 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span className="text-sm text-gray-700">Достапна</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded"></div>
          <span className="text-sm text-gray-700">Зафатена</span>
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {floorClassrooms.map((classroom) => {
          const booked = isBooked(classroom.id);
          const bookingInfo = getBookingInfo(classroom.id);

          return (
            <div
              key={classroom.id}
              className={`p-4 rounded-lg border-2 transition-all ${
                booked
                  ? 'bg-red-50 border-red-200'
                  : 'bg-green-50 border-green-200'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-900">
                  {classroom.number}
                </span>
                <div className={`w-3 h-3 rounded-full ${
                  booked ? 'bg-red-500' : 'bg-green-500'
                }`}></div>
              </div>
              
              <p className="text-xs text-gray-600 mb-1">
                {classroom.capacity} места
              </p>
              
              {classroom.type !== 'standard' && (
                <p className="text-xs text-blue-600 mb-2">
                  {classroom.type === 'lab' ? 'Лабораторија' : 
                   classroom.type === 'computer' ? 'Компјутерска' : ''}
                </p>
              )}

              {booked && bookingInfo && (
                <div className="mt-2 pt-2 border-t border-red-200">
                  <p className="text-xs text-gray-900 truncate">
                    {bookingInfo.subject}
                  </p>
                  <p className="text-xs text-gray-600 truncate">
                    {bookingInfo.teacherName}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {floorClassrooms.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          Нема училници на овој кат
        </div>
      )}
    </div>
  );
}
