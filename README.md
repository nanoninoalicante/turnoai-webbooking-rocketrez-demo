# Turno Web Booking - RocketRez

A modern React application for tour booking with a beautiful UI built using shadcn/ui components and Tailwind CSS.

## Features

- **Tour Browsing**: View and filter available tours
- **Date Selection**: Interactive calendar with pricing
- **Time Slot Booking**: Select available time slots
- **Ticket Management**: Choose number of adults, youth, and children
- **Responsive Design**: Works on desktop and mobile devices
- **Modern UI**: Built with shadcn/ui components and Tailwind CSS

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **shadcn/ui** components (built on Radix UI)
- **Lucide React** for icons
- **ESLint** for code linting

## Getting Started

### Prerequisites

- Node.js (version 18 or higher)
- npm

### Installation

1. Clone or download this repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm run dev
```

This will start the Vite development server on `http://localhost:5173`

### Building for Production

To build the application for production:

```bash
npm run build
```

### Preview Production Build

To preview the production build locally:

```bash
npm run preview
```

### Linting

To run ESLint:

```bash
npm run lint
```

## Project Structure

```
├── components/           # React components
│   ├── ui/              # shadcn/ui components
│   └── figma/           # Custom components from Figma
├── styles/              # Global CSS styles
├── src/                 # Application entry point
└── public/              # Static assets
```

## Key Components

- **Tours**: Main tour listing with search and filters
- **TourDetails**: Detailed view of a selected tour
- **DatePicker**: Interactive calendar for date selection
- **TicketSelector**: Number of tickets selection
- **TimeSlotPicker**: Available time slots
- **BookingSummary**: Final booking details

## Customization

The application uses CSS variables for theming, which can be customized in `styles/globals.css`. The color scheme includes a custom teal theme that can be modified as needed.

## Contributing

1. Follow the existing code style
2. Use TypeScript for all new components
3. Follow the shadcn/ui patterns for UI components
4. Ensure responsive design principles

## License

This project is private and proprietary. 