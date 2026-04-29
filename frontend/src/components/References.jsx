import React from 'react';

const referenceData = [
  {
    name: 'Mr. Alemayehu Cheru',
    position: 'Electrical Engineering Department Head',
    organization: 'Hawassa University',
    phone: '+2519 13 96 1344',
    email: 'alemayehu.cheru0236@gmail.com',
    icon: '👨‍🏫',
    tag: 'Academic'
  },
  {
    name: 'Samson Usmael',
    position: 'Digital Strategy Director GCME',
    organization: 'Great Commission Ministry Ethiopia',
    phone: '+2519 00507050',
    email: 'contact@gcmethiopia.org',
    icon: '🏢',
    tag: 'Professional'
  }
];

const References = () => {
  return (
    <section className="references-page">
      <div className="section-header">
        <h2>Professional References</h2>
        <p className="subtitle">Verified individuals who can attest to my technical and leadership capabilities</p>
      </div>

      <div className="references-grid">
        {referenceData.map((ref, index) => (
          <div key={index} className="ref-card">
            <div className="ref-avatar">{ref.icon}</div>
            <div className="ref-content">
              <span className="ref-tag">{ref.tag}</span>
              <h3>{ref.name}</h3>
              <p className="ref-position">{ref.position}</p>
              <p className="ref-org">{ref.organization}</p>
              <div className="ref-contact">
                <a href={`tel:${ref.phone.replace(/\s/g, '')}`} className="contact-link">📞 {ref.phone}</a>
                <a href={`mailto:${ref.email}`} className="contact-link">📧 {ref.email}</a>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="declaration-card">
        <div className="declaration-icon">📜</div>
        <div className="declaration-content">
          <h3>Official Declaration</h3>
          <p>
            I declare that the detailed information provided in this portfolio is complete 
            and accurate to describe my qualifications and experience.
          </p>
          <div className="signature-box">
            <p className="signature-label">Signature</p>
            <p className="signature-text">Desalew Aleganhe</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default References;
