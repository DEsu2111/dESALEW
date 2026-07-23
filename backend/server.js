const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import models
const Project = require('./models/Project');
const ContactMessage = require('./models/ContactMessage');
const Certificate = require('./models/Certificate');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

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

const fs = require('fs');

// File-backed persistence for contact messages in fallback mode
const MESSAGES_FILE = path.join(__dirname, 'data/messages.json');
if (!fs.existsSync(path.join(__dirname, 'data'))) {
  fs.mkdirSync(path.join(__dirname, 'data'), { recursive: true });
}

const loadMessagesFromDisk = () => {
  try {
    if (fs.existsSync(MESSAGES_FILE)) {
      const data = fs.readFileSync(MESSAGES_FILE, 'utf8');
      return JSON.parse(data);
    }
  } catch (err) {
    console.error('Error loading messages from disk:', err);
  }
  return [];
};

const saveMessagesToDisk = (msgs) => {
  try {
    fs.writeFileSync(MESSAGES_FILE, JSON.stringify(msgs, null, 2), 'utf8');
  } catch (err) {
    console.error('Error saving messages to disk:', err);
  }
};

// In-memory fallback stores (for offline/demo mode)
let memoryContactMessages = loadMessagesFromDisk();
let memoryProjects = [
  {
    _id: "igaming-1",
    title: "Fast Bingo, Keno & Chicken Road Platforms",
    description: "Fully functional multiplayer games engineered with continuous loops, quick tick speeds, dynamic risk assessment mechanics, and strict server-authoritative state security.",
    technologies: ["TypeScript", "React", "Socket.IO", "Redis", "PostgreSQL"],
    githubUrl: "https://github.com/DEsu2111",
    createdAt: new Date().toISOString()
  },
  {
    _id: "igaming-2",
    title: "Aviator System & Custom Canvas Engine",
    description: "Implemented mathematical crash curve generations mapping accurate ticks over hundreds of simultaneous connected socket instances instantly.",
    technologies: ["TypeScript", "React", "Canvas API", "Socket.IO", "Node.js"],
    githubUrl: "https://github.com/DEsu2111",
    createdAt: new Date().toISOString()
  },
  {
    _id: "igaming-3",
    title: "Multi-Tenant Game Management Dashboard",
    description: "Comprehensive operations control board built to handle distinct third-party operators, aggregate financial data reporting, and handle individual game logic rules configurations remotely.",
    technologies: ["React", "Node.js", "PostgreSQL", "Docker", "Redis"],
    githubUrl: "https://github.com/DEsu2111",
    createdAt: new Date().toISOString()
  },
  {
    _id: "1",
    title: "Fellowship Management System (SaaS)",
    description: "Production Level SaaS for all University fellowships to manage members, events, and resources.",
    technologies: ["Laravel", "MySQL", "Tailwind CSS", "Vanilla JS", "Blade"],
    liveUrl: "http://fellow-managemnt-system.ct.ws/public/",
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
    saveMessagesToDisk(memoryContactMessages);
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
    saveMessagesToDisk(memoryContactMessages);
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

// Route to delete a contact message manually
app.delete('/api/contact/:id', async (req, res) => {
  if (!dbConnected) {
    memoryContactMessages = memoryContactMessages.filter(m => String(m._id) !== String(req.params.id));
    saveMessagesToDisk(memoryContactMessages);
    return res.json({ message: 'Message deleted successfully' });
  }

  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) {
      return res.status(404).json({ message: 'Message not found' });
    }
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Initial memory fallback for certificates & gallery items
let memoryCertificates = [
  {
    _id: 'cert-1',
    category: 'Certificates & Awards',
    title: 'INDICITOUS HACKATHON Organizers (#HACH ADDIS)',
    issuer: 'Indicitous Technology',
    location: 'Addis Ababa, Ethiopia',
    description: 'Official certificate of recognition for outstanding leadership in organizing the #HACH ADDIS technology hackathon.',
    link: 'https://drive.google.com/file/d/18fdoQRS0tOMkf-l_c2HHcZ_JAriVc/view?usp=sharing',
    icon: '🏆',
    type: 'Recognition',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'cert-2',
    category: 'Certificates & Awards',
    title: 'Horeb Digital Strategies Ministry Leader',
    issuer: 'Christian Fellowship',
    location: 'Hawassa & Addis Ababa',
    description: 'Served as Team Leader for over three years, overseeing digital initiatives, media creation, and team coordination.',
    link: 'https://drive.google.com/file/d/1RiY0AyM-UgxHSj_6jmsnmabzZNowPe/view?usp=sharing',
    icon: '⚔️',
    type: 'Leadership',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'cert-3',
    category: 'Certificates & Awards',
    title: 'Volunteer Teacher Recognition Certificate',
    issuer: 'Community Education Program',
    location: 'Hawassa, Ethiopia',
    description: 'Certificate of recognition for volunteering as a make-up academic teacher for high school students.',
    link: 'https://drive.google.com/file/d/1xAc8WCBuBeGWSgMYeggaN7EcHyiz3prf/view?=sharing',
    icon: '📚',
    type: 'Volunteer',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'cert-4',
    category: 'Hackathons & Events',
    title: 'INDICITOUS HACKATHON Organizers (#HACH HAWASSA)',
    issuer: 'Indicitous Technology',
    location: 'Hawassa City, Ethiopia',
    description: 'Successful contribution to organizing and mentoring tech teams at the Hawassa Hackathon event.',
    link: 'https://drive.google.com/file/d/13EsWcr5FyfCqIWnmR3Za3GOUCHRIa/view?usp=sharing',
    icon: '🏅',
    type: 'Hackathon',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'cert-5',
    category: 'Certificates & Awards',
    title: 'Digital Strategies Missionary Certificate',
    issuer: 'Great Commission Ministry',
    location: 'Ethiopia',
    description: 'Over three years of dedicated service in the digital strategies missionary and media production program.',
    link: 'https://drive.google.com/file/d/1eerbgy8UfDM89pcfcUTFVoca2xJYs/view?usp=sharing',
    icon: '🌐',
    type: 'Service',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'exp-1',
    category: 'Work & Education',
    title: 'Independent Production Frameworks Studio',
    issuer: 'Full-Stack iGaming Engineering Studio',
    location: 'Addis Ababa, Ethiopia',
    description: 'Active development location where real-time socket-driven games (Bingo, Keno, Aviator, Chicken Road) and operator dashboards are engineered.',
    icon: '🎰',
    type: 'Work Studio',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'exp-2',
    category: 'Work & Education',
    title: 'Hawassa University — Computer Engineering Campus',
    issuer: 'Faculty of Electrical & Computer Engineering',
    location: 'Hawassa, Ethiopia',
    description: 'B.Sc. degree program grounds (CGPA 3.6 / 4.0). Specializing in computer hardware, networking, algorithms, and real-time systems.',
    icon: '🎓',
    type: 'University Campus',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'exp-3',
    category: 'Work & Education',
    title: 'Metehara Sugar Factory ICT & Asset Inventory Dept',
    issuer: 'Metehara Sugar Factory ICT Office',
    location: 'Metehara, Ethiopia',
    description: 'Practical internship site for data entry, system backup, asset tracking, and corporate ICT network troubleshooting.',
    icon: '🏢',
    type: 'Internship Site',
    createdAt: new Date().toISOString()
  }
];

// Certificates API Routes
app.get('/api/certificates', async (req, res) => {
  if (!dbConnected) {
    return res.json(memoryCertificates);
  }

  try {
    const certificates = await Certificate.find().sort({ createdAt: -1 });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/api/certificates', async (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ message: 'Title is required' });
  }

  if (!dbConnected) {
    const newCert = {
      _id: Date.now().toString(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    memoryCertificates.unshift(newCert);
    return res.status(201).json(newCert);
  }

  try {
    const cert = new Certificate(req.body);
    const savedCert = await cert.save();
    res.status(201).json(savedCert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/certificates/:id', async (req, res) => {
  if (!dbConnected) {
    const index = memoryCertificates.findIndex(c => String(c._id) === String(req.params.id));
    if (index === -1) return res.status(404).json({ message: 'Certificate not found' });
    memoryCertificates[index] = { ...memoryCertificates[index], ...req.body };
    return res.json(memoryCertificates[index]);
  }

  try {
    const cert = await Certificate.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!cert) return res.status(404).json({ message: 'Certificate not found' });
    res.json(cert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/certificates/:id', async (req, res) => {
  if (!dbConnected) {
    memoryCertificates = memoryCertificates.filter(c => String(c._id) !== String(req.params.id));
    return res.json({ message: 'Certificate deleted successfully' });
  }

  try {
    const cert = await Certificate.findByIdAndDelete(req.params.id);
    if (!cert) return res.status(404).json({ message: 'Certificate not found' });
    res.json({ message: 'Certificate deleted successfully' });
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
