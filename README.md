# BackGambler

A mobile-first, responsive Backgammon game built with React, TypeScript, and Tailwind CSS.

## Features

- 🎲 Full Backgammon board with 24 points
- 📱 Mobile-first design that works on all screen sizes
- 🎨 Clean, minimal UI with neutral color scheme
- 🔄 Responsive layout - no horizontal scrolling
- 📐 Maintains proper aspect ratio across all devices
- 🌓 Works in both portrait and landscape orientations

## Tech Stack

- **React 18** - UI framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first styling
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing

## Project Structure

```
src/
├── components/
│   ├── TopBar.tsx      # Player info and turn indicator
│   ├── Board.tsx       # Main backgammon board
│   └── BottomBar.tsx   # Dice and action buttons
├── pages/
│   ├── Home.tsx        # Landing page
│   ├── About.tsx       # About page
│   └── GamePage.tsx    # Main game interface
├── App.tsx             # Router configuration
├── main.tsx            # App entry point
└── index.css           # Global styles with Tailwind
```

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dev server will run on `http://0.0.0.0:5173` (accessible from other devices on your network).

## Component Documentation

### GamePage
Main game container with full-screen flex layout:
- **TopBar**: Fixed height header
- **Board**: Flexible center panel (takes remaining space)
- **BottomBar**: Fixed height footer

### Board Component
- **Layout**: CSS Grid/Flexbox for 24 triangular points
- **Scaling**: Uses `aspect-ratio: 3/2` to maintain proportions
- **Points**: 12 top, 12 bottom, arranged in 4 quadrants
- **Checkers**: Responsive sizing with color-coded players

### TopBar Component
- Player names and scores
- Turn indicator (visual dot)
- Responsive text sizing

### BottomBar Component  
- Dice visualization
- Action buttons (Roll, Undo)
- Disabled states for game flow

## Responsive Design

The layout uses a mobile-first approach with these key features:

1. **Aspect Ratio Preservation**: Board maintains 3:2 ratio on all screens
2. **Flexible Containers**: Board takes all available vertical space
3. **Safe Padding**: No content touches screen edges
4. **No Horizontal Scroll**: All content fits within viewport width
5. **Breakpoint Scaling**: Text and elements scale at `sm:` (640px+) breakpoint

See [LAYOUT_DOCUMENTATION.md](./LAYOUT_DOCUMENTATION.md) for detailed responsive design explanation.

## Routes

- `/` - Home page with navigation
- `/game` - Main game interface
- `/about` - About page

## Development

### Code Style
- ESLint configured for React + TypeScript
- Follows React best practices
- Tailwind for all styling (no custom CSS)

### Future Enhancements
- Implement game logic (move validation, capturing, etc.)
- Add drag-and-drop for checker movement
- Implement undo/redo functionality
- Add animations for dice rolls and checker movement
- Save game state (localStorage or backend)
- Multiplayer support
- Sound effects and haptic feedback
- Dark mode theme

## Browser Support

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT
