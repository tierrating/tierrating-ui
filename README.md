# TierRating

A simple application to fetch ratings from third-party providers like AniList and organize them in tier lists. Later on, with the ability to sync changes back to the data provider.

![TierRating Server Build](https://github.com/RatzzFatzz/tierrating/workflows/release-build/badge.svg)
![TierRating UI Build](https://github.com/RatzzFatzz/tierrating-ui/workflows/release-build/badge.svg)

## Overview

TierRating allows you to:
- Import your ratings from services like AniList
- View and organize your content in tier lists
- Sync rating changes back to the original platform

## Getting Started

### Running the Application

Checkout the documentation [here.](https://docs.tierrating.de)

## Development

### Prerequisites

- Node.js (v16+)
- npm or yarn
- Docker and Docker Compose (for containerized development)

### Local Development Setup

1. Clone the repository
```bash
git clone https://github.com/yourusername/tiersync.git
cd tiersync
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npm run dev
# or
yarn dev
```

4. Access the development server at http://localhost:3000

### Project Structure

This is a standard Next.js project with ShadCN UI components:

- `/app` - Next.js application routes
- `/components` - React components including ShadCN UI components
- `/lib` - Utility functions and shared code
- `/public` - Static assets
- `/model` - Shared interfaces

### Building for Production

```bash
npm run build
# or
yarn build
```