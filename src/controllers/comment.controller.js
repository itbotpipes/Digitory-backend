const Comment = require('../models/Comment.model');
const Post = require('../models/Post.model');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');

// POST /api/comments
exports.createComment = asyncHandler(async (req, res) => {
  const { post, name, text } = req.body;

  if (!post || !name || !text) {
    return res.status(400).json(new ApiResponse(400, null, 'Post ID, name, and text are required'));
  }

  // Verify post exists
  const postExists = await Post.findById(post);
  if (!postExists) {
    return res.status(404).json(new ApiResponse(404, null, 'Post not found'));
  }

  const comment = await Comment.create({
    post,
    name,
    text,
  });

  return res.status(201).json(new ApiResponse(201, comment, 'Comment posted successfully'));
});

// GET /api/comments/post/:postId
exports.getCommentsByPost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const comments = await Comment.find({ post: postId, isDeleted: false })
    .sort({ createdAt: -1 }) // newest first
    .lean();

  return res.status(200).json(new ApiResponse(200, comments, 'Comments retrieved successfully'));
});

// GET /api/comments (Admin only)
exports.getAllComments = asyncHandler(async (req, res) => {
  const comments = await Comment.find({ isDeleted: false })
    .populate('post', 'title slug')
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

  return res.status(200).json(new ApiResponse(200, null, 'Comment deleted successfully'));
});
