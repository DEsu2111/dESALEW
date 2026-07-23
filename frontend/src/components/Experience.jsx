import React from 'react';

const Experience = () => {
  return (
    <section id="experience" className="experience">
      <h2>Work Experience</h2>
      <div className="experience-content">
        <div className="experience-item">
          <h3>Full-Stack iGaming Developer</h3>
          <p><strong>Company:</strong> Independent Production Frameworks<br />
            <strong>Duration:</strong> 2025 – Present (Active) | Addis Ababa, Ethiopia</p>
          <ul>
            <li>Actively developing and maintaining production-grade, fully functioning real-time web games including Bingo, Keno, Aviator, and Chicken Road architectures.</li>
            <li>Architected unified, multi-tenant operator dashboards allowing isolated multi-game database management, deep user analytics, and platform permission hierarchies.</li>
            <li>Optimized real-time state synchronization over WebSocket protocols using Socket.IO, minimizing network packet size to preserve performance under high concurrent loads.</li>
            <li>Utilized Redis for in-memory game state tracking, high-speed connection session storage, and data caching to prevent database bottlenecks.</li>
            <li>Integrated resilient financial flows and local payment options (Telebirr, M-PESA) for instantaneous balance updates and bet validation.</li>
          </ul>
        </div>

        <div className="experience-item">
          <h3>Engineering Intern</h3>
          <p><strong>Duration:</strong> March 2025 – June 2025 | Addis Ababa, Ethiopia</p>
          <ul>
            <li>Acquired practical hardware/software training and system architecture foundations as part of the Computer Engineering path.</li>
          </ul>
        </div>

        <div className="experience-item">
          <h3>TTM Technology Solutions</h3>
          <p><strong>Position:</strong> Full Stack Developer (Part-time)<br />
            <strong>Duration:</strong> 2024 -- Present | Addis Ababa, ET</p>
          <ul>
            <li>Developing and maintaining full-stack web applications using Laravel, React, and other modern technologies.</li>
            <li>Collaborating with the team to deliver high-quality software solutions and digital products.</li>
            <li>Focusing on creating responsive, user-friendly interfaces and robust backend systems.</li>
          </ul>
        </div>

        <div className="experience-item">
          <h3>Metehara Sugar Factory – Fixed Asset Inventory & ICT Office</h3>
          <p><strong>Position:</strong> Data Entry & Reporting Assistant<br />
            <strong>Duration:</strong> June 15, 2024 – September 10, 2024</p>
          <ul>
            <li>Performed accurate data entry and updates related to fixed assets and inventory records</li>
            <li>Assisted in compiling and formatting reports for internal use and audits</li>
            <li>Conducted basic data analysis using Excel to support asset tracking and reporting</li>
            <li>Supported the ICT office in organizing digital files and maintaining data integrity</li>
            <li>Collaborated with team members to ensure timely and accurate reporting of asset status</li>
            <li>Helped with organizing and preparing inventory reports for internal use and audits</li>
          </ul>
        </div>

        <div className="experience-item">
          <h3>Hawassa University – Head Office</h3>
          <p><strong>Position:</strong> IT & Maintenance Intern<br />
            <strong>Duration:</strong> February 2024 – April 2024 | Hawassa, Ethiopia</p>
          <ul>
            <li>Gained hands-on experience in computer maintenance, including Windows OS installation, hardware troubleshooting, and repairing printers and desktop computers</li>
            <li>Assisted in identifying and resolving both software and hardware errors to maintain system functionality across departments</li>
            <li>Participated in LAN networking activities, including the setup and configuration of switches, hubs, and local area connections</li>
            <li>Worked closely with the university's IT team to support daily tech operations and equipment upkeep</li>
            <li>Developed strong teamwork and communication skills by collaborating with technical staff and contributing to group tasks</li>
          </ul>
        </div>

        <div className="experience-item">
          <h3>Horeb Digital Strategies Ministry – Christian Fellowship, Volunteer Work</h3>
          <p><strong>Duration:</strong> 2021 – 2025</p>

          <h4>Team Leader Role (2022-2025):</h4>
          <ul>
            <li>Led a team of volunteers in planning and executing digital evangelism strategies over a 3-year period</li>
            <li>Oversaw team coordination, delegated responsibilities, and ensured timely completion of ministry projects</li>
            <li>Mentored new members on ministry responsibilities, teamwork, and leadership development</li>
            <li>Facilitated weekly planning meetings and collaborated with church leadership to align ministry goals</li>
          </ul>

          <h4>Digital Media Coordinator Role (2021-2024):</h4>
          <ul>
            <li>Designed promotional and spiritual content using Adobe Photoshop, Illustrator, and PixelLab</li>
            <li>Edited video content for sermons, church events, and outreach programs using Adobe Premiere Pro and CapCut</li>
            <li>Managed and grew social media platforms (Facebook, Telegram, YouTube), increasing follower engagement and digital outreach</li>
            <li>Trained new team members on basic graphic design tools and digital content creation workflows</li>
            <li>Aligned digital media strategies with overall fellowship goals to enhance communication and visibility</li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Experience;
