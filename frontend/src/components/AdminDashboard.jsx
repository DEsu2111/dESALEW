import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('messages');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [projects, setProjects] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  
  // Expanded messages state for "See More"
  const [expandedMessages, setExpandedMessages] = useState({});

  // Password Change State
  const [passwords, setPasswords] = useState({ old: '', new: '', confirm: '' });
  const [passError, setPassError] = useState('');
  const [passSuccess, setPassSuccess] = useState('');

  // Project Form State
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    technologies: '',
    liveUrl: '',
    githubUrl: ''
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

  const fetchData = async () => {
    setLoading(true);
    try {
      const [msgRes, projRes] = await Promise.all([
        fetch('http://localhost:5000/api/contact'),
        fetch('http://localhost:5000/api/projects')
      ]);
      const [msgData, projData] = await Promise.all([msgRes.json(), projRes.json()]);
      setMessages(msgData);
      setProjects(projData);
    } catch (err) {
      console.error('Fetch error:', err);
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

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim())
    };

    try {
      const url = editingProject 
        ? `http://localhost:5000/api/projects/${editingProject._id}` 
        : 'http://localhost:5000/api/projects';
      
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
      technologies: proj.technologies.join(', '),
      liveUrl: proj.liveUrl || '',
      githubUrl: proj.githubUrl || ''
    });
    setShowModal(true);
  };

  const deleteProject = async (id) => {
    if (!window.confirm('Are you sure you want to delete this project?')) return;
    try {
      await fetch(`http://localhost:5000/api/projects/${id}`, { method: 'DELETE' });
      setProjects(projects.filter(p => p._id !== id));
    } catch (err) {
      alert('Failed to delete project');
    }
  };

  const toggleExpand = (id) => {
    setExpandedMessages(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const updateMessageStatus = async (id, status) => {
    try {
      await fetch(`http://localhost:5000/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      setMessages(messages.map(m => m._id === id ? { ...m, status } : m));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  const filteredMessages = messages.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (m.phone && m.phone.includes(searchQuery))
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
              <h2>Message Center</h2>
            </div>
            <div className="message-list-premium">
              {filteredMessages.map(msg => {
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
                      </div>
                    </div>
                  </div>
                );
              })}
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

        {activeTab === 'settings' && (
          <div className="tab-content">
            <h2>Account Settings</h2>
            <div className="settings-container">
              <div className="settings-card">
                <h3>Change Password</h3>
                <form onSubmit={handlePasswordChange}>
                  <div className="form-group"><label>Old Password</label><input type="password" value={passwords.old} onChange={(e) => setPasswords({...passwords, old: e.target.value})} required /></div>
                  <div className="form-group"><label>New Password</label><input type="password" value={passwords.new} onChange={(e) => setPasswords({...passwords, new: e.target.value})} required /></div>
                  <div className="form-group"><label>Confirm New Password</label><input type="password" value={passwords.confirm} onChange={(e) => setPasswords({...passwords, confirm: e.target.value})} required /></div>
                  {passError && <p className="error-msg">{passError}</p>}
                  {passSuccess && <p className="success-msg">{passSuccess}</p>}
                  <button type="submit" className="save-btn">Update Password</button>
                </form>
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
              </div>
           </div>
        )}
      </main>

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
    </div>
  );
};

export default AdminDashboard;
