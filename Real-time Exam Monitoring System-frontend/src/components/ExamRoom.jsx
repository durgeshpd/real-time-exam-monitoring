import React, { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export default function ExamRoom({ examId, user, onStopExam }) {
  const socketRef = useRef(null);
  const lastVisibility = useRef(false);

  useEffect(() => {
    const socket = io('http://localhost:5000');
    socketRef.current = socket;

    socket.emit('joinExamRoom', { examId, userId: user.id });

    socket.on('suspiciousAlert', ({ userId, type, timestamp }) => {
      alert(`⚠️ Suspicious activity detected!\nUser: ${userId}\nType: ${type}\nTime: ${new Date(timestamp).toLocaleString()}`);
    });

    const handleVisibilityChange = () => {
      const hidden = document.hidden;
      if (hidden && lastVisibility.current === false) {
        socket.emit('suspiciousActivity', {
          examId,
          userId: user.id,
          type: 'TAB_SWITCH',
          timestamp: new Date().toISOString(),
        });
      }
      lastVisibility.current = hidden;
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (socketRef.current) {
        socketRef.current.emit('leaveExamRoom', { examId, userId: user.id });
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, [examId, user.id]);

  const handleStopExam = () => {
    if (socketRef.current) {
      socketRef.current.emit('leaveExamRoom', { examId, userId: user.id });
      socketRef.current.disconnect();
      socketRef.current = null;
    }
    onStopExam();
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white shadow rounded mt-10 font-sans">
      <h1 className="text-3xl font-bold mb-4">📝 Exam in Progress</h1>
      <p className="text-gray-700 mb-6">
        Keep this tab focused or your activity will be flagged.
      </p>
      <button
        onClick={handleStopExam}
        className="px-6 py-3 bg-red-600 text-white rounded hover:bg-red-700 transition duration-300"
      >
        Stop Exam
      </button>
    </div>
  );
}
