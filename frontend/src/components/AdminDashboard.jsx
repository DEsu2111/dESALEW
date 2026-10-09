import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import desuAvatar from '../assets/desu1.jpg';
import ThemeSwitcher from './ThemeSwitcher';
import Pagination from './Pagination';
import './AdminDashboard.css';

const API_BASE = 'http://localhost:5000';

export const PROJECT_CATEGORIES = [
  'SaaS & Cloud',
  'Web Applications',
  'Enterprise Systems',
  'Real-Time Applications',
  'Games',
  'Mobile Apps',
  'Telegram Mini Apps',
  'Admin Dashboards',
  'AI Applications',
  'Healthcare Systems',
  'Education Platforms',
  'E-Commerce',
  'Business Systems',
  'API & Backend Systems'
];

const STATIC_SKILL_GROUPS = [
  {
    title: 'Web Programming & Full Stack',
    icon: '💻',
    category: 'Core Development',
    items: ['React', 'Next.js', 'Node.js', 'Nest.js', 'PHP', 'Laravel', 'Tailwind CSS', 'Blade', 'MySQL', 'MongoDB', 'PostgreSQL', 'Django']
  },
  {
    title: 'Advanced Computer & AI Tools',
    icon: '⚡',
    category: 'Productivity & Workflow',
    items: ['Git & GitHub', 'VS Code', 'Google Workspace', 'ChatGPT & AI Tools', 'Microsoft Office Suite']
  },
  {
    title: 'Computer & System Maintenance',
    icon: '🛠️',
    category: 'Infrastructure',
    items: ['Windows & Linux OS Config', 'Hardware & Software Troubleshooting', 'Performance Optimization', 'Driver & System Backup']
  },
  {
    title: 'Embedded Systems & Microcontrollers',
    icon: '🔌',
    category: 'Hardware Engineering',
    items: ['Portus & PIC Microcontroller', 'Sensors & Actuators', 'Display Interfacing', 'Hardware Prototyping']
  },
  {
    title: 'Circuit Design & Simulation',
    icon: '📐',
    category: 'Electronics',
    items: ['Analog & Digital Electronics', 'Multisim Simulation', 'Breadboard Prototyping', 'PCB Analysis']
  },
  {
    title: 'Network & IoT Systems',
    icon: '🌐',
    category: 'Telecommunications',
    items: ['Network Fundamentals', 'IP Addressing & Routing', 'Wireless Modulation', 'IoT Sensor Protocols']
  }
];

const STATIC_CERTIFICATES = [
  {
    title: 'INDICITOUS HACKATHON Organizers (#HACH ADDIS)',
    issuer: 'Indicitous Technology',
    type: 'Recognition',
    icon: '🏆',
    imageUrl: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&w=800&q=80',
    link: 'https://drive.google.com/file/d/18fdoQRS0tOMkf-l_c2HHcZ_JAriVc/view?usp=sharing',
    desc: 'Contribution to organizing the prestigious technology event in Addis Ababa.'
  },
  {
    title: 'Horeb Digital Strategies Ministry Leader',
    issuer: 'Christian Fellowship',
    type: 'Leadership',
    icon: '⚔️',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    link: 'https://drive.google.com/file/d/1RiY0AyM-UgxHSj_6jmsnmabzZNowPe/view?usp=sharing',
    desc: 'Served as Team Leader for over three years, managing digital initiatives.'
  },
  {
    title: 'Volunteer Teacher Recognition',
    issuer: 'Community Education Program',
    type: 'Volunteer',
    icon: '📚',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    link: 'https://drive.google.com/file/d/1xAc8WCBuBeGWSgMYeggaN7EcHyiz3prf/view?=sharing',
    desc: 'Certificate of recognition for volunteering as a make-up teacher for students.'
  },
  {
    title: 'INDICITOUS HACKATHON Organizers (#HACH HAWASSA)',
    issuer: 'Indicitous Technology',
    type: 'Recognition',
    icon: '🏅',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    link: 'https://drive.google.com/file/d/13EsWcr5FyfCqIWnmR3Za3GOUCHRIa/view?usp=sharing',
    desc: 'Successful contribution to organizing the technology hackathon in Hawassa city.'
  },
  {
    title: 'Digital Strategies Missionary',
    issuer: 'Great Commission Ministry',
    type: 'Service',
    icon: '🌐',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    link: 'https://drive.google.com/file/d/1eerbgy8UfDM89pcfcUTFVoca2xJYs/view?usp=sharing',
    desc: 'Over three years of dedicated service in the digital strategies missionary program.'
  }
];

const STATIC_REFERENCES = [
  {
    name: 'Mr. Alemayehu Cheru',
    position: 'Electrical Engineering Department Head',
    organization: 'Hawassa University',
    phone: '+251 913 961 344',
    email: 'alemayehu.cheru0236@gmail.com',
    icon: '👨‍🏫',
    tag: 'Academic Reference',
    note: 'Academic department supervisor validating senior engineering and project capabilities.'
  },
  {
    name: 'Samson Usmael',
    position: 'Digital Strategy Director GCME',
    organization: 'Great Commission Ministry Ethiopia',
    phone: '+251 900 507 050',
    email: 'contact@gcmethiopia.org',
    icon: '🏢',
    tag: 'Professional Reference',
    note: 'Direct organizational director verifying technical initiatives, leadership, and software implementation.'
  }
];

