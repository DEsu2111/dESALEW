# Getting Started with Your Portfolio Website

Congratulations! You now have a full-stack portfolio website with React.js frontend, Node.js backend, and MongoDB database integration.

## What's Included

### Frontend (React.js)
- Modern, responsive design
- Project showcase section
- About section with skills
- Contact form with validation
- Smooth animations and transitions

### Backend (Node.js + Express)
- RESTful API for projects and contact messages
- MongoDB integration with Mongoose
- CORS support for frontend communication
- Environment-based configuration

### Database (MongoDB)
- Project schema for storing project information
- Contact message schema for storing form submissions

## Prerequisites

Before you can run this portfolio, you'll need to install:

1. **Node.js** (version 14 or higher)
   - Download from [nodejs.org](https://nodejs.org/)
   - This will also install npm (Node Package Manager)

2. **MongoDB**
   - Option 1: Install MongoDB locally from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Option 2: Use MongoDB Atlas (cloud MongoDB service)

## Installation Steps

### 1. Install Frontend Dependencies

Open a terminal in the `frontend` directory and run:
```bash
npm install
```

### 2. Install Backend Dependencies

Open a terminal in the `backend` directory and run:
```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the `backend` directory:
```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/portfolio
NODE_ENV=development
```

If using MongoDB Atlas, replace the MONGODB_URI with your Atlas connection string.

### 4. Start MongoDB

If using local MongoDB:
- On Windows: Start the MongoDB service
- On Mac/Linux: Run `mongod` in a terminal

### 5. Seed the Database (Optional)

To add sample projects to your database:
```bash
cd backend
npm run seed
```

### 6. Run the Development Servers

You'll need two terminal windows:

**Terminal 1** (Backend):
```bash
cd backend
npm run dev
```

**Terminal 2** (Frontend):
```bash
cd frontend
npm run dev
```

### 7. View Your Portfolio

Open your browser and navigate to:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Customization Guide

### Update Personal Information
1. Open `frontend/src/App.jsx`
2. Replace "John Doe" with your name
3. Update the about section text
4. Modify contact information

### Add Your Own Projects
1. Use the API endpoints to add projects:
   - POST to http://localhost:5000/api/projects
2. Or use the seed file as a template:
   - Modify `backend/seed.js`
   - Run `npm run seed` in the backend directory

### Customize Styling
1. Modify `frontend/src/App.css` for global styles
2. Adjust colors, fonts, and spacing to match your preferences

### Update Skills
1. Edit the skills list in `frontend/src/App.jsx`

## Deployment

### Frontend Deployment Options
1. **Vercel** (Recommended for React apps)
2. **Netlify**
3. **GitHub Pages**

### Backend Deployment Options
1. **Heroku** (Easy integration with MongoDB Atlas)
2. **DigitalOcean App Platform**
3. **AWS Elastic Beanstalk**

### Database Deployment
1. **MongoDB Atlas** (Recommended cloud MongoDB service)

## Next Steps

1. Replace sample content with your actual projects
2. Add more sections (blog, testimonials, etc.)
3. Implement authentication for admin features
4. Add a CMS for easier content management
5. Optimize for SEO
6. Add analytics

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Change the PORT in `.env` file
   - Or kill the process using that port

2. **MongoDB connection failed**
   - Check if MongoDB is running
   - Verify your MONGODB_URI in `.env`

3. **CORS errors**
   - Ensure the backend server is running
   - Check the proxy settings in `vite.config.js`

4. **Dependencies not installing**
   - Delete `node_modules` folders and `package-lock.json` files
   - Run `npm install` again

### Getting Help

If you encounter issues:
1. Check the browser console for frontend errors
2. Check the terminal output for backend errors
3. Verify all services are running (MongoDB, backend, frontend)
4. Ensure all environment variables are set correctly

## Contributing

Feel free to customize this portfolio as you see fit. If you add features that might benefit others, consider contributing back to the community!

## Support

For questions about customizing or extending this portfolio, please open an issue on the repository.