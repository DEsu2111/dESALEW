const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Certificate = require('./models/Certificate');
const Reference = require('./models/Reference');

// Import initial data
const {
  initialProjects,
  initialSkills,
  initialCertificates,
  initialReferences
} = require('./initialData');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

const seedDatabase = async () => {
  try {
    console.log('Connecting to MongoDB for seeding...');
    await mongoose.connect(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected successfully');

    // 1. Seed Projects
    await Project.deleteMany({});
    await Project.insertMany(initialProjects);
    console.log(`✓ Seeded ${initialProjects.length} projects`);

    // 2. Seed Skills
    await Skill.deleteMany({});
    await Skill.insertMany(initialSkills);
    console.log(`✓ Seeded ${initialSkills.length} skills`);

    // 3. Seed Certificates
    await Certificate.deleteMany({});
    await Certificate.insertMany(initialCertificates);
    console.log(`✓ Seeded ${initialCertificates.length} certificates`);

    // 4. Seed References
    await Reference.deleteMany({});
    await Reference.insertMany(initialReferences);
    console.log(`✓ Seeded ${initialReferences.length} references`);

    console.log('\nAll portfolio database collections successfully seeded!');
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    try {
      await mongoose.connection.close();
    } catch (e) {}
    process.exit(1);
  }
};

seedDatabase();