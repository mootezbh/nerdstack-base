# stackSahel-base

Minimal TypeScript + Express starter used as a base template for an `npx` scaffolder.

## Features

- ✅ TypeScript with strict mode
- ✅ Express.js with modern middleware (helmet, cors)
- ✅ Environment validation with Zod
- ✅ Modular architecture (controllers, services, routes)
- ✅ Error handling with custom error classes
- ✅ JWT authentication middleware
- ✅ Request validation utilities
- ✅ Logger utility
- ✅ ESLint + Prettier configuration
- ✅ Database templates (MongoDB/Prisma) for CLI selection

## Quick Start

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy `.env.example` to `.env` and configure:

   ```bash
   cp .env.example .env
   ```

3. Run in development:

   ```bash
   npm run dev
   ```

4. Build for production:

   ```bash
   npm run build
   ```

5. Start production server:
   ```bash
   npm start
   ```

## Project Structure

```
src/
├── app.ts                  # Express app setup
├── server.ts              # Server entry point
├── config/
│   └── env.ts             # Environment validation
├── middleware/
│   ├── auth.ts            # JWT authentication
│   ├── errorHandler.ts    # Global error handling
│   └── asyncHandler.ts    # Async route wrapper
├── modules/
│   ├── index.ts           # Module router
│   └── user/              # Example user module
│       ├── user.routes.ts
│       ├── user.controller.ts
│       └── user.service.ts
└── shared/
    └── utils/
        ├── errors.ts      # Custom error classes
        ├── logger.ts      # Logging utility
        ├── validate.ts    # Validation middleware
        └── response.ts    # Response helpers

templates/
├── mongo/
│   └── connection.ts      # MongoDB template
└── prisma/
    └── schema.prisma      # Prisma schema template
```

## Environment Variables

Create a `.env` file with these variables:

- `PORT` - Server port (default: 3000)
- `NODE_ENV` - Environment mode (development/production/test)
- `DATABASE_URL` - MongoDB connection string (optional)
- `JWT_SECRET` - Secret for JWT signing (optional, required for auth)

## Usage Notes

- This repo is intended to be used as a template for scaffolding starter projects via CLI
- The `templates/` folder contains database configurations that will be copied by the CLI:
  - `templates/mongo/` - MongoDB with Mongoose
  - `templates/prisma/` - Prisma ORM setup
- Database packages are in `optionalDependencies` - the CLI will move the selected one to `dependencies`
- See `db-config.json` and `templates/README.md` for CLI integration details
- Authentication is optional—remove JWT_SECRET if not needed
- Database setup will be handled during scaffolding based on user selection

## For CLI Developers

This template uses a conditional dependency approach:

1. **Database packages** are listed in `optionalDependencies` in package.json
2. **db-config.json** defines the configuration for each database option
3. **templates/** folder contains the connection files to be copied
4. Your CLI should:
   - Ask user for database preference (none/mongodb/prisma)
   - Copy appropriate template from `templates/` to `src/shared/database/`
   - Move selected packages from `optionalDependencies` to `dependencies`/`devDependencies`
   - Remove unselected database packages
   - Run `npm install`

See `templates/README.md` for detailed integration guide.
