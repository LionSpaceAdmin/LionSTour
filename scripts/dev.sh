#!/bin/bash

# LionSTour Development Server
echo "🦁 Starting LionSTour development server..."

# Check if .env file exists
if [ ! -f .env ]; then
    echo "Creating .env file from .env.example..."
    cp .env.example .env
    echo "⚠️  Please update .env with your actual environment variables"
fi

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    pnpm install
fi

# Generate Prisma client
echo "Generating Prisma client..."
pnpm run db:generate

# Start the development server
echo "Starting Next.js development server on http://localhost:3000"
pnpm run dev