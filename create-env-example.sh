#!/bin/bash

cat > .env.example << 'EOF'
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-nextauth-secret-key-at-least-32-chars

# Database Configuration
DATABASE_URL="file:./dev.db"

# OAuth Providers
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Redis Configuration
# REDIS_URL=redis://localhost:6379
# UPSTASH_REDIS_REST_URL=your-upstash-redis-url
# UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-token

# Application Settings
NODE_ENV=development
DEBUG=false
EOF

echo ".env.example file created successfully" 