const Exam = require('../models/Exam');
const Section = require('../models/Section');

exports.createExam = async (req, res) => {
  try {

    const exam = await Exam.create(req.body);
    console.log(req.body);
    res.status(201).json(exam);

  } catch (error) {

    res.status(400).json({ message: error.message });

  }
};

exports.getExams = async (req, res) => {
  try {
    // Use a single query with eager loading
    const exams = await Exam.findAll({

      attributes: ['id', 'name', 'date', 'time'],
      include: [{
        model: Section,
        as: 'sections',
        attributes: ['id', 'name', 'type', 'totalQuestions']
      }],
      order: [
        ['date', 'ASC'],
        ['sections', 'id', 'ASC']
      ]
    });

    res.status(200).json(exams);
    
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getExam = async (req, res) => {
  try {
    // Use a single query with eager loading
    const exam = await Exam.findByPk(req.params.examId, {
      include: [{
        model: Section,
        as: 'sections',
        attributes: ['id', 'name', 'type', 'totalQuestions', 'questionPattern'],
        order: [['id', 'ASC']]
      }]
    });

    if (!exam) {
      return res.status(404).json({ message: 'Exam not found' });
    }

    res.status(200).json(exam);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};