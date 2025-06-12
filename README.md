# 👀 Real-time Exam Monitoring System

This project is a full-stack web application built to simulate online exam monitoring with real-time suspicious activity detection (e.g., tab switching) using **Socket.IO**, **MongoDB**, and **React**.

---

## 🚀 Features

- 🔐 **Authentication & Authorization**
  - JWT-based login and signup for users
  - Role-based access control (`admin`, `examiner`, `student`)

- 🧑‍💻 **User Management**
  - Register and login
  - Roles: `admin`, `examiner`, `student`

- 📡 **Real-time Monitoring**
  - Uses Socket.IO for real-time detection of suspicious activities like tab switching
  - Emits alerts to connected clients in the same exam room

- 📊 **Exam Interface**
  - Simple exam room for students
  - Admin/examiner can monitor suspicious activities live

- 🧠 **Activity Logging**
  - Suspicious activities are saved to MongoDB with timestamp, user ID, and exam ID

---

## 🛠️ Tech Stack

### Backend:
- **Node.js**
- **Express.js**
- **MongoDB + Mongoose**
- **Socket.IO**
- **JWT for authentication**

### Frontend:
- **React**
- **TailwindCSS (for styling)**

### Real-time:
- **Socket.IO** for event-based client-server communication

---

## 📁 Project Structure

```css
project-root/
├── server/
│ ├── src/
│ │ ├── models/
│ │ │ ├── User.js
│ │ │ └── SuspiciousActivity.js
│ │ ├── routes/
│ │ │ ├── authRoutes.js
│ │ │ ├── examRoutes.js
│ │ │ └── userRoutes.js
│ │ ├── config/
│ │ │ └── database.js
│ │ └── middleware/
│ │ └── auth.js
│ ├── socket.js
│ └── server.js
├── client/
│ ├── components/
│ │ ├── Login.js
│ │ ├── Signup.js
│ │ ├── Dashboard.js
│ │ ├── ExamRoom.js
│ │ └── ExamNotifications.js
│ └── App.js
└── .env
```

---

## 📦 Setup Instructions

Clone the repository

```bash
git clone https://github.com/your-repo/real-time-exam-monitoring.git
cd real-time-exam-monitoring

2. Backend Setup

cd server
npm install

Create a .env file inside server/:

MONGO_URI=your_mongodb_connection_string
PORT=5000
JWT_SECRET=your_secret_key

Start the backend server:

node server.js

3. Frontend Setup

cd client
npm install
npm run dev

4. Access the App
Frontend: http://localhost:5173
Backend API: http://localhost:5000

```

---

🧪 Real-Time Monitoring Flow
- When a student joins an exam, they enter a Socket.IO room.
- If they switch tabs, a "suspiciousActivity" event is emitted.
- Server logs it and sends a "suspiciousAlert" to all others in the room.
- Examiner sees the alerts live.

🔐 User Roles
- Role	Permissions
- Admin	View all, monitor exams
- Examiner	Start/monitor exams, see alerts
- Student	Join exams, get monitored

📌 Notes
Socket events:
- joinExamRoom
- suspiciousActivity
- suspiciousAlert
- leaveExamRoom
  
The backend uses WebSocket for push notifications to prevent cheating.

---

📬 Contact

Feel free to open an issue or submit a pull request if you have ideas or improvements.
