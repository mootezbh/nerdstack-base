# Database Templates

This folder contains database connection templates that should be copied by the CLI based on user selection.

## Structure

- `mongo/connection.ts` - MongoDB with Mongoose connection setup
- `prisma/connection.ts` - Prisma client and connection setup
- `prisma/schema.prisma` - Prisma schema template

## CLI Integration Guide

The CLI should:

1. **Ask the user** which database they want to use (None, MongoDB, Prisma)
2. **Copy the appropriate template** to `src/shared/database/connection.ts`
3. **Install the required dependencies** based on selection:

   - **MongoDB**: `npm install mongoose`
   - **Prisma**: `npm install @prisma/client && npm install -D prisma`
   - **None**: Skip database installation

4. **Update server.ts** to import and use the connection:

   ```typescript
   import { connectDatabase } from "./shared/database/connection.js";

   // In start function:
   if (env.DATABASE_URL) {
     await connectDatabase();
   }
   ```

5. **For Prisma only**: Copy `schema.prisma` to `prisma/schema.prisma` in the project root

## Template Variables

The templates use these import paths that work after being copied:

- `../../config/env.js` - Points to the config directory
- Works from `src/shared/database/connection.ts` location

## Package.json Configuration

The base `package.json` includes database packages as `optionalDependencies`:

- `mongoose` - For MongoDB
- `prisma` and `@prisma/client` - For Prisma

The CLI should:

1. Read the user's database choice
2. Move the appropriate packages from `optionalDependencies` to `dependencies`
3. Remove unused database packages from `optionalDependencies`
4. Run `npm install` to install chosen packages

## Example CLI Flow

```javascript
// Pseudocode for CLI
const dbChoice = await askDatabaseChoice(); // 'none', 'mongodb', or 'prisma'

if (dbChoice === 'mongodb') {
  // Copy mongo template
  copyFile('templates/mongo/connection.ts', 'src/shared/database/connection.ts');

  // Update package.json
  moveDependency('mongoose', 'optionalDependencies' -> 'dependencies');
  removeDependency('prisma', 'optionalDependencies');
  removeDependency('@prisma/client', 'optionalDependencies');

} else if (dbChoice === 'prisma') {
  // Copy prisma templates
  copyFile('templates/prisma/connection.ts', 'src/shared/database/connection.ts');
  copyFile('templates/prisma/schema.prisma', 'prisma/schema.prisma');

  // Update package.json
  moveDependency('@prisma/client', 'optionalDependencies' -> 'dependencies');
  moveDependency('prisma', 'optionalDependencies' -> 'devDependencies');
  removeDependency('mongoose', 'optionalDependencies');

} else {
  // Remove all database packages
  removeDependency('mongoose', 'optionalDependencies');
  removeDependency('prisma', 'optionalDependencies');
  removeDependency('@prisma/client', 'optionalDependencies');
}

// Run npm install
execSync('npm install');
```

## Alternative Approach: Use db-config.json

The `db-config.json` file in the root contains a structured configuration that the CLI can read:

```javascript
const dbConfig = require("./db-config.json");
const userChoice = "mongodb"; // or 'prisma' or 'none'

if (userChoice !== "none") {
  const config = dbConfig.database.dependencies[userChoice];

  // Install packages
  config.packages.forEach((pkg) => installDependency(pkg));
  config.devPackages.forEach((pkg) => installDevDependency(pkg));

  // Copy template
  copyFile(config.template, config.destination);

  // Copy additional files (for Prisma)
  if (config.additionalFiles) {
    config.additionalFiles.forEach((file) => {
      copyFile(file.template, file.destination);
    });
  }
}
```
