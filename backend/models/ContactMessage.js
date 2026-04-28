const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  message: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['unread', 'pending', 'confirmed', 'canceled'],
    default: 'unread'
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('ContactMessage', contactSchema);