import React from 'react';

const certificateData = [
  {
    title: 'INDICITOUS HACKATHON Organizers (#HACH ADDIS)',
    issuer: 'Indicitous Technology',
    description: 'Contribution to organizing the prestigious technology event in Addis Ababa.',
    link: 'https://drive.google.com/file/d/18fdoQRS0tOMkf-l_c2HHcZ_JAriVc/view?usp=sharing',
    icon: '🏆',
    type: 'Recognition'
  },
  {
    title: 'Horeb Digital Strategies Ministry Leader',
    issuer: 'Christian Fellowship',
    description: 'Served as Team Leader for over three years, managing digital initiatives and strategic leadership.',
    link: 'https://drive.google.com/file/d/1RiY0AyM-UgxHSj_6jmsnmabzZNowPe/view?usp=sharing',
    icon: '⚔️',
    type: 'Leadership'
  },
  {
    title: 'Volunteer Teacher Recognition',
    issuer: 'Community Education Program',
    description: 'Certificate of recognition for volunteering as a make-up teacher for students.',
    link: 'https://drive.google.com/file/d/1xAc8WCBuBeGWSgMYeggaN7EcHyiz3prf/view?=sharing',
    icon: '📚',
    type: 'Volunteer'
  },
  {
    title: 'INDICITOUS HACKATHON Organizers (#HACH HAWASSA)',
    issuer: 'Indicitous Technology',
    description: 'Successful contribution to organizing the technology hackathon event in Hawassa city.',
    link: 'https://drive.google.com/file/d/13EsWcr5FyfCqIWnmR3Za3GOUCHRIa/view?usp=sharing',
    icon: '🏅',
    type: 'Recognition'
  },
  {
    title: 'Digital Strategies Missionary',
    issuer: 'Great Commission Ministry',
    description: 'Over three years of dedicated service in the digital strategies missionary program.',
    link: 'https://drive.google.com/file/d/1eerbgy8UfDM89pcfcUTFVoca2xJYs/view?usp=sharing',
    icon: '🌐',
    type: 'Service'
  }
];

const Certificates = () => {
  return (
    <section className="certificates-page">
      <div className="section-header">
        <h2>Certificates & Honors</h2>
        <p className="subtitle">Validating excellence through formal recognition and leadership</p>
      </div>

      <div className="certificates-grid">
        {certificateData.map((cert, index) => (
          <div key={index} className="cert-card">
            <div className="cert-icon-box">{cert.icon}</div>
            <div className="cert-content">
              <span className="cert-type-badge">{cert.type}</span>
              <h3>{cert.title}</h3>
              <p className="cert-issuer">Issued by: <strong>{cert.issuer}</strong></p>
              <p className="cert-desc">{cert.description}</p>
              <a 
                href={cert.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="cert-link-btn"
              >
                View Credential <span>→</span>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Certificates;