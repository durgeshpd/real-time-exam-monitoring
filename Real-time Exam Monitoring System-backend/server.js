require('dotenv').config();
const express = require('express');
const cors = require('cors');
const http = require('http');
const setupSocket = require('./socket');
const connectDB = require('./src/config/database');

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));

app.use(express.json());

const authRoutes = require('./src/routes/authRoutes');
const examRoutes = require('./src/routes/examRoutes');
const usersRouter = require('./src/routes/userRoutes');

app.use('/api/users', usersRouter);
app.use('/api/auth', authRoutes);
app.use('/api/exams', examRoutes);

app.get('/', (req, res) => res.send('API running...'));

const server = http.createServer(app);
setupSocket(server);
connectDB();

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
