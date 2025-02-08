const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Exam = sequelize.define('Exam', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  time: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

// Define associations
Exam.associate = (models) => {
  
  Exam.hasMany(models.Section, {
    foreignKey: 'examId',
    as: 'sections'
  });
  
  Exam.belongsToMany(models.Student, {
    through: 'StudentExams',
    foreignKey: 'examId',
    otherKey: 'studentId',
    as: 'students'
  });
};

module.exports = Exam;