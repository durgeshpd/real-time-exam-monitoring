import React from 'react';

export default function Dashboard({ user, onLogout, onStartExam }) {
  if (!user) return <div>Loading...</div>;

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-4xl font-bold mb-6">
        Welcome, <span className="text-blue-600">{user.name}</span> ({user.role})
      </h1>
      <div className="space-x-4">
        <button
          onClick={onLogout}
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>

        {(user.role === 'student' || user.role === 'examiner') && (
          <button
            onClick={() => onStartExam('exam123')}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Start Exam
          </button>
        )}
      </div>
    </div>
  );
}
