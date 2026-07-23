import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Modal states
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const [showCertModal, setShowCertModal] = useState(false);
  const [editingCertificate, setEditingCertificate] = useState(null);
  
  // Expanded messages state for "See More"
  const [expandedMessages, setExpandedMessages] = useState({});

  // Inbox Filtering & Sorting State
  const [dateFilter, setDateFilter] = useState('all'); // 'all', 'today', 'week', 'month'
  const [dateSort, setDateSort] = useState('newest'); // 'newest', 'oldest'
  const [statusFilter, setStatusFilter] = useState('all'); // 'all', 'unread', 'pending', 'confirmed', 'canceled'

  // Password Change State
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');

  // Personal Profile & Site Settings State
  const [openSettingsSection, setOpenSettingsSection] = useState('profile');

  const [profileData, setProfileData] = useState(() => {
    const saved = localStorage.getItem('profileData');
    return saved ? JSON.parse(saved) : {
      name: 'Desalew Aleganh Yeneanat',
      headline: 'Full-Stack Engineer — iGaming & Real-Time Systems',
      email: 'desu6262@gmail.com',
      phone: '0962622111 / 0955172057',
      location: 'Addis Ababa, Ethiopia',
      telegram: 'https://t.me/desu6262',
      github: 'https://github.com/DEsu2111',
      linkedin: 'https://linkedin.com/in/desalew-aleganeh',
    };
  });
  const [profileSuccess, setProfileSuccess] = useState('');

  // Hiring Availability Toggle
  const [availableForHire, setAvailableForHire] = useState(() => {
    return localStorage.getItem('availableForHire') !== 'false';
  });

  // Notification Preferences
  const [notifications, setNotifications] = useState(() => {
    const saved = localStorage.getItem('notificationSettings');
    return saved ? JSON.parse(saved) : {
      telegramAlerts: true,
      emailAutoReply: true,
    };
  });
  const [notifSuccess, setNotifSuccess] = useState('');

  // Project Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    liveUrl: '',
    githubUrl: ''
  });

  // Certificate & Gallery Form State
  const [certFormData, setCertFormData] = useState({
    title: '',
    category: 'Certificates & Awards',
    type: 'Recognition',
    issuer: '',
    location: '',
    description: '',
    imageUrl: '',
    link: '',
    icon: '🏆'
  });

  const navigate = useNavigate();

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

  const API_BASE = import.meta.env.VITE_API_URL || '';

  const fetchData = async () => {
    setLoading(true);
    try {
      const [msgRes, projRes, certRes] = await Promise.all([
        fetch(`${API_BASE}/api/contact`),
        fetch(`${API_BASE}/api/projects`),
        fetch(`${API_BASE}/api/certificates`)
      ]);
      const [msgData, projData, certData] = await Promise.all([
        msgRes.json(),
        projRes.json(),
        certRes.json()
      ]);
      setMessages(Array.isArray(msgData) ? msgData : []);
      setProjects(Array.isArray(projData) ? projData : []);
      setCertificates(Array.isArray(certData) ? certData : []);
    } catch (err) {
      console.error('Fetch error:', err);
    } finally {
      if (loading) setLoading(false);
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
    localStorage.setItem('profileData', JSON.stringify(profileData));
    setProfileSuccess('Profile and contact details saved successfully!');
    setTimeout(() => setProfileSuccess(''), 3500);
  };

  const handleHireToggle = () => {
    const nextState = !availableForHire;
    setAvailableForHire(nextState);
    localStorage.setItem('availableForHire', String(nextState));
  };

  const handleNotifSave = (e) => {
    e.preventDefault();
    localStorage.setItem('notificationSettings', JSON.stringify(notifications));
    setNotifSuccess('Notification settings updated!');
    setTimeout(() => setNotifSuccess(''), 3500);
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim())
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

      if (response.ok) {
        setShowModal(false);
        setEditingProject(null);
        setFormData({ title: '', description: '', technologies: '', liveUrl: '', githubUrl: '' });
        fetchData();
      }
    } catch (err) {
      alert('Failed to save project');
    }
  };

  const openEditModal = (proj) => {
    setEditingProject(proj);
    setFormData({
      title: proj.title,
      description: proj.description,
      technologies: proj.technologies ? proj.technologies.join(', ') : '',
      liveUrl: proj.liveUrl || '',
      githubUrl: proj.githubUrl || ''
    });
    setShowModal(true);
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await fetch(`${API_BASE}/api/projects/${id}`, { method: 'DELETE' });
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      alert('Failed to delete project');
    }
  };

  // Certificate / Gallery Direct File Upload Handler
  const handleCertFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        alert('File size exceeds 8MB. Please choose a smaller photo.');
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setCertFormData((prev) => ({ ...prev, imageUrl: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCertSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingCertificate
        ? `${API_BASE}/api/certificates/${editingCertificate._id}`
        : `${API_BASE}/api/certificates`;

      const method = editingCertificate ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(certFormData)
      });

      if (response.ok) {
        setShowCertModal(false);
        setEditingCertificate(null);
        setCertFormData({
          title: '',
          category: 'Certificates & Awards',
          type: 'Recognition',
          issuer: '',
          location: '',
          description: '',
          imageUrl: '',
          link: '',
          icon: '🏆'
        });
        fetchData();
      }
    } catch (err) {
      alert('Failed to save certificate / photo');
    }
  };

  const openCertEditModal = (cert) => {
    setEditingCertificate(cert);
    setCertFormData({
      title: cert.title || '',
      category: cert.category || 'Certificates & Awards',
      type: cert.type || 'Recognition',
      issuer: cert.issuer || '',
      location: cert.location || '',
      description: cert.description || '',
      imageUrl: cert.imageUrl || '',
      link: cert.link || '',
      icon: cert.icon || '🏆'
    });
    setShowCertModal(true);
  };

  const deleteCertificate = async (id) => {
    if (!window.confirm('Are you sure you want to delete this certificate / photo?')) return;
    try {
      await fetch(`${API_BASE}/api/certificates/${id}`, { method: 'DELETE' });
      setCertificates(certificates.filter(c => c._id !== id));
    } catch (err) {
      alert('Failed to delete certificate');
    }
  };

  const toggleExpand = (id) => {
    setExpandedMessages(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const updateMessageStatus = async (id, status) => {
    const previousMessages = [...messages];
    setMessages(messages.map(m => m._id === id ? { ...m, status } : m));

    try {
      const response = await fetch(`${API_BASE}/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (!response.ok) throw new Error('Failed to update');
    } catch (err) {
      setMessages(previousMessages);
      console.error(err);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm('Are you sure you want to delete this contact message permanently?')) return;
    const previousMessages = [...messages];
    setMessages(messages.filter(m => m._id !== id));

    try {
      const response = await fetch(`${API_BASE}/api/contact/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete');
    } catch (err) {
      setMessages(previousMessages);
      alert('Failed to delete message');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  const filteredMessages = messages
    .filter(m => {
      // 1. Search Query (Name, Email, Phone, Message body)
      const q = searchQuery.toLowerCase();
      const matchesSearch = 
        m.name.toLowerCase().includes(q) ||
        m.email.toLowerCase().includes(q) ||
        (m.phone && m.phone.includes(q)) ||
        (m.message && m.message.toLowerCase().includes(q));
      if (!matchesSearch) return false;

      // 2. Status Filter
      if (statusFilter !== 'all' && (m.status || 'unread') !== statusFilter) {
        return false;
      }

      // 3. Date Range Filter
      if (dateFilter !== 'all' && m.createdAt) {
        const msgDate = new Date(m.createdAt);
        const now = new Date();
        if (dateFilter === 'today') {
          if (msgDate.toDateString() !== now.toDateString()) return false;
        } else if (dateFilter === 'week') {
          const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
          if (msgDate < sevenDaysAgo) return false;
        } else if (dateFilter === 'month') {
          const thirtyDaysAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
          if (msgDate < thirtyDaysAgo) return false;
        }
      }

      return true;
    })
    .sort((a, b) => {
      const timeA = new Date(a.createdAt || 0).getTime();
      const timeB = new Date(b.createdAt || 0).getTime();
      return dateSort === 'newest' ? timeB - timeA : timeA - timeB;
    });

  const filteredCertificates = certificates.filter(c =>
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (c.issuer && c.issuer.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (c.category && c.category.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  if (loading) return <div className="dashboard-loader">Syncing Smart Dashboard...</div>;

  return (
    <div className={`dashboard-wrapper ${sidebarOpen ? 'sidebar-open' : ''}`}>
      {/* Sidebar overlay for mobile */}
      {sidebarOpen && <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}></div>}
      
      <aside className={`dashboard-sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-brand">
          <span className="brand-dot"></span>
          <h2>Admin Pro</h2>
          <button className="mobile-close" onClick={() => setSidebarOpen(false)}>×</button>
        </div>
        <nav className="sidebar-nav">
          <button className={`nav-link ${activeTab === 'messages' ? 'active' : ''}`} onClick={() => { setActiveTab('messages'); setSidebarOpen(false); }}>
            <span className="icon">✉</span> Inbox
          </button>
          <button className={`nav-link ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => { setActiveTab('projects'); setSidebarOpen(false); }}>
            <span className="icon">🚀</span> Projects
          </button>
          <button className={`nav-link ${activeTab === 'certificates' ? 'active' : ''}`} onClick={() => { setActiveTab('certificates'); setSidebarOpen(false); }}>
            <span className="icon">🏆</span> Certificates & Gallery
          </button>
          <button className={`nav-link ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => { setActiveTab('settings'); setSidebarOpen(false); }}>
            <span className="icon">⚙</span> Settings
          </button>
          <button className={`nav-link ${activeTab === 'analytics' ? 'active' : ''}`} onClick={() => { setActiveTab('analytics'); setSidebarOpen(false); }}>
            <span className="icon">📊</span> Analytics
          </button>
        </nav>
        <div className="sidebar-footer">
          <button onClick={() => navigate('/')} className="back-to-site">← Back to Site</button>
          <button onClick={handleLogout} className="logout-btn">Logout</button>
        </div>
      </aside>

      <main className="dashboard-main">
        <header className="main-header">
          <button className="mobile-menu-btn" onClick={() => setSidebarOpen(true)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
          <div className="search-bar">
            <span>🔍</span>
            <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          </div>
          <div className="user-profile mobile-hide">
            <div className="user-avatar">DA</div>
          </div>
        </header>

        {activeTab === 'messages' && (
          <div className="tab-content">
            <div className="content-header">
              <h2>Message Center ({filteredMessages.length})</h2>
            </div>

            {/* Filter Toolbar for Date & Status */}
            <div className="inbox-filter-bar">
              <div className="filter-group">
                <label>📅 Date Range:</label>
                <select value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="filter-select">
                  <option value="all">All Dates</option>
                  <option value="today">Today</option>
                  <option value="week">Past 7 Days</option>
                  <option value="month">Past 30 Days</option>
                </select>
              </div>

              <div className="filter-group">
                <label>↕ Sort Order:</label>
                <select value={dateSort} onChange={(e) => setDateSort(e.target.value)} className="filter-select">
                  <option value="newest">Newest First ⬇</option>
                  <option value="oldest">Oldest First ⬆</option>
                </select>
              </div>

              <div className="filter-group">
                <label>🏷 Status Filter:</label>
                <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="filter-select">
                  <option value="all">All Statuses</option>
                  <option value="unread">Unread Only</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="canceled">Canceled</option>
                </select>
              </div>
            </div>

            <div className="message-list-premium">
              {filteredMessages.length === 0 ? (
                <div className="no-messages-box">
                  <p>No messages match your search or filter criteria.</p>
                </div>
              ) : (
                filteredMessages.map(msg => {
                  const isExpanded = expandedMessages[msg._id];
                  const needsTruncation = msg.message.length > 200;
                  const displayText = needsTruncation && !isExpanded 
                    ? msg.message.substring(0, 200) + '...' 
                    : msg.message;

                  return (
                    <div key={msg._id} className={`msg-card-premium ${msg.status || 'unread'}`}>
                      <div className="msg-side-accent"></div>
                      <div className="msg-header">
                        <div className="msg-user-info">
                          <h3>{msg.name}</h3>
                          <div className="msg-contact-links">
                            <span>{msg.email}</span>
                            {msg.phone && <span> • {msg.phone}</span>}
                          </div>
                        </div>
                        <div className="msg-date">{new Date(msg.createdAt).toLocaleString()}</div>
                      </div>
                      <div className="msg-body">
                        <p className="msg-text">{displayText}</p>
                        {needsTruncation && (
                          <button className="see-more-btn" onClick={() => toggleExpand(msg._id)}>
                            {isExpanded ? 'Show Less' : 'See More'}
                          </button>
                        )}
                      </div>
                      <div className="msg-toolbar">
                        <div className="status-selector">
                          {['unread', 'pending', 'confirmed', 'canceled'].map(s => (
                            <button key={s} onClick={() => updateMessageStatus(msg._id, s)} className={`status-chip ${s} ${msg.status === s ? 'active' : ''}`}>{s}</button>
                          ))}
                        </div>
                        <div className="response-actions">
                          <a href={`mailto:${msg.email}`} className="resp-btn email">📧 Email</a>
                          {msg.phone && (
                            <>
                              <a href={`tel:${msg.phone}`} className="resp-btn call">📞 Call</a>
                              <a href={`https://wa.me/${msg.phone.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="resp-btn whatsapp">💬 WhatsApp</a>
                            </>
                          )}
                          <button type="button" onClick={() => deleteMessage(msg._id)} className="resp-btn delete" title="Delete Message Permanently">
                            🗑 Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (
          <div className="tab-content">
            <div className="content-header">
              <h2>My Projects</h2>
              <button className="add-btn" onClick={() => { setEditingProject(null); setFormData({title:'',description:'',technologies:'',liveUrl:'',githubUrl:''}); setShowModal(true); }}>+ Add Project</button>
            </div>
            <div className="project-grid-premium">
              {projects.map(proj => (
                <div key={proj._id} className="proj-card-premium">
                  <div className="proj-badge">Project</div>
                  <div className="proj-info">
                    <h3>{proj.title}</h3>
                    <p>{proj.description}</p>
                    <div className="proj-techs">
                      {proj.technologies.map(t => <span key={t}>{t}</span>)}
                    </div>
                  </div>
                  <div className="proj-actions">
                    <button className="edit-btn" onClick={() => openEditModal(proj)}>Edit</button>
                    <button className="delete-btn" onClick={() => deleteProject(proj._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'certificates' && (
          <div className="tab-content">
            <div className="content-header">
              <h2>Certificates & Photo Gallery</h2>
              <button className="add-btn" onClick={() => { 
                setEditingCertificate(null); 
                setCertFormData({
                  title: '',
                  category: 'Certificates & Awards',
                  type: 'Recognition',
                  issuer: '',
                  location: '',
                  description: '',
                  imageUrl: '',
                  link: '',
                  icon: '🏆'
                }); 
                setShowCertModal(true); 
              }}>+ Add Certificate / Photo</button>
            </div>
            <div className="project-grid-premium">
              {filteredCertificates.map(cert => (
                <div key={cert._id} className="proj-card-premium">
                  <div className="proj-badge">{cert.category}</div>
                  <div className="proj-info">
                    <h3>{cert.icon || '🏅'} {cert.title}</h3>
                    <p><strong>Issuer/Location:</strong> {cert.issuer || cert.location}</p>
                    <p>{cert.description}</p>
                    {cert.imageUrl && (
                      <div style={{ marginTop: '10px' }}>
                        <img src={cert.imageUrl} alt={cert.title} style={{ width: '100%', maxHeight: '120px', objectFit: 'cover', borderRadius: '8px' }} />
                      </div>
                    )}
                  </div>
                  <div className="proj-actions">
                    <button className="edit-btn" onClick={() => openCertEditModal(cert)}>Edit</button>
                    <button className="delete-btn" onClick={() => deleteCertificate(cert._id)}>Delete</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="tab-content">
            <div className="content-header">
              <h2>Account & Site Management</h2>
            </div>

            <div className="settings-split-container">
              {/* Left Menu Column */}
              <div className="settings-menu-col">
                <button
                  type="button"
                  className={`settings-menu-btn ${openSettingsSection === 'profile' ? 'active' : ''}`}
                  onClick={() => setOpenSettingsSection('profile')}
                >
                  <span className="menu-btn-icon">👤</span>
                  <span>Personal Profile & Contact</span>
                  <span className="active-arrow">›</span>
                </button>

                <button
                  type="button"
                  className={`settings-menu-btn ${openSettingsSection === 'hiring' ? 'active' : ''}`}
                  onClick={() => setOpenSettingsSection('hiring')}
                >
                  <span className="menu-btn-icon">💼</span>
                  <span>Hiring Availability</span>
                  <span className="active-arrow">›</span>
                </button>

                <button
                  type="button"
                  className={`settings-menu-btn ${openSettingsSection === 'alerts' ? 'active' : ''}`}
                  onClick={() => setOpenSettingsSection('alerts')}
                >
                  <span className="menu-btn-icon">📩</span>
                  <span>Alerts & Automation</span>
                  <span className="active-arrow">›</span>
                </button>

                <button
                  type="button"
                  className={`settings-menu-btn ${openSettingsSection === 'security' ? 'active' : ''}`}
                  onClick={() => setOpenSettingsSection('security')}
                >
                  <span className="menu-btn-icon">🔐</span>
                  <span>Account Security</span>
                  <span className="active-arrow">›</span>
                </button>
              </div>

              {/* Right Content Panel Column */}
              <div className="settings-content-col">
                {openSettingsSection === 'profile' && (
                  <div className="settings-card active-panel">
                    <h3>👤 Personal Profile & Contact Details</h3>
                    <form onSubmit={handleProfileSave}>
                      <div className="form-group">
                        <label>Full Name</label>
                        <input type="text" value={profileData.name} onChange={(e) => setProfileData({...profileData, name: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label>Headline / Specialization</label>
                        <input type="text" value={profileData.headline} onChange={(e) => setProfileData({...profileData, headline: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label>Primary Email</label>
                        <input type="email" value={profileData.email} onChange={(e) => setProfileData({...profileData, email: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label>Phone Numbers</label>
                        <input type="text" value={profileData.phone} onChange={(e) => setProfileData({...profileData, phone: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label>Location</label>
                        <input type="text" value={profileData.location} onChange={(e) => setProfileData({...profileData, location: e.target.value})} required />
                      </div>
                      <div className="form-group">
                        <label>Telegram Link</label>
                        <input type="url" value={profileData.telegram} onChange={(e) => setProfileData({...profileData, telegram: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label>GitHub URL</label>
                        <input type="url" value={profileData.github} onChange={(e) => setProfileData({...profileData, github: e.target.value})} />
                      </div>
                      <div className="form-group">
                        <label>LinkedIn URL</label>
                        <input type="url" value={profileData.linkedin} onChange={(e) => setProfileData({...profileData, linkedin: e.target.value})} />
                      </div>
                      {profileSuccess && <p className="success-msg">{profileSuccess}</p>}
                      <button type="submit" className="save-btn">Save Profile Details</button>
                    </form>
                  </div>
                )}

                {openSettingsSection === 'hiring' && (
                  <div className="settings-card active-panel">
                    <h3>💼 Hiring & Contract Availability</h3>
                    <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                      Toggle your availability status badge on your website for potential clients and recruiters.
                    </p>
                    <div className="availability-status-box" style={{ padding: '1.25rem', background: 'rgba(78, 204, 163, 0.08)', borderRadius: '12px', border: '1px solid rgba(78, 204, 163, 0.2)', marginBottom: '1.25rem' }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: '700', color: availableForHire ? '#10b981' : '#f59e0b' }}>
                        {availableForHire ? '🟢 AVAILABLE FOR CONTRACTS & JOBS' : '🟡 BUSY / NOT TAKING NEW CONTRACTS'}
                      </span>
                    </div>
                    <button type="button" className={`save-btn ${availableForHire ? 'danger' : ''}`} onClick={handleHireToggle}>
                      {availableForHire ? 'Set to Unavailable' : 'Set to Available for Hire'}
                    </button>
                  </div>
                )}

                {openSettingsSection === 'alerts' && (
                  <div className="settings-card active-panel">
                    <h3>📩 Alerts & Automation Preferences</h3>
                    <form onSubmit={handleNotifSave}>
                      <div className="toggle-setting-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div>
                          <strong>Telegram Bot Alerts</strong>
                          <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Send instant mobile alert when a contact inquiry arrives</p>
                        </div>
                        <input type="checkbox" checked={notifications.telegramAlerts} onChange={(e) => setNotifications({...notifications, telegramAlerts: e.target.checked})} style={{ width: '22px', height: '22px', cursor: 'pointer' }} />
                      </div>

                      <div className="toggle-setting-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                        <div>
                          <strong>Email Auto-Responder</strong>
                          <p style={{ fontSize: '0.85rem', color: 'var(--muted)' }}>Send automatic thank-you email to contact form submitters</p>
                        </div>
                        <input type="checkbox" checked={notifications.emailAutoReply} onChange={(e) => setNotifications({...notifications, emailAutoReply: e.target.checked})} style={{ width: '22px', height: '22px', cursor: 'pointer' }} />
                      </div>
                      {notifSuccess && <p className="success-msg">{notifSuccess}</p>}
                      <button type="submit" className="save-btn">Save Notification Preferences</button>
                    </form>
                  </div>
                )}

                {openSettingsSection === 'security' && (
                  <div className="settings-card active-panel">
                    <h3>🔐 Account Security (Change Password)</h3>
                    <form onSubmit={handlePasswordChange}>
                      <div className="form-group"><label>Old Password</label><input type="password" value={passwords.old} onChange={(e) => setPasswords({...passwords, old: e.target.value})} required /></div>
                      <div className="form-group"><label>New Password</label><input type="password" value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})} required /></div>
                      <div className="form-group"><label>Confirm New Password</label><input type="password" value={passwords.confirm} onChange={(e) => setPasswords({...passwords, confirm: e.target.value})} required /></div>
                      {passError && <p className="error-msg">{passError}</p>}
                      {passSuccess && <p className="success-msg">{passSuccess}</p>}
                      <button type="submit" className="save-btn">Update Password</button>
                    </form>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
           <div className="tab-content">
              <h2>Performance Overview</h2>
              <div className="stats-grid-premium">
                  <div className="stat-item"><h4>Messages</h4><div className="stat-big">{messages.length}</div></div>
                  <div className="stat-item"><h4>Projects</h4><div className="stat-big">{projects.length}</div></div>
                  <div className="stat-item"><h4>Gallery Items</h4><div className="stat-big">{certificates.length}</div></div>
              </div>
           </div>
        )}
      </main>

      {/* Project Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingProject ? 'Edit Project' : 'Add New Project'}</h3>
            <form onSubmit={handleProjectSubmit}>
              <div className="form-group"><label>Title</label><input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required /></div>
              <div className="form-group"><label>Description</label><textarea value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} required /></div>
              <div className="form-group"><label>Technologies (comma separated)</label><input type="text" value={formData.technologies} onChange={(e) => setFormData({...formData, technologies: e.target.value})} required /></div>
              <div className="form-group"><label>Live URL</label><input type="url" value={formData.liveUrl} onChange={(e) => setFormData({...formData, liveUrl: e.target.value})} /></div>
              <div className="form-group"><label>GitHub URL</label><input type="url" value={formData.githubUrl} onChange={(e) => setFormData({...formData, githubUrl: e.target.value})} /></div>
              <div className="modal-buttons">
                <button type="button" className="cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="submit" className="save-btn">Save Project</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Certificate & Gallery Modal with Direct File Upload */}
      {showCertModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{editingCertificate ? 'Edit Certificate / Photo' : 'Add Certificate / Photo'}</h3>
            <form onSubmit={handleCertSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input type="text" value={certFormData.title} onChange={(e) => setCertFormData({...certFormData, title: e.target.value})} required />
              </div>
              
              <div className="form-group">
                <label>Category</label>
                <select value={certFormData.category} onChange={(e) => setCertFormData({...certFormData, category: e.target.value})}>
                  <option value="Certificates & Awards">Certificates & Awards</option>
                  <option value="Hackathons & Events">Hackathons & Events</option>
                  <option value="Work & Education">Work & Education</option>
                </select>
              </div>

              <div className="form-group">
                <label>Tag / Type</label>
                <input type="text" placeholder="e.g. Recognition, Leadership, Hackathon, Work Studio" value={certFormData.type} onChange={(e) => setCertFormData({...certFormData, type: e.target.value})} />
              </div>

              <div className="form-group">
                <label>Issuer / Location</label>
                <input type="text" placeholder="e.g. Indicitous Tech, Hawassa University, Addis Ababa" value={certFormData.issuer} onChange={(e) => setCertFormData({...certFormData, issuer: e.target.value})} />
              </div>

              <div className="form-group">
                <label>📷 Upload Photo / Certificate File (Direct from Computer)</label>
                <input type="file" accept="image/*" onChange={handleCertFileUpload} />
              </div>

              <div className="form-group">
                <label>Or Photo / Image URL</label>
                <input type="text" placeholder="https://..." value={certFormData.imageUrl} onChange={(e) => setCertFormData({...certFormData, imageUrl: e.target.value})} />
              </div>

              {certFormData.imageUrl && (
                <div className="form-group" style={{ textAlign: 'center' }}>
                  <label>Photo Preview:</label>
                  <img src={certFormData.imageUrl} alt="Preview" style={{ maxHeight: '140px', borderRadius: '10px', marginTop: '6px' }} />
                </div>
              )}

              <div className="form-group">
                <label>Verification Link (Google Drive / Online Link)</label>
                <input type="url" value={certFormData.link} onChange={(e) => setCertFormData({...certFormData, link: e.target.value})} />
              </div>

              <div className="form-group">
                <label>Description</label>
                <textarea value={certFormData.description} onChange={(e) => setCertFormData({...certFormData, description: e.target.value})} />
              </div>

              <div className="modal-buttons">
                <button type="button" className="cancel-btn" onClick={() => setShowCertModal(false)}>Cancel</button>
                <button type="submit" className="save-btn">Save Certificate</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
