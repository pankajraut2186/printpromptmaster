# Replit.md - Prompt Generation Application

## Overview

This is a modern full-stack web application built for generating and managing design prompts for print-on-demand products. The application features a React frontend with a Node.js/Express backend, utilizing a PostgreSQL database for data persistence. The architecture follows a monorepo structure with shared types and schemas between client and server.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **UI Library**: Radix UI components with shadcn/ui design system
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state
- **Routing**: Wouter for lightweight client-side routing
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: In-memory storage (MemStorage implementation)
- **Data Persistence**: Session-based storage, resets on server restart
- **Development**: Hot reload with Vite integration in development

### Database Schema
The application uses a single `prompts` table with the following structure:
- `id`: Primary key (serial)
- `content`: Prompt text content
- `category`: Product category (apparel, accessories, home, etc.)
- `style`: Design style (minimalist, vintage, modern, etc.)
- `theme`: Content theme (nature, animals, food, etc.)
- `audience`: Target audience (general, kids, teens, adults, etc.)
- `tags`: Array of tags for categorization
- `isFavorite`: Boolean flag for favorite prompts
- `createdAt`: Timestamp for creation date

## Key Components

### Client-Side Components
1. **CategorySidebar**: Navigation component for filtering prompts by category
2. **PromptGenerator**: Interface for creating new prompts with style/theme selection
3. **PromptCard**: Display component for individual prompts with actions
4. **ExportModal**: Modal for exporting prompts in various formats (CSV, JSON, TXT)

### Server-Side Components
1. **Storage Interface**: Abstract interface for data operations with in-memory MemStorage implementation
2. **Route Handlers**: RESTful API endpoints for CRUD operations on prompts
3. **Storage Layer**: In-memory storage for session-based data persistence
4. **Middleware**: Request logging and error handling

### Shared Components
1. **Schema Definitions**: Zod schemas for validation and type inference
2. **Type Definitions**: TypeScript interfaces shared between client and server

## Data Flow

1. **Client Request**: User interactions trigger API calls through TanStack Query
2. **API Layer**: Express routes handle HTTP requests and validate data
3. **Storage Layer**: Storage interface abstracts in-memory data operations
4. **Memory Storage**: MemStorage manages data in server memory
5. **Response**: Data flows back through the same layers to update the UI

The application uses optimistic updates for better user experience, with automatic refetching on focus and error boundaries for robust error handling.

## External Dependencies

### Database
- **Neon Database**: Serverless PostgreSQL provider for production
- **Drizzle ORM**: Type-safe database toolkit with migrations
- **Drizzle Kit**: CLI tool for database schema management

### UI/UX
- **Radix UI**: Headless UI components for accessibility
- **Tailwind CSS**: Utility-first CSS framework
- **Lucide React**: Icon library for consistent iconography
- **date-fns**: Date manipulation and formatting

### Development Tools
- **Vite**: Fast build tool with HMR support
- **TypeScript**: Static type checking
- **ESLint**: Code linting (configured but not explicitly shown)
- **PostCSS**: CSS processing with Autoprefixer

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds the React application to `dist/public`
2. **Backend Build**: esbuild bundles the Express server to `dist/index.js`
3. **Database**: Drizzle migrations are applied via `db:push` command

### Environment Configuration
- **Development**: Uses tsx for TypeScript execution with hot reload
- **Production**: Serves static files and runs the bundled server
- **Database**: Configured via `DATABASE_URL` environment variable

### Scripts
- `dev`: Starts development server with hot reload
- `build`: Builds both frontend and backend for production
- `start`: Runs production server
- `check`: TypeScript type checking
- `db:push`: Applies database schema changes

## Changelog

```
Changelog:
- July 05, 2025. Initial setup with PostgreSQL database integration
- July 05, 2025. Migrated from in-memory storage to persistent PostgreSQL database using DatabaseStorage implementation
- July 05, 2025. Fixed template variable replacement system for proper prompt generation
- July 05, 2025. Implemented comprehensive POD prompt generator with 100+ templates across all categories
- July 05, 2025. Fixed client-side filtering issue preventing generated prompts from appearing
- July 05, 2025. Removed database and switched back to in-memory storage (MemStorage) per user request
```

## User Preferences

```
Preferred communication style: Simple, everyday language.
```