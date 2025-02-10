const Result = require('../models/Result');
const Student = require('../models/Student');
const Section = require('../models/Section');

const createResult = async (req, res) => {
    const { studentId, sectionId, score } = req.body;
    const result = await Result.create({ studentId, sectionId, score });
    res.status(201).json(result);
}

const getResults = async (req, res) => {
    const results = await Result.findAll();
    res.status(200).json(results);
}   

module.exports = { createResult, getResults };