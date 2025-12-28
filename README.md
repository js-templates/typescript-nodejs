# TypeScript Node.js Template

A production-ready TypeScript Node.js template with modern tooling, strict type safety, and best practices for building scalable applications.

## Features

- **TypeScript 5.9** - Modern TypeScript with strict type checking
- **ESM-first** - Modern ECMAScript modules throughout
- **Bun build** - Lightning-fast builds with Bun bundler
- **Biome** - Fast, unified linting and formatting (replaces ESLint + Prettier)
- **Type-safe env** - Runtime-validated environment variables with Zod
- **Docker ready** - Multi-stage build with distroless production image without node_modules
- **Hot reload** - Instant development feedback with tsx watch

## Prerequisites

- [Node.js](https://nodejs.org/) 24.x or later
- [pnpm](https://pnpm.io/) 10.x or later
- [Bun](https://bun.sh/) 1.3.x or later (for building)

> **Tip:** Use [proto](https://moonrepo.dev/proto) with the included `.prototools` file for automatic version management.

## Getting Started

1. Use repository as a template
2. Clone your new repository
3. Run commands below

```bash
# Clone the repository
git clone https://github.com/your-username/your-project.git
cd your-project

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start development server
pnpm dev
```

## Project Structure

```
├── src/
│   ├── index.ts          # Application entry point
│   └── env.ts            # Type-safe environment configuration
├── dist/                 # Compiled output (generated)
├── build.js              # Bun build configuration
├── biome.json            # Linter and formatter config
├── tsconfig.json         # TypeScript configuration
├── Dockerfile            # Multi-stage production build
└── .prototools           # Runtime version pinning
```

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server with hot reload |
| `pnpm build` | Build for production |
| `pnpm typecheck` | Run TypeScript type checking |
| `pnpm lint` | Check code with Biome |
| `pnpm lint:fix` | Fix linting issues and format code |

## Environment Variables

Environment variables are validated at startup using Zod schemas. Define your variables in `src/env.ts`:

```typescript
import { env } from './env.js'

console.log(env.NODE_ENV)      // 'development' | 'production'
console.log(env.isDevelopment) // boolean
console.log(env.isProduction)  // boolean
```

Add new variables by extending the `EnvSchema` in `src/env.ts`.

## Docker

Build and run the production container:

```bash
# Build the image
docker build -t my-app .

# Run the container
docker run -e MY_ENV=123 my-app
```

The Dockerfile uses a multi-stage build:
1. **Build stage** - Compiles TypeScript with Bun
2. **Production stage** - Runs on minimal [distroless](https://github.com/GoogleContainerTools/distroless) Node.js image without node_modules

## VS Code Integration

The template includes VS Code settings for automatic formatting on save. Install the [Biome extension](https://marketplace.visualstudio.com/items?itemName=biomejs.biome) for the best experience.
