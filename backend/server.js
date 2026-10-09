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
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

// Project image helper: ensures up to 3 images (1 required, 2 optional) are harmonized
const sanitizeProjectImages = (body) => {
  if (body.images && Array.isArray(body.images)) {
    const cleaned = body.images.filter(img => typeof img === 'string' && img.trim().length > 0).slice(0, 3);
    body.images = cleaned;
    if (cleaned.length > 0) {
      body.imageUrl = cleaned[0];
    }
  } else if (body.imageUrl && typeof body.imageUrl === 'string' && body.imageUrl.trim().length > 0) {
    body.images = [body.imageUrl.trim()];
  }
};

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

// In-memory mock data for offline mode / disconnected MongoDB
let mockProjects = [
  {
    _id: "1",
    title: "Fellowship Management System (Saas)",
    category: "SaaS & Cloud",
    description: "Production Level SaaS for all University fellowships to manage members, events, and resources.",
    technologies: ["Laravel", "MySQL", "Tailwind CSS", "Vanilla JS", "Blade"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80"
    ],
    liveUrl: "http://fellow-managemnt-system.ct.ws/public/"
  },
  {
    _id: "2",
    title: "Hawassa Fellowship Management System",
    category: "Web Applications",
    description: "Test Level system for Hawassa University fellowship activities and member tracking.",
    technologies: ["Laravel", "MySQL", "Tailwind CSS", "Blade"],
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
    ],
    liveUrl: "https://hufellow.ct.ws/"
  },
  {
    _id: "3",
    title: "Tudo Novo Industrial Packaging System",
    category: "Enterprise Systems",
    description: "Factory management system for industrial packaging production and inventory (Sold project).",
    technologies: ["Nest.js", "Next.js", "PostgreSQL", "TypeScript"],
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80"
    ],
    liveUrl: "https://tudo-novo.ct.ws/public/"
  },
  {
    _id: "4",
    title: "TTM Technology Solution",
    category: "Business Systems",
    description: "Official web application for TTM Technology Solution services and company profile.",
    technologies: ["React", "Node.js", "MongoDB"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
    ],
    liveUrl: "https://ttm-tech-solutions.ct.ws/"
  },
  {
    _id: "5",
    title: "Maraki Digital Invitation",
    category: "E-Commerce",
    description: "Web application for creating and managing digital invitations with premium designs.",
    technologies: ["Tailwind CSS", "Blade", "Laravel", "MySQL"],
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80"
    ],
    liveUrl: "https://ttm-tech-solutions.ct.ws/maraki-invitations/"
  },
  {
    _id: "6",
    title: "School Management System",
    category: "Education Platforms",
    description: "B.Sc. Thesis project: A comprehensive system for schools including student, teacher, and grade management.",
    technologies: ["PHP", "MySQL", "Tailwind CSS", "Vanilla JS"],
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
    ],
    liveUrl: "https://school-systems.ct.ws/"
  },
  {
    _id: "7",
    title: "Hospital Management System",
    category: "Healthcare Systems",
    description: "Internship project: Managed patient records, doctor schedules, and billing information.",
    technologies: ["Laravel", "MySQL", "Tailwind CSS", "Vanilla JS"],
    imageUrl: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80"
    ],
    githubUrl: "https://github.com/flybet-code/hms"
  },
  {
    _id: "8",
    title: "Ketero Appointment Scheduling",
    category: "Real-Time Applications",
    description: "Semester project: Web-based platform to streamline scheduling between clients and service providers.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=1200&q=80"
    ],
    githubUrl: "https://github.com/flybet-code/appointment"
  },
  {
    _id: "9",
    title: "Asgard Tour Guidance",
    category: "Mobile Apps",
    description: "Semester project: Web-based system designed to simplify travel planning and attraction browsing.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=1200&q=80"
    ],
    githubUrl: "https://github.com/flybet-code/Asgard-Tour-"
  }
];

let mockMessages = [
  {
    _id: 'mock-msg-1',
    name: 'Samuel Alemu',
    email: 'samuel.alemu@example.com',
    phone: '+251 911 234 567',
    message: 'Hello Desalew, I reviewed your portfolio and would like to discuss a web application project for our organization.',
    status: 'unread',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'mock-msg-2',
    name: 'Helen Tadesse',
    email: 'helen.t@startup.et',
    phone: '+251 922 456 789',
    message: 'Hi! We are looking for an experienced software engineer to help build our SaaS platform with Laravel and React.',
    status: 'pending',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

// Routes with database connection checking
app.get('/api/projects', async (req, res) => {
  if (!dbConnected) {
    return res.json(mockProjects);
  }

  try {
    const projects = await Project.find().sort({ createdAt: -1 });
    res.json(projects);
  } catch (error) {
    res.json(mockProjects);
  }
});

app.get('/api/projects/:id', async (req, res) => {
  if (!dbConnected) {
    const found = mockProjects.find(p => String(p._id) === String(req.params.id));
    if (found) return res.json(found);
    return res.status(404).json({ message: 'Project not found' });
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
  sanitizeProjectImages(req.body);
  if (!dbConnected) {
    const newProj = {
      _id: 'proj-' + Date.now(),
      ...req.body,
      technologies: Array.isArray(req.body.technologies) ? req.body.technologies : [],
      images: Array.isArray(req.body.images) ? req.body.images : (req.body.imageUrl ? [req.body.imageUrl] : []),
      createdAt: new Date().toISOString()
    };
    mockProjects.unshift(newProj);
    return res.status(201).json(newProj);
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
  sanitizeProjectImages(req.body);
  if (!dbConnected) {
    const idx = mockProjects.findIndex(p => String(p._id) === String(req.params.id));
    if (idx !== -1) {
      mockProjects[idx] = { 
        ...mockProjects[idx], 
        ...req.body,
        images: Array.isArray(req.body.images) ? req.body.images : (req.body.imageUrl ? [req.body.imageUrl] : mockProjects[idx].images)
      };
      return res.json(mockProjects[idx]);
    }
    return res.status(404).json({ message: 'Project not found' });
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
    mockProjects = mockProjects.filter(p => String(p._id) !== String(req.params.id));
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
    const newMsg = {
      _id: 'mock-msg-' + Date.now(),
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone || '',
      message: req.body.message,
      status: 'unread',
      createdAt: new Date().toISOString()
    };
    mockMessages.unshift(newMsg);
    console.log('Contact message received (offline mode):', newMsg);
    return res.status(201).json(newMsg);
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
    return res.json(mockMessages);
  }

  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.json(mockMessages);
  }
});

// Route to update message status
app.patch('/api/contact/:id', async (req, res) => {
  const { status } = req.body;
  if (!['unread', 'pending', 'confirmed', 'canceled'].includes(status)) {
    return res.status(400).json({ message: 'Invalid status' });
  }

  if (!dbConnected) {
    const found = mockMessages.find(m => String(m._id) === String(req.params.id));
    if (found) {
      found.status = status;
      return res.json(found);
    }
    return res.json({ _id: req.params.id, status });
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

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
