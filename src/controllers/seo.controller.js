const SeoEntry = require('../models/SeoEntry.model');
const Post = require('../models/Post.model');
const Page = require('../models/Page.model');
const Solution = require('../models/Solution.model');
const ApiResponse = require('../utils/ApiResponse');
const asyncHandler = require('../utils/asyncHandler');
const mongoose = require('mongoose');

// GET /api/seo
exports.getAllSeo = asyncHandler(async (req, res) => {
  // Ensure the 6 core website pages exist in the Page collection
  const corePages = [
    { title: 'Home', slug: 'home' },
    { title: 'About', slug: 'about' },
    { title: 'Solutions', slug: 'solutions' },
    { title: 'Contact', slug: 'contact' },
    { title: 'Request Demo', slug: 'request-demo' },
    { title: 'Resources', slug: 'blog' }
  ];

  for (const page of corePages) {
    const exists = await Page.findOne({ slug: page.slug });
    if (!exists) {
      await Page.create({
        title: page.title,
        slug: page.slug,
        status: 'Published',
        content: `Static page content for ${page.title}`
      });
    }
  }

  // To show all pages in the table, we should fetch from Post, Page, Solution, then attach SEO
  const [posts, pages, solutions, seoEntries] = await Promise.all([
    Post.find({}).select('title slug status updatedAt createdAt').lean(),
    Page.find({}).select('title slug status updatedAt createdAt').lean(),
    Solution.find({}).select('title slug status updatedAt createdAt').lean(),
    SeoEntry.find({}).lean()
  ]);

  const seoMap = {};
  seoEntries.forEach(seo => {
    if (seo.pageId) {
      seoMap[seo.pageId.toString()] = seo;
    }
  });

  const mapData = (items, type) => items.map(item => {
    let url = '';
    if (type === 'Post') {
      url = `/blog/${item.slug}`;
    } else if (type === 'Solution') {
      url = `/solutions/${item.slug}`;
    } else if (type === 'Page') {
      url = item.slug === 'home' ? '/' : `/${item.slug}`;
    }
    url = url.replace(/\/\/+/g, '/');

    return {
      _id: item._id,
      pageType: type,
      name: item.title,
      url,
      slug: item.slug,
      status: item.status || 'Published',
      updatedAt: item.updatedAt || item.createdAt,
      seo: seoMap[item._id.toString()] || null
    };
  });

  const allPages = [
    ...mapData(posts, 'Post'),
    ...mapData(pages, 'Page'),
    ...mapData(solutions, 'Solution')
  ];

  return res.status(200).json(new ApiResponse(200, allPages, 'Fetched all pages with SEO'));
});

// GET /api/seo/:pageType/:pageId
exports.getSeo = asyncHandler(async (req, res) => {
  const { pageType, pageId } = req.params;
  const seo = await SeoEntry.findOne({ pageId, pageType });
  return res.status(200).json(new ApiResponse(200, seo, 'Fetched SEO entry'));
});

// GET /api/seo/analytics
exports.getSeoAnalytics = asyncHandler(async (req, res) => {
  const seoEntries = await SeoEntry.find({}).lean();
  
  let missingTitle = 0;
  let missingDesc = 0;
  let noIndex = 0;

  const titles = new Set();
  const descriptions = new Set();
  let duplicateTitles = 0;
  let duplicateDescriptions = 0;

  seoEntries.forEach(seo => {
    if (!seo.title) missingTitle++;
    else {
      if (titles.has(seo.title)) duplicateTitles++;
      else titles.add(seo.title);
    }

    if (!seo.description) missingDesc++;
    else {
      if (descriptions.has(seo.description)) duplicateDescriptions++;
      else descriptions.add(seo.description);
    }

    if (seo.robotsIndex === 'noindex') noIndex++;
  });

  // Basic score calculation
  const total = seoEntries.length || 1;
  const score = Math.max(0, 100 - ((missingTitle + missingDesc + duplicateTitles) / (total * 3) * 100));

  const analytics = {
    totalEntries: seoEntries.length,
    missingTitle,
    missingDesc,
    noIndex,
    duplicateTitles,
    duplicateDescriptions,
    score: Math.round(score)
  };

  return res.status(200).json(new ApiResponse(200, analytics, 'SEO Analytics'));
});

// POST /api/seo
exports.saveSeo = asyncHandler(async (req, res) => {
  const { pageId, pageType, ...seoData } = req.body;

  if (!pageId || !pageType) {
    return res.status(400).json(new ApiResponse(400, null, 'pageId and pageType are required'));
  }

  let slug = seoData.slug;
  if (!slug) {
    if (pageType === 'Post') {
      const item = await Post.findById(pageId).select('slug');
      if (item) slug = item.slug;
    } else if (pageType === 'Page') {
      const item = await Page.findById(pageId).select('slug');
      if (item) slug = item.slug;
    } else if (pageType === 'Solution') {
      const item = await Solution.findById(pageId).select('slug');
      if (item) slug = item.slug;
    }
  }

  const updatedSeo = await SeoEntry.findOneAndUpdate(
    { pageId, pageType },
    { $set: { ...seoData, slug, updatedBy: req.user?.id } },
    { new: true, upsert: true }
  );

  return res.status(200).json(new ApiResponse(200, updatedSeo, 'SEO updated successfully'));
});

// POST /api/seo/bulk
exports.bulkUpdateSeo = asyncHandler(async (req, res) => {
  const { updates } = req.body; // Array of { pageId, pageType, data }

  if (!Array.isArray(updates)) {
    return res.status(400).json(new ApiResponse(400, null, 'updates must be an array'));
  }

  const ops = updates.map(update => ({
    updateOne: {
      filter: { pageId: update.pageId, pageType: update.pageType },
      update: { $set: update.data },
      upsert: true
    }
  }));

  if (ops.length > 0) {
    await SeoEntry.bulkWrite(ops);
  }

  return res.status(200).json(new ApiResponse(200, null, 'Bulk SEO update successful'));
});

// GET /api/seo/:pageType/slug/:slug
exports.getSeoBySlug = asyncHandler(async (req, res) => {
  const { pageType, slug } = req.params;
  const seo = await SeoEntry.findOne({ slug, pageType });
  return res.status(200).json(new ApiResponse(200, seo, 'Fetched SEO entry by slug'));
});
