const Student = require('../models/Student');
const { createToken, setCookie } = require('../utils/token');
const { validateName, validateDate, validateStudentId } = require('../utils/validate');

exports.register = async (req, res) => {
  try {

    const name = validateName(req.body.name);

    const dob = validateDate(req.body.dob);

    const student = await Student.create({ name, dob });
    
    res.status(201).json({

      message: 'Registration successful',
      studentId: student.id
      
    });

  } catch (error) {

    res.status(400).json({ message: error.message });

  }
};

exports.login = async (req, res) => {
  try {
    const studentId = validateStudentId(req.body.studentId);
    const dob = validateDate(req.body.dob);

    const student = await Student.findByPk(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    const inputDate = dob.toISOString().split('T')[0];
    const studentDate = new Date(student.dob).toISOString().split('T')[0];

    if (inputDate !== studentDate) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const token = createToken(student.id);
    setCookie(res, token);

    res.json({ message: 'Login successful' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.logout = (req, res) => {
  res.cookie('token', '', { expires: new Date(0) });
  res.json({ message: 'Logged out successfully' });
};