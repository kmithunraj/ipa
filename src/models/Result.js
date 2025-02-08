const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Result = sequelize.define('Result', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  examId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Exams',
      key: 'id'
    }
  },
  studentId: {
    type: DataTypes.STRING(8),
    allowNull: false,
    references: {
      model: 'Students',
      key: 'id'
    }
  },
  percentage: {
    type: DataTypes.FLOAT,
    allowNull: false,
    validate: {
      min: 0,
      max: 100
    }
  },
  status: {
    type: DataTypes.ENUM('COMPLETED', 'IN_PROGRESS'),
    defaultValue: 'IN_PROGRESS'
  }
});

// Define associations
Result.associate = (models) => {
  Result.belongsTo(models.Exam, {
    foreignKey: 'examId',
    as: 'exam'
  });
  
  Result.belongsTo(models.Student, {
    foreignKey: 'studentId',
    as: 'student'
  });
};

module.exports = Result;