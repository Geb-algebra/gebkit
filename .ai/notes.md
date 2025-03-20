# Project Intelligence for GebKit

## Key Implementation Patterns

### Component Structure
- Each component is defined in its own file in either `app/components/flat/` or `app/components/neumorphic/`
- Components use a consistent naming convention
- Most components use a slot-based approach with `data-slot` attributes
- All components use the `cn()` utility for class name generation

### Styling Approach
- Base component styling comes from Tailwind utility classes
- Neumorphic effects rely on custom shadow utilities defined in `app.css`
- Component variants leverage `class-variance-authority` for conditional class application
- Design tokens are stored as CSS variables in `app.css`

### Demo Routes
- Each component has a corresponding demo route in `app/routes/flat+/` or `app/routes/neumorphic+/`
- Demo routes show different variants and states of components
- Demo files import code examples directly from component files

## Neumorphic Design Principles

The neumorphic components follow these consistent design principles:
1. **Soft Shadows**: Using a combination of light and dark shadows to create a soft, extruded or inset appearance
2. **Subtle Color Differences**: Using very slight color differences between elements and background
3. **Interaction Feedback**: Changing shadow direction/depth on interaction (press, focus, etc.)
4. **Rounded Corners**: Using consistent border radius for soft appearance
5. **Minimal Color Usage**: Focusing on shape and shadow rather than color for distinction

## Shadow Utility Usage Guide

- `shadow-neumorphic-button`: Used for raised buttons and interactive elements
- `shadow-neumorphic-button-pressed`: Applied on active/focus states for buttons
- `shadow-neumorphic-hole`: Used for inset elements like inputs, textareas, and select fields
- `shadow-neumorphic-edge`: Used for card-like containers with prominent edges

## Project Preferences

- Consistently use rounded-xl for neumorphic components
- Keep flat and neumorphic components with identical API structures
- Maintain same functionality between equivalent flat and neumorphic components
- Use consistent spacing patterns within component variants
