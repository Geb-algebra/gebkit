# Technical Context

## Technologies Used

### Core Technologies
- **TypeScript**: For type-safe component development
- **React**: UI library for building components
- **Tailwind CSS**: Utility-first CSS framework
- **React Router v7**: For routing in the demo application
- **Radix UI**: Accessible component primitives

### Supporting Libraries
- **class-variance-authority**: For variant-based component styling
- **Lucide Icons**: SVG icon library
- **clsx/cn**: Utility for conditional class name joining

## Development Setup

### Project Structure
```
app/
├── components/
│   ├── flat/           # Flat design components
│   ├── neumorphic/     # Neumorphic design components
│   └── page/           # Page layout components for the demo site
├── routes/
│   ├── flat+/          # Demo routes for flat components
│   └── neumorphic+/    # Demo routes for neumorphic components
├── utils/
│   └── css.ts          # CSS utility functions
└── app.css             # Global CSS including neumorphic utilities
```

### Development Process
1. Components are developed first in the `components` directory
2. Demo pages are created in the `routes` directory
3. Component demos include examples of different states and variants

## Technical Constraints

1. **Browser Compatibility**: 
   - Components should work in modern browsers (Chrome, Firefox, Safari, Edge)

2. **Accessibility Requirements**:
   - All interactive components must be keyboard navigable
   - Proper ARIA attributes must be used
   - Color contrast should meet WCAG guidelines

3. **Performance Considerations**:
   - Components should avoid unnecessary re-renders
   - CSS should be optimized for performance
   - Bundle size should be monitored

## Dependencies

### Primary Dependencies
- `@radix-ui/react-*`: Unstyled UI component primitives
- `class-variance-authority`: For creating component variants
- `lucide-react`: Icon library
- `tailwindcss`: CSS framework

### Custom Utilities
- **Neumorphic Shadow Utilities**:
  ```css
  @utility shadow-neumorphic-button {
    box-shadow:
      inset 0px -2px 2px var(--neumo-shadow), inset 0px 2px 2px var(--neumo-light), 0px 2px
      5px var(--neumo-shadow),
      -0px -1px 1px var(--neumo-shadow);
  }

  @utility shadow-neumorphic-button-pressed {
    box-shadow: -0px -1px 1px var(--neumo-shadow), 0px 1px 1px var(--neumo-light);
  }

  @utility shadow-neumorphic-hole {
    box-shadow: 0px 1px 1px var(--neumo-light), -0px -1px 1px var(--neumo-shadow), inset 0px 1px 1px
      var(--neumo-shadow);
  }

  @utility shadow-neumorphic-edge {
    box-shadow:
      inset 0px 2px 2px var(--neumo-light), inset -0px -2px 2px var(--neumo-shadow), 0px 20px
      20px -10px var(--neumo-shadow);
  }
  ```

### CSS Variables
The design system uses CSS variables for theming, with light and dark mode support:
```css
:root {
  --background: oklch(95% 0.01 var(--hue));
  --foreground: oklch(40% 0.04 var(--hue));
  --card: oklch(98% 0.005 var(--hue));
  /* ... other color variables ... */
  --neumo-light: #ffffff60;
  --neumo-shadow: #00000030;
}

.dark {
  --background: oklch(30% 0.01 var(--hue));
  --foreground: oklch(90% 0.03 var(--hue));
  /* ... other color variables ... */
  --neumo-light: #ffffff40;
  --neumo-shadow: #00000080;
}
``` 