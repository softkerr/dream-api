# Dream API

## 📦 Prerequisites

- Node.js >= 18.x
- npm >= 9.x
- PostgreSQL >= 15.x
- Docker & Docker Compose (optional)

## 🔧 Installation

### Local Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd dream-api

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update .env with your database credentials and secrets

# Generate Prisma Client
npm run prisma:generate

# Run database migrations
npm run prisma:migrate

# Seed the database (optional)
npm run prisma:seed
```

### Docker Setup

```bash
# Copy environment file
cp .env.example .env

# Start all services
docker-compose up -d

# View logs
docker-compose logs -f app

# Stop services
docker-compose down
```

## 🔐 Environment Variables

Create a `.env` file in the root directory:

```env
# Application
NODE_ENV=development
PORT=3000
API_PREFIX=api/v1

# Database
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/dream_api?schema=public"

# JWT Authentication
JWT_ACCESS_SECRET=your-super-secret-access-key-change-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-in-production
JWT_ACCESS_EXPIRATION=15m
JWT_REFRESH_EXPIRATION=7d

# Security
BCRYPT_ROUNDS=10

# CORS
CORS_ORIGIN=http://localhost:3000
```

## 🚀 Running the Application

### Development Mode

```bash
# Start with hot-reload
npm run start:dev

# Start in debug mode
npm run start:debug
```

### Production Mode

```bash
# Build the application
npm run build

# Start production server
npm run start:prod
```

### With Docker

```bash
# Development
docker-compose up

# Production
docker-compose -f docker-compose.prod.yml up -d
```

The API will be available at:
- **API**: http://localhost:3000/api/v1
- **Swagger Docs**: http://localhost:3000/api/docs
- **pgAdmin** (Docker only): http://localhost:5050

Default credentials (from seed):
- **Admin**: admin@example.com / password123
- **User**: user@example.com / password123

## 📚 API Documentation

Interactive API documentation is available via Swagger UI at `/api/docs` when the server is running.

## 🗄️ Database

### Migrations

```bash
# Create a new migration
npm run prisma:migrate

# Deploy migrations to production
npm run prisma:migrate:prod

# Open Prisma Studio (Database GUI)
npm run prisma:studio
```

### Seeding

```bash
# Seed the database with initial data
npm run prisma:seed
```

## 🧪 Testing

```bash
# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run e2e tests
npm run test:e2e
```

## 🌐 Deployment

### Docker Deployment

1. **Build and push Docker image**:
```bash
docker build -t your-username/dream-api:latest .
docker push your-username/dream-api:latest
```

2. **Deploy on server**:
```bash
# On your server
git clone <your-repo>
cd dream-api

# Create .env file with production values
cp .env.example .env
# Edit .env with production credentials

# Start with production compose file
docker-compose -f docker-compose.prod.yml up -d

# Run migrations
docker-compose -f docker-compose.prod.yml exec app npx prisma migrate deploy
```

### Manual Deployment

1. **Build the application**:
```bash
npm run build
```

2. **Set environment variables** on your server

3. **Run migrations**:
```bash
npm run prisma:migrate:prod
```

4. **Start the application**:
```bash
npm run start:prod
```

### Using PM2 (Process Manager)

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start dist/main.js --name dream-api

# Save PM2 configuration
pm2 save

# Setup PM2 to start on boot
pm2 startup
```

## 📖 API Examples

### Authentication

#### Sign Up
```bash
curl -X POST http://localhost:3000/api/v1/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "email": "newuser@example.com",
    "password": "password123",
    "firstName": "John",
    "lastName": "Doe"
  }'
```

Response:
```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIs...",
  "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": "uuid",
    "email": "newuser@example.com",
    "firstName": "John",
    "lastName": "Doe",
    "role": "USER"
  }
}
```

#### Login
```bash
curl -X POST http://localhost:3000/api/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123"
  }'
```

#### Refresh Token
```bash
curl -X POST http://localhost:3000/api/v1/auth/refresh \
  -H "Content-Type: application/json" \
  -d '{
    "refreshToken": "your-refresh-token"
  }'
```

### Users

