const mongoose = require('mongoose');
const seoSchema = require('./schemas/SEO.schema');

const featureItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true },
  linkText: { type: String },
  linkHref: { type: String }
}, { _id: false });

const simpleBlockSchema = new mongoose.Schema({
  title: { type: String, required: true },
  desc: { type: String, required: true }
}, { _id: false });

const industrySchema = new mongoose.Schema(
  {
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },
    shortLabel: { type: String, required: true },
    icon: { type: String }, // SVG string
    title: { type: String, required: true },
    subtitle: { type: String },
    description: { type: String },
    trustText: { type: String },
    heroImage: { type: String },

    featuresTitle: { type: String },
    features: [featureItemSchema],

    whyChooseTitle: { type: String },
    whyChoose: [{ type: String }],

    ctaBlock: { type: simpleBlockSchema },

    seo: {
      type: seoSchema,
      default: () => ({}),
    },
  },
  { timestamps: true }
);

const Industry = mongoose.model('Industry', industrySchema);
module.exports = Industry;
