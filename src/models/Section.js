const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

const Section = sequelize.define('Section', {
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
  name:{
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  type: {
    type: DataTypes.ENUM('Addition', 'Subtraction', 'Multiplication', 'Division'),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  questionPattern: {
    type: DataTypes.ARRAY(DataTypes.ARRAY(DataTypes.INTEGER)),
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  totalQuestions: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

// Define associations
Section.associate = (models) => {
  Section.belongsTo(models.Exam, {
    foreignKey: 'examId',
    as: 'exam'
  });
};

module.exports = Section;