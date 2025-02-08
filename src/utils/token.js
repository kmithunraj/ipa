const jwt = require('jsonwebtoken');

exports.createToken = (id) => {
  return jwt.sign(
    { id }, 
    process.env.STUDENT_JWT_SECRET, 
    { expiresIn: '24h' }
  );
};

exports.setCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 24 * 60 * 60 * 1000
  });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, process.env.STUDENT_JWT_SECRET);
}; 