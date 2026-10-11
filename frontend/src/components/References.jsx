import React from 'react';

const referenceData = [
  {
    name: 'Mr. Alemayehu Cheru',
    position: 'Head of Electrical & Computer Engineering Department',
    organization: 'Hawassa University — Institute of Technology',
    location: 'Hawassa, Ethiopia',
    phone: '+251 913 96 1344',
    email: 'alemayehu.cheru0236@gmail.com',
    tag: 'Academic Reference',
    relationship: 'Department Head & Senior Academic Advisor (2019 – 2025)',
    note: 'Can attest to my academic performance (3.50 CGPA / 3.85 Peak GPA), engineering rigor in IoT and Embedded Systems, laboratory research, and B.Sc. capstone project execution.',
    areas: ['Electrical & Computer Eng.', 'IoT & Embedded Systems', 'Academic Excellence', 'Capstone Research']
  },
  {
    name: 'Mr. Samson Usmael',
    position: 'Digital Strategy Director (GCME)',
    organization: 'Great Commission Ministry Ethiopia',
    location: 'Addis Ababa, Ethiopia',
    phone: '+251 900 50 7050',
    email: 'contact@gcmethiopia.org',
    tag: 'Professional & Leadership Reference',
    relationship: 'Executive Supervisor — Digital Strategies & Media (2021 – 2025)',
    note: 'Can vouch for my 3+ years of team leadership, digital strategy execution, full-stack technical coordination, multimedia production, and mentoring of technical volunteers.',
    areas: ['Team Leadership', 'Digital Strategy', 'Project Delivery', 'Technical Mentorship']
  }
];

const References = () => {
  const [references] = React.useState(() => {
    try {
      const saved = localStorage.getItem('adminReviewsList');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {}
    return referenceData;
  });

  return (
    <section id="references" className="references-page-clean">
      <div className="ref-clean-header">
        <span className="ref-clean-eyebrow">Verified Endorsements</span>
        <h2>Professional &amp; Academic References</h2>
        <p className="ref-clean-subtitle">
          Senior academic and executive leaders who have directly supervised my engineering education, technical
          projects, and organizational leadership.
        </p>
      </div>

      <div className="ref-directory-list">
        {references.map((ref, index) => {
          const indexNum = String(index + 1).padStart(2, '0');
          const areas = Array.isArray(ref.areas) && ref.areas.length > 0
            ? ref.areas
            : ['Technical Competence', 'Professional Integrity', 'Team Collaboration'];

          return (
            <article key={index} className="ref-directory-row">
              {/* Column 1: Index & Category Badge */}
              <div className="ref-dir-index-col">
                <span className="ref-dir-number">{indexNum}</span>
                <div className="ref-dir-badges">
                  <span className="ref-dir-tag">{ref.tag || 'Verified Reference'}</span>
                  <span className="ref-dir-verified">✓ Verified Referee</span>
                </div>
              </div>

              {/* Column 2: Referee Identity, Relationship & Endorsement Scope */}
              <div className="ref-dir-main-col">
                <h3 className="ref-dir-name">{ref.name}</h3>
                <p className="ref-dir-role">
                  <strong>{ref.position}</strong>
                  <span className="ref-dir-sep">•</span>
                  <span>{ref.organization}</span>
                </p>
                {ref.relationship && (
                  <p className="ref-dir-relation">
                    <span>Relationship:</span> {ref.relationship}
                  </p>
                )}
                <blockquote className="ref-dir-quote">
                  {ref.note ||
                    'Available to provide formal verification of technical proficiency, engineering project delivery, and professional conduct.'}
                </blockquote>
                <div className="ref-dir-areas">
                  {areas.map((area) => (
                    <span key={area} className="ref-dir-area-pill">{area}</span>
                  ))}
                </div>
              </div>

              {/* Column 3: Direct Contact Channels */}
              <div className="ref-dir-contact-col">
                <div className="ref-dir-contact-item">
                  <span className="ref-dir-contact-label">Direct Phone</span>
                  {ref.phone ? (
                    <a href={`tel:${ref.phone.replace(/\s/g, '')}`} className="ref-dir-contact-val">
                      {ref.phone}
                    </a>
                  ) : (
                    <span className="ref-dir-contact-val">Available on request</span>
                  )}
                </div>

                <div className="ref-dir-contact-item">
                  <span className="ref-dir-contact-label">Official Email</span>
                  {ref.email ? (
                    <a href={`mailto:${ref.email}`} className="ref-dir-contact-val">
                      {ref.email}
                    </a>
                  ) : (
                    <span className="ref-dir-contact-val">Available on request</span>
                  )}
                </div>

                <div className="ref-dir-contact-item">
                  <span className="ref-dir-contact-label">Location</span>
                  <span className="ref-dir-contact-val">{ref.location || 'Ethiopia'}</span>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Formal Declaration Ledger (No Background) */}
      <div className="ref-declaration-ledger">
        <div className="ref-decl-left">
          <span className="ref-decl-badge">Official Statement of Authenticity</span>
          <h3>Declaration</h3>
          <p>
            I hereby declare that the academic credentials, technical experience, and professional references presented
            in this portfolio are true, complete, and accurate to the best of my knowledge.
          </p>
        </div>

        <div className="ref-decl-right">
          <div className="ref-decl-meta">
            <span>Location</span>
            <strong>Addis Ababa, Ethiopia</strong>
          </div>
          <div className="ref-decl-signature">
            <span className="ref-sig-label">Authorized Signature</span>
            <span className="ref-sig-name">Desalew Alganeh</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default References;

