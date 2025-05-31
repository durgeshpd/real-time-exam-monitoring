const { Server } = require('socket.io');
const SuspiciousActivity = require('./src/models/SuspiciousActivity');

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('🟢 New client connected');

    socket.on('joinExamRoom', ({ examId, userId }) => {
      const room = `exam_${examId}`;
      socket.join(room);
      console.log(`✅ User ${userId} joined room: ${room}`);
    });

    socket.on('suspiciousActivity', async ({ examId, userId, type, timestamp }) => {
      const room = `exam_${examId}`;
      console.log('🔥 suspiciousActivity RECEIVED on server:', { examId, userId, type, timestamp });

      io.to(room).emit('suspiciousAlert', { userId, type, timestamp });

      try {
        await SuspiciousActivity.create({ examId, userId, type, timestamp });
      } catch (error) {
        console.error('❌ Error saving suspicious activity:', error);
      }
    });

    socket.on('leaveExamRoom', ({ examId, userId }) => {
      const room = `exam_${examId}`;
      socket.leave(room);
      console.log(`🚪 User ${userId} left ${room}`);
    });

    socket.on('disconnect', () => {
      console.log('🔴 Client disconnected');
    });
  });
}

module.exports = setupSocket;
