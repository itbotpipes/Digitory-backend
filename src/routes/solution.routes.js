const express = require('express');
const solutionController = require('../controllers/solution.controller');
const { createSolutionValidator, updateSolutionValidator, getSolutionsValidator } = require('../validators/solution.validator');
const validate = require('../middlewares/validate');
const asyncHandler = require('../utils/asyncHandler');
const authenticate = require('../middlewares/auth');

const router = express.Router();

// Public endpoints
router.get('/', getSolutionsValidator, validate, asyncHandler(solutionController.getSolutions));
router.get('/:idOrSlug', asyncHandler(solutionController.getSolution));

// Admin routes
router.use(authenticate);

router.post('/', createSolutionValidator, validate, asyncHandler(solutionController.createSolution));
router.put('/:id', updateSolutionValidator, validate, asyncHandler(solutionController.updateSolution));
router.delete('/:id', asyncHandler(solutionController.deleteSolution));

module.exports = router;
