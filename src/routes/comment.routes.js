const express = require('express');
const {
  createComment,
  getCommentsByPost,
  getAllComments,
  deleteComment,
  editComment,
  reportComment,
} = require('../controllers/comment.controller');
const authenticate = require('../middlewares/auth');

const router = express.Router();

// Public routes
router.post('/', createComment);
router.get('/post/:postId', getCommentsByPost);
router.put('/:id', editComment);
router.post('/:id/report', reportComment);

// Admin routes
router.use(authenticate);
const authorize = require('../middlewares/authorize');
router.use(authorize('manage_comments'));

router.get('/', getAllComments);
router.delete('/:id', deleteComment);

module.exports = router;
