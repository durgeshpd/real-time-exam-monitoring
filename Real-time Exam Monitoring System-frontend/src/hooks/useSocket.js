import { useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

export function useSocket(token, examId, userId) {
  const socketRef = useRef(null);

  useEffect(() => {
    if (!token || !examId || !userId) return;

    const socket = io('http://localhost:5000', {
      auth: { token },
      transports: ['websocket'],
    });

    socketRef.current = socket;

    socket.on('connect', () => {
      console.log('🟢 Socket connected');
      socket.emit('joinExamRoom', { examId, userId });
    });

    socket.on('suspiciousAlert', ({ userId, type, timestamp }) => {
      console.log('📥 suspiciousAlert RECEIVED:', { userId, type, timestamp });
      alert(`⚠️ Suspicious activity detected: User ${userId} - ${type}`);
    });

    socket.on('connect_error', (err) => {
      console.error('❌ Socket connection error:', err.message);
    });

    return () => {
      if (socket.connected) {
        socket.emit('leaveExamRoom', { examId, userId });
      }
      socket.disconnect();
      console.log('🔌 Socket disconnected');
    };
  }, [token, examId, userId]);

  return socketRef.current;
}
