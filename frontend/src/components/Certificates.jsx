import React from 'react';

const certificateData = [
  {
    title: 'INDICITOUS HACKATHON Organizers (#HACH ADDIS)',
    issuer: 'Indicitous Technology',
    description: 'Contribution to organizing the prestigious technology event in Addis Ababa.',
    link: 'https://drive.google.com/file/d/18fdoQRS0tOMkf-l_c2HHcZ_JAriVc/view?usp=sharing',
    icon: '🏆',
    type: 'Recognition',
    imageUrl: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Horeb Digital Strategies Ministry Leader',
    issuer: 'Christian Fellowship',
    description: 'Served as Team Leader for over three years, managing digital initiatives and strategic leadership.',
    link: 'https://drive.google.com/file/d/1RiY0AyM-UgxHSj_6jmsnmabzZNowPe/view?usp=sharing',
    icon: '⚔️',
    type: 'Leadership',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Volunteer Teacher Recognition',
    issuer: 'Community Education Program',
    description: 'Certificate of recognition for volunteering as a make-up teacher for students.',
    link: 'https://drive.google.com/file/d/1xAc8WCBuBeGWSgMYeggaN7EcHyiz3prf/view?=sharing',
    icon: '📚',
    type: 'Volunteer',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'INDICITOUS HACKATHON Organizers (#HACH HAWASSA)',
    issuer: 'Indicitous Technology',
    description: 'Successful contribution to organizing the technology hackathon event in Hawassa city.',
    link: 'https://drive.google.com/file/d/13EsWcr5FyfCqIWnmR3Za3GOUCHRIa/view?usp=sharing',
    icon: '🏅',
    type: 'Recognition',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Digital Strategies Missionary',
    issuer: 'Great Commission Ministry',
    description: 'Over three years of dedicated service in the digital strategies missionary program.',
    link: 'https://drive.google.com/file/d/1eerbgy8UfDM89pcfcUTFVoca2xJYs/view?usp=sharing',
    icon: '🌐',
    type: 'Service',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80'
  },
  {
    title: 'Customer Service Training Completion Certificate',
    issuer: 'Rori Hotel Hawassa',
    description: 'Successful completion of 4 hrs intensive professional customer service and hospitality training.',
    link: '#',
    icon: '🏨',
    type: 'Professional',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80'
  }
];

const API_BASE = import.meta.env.VITE_API_URL || '';

const Certificates = () => {
  const [certificates, setCertificates] = React.useState(() => {
    try {
      const saved = localStorage.getItem('adminCertsList');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return certificateData;
  });

  React.useEffect(() => {
    const fetchCerts = async () => {
      try {
        const res = await fetch(`${API_BASE}/api/certificates`);
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setCertificates(data);
            try { localStorage.setItem('adminCertsList', JSON.stringify(data)); } catch (e) {}
          }
        }
      } catch (err) {
        console.warn('Using local certificates cache:', err);
      }
    };
    fetchCerts();
  }, []);

  return (
    <section className="certificates-page">
      <div className="section-header">
        <h2>Certificates & Honors</h2>
        <p className="subtitle">Validating excellence through formal recognition and leadership</p>
      </div>

      <div className="certificates-grid">
        {certificates.map((cert, index) => {
          const certImg = cert.imageUrl || cert.image;
          return (
            <div key={index} className={`cert-card ${certImg ? 'has-image' : ''}`}>
              {certImg && (
                <div className="cert-image-wrap">
                  <img 
                    src={certImg} 
                    alt={cert.title} 
                    className="cert-preview-img"
                    loading="lazy"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                </div>
              )}
              <div className="cert-content">
                <div className="cert-card-top-row">
                  <div className="cert-icon-box">{cert.icon || '🏅'}</div>
                  <span className="cert-type-badge">{cert.type || 'Recognition'}</span>
                </div>
                <h3>{cert.title}</h3>
                <p className="cert-issuer">Issued by: <strong>{cert.issuer}</strong></p>
                <p className="cert-desc">{cert.description || cert.desc}</p>
                {cert.link && (
                  <a 
                    href={cert.link} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="cert-link-btn"
                  >
                    View Credential <span>→</span>
                  </a>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Certificates;