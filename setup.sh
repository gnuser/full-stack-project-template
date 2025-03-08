#!/bin/bash

# Setup script for the Next.js Fullstack Template
echo "🚀 Setting up your Next.js Fullstack Template..."

# Create .env.local from example if it doesn't exist
if [ ! -f .env.local ]; then
  echo "📄 Creating .env.local from example..."
  cat > .env.local << 'EOL'
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=$(openssl rand -base64 32)

# Database Configuration
DATABASE_URL="file:./dev.db"

# OAuth Providers (optional)
# Google Provider
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# GitHub Provider
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret

# Redis Configuration (optional)
# REDIS_URL=redis://localhost:6379
# UPSTASH_REDIS_REST_URL=your-upstash-redis-url
# UPSTASH_REDIS_REST_TOKEN=your-upstash-redis-token

# Email Provider (optional)
# EMAIL_SERVER=smtp://username:password@smtp.example.com:587
# EMAIL_FROM=noreply@example.com
EOL
  echo "✅ .env.local created with a secure random NEXTAUTH_SECRET"
else
  echo "⏩ .env.local already exists, skipping..."
fi

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Initialize the database
echo "🗃️ Initializing the database..."
npx prisma generate
npx prisma db push

echo "🎉 Setup complete! Run 'npm run dev' to start the development server."
echo "📚 Check out the README.md for more information." 