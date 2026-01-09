# N8N Clone

A workflow automation platform inspired by n8n and Zapier, built as a learning project to explore modern web development tools and practices.

![Project Status](https://img.shields.io/badge/status-in%20progress-yellow)
![Next.js](https://img.shields.io/badge/Next.js-16.0.7-black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![Prisma](https://img.shields.io/badge/Prisma-6.17.1-green)

##  Features

- **Visual Workflow Editor**: Drag-and-drop interface for building automation workflows using React Flow
- **Node-Based Architecture**: Modular nodes for triggers, actions, and integrations
- **Authentication**: Secure authentication with Better Auth
- **Background Processing**: Event-driven workflows with Inngest
- **Payment Integration**: Subscription management with Polar
- **Monitoring**: Error tracking and performance monitoring with Sentry
- **Database**: PostgreSQL with Prisma ORM
- **Real-time Updates**: Live workflow execution updates

##  Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **UI Components**: Radix UI, Lucide Icons, Shadcn UI
- **State Management**: Jotai, TanStack Query
- **Backend**: Next.js API Routes, tRPC
- **Database**: Prisma with PostgreSQL
- **Authentication**: Better Auth
- **Workflow Engine**: Inngest
- **Payments**: Polar
- **Monitoring**: Sentry
- **Code Quality**: Biome

##  Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd n8n-clone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file and add your configuration:
   ```env
   DATABASE_URL="your-database-url"
   BETTER_AUTH_SECRET="your-key"
   BETTER_AUTH_URL="your-key"
   GITHUB_CLIENT_ID="your-key"
   GITHUB_CLIENT_SECRET="your-key"
   GOOGLE_CLIENT_ID="your-key"
   GOOGLE_CLIENT_SECRET="your-key"
   GOOGLE_GENERATIVE_AI_API_KEY="your-key"
   POLAR_ACCESS_TOKEN="your-polar-token"
   POLAR_SUCCESS_URL="your-polar-token"
   SENTRY_AUTH_TOKEN="your-key"
   NEXT_PUBLIC_APP_URL="your-key"
   NGROK_URL="your-key" (optional if you use ngrok)
   ENCRYPTION_KEY="your-key"
   ```

4. **Set up the database**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

5. **Run the development server**
   ```bash
   npm run dev
   ```

   Or run all services:
   ```bash
   npm run dev:all
   ```

##  Usage

1. Open [http://localhost:3000](http://localhost:3000) in your browser
2. Sign up or log in
3. Complete upgrade process (can use random name and number if it's in sandbox mode)
4. Create a new workflow
5. Drag nodes from the sidebar to build your automation
6. Connect nodes and configure their properties
7. Save and execute your workflow

##  Project Structure

```
n8n-clone/
├── src/
│   ├── app/                 # Next.js app router
│   ├── components/          # Reusable UI components
│   ├── features/            # Feature-based modules
│   │   ├── auth/           # Authentication
│   │   ├── workflows/      # Workflow management
│   │   ├── executions/     # Workflow execution
│   │   └── credentials/    # API credentials
│   ├── lib/                # Utilities and configurations
│   ├── trpc/               # tRPC setup
│   └── inngest/            # Background jobs
├── prisma/                 # Database schema and migrations
└── public/                 # Static assets
```


##  License

This project is private and for educational purposes only.

##  Disclaimer

This project is a clone built for learning purposes. It is not affiliated with n8n or Zapier.
