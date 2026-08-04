const express = require('express');
const ApiResponse = require('../utils/ApiResponse');
const mongoose = require('mongoose');
const authRoutes = require('./auth.routes');
const userRoutes = require('./user.routes');
const pageRoutes = require('./page.routes');
const mediaRoutes = require('./media.routes');
const navigationRoutes = require('./navigation.routes');
const settingsRoutes = require('./settings.routes');
const categoryRoutes = require('./category.routes');
const postRoutes = require('./post.routes');
const { testimonialRouter, faqRouter, contactRouter, demoRouter } = require('./shared.routes');
const dashboardRoutes = require('./dashboard.routes');

const router = express.Router();

router.get('/health', (req, res) => {
  res.status(200).json(new ApiResponse(200, { status: 'UP' }, 'Service is healthy'));
});

router.get('/live', (req, res) => {
  res.status(200).json(new ApiResponse(200, { status: 'UP' }, 'Service is live'));
});

router.get('/ready', async (req, res) => {
  const dbStatus = mongoose.connection.readyState === 1 ? 'UP' : 'DOWN';
  const statusCode = dbStatus === 'UP' ? 200 : 503;

  res.status(statusCode).json(new ApiResponse(statusCode, {
    status: dbStatus,
    database: dbStatus,
  }, `Service is ${dbStatus === 'UP' ? 'ready' : 'not ready'}`));
});

// Mount Routes
router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/pages', pageRoutes);
router.use('/media', mediaRoutes);
router.use('/navigation', navigationRoutes);
router.use('/settings', settingsRoutes);
router.use('/categories', categoryRoutes);
router.use('/posts', postRoutes);
router.use('/testimonials', testimonialRouter);
router.use('/faqs', faqRouter);
router.use('/contact-messages', contactRouter);
router.use('/demo-requests', demoRouter);
router.use('/dashboard', dashboardRoutes);

module.exports = router;
