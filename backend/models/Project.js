const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  technologies: [{
    type: String
  }],
  category: {
    type: String,
    default: 'Web Applications'
  },
  imageUrl: {
    type: String
  },
  images: [{
    type: String
  }],
  liveUrl: {
    type: String
  },
  githubUrl: {
    type: String
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Project', projectSchema);