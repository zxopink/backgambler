# BackGambler - Responsive Layout Documentation

## Overview
BackGambler is a mobile-first Backgammon game built with React, TypeScript, and Tailwind CSS. The layout is designed to be fully responsive, working seamlessly across all device sizes from mobile phones to desktop screens, in both portrait and landscape orientations.

## Component Architecture

### 1. **GamePage** (Main Container)
- **Layout**: Full-screen flex column (`h-screen w-screen`)
- **Structure**: Three sections stacked vertically
  - TopBar (fixed height)
  - Board (flexible - takes remaining space)
  - BottomBar (fixed height)
- **Overflow**: Hidden to prevent scrolling
- **Background**: Neutral gray (`bg-gray-50`)

### 2. **TopBar**
- **Purpose**: Display player names, scores, and turn indicator
- **Layout**: Horizontal flexbox with three sections
  - Left: Player 1 info
  - Center: Turn indicator (visual dot)
  - Right: Player 2 info
- **Responsive Features**:
  - Text sizes scale with screen size (`text-sm`, `text-base`, `sm:text-lg`)
  - Padding adapts (`px-4 py-3`)
  - Maximum width constraint (`max-w-screen-xl mx-auto`)
  - Active player highlighted with bold font

### 3. **Board** (Core Component)
- **Aspect Ratio**: Fixed at 3:2 to maintain proper board proportions
- **Scaling Strategy**:
  ```tsx
  <div className="w-full max-w-4xl" style={{ aspectRatio: '3/2' }}>
  ```
  - Takes full width of container
  - Max width of 4xl (56rem/896px) on large screens
  - Height automatically calculated from aspect ratio
  - Centers in viewport using flexbox

- **Board Structure**:
  - 24 points divided into 4 quadrants (6 points each)
  - Middle bar separating left and right halves
  - Top and bottom halves for the two players
  - Each point is a flexible item (`flex: 1 1 0`) for equal distribution

- **Triangle Points**:
  - Created using CSS `clip-path: polygon()`
  - Alternating colors (`bg-amber-700` and `bg-amber-900`)
  - Top points: `polygon(50% 100%, 0 0, 100% 0)` (triangle pointing down)
  - Bottom points: `polygon(50% 0, 0 100%, 100% 100%)` (triangle pointing up)

- **Checkers**:
  - Responsive sizing: `w-6 h-6` on mobile, `sm:w-8 sm:h-8` on larger screens
  - Stacked vertically in columns
  - Shows up to 5 checkers visually, then displays count for more
  - Color-coded: Blue for Player 1, Red for Player 2

### 4. **BottomBar**
- **Purpose**: Dice display and action buttons
- **Layout**: Horizontal flexbox
  - Left: Dice visualization
  - Right: Action buttons (Undo, Roll)
- **Responsive Features**:
  - Dice size: `w-10 h-10` mobile, `sm:w-12 sm:h-12` larger screens
  - Button text: `text-sm` mobile, `sm:text-base` larger screens
  - Gap spacing adapts to screen size

## Responsive Scaling Approach

### Mobile-First Design
All base styles target mobile screens (320px+), with progressive enhancement for larger screens using Tailwind's `sm:`, `md:`, `lg:` breakpoints.

### Key Responsive Techniques

1. **Aspect Ratio Preservation**
   ```css
   aspectRatio: '3/2'
   ```
   - Ensures board maintains proper proportions
   - Prevents distortion on any screen size
   - CSS property with wide browser support

2. **Flexible Containers**
   ```tsx
   <div className="flex-1 overflow-hidden">
   ```
   - Board container takes all available vertical space
   - Prevents overflow issues

3. **Safe Padding**
   - All components use consistent padding (`px-4`, `py-3`)
   - Ensures content never touches screen edges
   - No horizontal scrolling on any device

4. **Maximum Width Constraints**
   ```tsx
   max-w-screen-xl mx-auto
   ```
   - Prevents content from becoming too wide on large screens
   - Centers content horizontally
   - Maintains readability

5. **Responsive Typography**
   - Base: `text-sm`, `text-base`
   - Small screens and up: `sm:text-lg`, `sm:text-xl`
   - Ensures legibility without overwhelming small screens

6. **Adaptive Spacing**
   - Gaps between elements: `gap-2` mobile, `sm:gap-4` larger
   - Checker spacing: `gap-0.5` mobile, `sm:gap-1` larger

## Device Coverage

### Portrait Mobile (320px - 480px)
- Full-screen layout with minimal padding
- Smaller text and button sizes
- Compact dice display
- Board scales to fit width

### Landscape Mobile (481px - 768px)
- More horizontal space for board
- Slightly larger interactive elements
- Board scales to fit available space

### Tablet (769px - 1024px)
- Enhanced text sizes (`sm:` breakpoint active)
- Larger checkers and dice
- More breathing room with increased padding
- Board centers with max-width constraint

### Desktop (1025px+)
- Maximum width enforced (`max-w-4xl` for board)
- Optimal viewing experience with centered layout
- All `sm:` and larger breakpoint styles active

## No-Scroll Design
- `overflow-hidden` on main container prevents scrolling
- Fixed height bars (top/bottom) ensure predictable layout
- Flexible board section adapts to remaining space
- Touch-friendly on all devices

## Color Scheme
Neutral and minimal palette:
- **Background**: Gray-50 (light neutral)
- **Borders**: Gray-300, Gray-800 (subtle definition)
- **Board**: Amber tones (traditional backgammon feel)
- **Player 1**: Blue-400/500/600
- **Player 2**: Red-400/500/600
- **UI Elements**: Gray scale for buttons, white for dice

## Browser Compatibility
- Modern CSS features (aspect-ratio, clip-path, flexbox)
- Tailwind CSS ensures cross-browser consistency
- Works on all modern browsers (Chrome, Firefox, Safari, Edge)
- Mobile browsers fully supported (iOS Safari, Chrome Mobile)

## Future Enhancements
- Add touch gestures for checker movement
- Implement drag-and-drop for larger screens
- Add animations for dice rolling
- Theme customization (dark mode)
- Accessibility improvements (ARIA labels, keyboard navigation)