#### Get All Users (Admin only)
```bash
curl -X GET http://localhost:3000/api/v1/users?page=1&limit=10 \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

Response:
```json
{
  "data": [
    {
      "id": "uuid",
      "email": "user@example.com",
      "firstName": "John",
      "lastName": "Doe",
      "role": "USER",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "meta": {
    "total": 100,
    "page": 1,
    "limit": 10,
    "totalPages": 10
  }
}
```

### Domains

#### Create Domain
```bash
curl -X POST http://localhost:3000/api/v1/domains \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "example.com",
    "registrar": "GoDaddy",
    "expiresAt": "2025-12-31T00:00:00.000Z",
    "autoRenew": true
  }'
```

#### Get All Domains
```bash
curl -X GET http://localhost:3000/api/v1/domains?page=1&limit=10 \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

### Servers

#### Create Server
```bash
curl -X POST http://localhost:3000/api/v1/servers \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Production Server",
    "ipAddress": "192.168.1.100",
    "location": "US East",
    "provider": "AWS",
    "status": "ACTIVE"
  }'
```

### VPS

#### Create VPS
```bash
curl -X POST http://localhost:3000/api/v1/vps \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "VPS-001",
    "serverId": "server-uuid",
    "planName": "Basic Plan",
    "vcpus": 2,
    "ramGB": 4,
    "storageGB": 80,
    "status": "ACTIVE"
  }'
```

### Websites

#### Create Website
```bash
curl -X POST http://localhost:3000/api/v1/websites \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Website",
    "url": "https://example.com",
    "domainId": "domain-uuid",
    "serverId": "server-uuid",
    "sslEnabled": true
  }'
```

### Metrics

#### Record Metrics
```bash
curl -X POST http://localhost:3000/api/v1/metrics \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "serverId": "server-uuid",
    "requestCount": 1000,
    "cpuUsage": 45.5,
    "memoryUsage": 60.2,
    "diskUsage": 75.8,
    "uptime": 86400
  }'
```

### Analytics

#### Record Analytics Event
```bash
curl -X POST http://localhost:3000/api/v1/analytics \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "websiteId": "website-uuid",
    "eventType": "TRAFFIC",
    "eventName": "Page View",
    "eventData": {
      "page": "/home",
      "source": "google"
    },
    "trafficVolume": 1024.5
  }'
```

### Settings

#### Get Public Settings
```bash
curl -X GET http://localhost:3000/api/v1/settings/public
```

#### Create Global Setting (Admin only)
```bash
curl -X POST http://localhost:3000/api/v1/settings \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "key": "max_upload_size",
    "value": {"size": 10485760, "unit": "bytes"},
    "description": "Maximum file upload size",
    "isPublic": false
  }'
```

## 📁 Project Structure

```
dream-api/
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # GitHub Actions CI/CD
├── .husky/                    # Git hooks
│   ├── commit-msg             # Commitlint hook
│   └── pre-commit             # Linting hook
├── prisma/
│   ├── migrations/            # Database migrations
│   ├── schema.prisma          # Prisma schema
│   └── seed.ts                # Database seeding
├── src/
│   ├── common/
│   │   ├── decorators/        # Custom decorators
│   │   ├── dto/               # Shared DTOs
│   │   ├── filters/           # Exception filters
│   │   └── prisma/            # Prisma module
│   ├── modules/
│   │   ├── analytics/         # Analytics module
│   │   ├── auth/              # Authentication & authorization
│   │   ├── dedicated-server/  # Dedicated servers
│   │   ├── domain/            # Domain management
│   │   ├── metrics/           # Metrics tracking
│   │   ├── server/            # Server management
│   │   ├── settings/          # Settings management
│   │   ├── user/              # User management
│   │   ├── vps/               # VPS management
│   │   └── website/           # Website management
│   ├── app.module.ts          # Root module
│   └── main.ts                # Application entry point
├── .dockerignore
├── .env.example               # Environment variables template
├── .eslintrc.js               # ESLint configuration
├── .gitignore
├── .prettierrc                # Prettier configuration
├── commitlint.config.js       # Commitlint configuration
├── docker-compose.prod.yml    # Production Docker Compose
├── docker-compose.yml         # Development Docker Compose
├── Dockerfile                 # Multi-stage Dockerfile
├── nest-cli.json              # NestJS CLI configuration
├── package.json
├── README.md
└── tsconfig.json              # TypeScript configuration
```

## 🏗️ Architecture

This project follows **Clean Architecture** principles:
- **Controllers**: Handle HTTP requests and responses
- **Services**: Business logic layer
- **DTOs**: Data Transfer Objects for validation
- **Entities**: Prisma models (database schema)
- **Guards**: Authentication and authorization
- **Filters**: Global exception handling
- **Decorators**: Custom parameter decorators

### Entity Relationships

- **User** → has UserSettings, RefreshTokens
- **Domain** → has DomainSettings, multiple Websites
- **Server** → has ServerSettings, multiple VPS, DedicatedServers, Websites, Metrics, Analytics
- **VPS** → belongs to Server, has VPSSettings, Metrics, Analytics
- **DedicatedServer** → belongs to Server, has DedicatedServerSettings, Metrics, Analytics
- **Website** → belongs to Domain and Server, has WebsiteSettings, Metrics, Analytics
- **Metrics** → tracks server/website performance
- **Analytics** → records events (traffic, usage, billing)
- **GlobalSettings** → application-wide configuration

## 🔒 Security Features

- JWT access & refresh tokens
- Password hashing with bcrypt
- Role-based access control (RBAC)
- Input validation with class-validator
- Request sanitization
- Helmet.js security headers
- CORS configuration
- Rate limiting (can be added)

## 🛠️ Development

### Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format

# Type check
npx tsc --noEmit
```

### Git Hooks

The project uses Husky for git hooks:
- **pre-commit**: Runs linter and formatter
- **commit-msg**: Enforces conventional commits

Commit message format:
```
<type>(<scope>): <subject>

Types: feat, fix, docs, style, refactor, perf, test, build, ci, chore, revert
```

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

