# My Portfolio Website

A full-stack portfolio website built with React.js (Frontend), Node.js (Backend), and MongoDB (Database).

## Features

- Responsive design that works on all devices
- Project showcase with detailed descriptions
- Contact form with backend integration
- RESTful API for project management
- Modern UI with smooth animations

## Tech Stack

- **Frontend**: React.js, CSS3
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Deployment**: (Can be deployed to services like Heroku, Vercel, or Netlify)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v14 or higher)
- MongoDB (local installation or MongoDB Atlas account)
- npm or yarn package manager

## Setup Instructions

### 1. Frontend Setup

Navigate to the frontend directory:
```bash
cd frontend
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The frontend will run on http://localhost:3000

### 2. Backend Setup

Navigate to the backend directory:
```bash
cd backend
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The backend will run on http://localhost:5000

### 3. Database Seeding

To populate the database with sample projects:
```bash
cd backend
npm run seed
```

### 4. Environment Variables

Create a `.env` file in the backend directory with the following variables:
```
PORT=5000
MONGODB_URI=your_mongodb_connection_string
NODE_ENV=development
```

## Project Structure

```
portfolio/
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   ├── server.js
│   ├── seed.js
│   ├── package.json
│   └── .env
│
└── README.md
```

## API Endpoints

### Projects
- `GET /api/projects` - Get all projects
- `GET /api/projects/:id` - Get a specific project
- `POST /api/projects` - Create a new project
- `PUT /api/projects/:id` - Update a project
- `DELETE /api/projects/:id` - Delete a project

### Contact Messages
- `POST /api/contact` - Submit a contact message

## Deployment

### Frontend
1. Build the React app:
   ```bash
   cd frontend
   npm run build
   ```

### Backend
1. Set NODE_ENV to production in your environment variables
2. Deploy to your preferred hosting platform

## Customization

To customize this portfolio for your own use:

1. Update the personal information in `frontend/src/App.jsx`
2. Modify the styling in `frontend/src/App.css`
3. Add your own projects to the database
4. Update contact information
5. Add your own social media links

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.