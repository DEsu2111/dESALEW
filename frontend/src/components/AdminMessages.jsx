import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminMessages.css';

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const API_BASE = import.meta.env.VITE_API_URL || '';

  const fetchMessages = async () => {
    try {
      const response = await fetch(`${API_BASE}/api/contact`);
      if (!response.ok) throw new Error('Failed to fetch messages');
      const data = await response.json();
      setMessages(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (localStorage.getItem('isAdmin') !== 'true') {
      navigate('/login');
      return;
    }
    fetchMessages();
  }, [navigate]);

  const updateStatus = async (id, newStatus) => {
    try {
      const response = await fetch(`${API_BASE}/api/contact/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (response.ok) {
        setMessages(messages.map(msg => msg._id === id ? { ...msg, status: newStatus } : msg));
      }
    } catch (err) {
      console.error('Failed to update status', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  const filteredMessages = filter === 'all' 
    ? messages 
    : messages.filter(msg => msg.status === filter);

  const stats = {
    total: messages.length,
    unread: messages.filter(m => m.status === 'unread' || !m.status).length,
    pending: messages.filter(m => m.status === 'pending').length,
    confirmed: messages.filter(m => m.status === 'confirmed').length
  };

  if (loading) return <div className="admin-status">Loading secure dashboard...</div>;
  if (error) return <div className="admin-status error">Error: {error}</div>;

  return (
    <div className="admin-container">
      <div className="admin-header">
        <div className="admin-title-group">
          <button onClick={() => navigate('/')} className="back-button">← Home</button>
          <h1>Smart Inbox</h1>
        </div>
        <div className="admin-actions">
           <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      </div>

      <div className="stats-bar">
        <div className="stat-card" onClick={() => setFilter('all')}>
          <span className="stat-label">Total</span>
          <span className="stat-value">{stats.total}</span>
        </div>
        <div className="stat-card unread" onClick={() => setFilter('unread')}>
          <span className="stat-label">Unread</span>
          <span className="stat-value">{stats.unread}</span>
        </div>
        <div className="stat-card pending" onClick={() => setFilter('pending')}>
          <span className="stat-label">Pending</span>
          <span className="stat-value">{stats.pending}</span>
        </div>
        <div className="stat-card confirmed" onClick={() => setFilter('confirmed')}>
          <span className="stat-label">Confirmed</span>
          <span className="stat-value">{stats.confirmed}</span>
        </div>
      </div>

      <div className="filter-tabs">
        {['all', 'unread', 'pending', 'confirmed', 'canceled'].map(t => (
          <button 
            key={t} 
            className={`filter-tab ${filter === t ? 'active' : ''}`}
            onClick={() => setFilter(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>
      
      {filteredMessages.length === 0 ? (
        <div className="no-messages">
          <p>No {filter !== 'all' ? filter : ''} messages found.</p>
        </div>
      ) : (
        <div className="messages-list">
          {filteredMessages.map((msg) => (
            <div key={msg._id} className={`message-row ${msg.status || 'unread'}`}>
              <div className="msg-main">
                <div className="msg-meta">
                  <span className={`status-badge ${msg.status || 'unread'}`}>{msg.status || 'unread'}</span>
                  <h3>{msg.name}</h3>
                  <span className="msg-date">{new Date(msg.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="msg-email">{msg.email}</p>
                <p className="msg-text">{msg.message}</p>
              </div>
              <div className="msg-actions">
                <select 
                  value={msg.status || 'unread'} 
                  onChange={(e) => updateStatus(msg._id, e.target.value)}
                  className="status-select"
                >
                  <option value="unread">Mark as Unread</option>
                  <option value="pending">Set Pending</option>
                  <option value="confirmed">Confirm</option>
                  <option value="canceled">Cancel</option>
                </select>
                <a href={`mailto:${msg.email}?subject=Re: Portfolio Contact`} className="reply-btn">Reply</a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminMessages;
