const mongoose = require('mongoose');

const SuspiciousActivitySchema = new mongoose.Schema({
  examId: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model('SuspiciousActivity', SuspiciousActivitySchema);
