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
    title: "Fellowship Management System (Saas)",
    description: "Production Level SaaS for all University fellowships to manage members, events, and resources.",
    technologies: ["Laravel", "MySQL", "Tailwind CSS", "vanila js", "Blade"],
    liveUrl: "http://fellow-managemnt-system.ct.ws/public/",
    githubUrl: ""
  },
  {
    title: "Hawassa Fellowship Management System",
    description: "Test Level system for Hawassa University fellowship activities and member tracking.",
    technologies: ["Laravel", "MySQL", "Tailwind CSS", "Blade"],
    liveUrl: "https://hufellow.ct.ws/",
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
  },
  {
    title: "Hospital Management System",
    description: "Internship project: Managed patient records, doctor schedules, and billing information.",
    technologies: ["Laravel", "MySQL", "Tailwind CSS", "Vanilla JS"],
    githubUrl: "https://github.com/flybet-code/hms",
    liveUrl: ""
  },
  {
    title: "Ketero Appointment Scheduling",
    description: "Semester project: Web-based platform to streamline scheduling between clients and service providers.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    githubUrl: "https://github.com/flybet-code/appointment",
    liveUrl: ""
  },
  {
    title: "Asgard Tour Guidance",
    description: "Semester project: Web-based system designed to simplify travel planning and attraction browsing.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    githubUrl: "https://github.com/flybet-code/Asgard-Tour-",
    liveUrl: ""
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