import React, { useState } from 'react';
import Login from './components/Login';
import Signup from './components/Signup';
import Dashboard from './components/Dashboard';
import ExamRoom from './components/ExamRoom';

export default function App() {
  const [user, setUser] = useState(null);
  const [view, setView] = useState('login');
  const [examId, setExamId] = useState(null);

  const [completedExams, setCompletedExams] = useState({}); 

  const handleLogin = (data) => {
    setUser(data.user);
    setView('dashboard');
  };

  const handleSignup = (data) => {
    setUser(data.user);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('login');
    setExamId(null);
    setCompletedExams({});
  };

  const handleStartExam = (newExamId) => {
    if (completedExams[newExamId]) {
      alert('You have already completed this exam!');
      return;
    }
    setExamId(newExamId);
    setView('exam');
  };

  const handleStopExam = () => {
    setCompletedExams((prev) => ({ ...prev, [examId]: true }));
    setExamId(null);
    setView('dashboard');
  };

  return (
    <>
      {view === 'login' && (
        <Login onLogin={handleLogin} onShowSignup={() => setView('signup')} />
      )}
      {view === 'signup' && (
        <Signup onSignup={handleSignup} onShowLogin={() => setView('login')} />
      )}
      {view === 'dashboard' && (
        <Dashboard
          user={user}
          onLogout={handleLogout}
          onStartExam={handleStartExam}
          completedExams={completedExams}
        />
      )}
      {view === 'exam' && user && examId && (
        <ExamRoom
          token={user.token}
          examId={examId}
          user={user}
          onStopExam={handleStopExam}
        />
      )}
    </>
  );
}
