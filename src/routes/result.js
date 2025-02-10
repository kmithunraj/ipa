const router = require('express').Router();
const { createResult, getResults } = require('../controllers/result');
const { auth } = require('../middleware/auth');

router.post('/', auth, createResult);
router.get('/', auth, getResults);

module.exports = router;