const mongoose = require('mongoose');

const referenceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  position: {
    type: String,
    required: true,
    trim: true
  },
  organization: {
    type: String,
    required: true,
    trim: true
  },
  location: {
    type: String,
    default: 'Ethiopia'
  },
  phone: {
    type: String,
    default: ''
  },
  email: {
    type: String,
    default: ''
  },
  tag: {
    type: String,
    default: 'Professional'
  },
  relationship: {
    type: String,
    default: ''
  },
  note: {
    type: String,
    default: ''
  },
  areas: [{
    type: String,
    trim: true
  }],
  order: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Reference', referenceSchema);
