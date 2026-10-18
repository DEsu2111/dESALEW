// Initial baseline data for auto-seeding MongoDB and for offline fallback mode

const initialProjects = [
  {
    title: "Fellowship Management System (Saas)",
    category: "SaaS & Cloud",
    description: "Production Level SaaS for all University fellowships to manage members, events, and resources.",
    technologies: ["Laravel", "MySQL", "Tailwind CSS", "Vanilla JS", "Blade"],
    imageUrl: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=1200&q=80"
    ],
    liveUrl: "http://fellow-managemnt-system.ct.ws/public/",
    githubUrl: "",
    order: 1
  },
  {
    title: "Hawassa Fellowship Management System",
    category: "Web Applications",
    description: "Test Level system for Hawassa University fellowship activities and member tracking.",
    technologies: ["Laravel", "MySQL", "Tailwind CSS", "Blade"],
    imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80"
    ],
    liveUrl: "https://hufellow.ct.ws/",
    githubUrl: "",
    order: 2
  },
  {
    title: "Tudo Novo Industrial Packaging System",
    category: "Enterprise Systems",
    description: "Factory management system for industrial packaging production and inventory (Sold project).",
    technologies: ["Nest.js", "Next.js", "PostgreSQL", "TypeScript"],
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=1200&q=80"
    ],
    liveUrl: "https://tudo-novo.ct.ws/public/",
    githubUrl: "",
    order: 3
  },
  {
    title: "TTM Technology Solution",
    category: "Business Systems",
    description: "Official web application for TTM Technology Solution services and company profile.",
    technologies: ["React", "Node.js", "MongoDB"],
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80"
    ],
    liveUrl: "https://ttm-tech-solutions.ct.ws/",
    githubUrl: "",
    order: 4
  },
  {
    title: "Maraki Digital Invitation",
    category: "E-Commerce",
    description: "Web application for creating and managing digital invitations with premium designs.",
    technologies: ["Tailwind CSS", "Blade", "Laravel", "MySQL"],
    imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1200&q=80"
    ],
    liveUrl: "https://ttm-tech-solutions.ct.ws/maraki-invitations/",
    githubUrl: "",
    order: 5
  },
  {
    title: "School Management System",
    category: "Education Platforms",
    description: "B.Sc. Thesis project: A comprehensive system for schools including student, teacher, and grade management.",
    technologies: ["PHP", "MySQL", "Tailwind CSS", "Vanilla JS"],
    imageUrl: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=1200&q=80"
    ],
    liveUrl: "https://school-systems.ct.ws/",
    githubUrl: "",
    order: 6
  },
  {
    title: "Hospital Management System",
    category: "Healthcare Systems",
    description: "Internship project: Managed patient records, doctor schedules, and billing information.",
    technologies: ["Laravel", "MySQL", "Tailwind CSS", "Vanilla JS"],
    imageUrl: "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80"
    ],
    githubUrl: "https://github.com/flybet-code/hms",
    liveUrl: "",
    order: 7
  },
  {
    title: "Ketero Appointment Scheduling",
    category: "Real-Time Applications",
    description: "Semester project: Web-based platform to streamline scheduling between clients and service providers.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    imageUrl: "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?auto=format&fit=crop&w=1200&q=80"
    ],
    githubUrl: "https://github.com/flybet-code/appointment",
    liveUrl: "",
    order: 8
  },
  {
    title: "Asgard Tour Guidance",
    category: "Mobile Apps",
    description: "Semester project: Web-based system designed to simplify travel planning and attraction browsing.",
    technologies: ["HTML", "CSS", "JavaScript", "PHP", "MySQL"],
    imageUrl: "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
    images: [
      "https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80",
      "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?auto=format&fit=crop&w=1200&q=80"
    ],
    githubUrl: "https://github.com/flybet-code/Asgard-Tour-",
    liveUrl: "",
    order: 9
  }
];

