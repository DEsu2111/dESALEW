const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

// Import models
const Project = require('./models/Project');
const ContactMessage = require('./models/ContactMessage');
const Skill = require('./models/Skill');
const Certificate = require('./models/Certificate');
const Reference = require('./models/Reference');
const Profile = require('./models/Profile');

// Import initial baseline data
const {
  initialProjects,
  initialSkills,
  initialCertificates,
  initialReferences,
  initialMessages,
  initialProfile
} = require('./initialData');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ limit: '25mb', extended: true }));

// Project image helper: ensures up to 3 images are harmonized
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

// Request validation helpers
const validateProjectBody = (req, res, next) => {
  const { title, description } = req.body || {};
  if (!title || !description) {
    return res.status(400).json({ message: 'title and description are required' });
  }
  next();
};

const validateContactBody = (req, res, next) => {
  const { name, email, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ message: 'name, email, and message are required' });
  }
  next();
};

// In-memory state for offline mode / disconnected MongoDB
let mockProjects = initialProjects.map((p, i) => ({ _id: String(i + 1), ...p }));
let mockSkills = initialSkills.map((s, i) => ({ _id: 'skill-' + (i + 1), ...s }));
let mockCertificates = initialCertificates.map((c, i) => ({ _id: 'cert-' + (i + 1), ...c }));
let mockReferences = initialReferences.map((r, i) => ({ _id: 'ref-' + (i + 1), ...r }));
let mockMessages = [...initialMessages];
let mockProfile = { ...initialProfile, _id: 'profile-main' };

// MongoDB connection setup
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/portfolio';
let dbConnected = false;

// Auto-seed collections if MongoDB is connected but collections are empty
const autoSeedIfEmpty = async () => {
  try {
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      await Project.insertMany(initialProjects);
      console.log(`✓ Auto-seeded ${initialProjects.length} Projects into MongoDB`);
    }

    const skillCount = await Skill.countDocuments();
    if (skillCount === 0) {
      await Skill.insertMany(initialSkills);
      console.log(`✓ Auto-seeded ${initialSkills.length} Skills into MongoDB`);
    }

    const certCount = await Certificate.countDocuments();
    if (certCount === 0) {
      await Certificate.insertMany(initialCertificates);
      console.log(`✓ Auto-seeded ${initialCertificates.length} Certificates into MongoDB`);
    }

    const refCount = await Reference.countDocuments();
    if (refCount === 0) {
      await Reference.insertMany(initialReferences);
      console.log(`✓ Auto-seeded ${initialReferences.length} References into MongoDB`);
    }

    const profileCount = await Profile.countDocuments();
    if (profileCount === 0) {
      await Profile.create(initialProfile);
      console.log('✓ Auto-seeded Profile into MongoDB');
    }
  } catch (err) {
    console.error('Auto-seed verification error:', err.message);
  }
};

const connection = mongoose.connection;
connection.on('connected', () => {
  dbConnected = true;
  console.log('MongoDB connected successfully');
  autoSeedIfEmpty();
});
connection.on('disconnected', () => {
  dbConnected = false;
  console.log('MongoDB disconnected');
});
connection.on('error', (err) => {
  dbConnected = false;
  console.error('MongoDB connection error:', err.message);
});

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).catch(err => {
  console.log('Initial MongoDB connection attempt failed, running in offline fallback mode. Error:', err.message);
});

