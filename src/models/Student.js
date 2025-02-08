const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const generateCustomId = async () => {
  const currentYear = new Date().getFullYear();
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  
  while (true) {
    const result = Array.from(
      { length: 4 }, 
      () => characters.charAt(Math.floor(Math.random() * characters.length))
    ).join('');
    
    const newId = `${currentYear}${result}`;
    const exists = await Student.findByPk(newId);
    
    if (!exists) return newId;
  }
};

const Student = sequelize.define('Student', {
  id: {
    type: DataTypes.STRING(8),
    primaryKey: true,
    unique: true,
    validate: {
      is: /^\d{4}[A-Z]{4}$/
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
      len: [2, 100],
      is: /^[a-zA-Z\s]*$/  // Allow spaces in names
    }
  },
  dob: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
      isNotFuture(value) {
        if (new Date(value) > new Date()) {
          throw new Error('Date of birth cannot be in the future');
        }
      }
    }
  }
}, {
  timestamps: true,
  indexes: [{ unique: true, fields: ['id'] }]
});

Student.beforeCreate(async (student) => {
  if (!student.id) student.id = await generateCustomId();
});

module.exports = Student; 