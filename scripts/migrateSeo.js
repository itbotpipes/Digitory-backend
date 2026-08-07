const mongoose = require('mongoose');
const path = require('path');
const dotenv = require('dotenv');

// Load env
dotenv.config({ path: path.join(__dirname, '../.env') });

const Post = require('../src/models/Post.model');
const Page = require('../src/models/Page.model');
const Solution = require('../src/models/Solution.model');
const SeoEntry = require('../src/models/SeoEntry.model');

async function migrateSeo() {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/digitory');
    console.log('Connected to MongoDB');

    const migrateCollection = async (Model, pageType) => {
      const items = await Model.find({}).lean();
      console.log(`Found ${items.length} ${pageType}s to migrate.`);

      let migratedCount = 0;
      for (const item of items) {
        // Check if SeoEntry already exists
        const existing = await SeoEntry.findOne({ pageId: item._id, pageType });
        if (existing) continue;

        const seoData = item.seo || {};

        let robotsIndex = 'index';
        let robotsFollow = 'follow';

        if (seoData.robots) {
          if (seoData.robots.includes('noindex')) robotsIndex = 'noindex';
          if (seoData.robots.includes('nofollow')) robotsFollow = 'nofollow';
        }

        const newSeo = new SeoEntry({
          pageId: item._id,
          pageType,
          title: seoData.metaTitle || item.title,
          description: seoData.metaDescription || item.excerpt || '',
          keywords: seoData.keywords || [],
          canonicalUrl: seoData.canonicalUrl || '',
          slug: item.slug || '',
          robotsIndex,
          robotsFollow,
          openGraph: {
            title: seoData.openGraph?.title || '',
            description: seoData.openGraph?.description || '',
            image: seoData.openGraph?.image?.url || '',
          },
          twitterCard: {
            title: seoData.twitterCard?.title || '',
            description: seoData.twitterCard?.description || '',
            image: '', // old schema didn't explicitly have twitter image
          },
          schemaType: 'None',
          schemaData: seoData.structuredData || {},
        });

        await newSeo.save();
        migratedCount++;
      }
      console.log(`Migrated ${migratedCount} ${pageType} SEO entries.`);
    };

    await migrateCollection(Post, 'Post');
    await migrateCollection(Page, 'Page');
    await migrateCollection(Solution, 'Solution');

    console.log('SEO Migration Complete!');
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrateSeo();
