const mongoose = require('mongoose');
const env = require('../config/env');
const logger = require('../config/logger');

// Models
const Role = require('../models/Role.model');
const User = require('../models/User.model');
const Settings = require('../models/Settings.model');
const Navigation = require('../models/Navigation.model');

const seedDatabase = async () => {
  try {
    logger.info('Starting database seed...');
    await mongoose.connect(env.MONGO_URI);
    logger.info('Connected to MongoDB');

    // 1. Roles
    logger.info('Seeding Roles...');
    let adminRole = await Role.findOne({ name: 'Admin' });
    if (!adminRole) {
      adminRole = await Role.create({
        name: 'Admin',
        description: 'Super Administrator with all permissions',
        isSystemRole: true,
        priority: 1
      });
    }

    let editorRole = await Role.findOne({ name: 'Editor' });
    if (!editorRole) {
      editorRole = await Role.create({
        name: 'Editor',
        description: 'Content Editor with restricted permissions',
        isSystemRole: true,
        priority: 2
      });
    }

    // 2. Default User
    logger.info('Seeding Default Admin User...');
    const adminEmail = 'admin@digitory.com';
    let adminUser = await User.findOne({ email: adminEmail });
    if (!adminUser) {
      adminUser = await User.create({
        name: 'Digitory Admin',
        email: adminEmail,
        password: 'password123', // Will be hashed by pre-save hook
        roleId: adminRole._id,
        status: 'Active'
      });
    }

    // 3. Settings
    logger.info('Seeding Settings...');
    let settings = await Settings.findOne();
    if (!settings) {
      settings = await Settings.create({
        branding: {
          companyName: 'Digitory',
          logo: '',
          favicon: ''
        },
        contactInformation: {
          email: 'hello@digitory.com'
        },
        defaultSeo: {
          title: 'Digitory - Default Title',
          description: 'Default SEO Description for Digitory CMS'
        }
      });
    }

    // 4. Navigation
    logger.info('Seeding Navigation...');
    const headerNav = await Navigation.findOne({ location: 'header' });
    if (!headerNav) {
      await Navigation.create({
        name: 'Main Header',
        location: 'header',
        items: [
          { label: 'Home', type: 'link', url: '/', order: 1 },
          { label: 'Blog', type: 'link', url: '/blog', order: 2 }
        ]
      });
    }

    const footerNav = await Navigation.findOne({ location: 'footer' });
    if (!footerNav) {
      await Navigation.create({
        name: 'Main Footer',
        location: 'footer',
        items: [
          { label: 'Privacy Policy', type: 'link', url: '/privacy', order: 1 },
          { label: 'Terms of Service', type: 'link', url: '/terms', order: 2 }
        ]
      });
    }

    logger.info('Database seed completed successfully!');
    process.exit(0);
  } catch (error) {
    logger.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
