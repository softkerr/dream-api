#!/bin/bash

# Dream API - Quick Setup Script
# This script helps you quickly set up the Dream API project

set -e

echo "🚀 Dream API - Quick Setup"
echo "=========================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js 18+ from https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✓${NC} Node.js $(node -v) detected"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed${NC}"
    exit 1
fi

echo -e "${GREEN}✓${NC} npm $(npm -v) detected"

# Ask user for setup type
echo ""
echo "Choose setup type:"
echo "1) Docker (Recommended - includes PostgreSQL)"
echo "2) Local (Requires PostgreSQL installed)"
read -p "Enter choice [1-2]: " setup_choice

if [ "$setup_choice" == "1" ]; then
    # Docker setup
    if ! command -v docker &> /dev/null; then
        echo -e "${RED}❌ Docker is not installed${NC}"
        echo "Please install Docker from https://docs.docker.com/get-docker/"
        exit 1
    fi
    
    echo -e "${GREEN}✓${NC} Docker detected"
    
    # Create .env if it doesn't exist
    if [ ! -f .env ]; then
        echo ""
        echo "📝 Creating .env file..."
        cp .env.example .env
        echo -e "${GREEN}✓${NC} .env file created"
        echo -e "${YELLOW}⚠${NC}  Please update .env with your settings before starting"
    fi
    
    echo ""
    echo "🐳 Starting Docker containers..."
    docker-compose up -d
    
    echo ""
    echo "⏳ Waiting for database to be ready..."
    sleep 10
    
    echo ""
    echo "🔄 Running database migrations..."
    docker-compose exec app npx prisma migrate deploy
    
    echo ""
    read -p "Do you want to seed the database with sample data? (y/n): " seed_choice
    if [ "$seed_choice" == "y" ]; then
        echo "🌱 Seeding database..."
        docker-compose exec app npm run prisma:seed
    fi
    
    echo ""
    echo -e "${GREEN}✅ Setup complete!${NC}"
    echo ""
    echo "🌐 Your API is running at:"
    echo "   - API: http://localhost:3000/api/v1"
    echo "   - Docs: http://localhost:3000/api/docs"
    echo "   - pgAdmin: http://localhost:5050 (admin@example.com / admin)"
    echo ""
    echo "📧 Default users (if seeded):"
    echo "   - Admin: admin@example.com / password123"
    echo "   - User: user@example.com / password123"
    echo ""
    echo "🛑 To stop: docker-compose down"
    echo "📋 View logs: docker-compose logs -f app"

elif [ "$setup_choice" == "2" ]; then
    # Local setup
    echo ""
    echo "📦 Installing dependencies..."
    npm install
    
    # Create .env if it doesn't exist
    if [ ! -f .env ]; then
        echo ""
        echo "📝 Creating .env file..."
        cp .env.example .env
        echo -e "${GREEN}✓${NC} .env file created"
        echo ""
        echo -e "${YELLOW}⚠${NC}  IMPORTANT: Please update .env with your PostgreSQL connection details"
        echo ""
        read -p "Press enter when you've updated the .env file..."
    fi
    
    echo ""
    echo "🔄 Generating Prisma client..."
    npx prisma generate
    
    echo ""
    echo "🗄️  Running database migrations..."
    npx prisma migrate deploy
    
    echo ""
    read -p "Do you want to seed the database with sample data? (y/n): " seed_choice
    if [ "$seed_choice" == "y" ]; then
        echo "🌱 Seeding database..."
        npm run prisma:seed
    fi
    
    echo ""
    echo -e "${GREEN}✅ Setup complete!${NC}"
    echo ""
    echo "🚀 To start the development server:"
    echo "   npm run start:dev"
    echo ""
    echo "🌐 API will be available at:"
    echo "   - API: http://localhost:3000/api/v1"
    echo "   - Docs: http://localhost:3000/api/docs"
    echo ""
    echo "📧 Default users (if seeded):"
    echo "   - Admin: admin@example.com / password123"
    echo "   - User: user@example.com / password123"

else
    echo -e "${RED}Invalid choice${NC}"
    exit 1
fi

echo ""
echo "📚 Documentation:"
echo "   - README.md - Getting started guide"
echo "   - API.md - Complete API reference"
echo "   - DEPLOYMENT.md - Production deployment guide"
echo "   - PROJECT_OVERVIEW.md - Architecture overview"
echo ""
echo "🎉 Happy coding!"
