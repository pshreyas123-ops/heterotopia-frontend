# Heterotopia Frontend

A Next.js application that connects NGOs with funders through intelligent semantic search and matching.

## Features

- **Semantic Search**: AI-powered funder discovery using natural language queries
- **User Profiles**: Comprehensive NGO and funder profiles with mission statements
- **Multi-language Support**: Internationalization with multiple language options
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Real-time Updates**: React Query for efficient data fetching and caching

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:

```bash
cp .env.local.example .env.local
```

4. Run the development server:

```bash
npm run dev
# or
yarn dev
# orr
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI primitives
- **State Management**: Zustand + React Query
- **Forms**: React Hook Form with Zod validation
- **Testing**: Jest + React Testing Library
- **TypeScript**: Full type safety

## Project Structure

```
src/
├── app/                 # Next.js app router pages
├── components/          # Reusable UI components
├── contexts/           # React contexts
├── hooks/              # Custom hooks
├── lib/                # Utility functions
├── services/           # API services
├── types/              # TypeScript type definitions
└── constants/          # Application constants
```

## Development

### Running Tests

```bash
npm run test
npm run test:watch
npm run test:coverage
```

### Type Checking

```bash
npm run type-check
```

### Linting

```bash
npm run lint
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.
