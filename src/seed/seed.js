const { sequelize } = require('../config/db');
const Student = require('../models/Student');
const Exam = require('../models/Exam');
const Section = require('../models/Section');
const exams = require('./seedData/exams.json');
const sections = require('./seedData/sections.json');

const seedDatabase = async () => {
  try {

    // Seed exams and sections in parallel
    const [createdExams, createdSections] = await Promise.all([
      Exam.bulkCreate(exams),
      Section.bulkCreate(sections)
    ]);

    console.log(`✓ Created ${createdExams.length} exams`);
    console.log(`✓ Created ${createdSections.length} sections`);
    console.log('Database seeded successfully');
  } catch (error) {
    console.error('Error seeding database:', error);
    throw error; // Let the caller handle the error
  }
};

module.exports = seedDatabase;