// ==========================================
// HEALTH CHECK
// ==========================================
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    database: dbConnected ? 'connected' : 'offline-mock-fallback',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// ==========================================
// PROJECTS API
// ==========================================
app.get('/api/projects', async (req, res) => {
  if (!dbConnected) {
    return res.json(mockProjects);
  }
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 });
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
    if (!project) return res.status(404).json({ message: 'Project not found' });
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
    if (!project) return res.status(404).json({ message: 'Project not found' });
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
    if (!project) return res.status(404).json({ message: 'Project not found' });
    res.json({ message: 'Project deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==========================================
// SKILLS API
// ==========================================
app.get('/api/skills', async (req, res) => {
  if (!dbConnected) {
    return res.json(mockSkills);
  }
  try {
    const skills = await Skill.find().sort({ order: 1, createdAt: 1 });
    res.json(skills.length > 0 ? skills : mockSkills);
  } catch (error) {
    res.json(mockSkills);
  }
});

app.post('/api/skills', async (req, res) => {
  const { title, items, category, order } = req.body;
  if (!title) {
    return res.status(400).json({ message: 'Title is required' });
  }
  if (!dbConnected) {
    const newSkill = {
      _id: 'skill-' + Date.now(),
      title,
      items: Array.isArray(items) ? items : [],
      category: category || 'General',
      order: typeof order === 'number' ? order : mockSkills.length + 1
    };
    mockSkills.push(newSkill);
    return res.status(201).json(newSkill);
  }
  try {
    const skill = new Skill(req.body);
    const saved = await skill.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/skills/:id', async (req, res) => {
  if (!dbConnected) {
    const idx = mockSkills.findIndex(s => String(s._id) === String(req.params.id));
    if (idx !== -1) {
      mockSkills[idx] = { ...mockSkills[idx], ...req.body };
      return res.json(mockSkills[idx]);
    }
    return res.status(404).json({ message: 'Skill not found' });
  }
  try {
    const skill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json(skill);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/skills/:id', async (req, res) => {
  if (!dbConnected) {
    mockSkills = mockSkills.filter(s => String(s._id) !== String(req.params.id));
    return res.json({ message: 'Skill deleted successfully' });
  }
  try {
    const skill = await Skill.findByIdAndDelete(req.params.id);
    if (!skill) return res.status(404).json({ message: 'Skill not found' });
    res.json({ message: 'Skill deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==========================================
// CERTIFICATES API
// ==========================================
app.get('/api/certificates', async (req, res) => {
  if (!dbConnected) {
    return res.json(mockCertificates);
  }
  try {
    const certs = await Certificate.find().sort({ order: 1, createdAt: 1 });
    res.json(certs.length > 0 ? certs : mockCertificates);
  } catch (error) {
    res.json(mockCertificates);
  }
});

app.post('/api/certificates', async (req, res) => {
  const { title, issuer } = req.body;
  if (!title || !issuer) {
    return res.status(400).json({ message: 'Title and Issuer are required' });
  }
  if (!dbConnected) {
    const newCert = {
      _id: 'cert-' + Date.now(),
      ...req.body,
      order: typeof req.body.order === 'number' ? req.body.order : mockCertificates.length + 1
    };
    mockCertificates.push(newCert);
    return res.status(201).json(newCert);
  }
  try {
    const cert = new Certificate(req.body);
    const saved = await cert.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/certificates/:id', async (req, res) => {
  if (!dbConnected) {
    const idx = mockCertificates.findIndex(c => String(c._id) === String(req.params.id));
    if (idx !== -1) {
      mockCertificates[idx] = { ...mockCertificates[idx], ...req.body };
      return res.json(mockCertificates[idx]);
    }
    return res.status(404).json({ message: 'Certificate not found' });
  }
  try {
    const cert = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!cert) return res.status(404).json({ message: 'Certificate not found' });
    res.json(cert);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/certificates/:id', async (req, res) => {
  if (!dbConnected) {
    mockCertificates = mockCertificates.filter(c => String(c._id) !== String(req.params.id));
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

// ==========================================
// REFERENCES API
// ==========================================
app.get('/api/references', async (req, res) => {
  if (!dbConnected) {
    return res.json(mockReferences);
  }
  try {
    const refs = await Reference.find().sort({ order: 1, createdAt: 1 });
    res.json(refs.length > 0 ? refs : mockReferences);
  } catch (error) {
    res.json(mockReferences);
  }
});

app.post('/api/references', async (req, res) => {
  const { name, position, organization } = req.body;
  if (!name || !position || !organization) {
    return res.status(400).json({ message: 'Name, position, and organization are required' });
  }
  if (!dbConnected) {
    const newRef = {
      _id: 'ref-' + Date.now(),
      ...req.body,
      areas: Array.isArray(req.body.areas) ? req.body.areas : [],
      order: typeof req.body.order === 'number' ? req.body.order : mockReferences.length + 1
    };
    mockReferences.push(newRef);
    return res.status(201).json(newRef);
  }
  try {
    const ref = new Reference(req.body);
    const saved = await ref.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.put('/api/references/:id', async (req, res) => {
  if (!dbConnected) {
    const idx = mockReferences.findIndex(r => String(r._id) === String(req.params.id));
    if (idx !== -1) {
      mockReferences[idx] = { ...mockReferences[idx], ...req.body };
      return res.json(mockReferences[idx]);
    }
    return res.status(404).json({ message: 'Reference not found' });
  }
  try {
    const ref = await Reference.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!ref) return res.status(404).json({ message: 'Reference not found' });
    res.json(ref);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

app.delete('/api/references/:id', async (req, res) => {
  if (!dbConnected) {
    mockReferences = mockReferences.filter(r => String(r._id) !== String(req.params.id));
    return res.json({ message: 'Reference deleted successfully' });
  }
  try {
    const ref = await Reference.findByIdAndDelete(req.params.id);
    if (!ref) return res.status(404).json({ message: 'Reference not found' });
    res.json({ message: 'Reference deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==========================================
// PROFILE API
// ==========================================
app.get('/api/profile', async (req, res) => {
  if (!dbConnected) {
    return res.json(mockProfile);
  }
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = await Profile.create(initialProfile);
    }
    res.json(profile);
  } catch (error) {
    res.json(mockProfile);
  }
});

app.put('/api/profile', async (req, res) => {
  if (!dbConnected) {
    mockProfile = { ...mockProfile, ...req.body };
    return res.json(mockProfile);
  }
  try {
    let profile = await Profile.findOne();
    if (!profile) {
      profile = new Profile(req.body);
      const saved = await profile.save();
      return res.json(saved);
    }
    Object.assign(profile, req.body);
    const updated = await profile.save();
    res.json(updated);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// ==========================================
// CONTACT MESSAGES API
// ==========================================
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
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json(message);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.delete('/api/contact/:id', async (req, res) => {
  if (!dbConnected) {
    mockMessages = mockMessages.filter(m => String(m._id) !== String(req.params.id));
    return res.json({ message: 'Message deleted successfully' });
  }
  try {
    const message = await ContactMessage.findByIdAndDelete(req.params.id);
    if (!message) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ==========================================
// SERVE STATIC FILES (PRODUCTION / RENDER)
// ==========================================
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
