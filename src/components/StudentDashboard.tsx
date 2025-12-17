import React, { useState } from 'react';
import { BookOpen, Clock, MapPin, LogOut, Navigation } from 'lucide-react';
import { mockSchedule, mockClassrooms } from '../data/mockData';
import { Schedule } from '../types';
import FloorMap from './FloorMap';

interface StudentDashboardProps {
  user: { id: string; name: string; role: string };
  onLogout: () => void;
}

export default function StudentDashboard({ user, onLogout }: StudentDashboardProps) {
  const [schedule] = useState<Schedule[]>(mockSchedule);
  const [selectedClassroom, setSelectedClassroom] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);

  const todaySchedule = schedule.filter(s => s.date === '2024-12-17');
  
  // Find next class
  const now = new Date();
  const currentTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
  
  const nextClass = todaySchedule.find(item => {
    const startTime = item.timeSlot.split(' - ')[0];
    return startTime > currentTime;
  }) || todaySchedule[0];

  const getClassroom = (classroomId: string) => {
    return mockClassrooms.find(c => c.id === classroomId);
  };

  const handleFindClassroom = (classroomId: string) => {
    setSelectedClassroom(classroomId);
    setShowMap(true);
  };

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
                <p className="text-sm text-gray-600">Ученички панел</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="text-right hidden sm:block">
                <p className="text-gray-900">{user.name}</p>
                <p className="text-sm text-gray-600">Ученик</p>
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
        {/* Next Class Highlight */}
        {nextClass && (
          <div className="mb-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl shadow-lg p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Clock className="w-5 h-5" />
              <span className="text-sm opacity-90">Следен час</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h2 className="text-white mb-2">{nextClass.subject}</h2>
                <p className="opacity-90 mb-1">{nextClass.teacherName}</p>
                <p className="text-sm opacity-75">{nextClass.timeSlot}</p>
              </div>
              <div className="flex flex-col justify-between">
                {(() => {
                  const classroom = getClassroom(nextClass.classroomId);
                  return classroom ? (
                    <>
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <MapPin className="w-5 h-5" />
                          <span>Училница {classroom.number}</span>
                        </div>
                        <p className="text-sm opacity-90">Кат {classroom.floor}</p>
                      </div>
                      <button
                        onClick={() => handleFindClassroom(nextClass.classroomId)}
                        className="mt-4 px-6 py-2 bg-white text-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
                      >
                        <Navigation className="w-4 h-4" />
                        Прикажи на мапа
                      </button>
                    </>
                  ) : (
                    <div>
                      <p className="text-sm opacity-90">Салата за физичко</p>
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        )}

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Today's Schedule */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-gray-900 mb-4">Денешен распоред</h2>
            
            <div className="space-y-3">
              {todaySchedule.map((item) => {
                const classroom = getClassroom(item.classroomId);
                const isNext = item.id === nextClass?.id;

                return (
                  <div
                    key={item.id}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      isNext
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-gray-900 mb-1">{item.subject}</p>
                        <p className="text-sm text-gray-600">{item.teacherName}</p>
                      </div>
                      {isNext && (
                        <span className="px-2 py-1 bg-blue-600 text-white rounded text-xs">
                          Следен
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {item.timeSlot}
                        </div>
                        {classroom && (
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            Училница {classroom.number} (Кат {classroom.floor})
                          </div>
                        )}
                      </div>
                      {classroom && (
                        <button
                          onClick={() => handleFindClassroom(item.classroomId)}
                          className="text-blue-600 hover:text-blue-700 text-sm"
                        >
                          Мапа
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Info */}
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h2 className="text-gray-900 mb-4">Денешна статистика</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-700">Вкупно часови</span>
                  </div>
                  <span className="text-blue-900">{todaySchedule.length}</span>
                </div>

                <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-700">Различни катови</span>
                  </div>
                  <span className="text-green-900">
                    {new Set(todaySchedule.map(s => {
                      const cr = getClassroom(s.classroomId);
                      return cr?.floor;
                    }).filter(Boolean)).size}
                  </span>
                </div>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-6 border border-blue-200">
              <h3 className="text-gray-900 mb-3">💡 Совет</h3>
              <p className="text-gray-700 text-sm">
                Кликни на "Прикажи на мапа" за да ја видиш точната локација на училницата. Стигни 5 минути порано за да имаш доволно време да ја најдеш училницата.
              </p>
            </div>
          </div>
        </div>

        {/* Floor Map Modal */}
        {showMap && selectedClassroom && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
                <div>
                  <h2 className="text-gray-900">Локација на училницата</h2>
                  {(() => {
                    const classroom = getClassroom(selectedClassroom);
                    return classroom && (
                      <p className="text-sm text-gray-600">
                        Училница {classroom.number} - Кат {classroom.floor}
                      </p>
                    );
                  })()}
                </div>
                <button
                  onClick={() => setShowMap(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6">
                {(() => {
                  const classroom = getClassroom(selectedClassroom);
                  if (!classroom) return null;

                  return (
                    <>
                      {/* Floor Tabs */}
                      <div className="flex gap-2 mb-6">
                        {[0, 1, 2].map((floor) => (
                          <button
                            key={floor}
                            disabled
                            className={`px-6 py-2 rounded-lg ${
                              classroom.floor === floor
                                ? 'bg-blue-600 text-white'
                                : 'bg-gray-100 text-gray-400'
                            }`}
                          >
                            Кат {floor}
                          </button>
                        ))}
                      </div>

                      {/* Map with highlighted classroom */}
                      <div className="bg-gray-50 rounded-lg p-6">
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          {mockClassrooms
                            .filter(c => c.floor === classroom.floor)
                            .map((cr) => (
                              <div
                                key={cr.id}
                                className={`p-4 rounded-lg border-2 transition-all ${
                                  cr.id === selectedClassroom
                                    ? 'bg-blue-100 border-blue-600 ring-4 ring-blue-200'
                                    : 'bg-white border-gray-200'
                                }`}
                              >
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-gray-900">
                                    {cr.number}
                                  </span>
                                  {cr.id === selectedClassroom && (
                                    <div className="w-3 h-3 bg-blue-600 rounded-full animate-pulse"></div>
                                  )}
                                </div>
                                <p className="text-xs text-gray-600">
                                  {cr.capacity} места
                                </p>
                              </div>
                            ))}
                        </div>
                      </div>
                    </>
                  );
                })()}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
