const mongoose = require('mongoose');

const demoRequestSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    locations: {
      type: String,
      trim: true,
    },
    goal: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['New', 'Contacted', 'Qualified', 'Closed'],
      default: 'New',
    },
  },
  { timestamps: true }
);

const DemoRequest = mongoose.model('DemoRequest', demoRequestSchema);
module.exports = DemoRequest;
