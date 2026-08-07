const express = require('express');
const userController = require('../controllers/user.controller');
const { 
  createUserValidator, 
  updateUserValidator, 
  updateStatusValidator, 
  getUsersValidator 
} = require('../validators/user.validator');
const validate = require('../middlewares/validate');
const asyncHandler = require('../utils/asyncHandler');
const authenticate = require('../middlewares/auth');

const router = express.Router();

// All user routes are protected
router.use(authenticate);
// We would apply authorize('Admin') here, but keeping it simple for MVP if middleware doesn't exist yet

router.route('/')
  .get(getUsersValidator, validate, asyncHandler(userController.getUsers))
  .post(createUserValidator, validate, asyncHandler(userController.createUser));

router.route('/roles')
  .get(asyncHandler(userController.getRoles));

router.route('/:id')
  .get(asyncHandler(userController.getUserById))
  .put(updateUserValidator, validate, asyncHandler(userController.updateUser))
  .delete(asyncHandler(userController.deleteUser));

router.route('/:id/status')
  .patch(updateStatusValidator, validate, asyncHandler(userController.updateStatus));

module.exports = router;