const initialSkills = [
  {
    title: 'Advanced Computer Skills',
    category: 'Productivity & Tooling',
    items: [
      'Microsoft Office Suite (Word, Excel, PowerPoint & Outlook)',
      'Google Workspace (Docs, Sheets, Slides, Forms, Drive)',
      'ChatGPT and other AI productivity tools',
      'Git, GitHub (Version control and collaboration)',
      'VS Code (Development environments)'
    ],
    order: 1
  },
  {
    title: 'Computer Maintenance Skills',
    category: 'Hardware & Systems',
    items: [
      'Installing and configuring Windows & Linux operating systems',
      'Troubleshooting hardware and software issues (desktop, pc & network)',
      'Virus removal and PC performance optimization',
      'Installation of drivers, office programs & common utilities',
      'Preventive maintenance and system backup techniques'
    ],
    order: 2
  },
  {
    title: 'Web Programming',
    category: 'Full-Stack Development',
    items: [
      'Frontend: Blade, JavaScript, Vanilla JS, Tailwind CSS, React, Next.js',
      'Backend: PHP, Laravel, Node.js, Nest.js, Django',
      'Database: MySQL, MongoDB, PostgreSQL',
      'Building and maintaining dynamic websites and forms',
      'Responsive design principles for mobile-friendly development',
      'Understanding of web hosting and local server environments'
    ],
    order: 3
  },
  {
    title: 'Project Management Tools',
    category: 'Workflow & Collaboration',
    items: ['Jira, ClickUp'],
    order: 4
  },
  {
    title: 'Circuit Design & Analysis',
    category: 'Electrical Engineering',
    items: ['Analog & Digital Electronics', 'Circuit simulation using Multisim and Breadboard'],
    order: 5
  },
  {
    title: 'Embedded System & Microcontrollers',
    category: 'IoT & Hardware',
    items: ['Proteus and PIC microcontroller', 'Interfacing sensors, actuators, and displays'],
    order: 6
  },
  {
    title: 'Network & Communication System',
    category: 'Networking',
    items: [
      'Network fundamentals (IP addressing, routing)',
      'Wireless communication basics (modulation, transmission)',
      'IOT protocols and sensor networks'
    ],
    order: 7
  },
  {
    title: 'Project Development & Documentation',
    category: 'Engineering Process',
    items: ['Schematic and PCB design', 'Technical documentation and reporting', 'Team collaboration using Git/GitHub'],
    order: 8
  },
  {
    title: 'Computer Programming',
    category: 'Core Programming',
    items: ['Familiar with C, C++ and Python'],
    order: 9
  },
  {
    title: 'Design',
    category: 'Creative & UI/UX',
    items: ['Figma, Balsamiq, Adobe Photoshop/Illustrator'],
    order: 10
  },
  {
    title: 'Software Development',
    category: 'Software Architecture',
    items: [
      'UI Design and evaluation',
      'Software design specification with UML',
      'Software design lifecycle',
      'Design patterns'
    ],
    order: 11
  },
  {
    title: 'Operating Systems',
    category: 'Platforms',
    items: ['Windows, Mac, Linux'],
    order: 12
  }
];

const initialCertificates = [
  {
    title: 'INDICITOUS HACKATHON Organizers (#HACH ADDIS)',
    issuer: 'Indicitous Technology',
    description: 'Contribution to organizing the prestigious technology event in Addis Ababa.',
    link: 'https://drive.google.com/file/d/18fdoQRS0tOMkf-l_c2HHcZ_JAriVc/view?usp=sharing',
    icon: '🏆',
    type: 'Recognition',
    imageUrl: 'https://images.unsplash.com/photo-1579389083078-4e7018379f7e?auto=format&fit=crop&w=800&q=80',
    order: 1
  },
  {
    title: 'Horeb Digital Strategies Ministry Leader',
    issuer: 'Christian Fellowship',
    description: 'Served as Team Leader for over three years, managing digital initiatives and strategic leadership.',
    link: 'https://drive.google.com/file/d/1RiY0AyM-UgxHSj_6jmsnmabzZNowPe/view?usp=sharing',
    icon: '⚔️',
    type: 'Leadership',
    imageUrl: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80',
    order: 2
  },
  {
    title: 'Volunteer Teacher Recognition',
    issuer: 'Community Education Program',
    description: 'Certificate of recognition for volunteering as a make-up teacher for students.',
    link: 'https://drive.google.com/file/d/1xAc8WCBuBeGWSgMYeggaN7EcHyiz3prf/view?=sharing',
    icon: '📚',
    type: 'Volunteer',
    imageUrl: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    order: 3
  },
  {
    title: 'INDICITOUS HACKATHON Organizers (#HACH HAWASSA)',
    issuer: 'Indicitous Technology',
    description: 'Successful contribution to organizing the technology hackathon event in Hawassa city.',
    link: 'https://drive.google.com/file/d/13EsWcr5FyfCqIWnmR3Za3GOUCHRIa/view?usp=sharing',
    icon: '🏅',
    type: 'Recognition',
    imageUrl: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80',
    order: 4
  },
  {
    title: 'Digital Strategies Missionary',
    issuer: 'Great Commission Ministry',
    description: 'Over three years of dedicated service in the digital strategies missionary program.',
    link: 'https://drive.google.com/file/d/1eerbgy8UfDM89pcfcUTFVoca2xJYs/view?usp=sharing',
    icon: '🌐',
    type: 'Service',
    imageUrl: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    order: 5
  },
  {
    title: 'Customer Service Training Completion Certificate',
    issuer: 'Rori Hotel Hawassa',
    description: 'Successful completion of 4 hrs intensive professional customer service and hospitality training.',
    link: '#',
    icon: '🏨',
    type: 'Professional',
    imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80',
    order: 6
  }
];

