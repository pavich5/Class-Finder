import React, { useState } from 'react';
import { BookOpen, Calendar, MapPin, LogOut, Plus, Clock } from 'lucide-react';
import { mockBookings, mockClassrooms } from '../data/mockData';
import { Booking, TIME_SLOTS } from '../types';
import BookingModal from './BookingModal';
import FloorMap from './FloorMap';

interface TeacherDashboardProps {
  user: { id: string; name: string; role: string };
  onLogout: () => void;
}

export default function TeacherDashboard({ user, onLogout }: TeacherDashboardProps) {
  const [bookings, setBookings] = useState<Booking[]>(mockBookings);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [selectedFloor, setSelectedFloor] = useState(1);
  const [selectedDate, setSelectedDate] = useState('2024-12-17');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(TIME_SLOTS[0]);

  const myBookings = bookings.filter(b => b.teacherId === user.id);
  const todayBookings = myBookings.filter(b => b.date === selectedDate);

  const getClassroomName = (classroomId: string) => {
    const classroom = mockClassrooms.find(c => c.id === classroomId);
    return classroom ? `Училница ${classroom.number}` : 'Непозната';
  };

  const getAvailableClassrooms = () => {
    const bookedClassroomIds = bookings
      .filter(b => b.date === selectedDate && b.timeSlot === selectedTimeSlot)
      .map(b => b.classroomId);
    
    return mockClassrooms.filter(c => !bookedClassroomIds.includes(c.id));
  };

  const handleBookingCreate = (newBooking: Booking) => {
    setBookings([...bookings, newBooking]);
    setShowBookingModal(false);
  };

  const availableCount = getAvailableClassrooms().length;
  const bookedCount = mockClassrooms.length - availableCount;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <BookOpen className="w-8 h-8 text-blue-600" />
              <div>
                <h1 className="text-blue-900">СОУ „Јосиф Јосифовски"</h1>
                <p className="text-sm text-gray-600">Наставнички панел</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">Наставник</p>
              </div>
              <button
                onClick={onLogout}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                title="Одјави се"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Денешни часови</p>
                <p className="text-blue-900">{todayBookings.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Достапни училници</p>
                <p className="text-blue-900">{availableCount}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Резервирани</p>
                <p className="text-blue-900">{bookedCount}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Action Button */}
        <div className="mb-8">
          <button
            onClick={() => setShowBookingModal(true)}
            className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2"
          >
            <Plus className="w-5 h-5" />
            Резервирај училница
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Today's Schedule */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-4">Денешен распоред</h2>
            
            {todayBookings.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>Немате закажани часови денеска</p>
              </div>
            ) : (
              <div className="space-y-3">
                {todayBookings.map((booking) => (
                  <div
                    key={booking.id}
                    className="p-4 bg-blue-50 border border-blue-100 rounded-lg"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <p className="text-gray-900">{booking.subject}</p>
                        <p className="text-sm text-gray-600">{booking.grade}</p>
                      </div>
                      <span className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">
                        {booking.timeSlot}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-700">
                      <MapPin className="w-4 h-4" />
                      {getClassroomName(booking.classroomId)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Time & Date Filters */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-4">Филтрирај достапност</h2>
            
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-gray-700 mb-2">Време</label>
                <select
                  value={selectedTimeSlot}
                  onChange={(e) => setSelectedTimeSlot(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Достапни</p>
                  <p className="text-green-600">{availableCount}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Зафатени</p>
                  <p className="text-orange-600">{bookedCount}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floor Map Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-gray-900 mb-4">Мапа на училници</h2>
          
          {/* Floor Selector */}
          <div className="flex gap-2 mb-6">
            {[0, 1, 2].map((floor) => (
              <button
                key={floor}
                onClick={() => setSelectedFloor(floor)}
                className={`px-6 py-2 rounded-lg transition-colors ${
                  selectedFloor === floor
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Кат {floor}
              </button>
            ))}
          </div>

          <FloorMap
            floor={selectedFloor}
            bookings={bookings}
            date={selectedDate}
            timeSlot={selectedTimeSlot}
          />
        </div>
      </main>

      {/* Booking Modal */}
      {showBookingModal && (
        <BookingModal
          onClose={() => setShowBookingModal(false)}
          onSubmit={handleBookingCreate}
          userId={user.id}
          userName={user.name}
          existingBookings={bookings}
        />
      )}
    </div>
  );
}
