const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import models
const Project = require('./models/Project');
const ContactMessage = require('./models/ContactMessage');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Basic request validation helpers (lightweight to avoid extra deps)
const validateProjectBody = (req, res, next) => {
  const { title, description } = req.body || {};
  if (!title || !description) {
    return res.status(400).json({ message: 'title and description are required' });
  }
  next();
};

const validateContactBody = (req, res, next) => {
  const { name, email, message, phone } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'name, email, and message are required' });
  }
  next();
};

// MongoDB connection with error handling
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';

let dbConnected = false;

// keep connection state in sync so we can recover after temporary outages
const connection = mongoose.connection;
connection.on('connected', () => {
  dbConnected = true;
  console.log('MongoDB connected');
});
connection.on('disconnected', () => {
  dbConnected = false;
  console.log('MongoDB disconnected');
});
connection.on('error', (err) => {
  dbConnected = false;
  console.error('MongoDB connection error:', err);
});

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch(err => {
  console.log('Initial MongoDB connection attempt failed, running in offline mode. Error:', err.message);
});

// In-memory fallback stores (for offline/demo mode)
let memoryContactMessages = [];
let memoryProjects = [
  {
    _id: "1",
    title: "Fellowship Management System (Saas)",
    description: "Production Level SaaS for all University fellowships to manage members, events, and resources.",
    technologies: ["Laravel", "MySQL", "Tailwind CSS", "vanila js", "Blade"],
    liveUrl: "http://fellow-managemnt-system.ct.ws/public/",
    createdAt: new Date().toISOString()
  },
  {
    _id: "2",
    title: "Hawassa Fellowship Management System",
    description: "Test Level system for Hawassa University fellowship activities and member tracking.",
    technologies: ["Laravel", "MySQL", "Tailwind CSS", "Blade"],
    liveUrl: "https://hufellow.ct.ws/",
    createdAt: new Date().toISOString()
  },
  {
    _id: "3",
    title: "Tudo Novo Industrial Packaging System",
    description: "Factory management system for industrial packaging production and inventory (Sold project).",
    technologies: ["Nest.js", "Next.js", "PostgreSQL", "TypeScript"],
    liveUrl: "https://tudo-novo.ct.ws/public/",
    createdAt: new Date().toISOString()
  },
  {
    _id: "4",
    title: "TTM Technology Solution",
    description: "Official web application for TTM Technology Solution services and company profile.",
    technologies: ["React", "Node.js", "MongoDB"],
    liveUrl: "https://ttm-tech-solutions.ct.ws/",
    createdAt: new Date().toISOString()
  },
  {
    _id: "5",
    title: "Maraki Digital Invitation",
    description: "Web application for creating and managing digital invitations with premium designs.",
    technologies: ["Tailwind CSS", "Blade", "Laravel", "MySQL"],
    liveUrl: "https://ttm-tech-solutions.ct.ws/maraki-invitations/",
    createdAt: new Date().toISOString()
  },
  {
    _id: "6",
    title: "School Management System",
    description: "B.Sc. Thesis project: A comprehensive system for schools including student, teacher, and grade management.",
    technologies: ["PHP", "MySQL", "Tailwind CSS", "Vanilla JS"],
    liveUrl: "https://school-systems.ct.ws/",
    createdAt: new Date().toISOString()
  },
  {
    _id: "7",
    title: "Hospital Management System",
    description: "Internship project: Managed patient records, doctor schedules, and billing information.",
    technologies: ["Laravel", "MySQL", "Tailwind CSS", "Vanilla JS"],
    githubUrl: "https://github.com/flybet-code/hms",
    createdAt: new Date().toISOString()
  },
  {
    _id: "8",
    title: "Ketero Appointment Scheduling",
    description: "Semester project: Web-based platform to streamline scheduling between clients and service providers.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    githubUrl: "https://github.com/flybet-code/appointment",
    createdAt: new Date().toISOString()
  },
  {
    _id: "9",
    title: "Asgard Tour Guidance",
    description: "Semester project: Web-based system designed to simplify travel planning and attraction browsing.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    githubUrl: "https://github.com/flybet-code/Asgard-Tour-",
    createdAt: new Date().toISOString()
  }
];

// Routes with database connection checking
app.get('/api/projects', async (req, res) => {
  if (!dbConnected) {
    return res.json(memoryProjects);
  }

  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/api/projects/:id', async (req, res) => {
  if (!dbConnected) {
    const project = memoryProjects.find(p => String(p._id) === String(req.params.id));
    if (!project) return res.status(404).json({ message: 'Project not found' });
    return res.json(project);
  }

  try {
    const project = await Project.findById(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/projects', validateProjectBody, async (req, res) => {
  if (!dbConnected) {
    const newProject = {
      _id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    memoryProjects.unshift(newProject);
    return res.status(201).json(newProject);
  }

  try {
    const project = new Project(req.body);
    const savedProject = await project.save();
    res.status(201).json(savedProject);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/projects/:id', validateProjectBody, async (req, res) => {
  if (!dbConnected) {
    const index = memoryProjects.findIndex(p => String(p._id) === String(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Project not found' });
    memoryProjects[index] = { ...memoryProjects[index], ...req.body };
    return res.json(memoryProjects[index]);
  }

  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/projects/:id', async (req, res) => {
  if (!dbConnected) {
    memoryProjects = memoryProjects.filter(p => String(p._id) !== String(req.params.id));
    return res.json({ message: 'Project deleted successfully' });
  }

  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/contact', validateContactBody, async (req, res) => {
  if (!dbConnected) {
    const newMessage = {
      _id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || '',
      message: req.body.message,
      status: 'unread',
      createdAt: new Date().toISOString()
    };
    memoryContactMessages.unshift(newMessage);
    console.log('Contact message received (memory mode):', newMessage);
    return res.status(201).json(newMessage);
  }

  try {
    const contactMessage = new ContactMessage(req.body);
    const savedMessage = await contactMessage.save();
    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Route to see all contact messages
app.get('/api/contact', async (req, res) => {
  if (!dbConnected) {
    return res.json(memoryContactMessages);
  }

  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Route to update message status
app.patch('/api/contact/:id', async (req, res) => {
  const { status } = req.body;
  if (!['unread', 'pending', 'confirmed', 'canceled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  if (!dbConnected) {
    const msg = memoryContactMessages.find(m => String(m._id) === String(req.params.id));
    if (!msg) return res.status(404).json({ message: 'Message not found' });
    msg.status = status;
    return res.json(msg);
  }

  try {
    const message = await ContactMessage.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }

    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Serve static files from the React app in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
