const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Project = require('./models/Project');

// MongoDB connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('MongoDB connected for seeding'))
  .catch(err => console.log('MongoDB connection error:', err));

// Sample projects data based on Betsegaw's experience
const projects = [
  {
    title: "Fast Bingo, Keno & Chicken Road Platforms",
    description: "Fully functional multiplayer games engineered with continuous loops, quick tick speeds, dynamic risk assessment mechanics, and strict server-authoritative state security.",
    technologies: ["TypeScript", "React", "Socket.IO", "Redis", "PostgreSQL"],
    githubUrl: "https://github.com/DEsu2111",
    liveUrl: ""
  },
  {
    title: "Aviator System & Custom Canvas Engine",
    description: "Implemented mathematical crash curve generations mapping accurate ticks over hundreds of simultaneous connected socket instances instantly.",
    technologies: ["TypeScript", "React", "Canvas API", "Socket.IO", "Node.js"],
    githubUrl: "https://github.com/DEsu2111",
    liveUrl: ""
  },
  {
    title: "Multi-Tenant Game Management Dashboard",
    description: "Comprehensive operations control board built to handle distinct third-party operators, aggregate financial data reporting, and handle individual game logic rules configurations remotely.",
    technologies: ["React", "Node.js", "PostgreSQL", "Docker", "Redis"],
    githubUrl: "https://github.com/DEsu2111",
    liveUrl: ""
  },
  {
    title: "Fellowship Management System (SaaS)",
    description: "Production Level SaaS for all University fellowships to manage members, events, and resources.",
    technologies: ["Laravel", "MySQL", "Tailwind CSS", "Vanilla JS", "Blade"],
    liveUrl: "http://fellow-managemnt-system.ct.ws/public/",
    githubUrl: ""
  },
  {
    title: "Tudo Novo Industrial Packaging System",
    description: "Factory management system for industrial packaging production and inventory (Sold project).",
    technologies: ["Nest.js", "Next.js", "PostgreSQL", "TypeScript"],
    liveUrl: "https://tudo-novo.ct.ws/public/",
    githubUrl: ""
  },
  {
    title: "TTM Technology Solution",
    description: "Official web application for TTM Technology Solution services and company profile.",
    technologies: ["React", "Node.js", "MongoDB"],
    liveUrl: "https://ttm-tech-solutions.ct.ws/",
    githubUrl: ""
  },
  {
    title: "Maraki Digital Invitation",
    description: "Web application for creating and managing digital invitations with premium designs.",
    technologies: ["Tailwind CSS", "Blade", "Laravel", "MySQL"],
    liveUrl: "https://ttm-tech-solutions.ct.ws/maraki-invitations/",
    githubUrl: ""
  },
  {
    title: "School Management System",
    description: "B.Sc. Thesis project: A comprehensive system for schools including student, teacher, and grade management.",
    technologies: ["PHP", "MySQL", "Tailwind CSS", "Vanilla JS"],
    liveUrl: "https://school-systems.ct.ws/",
    githubUrl: ""
  }
];

// Seed function
const seedProjects = async () => {
  try {
    // Clear existing projects
    await Project.deleteMany({});
    console.log('Existing projects cleared');

    // Insert new projects
    await Project.insertMany(projects);
    console.log('Projects seeded successfully');

    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding projects:', error);
    mongoose.connection.close();
  }
};

// Run the seed function
seedProjects();