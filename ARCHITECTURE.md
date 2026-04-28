# Portfolio Website Architecture

## System Overview

```mermaid
graph TD
    A[Client Browser] --> B[React Frontend]
    B --> C[Express Backend API]
    C --> D[MongoDB Database]
    
    subgraph Frontend
        B
    end
    
    subgraph Backend
        C
    end
    
    subgraph Database
        D
    end
```

## Component Details

### Frontend (React.js)
- Built with Vite for fast development
- Responsive design using CSS Grid and Flexbox
- Components:
  - Header/Navigation
  - Hero Section
  - Projects Showcase
  - About Section
  - Contact Form
  - Footer

### Backend (Node.js + Express)
- RESTful API endpoints
- MongoDB integration with Mongoose ODM
- CORS enabled for frontend communication
- Environment-based configuration

### Database (MongoDB)
- Two collections:
  - Projects: Stores project information
  - ContactMessages: Stores contact form submissions

## Data Flow

1. User visits the website
2. React frontend loads and makes API requests to backend
3. Express backend receives requests and queries MongoDB
4. Data is returned to frontend and displayed to user
5. User interactions (form submissions) are sent to backend
6. Backend saves data to MongoDB

## Deployment Architecture

```mermaid
graph TD
    A[User] --> B[Load Balancer/Web Server]
    B --> C[Frontend Static Files]
    B --> D[Backend API Server]
    D --> E[MongoDB Database]
    
    subgraph Server
        B
        C
        D
        E
    end
```