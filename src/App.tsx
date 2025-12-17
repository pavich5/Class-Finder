import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';

type UserRole = 'teacher' | 'student' | null;

interface User {
  id: string;
  name: string;
  role: UserRole;
}

export default function App() {
  const [currentPage, setCurrentPage] = useState<'landing' | 'login' | 'dashboard'>('landing');
  const [loginRole, setLoginRole] = useState<UserRole>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const handleRoleSelect = (role: UserRole) => {
    setLoginRole(role);
    setCurrentPage('login');
  };

  const handleLogin = (email: string, password: string) => {
    // Mock login - in real app this would authenticate
    const mockUser: User = {
      id: '1',
      name: loginRole === 'teacher' ? 'Марија Петровска' : 'Александар Николовски',
      role: loginRole!
    };
    setCurrentUser(mockUser);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setLoginRole(null);
    setCurrentPage('landing');
  };

  if (currentPage === 'landing') {
    return <LandingPage onRoleSelect={handleRoleSelect} />;
  }

  if (currentPage === 'login') {
    return (
      <LoginPage 
        role={loginRole!} 
        onLogin={handleLogin}
        onBack={() => setCurrentPage('landing')}
      />
    );
  }

  if (currentPage === 'dashboard' && currentUser) {
    if (currentUser.role === 'teacher') {
      return <TeacherDashboard user={currentUser} onLogout={handleLogout} />;
    } else {
      return <StudentDashboard user={currentUser} onLogout={handleLogout} />;
    }
  }

  return <LandingPage onRoleSelect={handleRoleSelect} />;
}
