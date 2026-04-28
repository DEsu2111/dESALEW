import React from 'react';

const Resume = () => {
  return (
    <section id="resume" className="contact">
      <h2>Resume</h2>
      <div className="contact-content">
        <div className="contact-info">
          <h3>Download My Resume</h3>
          <p>Feel free to download and review my complete resume to learn more about my qualifications and experience.</p>
          <div className="social-links">
            <a
              href="/resume.pdf"
              className="social-link"
              target="_blank"
              rel="noopener noreferrer">
              Download Resume (PDF)
            </a>
          </div>

          <h3>Contact Information</h3>
          <div className="contact-details">
            <p><strong>Full Name:</strong> Desalew Aleganhe</p>
            <p><strong>Location:</strong> Addis Ababa, ET</p>
            <p><strong>Email:</strong> <a href="mailto:desu6262@gmail.com">desu6262@gmail.com</a></p>
            <p><strong>Phone:</strong> +251-9626-22111 | +251-5517-2057</p>
            <p><strong>Telegram:</strong> <a href="https://t.me/desu6262" target="_blank" rel="noopener noreferrer">@desu6262</a></p>
            <p><strong>LinkedIn:</strong> <a href="https://linkedin.com/in/desalew-aleganeh" target="_blank" rel="noopener noreferrer">in/desalew-aleganeh</a></p>
            <p><strong>GitHub:</strong> <a href="https://github.com/DEsu2111" target="_blank" rel="noopener noreferrer">dESALEW</a></p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;
