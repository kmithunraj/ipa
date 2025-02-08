const Section = require('../models/Section');

exports.createSection = async (req, res) => {
  try {
    const section = await Section.create(req.body);
    res.status(201).json(section);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getSection = async (req, res) => {
  try {
    const section = await Section.findByPk(req.params.sectionId);

    if (!section) {
      return res.status(404).json({ message: 'Section not found' });
    }

    const { type, questionPattern, totalQuestions } = section;

    // Function to generate random numbers with the specified digits
    const generateRandomNumber = (digits) => {
      const min = Math.pow(10, digits - 1);
      const max = Math.pow(10, digits) - 1;
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };

    // Generate all questions
    const questions = Array.from({ length: totalQuestions }, () => {
      const numbers = questionPattern.flatMap(([digits, count]) =>
        Array.from({ length: count }, () => generateRandomNumber(digits))
      );

      let question;
      let answer;

      switch (type) {
        case 'Addition':
          question = numbers.join(' + ');
          answer = numbers.reduce((acc, num) => acc + num, 0);
          break;
        case 'Subtraction':
          question = numbers.join(' - ');
          answer = numbers.reduce((acc, num) => acc - num);
          break;
        case 'Multiplication':
          question = numbers.join(' * ');
          answer = numbers.reduce((acc, num) => acc * num, 1);
          break;
        case 'Division':
          question = numbers.join(' / ');
          answer = numbers.reduce((acc, num) => acc / num);
          break;
        default:
          return { error: 'Invalid operation type' };
      }

      return { question, answer };
    });

    res.status(200).json(questions);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};