const initialReferences = [
  {
    name: 'Mr. Alemayehu Cheru',
    position: 'Head of Electrical & Computer Engineering Department',
    organization: 'Hawassa University — Institute of Technology',
    location: 'Hawassa, Ethiopia',
    phone: '+251 913 96 1344',
    email: 'alemayehu.cheru0236@gmail.com',
    tag: 'Academic Reference',
    relationship: 'Department Head & Senior Academic Advisor (2020 – 2025)',
    note: 'Can attest to my academic performance (3.36 CGPA with Distinction), engineering rigor in IoT and Embedded Systems, laboratory research, and hardware-software system design.',
    areas: ['Electrical & Computer Eng.', 'IoT & Embedded Systems', 'Academic Excellence', 'System R&D'],
    order: 1
  },
  {
    name: 'Mr. Musa Hayato',
    position: 'Lecturer, Computer Engineering Stream',
    organization: 'Hawassa University — Institute of Technology',
    location: 'Hawassa, Ethiopia',
    phone: '+251 920 715 314',
    email: 'musahayato@gmail.com',
    tag: 'Academic & Capstone Advisor',
    relationship: 'Course Instructor (Data Structures & Algorithms) & B.Sc. Thesis Supervisor (2020 – 2025)',
    note: 'Supervised Desalew\'s B.Sc. capstone project "Patient Management System" (Grade A+) and taught Data Structures and Algorithms, commending his dedication, academic potential, and conscientiousness.',
    areas: ['Data Structures & Algorithms', 'B.Sc. Thesis Project', 'Software Architecture', 'Academic Rigor'],
    order: 2
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
    areas: ['Team Leadership', 'Digital Strategy', 'Project Delivery', 'Technical Mentorship'],
    order: 3
  }
];

const initialMessages = [
  {
    _id: 'mock-msg-1',
    name: 'Samuel Alemu',
    email: 'samuel.alemu@example.com',
    phone: '+251 911 234 567',
    message: 'Hello Desalew, I reviewed your portfolio and would like to discuss a web application project for our organization.',
    status: 'unread',
    createdAt: new Date().toISOString()
  },
  {
    _id: 'mock-msg-2',
    name: 'Helen Tadesse',
    email: 'helen.t@startup.et',
    phone: '+251 922 456 789',
    message: 'Hi! We are looking for an experienced software engineer to help build our SaaS platform with Laravel and React.',
    status: 'pending',
    createdAt: new Date(Date.now() - 86400000).toISOString()
  }
];

const initialProfile = {
  fullName: 'Desalew Alganeh',
  headline: 'Electrical & Computer Engineer • Full Stack Developer',
  location: 'Addis Ababa, Ethiopia',
  phone: '+251 962 622 111',
  email: 'desu6262@gmail.com',
  telegram: 'https://t.me/desu6262',
  github: 'https://github.com/flybet-code',
  linkedin: 'https://linkedin.com/in/desalew-alganeh',
  bio: 'Graduated in Electrical and Computer Engineering. Passionate about architecting scalable full-stack applications, enterprise SaaS solutions, and modern software architectures.'
};

module.exports = {
  initialProjects,
  initialSkills,
  initialCertificates,
  initialReferences,
  initialMessages,
  initialProfile
};

