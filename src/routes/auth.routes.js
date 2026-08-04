const express = require('express');
const authController = require('../controllers/auth.controller');
const { loginValidator } = require('../validators/auth.validator');
const validate = require('../middlewares/validate');
const asyncHandler = require('../utils/asyncHandler');
const authenticate = require('../middlewares/auth');

const router = express.Router();

// Public route
router.post('/login', loginValidator, validate, asyncHandler(authController.login));

// Protected route
router.get('/me', authenticate, asyncHandler(authController.getMe));

module.exports = router;
