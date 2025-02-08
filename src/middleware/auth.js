const { verifyToken } = require('../utils/token');
const Student = require('../models/Student');

exports.auth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    const decoded = verifyToken(token);
    const student = await Student.findByPk(decoded.id);
    
    if (!student) {
      return res.status(401).json({ message: 'Student not found' });
    }

    req.student = student;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Authentication failed' });
  }
}; 