-- ============================================================
-- Database Schema for Portfolio Website (dESALEW / Betsegaw)
-- Compatible with PostgreSQL (Neon, Supabase, Render Postgres)
-- and MySQL (PlanetScale, Aiven, Railway, Hostinger)
-- ============================================================

-- Drop existing tables if re-initializing
DROP TABLE IF EXISTS contact_messages;
DROP TABLE IF EXISTS projects;

-- ------------------------------------------------------------
-- 1. Projects Table
-- Stores portfolio showcase projects
-- ------------------------------------------------------------
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    technologies JSONB DEFAULT '[]'::jsonb, -- Array of tech tags (stored as JSON)
    image_url VARCHAR(500),
    live_url VARCHAR(500),
    github_url VARCHAR(500),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index on creation date for fast sorting
CREATE INDEX idx_projects_created_at ON projects(created_at DESC);

-- ------------------------------------------------------------
-- 2. Contact Messages Table
-- Stores contact form submissions from visitors
-- ------------------------------------------------------------
CREATE TABLE contact_messages (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(50),
    message TEXT NOT NULL,
    status VARCHAR(20) DEFAULT 'unread' CHECK (status IN ('unread', 'pending', 'confirmed', 'canceled')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Index on status and created_at for dashboard filtering
CREATE INDEX idx_contact_messages_status ON contact_messages(status);
CREATE INDEX idx_contact_messages_created_at ON contact_messages(created_at DESC);
