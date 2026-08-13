const Comment = require('../models/Comment.model');
const Post = require('../models/Post.model');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const jwt = require('jsonwebtoken');
const env = require('../config/env');

// Helper to optionally get user ID from authorization header
const getUserIdFromHeader = (req) => {
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, env.JWT_SECRET);
      return decoded.id;
    }
  } catch (err) {}
  return null;
};

// POST /api/comments
exports.createComment = asyncHandler(async (req, res) => {
  const { post, name, text, parentId } = req.body;

  if (!post || !name || !text) {
    return res.status(400).json(new ApiResponse(400, null, 'Post ID, name, and text are required'));
  }

  // Verify post exists
  const postExists = await Post.findById(post);
  if (!postExists) {
    return res.status(404).json(new ApiResponse(404, null, 'Post not found'));
  }

  // Determine user ID if logged in
  const userId = getUserIdFromHeader(req);

  const commentData = {
    post,
    name,
    text,
    user: userId || null,
    parentId: parentId || null
  };

  const comment = await Comment.create(commentData);

  // Return comment populated with user
  const populated = await Comment.findById(comment._id)
    .populate('user', 'name email')
    .lean();

  return res.status(201).json(new ApiResponse(201, populated, 'Comment posted successfully'));
});

// PUT /api/comments/:id
exports.editComment = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json(new ApiResponse(400, null, 'Comment text is required'));
  }

  const comment = await Comment.findById(id);
  if (!comment) {
    return res.status(404).json(new ApiResponse(404, null, 'Comment not found'));
  }

  // Verify ownership
  const requestUserId = getUserIdFromHeader(req);
  if (comment.user && (!requestUserId || comment.user.toString() !== requestUserId)) {
    return res.status(403).json(new ApiResponse(403, null, 'Not authorized to edit this comment'));
  }

  comment.text = text;
  comment.isEdited = true;
  await comment.save();

  const populated = await Comment.findById(comment._id)
    .populate('user', 'name email')
    .lean();

  return res.status(200).json(new ApiResponse(200, populated, 'Comment edited successfully'));
});

// POST /api/comments/:id/report
exports.reportComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);
  if (!comment) {
    return res.status(404).json(new ApiResponse(404, null, 'Comment not found'));
  }

  comment.reportsCount += 1;
  comment.isReported = true;
  await comment.save();

  return res.status(200).json(new ApiResponse(200, comment, 'Comment reported successfully'));
});

// GET /api/comments/post/:postId
exports.getCommentsByPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  // Retrieve all comments for this post
  const comments = await Comment.find({ post: postId, isDeleted: { $ne: true } })
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .lean();

  return res.status(200).json(new ApiResponse(200, comments, 'Comments retrieved successfully'));
});

// GET /api/comments (Admin & Filter by User / Name)
exports.getAllComments = asyncHandler(async (req, res) => {
  const { user, name } = req.query;
  const filter = { isDeleted: { $ne: true } };

  if (user) {
    filter.user = user;
  }
  if (name) {
    filter.name = { $regex: name, $options: 'i' }; // Case-insensitive filter
  }

  const comments = await Comment.find(filter)
    .populate('post', 'title slug')
    .populate('user', 'name email')
    .sort({ createdAt: -1 })
    .lean();

  return res.status(200).json(new ApiResponse(200, comments, 'All comments retrieved successfully'));
});

// DELETE /api/comments/:id (Admin only)
exports.deleteComment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const comment = await Comment.findById(id);
  if (!comment) {
    return res.status(404).json(new ApiResponse(404, null, 'Comment not found'));
  }

  comment.isDeleted = true;
  await comment.save();

  // Cascade soft-delete to any child replies
  await Comment.updateMany({ parentId: id }, { $set: { isDeleted: true } });

  return res.status(200).json(new ApiResponse(200, null, 'Comment deleted successfully'));
});
