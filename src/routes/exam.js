const router = require('express').Router();
const { createExam, getExams, getExam } = require('../controllers/exam');
const { auth } = require('../middleware/auth');

// All routes require authentication
router.use(auth);

router.post('/', createExam);
router.get('/', getExams);
router.get('/:examId', getExam);

module.exports = router;
