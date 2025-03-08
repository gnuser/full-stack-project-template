# Next.js Fullstack Template

A modern, production-ready template for building full-stack applications with Next.js, TypeScript, Tailwind CSS, and NextAuth.js.

## Features

- ⚡️ **Next.js 15** with App Router and TypeScript
- 🔒 **Authentication** via NextAuth.js with multiple providers
- 🎨 **Tailwind CSS** for styling with a custom theme system
- 🌓 **Dark/Light Mode** with system preference detection
- 📱 **Responsive Design** for all devices
- 🔍 **TypeScript** for type safety
- 🧩 **Component Library** with reusable UI components
- 🗄️ **Database Integration** with Prisma ORM
- 📦 **Redis Integration** for session storage and caching
- 🚧 **Error Handling** with custom error types and API response helpers
- 🔄 **State Management** best practices
- 🚀 **Performance Optimized** with server components
- ⚙️ **Environment Configuration** with dotenv
- 🛠️ **Developer Experience** with modern tooling
- 🧪 **Testing Setup** ready to go

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Git

### Quick Setup

The easiest way to get started is by using the setup script:

```bash
# Clone the repository
git clone https://github.com/gnuser/fullstack-project-template my-project
cd my-project

# Run the setup script
./setup.sh
```

The setup script will:

1. Create a `.env.local` file with sensible defaults
2. Install dependencies
3. Initialize the database with Prisma
4. Generate a random secure NEXTAUTH_SECRET

### Manual Setup

If you prefer to set things up manually:

1. Clone this template:

```bash
# Using the GitHub CLI:
gh repo create my-project --template https://github.com/gnuser/fullstack-project-template

# Or with git:
git clone https://github.com/gnuser/fullstack-project-template my-project
cd my-project
```

2. Install dependencies:

```bash
npm install
```

3. Copy the example environment variables:

```bash
cp .env.example .env.local
```

4. Update the environment variables in `.env.local` with your own values.

5. Initialize the database:

```bash
npm run db:push
```

6. Start the development server:

```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run start` - Start the production server
- `npm run lint` - Lint the codebase
- `npm run format` - Format code with Prettier
- `npm run setup` - Run the setup script
- `npm run create-feature` - Generate new feature boilerplate
- `npm run db:push` - Push the Prisma schema to the database
- `npm run db:studio` - Open Prisma Studio to manage your database
- `npm run db:generate` - Generate Prisma client
- `npm run db:migrate` - Create and apply a migration
- `npm run db:reset` - Reset the database (caution: destructive)
- `npm run clear-auth` - Clear authentication data
- `npm run clear-redis` - Clear Redis data
- `npm run clear-all` - Clear all data (auth and Redis)

## Project Structure

```
├── src/
│   ├── app/                # Next.js App Router
│   │   ├── api/            # API routes
│   │   ├── dashboard/      # Dashboard page
│   │   ├── login/          # Login page
│   │   ├── register/       # Registration page
│   │   └── layout.tsx      # Root layout
│   ├── components/         # React components
│   │   ├── dashboard/      # Dashboard-specific components
│   │   ├── ui/             # Reusable UI components
│   │   └── theme-provider.tsx # Theme context provider
│   ├── lib/                # Utility functions and shared code
│   │   ├── auth.ts         # Authentication utilities
│   │   ├── error.ts        # Error handling utilities
│   │   ├── prisma.ts       # Prisma client setup
│   │   └── session.ts      # Session utilities
│   ├── styles/             # Global styles
│   │   └── theme.ts        # Theme configuration
│   ├── types/              # TypeScript type definitions
│   └── auth.ts             # NextAuth.js configuration
├── prisma/                 # Prisma schema and migrations
├── scripts/                # Utility scripts
│   └── create-feature.js   # Feature generator script
├── public/                 # Static files
├── setup.sh                # Setup script
└── .env.example            # Example environment variables
```

## Authentication

This template uses NextAuth.js for authentication. The following providers are pre-configured:

- Credentials (email/password)
- Google
- GitHub

To use social login providers, add your credentials to the `.env.local` file.

## Theme System

The template includes a comprehensive theme system with:

- Light and dark mode support
- System preference detection
- Theme switching UI
- CSS variables for consistent styling
- Typography scale
- Color system with semantic variables

## Database

The template uses Prisma ORM for database operations. The default setup uses a SQLite database in development and can be configured for PostgreSQL or MySQL in production.

## API Development

The template includes utilities for building robust APIs:

- Custom error types (AppError, AuthError, ValidationError, NotFoundError)
- Error logging with context
- Response helpers for standardized API responses
- Request validation patterns

## Creating New Features

Use the feature generator script to quickly scaffold new features:

```bash
npm run create-feature my-feature
```

This will create:

- Component files with proper structure
- API route with validation and error handling
- Type definitions
- Utility functions

## Deployment

This template is ready to deploy to platforms like Vercel, Netlify, or any other hosting provider that supports Next.js applications.

For Vercel:

```bash
vercel
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
