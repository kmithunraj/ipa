const router = require('express').Router();
const { createSection, getSection } = require('../controllers/section');

// Public routes
router.post('/create', createSection);
router.get('/get/:sectionId', getSection);

module.exports = router; 