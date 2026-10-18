const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  fullName: {
    type: String,
    default: 'Desalew Alganeh',
    trim: true
  },
  headline: {
    type: String,
    default: 'Electrical & Computer Engineer • Full Stack Developer',
    trim: true
  },
  location: {
    type: String,
    default: 'Addis Ababa, Ethiopia',
    trim: true
  },
  phone: {
    type: String,
    default: '+251 962 622 111',
    trim: true
  },
  email: {
    type: String,
    default: 'desu6262@gmail.com',
    trim: true
  },
  telegram: {
    type: String,
    default: 'https://t.me/desu6262',
    trim: true
  },
  github: {
    type: String,
    default: 'https://github.com/flybet-code',
    trim: true
  },
  linkedin: {
    type: String,
    default: 'https://linkedin.com/in/desalew-alganeh',
    trim: true
  },
  bio: {
    type: String,
    default: 'Graduated in Electrical and Computer Engineering. Passionate about architecting scalable full-stack applications, enterprise SaaS solutions, and modern software architectures.',
    trim: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Profile', ProfileSchema);
