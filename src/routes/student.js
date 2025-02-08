const router = require('express').Router();
const { register, login, logout, getProfile } = require('../controllers/student');
const { auth } = require('../middleware/auth');

// Public routes
router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);

module.exports = router; 