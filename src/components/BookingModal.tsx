import React, { useState } from 'react';
import { X, Calendar, Clock, BookOpen, Users, MapPin } from 'lucide-react';
import { mockClassrooms } from '../data/mockData';
import { Booking, TIME_SLOTS } from '../types';

interface BookingModalProps {
  onClose: () => void;
  onSubmit: (booking: Booking) => void;
  userId: string;
  userName: string;
  existingBookings: Booking[];
}

export default function BookingModal({ onClose, onSubmit, userId, userName, existingBookings }: BookingModalProps) {
  const [date, setDate] = useState('2024-12-17');
  const [timeSlot, setTimeSlot] = useState(TIME_SLOTS[0]);
  const [subject, setSubject] = useState('');
  const [grade, setGrade] = useState('');
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [selectedClassroom, setSelectedClassroom] = useState('');

  const getAvailableClassrooms = () => {
    const bookedIds = existingBookings
      .filter(b => b.date === date && b.timeSlot === timeSlot)
      .map(b => b.classroomId);
    
    return mockClassrooms
      .filter(c => c.floor === selectedFloor && !bookedIds.includes(c.id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedClassroom) {
      alert('Ве молиме изберете училница');
      return;
    }

    const newBooking: Booking = {
      id: `b${Date.now()}`,
      classroomId: selectedClassroom,
      teacherId: userId,
      teacherName: userName,
      subject,
      date,
      timeSlot,
      grade
    };

    onSubmit(newBooking);
  };

  const availableClassrooms = getAvailableClassrooms();

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-gray-900">Резервирај училница</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Date and Time */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">
                <Calendar className="w-4 h-4 inline mr-2" />
                Датум
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                <Clock className="w-4 h-4 inline mr-2" />
                Време
              </label>
              <select
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              >
                {TIME_SLOTS.map((slot) => (
                  <option key={slot} value={slot}>{slot}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Subject and Grade */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-2">
                <BookOpen className="w-4 h-4 inline mr-2" />
                Предмет
              </label>
              <input
                type="text"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Математика"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-gray-700 mb-2">
                <Users className="w-4 h-4 inline mr-2" />
                Одделение
              </label>
              <input
                type="text"
                value={grade}
                onChange={(e) => setGrade(e.target.value)}
                placeholder="3-А"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Floor Selection */}
          <div>
            <label className="block text-gray-700 mb-2">
              <MapPin className="w-4 h-4 inline mr-2" />
              Кат
            </label>
            <div className="flex gap-2">
              {[0, 1, 2].map((floor) => (
                <button
                  key={floor}
                  type="button"
                  onClick={() => {
                    setSelectedFloor(floor);
                    setSelectedClassroom('');
                  }}
                  className={`flex-1 py-2 rounded-lg transition-colors ${
                    selectedFloor === floor
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Кат {floor}
                </button>
              ))}
            </div>
          </div>

          {/* Classroom Selection */}
          <div>
            <label className="block text-gray-700 mb-2">
              Изберете училница
            </label>
            
            {availableClassrooms.length === 0 ? (
              <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg text-orange-700 text-center">
                Нема достапни училници за избраниот термин
              </div>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {availableClassrooms.map((classroom) => (
                  <button
                    key={classroom.id}
                    type="button"
                    onClick={() => setSelectedClassroom(classroom.id)}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      selectedClassroom === classroom.id
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 hover:border-blue-300 bg-white'
                    }`}
                  >
                    <p className="text-gray-900 mb-1">
                      {classroom.number}
                    </p>
                    <p className="text-xs text-gray-600">
                      {classroom.capacity} места
                    </p>
                    {classroom.type !== 'standard' && (
                      <p className="text-xs text-blue-600 mt-1">
                        {classroom.type === 'lab' ? 'Лаборат.' : 'Комп.'}
                      </p>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Откажи
            </button>
            <button
              type="submit"
              disabled={!selectedClassroom}
              className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Резервирај
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
