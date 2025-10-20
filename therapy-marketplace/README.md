# AI-Powered Therapy Activity Marketplace

A Next.js frontend prototype for an AI-powered therapy activity marketplace that connects therapists with personalized therapy activities based on patient profiles and treatment goals.

## Project Overview

This prototype implements a frontend for a platform where:

1. Therapists can upload therapy activities with detailed tags and descriptions
2. Patient profiles can be created with treatment goals and preferences
3. AI matching algorithm connects patients with suitable therapy activities

## Features

- **Activity Upload**: Create and share therapy activities with comprehensive tagging
- **Patient Profile Management**: Add patient information including treatment goals, interests, and challenges
- **AI Activity Matching**: Find personalized therapy activities based on patient profiles
- **Search & Filtering**: Browse and filter activities by various parameters

## Tech Stack

- **Framework**: Next.js with TypeScript
- **Styling**: Tailwind CSS with custom color scheme
- **State Management**: React hooks
- **Data**: Mock data for demonstration purposes

## Getting Started

```bash
# Install dependencies
npm install

# Run the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Project Structure

- `/src/app`: Next.js App Router pages
- `/src/components`: Reusable UI components
- `/src/lib`: Utilities and mock data
- `/src/styles`: Global CSS and Tailwind configuration

## Mock Data

The prototype uses mock data to simulate:
- Therapy activities with tags, goals, descriptions, etc.
- Patient profiles with treatment goals, interests, and preferences
- Activity matching algorithm

In a production version, this would be connected to a backend service with RAG capabilities.

## Design

The UI follows a clean, accessible design with:
- White and light velvet color scheme with gradients
- Responsive layout for all device sizes
- Consistent UI components and patterns

## Future Development

The next phases of development would include:
- Backend integration with API services
- Real AI matching using RAG (Retrieval Augmented Generation)
- User authentication and role management
- Activity effectiveness tracking and feedback mechanisms

## License

[MIT](LICENSE)
