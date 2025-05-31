import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const socket = io('http://localhost:5000');

const ExamNotifications = ({ examId }) => {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    socket.emit('joinExamRoom', { examId });

    socket.on('suspiciousAlert', (alert) => {
      setAlerts((prev) => [...prev, alert]);
    });

    return () => {
      socket.off('suspiciousAlert');
      socket.emit('leaveExamRoom', { examId });
    };
  }, [examId]);

  return (
    <div className="bg-yellow-100 p-3 rounded mt-4">
      <h3 className="font-bold mb-2">Cheating Alerts</h3>
      <ul>
        {alerts.map((alert, i) => (
          <li key={i}>
            ⚠️ {alert.userId} switched tab at {new Date(alert.timestamp).toLocaleTimeString()}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExamNotifications;
