const express = require('express');
const router = express.Router();
const {
  createResult,
  getAllResults,
  getResult,
  updateResult,
  deleteResult,
  getResultsByStudent,
  getResultsByClass,
  getResultsStatistics
} = require('../controllers/resultController');

// Statistics route (must be before :id route)
router.get('/statistics', getResultsStatistics);

// Get results by student
router.get('/student/:studentId', getResultsByStudent);

// Get results by class
router.get('/class/:className', getResultsByClass);

// Main CRUD routes
router.post('/', createResult);
router.get('/', getAllResults);
router.get('/:id', getResult);
router.put('/:id', updateResult);
router.delete('/:id', deleteResult);

module.exports = router;