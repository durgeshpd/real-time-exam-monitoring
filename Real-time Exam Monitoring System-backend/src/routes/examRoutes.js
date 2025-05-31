const express = require('express');
const router = express.Router();
const { authenticateToken, authorizeRoles } = require('../middleware/auth');

router.get('/admin-only', authenticateToken, authorizeRoles('admin'), (req, res) => {
  res.json({ message: 'Admin only exam data' });
});

router.get('/info', authenticateToken, authorizeRoles('student', 'examiner', 'admin'), (req, res) => {
  res.json({ message: 'Exam info for authorized users' });
});

module.exports = router;