// Helper to compress uploaded images to sharp, lightweight web-ready format
const compressImageFile = (file) => {
  return new Promise((resolve, reject) => {
    if (!file) return resolve(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const maxDim = 1200;
        let { width, height } = img;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.85));
      };
      img.onerror = () => resolve(e.target.result);
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const AdminDashboard = ({ themeMode, onThemeChange, onToggleTheme }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Dynamic collections with LocalStorage persistence and static fallbacks
  const [skillsList, setSkillsList] = useState(() => {
    try {
      const s = localStorage.getItem('adminSkillsList');
      return s ? JSON.parse(s) : STATIC_SKILL_GROUPS;
    } catch (e) {
      return STATIC_SKILL_GROUPS;
    }
  });

  const [certsList, setCertsList] = useState(() => {
    try {
      const s = localStorage.getItem('adminCertsList');
      return s ? JSON.parse(s) : STATIC_CERTIFICATES;
    } catch (e) {
      return STATIC_CERTIFICATES;
    }
  });

  const [reviewsList, setReviewsList] = useState(() => {
    try {
      const s = localStorage.getItem('adminReviewsList');
      return s ? JSON.parse(s) : STATIC_REFERENCES;
    } catch (e) {
      return STATIC_REFERENCES;
    }
  });

  // Modal States for Projects
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  // Project Form State (Image 1 is Required *, Images 2 & 3 are Optional)
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Applications',
    description: '',
    technologies: '',
    liveUrl: '',
    githubUrl: '',
    images: ['', '', '']
  });

  // Modal States for Skills
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [editingSkill, setEditingSkill] = useState(null);
  const [skillFormData, setSkillFormData] = useState({
    title: '',
    category: 'Core Development',
    icon: '⚡',
    items: ''
  });

  // Modal States for Certificates
  const [showCertModal, setShowCertModal] = useState(false);
  const [editingCert, setEditingCert] = useState(null);
  const [certFormData, setCertFormData] = useState({
    title: '',
    issuer: '',
    type: 'Recognition',
    icon: '🏆',
    link: '',
    desc: ''
  });

  // Modal States for Client Reviews / References
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [reviewFormData, setReviewFormData] = useState({
    name: '',
    position: '',
    organization: '',
    tag: 'Academic Reference',
    icon: '👨‍🏫',
    phone: '',
    email: '',
    note: ''
  });
  
  // ----------------------------------------------------
  // FILTER & SORT STATES ACROSS DASHBOARD TABS
  // ----------------------------------------------------
  const [msgStatusFilter, setMsgStatusFilter] = useState('all');
  const [msgDateFilter, setMsgDateFilter] = useState('all');
  const [msgSortOrder, setMsgSortOrder] = useState('newest');

  const [projectCategoryFilter, setProjectCategoryFilter] = useState('all');
  const [projectTechFilter, setProjectTechFilter] = useState('all');
  const [projectSortOrder, setProjectSortOrder] = useState('newest');

  const [skillCategoryFilter, setSkillCategoryFilter] = useState('all');
  const [skillSortOrder, setSkillSortOrder] = useState('default');

  const [certTypeFilter, setCertTypeFilter] = useState('all');
  const [certSortOrder, setCertSortOrder] = useState('default');

  const [refTagFilter, setRefTagFilter] = useState('all');
  const [refSortOrder, setRefSortOrder] = useState('default');

  // ----------------------------------------------------
  // PAGINATION & EXPAND STATES
  // ----------------------------------------------------
  const PROJECTS_PER_PAGE = 8;
  const MESSAGES_PER_PAGE = 8;
  const SKILLS_PER_PAGE = 6;
  const CERTS_PER_PAGE = 6;
  const REVIEWS_PER_PAGE = 6;

  const [projectPage, setProjectPage] = useState(1);
  const [msgPage, setMsgPage] = useState(1);
  const [skillPage, setSkillPage] = useState(1);
  const [certPage, setCertPage] = useState(1);
  const [refPage, setRefPage] = useState(1);

  const [expandedProjects, setExpandedProjects] = useState({});

  const toggleExpandProject = (id) => {
    setExpandedProjects(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const [analyticsRange, setAnalyticsRange] = useState('all');
  const [chartViewMode, setChartViewMode] = useState('combined');
  const [chartSeriesVisibility, setChartSeriesVisibility] = useState({
    portfolio: true,
    inquiries: true,
    projects: true,
    skills: true,
    certificates: true,
    reviews: true
  });
  const [hoveredChartIndex, setHoveredChartIndex] = useState(null);

  // Sidebar Collapse State
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    return localStorage.getItem('adminSidebarCollapsed') === 'true';
  });

  const toggleSidebarCollapse = () => {
    setSidebarCollapsed(prev => {
      const next = !prev;
      localStorage.setItem('adminSidebarCollapsed', String(next));
      return next;
    });
  };

  useEffect(() => {
    if (sidebarCollapsed) {
      document.body.classList.add('admin-sidebar-collapsed');
    } else {
      document.body.classList.remove('admin-sidebar-collapsed');
    }
    return () => {
      document.body.classList.remove('admin-sidebar-collapsed');
    };
  }, [sidebarCollapsed]);

  // Expanded messages state for "See More"
  const [expandedMessages, setExpandedMessages] = useState({});

  // Password Change State
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');

  // Profile and Social Meta State
  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('adminProfileData');
    if (saved) {
      try { return JSON.parse(saved); } catch (e) {}
    }
    return {
      fullName: 'Desalew Alganeh',
      headline: 'Electrical & Computer Engineer • Full Stack Developer',
      location: 'Addis Ababa, Ethiopia',
      phone: '+251 962 622 111',
      email: 'desu6262@gmail.com',
      telegram: 'https://t.me/desu6262',
      github: 'https://github.com/flybet-code',
      bio: 'Graduated in Electrical and Computer Engineering. Passionate about architecting scalable full-stack applications, enterprise SaaS solutions, and modern software architectures.'
    };
  });
  const [profileSaved, setProfileSaved] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // Determine active tab from URL path (Option 2: 3 Pro Categories)
  const getTabFromPath = () => {
    const path = location.pathname.toLowerCase();
    if (path.includes('project')) return 'projects';
    if (path.includes('skill')) return 'skills';
    if (path.includes('cert')) return 'certificates';
    if (path.includes('review') || path.includes('testim') || path.includes('ref')) return 'testimonials';
    if (path.includes('setting')) return 'settings';
    if (path.includes('profile') || path.includes('social')) return 'profile';
    if (path.includes('analytic') || path.includes('traffic')) return 'analytics';
    return 'messages';
  };

  const activeTab = getTabFromPath();

  const handleTabChange = (tab) => {
    setSidebarOpen(false);
    setSearchQuery('');
    const basePath = location.pathname.startsWith('/dashbored')
      ? '/dashbored'
      : location.pathname.startsWith('/dashbore')
      ? '/dashbore'
      : '/dashboard';

    if (tab === 'messages') {
      navigate(basePath);
    } else {
      navigate(`${basePath}/${tab}`);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/login');
    } else {
      fetchData();
      if (!localStorage.getItem('adminPassword')) {
        localStorage.setItem('adminPassword', 'admin123');
      }
    }
  }, [navigate]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [msgRes, projRes] = await Promise.allSettled([
        fetch(`${API_BASE}/api/contact`),
        fetch(`${API_BASE}/api/projects`)
      ]);

      let msgData = [];
      if (msgRes.status === 'fulfilled' && msgRes.value && msgRes.value.ok) {
        try {
          const json = await msgRes.value.json();
          msgData = Array.isArray(json) ? json : [];
        } catch {
          msgData = [];
        }
      }

      let projData = [];
      if (projRes.status === 'fulfilled' && projRes.value && projRes.value.ok) {
        try {
          const json = await projRes.value.json();
          projData = Array.isArray(json) ? json : [];
        } catch {
          projData = [];
        }
      }

      setMessages(msgData);

      if (projData.length > 0) {
        setProjects(projData);
        try { localStorage.setItem('adminProjects', JSON.stringify(projData)); } catch (e) {}
      } else {
        try {
          const local = localStorage.getItem('adminProjects');
          if (local) {
            setProjects(JSON.parse(local));
          } else {
            setProjects([]);
          }
        } catch {
          setProjects([]);
        }
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setMessages([]);
      try {
        const local = localStorage.getItem('adminProjects');
        setProjects(local ? JSON.parse(local) : []);
      } catch {
        setProjects([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    const currentStoredPass = localStorage.getItem('adminPassword');
    if (passwords.old !== currentStoredPass) {
      setPassError('Old password is incorrect');
      setPassSuccess('');
      return;
    }
    if (passwords.new !== passwords.confirm) {
      setPassError('New passwords do not match');
      setPassSuccess('');
      return;
    }
    localStorage.setItem('adminPassword', passwords.new);
    setPassSuccess('Password updated successfully!');
    setPassError('');
    setPasswords({ old: '', new: '', confirm: '' });
  };

  const handleProfileSave = (e) => {
    e.preventDefault();
    try {
      localStorage.setItem('adminProfileData', JSON.stringify(profileData));
      setProfileSaved(true);
      setTimeout(() => setProfileSaved(false), 3500);
    } catch (err) {
      console.error('Failed to save profile:', err);
    }
  };

  const handleProfileReset = () => {
    const defaults = {
      fullName: 'Desalew Alganeh',
      headline: 'Electrical & Computer Engineer • Full Stack Developer',
      location: 'Addis Ababa, Ethiopia',
      phone: '+251 962 622 111',
      email: 'desu6262@gmail.com',
      telegram: 'https://t.me/desu6262',
      github: 'https://github.com/flybet-code',
      linkedin: 'https://linkedin.com/in/desalew-alganeh',
      bio: 'Graduated in Electrical and Computer Engineering. Passionate about architecting scalable full-stack applications, enterprise SaaS solutions, and modern software architectures.'
    };
    setProfileData(defaults);
    localStorage.setItem('adminProfileData', JSON.stringify(defaults));
    setProfileSaved(true);
    setTimeout(() => setProfileSaved(false), 3000);
  };

  // ==========================================
  // PROJECT CRUD & 3-IMAGE UPLOADER HANDLERS
  // ==========================================
  const handleProjectImageUpload = async (index, file) => {
    if (!file) return;
    try {
      const dataUrl = await compressImageFile(file);
      setFormData(prev => {
        const nextImgs = [...(prev.images || ['', '', ''])];
        nextImgs[index] = dataUrl;
        return { ...prev, images: nextImgs };
      });
    } catch (err) {
      console.error('Failed to compress project image:', err);
      alert('Failed to process image file. Please try another image.');
    }
  };

  const handleProjectImageUrlInput = (index, url) => {
    setFormData(prev => {
      const nextImgs = [...(prev.images || ['', '', ''])];
      nextImgs[index] = url;
      return { ...prev, images: nextImgs };
    });
  };

  const handleProjectImageRemove = (index) => {
    setFormData(prev => {
      const nextImgs = [...(prev.images || ['', '', ''])];
      nextImgs[index] = '';
      return { ...prev, images: nextImgs };
    });
  };

  const openAddProjectModal = () => {
    setEditingProject(null);
    setFormData({
      title: '',
      category: 'Web Applications',
      description: '',
      technologies: '',
      liveUrl: '',
      githubUrl: '',
      images: ['', '', '']
    });
    setShowModal(true);
  };

  const openEditModal = (proj) => {
    setEditingProject(proj);
    let imgs = ['', '', ''];
    if (Array.isArray(proj.images) && proj.images.length > 0) {
      imgs = [proj.images[0] || '', proj.images[1] || '', proj.images[2] || ''];
    } else if (proj.imageUrl) {
      imgs = [proj.imageUrl, '', ''];
    }

    setFormData({
      title: proj.title || '',
      category: proj.category || 'Web Applications',
      description: proj.description || '',
      technologies: Array.isArray(proj.technologies) 
        ? proj.technologies.join(', ') 
        : (proj.technologies || ''),
      liveUrl: proj.liveUrl || '',
      githubUrl: proj.githubUrl || '',
      images: imgs
    });
    setShowModal(true);
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      alert('Please enter a project title');
      return;
    }
    if (!formData.description.trim()) {
      alert('Please enter a project description');
      return;
    }

    // Image 1 is strictly MUST / REQUIRED, Image 2 & 3 are OPTIONAL
    const img1 = (formData.images?.[0] || '').trim();
    if (!img1) {
      alert('Cover Image (Image 1) is Required! Please upload a cover photo or enter an image URL.');
      return;
    }

    const validImages = [img1];
    const img2 = (formData.images?.[1] || '').trim();
    const img3 = (formData.images?.[2] || '').trim();
    if (img2) validImages.push(img2);
    if (img3) validImages.push(img3);

    const payload = {
      title: formData.title.trim(),
      category: formData.category || 'Web Applications',
      description: formData.description.trim(),
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
      liveUrl: formData.liveUrl ? formData.liveUrl.trim() : '',
      githubUrl: formData.githubUrl ? formData.githubUrl.trim() : '',
      imageUrl: validImages[0], // slot 1 cover
      images: validImages // up to 3 images stored in database
    };

    try {
      const url = editingProject 
        ? `${API_BASE}/api/projects/${editingProject._id}` 
        : `${API_BASE}/api/projects`;
      
      const method = editingProject ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      let updatedProject = { ...payload, _id: editingProject ? editingProject._id : 'proj-' + Date.now() };

      if (response.ok) {
        const savedData = await response.json().catch(() => ({}));
        if (savedData && savedData._id) {
          updatedProject = { ...updatedProject, ...savedData };
        }
      }

      setProjects(prev => {
        const list = Array.isArray(prev) ? prev : [];
        let nextList;
        if (editingProject) {
          nextList = list.map(p => p._id === editingProject._id ? updatedProject : p);
        } else {
          nextList = [updatedProject, ...list];
        }
        try { localStorage.setItem('adminProjects', JSON.stringify(nextList)); } catch (e) {}
        return nextList;
      });
      setShowModal(false);
      setEditingProject(null);
      setFormData({ title: '', category: 'Web Applications', description: '', technologies: '', liveUrl: '', githubUrl: '', images: ['', '', ''] });
    } catch (err) {
      console.warn('Network issue saving project, applying local state update:', err);
      const updatedProject = { ...payload, _id: editingProject ? editingProject._id : 'proj-' + Date.now() };
      setProjects(prev => {
        const list = Array.isArray(prev) ? prev : [];
        let nextList;
        if (editingProject) {
          nextList = list.map(p => p._id === editingProject._id ? updatedProject : p);
        } else {
          nextList = [updatedProject, ...list];
        }
        try { localStorage.setItem('adminProjects', JSON.stringify(nextList)); } catch (e) {}
        return nextList;
      });
      setShowModal(false);
      setEditingProject(null);
      setFormData({ title: '', category: 'Web Applications', description: '', technologies: '', liveUrl: '', githubUrl: '', images: ['', '', ''] });
    }
  };

  // ==========================================
  // SKILLS CRUD HANDLERS
  // ==========================================
  const openAddSkillModal = () => {
    setEditingSkill(null);
    setSkillFormData({ title: '', category: 'Core Development', icon: '⚡', items: '' });
    setShowSkillModal(true);
  };

  const openEditSkillModal = (skill, idx) => {
    setEditingSkill({ ...skill, index: idx });
    setSkillFormData({
      title: skill.title || '',
      category: skill.category || 'Core Development',
      icon: skill.icon || '⚡',
      items: Array.isArray(skill.items) ? skill.items.join(', ') : (skill.items || '')
    });
    setShowSkillModal(true);
  };

  const handleSkillSubmit = (e) => {
    e.preventDefault();
    if (!skillFormData.title.trim() || !skillFormData.items.trim()) {
      alert('Please fill out the skill group title and items');
      return;
    }
    const itemsArr = skillFormData.items.split(',').map(s => s.trim()).filter(Boolean);
    const newSkill = {
      title: skillFormData.title.trim(),
      category: skillFormData.category.trim() || 'Core Development',
      icon: skillFormData.icon.trim() || '⚡',
      items: itemsArr
    };

    let updated;
    if (editingSkill !== null && editingSkill.index !== undefined) {
      updated = skillsList.map((s, i) => i === editingSkill.index ? newSkill : s);
    } else {
      updated = [newSkill, ...skillsList];
    }
    setSkillsList(updated);
    try { localStorage.setItem('adminSkillsList', JSON.stringify(updated)); } catch (e) {}
    setShowSkillModal(false);
    setEditingSkill(null);
  };

  const handleDeleteSkill = (idx) => {
    if (!window.confirm('Are you sure you want to delete this skill group?')) return;
    const updated = skillsList.filter((_, i) => i !== idx);
    setSkillsList(updated);
    try { localStorage.setItem('adminSkillsList', JSON.stringify(updated)); } catch (e) {}
  };

  // ==========================================
  // CERTIFICATES CRUD HANDLERS
  // ==========================================
  const openAddCertModal = () => {
    setEditingCert(null);
    setCertFormData({ title: '', issuer: '', type: 'Recognition', icon: '🏆', link: '', desc: '', imageUrl: '' });
    setShowCertModal(true);
  };

  const openEditCertModal = (cert, idx) => {
    setEditingCert({ ...cert, index: idx });
    setCertFormData({
      title: cert.title || '',
      issuer: cert.issuer || '',
      type: cert.type || 'Recognition',
      icon: cert.icon || '🏆',
      link: cert.link || '',
      desc: cert.desc || cert.description || '',
      imageUrl: cert.imageUrl || cert.image || ''
    });
    setShowCertModal(true);
  };

  const handleCertImageUpload = async (file) => {
    if (!file) return;
    try {
      const compressed = await compressImageFile(file);
      if (compressed) {
        setCertFormData(prev => ({ ...prev, imageUrl: compressed }));
      }
    } catch (e) {
      console.error('Failed to compress certificate image:', e);
    }
  };

  const handleCertSubmit = (e) => {
    e.preventDefault();
    if (!certFormData.title.trim() || !certFormData.issuer.trim()) {
      alert('Please fill out the certificate title and issuer');
      return;
    }
    const newCert = {
      title: certFormData.title.trim(),
      issuer: certFormData.issuer.trim(),
      type: certFormData.type.trim() || 'Recognition',
      icon: certFormData.icon.trim() || '🏆',
      link: certFormData.link.trim() || '#',
      desc: certFormData.desc.trim(),
      imageUrl: certFormData.imageUrl ? certFormData.imageUrl.trim() : ''
    };

    let updated;
    if (editingCert !== null && editingCert.index !== undefined) {
      updated = certsList.map((c, i) => i === editingCert.index ? newCert : c);
    } else {
      updated = [newCert, ...certsList];
    }
    setCertsList(updated);
    try { localStorage.setItem('adminCertsList', JSON.stringify(updated)); } catch (e) {}
    setShowCertModal(false);
    setEditingCert(null);
  };

  const handleDeleteCert = (idx) => {
    if (!window.confirm('Are you sure you want to delete this certificate?')) return;
    const updated = certsList.filter((_, i) => i !== idx);
    setCertsList(updated);
    try { localStorage.setItem('adminCertsList', JSON.stringify(updated)); } catch (e) {}
  };

  // ==========================================
  // CLIENT REVIEWS / REFERENCES CRUD HANDLERS
  // ==========================================
  const openAddReviewModal = () => {
    setEditingReview(null);
    setReviewFormData({ name: '', position: '', organization: '', tag: 'Academic Reference', icon: '👨‍🏫', phone: '', email: '', note: '' });
    setShowReviewModal(true);
  };

  const openEditReviewModal = (rev, idx) => {
    setEditingReview({ ...rev, index: idx });
    setReviewFormData({
      name: rev.name || '',
      position: rev.position || '',
      organization: rev.organization || '',
      tag: rev.tag || 'Academic Reference',
      icon: rev.icon || '👨‍🏫',
      phone: rev.phone || '',
      email: rev.email || '',
      note: rev.note || ''
    });
    setShowReviewModal(true);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewFormData.name.trim() || !reviewFormData.position.trim()) {
      alert('Please fill out the reviewer name and position');
      return;
    }
    const newRev = {
      name: reviewFormData.name.trim(),
      position: reviewFormData.position.trim(),
      organization: reviewFormData.organization.trim(),
      tag: reviewFormData.tag.trim() || 'Academic Reference',
      icon: reviewFormData.icon.trim() || '👨‍🏫',
      phone: reviewFormData.phone.trim(),
      email: reviewFormData.email.trim(),
      note: reviewFormData.note.trim()
    };

    let updated;
    if (editingReview !== null && editingReview.index !== undefined) {
      updated = reviewsList.map((r, i) => i === editingReview.index ? newRev : r);
    } else {
      updated = [newRev, ...reviewsList];
    }
    setReviewsList(updated);
    try { localStorage.setItem('adminReviewsList', JSON.stringify(updated)); } catch (e) {}
    setShowReviewModal(false);
    setEditingReview(null);
  };

  const handleDeleteReview = (idx) => {
    if (!window.confirm('Are you sure you want to delete this review?')) return;
    const updated = reviewsList.filter((_, i) => i !== idx);
    setReviewsList(updated);
    try { localStorage.setItem('adminReviewsList', JSON.stringify(updated)); } catch (e) {}
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await fetch(`${API_BASE}/api/projects/${id}`, { method: 'DELETE' });
    } catch (err) {
      console.warn('Backend delete project unavailable, deleting locally:', err);
    }
    setProjects(prev => {
      const updated = (Array.isArray(prev) ? prev : []).filter(p => p._id !== id);
      try { localStorage.setItem('adminProjects', JSON.stringify(updated)); } catch (e) {}
      return updated;
    });
  };

  const toggleExpand = (id) => {
    setExpandedMessages(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const updateMessageStatus = async (id, status) => {
    // Optimistic Update: Change UI immediately
    const previousMessages = Array.isArray(messages) ? [...messages] : [];
    setMessages(prev => (Array.isArray(prev) ? prev : []).map(m => m._id === id ? { ...m, status } : m));

    try {
      const response = await fetch(`${API_BASE}/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error('Failed to update');
    } catch (err) {
      // Rollback if failed
      setMessages(previousMessages);
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  const safeMessages = Array.isArray(messages) ? messages : [];
  const safeProjects = Array.isArray(projects) ? projects : [];
  const unreadCount = safeMessages.filter(m => (m.status || 'unread') === 'unread').length;

  // Live message counts for status pills
  const msgCounts = useMemo(() => {
    const counts = { all: safeMessages.length, unread: 0, pending: 0, confirmed: 0, canceled: 0 };
    safeMessages.forEach(m => {
      const st = m.status || 'unread';
      if (counts[st] !== undefined) counts[st]++;
      else counts.unread++;
    });
    return counts;
  }, [safeMessages]);

  // 1. FILTERED & SORTED MESSAGES
  const filteredMessages = useMemo(() => {
    let list = [...safeMessages];

    // Global Search Query
    if (searchQuery.trim() && (activeTab === 'messages' || activeTab === 'analytics')) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(m => {
        if (!m) return false;
        const nameMatch = m.name ? m.name.toLowerCase().includes(q) : false;
        const emailMatch = m.email ? m.email.toLowerCase().includes(q) : false;
        const phoneMatch = m.phone ? m.phone.includes(q) : false;
        const msgMatch = m.message ? m.message.toLowerCase().includes(q) : false;
        return nameMatch || emailMatch || phoneMatch || msgMatch;
      });
    }

    // Status Filter
    if (msgStatusFilter !== 'all') {
      list = list.filter(m => (m.status || 'unread') === msgStatusFilter);
    }

    // Date / Timeframe Filter
    if (msgDateFilter !== 'all') {
      const now = new Date();
      list = list.filter(m => {
        if (!m.createdAt) return true;
        const d = new Date(m.createdAt);
        const diffMs = now - d;
        if (msgDateFilter === 'today') return diffMs <= 24 * 60 * 60 * 1000;
        if (msgDateFilter === 'week') return diffMs <= 7 * 24 * 60 * 60 * 1000;
        if (msgDateFilter === 'month') return diffMs <= 30 * 24 * 60 * 60 * 1000;
        return true;
      });
    }

    // Sorting
    list.sort((a, b) => {
      if (msgSortOrder === 'newest') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      if (msgSortOrder === 'oldest') {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      }
      if (msgSortOrder === 'name-asc') {
        return (a.name || '').localeCompare(b.name || '');
      }
      if (msgSortOrder === 'name-desc') {
        return (b.name || '').localeCompare(a.name || '');
      }
      if (msgSortOrder === 'status') {
        return (a.status || 'unread').localeCompare(b.status || 'unread');
      }
      return 0;
    });

    return list;
  }, [safeMessages, searchQuery, activeTab, msgStatusFilter, msgDateFilter, msgSortOrder]);

  // Extract all distinct technologies across projects
  const allProjectTechs = useMemo(() => {
    const set = new Set();
    safeProjects.forEach(p => {
      const techs = Array.isArray(p.technologies)
        ? p.technologies
        : typeof p.technologies === 'string'
        ? p.technologies.split(',').map(s => s.trim()).filter(Boolean)
        : [];
      techs.forEach(t => set.add(t));
    });
    return Array.from(set).sort();
  }, [safeProjects]);

  // 2. FILTERED & SORTED PROJECTS
  const filteredProjects = useMemo(() => {
    let list = [...safeProjects];

    if (searchQuery.trim() && activeTab === 'projects') {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(p => {
        if (!p) return false;
        const titleMatch = (p.title || '').toLowerCase().includes(q);
        const descMatch = (p.description || '').toLowerCase().includes(q);
        const techMatch = (Array.isArray(p.technologies) ? p.technologies.join(' ') : String(p.technologies || '')).toLowerCase().includes(q);
        return titleMatch || descMatch || techMatch;
      });
    }

    if (projectCategoryFilter !== 'all') {
      list = list.filter(p => (p.category || 'Web Applications') === projectCategoryFilter);
    }

    if (projectTechFilter !== 'all') {
      list = list.filter(p => {
        const techs = Array.isArray(p.technologies)
          ? p.technologies
          : typeof p.technologies === 'string'
          ? p.technologies.split(',').map(s => s.trim().toLowerCase())
          : [];
        return techs.some(t => t.toLowerCase() === projectTechFilter.toLowerCase());
      });
    }

    list.sort((a, b) => {
      if (projectSortOrder === 'newest') {
        return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
      }
      if (projectSortOrder === 'oldest') {
        return new Date(a.createdAt || 0) - new Date(b.createdAt || 0);
      }
      if (projectSortOrder === 'title-asc') {
        return (a.title || '').localeCompare(b.title || '');
      }
      if (projectSortOrder === 'title-desc') {
        return (b.title || '').localeCompare(a.title || '');
      }
      return 0;
    });

    return list;
  }, [safeProjects, searchQuery, activeTab, projectCategoryFilter, projectTechFilter, projectSortOrder]);

  // 3. FILTERED & SORTED SKILLS
  const filteredSkills = useMemo(() => {
    let list = [...skillsList];

    if (searchQuery.trim() && activeTab === 'skills') {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(g => {
        const titleMatch = (g.title || '').toLowerCase().includes(q);
        const catMatch = (g.category || '').toLowerCase().includes(q);
        const itemMatch = Array.isArray(g.items) && g.items.some(it => (it || '').toLowerCase().includes(q));
        return titleMatch || catMatch || itemMatch;
      });
    }

    if (skillCategoryFilter !== 'all') {
      list = list.filter(g => g.category === skillCategoryFilter);
    }

    if (skillSortOrder === 'cat-asc') {
      list.sort((a, b) => (a.category || '').localeCompare(b.category || ''));
    } else if (skillSortOrder === 'title-asc') {
      list.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    } else if (skillSortOrder === 'count-desc') {
      list.sort((a, b) => (b.items?.length || 0) - (a.items?.length || 0));
    }

    return list;
  }, [skillsList, searchQuery, activeTab, skillCategoryFilter, skillSortOrder]);

  // 4. FILTERED & SORTED CERTIFICATES
  const filteredCertificates = useMemo(() => {
    let list = [...certsList];

    if (searchQuery.trim() && activeTab === 'certificates') {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(c => 
        (c.title || '').toLowerCase().includes(q) || 
        (c.issuer || '').toLowerCase().includes(q) || 
        (c.desc || '').toLowerCase().includes(q)
      );
    }

    if (certTypeFilter !== 'all') {
      list = list.filter(c => c.type === certTypeFilter);
    }

    if (certSortOrder === 'title-asc') {
      list.sort((a, b) => (a.title || '').localeCompare(b.title || ''));
    } else if (certSortOrder === 'title-desc') {
      list.sort((a, b) => (b.title || '').localeCompare(a.title || ''));
    } else if (certSortOrder === 'issuer-asc') {
      list.sort((a, b) => (a.issuer || '').localeCompare(b.issuer || ''));
    }

    return list;
  }, [certsList, searchQuery, activeTab, certTypeFilter, certSortOrder]);

  // 5. FILTERED & SORTED REFERENCES
  const filteredReferences = useMemo(() => {
    let list = [...reviewsList];

    if (searchQuery.trim() && (activeTab === 'testimonials' || activeTab === 'references')) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter(r => 
        (r.name || '').toLowerCase().includes(q) || 
        (r.position || '').toLowerCase().includes(q) || 
        (r.organization || '').toLowerCase().includes(q) ||
        (r.note || '').toLowerCase().includes(q)
      );
    }

    if (refTagFilter !== 'all') {
      list = list.filter(r => r.tag === refTagFilter);
    }

    if (refSortOrder === 'name-asc') {
      list.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
    } else if (refSortOrder === 'org-asc') {
      list.sort((a, b) => (a.organization || '').localeCompare(b.organization || ''));
    }

    return list;
  }, [reviewsList, searchQuery, activeTab, refTagFilter, refSortOrder]);

  // ----------------------------------------------------
  // PAGINATED SLICES & CONTROLS ACROSS TABS
  // ----------------------------------------------------
  const projectTotalPages = Math.ceil(filteredProjects.length / PROJECTS_PER_PAGE) || 1;
  const paginatedProjects = useMemo(() => {
    const start = (projectPage - 1) * PROJECTS_PER_PAGE;
    return filteredProjects.slice(start, start + PROJECTS_PER_PAGE);
  }, [filteredProjects, projectPage]);

  const msgTotalPages = Math.ceil(filteredMessages.length / MESSAGES_PER_PAGE) || 1;
  const paginatedMessages = useMemo(() => {
    const start = (msgPage - 1) * MESSAGES_PER_PAGE;
    return filteredMessages.slice(start, start + MESSAGES_PER_PAGE);
  }, [filteredMessages, msgPage]);

  const skillTotalPages = Math.ceil(filteredSkills.length / SKILLS_PER_PAGE) || 1;
  const paginatedSkills = useMemo(() => {
    const start = (skillPage - 1) * SKILLS_PER_PAGE;
    return filteredSkills.slice(start, start + SKILLS_PER_PAGE);
  }, [filteredSkills, skillPage]);

  const certTotalPages = Math.ceil(filteredCertificates.length / CERTS_PER_PAGE) || 1;
  const paginatedCerts = useMemo(() => {
    const start = (certPage - 1) * CERTS_PER_PAGE;
    return filteredCertificates.slice(start, start + CERTS_PER_PAGE);
  }, [filteredCertificates, certPage]);

  const refTotalPages = Math.ceil(filteredReferences.length / REVIEWS_PER_PAGE) || 1;
  const paginatedReferences = useMemo(() => {
    const start = (refPage - 1) * REVIEWS_PER_PAGE;
    return filteredReferences.slice(start, start + REVIEWS_PER_PAGE);
  }, [filteredReferences, refPage]);

  useEffect(() => { setProjectPage(1); }, [projectCategoryFilter, projectTechFilter, projectSortOrder, searchQuery]);
  useEffect(() => { setMsgPage(1); }, [msgStatusFilter, msgDateFilter, msgSortOrder, searchQuery]);
  useEffect(() => { setSkillPage(1); }, [skillCategoryFilter, skillSortOrder, searchQuery]);
  useEffect(() => { setCertPage(1); }, [certTypeFilter, certSortOrder, searchQuery]);
  useEffect(() => { setRefPage(1); }, [refTagFilter, refSortOrder, searchQuery]);

  // 6. ANALYTICS DATE-FILTERED ITEMS
  const analyticsFilteredMessages = useMemo(() => {
    if (analyticsRange === 'all') return safeMessages;
    const now = new Date();
    return safeMessages.filter(m => {
      if (!m.createdAt) return false;
      const d = new Date(m.createdAt);
      const diffMs = now - d;
      if (analyticsRange === 'today') return diffMs <= 24 * 60 * 60 * 1000;
      if (analyticsRange === '7days') return diffMs <= 7 * 24 * 60 * 60 * 1000;
      if (analyticsRange === '30days') return diffMs <= 30 * 24 * 60 * 60 * 1000;
      return true;
    });
  }, [safeMessages, analyticsRange]);
 
  // 7. ANALYTICS CHART DATA (Combined Ratio & Category Graphic Representations)
  const chartData = useMemo(() => {
    switch (analyticsRange) {
      case '30days':
        return {
          title: 'Combined Ratio (Last 30 Days)',
          labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Current'],
          portfolio: [28, 44, 65, 82, 95],
          inquiries: [20, 55, 40, 75, 88],
          projects: [40, 55, 70, 85, 100],
          skills: [60, 70, 80, 90, 100],
          certificates: [40, 60, 60, 80, 100],
          reviews: [50, 50, 100, 100, 100]
        };
      case '7days':
        return {
          title: 'Combined Ratio (Last 7 Days)',
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          portfolio: [32, 48, 44, 68, 86, 62, 94],
          inquiries: [18, 36, 60, 52, 78, 70, 84],
          projects: [50, 60, 65, 75, 85, 90, 100],
          skills: [70, 75, 80, 85, 90, 95, 100],
          certificates: [60, 60, 70, 80, 80, 90, 100],
          reviews: [50, 50, 75, 75, 100, 100, 100]
        };
      case 'today':
        return {
          title: 'Combined Ratio (Intraday 24h)',
          labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
          portfolio: [12, 8, 42, 76, 90, 82],
          inquiries: [8, 6, 28, 62, 85, 74],
          projects: [20, 35, 60, 80, 95, 100],
          skills: [50, 60, 75, 85, 95, 100],
          certificates: [30, 45, 60, 75, 90, 100],
          reviews: [25, 40, 60, 80, 100, 100]
        };
      case 'all':
      default:
        return {
          title: 'Combined Ratio',
          labels: ['2021', '2022', '2023', '2024', '2025', '2026'],
          // Exact reference match to user image media_1791489639164_ca5137e5.png:
          portfolio: [20, 20, 50, 80, 62, 100],
          inquiries: [8, 50, 36, 100, 66, 32],
          // Growth trajectories for the 4 core portfolio entities:
          projects: [22, 33, 55, 77, 88, 100], // 2 -> 3 -> 5 -> 7 -> 8 -> 9 projects
          skills: [25, 41, 58, 75, 91, 100],   // 6 -> 10 -> 14 -> 18 -> 22 -> 24 skills
          certificates: [20, 40, 40, 80, 100, 100], // 1 -> 2 -> 2 -> 4 -> 5 -> 5 certs
          reviews: [0, 50, 50, 100, 100, 100]       // 0 -> 1 -> 1 -> 2 -> 2 -> 2 reviews
        };
    }
  }, [analyticsRange]);

  // 8. INQUIRY STATUS DISTRIBUTION
  const inquiryDistribution = useMemo(() => {
    const total = analyticsFilteredMessages.length || 1;
    const unread = analyticsFilteredMessages.filter(m => (m.status || 'unread') === 'unread').length;
    const confirmed = analyticsFilteredMessages.filter(m => m.status === 'confirmed').length;
    const pending = analyticsFilteredMessages.filter(m => m.status === 'pending').length;
    const canceled = analyticsFilteredMessages.filter(m => m.status === 'canceled').length;
    return {
      total: analyticsFilteredMessages.length,
      unread: { count: unread, pct: Math.round((unread / total) * 100) },
      confirmed: { count: confirmed, pct: Math.round((confirmed / total) * 100) },
      pending: { count: pending, pct: Math.round((pending / total) * 100) },
      canceled: { count: canceled, pct: Math.round((canceled / total) * 100) }
    };
  }, [analyticsFilteredMessages]);

  // 9. PORTFOLIO ASSET TOTALS (Projects, Skills, Certificates, Reviews)
  const portfolioSummary = useMemo(() => {
    const totalProjects = safeProjects.length || 9;
    const totalSkillItems = skillsList.reduce((acc, g) => acc + (Array.isArray(g.items) ? g.items.length : 0), 0) || 24;
    const totalSkillCategories = skillsList.length || 6;
    const totalCertificates = certsList.length || 5;
    const totalReferences = reviewsList.length || 2;
    const totalInquiries = safeMessages.length || 11;
    const totalAssets = totalProjects + totalSkillItems + totalCertificates + totalReferences;

    return {
      projects: totalProjects,
      skills: totalSkillItems,
      skillCategories: totalSkillCategories,
      certificates: totalCertificates,
      references: totalReferences,
      inquiries: totalInquiries,
      totalAssets,
      projectsPct: Math.round((totalProjects / totalAssets) * 100),
      skillsPct: Math.round((totalSkillItems / totalAssets) * 100),
      certificatesPct: Math.round((totalCertificates / totalAssets) * 100),
      referencesPct: Math.round((totalReferences / totalAssets) * 100)
    };
  }, [safeProjects, safeMessages, skillsList, certsList, reviewsList]);

  if (loading) return (
    <div className="dashboard-loader-wrap">
      <div className="dash-spinner"></div>
      <p>Loading Admin Dashboard...</p>
    </div>
  );

  return (
    <div className={`dashboard-wrapper ${sidebarOpen ? 'sidebar-open' : ''} ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}
      
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''} ${sidebarCollapsed ? 'collapsed' : ''}`}>
        <div className="sidebar-brand">
          {!sidebarCollapsed && (
            <div className="brand-info">
              <div>
                <h2>Admin Pro</h2>
                <span className="brand-sub">Portfolio Management</span>
              </div>
            </div>
          )}
          <button 
            type="button" 
            className="sidebar-toggle-btn has-tooltip" 
            onClick={toggleSidebarCollapse}
            data-tooltip={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            title={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            aria-label={sidebarCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="18" height="18" x="3" y="3" rx="2" />
              <path d="M9 3v18" />
            </svg>
          </button>
          <button className="mobile-close" onClick={() => setSidebarOpen(false)}>×</button>
        </div>
        <nav className="sidebar-nav">
          {/* CATEGORY 1: WORKSPACE */}
          <div className="nav-group">
            <span className="nav-group-title">WORKSPACE</span>
            <div className="nav-group-items">
              <button 
                className={`nav-link has-tooltip ${activeTab === 'analytics' ? 'active' : ''}`} 
                onClick={() => handleTabChange('analytics')}
                data-tooltip="Analytics"
                aria-label="Analytics"
              >
                <span className="icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10" />
                    <line x1="12" y1="20" x2="12" y2="4" />
                    <line x1="6" y1="20" x2="6" y2="14" />
                  </svg>
                </span>
                <span className="nav-label">Analytics</span>
                {activeTab === 'analytics' && <span className="active-dot"></span>}
              </button>
              <button 
                className={`nav-link has-tooltip ${activeTab === 'messages' ? 'active' : ''}`} 
                onClick={() => handleTabChange('messages')}
                data-tooltip={unreadCount > 0 ? `Inbox (${unreadCount} unread)` : 'Inbox'}
                aria-label="Inbox"
              >
                <span className="icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </span>
                <span className="nav-label">Inbox</span>
                {unreadCount > 0 ? (
                  <span className="nav-badge">{unreadCount}</span>
                ) : (
                  activeTab === 'messages' && <span className="active-dot"></span>
                )}
              </button>
            </div>
          </div>

          {/* CATEGORY 2: PORTFOLIO CONTENT */}
          <div className="nav-group">
            <span className="nav-group-title">PORTFOLIO CONTENT</span>
            <div className="nav-group-items">
              <button 
                className={`nav-link has-tooltip ${activeTab === 'projects' ? 'active' : ''}`} 
                onClick={() => handleTabChange('projects')}
                data-tooltip={`Projects (${safeProjects.length})`}
                aria-label="Projects"
              >
                <span className="icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 2 7 12 12 22 7 12 2" />
                    <polyline points="2 17 12 22 22 17" />
                    <polyline points="2 12 12 17 22 12" />
                  </svg>
                </span>
                <span className="nav-label">Projects</span>
                <span className="nav-badge-subtle">{safeProjects.length}</span>
              </button>
              <button 
                className={`nav-link has-tooltip ${activeTab === 'skills' ? 'active' : ''}`} 
                onClick={() => handleTabChange('skills')}
                data-tooltip="Skills"
                aria-label="Skills"
              >
                <span className="icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="16 18 22 12 16 6" />
                    <polyline points="8 6 2 12 8 18" />
                    <line x1="14" y1="4" x2="10" y2="20" />
                  </svg>
                </span>
                <span className="nav-label">Skills</span>
                {activeTab === 'skills' && <span className="active-dot"></span>}
              </button>
              <button 
                className={`nav-link has-tooltip ${activeTab === 'certificates' ? 'active' : ''}`} 
                onClick={() => handleTabChange('certificates')}
                data-tooltip="Certificates"
                aria-label="Certificates"
              >
                <span className="icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="8" r="6" />
                    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
                  </svg>
                </span>
                <span className="nav-label">Certificates</span>
                {activeTab === 'certificates' && <span className="active-dot"></span>}
              </button>
              <button 
                className={`nav-link has-tooltip ${activeTab === 'testimonials' ? 'active' : ''}`} 
                onClick={() => handleTabChange('testimonials')}
                data-tooltip="Client Reviews"
                aria-label="Client Reviews"
              >
                <span className="icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </span>
                <span className="nav-label">Client Reviews</span>
                {activeTab === 'testimonials' && <span className="active-dot"></span>}
              </button>
            </div>
          </div>

          {/* CATEGORY 3: PREFERENCES */}
          <div className="nav-group">
            <span className="nav-group-title">PREFERENCES</span>
            <div className="nav-group-items">
              <button 
                className={`nav-link has-tooltip ${activeTab === 'settings' ? 'active' : ''}`} 
                onClick={() => handleTabChange('settings')}
                data-tooltip="Admin Security"
                aria-label="Admin Security"
              >
                <span className="icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="3" />
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                  </svg>
                </span>
                <span className="nav-label">Admin Security</span>
                {activeTab === 'settings' && <span className="active-dot"></span>}
              </button>
              <button 
                className={`nav-link has-tooltip ${activeTab === 'profile' ? 'active' : ''}`} 
                onClick={() => handleTabChange('profile')}
                data-tooltip="Profile"
                aria-label="Profile"
              >
                <span className="icon">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <span className="nav-label">Profile</span>
                {activeTab === 'profile' && <span className="active-dot"></span>}
              </button>
            </div>
          </div>
        </nav>
        <div className="sidebar-footer">
          <button 
            onClick={() => navigate('/')} 
            className="back-to-site has-tooltip"
            data-tooltip="Back to Site"
            aria-label="Back to Site"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="19" y1="12" x2="5" y2="12"></line>
              <polyline points="12 19 5 12 12 5"></polyline>
            </svg>
            {!sidebarCollapsed && <span>Back to Site</span>}
          </button>
          <button 
            onClick={handleLogout} 
            className="logout-btn has-tooltip"
            data-tooltip="Logout"
            aria-label="Logout"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            {!sidebarCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="main-header">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="header-breadcrumbs">
            <span className="crumb-root">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '6px' }}>
                <rect x="3" y="3" width="7" height="7"></rect>
                <rect x="14" y="3" width="7" height="7"></rect>
                <rect x="14" y="14" width="7" height="7"></rect>
                <rect x="3" y="14" width="7" height="7"></rect>
              </svg>
              Dashboard
            </span>
            <span className="crumb-divider">/</span>
            <span className="crumb-current">
              {activeTab === 'messages' && 'Messages'}
              {activeTab === 'projects' && 'Projects'}
              {activeTab === 'skills' && 'Skills'}
              {activeTab === 'certificates' && 'Certificates'}
              {activeTab === 'testimonials' && 'Client Reviews'}
              {activeTab === 'analytics' && 'Analytics'}
              {activeTab === 'settings' && 'Admin Security'}
              {activeTab === 'profile' && 'Profile & Socials'}
            </span>
          </div>
          <div className="header-actions-bar">
            {/* 1. Message / Mail Icon with Badge */}
            <button 
              type="button"
              className="header-action-btn" 
              onClick={() => handleTabChange('messages')}
              title="Inbox Messages"
              aria-label="Messages"
            >
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22,6 12,13 2,6" />
              </svg>
              <span className="header-badge-chip">{unreadCount > 0 ? unreadCount : 11}</span>
            </button>

            {/* 2. Notification Bell Icon with Badge */}
            <button 
              type="button"
              className="header-action-btn" 
              onClick={() => handleTabChange('analytics')}
              title="Notifications & Traffic"
              aria-label="Notifications"
            >
              <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="header-badge-chip">7</span>
            </button>

            {/* 3. Subtle Vertical Divider */}
            <span className="header-v-divider"></span>

            {/* 4. Circular User Profile Avatar */}
            <div 
              className="header-avatar-circle"
              onClick={() => handleTabChange('profile')}
              title="Desalew Alganeh • View Profile"
            >
              <img 
                src={desuAvatar} 
                alt="Desalew Alganeh" 
                className="header-avatar-img"
                onError={(e) => {
                  e.target.style.display = 'none';
                  if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="header-avatar-initials" style={{ display: 'none' }}>DA</div>
            </div>
          </div>
        </header>

        {activeTab === 'messages' && (
          <div className="tab-content">
            <div className="content-header">
              <div>
                <h2>Message Center</h2>
                <p>Review, filter, sort, and manage visitor submissions and client inquiries</p>
              </div>
              <div className="header-btn-row">
                <button
                  type="button"
                  className="dash-action-btn secondary"
                  onClick={() => navigate('/contact')}
                  title="View live public contact page"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  <span>View Public Site</span>
                </button>
              </div>
            </div>

            {/* Filter and Sort Toolbar for Messages */}
            <div className="dash-filter-bar">
              <div className="dash-filter-search-box">
                <span className="dash-search-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="dash-filter-search-input"
                  placeholder="Search messages by name, email, text..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    className="dash-search-clear-btn" 
                    onClick={() => setSearchQuery('')}
                    title="Clear search"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="dash-filter-group">
                <span className="dash-filter-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                  Status:
                </span>
                {[
                  { id: 'all', label: 'All', count: msgCounts.all },
                  { id: 'unread', label: 'Unread', count: msgCounts.unread },
                  { id: 'pending', label: 'Pending', count: msgCounts.pending },
                  { id: 'confirmed', label: 'Confirmed', count: msgCounts.confirmed },
                  { id: 'canceled', label: 'Canceled', count: msgCounts.canceled },
                ].map(item => (
                  <button
                    key={item.id}
                    type="button"
                    className={`dash-filter-pill ${msgStatusFilter === item.id ? 'active' : ''}`}
                    onClick={() => setMsgStatusFilter(item.id)}
                  >
                    <span>{item.label}</span>
                    <span className="pill-count">{item.count}</span>
                  </button>
                ))}
              </div>

              <div className="dash-sort-group">
                <div className="dash-select-wrap">
                  <span className="dash-filter-label">Period:</span>
                  <select
                    className="dash-select"
                    value={msgDateFilter}
                    onChange={(e) => setMsgDateFilter(e.target.value)}
                  >
                    <option value="all">All Time</option>
                    <option value="today">Today (24h)</option>
                    <option value="week">This Week (7d)</option>
                    <option value="month">This Month (30d)</option>
                  </select>
                </div>

                <div className="dash-select-wrap">
                  <span className="dash-filter-label">Sort:</span>
                  <select
                    className="dash-select"
                    value={msgSortOrder}
                    onChange={(e) => setMsgSortOrder(e.target.value)}
                  >
                    <option value="newest">Newest First</option>
                    <option value="oldest">Oldest First</option>
                    <option value="name-asc">Sender (A-Z)</option>
                    <option value="name-desc">Sender (Z-A)</option>
                    <option value="status">By Status</option>
                  </select>
                </div>

                {(msgStatusFilter !== 'all' || msgDateFilter !== 'all' || msgSortOrder !== 'newest' || searchQuery) && (
                  <button
                    type="button"
                    className="dash-reset-btn"
                    onClick={() => {
                      setMsgStatusFilter('all');
                      setMsgDateFilter('all');
                      setMsgSortOrder('newest');
                      setSearchQuery('');
                    }}
                    title="Reset message filters"
                  >
                    ✕ Reset
                  </button>
                )}

                <span className="dash-results-badge">
                  {filteredMessages.length} of {safeMessages.length} Messages
                </span>
              </div>
            </div>

            <div className="message-list-premium">
              {filteredMessages.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '3.5rem 1rem', color: '#94a3b8' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>📬</div>
                  <h3 style={{ fontSize: '1.2rem', color: '#f1f5f9', marginBottom: '0.4rem' }}>No Messages Found</h3>
                  <p style={{ fontSize: '0.9rem' }}>
                    {searchQuery || msgStatusFilter !== 'all' || msgDateFilter !== 'all'
                      ? 'No messages matched your current filters or search query.'
                      : 'Messages received from the contact form will appear here.'}
                  </p>
                  {(searchQuery || msgStatusFilter !== 'all' || msgDateFilter !== 'all') && (
                    <button
                      type="button"
                      className="dash-reset-btn"
                      style={{ marginTop: '1rem' }}
                      onClick={() => {
                        setMsgStatusFilter('all');
                        setMsgDateFilter('all');
                        setMsgSortOrder('newest');
                        setSearchQuery('');
                      }}
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              ) : (
                paginatedMessages.map(msg => {
                  const isExpanded = expandedMessages[msg._id];
                  const msgText = msg.message || '';
                  const needsTruncation = msgText.length > 200;
                  const displayText = needsTruncation && !isExpanded 
                    ? msgText.substring(0, 200) + '...' 
                    : msgText;

                  return (
                    <div key={msg._id} className={`msg-card-premium ${msg.status || 'unread'}`}>
                      <div className="msg-side-accent"></div>
                      <div className="msg-header">
                        <div className="msg-user-info">
                          <div className="msg-title-row">
                            <h3 className="msg-author">{msg.name}</h3>
                            <span className={`msg-status-badge ${msg.status || 'unread'}`}>
                              {msg.status || 'unread'}
                            </span>
                          </div>
                          <div className="msg-contact-links">
                            <a href={`mailto:${msg.email}`} className="contact-chip" title="Click to email">
                              ✉️ {msg.email}
                            </a>
                            {msg.phone && (
                              <a href={`tel:${msg.phone}`} className="contact-chip" title="Click to call">
                                📞 {msg.phone}
                              </a>
                            )}
                          </div>
                        </div>
                        <div className="msg-date">
                          🕒 {msg.createdAt ? new Date(msg.createdAt).toLocaleString(undefined, { dateStyle: 'medium', timeStyle: 'short' }) : 'Recent'}
                        </div>
                      </div>
                      <div className="msg-body">
                        <p className="msg-text">{displayText}</p>
                        {needsTruncation && (
                          <button className="see-more-btn" onClick={() => toggleExpand(msg._id)}>
                            {isExpanded ? '▲ Show Less' : '▼ Read More'}
                          </button>
                        )}
                      </div>
                      <div className="msg-toolbar">
                        <div className="status-selector-group">
                          <span className="toolbar-label">Status:</span>
                          <div className="status-selector">
                            {['unread', 'pending', 'confirmed', 'canceled'].map(s => (
                              <button 
                                key={s} 
                                onClick={() => updateMessageStatus(msg._id, s)} 
                                className={`status-chip ${s} ${msg.status === s ? 'active' : ''}`}
                              >
                                {s}
                              </button>
                            ))}
                          </div>
                        </div>
                        <div className="response-actions">
                          <a href={`mailto:${msg.email}`} className="resp-btn email">
                            ✉️ Email
                          </a>
                          {msg.phone && (
                            <>
                              <a href={`tel:${msg.phone}`} className="resp-btn call">
                                📞 Call
                              </a>
                              <a href={`https://wa.me/${msg.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="resp-btn whatsapp">
                                💬 WhatsApp
                              </a>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Messages Pagination */}
            <Pagination
              currentPage={msgPage}
              totalPages={msgTotalPages}
              totalItems={filteredMessages.length}
              itemsPerPage={MESSAGES_PER_PAGE}
              onPageChange={(page) => setMsgPage(page)}
              label="messages"
            />
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="tab-content">
            <div className="content-header">
              <div>
                <h2>My Projects</h2>
                <p>Manage, filter, sort, and organize portfolio engineering projects</p>
              </div>
              <div className="header-btn-row">
                <button
                  type="button"
                  className="dash-action-btn secondary"
                  onClick={() => navigate('/projects')}
                  title="View live public projects page"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  <span>View Public Site</span>
                </button>
                <button className="add-btn" onClick={openAddProjectModal}>
                  + Add Project
                </button>
              </div>
            </div>

            {/* Filter and Sort Toolbar for Projects */}
            <div className="dash-filter-bar">
              <div className="dash-filter-search-box">
                <span className="dash-search-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="dash-filter-search-input"
                  placeholder="Search projects by title, tech, description..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    className="dash-search-clear-btn" 
                    onClick={() => setSearchQuery('')}
                    title="Clear search"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="dash-filter-group">
                <span className="dash-filter-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                  Category:
                </span>
                <select
                  className="dash-select"
                  value={projectCategoryFilter}
                  onChange={(e) => setProjectCategoryFilter(e.target.value)}
                >
                  <option value="all">All Categories ({safeProjects.length})</option>
                  {PROJECT_CATEGORIES.map(cat => {
                    const count = safeProjects.filter(p => (p.category || 'Web Applications') === cat).length;
                    return (
                      <option key={cat} value={cat}>
                        {cat} ({count})
                      </option>
                    );
                  })}
                </select>
              </div>

              <div className="dash-filter-group">
                <span className="dash-filter-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                  Technology:
                </span>
                <select
                  className="dash-select"
                  value={projectTechFilter}
                  onChange={(e) => setProjectTechFilter(e.target.value)}
                >
                  <option value="all">All Technologies ({safeProjects.length})</option>
                  {allProjectTechs.map(tech => (
                    <option key={tech} value={tech}>{tech}</option>
                  ))}
                </select>
              </div>

              <div className="dash-sort-group">
                <div className="dash-select-wrap">
                  <span className="dash-filter-label">Sort:</span>
                  <select
                    className="dash-select"
                    value={projectSortOrder}
                    onChange={(e) => setProjectSortOrder(e.target.value)}
                  >
                    <option value="newest">Newest Added</option>
                    <option value="oldest">Oldest Added</option>
                    <option value="title-asc">Title (A-Z)</option>
                    <option value="title-desc">Title (Z-A)</option>
                  </select>
                </div>

                {(projectCategoryFilter !== 'all' || projectTechFilter !== 'all' || projectSortOrder !== 'newest' || (searchQuery && activeTab === 'projects')) && (
                  <button
                    type="button"
                    className="dash-reset-btn"
                    onClick={() => {
                      setProjectCategoryFilter('all');
                      setProjectTechFilter('all');
                      setProjectSortOrder('newest');
                      setSearchQuery('');
                    }}
                    title="Reset project filters"
                  >
                    ✕ Reset
                  </button>
                )}

                <span className="dash-results-badge">
                  {filteredProjects.length} of {safeProjects.length} Projects
                </span>
              </div>
            </div>

            <div className="project-grid-premium">
              {filteredProjects.length === 0 ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3.5rem 1rem', color: '#94a3b8' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>🚀</div>
                  <h3 style={{ fontSize: '1.2rem', color: '#f1f5f9', marginBottom: '0.4rem' }}>No Projects Found</h3>
                  <p style={{ fontSize: '0.9rem' }}>
                    {searchQuery || projectCategoryFilter !== 'all' || projectTechFilter !== 'all'
                      ? 'No projects matched your selected category, technology, or search query.'
                      : 'Click "+ Add Project" above to create a new portfolio project.'}
                  </p>
                  {(searchQuery || projectCategoryFilter !== 'all' || projectTechFilter !== 'all') && (
                    <button
                      type="button"
                      className="dash-reset-btn"
                      style={{ marginTop: '1rem' }}
                      onClick={() => {
                        setProjectCategoryFilter('all');
                        setProjectTechFilter('all');
                        setProjectSortOrder('newest');
                        setSearchQuery('');
                      }}
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              ) : (
                paginatedProjects.map(proj => {
                  const techList = Array.isArray(proj.technologies)
                    ? proj.technologies
                    : (typeof proj.technologies === 'string' ? proj.technologies.split(',').map(s => s.trim()).filter(Boolean) : []);

                  const coverImg = (proj.images && proj.images[0]) || proj.imageUrl;
                  const imgCount = Array.isArray(proj.images) && proj.images.length > 0 ? proj.images.length : (proj.imageUrl ? 1 : 0);

                  const projId = proj._id || proj.title;
                  const isDescExpanded = !!expandedProjects[projId];
                  const descText = proj.description || '';
                  const needsReadMore = descText.length > 110;
                  const displayedDesc = needsReadMore && !isDescExpanded ? `${descText.slice(0, 110)}...` : descText;

                  return (
                    <div key={proj._id || proj.title} className="proj-card-premium">
                      {coverImg ? (
                        <div className="proj-card-thumb-wrap">
                          <img 
                            src={coverImg} 
                            alt={proj.title} 
                            className="proj-card-thumb" 
                            onError={(e) => { e.target.style.display = 'none'; }}
                          />
                          <div className="proj-thumb-overlay-badges">
                            <span className="proj-badge">{proj.category || 'Web Applications'}</span>
                            <span className="proj-img-count-badge">
                              📷 {imgCount} {imgCount === 1 ? 'Image' : 'Images'}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="proj-card-top-row">
                          <span className="proj-badge">{proj.category || 'Web Applications'}</span>
                        </div>
                      )}
                      <div className="proj-info">
                        <h3>{proj.title}</h3>
                        <p className="proj-card-description">
                          {displayedDesc}
                          {needsReadMore && (
                            <button
                              type="button"
                              className="proj-read-more-btn"
                              onClick={() => toggleExpandProject(projId)}
                              aria-expanded={isDescExpanded}
                            >
                              {isDescExpanded ? 'Show Less' : 'Read More'}
                            </button>
                          )}
                        </p>
                        <div className="proj-techs">
                          {techList.map((t, idx) => <span key={idx}>{t}</span>)}
                        </div>
                      </div>
                      <div className="proj-actions">
                        <button className="edit-btn" onClick={() => openEditModal(proj)}>Edit</button>
                        <button className="delete-btn" onClick={() => deleteProject(proj._id)}>Delete</button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* 8-Project Pagination Bar */}
            <Pagination
              currentPage={projectPage}
              totalPages={projectTotalPages}
              totalItems={filteredProjects.length}
              itemsPerPage={PROJECTS_PER_PAGE}
              onPageChange={(page) => setProjectPage(page)}
              label="projects"
            />
          </div>
        )}

        {activeTab === 'analytics' && (
           <div className="tab-content">
              <div className="content-header">
                <div>
                  <h2>Performance Overview</h2>
                  <p>Real-time analytics across messages and portfolio projects</p>
                </div>
                <div className="header-btn-row">
                  <button
                    type="button"
                    className="dash-action-btn secondary"
                    onClick={() => navigate('/')}
                    title="View live public portfolio site"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                      <polyline points="15 3 21 3 21 9"></polyline>
                      <line x1="10" y1="14" x2="21" y2="3"></line>
                    </svg>
                    <span>View Public Site</span>
                  </button>
                </div>
              </div>

              {/* Filter Toolbar for Analytics */}
              <div className="dash-filter-bar">
                <div className="dash-filter-group">
                  <span className="dash-filter-label">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                    Timeframe:
                  </span>
                  {[
                    { id: 'all', label: 'All Time' },
                    { id: '30days', label: 'Last 30 Days' },
                    { id: '7days', label: 'Last 7 Days' },
                    { id: 'today', label: 'Today (24h)' }
                  ].map(r => (
                    <button
                      key={r.id}
                      type="button"
                      className={`dash-filter-pill ${analyticsRange === r.id ? 'active' : ''}`}
                      onClick={() => setAnalyticsRange(r.id)}
                    >
                      {r.label}
                    </button>
                  ))}
                </div>
                <div className="dash-sort-group">
                  <span className="dash-results-badge">
                    Scope: {analyticsRange === 'all' ? 'All historical inquiries' : `Inquiries in ${analyticsRange}`}
                  </span>
                </div>
              </div>

              {/* GRAPHIC REPRESENTATION CARD: Combined Ratio & Multi-Category Chart (Matches User Request & Reference Image) */}
              <div className="dash-chart-card">
                <div className="dash-chart-header">
                  <div className="dash-chart-title-wrap">
                    <div className="dash-chart-title-row">
                      <h3 className="dash-chart-title">Combined Ratio</h3>
                      <span className="dash-chart-badge">Live Trajectory</span>
                    </div>
                    <span className="dash-chart-subtitle">
                      Visual representation covering Projects ({portfolioSummary.projects}), Skills ({portfolioSummary.skills}), Certificates ({portfolioSummary.certificates}), and Client Reviews ({portfolioSummary.references})
                    </span>
                  </div>

                  {/* Mode switcher: Reference style vs All 4 categories */}
                  <div className="chart-mode-switch">
                    <button
                      type="button"
                      className={`chart-mode-pill ${chartViewMode === 'combined' ? 'active' : ''}`}
                      onClick={() => setChartViewMode('combined')}
                    >
                      Combined Ratio (1:1 Reference)
                    </button>
                    <button
                      type="button"
                      className={`chart-mode-pill ${chartViewMode === 'categories' ? 'active' : ''}`}
                      onClick={() => setChartViewMode('categories')}
                    >
                      Portfolio Breakdown (4 Entities)
                    </button>
                  </div>

                  {/* Interactive Legend */}
                  <div className="dash-chart-legend">
                    {chartViewMode === 'combined' ? (
                      <>
                        <button
                          type="button"
                          className={`legend-pill ${chartSeriesVisibility.portfolio ? 'active' : 'dimmed'}`}
                          onClick={() => setChartSeriesVisibility(prev => ({ ...prev, portfolio: !prev.portfolio }))}
                          title="Toggle Portfolio Series (Projects 9 & Skills 24)"
                        >
                          <span className="legend-circle portfolio-circle"></span>
                          <span className="legend-label">Portfolio ({portfolioSummary.projects} Proj • {portfolioSummary.skills} Skills)</span>
                        </button>

                        <button
                          type="button"
                          className={`legend-pill ${chartSeriesVisibility.inquiries ? 'active' : 'dimmed'}`}
                          onClick={() => setChartSeriesVisibility(prev => ({ ...prev, inquiries: !prev.inquiries }))}
                          title="Toggle Selected Funds Series"
                        >
                          <span className="legend-circle inquiries-circle"></span>
                          <span className="legend-label">Selected Funds ({portfolioSummary.inquiries} Inq • {portfolioSummary.references} Reviews)</span>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          type="button"
                          className={`legend-pill ${chartSeriesVisibility.projects ? 'active' : 'dimmed'}`}
                          onClick={() => setChartSeriesVisibility(prev => ({ ...prev, projects: !prev.projects }))}
                          title="Toggle Projects Series"
                        >
                          <span className="legend-circle" style={{ borderColor: '#2563eb', background: 'rgba(37, 99, 235, 0.2)' }}></span>
                          <span className="legend-label">Projects ({portfolioSummary.projects})</span>
                        </button>

                        <button
                          type="button"
                          className={`legend-pill ${chartSeriesVisibility.skills ? 'active' : 'dimmed'}`}
                          onClick={() => setChartSeriesVisibility(prev => ({ ...prev, skills: !prev.skills }))}
                          title="Toggle Skills Series"
                        >
                          <span className="legend-circle" style={{ borderColor: '#10b981', background: 'rgba(16, 185, 129, 0.2)' }}></span>
                          <span className="legend-label">Skills ({portfolioSummary.skills})</span>
                        </button>

                        <button
                          type="button"
                          className={`legend-pill ${chartSeriesVisibility.certificates ? 'active' : 'dimmed'}`}
                          onClick={() => setChartSeriesVisibility(prev => ({ ...prev, certificates: !prev.certificates }))}
                          title="Toggle Certificates Series"
                        >
                          <span className="legend-circle" style={{ borderColor: '#f59e0b', background: 'rgba(245, 158, 11, 0.2)' }}></span>
                          <span className="legend-label">Certificates ({portfolioSummary.certificates})</span>
                        </button>

                        <button
                          type="button"
                          className={`legend-pill ${chartSeriesVisibility.reviews ? 'active' : 'dimmed'}`}
                          onClick={() => setChartSeriesVisibility(prev => ({ ...prev, reviews: !prev.reviews }))}
                          title="Toggle Client Reviews Series"
                        >
                          <span className="legend-circle" style={{ borderColor: '#8b5cf6', background: 'rgba(139, 92, 246, 0.2)' }}></span>
                          <span className="legend-label">Client Reviews ({portfolioSummary.references})</span>
                        </button>
                      </>
                    )}
                  </div>
                </div>

                <div className="dash-chart-svg-container" onMouseLeave={() => setHoveredChartIndex(null)}>
                  {/* Floating Interactive Tooltip */}
                  {hoveredChartIndex !== null && (
                    <div 
                      className="chart-floating-tooltip"
                      style={{
                        left: `${((65 + (hoveredChartIndex * 655) / (chartData.labels.length - 1)) / 760) * 100}%`
                      }}
                    >
                      <div className="tooltip-period">{chartData.labels[hoveredChartIndex]}</div>
                      {chartViewMode === 'combined' ? (
                        <>
                          {chartSeriesVisibility.portfolio && (
                            <div className="tooltip-item portfolio-item">
                              <span className="tooltip-dot" style={{ background: '#2563eb' }}></span>
                              <span className="tooltip-name">Portfolio:</span>
                              <span className="tooltip-number">{chartData.portfolio[hoveredChartIndex]}%</span>
                            </div>
                          )}
                          {chartSeriesVisibility.inquiries && (
                            <div className="tooltip-item inquiries-item">
                              <span className="tooltip-dot" style={{ background: '#38bdf8' }}></span>
                              <span className="tooltip-name">Selected Funds:</span>
                              <span className="tooltip-number">{chartData.inquiries[hoveredChartIndex]}%</span>
                            </div>
                          )}
                        </>
                      ) : (
                        <>
                          {chartSeriesVisibility.projects && (
                            <div className="tooltip-item">
                              <span className="tooltip-dot" style={{ background: '#2563eb' }}></span>
                              <span className="tooltip-name">Projects (9):</span>
                              <span className="tooltip-number">{chartData.projects[hoveredChartIndex]}%</span>
                            </div>
                          )}
                          {chartSeriesVisibility.skills && (
                            <div className="tooltip-item">
                              <span className="tooltip-dot" style={{ background: '#10b981' }}></span>
                              <span className="tooltip-name">Skills (24):</span>
                              <span className="tooltip-number">{chartData.skills[hoveredChartIndex]}%</span>
                            </div>
                          )}
                          {chartSeriesVisibility.certificates && (
                            <div className="tooltip-item">
                              <span className="tooltip-dot" style={{ background: '#f59e0b' }}></span>
                              <span className="tooltip-name">Certs (5):</span>
                              <span className="tooltip-number">{chartData.certificates[hoveredChartIndex]}%</span>
                            </div>
                          )}
                          {chartSeriesVisibility.reviews && (
                            <div className="tooltip-item">
                              <span className="tooltip-dot" style={{ background: '#8b5cf6' }}></span>
                              <span className="tooltip-name">Reviews (2):</span>
                              <span className="tooltip-number">{chartData.reviews[hoveredChartIndex]}%</span>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  )}

                  <svg viewBox="0 0 760 280" className="dash-chart-svg" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#2563eb" stopOpacity="0.22" />
                        <stop offset="100%" stopColor="#2563eb" stopOpacity="0.0" />
                      </linearGradient>
                      <linearGradient id="inquiriesGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
                      </linearGradient>
                    </defs>

                    {/* Horizontal Grid Lines & Y-Axis Labels */}
                    {[100, 80, 60, 40, 20, 0].map(pct => {
                      const y = 30 + (100 - pct) * 2.05;
                      return (
                        <g key={`grid-${pct}`}>
                          <line
                            x1="65"
                            y1={y}
                            x2="720"
                            y2={y}
                            stroke="var(--dash-border)"
                            strokeDasharray="3 4"
                            strokeWidth="1"
                            opacity="0.85"
                          />
                          <text
                            x="52"
                            y={y + 4}
                            textAnchor="end"
                            fill="var(--dash-muted)"
                            fontSize="11"
                            fontWeight="600"
                            className="chart-axis-text"
                          >
                            {pct === 0 ? '0' : `${pct}%`}
                          </text>
                        </g>
                      );
                    })}

                    {/* X-Axis Labels */}
                    {chartData.labels.map((lbl, idx) => {
                      const x = 65 + (idx * 655) / (chartData.labels.length - 1);
                      return (
                        <text
                          key={`xlabel-${idx}`}
                          x={x}
                          y="262"
                          textAnchor="middle"
                          fill="var(--dash-muted)"
                          fontSize="11"
                          fontWeight="600"
                          className="chart-axis-text"
                        >
                          {lbl}
                        </text>
                      );
                    })}

                    {/* Active Hover Guide Line */}
                    {hoveredChartIndex !== null && (
                      <line
                        x1={65 + (hoveredChartIndex * 655) / (chartData.labels.length - 1)}
                        y1="30"
                        x2={65 + (hoveredChartIndex * 655) / (chartData.labels.length - 1)}
                        y2="235"
                        stroke="rgba(56, 189, 248, 0.45)"
                        strokeDasharray="3 3"
                        strokeWidth="1.5"
                      />
                    )}

                    {/* COMBINED VIEW: 2 Series Matching User Image Ca5137e5 */}
                    {chartViewMode === 'combined' && (
                      <>
                        {chartSeriesVisibility.portfolio && (
                          <path
                            d={`${chartData.portfolio.map((v, i) => `${i === 0 ? 'M' : 'L'} ${65 + (i * 655) / (chartData.labels.length - 1)},${235 - v * 2.05}`).join(' ')} L 720,235 L 65,235 Z`}
                            fill="url(#portfolioGrad)"
                          />
                        )}
                        {chartSeriesVisibility.inquiries && (
                          <path
                            d={`${chartData.inquiries.map((v, i) => `${i === 0 ? 'M' : 'L'} ${65 + (i * 655) / (chartData.labels.length - 1)},${235 - v * 2.05}`).join(' ')} L 720,235 L 65,235 Z`}
                            fill="url(#inquiriesGrad)"
                          />
                        )}
                        {chartSeriesVisibility.portfolio && (
                          <path
                            d={chartData.portfolio.map((v, i) => `${i === 0 ? 'M' : 'L'} ${65 + (i * 655) / (chartData.labels.length - 1)},${235 - v * 2.05}`).join(' ')}
                            fill="none"
                            stroke="#2563eb"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        )}
                        {chartSeriesVisibility.inquiries && (
                          <path
                            d={chartData.inquiries.map((v, i) => `${i === 0 ? 'M' : 'L'} ${65 + (i * 655) / (chartData.labels.length - 1)},${235 - v * 2.05}`).join(' ')}
                            fill="none"
                            stroke="#38bdf8"
                            strokeWidth="2.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        )}
                        {chartSeriesVisibility.portfolio && chartData.portfolio.map((v, i) => (
                          <circle
                            key={`p-node-${i}`}
                            cx={65 + (i * 655) / (chartData.labels.length - 1)}
                            cy={235 - v * 2.05}
                            r={hoveredChartIndex === i ? 6 : 4}
                            fill="#2563eb"
                            stroke="#ffffff"
                            strokeWidth={hoveredChartIndex === i ? 2.5 : 1.5}
                            style={{ transition: 'all 0.15s ease' }}
                          />
                        ))}
                        {chartSeriesVisibility.inquiries && chartData.inquiries.map((v, i) => (
                          <circle
                            key={`i-node-${i}`}
                            cx={65 + (i * 655) / (chartData.labels.length - 1)}
                            cy={235 - v * 2.05}
                            r={hoveredChartIndex === i ? 6 : 4}
                            fill="#38bdf8"
                            stroke="#ffffff"
                            strokeWidth={hoveredChartIndex === i ? 2.5 : 1.5}
                            style={{ transition: 'all 0.15s ease' }}
                          />
                        ))}
                      </>
                    )}

                    {/* CATEGORIES VIEW: 4 Series for Projects, Skills, Certificates, Reviews */}
                    {chartViewMode === 'categories' && (
                      <>
                        {/* 1. Projects (Blue) */}
                        {chartSeriesVisibility.projects && (
                          <>
                            <path
                              d={chartData.projects.map((v, i) => `${i === 0 ? 'M' : 'L'} ${65 + (i * 655) / (chartData.labels.length - 1)},${235 - v * 2.05}`).join(' ')}
                              fill="none"
                              stroke="#2563eb"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            {chartData.projects.map((v, i) => (
                              <circle
                                key={`proj-dot-${i}`}
                                cx={65 + (i * 655) / (chartData.labels.length - 1)}
                                cy={235 - v * 2.05}
                                r={hoveredChartIndex === i ? 6 : 4}
                                fill="#2563eb"
                                stroke="#ffffff"
                                strokeWidth="2"
                              />
                            ))}
                          </>
                        )}

                        {/* 2. Skills (Green) */}
                        {chartSeriesVisibility.skills && (
                          <>
                            <path
                              d={chartData.skills.map((v, i) => `${i === 0 ? 'M' : 'L'} ${65 + (i * 655) / (chartData.labels.length - 1)},${235 - v * 2.05}`).join(' ')}
                              fill="none"
                              stroke="#10b981"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            {chartData.skills.map((v, i) => (
                              <circle
                                key={`skill-dot-${i}`}
                                cx={65 + (i * 655) / (chartData.labels.length - 1)}
                                cy={235 - v * 2.05}
                                r={hoveredChartIndex === i ? 6 : 4}
                                fill="#10b981"
                                stroke="#ffffff"
                                strokeWidth="2"
                              />
                            ))}
                          </>
                        )}

                        {/* 3. Certificates (Amber) */}
                        {chartSeriesVisibility.certificates && (
                          <>
                            <path
                              d={chartData.certificates.map((v, i) => `${i === 0 ? 'M' : 'L'} ${65 + (i * 655) / (chartData.labels.length - 1)},${235 - v * 2.05}`).join(' ')}
                              fill="none"
                              stroke="#f59e0b"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            {chartData.certificates.map((v, i) => (
                              <circle
                                key={`cert-dot-${i}`}
                                cx={65 + (i * 655) / (chartData.labels.length - 1)}
                                cy={235 - v * 2.05}
                                r={hoveredChartIndex === i ? 6 : 4}
                                fill="#f59e0b"
                                stroke="#ffffff"
                                strokeWidth="2"
                              />
                            ))}
                          </>
                        )}

                        {/* 4. Client Reviews (Purple) */}
                        {chartSeriesVisibility.reviews && (
                          <>
                            <path
                              d={chartData.reviews.map((v, i) => `${i === 0 ? 'M' : 'L'} ${65 + (i * 655) / (chartData.labels.length - 1)},${235 - v * 2.05}`).join(' ')}
                              fill="none"
                              stroke="#8b5cf6"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                            {chartData.reviews.map((v, i) => (
                              <circle
                                key={`rev-dot-${i}`}
                                cx={65 + (i * 655) / (chartData.labels.length - 1)}
                                cy={235 - v * 2.05}
                                r={hoveredChartIndex === i ? 6 : 4}
                                fill="#8b5cf6"
                                stroke="#ffffff"
                                strokeWidth="2"
                              />
                            ))}
                          </>
                        )}
                      </>
                    )}

                    {/* Interactive hover slice columns */}
                    {chartData.labels.map((_, i) => {
                      const cx = 65 + (i * 655) / (chartData.labels.length - 1);
                      const colW = 655 / (chartData.labels.length - 1);
                      return (
                        <rect
                          key={`hover-rect-${i}`}
                          x={cx - colW / 2}
                          y="20"
                          width={colW}
                          height="240"
                          fill="transparent"
                          style={{ cursor: 'pointer' }}
                          onMouseEnter={() => setHoveredChartIndex(i)}
                        />
                      );
                    })}
                  </svg>
                </div>

                {/* Footer Metric Tiles: Explicitly presenting Projects 9, Skills, Certificates, Reviews */}
                <div className="dash-chart-footer-metrics">
                  <div className="chart-metric-tile">
                    <span className="metric-tile-label">Projects</span>
                    <span className="metric-tile-val highlight-blue">{portfolioSummary.projects}</span>
                    <span className="metric-tile-sub">100% Production Ready</span>
                  </div>

                  <div className="chart-metric-tile">
                    <span className="metric-tile-label">Skills</span>
                    <span className="metric-tile-val highlight-green">{portfolioSummary.skills}</span>
                    <span className="metric-tile-sub">{portfolioSummary.skillCategories} Disciplines</span>
                  </div>

                  <div className="chart-metric-tile">
                    <span className="metric-tile-label">Certificates</span>
                    <span className="metric-tile-val highlight-amber">{portfolioSummary.certificates}</span>
                    <span className="metric-tile-sub">Honors & Leadership</span>
                  </div>

                  <div className="chart-metric-tile">
                    <span className="metric-tile-label">Client Reviews</span>
                    <span className="metric-tile-val highlight-purple">{portfolioSummary.references}</span>
                    <span className="metric-tile-sub">Verified References</span>
                  </div>
                </div>
              </div>

              {/* 5 PRIMARY KPI STAT CARDS (Projects 9, Skills, Certificates, Client Reviews, Inquiries) */}
              <div className="stats-grid-premium">
                  <div className="stat-item highlight-blue">
                    <div className="stat-card-top">
                      <h4>Projects</h4>
                      <span className="stat-badge-chip">9 Builds</span>
                    </div>
                    <div className="stat-big">{portfolioSummary.projects}</div>
                    <span className="stat-sub">Enterprise, SaaS & Cloud systems live</span>
                  </div>

                  <div className="stat-item highlight-green">
                    <div className="stat-card-top">
                      <h4>Skills</h4>
                      <span className="stat-badge-chip">{portfolioSummary.skillCategories} Categories</span>
                    </div>
                    <div className="stat-big">{portfolioSummary.skills}</div>
                    <span className="stat-sub">Core dev, electronics & telecommunications</span>
                  </div>

                  <div className="stat-item highlight-amber">
                    <div className="stat-card-top">
                      <h4>Certificates</h4>
                      <span className="stat-badge-chip">Accredited</span>
                    </div>
                    <div className="stat-big">{portfolioSummary.certificates}</div>
                    <span className="stat-sub">Hackathons, leadership & missionary honors</span>
                  </div>

                  <div className="stat-item highlight-purple">
                    <div className="stat-card-top">
                      <h4>Client Reviews</h4>
                      <span className="stat-badge-chip">Validated</span>
                    </div>
                    <div className="stat-big">{portfolioSummary.references}</div>
                    <span className="stat-sub">Academic & director recommendations</span>
                  </div>

                  <div className="stat-item highlight-unread">
                    <div className="stat-card-top">
                      <h4>Inquiries</h4>
                      <span className="stat-badge-chip">{inquiryDistribution.confirmed.count} Confirmed</span>
                    </div>
                    <div className="stat-big">{analyticsFilteredMessages.length}</div>
                    <span className="stat-sub">{inquiryDistribution.unread.count} need immediate response</span>
                  </div>
              </div>

              {/* GRAPHIC REPRESENTATION 2: Portfolio Content Distribution & Asset Matrix */}
              <div className="dash-pipeline-card">
                <div className="pipeline-header">
                  <div>
                    <h4>Portfolio Asset Distribution</h4>
                    <span className="pipeline-sub">Graphic weight comparison across Projects ({portfolioSummary.projects}), Skills ({portfolioSummary.skills}), Certificates ({portfolioSummary.certificates}), and Reviews ({portfolioSummary.references})</span>
                  </div>
                  <span className="pipeline-badge">{portfolioSummary.totalAssets} Total Assets Cataloged</span>
                </div>
                
                {/* Visual Multi-Color Asset Distribution Bar */}
                <div className="pipeline-progress-bar">
                  <div 
                    className="progress-slice" 
                    style={{ width: `${portfolioSummary.projectsPct}%`, background: '#2563eb' }} 
                    title={`Projects: ${portfolioSummary.projectsPct}% (${portfolioSummary.projects} builds)`}
                  />
                  <div 
                    className="progress-slice" 
                    style={{ width: `${portfolioSummary.skillsPct}%`, background: '#10b981' }} 
                    title={`Skills: ${portfolioSummary.skillsPct}% (${portfolioSummary.skills} skills)`}
                  />
                  <div 
                    className="progress-slice" 
                    style={{ width: `${portfolioSummary.certificatesPct}%`, background: '#f59e0b' }} 
                    title={`Certificates: ${portfolioSummary.certificatesPct}% (${portfolioSummary.certificates} credentials)`}
                  />
                  <div 
                    className="progress-slice" 
                    style={{ width: `${portfolioSummary.referencesPct}%`, background: '#8b5cf6' }} 
                    title={`Client Reviews: ${portfolioSummary.referencesPct}% (${portfolioSummary.references} references)`}
                  />
                </div>

                <div className="pipeline-legend">
                  <div className="pipe-legend-item">
                    <span className="pipe-dot" style={{ background: '#2563eb' }}></span>
                    <span className="pipe-name">Projects</span>
                    <span className="pipe-val">{portfolioSummary.projects} ({portfolioSummary.projectsPct}%)</span>
                  </div>
                  <div className="pipe-legend-item">
                    <span className="pipe-dot" style={{ background: '#10b981' }}></span>
                    <span className="pipe-name">Skills</span>
                    <span className="pipe-val">{portfolioSummary.skills} ({portfolioSummary.skillsPct}%)</span>
                  </div>
                  <div className="pipe-legend-item">
                    <span className="pipe-dot" style={{ background: '#f59e0b' }}></span>
                    <span className="pipe-name">Certificates</span>
                    <span className="pipe-val">{portfolioSummary.certificates} ({portfolioSummary.certificatesPct}%)</span>
                  </div>
                  <div className="pipe-legend-item">
                    <span className="pipe-dot" style={{ background: '#8b5cf6' }}></span>
                    <span className="pipe-name">Client Reviews</span>
                    <span className="pipe-val">{portfolioSummary.references} ({portfolioSummary.referencesPct}%)</span>
                  </div>
                </div>
              </div>

              {/* Inquiry Pipeline Status Distribution Bar */}
              <div className="dash-pipeline-card" style={{ marginTop: '1.2rem' }}>
                <div className="pipeline-header">
                  <div>
                    <h4>Inquiry Pipeline Conversion</h4>
                    <span className="pipeline-sub">Real-time status conversion across filtered visitor messages</span>
                  </div>
                  <span className="pipeline-badge">{analyticsFilteredMessages.length} Messages Analyzed</span>
                </div>
                
                <div className="pipeline-progress-bar">
                  {inquiryDistribution.unread.pct > 0 && (
                    <div 
                      className="progress-slice unread" 
                      style={{ width: `${inquiryDistribution.unread.pct}%` }} 
                      title={`Unread: ${inquiryDistribution.unread.pct}% (${inquiryDistribution.unread.count})`}
                    />
                  )}
                  {inquiryDistribution.confirmed.pct > 0 && (
                    <div 
                      className="progress-slice confirmed" 
                      style={{ width: `${inquiryDistribution.confirmed.pct}%` }} 
                      title={`Confirmed: ${inquiryDistribution.confirmed.pct}% (${inquiryDistribution.confirmed.count})`}
                    />
                  )}
                  {inquiryDistribution.pending.pct > 0 && (
                    <div 
                      className="progress-slice pending" 
                      style={{ width: `${inquiryDistribution.pending.pct}%` }} 
                      title={`Pending: ${inquiryDistribution.pending.pct}% (${inquiryDistribution.pending.count})`}
                    />
                  )}
                  {inquiryDistribution.canceled.pct > 0 && (
                    <div 
                      className="progress-slice canceled" 
                      style={{ width: `${inquiryDistribution.canceled.pct}%` }} 
                      title={`Canceled: ${inquiryDistribution.canceled.pct}% (${inquiryDistribution.canceled.count})`}
                    />
                  )}
                </div>

                <div className="pipeline-legend">
                  <div className="pipe-legend-item">
                    <span className="pipe-dot unread"></span>
                    <span className="pipe-name">Unread ({inquiryDistribution.unread.count})</span>
                    <span className="pipe-val">{inquiryDistribution.unread.pct}%</span>
                  </div>
                  <div className="pipe-legend-item">
                    <span className="pipe-dot confirmed"></span>
                    <span className="pipe-name">Confirmed ({inquiryDistribution.confirmed.count})</span>
                    <span className="pipe-val">{inquiryDistribution.confirmed.pct}%</span>
                  </div>
                  <div className="pipe-legend-item">
                    <span className="pipe-dot pending"></span>
                    <span className="pipe-name">Pending ({inquiryDistribution.pending.count})</span>
                    <span className="pipe-val">{inquiryDistribution.pending.pct}%</span>
                  </div>
                  <div className="pipe-legend-item">
                    <span className="pipe-dot canceled"></span>
                    <span className="pipe-name">Canceled ({inquiryDistribution.canceled.count})</span>
                    <span className="pipe-val">{inquiryDistribution.canceled.pct}%</span>
                  </div>
                </div>
              </div>
           </div>
        )}

        {activeTab === 'skills' && (
          <div className="tab-content">
            <div className="content-header">
              <div>
                <h2>Skills & Tech Stack</h2>
                <p>Manage, filter, sort, and review technical capabilities and engineering tools</p>
              </div>
              <div className="header-btn-row">
                <button
                  type="button"
                  className="dash-action-btn secondary"
                  onClick={() => navigate('/skills')}
                  title="View live public skills page"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  <span>View Public Site</span>
                </button>
                <button className="add-btn" onClick={openAddSkillModal}>
                  + Add Skill
                </button>
              </div>
            </div>

            {/* Filter and Sort Toolbar for Skills */}
            <div className="dash-filter-bar">
              <div className="dash-filter-search-box">
                <span className="dash-search-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="dash-filter-search-input"
                  placeholder="Search skills, tools, categories..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    className="dash-search-clear-btn" 
                    onClick={() => setSearchQuery('')}
                    title="Clear search"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="dash-filter-group">
                <span className="dash-filter-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                  Category:
                </span>
                <select
                  className="dash-select"
                  value={skillCategoryFilter}
                  onChange={(e) => setSkillCategoryFilter(e.target.value)}
                >
                  <option value="all">All Categories ({skillsList.length})</option>
                  <option value="Core Development">Core Development</option>
                  <option value="Productivity & Workflow">Productivity & Workflow</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Hardware Engineering">Hardware Engineering</option>
                  <option value="Electronics">Electronics</option>
                  <option value="Telecommunications">Telecommunications</option>
                </select>
              </div>

              <div className="dash-sort-group">
                <div className="dash-select-wrap">
                  <span className="dash-filter-label">Sort:</span>
                  <select
                    className="dash-select"
                    value={skillSortOrder}
                    onChange={(e) => setSkillSortOrder(e.target.value)}
                  >
                    <option value="default">Default Order</option>
                    <option value="cat-asc">Category (A-Z)</option>
                    <option value="title-asc">Title (A-Z)</option>
                    <option value="count-desc">Most Skills Count</option>
                  </select>
                </div>

                {(skillCategoryFilter !== 'all' || skillSortOrder !== 'default' || (searchQuery && activeTab === 'skills')) && (
                  <button
                    type="button"
                    className="dash-reset-btn"
                    onClick={() => {
                      setSkillCategoryFilter('all');
                      setSkillSortOrder('default');
                      setSearchQuery('');
                    }}
                    title="Reset skill filters"
                  >
                    ✕ Reset
                  </button>
                )}

                <span className="dash-results-badge">
                  {filteredSkills.length} Categories ({filteredSkills.reduce((a, b) => a + (b.items?.length || 0), 0)} Skills)
                </span>
              </div>
            </div>

            <div className="skills-admin-grid">
              {filteredSkills.length === 0 ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3.5rem 1rem', color: '#94a3b8' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>🔍</div>
                  <h3 style={{ fontSize: '1.2rem', color: '#f1f5f9', marginBottom: '0.4rem' }}>No Skills Found</h3>
                  <p style={{ fontSize: '0.9rem' }}>No technical competencies matched your selected category or search keyword.</p>
                  <button
                    type="button"
                    className="dash-reset-btn"
                    style={{ marginTop: '1rem' }}
                    onClick={() => {
                      setSkillCategoryFilter('all');
                      setSkillSortOrder('default');
                      setSearchQuery('');
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                paginatedSkills.map((grp, idx) => (
                  <div key={idx} className="skill-admin-card">
                    <div className="skill-admin-header">
                      <span className="skill-admin-icon">{grp.icon}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span className="skill-cat-badge">{grp.category}</span>
                        <h3>{grp.title}</h3>
                      </div>
                      <div className="card-quick-actions">
                        <button type="button" className="card-action-icon" onClick={() => openEditSkillModal(grp, idx)} title="Edit Skill Group">✏️</button>
                        <button type="button" className="card-action-icon delete" onClick={() => handleDeleteSkill(idx)} title="Delete Skill Group">🗑️</button>
                      </div>
                    </div>
                    <div className="skill-tags-wrap">
                      {grp.items.map((it, i) => (
                        <span key={i} className="skill-pill-tag">{it}</span>
                      ))}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Skills Pagination */}
            <Pagination
              currentPage={skillPage}
              totalPages={skillTotalPages}
              totalItems={filteredSkills.length}
              itemsPerPage={SKILLS_PER_PAGE}
              onPageChange={(page) => setSkillPage(page)}
              label="skill categories"
            />
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="tab-content">
            <div className="content-header">
              <div>
                <h2>Certificates & Honors</h2>
                <p>Accredited recognitions, hackathon honors, and leadership certificates</p>
              </div>
              <div className="header-btn-row">
                <button
                  type="button"
                  className="dash-action-btn secondary"
                  onClick={() => navigate('/certificates')}
                  title="View live public certificates page"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  <span>View Public Site</span>
                </button>
                <button className="add-btn" onClick={openAddCertModal}>
                  + Add Certificate
                </button>
              </div>
            </div>

            {/* Filter and Sort Toolbar for Certificates */}
            <div className="dash-filter-bar">
              <div className="dash-filter-search-box">
                <span className="dash-search-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="dash-filter-search-input"
                  placeholder="Search certificates, issuers, honors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    className="dash-search-clear-btn" 
                    onClick={() => setSearchQuery('')}
                    title="Clear search"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="dash-filter-group">
                <span className="dash-filter-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                  Type:
                </span>
                {['all', 'Recognition', 'Leadership', 'Volunteer', 'Service', 'Professional', 'Academic'].map(type => (
                  <button
                    key={type}
                    type="button"
                    className={`dash-filter-pill ${certTypeFilter === type ? 'active' : ''}`}
                    onClick={() => setCertTypeFilter(type)}
                  >
                    {type === 'all' ? 'All Types' : type}
                  </button>
                ))}
              </div>

              <div className="dash-sort-group">
                <div className="dash-select-wrap">
                  <span className="dash-filter-label">Sort:</span>
                  <select
                    className="dash-select"
                    value={certSortOrder}
                    onChange={(e) => setCertSortOrder(e.target.value)}
                  >
                    <option value="default">Default Order</option>
                    <option value="title-asc">Title (A-Z)</option>
                    <option value="title-desc">Title (Z-A)</option>
                    <option value="issuer-asc">Issuer (A-Z)</option>
                  </select>
                </div>

                {(certTypeFilter !== 'all' || certSortOrder !== 'default' || (searchQuery && activeTab === 'certificates')) && (
                  <button
                    type="button"
                    className="dash-reset-btn"
                    onClick={() => {
                      setCertTypeFilter('all');
                      setCertSortOrder('default');
                      setSearchQuery('');
                    }}
                    title="Reset certificate filters"
                  >
                    ✕ Reset
                  </button>
                )}

                <span className="dash-results-badge">
                  {filteredCertificates.length} of {certsList.length} Credentials
                </span>
              </div>
            </div>

            <div className="certs-admin-grid">
              {filteredCertificates.length === 0 ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3.5rem 1rem', color: '#94a3b8' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>🎖️</div>
                  <h3 style={{ fontSize: '1.2rem', color: '#f1f5f9', marginBottom: '0.4rem' }}>No Certificates Found</h3>
                  <p style={{ fontSize: '0.9rem' }}>No credentials matched your selected category or search keyword.</p>
                  <button
                    type="button"
                    className="dash-reset-btn"
                    style={{ marginTop: '1rem' }}
                    onClick={() => {
                      setCertTypeFilter('all');
                      setCertSortOrder('default');
                      setSearchQuery('');
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                paginatedCerts.map((cert, idx) => (
                  <div key={idx} className="cert-admin-card">
                    {(cert.imageUrl || cert.image) && (
                      <div className="cert-admin-thumb-wrap">
                        <img 
                          src={cert.imageUrl || cert.image} 
                          alt={cert.title} 
                          className="cert-admin-thumb" 
                          onError={(e) => { e.target.style.display = 'none'; }}
                        />
                      </div>
                    )}
                    <div className="cert-card-top">
                      <span className="cert-admin-icon">{cert.icon}</span>
                      <span className="cert-admin-type">{cert.type}</span>
                      <div className="card-quick-actions" style={{ marginLeft: 'auto' }}>
                        <button type="button" className="card-action-icon" onClick={() => openEditCertModal(cert, idx)} title="Edit Certificate">✏️</button>
                        <button type="button" className="card-action-icon delete" onClick={() => handleDeleteCert(idx)} title="Delete Certificate">🗑️</button>
                      </div>
                    </div>
                    <h3>{cert.title}</h3>
                    <p className="cert-admin-issuer">Issued by: <strong>{cert.issuer}</strong></p>
                    <p className="cert-admin-desc">{cert.desc || cert.description}</p>
                    {cert.link && cert.link !== '#' && (
                      <a href={cert.link} target="_blank" rel="noopener noreferrer" className="cert-admin-link">
                        📄 View Verification Document →
                      </a>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Certificates Pagination */}
            <Pagination
              currentPage={certPage}
              totalPages={certTotalPages}
              totalItems={filteredCertificates.length}
              itemsPerPage={CERTS_PER_PAGE}
              onPageChange={(page) => setCertPage(page)}
              label="certificates"
            />
          </div>
        )}

        {activeTab === 'testimonials' && (
          <div className="tab-content">
            <div className="content-header">
              <div>
                <h2>Client Reviews & References</h2>
                <p>Academic heads and professional directors attesting to your capabilities</p>
              </div>
              <div className="header-btn-row">
                <button
                  type="button"
                  className="dash-action-btn secondary"
                  onClick={() => navigate('/references')}
                  title="View live public references page"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  <span>View Public Site</span>
                </button>
                <button className="add-btn" onClick={openAddReviewModal}>
                  + Add Client Review
                </button>
              </div>
            </div>

            {/* Filter and Sort Toolbar for References */}
            <div className="dash-filter-bar">
              <div className="dash-filter-search-box">
                <span className="dash-search-icon">
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </span>
                <input
                  type="text"
                  className="dash-filter-search-input"
                  placeholder="Search reviews, names, organizations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button 
                    type="button" 
                    className="dash-search-clear-btn" 
                    onClick={() => setSearchQuery('')}
                    title="Clear search"
                    aria-label="Clear search"
                  >
                    ×
                  </button>
                )}
              </div>

              <div className="dash-filter-group">
                <span className="dash-filter-label">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
                  Reference:
                </span>
                {['all', 'Academic Reference', 'Professional Reference', 'Client Testimonial'].map(tag => (
                  <button
                    key={tag}
                    type="button"
                    className={`dash-filter-pill ${refTagFilter === tag ? 'active' : ''}`}
                    onClick={() => setRefTagFilter(tag)}
                  >
                    {tag === 'all' ? 'All References' : tag}
                  </button>
                ))}
              </div>

              <div className="dash-sort-group">
                <div className="dash-select-wrap">
                  <span className="dash-filter-label">Sort:</span>
                  <select
                    className="dash-select"
                    value={refSortOrder}
                    onChange={(e) => setRefSortOrder(e.target.value)}
                  >
                    <option value="default">Default Order</option>
                    <option value="name-asc">Name (A-Z)</option>
                    <option value="org-asc">Organization (A-Z)</option>
                  </select>
                </div>

                {(refTagFilter !== 'all' || refSortOrder !== 'default' || (searchQuery && activeTab === 'testimonials')) && (
                  <button
                    type="button"
                    className="dash-reset-btn"
                    onClick={() => {
                      setRefTagFilter('all');
                      setRefSortOrder('default');
                      setSearchQuery('');
                    }}
                    title="Reset reference filters"
                  >
                    ✕ Reset
                  </button>
                )}

                <span className="dash-results-badge">
                  {filteredReferences.length} of {reviewsList.length} References
                </span>
              </div>
            </div>

            <div className="refs-admin-grid">
              {filteredReferences.length === 0 ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3.5rem 1rem', color: '#94a3b8' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.8rem' }}>👥</div>
                  <h3 style={{ fontSize: '1.2rem', color: '#f1f5f9', marginBottom: '0.4rem' }}>No References Found</h3>
                  <p style={{ fontSize: '0.9rem' }}>No reference records matched your selected filter or search query.</p>
                  <button
                    type="button"
                    className="dash-reset-btn"
                    style={{ marginTop: '1rem' }}
                    onClick={() => {
                      setRefTagFilter('all');
                      setRefSortOrder('default');
                      setSearchQuery('');
                    }}
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                paginatedReferences.map((ref, idx) => (
                  <div key={idx} className="ref-admin-card">
                    <div className="ref-card-header">
                      <span className="ref-admin-avatar">{ref.icon}</span>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <span className="ref-admin-tag">{ref.tag}</span>
                        <h3>{ref.name}</h3>
                        <p className="ref-admin-role">{ref.position} • {ref.organization}</p>
                      </div>
                      <div className="card-quick-actions" style={{ marginLeft: 'auto' }}>
                        <button type="button" className="card-action-icon" onClick={() => openEditReviewModal(ref, idx)} title="Edit Reference">✏️</button>
                        <button type="button" className="card-action-icon delete" onClick={() => handleDeleteReview(idx)} title="Delete Reference">🗑️</button>
                      </div>
                    </div>
                    <p className="ref-admin-note">"{ref.note}"</p>
                    <div className="ref-admin-contact">
                      <a href={`mailto:${ref.email}`} className="contact-chip">✉️ {ref.email}</a>
                      <a href={`tel:${ref.phone.replace(/\s/g, '')}`} className="contact-chip">📞 {ref.phone}</a>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* References Pagination */}
            <Pagination
              currentPage={refPage}
              totalPages={refTotalPages}
              totalItems={filteredReferences.length}
              itemsPerPage={REVIEWS_PER_PAGE}
              onPageChange={(page) => setRefPage(page)}
              label="references"
            />
          </div>
        )}

        {activeTab === 'profile' && (
          <div className="tab-content profile-tab-content">
            <div className="content-header">
              <div>
                <h2>Profile & Identity Hub</h2>
                <p>Manage your author identity, executive biography, contact coordinates, and public presence</p>
              </div>
              <div className="header-btn-row">
                <button
                  type="button"
                  className="dash-action-btn secondary"
                  onClick={() => navigate('/')}
                  title="View live portfolio website"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  <span>View Public Site</span>
                </button>
              </div>
            </div>

            {/* HERO PROFILE BANNER */}
            <div className="profile-hero-card">
              <div className="profile-hero-top">
                <div className="profile-avatar-wrap">
                  <img
                    src={desuAvatar}
                    alt={profileData.fullName}
                    className="profile-hero-avatar"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      if (e.target.nextSibling) e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="profile-hero-avatar-fallback" style={{ display: 'none' }}>DA</div>
                  <span className="profile-online-badge" title="Active Admin"></span>
                </div>

                <div className="profile-hero-meta">
                  <div className="profile-hero-title-row">
                    <h3 className="profile-hero-name">{profileData.fullName}</h3>
                    <span className="profile-verified-badge">
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                      </svg>
                      Verified Author & Admin
                    </span>
                  </div>

                  <p className="profile-hero-headline">{profileData.headline}</p>

                  <div className="profile-hero-chips">
                    <span className="hero-chip">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                      {profileData.location}
                    </span>
                    <span className="hero-chip">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 10v6M2 10l10-5 10 5-10 5z"></path><path d="M6 12v5c3 3 9 3 12 0v-5"></path></svg>
                      Hawassa University Graduate
                    </span>
                    <span className="hero-chip">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 14 14"></polyline></svg>
                      Available for Senior Engineering Roles
                    </span>
                  </div>
                </div>
              </div>

              {/* INTEGRATED PORTFOLIO METRICS STRIP (Projects 9, Skills 24, Certs 5, Reviews 2) */}
              <div className="profile-metrics-strip">
                <div className="profile-metric-item">
                  <span className="metric-num highlight-blue">{portfolioSummary.projects}</span>
                  <span className="metric-lbl">Live Projects</span>
                </div>
                <div className="profile-metric-divider"></div>
                <div className="profile-metric-item">
                  <span className="metric-num highlight-green">{portfolioSummary.skills}</span>
                  <span className="metric-lbl">Tech Skills</span>
                </div>
                <div className="profile-metric-divider"></div>
                <div className="profile-metric-item">
                  <span className="metric-num highlight-amber">{portfolioSummary.certificates}</span>
                  <span className="metric-lbl">Certificates</span>
                </div>
                <div className="profile-metric-divider"></div>
                <div className="profile-metric-item">
                  <span className="metric-num highlight-purple">{portfolioSummary.references}</span>
                  <span className="metric-lbl">Client Reviews</span>
                </div>
                <div className="profile-metric-divider"></div>
                <div className="profile-metric-item">
                  <span className="metric-num">{safeMessages.length}</span>
                  <span className="metric-lbl">Inquiries Received</span>
                </div>
              </div>
            </div>

            {/* SPLIT 2-COLUMN VIEW: LIVE PREVIEW & PROFILE EDITOR */}
            <div className="profile-grid-layout">
              {/* LEFT COLUMN: PUBLIC VISITOR PREVIEW */}
              <div className="profile-preview-card">
                <div className="card-badge-row">
                  <span className="panel-badge-tag">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                    Live Visitor Perspective
                  </span>
                  <span className="panel-status-pill">Interactive Card</span>
                </div>

                <div className="preview-bio-block">
                  <h4 className="preview-section-title">Biography & Executive Summary</h4>
                  <p className="preview-bio-quote">"{profileData.bio}"</p>
                </div>

                <div className="preview-section-block">
                  <h4 className="preview-section-title">Direct Contact Coordinates</h4>
                  <div className="preview-contact-list">
                    <a href={`mailto:${profileData.email}`} className="preview-contact-item" title="Send email">
                      <span className="contact-icon">✉️</span>
                      <div className="contact-text-wrap">
                        <span className="contact-kind">Email Address</span>
                        <span className="contact-val">{profileData.email}</span>
                      </div>
                      <span className="contact-arrow">→</span>
                    </a>

                    <a href={`tel:${profileData.phone.replace(/\s/g, '')}`} className="preview-contact-item" title="Call directly">
                      <span className="contact-icon">📞</span>
                      <div className="contact-text-wrap">
                        <span className="contact-kind">Telephone / Mobile</span>
                        <span className="contact-val">{profileData.phone}</span>
                      </div>
                      <span className="contact-arrow">→</span>
                    </a>

                    {profileData.telegram && (
                      <a href={profileData.telegram} target="_blank" rel="noopener noreferrer" className="preview-contact-item" title="Open Telegram">
                        <span className="contact-icon">✈️</span>
                        <div className="contact-text-wrap">
                          <span className="contact-kind">Telegram Direct</span>
                          <span className="contact-val">{profileData.telegram.replace('https://t.me/', '@')}</span>
                        </div>
                        <span className="contact-arrow">↗</span>
                      </a>
                    )}

                    {profileData.github && (
                      <a href={profileData.github} target="_blank" rel="noopener noreferrer" className="preview-contact-item" title="Open GitHub">
                        <span className="contact-icon">🐙</span>
                        <div className="contact-text-wrap">
                          <span className="contact-kind">GitHub Repository</span>
                          <span className="contact-val">{profileData.github.replace('https://github.com/', '')}</span>
                        </div>
                        <span className="contact-arrow">↗</span>
                      </a>
                    )}
                  </div>
                </div>

                <div className="preview-section-block">
                  <h4 className="preview-section-title">Primary Technical Competencies</h4>
                  <div className="preview-tags-flex">
                    <span className="skill-pill-tag">React / Next.js</span>
                    <span className="skill-pill-tag">Node.js / Express</span>
                    <span className="skill-pill-tag">PostgreSQL / MongoDB</span>
                    <span className="skill-pill-tag">Embedded Microcontrollers</span>
                    <span className="skill-pill-tag">Circuit Simulation</span>
                    <span className="skill-pill-tag">IoT & Networking</span>
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: INTERACTIVE PROFILE EDITOR */}
              <div className="profile-editor-card">
                <div className="card-badge-row">
                  <span className="panel-badge-tag editor-tag">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                    Author & Social Settings
                  </span>
                  <span className="panel-status-pill editor-pill">Instant Sync</span>
                </div>

                <form onSubmit={handleProfileSave} className="profile-form">
                  <div className="form-section-title">Personal & Professional Title</div>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Full Name</label>
                      <input
                        type="text"
                        value={profileData.fullName}
                        onChange={(e) => setProfileData({ ...profileData, fullName: e.target.value })}
                        placeholder="e.g. Desalew Alganeh"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Location / City</label>
                      <input
                        type="text"
                        value={profileData.location}
                        onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                        placeholder="e.g. Addis Ababa, Ethiopia"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Professional Headline</label>
                    <input
                      type="text"
                      value={profileData.headline}
                      onChange={(e) => setProfileData({ ...profileData, headline: e.target.value })}
                      placeholder="e.g. Electrical & Computer Engineer • Full Stack Developer"
                      required
                    />
                  </div>

                  <div className="form-section-title">Contact & Communication Handles</div>
                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Primary Email</label>
                      <input
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                        placeholder="e.g. desu6262@gmail.com"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Phone Number</label>
                      <input
                        type="text"
                        value={profileData.phone}
                        onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                        placeholder="e.g. +251 962 622 111"
                        required
                      />
                    </div>
                  </div>

                  <div className="form-grid-2">
                    <div className="form-group">
                      <label>Telegram Handle / URL</label>
                      <input
                        type="text"
                        value={profileData.telegram}
                        onChange={(e) => setProfileData({ ...profileData, telegram: e.target.value })}
                        placeholder="https://t.me/desu6262"
                      />
                    </div>

                    <div className="form-group">
                      <label>GitHub Profile URL</label>
                      <input
                        type="url"
                        value={profileData.github}
                        onChange={(e) => setProfileData({ ...profileData, github: e.target.value })}
                        placeholder="https://github.com/flybet-code"
                      />
                    </div>
                  </div>

                  <div className="form-section-title">Biography & Professional Statement</div>
                  <div className="form-group">
                    <label>About Me / Executive Bio</label>
                    <textarea
                      rows="4"
                      value={profileData.bio}
                      onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                      placeholder="Share your technical background, engineering passions, and career accomplishments..."
                    />
                  </div>

                  {profileSaved && (
                    <div className="profile-save-banner">
                      <span className="banner-icon">✓</span>
                      <span>Profile metadata saved successfully! Stored locally and synchronized.</span>
                    </div>
                  )}

                  <div className="profile-form-actions">
                    <button
                      type="button"
                      className="dash-reset-btn"
                      onClick={handleProfileReset}
                      title="Reset fields to original defaults"
                    >
                      ↺ Reset Defaults
                    </button>
                    <button type="submit" className="save-btn">
                      💾 Save Profile Changes
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* ADMIN SECURITY / SETTINGS TAB */}
        {activeTab === 'settings' && (
          <div className="tab-content">
            <div className="content-header">
              <div>
                <h2>Admin Security & Credentials</h2>
                <p>Manage administrator login password, access controls, and session protection</p>
              </div>
              <div className="header-btn-row">
                <button
                  type="button"
                  className="dash-action-btn secondary"
                  onClick={() => navigate('/')}
                  title="View live public portfolio website"
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                  </svg>
                  <span>View Public Site</span>
                </button>
              </div>
            </div>

            <div className="settings-container">
              <div className="settings-card">
                <div className="card-badge-row" style={{ marginBottom: '1.2rem' }}>
                  <span className="panel-badge-tag">
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                    Master Access Control
                  </span>
                  <span className="panel-status-pill">Active Session</span>
                </div>
                <h3>Change Administrator Password</h3>
                <form onSubmit={handlePasswordChange}>
                  <div className="form-group">
                    <label>Current Password</label>
                    <input
                      type="password"
                      value={passwords.old}
                      onChange={(e) => setPasswords({ ...passwords, old: e.target.value })}
                      placeholder="Enter current password"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>New Password</label>
                    <input
                      type="password"
                      value={passwords.new}
                      onChange={(e) => setPasswords({ ...passwords, new: e.target.value })}
                      placeholder="Enter new secure password (min 6 chars)"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Confirm New Password</label>
                    <input
                      type="password"
                      value={passwords.confirm}
                      onChange={(e) => setPasswords({ ...passwords, confirm: e.target.value })}
                      placeholder="Re-enter new password"
                      required
                    />
                  </div>
                  {passError && <p className="error-msg">⚠️ {passError}</p>}
                  {passSuccess && <p className="success-msg">✓ {passSuccess}</p>}
                  <button type="submit" className="save-btn">
                    🔒 Update Password
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* ========================================================
          1. PROJECT MODAL (WITH UP TO 3 IMAGES: 1 REQUIRED, 2 OPTIONAL)
          ======================================================== */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title-bar">
              <div className="modal-title-icon">🚀</div>
              <div>
                <h3>{editingProject ? 'Edit Project' : 'Create New Project'}</h3>
                <p className="modal-title-sub">Fill in the project details and visual screenshots</p>
              </div>
              <button type="button" className="modal-close-icon" onClick={() => setShowModal(false)}>×</button>
            </div>

            <form onSubmit={handleProjectSubmit} className="modal-project-form">
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Project Title *</label>
                  <input 
                    type="text" 
                    value={formData.title} 
                    onChange={(e) => setFormData({...formData, title: e.target.value})} 
                    placeholder="e.g. Fellowship Management System (Saas)" 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label>Category *</label>
                  <select 
                    className="dash-select" 
                    value={formData.category} 
                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                  >
                    {PROJECT_CATEGORIES.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Description *</label>
                <textarea 
                  rows="3" 
                  value={formData.description} 
                  onChange={(e) => setFormData({...formData, description: e.target.value})} 
                  placeholder="Provide a concise description of the project architecture, features, and impact..."
                  required 
                />
              </div>

              <div className="form-group">
                <label>Technologies (Comma separated) *</label>
                <input 
                  type="text" 
                  value={formData.technologies} 
                  onChange={(e) => setFormData({...formData, technologies: e.target.value})} 
                  placeholder="e.g. React, Node.js, MongoDB, Tailwind CSS" 
                  required 
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Live Demo URL (Optional)</label>
                  <input 
                    type="url" 
                    value={formData.liveUrl} 
                    onChange={(e) => setFormData({...formData, liveUrl: e.target.value})} 
                    placeholder="https://example.com" 
                  />
                </div>
                <div className="form-group">
                  <label>GitHub Repository URL (Optional)</label>
                  <input 
                    type="url" 
                    value={formData.githubUrl} 
                    onChange={(e) => setFormData({...formData, githubUrl: e.target.value})} 
                    placeholder="https://github.com/..." 
                  />
                </div>
              </div>

              {/* PROJECT VISUALS & SCREENSHOTS SECTION (UP TO 3 IMAGES) */}
              <div className="project-images-section">
                <div className="images-section-header">
                  <div>
                    <h4 className="images-section-title">Project Visuals & Screenshots (Up to 3 Images)</h4>
                    <p className="images-section-hint">
                      Image 1 is the <strong>Primary Cover (Required *)</strong>. Images 2 & 3 are <strong>Optional</strong> screenshots.
                    </p>
                  </div>
                </div>

                <div className="image-slots-grid">
                  {/* SLOT 0: COVER IMAGE (REQUIRED) */}
                  <div className={`image-slot-card ${formData.images[0] ? 'has-image' : 'empty'} slot-required`}>
                    <div className="slot-header-row">
                      <span className="slot-title">
                        <span className="slot-idx">1</span>
                        Cover Photo
                      </span>
                      <span className="slot-tag required">Required *</span>
                    </div>

                    {formData.images[0] ? (
                      <div className="slot-preview-box">
                        <img src={formData.images[0]} alt="Cover preview" className="slot-preview-img" />
                        <div className="slot-preview-overlay">
                          <label className="slot-btn change">
                            🔄 Change
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => handleProjectImageUpload(0, e.target.files[0])} 
                              style={{ display: 'none' }} 
                            />
                          </label>
                          <button 
                            type="button" 
                            className="slot-btn remove" 
                            onClick={() => handleProjectImageRemove(0)}
                          >
                            ✕ Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="slot-upload-container">
                        <label className="slot-dropzone">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" y1="3" x2="12" y2="15"/>
                          </svg>
                          <span className="dropzone-label">Browse Cover Image</span>
                          <span className="dropzone-tip">Click to upload photo</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleProjectImageUpload(0, e.target.files[0])} 
                            style={{ display: 'none' }} 
                          />
                        </label>
                        <div className="slot-divider-text">or URL</div>
                        <input
                          type="url"
                          className="slot-text-input"
                          placeholder="https://... image link"
                          value={formData.images[0] || ''}
                          onChange={(e) => handleProjectImageUrlInput(0, e.target.value)}
                        />
                      </div>
                    )}
                  </div>

                  {/* SLOT 1: SCREENSHOT 2 (OPTIONAL) */}
                  <div className={`image-slot-card ${formData.images[1] ? 'has-image' : 'empty'}`}>
                    <div className="slot-header-row">
                      <span className="slot-title">
                        <span className="slot-idx">2</span>
                        Screenshot 2
                      </span>
                      <span className="slot-tag optional">Optional</span>
                    </div>

                    {formData.images[1] ? (
                      <div className="slot-preview-box">
                        <img src={formData.images[1]} alt="Screenshot 2 preview" className="slot-preview-img" />
                        <div className="slot-preview-overlay">
                          <label className="slot-btn change">
                            🔄 Change
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => handleProjectImageUpload(1, e.target.files[0])} 
                              style={{ display: 'none' }} 
                            />
                          </label>
                          <button 
                            type="button" 
                            className="slot-btn remove" 
                            onClick={() => handleProjectImageRemove(1)}
                          >
                            ✕ Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="slot-upload-container">
                        <label className="slot-dropzone">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" y1="3" x2="12" y2="15"/>
                          </svg>
                          <span className="dropzone-label">Browse Screenshot 2</span>
                          <span className="dropzone-tip">Click to upload photo</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleProjectImageUpload(1, e.target.files[0])} 
                            style={{ display: 'none' }} 
                          />
                        </label>
                        <div className="slot-divider-text">or URL</div>
                        <input
                          type="url"
                          className="slot-text-input"
                          placeholder="https://... screenshot link"
                          value={formData.images[1] || ''}
                          onChange={(e) => handleProjectImageUrlInput(1, e.target.value)}
                        />
                      </div>
                    )}
                  </div>

                  {/* SLOT 2: SCREENSHOT 3 (OPTIONAL) */}
                  <div className={`image-slot-card ${formData.images[2] ? 'has-image' : 'empty'}`}>
                    <div className="slot-header-row">
                      <span className="slot-title">
                        <span className="slot-idx">3</span>
                        Screenshot 3
                      </span>
                      <span className="slot-tag optional">Optional</span>
                    </div>

                    {formData.images[2] ? (
                      <div className="slot-preview-box">
                        <img src={formData.images[2]} alt="Screenshot 3 preview" className="slot-preview-img" />
                        <div className="slot-preview-overlay">
                          <label className="slot-btn change">
                            🔄 Change
                            <input 
                              type="file" 
                              accept="image/*" 
                              onChange={(e) => handleProjectImageUpload(2, e.target.files[0])} 
                              style={{ display: 'none' }} 
                            />
                          </label>
                          <button 
                            type="button" 
                            className="slot-btn remove" 
                            onClick={() => handleProjectImageRemove(2)}
                          >
                            ✕ Remove
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="slot-upload-container">
                        <label className="slot-dropzone">
                          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                            <polyline points="17 8 12 3 7 8"/>
                            <line x1="12" y1="3" x2="12" y2="15"/>
                          </svg>
                          <span className="dropzone-label">Browse Screenshot 3</span>
                          <span className="dropzone-tip">Click to upload photo</span>
                          <input 
                            type="file" 
                            accept="image/*" 
                            onChange={(e) => handleProjectImageUpload(2, e.target.files[0])} 
                            style={{ display: 'none' }} 
                          />
                        </label>
                        <div className="slot-divider-text">or URL</div>
                        <input
                          type="url"
                          className="slot-text-input"
                          placeholder="https://... screenshot link"
                          value={formData.images[2] || ''}
                          onChange={(e) => handleProjectImageUrlInput(2, e.target.value)}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="modal-buttons">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="save-btn">
                  {editingProject ? 'Save Changes' : 'Create Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          2. SKILL GROUP MODAL
          ======================================================== */}
      {showSkillModal && (
        <div className="modal-overlay" onClick={() => setShowSkillModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title-bar">
              <div className="modal-title-icon">⚡</div>
              <div>
                <h3>{editingSkill ? 'Edit Skill Group' : 'Add New Skill Group'}</h3>
                <p className="modal-title-sub">Organize engineering tools and technical competencies</p>
              </div>
              <button type="button" className="modal-close-icon" onClick={() => setShowSkillModal(false)}>×</button>
            </div>

            <form onSubmit={handleSkillSubmit}>
              <div className="form-group">
                <label>Skill Group Title *</label>
                <input 
                  type="text" 
                  value={skillFormData.title} 
                  onChange={(e) => setSkillFormData({...skillFormData, title: e.target.value})} 
                  placeholder="e.g. Cloud & DevOps Infrastructure" 
                  required 
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Category *</label>
                  <select 
                    className="dash-select"
                    value={skillFormData.category}
                    onChange={(e) => setSkillFormData({...skillFormData, category: e.target.value})}
                  >
                    <option value="Core Development">Core Development</option>
                    <option value="Productivity & Workflow">Productivity & Workflow</option>
                    <option value="Infrastructure">Infrastructure</option>
                    <option value="Hardware Engineering">Hardware Engineering</option>
                    <option value="Electronics">Electronics</option>
                    <option value="Telecommunications">Telecommunications</option>
                    <option value="Specialized">Specialized</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Icon Emoji</label>
                  <input 
                    type="text" 
                    value={skillFormData.icon} 
                    onChange={(e) => setSkillFormData({...skillFormData, icon: e.target.value})} 
                    placeholder="e.g. ⚡, 💻, ☁️" 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Skill Items (Comma separated) *</label>
                <textarea 
                  rows="3" 
                  value={skillFormData.items} 
                  onChange={(e) => setSkillFormData({...skillFormData, items: e.target.value})} 
                  placeholder="e.g. Docker, Kubernetes, AWS, Terraform, CI/CD" 
                  required 
                />
              </div>

              <div className="modal-buttons">
                <button type="button" className="cancel-btn" onClick={() => setShowSkillModal(false)}>Cancel</button>
                <button type="submit" className="save-btn">
                  {editingSkill ? 'Save Changes' : 'Add Skill Group'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          3. CERTIFICATE MODAL
          ======================================================== */}
      {showCertModal && (
        <div className="modal-overlay" onClick={() => setShowCertModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title-bar">
              <div className="modal-title-icon">🏆</div>
              <div>
                <h3>{editingCert ? 'Edit Certificate' : 'Add Certificate & Recognition'}</h3>
                <p className="modal-title-sub">Add honors, hackathon achievements, and accredited credentials</p>
              </div>
              <button type="button" className="modal-close-icon" onClick={() => setShowCertModal(false)}>×</button>
            </div>

            <form onSubmit={handleCertSubmit}>
              <div className="form-group">
                <label>Certificate Title *</label>
                <input 
                  type="text" 
                  value={certFormData.title} 
                  onChange={(e) => setCertFormData({...certFormData, title: e.target.value})} 
                  placeholder="e.g. AWS Certified Solutions Architect" 
                  required 
                />
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Issuer Organization *</label>
                  <input 
                    type="text" 
                    value={certFormData.issuer} 
                    onChange={(e) => setCertFormData({...certFormData, issuer: e.target.value})} 
                    placeholder="e.g. Amazon Web Services" 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label>Credential Type *</label>
                  <select 
                    className="dash-select"
                    value={certFormData.type}
                    onChange={(e) => setCertFormData({...certFormData, type: e.target.value})}
                  >
                    <option value="Recognition">Recognition</option>
                    <option value="Leadership">Leadership</option>
                    <option value="Volunteer">Volunteer</option>
                    <option value="Service">Service</option>
                    <option value="Professional">Professional</option>
                    <option value="Academic">Academic</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Icon Emoji</label>
                  <input 
                    type="text" 
                    value={certFormData.icon} 
                    onChange={(e) => setCertFormData({...certFormData, icon: e.target.value})} 
                    placeholder="e.g. 🏆, 🎖️, 📜" 
                  />
                </div>

                <div className="form-group">
                  <label>Verification Document URL</label>
                  <input 
                    type="url" 
                    value={certFormData.link} 
                    onChange={(e) => setCertFormData({...certFormData, link: e.target.value})} 
                    placeholder="https://drive.google.com/..." 
                  />
                </div>
              </div>

              {/* CERTIFICATE IMAGE UPLOAD & PREVIEW */}
              <div className="form-group">
                <label>Certificate Image / Document Photo (Optional)</label>
                {certFormData.imageUrl ? (
                  <div className="slot-preview-box" style={{ height: '160px', marginTop: '6px' }}>
                    <img src={certFormData.imageUrl} alt="Certificate preview" className="slot-preview-img" />
                    <div className="slot-preview-overlay">
                      <label className="slot-btn change">
                        🔄 Change
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={(e) => handleCertImageUpload(e.target.files[0])} 
                          style={{ display: 'none' }} 
                        />
                      </label>
                      <button 
                        type="button" 
                        className="slot-btn remove" 
                        onClick={() => setCertFormData({ ...certFormData, imageUrl: '' })}
                      >
                        ✕ Remove
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="slot-upload-container" style={{ marginTop: '6px' }}>
                    <label className="slot-dropzone">
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                      <span className="dropzone-label">Browse Certificate Photo</span>
                      <span className="dropzone-tip">Upload PNG, JPG or WebP</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={(e) => handleCertImageUpload(e.target.files[0])} 
                        style={{ display: 'none' }} 
                      />
                    </label>
                    <div className="slot-divider-text">or Image URL</div>
                    <input
                      type="url"
                      className="slot-text-input"
                      placeholder="https://... direct image link"
                      value={certFormData.imageUrl || ''}
                      onChange={(e) => setCertFormData({ ...certFormData, imageUrl: e.target.value })}
                    />
                  </div>
                )}
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea 
                  rows="3" 
                  value={certFormData.desc} 
                  onChange={(e) => setCertFormData({...certFormData, desc: e.target.value})} 
                  placeholder="Brief summary of achievements or scope of the certificate..." 
                />
              </div>

              <div className="modal-buttons">
                <button type="button" className="cancel-btn" onClick={() => setShowCertModal(false)}>Cancel</button>
                <button type="submit" className="save-btn">
                  {editingCert ? 'Save Changes' : 'Add Certificate'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================
          4. CLIENT REVIEW / REFERENCE MODAL
          ======================================================== */}
      {showReviewModal && (
        <div className="modal-overlay" onClick={() => setShowReviewModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-title-bar">
              <div className="modal-title-icon">👥</div>
              <div>
                <h3>{editingReview ? 'Edit Client Review' : 'Add Client Review / Reference'}</h3>
                <p className="modal-title-sub">Verified supervisors, clients, and director testimonials</p>
              </div>
              <button type="button" className="modal-close-icon" onClick={() => setShowReviewModal(false)}>×</button>
            </div>

            <form onSubmit={handleReviewSubmit}>
              <div className="form-grid-2">
                <div className="form-group">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    value={reviewFormData.name} 
                    onChange={(e) => setReviewFormData({...reviewFormData, name: e.target.value})} 
                    placeholder="e.g. Dr. Alemayehu Cheru" 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label>Position / Role *</label>
                  <input 
                    type="text" 
                    value={reviewFormData.position} 
                    onChange={(e) => setReviewFormData({...reviewFormData, position: e.target.value})} 
                    placeholder="e.g. Department Head" 
                    required 
                  />
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Organization / Company *</label>
                  <input 
                    type="text" 
                    value={reviewFormData.organization} 
                    onChange={(e) => setReviewFormData({...reviewFormData, organization: e.target.value})} 
                    placeholder="e.g. Hawassa University" 
                    required 
                  />
                </div>

                <div className="form-group">
                  <label>Reference Category *</label>
                  <select 
                    className="dash-select"
                    value={reviewFormData.tag}
                    onChange={(e) => setReviewFormData({...reviewFormData, tag: e.target.value})}
                  >
                    <option value="Academic Reference">Academic Reference</option>
                    <option value="Professional Reference">Professional Reference</option>
                    <option value="Client Testimonial">Client Testimonial</option>
                  </select>
                </div>
              </div>

              <div className="form-grid-2">
                <div className="form-group">
                  <label>Contact Email (Optional)</label>
                  <input 
                    type="email" 
                    value={reviewFormData.email} 
                    onChange={(e) => setReviewFormData({...reviewFormData, email: e.target.value})} 
                    placeholder="contact@example.com" 
                  />
                </div>

                <div className="form-group">
                  <label>Contact Phone (Optional)</label>
                  <input 
                    type="tel" 
                    value={reviewFormData.phone} 
                    onChange={(e) => setReviewFormData({...reviewFormData, phone: e.target.value})} 
                    placeholder="+251 9..." 
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Avatar Emoji</label>
                <input 
                  type="text" 
                  value={reviewFormData.icon} 
                  onChange={(e) => setReviewFormData({...reviewFormData, icon: e.target.value})} 
                  placeholder="e.g. 👨‍🏫, 🏢, 💼" 
                />
              </div>

              <div className="form-group">
                <label>Review / Recommendation Quote *</label>
                <textarea 
                  rows="3" 
                  value={reviewFormData.note} 
                  onChange={(e) => setReviewFormData({...reviewFormData, note: e.target.value})} 
                  placeholder="Attestation statement validating technical execution, leadership, or deliverable quality..." 
                  required 
                />
              </div>

              <div className="modal-buttons">
                <button type="button" className="cancel-btn" onClick={() => setShowReviewModal(false)}>Cancel</button>
                <button type="submit" className="save-btn">
                  {editingReview ? 'Save Changes' : 'Add Review'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
