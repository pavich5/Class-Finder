import React from 'react';
import { BookOpen, Users, MapPin, Building2, Calendar, ChevronRight } from 'lucide-react';

interface LandingPageProps {
  onRoleSelect: (role: 'teacher' | 'student') => void;
}

export default function LandingPage({ onRoleSelect }: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-blue-900">СОУ „Јосиф Јосифовски"</h1>
              <p className="text-sm text-gray-600">Гевгелија</p>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-6 lg:space-y-8">
            <div className="space-y-4">
              <h2 className="text-blue-900">
                Систем за резервација на училници
              </h2>
              <p className="text-gray-700 text-lg">
                Едноставно и брзо пронаоѓање на училници за часови. Наставниците резервираат, учениците лесно наоѓаат каде се наоѓа нивниот следен час.
              </p>
            </div>

            {/* Features - Enhanced for Mobile */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-3">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-gray-900 mb-2">За наставници</h3>
                <p className="text-gray-600 text-sm">
                  Резервирајте училници за вашите часови и видете достапност во реално време
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm border border-blue-100">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-3">
                  <MapPin className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-gray-900 mb-2">За ученици</h3>
                <p className="text-gray-600 text-sm">
                  Видете го вашиот распоред и лесно пронајдете ја училницата на визуелна мапа
                </p>
              </div>
            </div>

            {/* Stats - Mobile Enhancement */}
            <div className="bg-white/80 backdrop-blur rounded-xl p-5 border border-white shadow-sm">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Building2 className="w-5 h-5 text-blue-600" />
                  </div>
                  <p className="text-blue-900 mb-1">24</p>
                  <p className="text-xs text-gray-600">Училници</p>
                </div>
                <div>
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Users className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-green-900 mb-1">50+</p>
                  <p className="text-xs text-gray-600">Наставници</p>
                </div>
                <div>
                  <div className="w-10 h-10 bg-orange-100 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Calendar className="w-5 h-5 text-orange-600" />
                  </div>
                  <p className="text-orange-900 mb-1">600+</p>
                  <p className="text-xs text-gray-600">Ученици</p>
                </div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <button
                onClick={() => onRoleSelect('teacher')}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2"
              >
                Најава за наставници
                <ChevronRight className="w-5 h-5" />
              </button>
              <button
                onClick={() => onRoleSelect('student')}
                className="px-8 py-4 bg-white text-blue-600 border-2 border-blue-600 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center gap-2"
              >
                Најава за ученици
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Right Column - Illustration (Desktop Only) */}
          <div className="hidden lg:block">
            <div className="space-y-6">
              {/* Building visualization */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <div className="space-y-4">
                  {/* Building illustration */}
                  <div className="bg-gradient-to-b from-blue-600 to-blue-700 rounded-lg p-8 text-white">
                    <div className="space-y-3">
                      <div className="text-center mb-6">
                        <Building2 className="w-16 h-16 mx-auto mb-2" />
                        <p className="text-sm opacity-90">Визуелна навигација</p>
                      </div>
                      
                      {/* Floors */}
                      {[2, 1, 0].map((floor) => (
                        <div key={floor} className="bg-white/10 rounded p-4 hover:bg-white/20 transition-colors cursor-pointer">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm">Кат {floor}</span>
                            <span className="text-xs opacity-75">8 училници</span>
                          </div>
                          <div className="grid grid-cols-4 gap-2">
                            {Array.from({ length: 4 }).map((_, i) => (
                              <div
                                key={i}
                                className="h-8 bg-white/20 rounded hover:bg-white/30 transition-colors"
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="text-center text-gray-600 text-sm">
                    <p>Интерактивна мапа на сите катови</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}