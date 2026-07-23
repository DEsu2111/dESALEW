import React, { useState, useEffect } from 'react';
import GalleryModal from './GalleryModal';

const initialGalleryData = [
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
  },
];

const categories = ['All', 'Certificates & Awards', 'Hackathons & Events', 'Work & Education'];

const Certificates = () => {
  const [galleryItems, setGalleryItems] = useState(initialGalleryData);
  const [activeTab, setActiveTab] = useState('All');
  const [selectedItem, setSelectedItem] = useState(null);
  const API_BASE = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch(`${API_BASE}/api/certificates`);
        if (response.ok) {
          const data = await response.json();
          if (Array.isArray(data) && data.length > 0) {
            setGalleryItems(data);
          }
        }
      } catch (err) {
        console.error('Could not load live certificates, using fallback data:', err);
      }
    };
    fetchCertificates();
  }, [API_BASE]);

  const filteredData = activeTab === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeTab);

  return (
    <section className="certificates-page">
      <div className="section-header">
        <h2>Certificates, Honors & Work Locations</h2>
        <p className="subtitle">Visual proof of engineering excellence, leadership awards, hackathons, and project sites</p>
      </div>

      <div className="gallery-tabs-container">
        {categories.map((tab) => (
          <button
            key={tab}
            type="button"
            className={`gallery-tab-btn ${activeTab === tab ? 'active' : ''}`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="certificates-grid">
        {filteredData.map((item) => (
          <div 
            key={item._id || item.id} 
            className="cert-card gallery-interactive-card"
            onClick={() => setSelectedItem(item)}
          >
            <div className="cert-card-preview-wrapper">
              {item.imageUrl ? (
                <img src={item.imageUrl} alt={item.title} className="cert-card-img" />
              ) : (
                <div className="cert-card-graphic-placeholder">
                  <span className="cert-graphic-icon">{item.icon || '🏅'}</span>
                  <span className="cert-graphic-tag">{item.type || 'Credential'}</span>
                </div>
              )}
              <div className="cert-card-overlay">
                <span className="overlay-zoom-icon">🔍 View Fullscreen</span>
              </div>
            </div>

            <div className="cert-content">
              <div className="cert-badge-row">
                <span className="cert-type-badge">{item.type || 'Credential'}</span>
                <span className="cert-location-badge">📍 {item.location || item.issuer}</span>
              </div>
              <h3>{item.title}</h3>
              <p className="cert-issuer">Issuer / Location: <strong>{item.issuer}</strong></p>
              <p className="cert-desc">{item.description}</p>

              <div className="cert-card-actions">
                <button
                  type="button"
                  className="cert-link-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedItem(item);
                  }}
                >
                  Inspect Photo / Credential <span>🔍</span>
                </button>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cert-link-btn secondary"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Online Verification <span>↗</span>
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <GalleryModal
        item={selectedItem}
        items={filteredData}
        onClose={() => setSelectedItem(null)}
        onSelect={(item) => setSelectedItem(item)}
      />
    </section>
  );
};

export default Certificates;