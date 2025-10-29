# Services Page - Technical Implementation Guide

## Component Architecture

### Services.tsx Component Structure

```
Services Component
├── Section Wrapper (from shared components)
├── Grid Container (responsive: 1/2/3 columns)
└── Service Cards (mapped from data.json)
    ├── Image Container
    │   ├── Service Image (imported assets)
    │   ├── Gradient Overlay
    │   └── Icon Badge (appears on hover)
    ├── Content Container
    │   ├── Title Row
    │   │   ├── Icon Badge
    │   │   └── Service Name
    │   └── Description
    └── Decorative Footer
        ├── Gradient Progress Bar
        └── "Learn More" Text + Arrow
```

### ServicesPage.tsx Component Structure

```
ServicesPage Component
├── Scroll Progress Indicator (fixed top bar)
├── Navbar (shared component)
├── Hero Section
│   ├── Background Effects (animated blobs)
│   ├── Professional Badge
│   ├── Main Heading (gradient text)
│   ├── Description
│   └── Stats Grid (3 columns)
├── Main Content
│   ├── Services Component
│   └── CTA Section
│       ├── Heading
│       ├── Description
│       └── Action Buttons (2)
├── Footer (shared component)
└── Scroll to Top Button (conditional render)
```

## CSS Classes Used

### Custom Classes from App.css

- `.card` - Base card styling with gradient background
- `.btn` - Base button styling
- `.btn-primary` - Primary button with cyan gradient
- `.btn-secondary` - Secondary button with transparent style
- `.gradient-text` - Gradient text effect
- `.glow` - Glow effect on hover
- `.animate-fade-in-up` - Fade in from bottom animation

### Tailwind Utility Classes

Key patterns used throughout:

- `group` and `group-hover:` for parent-child hover effects
- `transition-all duration-XXX` for smooth animations
- `bg-gradient-to-r/br/t` for gradient backgrounds
- `backdrop-blur-sm/md` for glassmorphism effects
- `ring-1 ring-white/XX` for subtle borders
- `rounded-xl/2xl` for rounded corners
- `animate-pulse` for pulsing animations

## Animation Timings

| Element               | Duration | Easing      | Delay          |
| --------------------- | -------- | ----------- | -------------- |
| Card hover scale      | 500ms    | ease        | -              |
| Image zoom            | 700ms    | ease        | -              |
| Icon badge appearance | 300ms    | ease        | -              |
| Gradient overlay      | 500ms    | ease        | -              |
| "Learn more" slide    | 300ms    | ease        | -              |
| Progress bar expand   | 500ms    | ease        | -              |
| Card fade-in          | 600ms    | ease-out    | index \* 100ms |
| Background blobs      | 3s       | ease-in-out | 0s / 1s        |

## Color Variables

All colors use CSS custom properties from theme:

```css
--color-bg: #0a0e1a --color-surface: #0f172a --color-text: #f1f5f9
  --color-muted: #94a3b8 --color-primary: #22d3ee (cyan-400)
  --color-secondary: #a78bfa (violet-400) --color-accent: #34d399 (emerald-400);
```

## Responsive Breakpoints

Grid layout changes:

- Mobile (< 640px): 1 column
- Tablet (640px - 1024px): 2 columns
- Desktop (> 1024px): 3 columns

Text sizing:

- Hero heading:
  - Mobile: text-5xl
  - Medium: text-6xl
  - Large: text-7xl

## Image Specifications

Service images should be:

- Format: PNG with transparency
- Dimensions: Minimum 800x450px (16:9 aspect ratio)
- Optimization: Compressed for web
- Location: `/src/assets/services/`
- Naming: PascalCase matching service name

Current images:

1. WebDevelopment.png
2. MobileDevelopment.png
3. APIDevelopment.png
4. DatabaseDesign.png
5. CodeReview.png
6. TechnicalConsulting.png
7. ProjectManagement.png
8. SoftwareArchitecture.png

## Icon Mapping

Each service has a unique icon from Heroicons:

- **Web Development**: Globe icon
- **Mobile Development**: Device mobile icon
- **API Development**: Code icon
- **Database Design**: Database icon
- **Code Review**: Clipboard check icon
- **Technical Consulting**: Light bulb icon
- **Project Management**: Clipboard list icon
- **Software Architecture**: Server icon

## State Management

### ServicesPage Component State

```typescript
const [scrollProgress, setScrollProgress] = useState(0);
```

### Effects

- Scroll listener: Updates progress bar width (0-100%)
- Cleanup: Removes scroll listener on unmount

## Performance Considerations

### Optimizations Applied:

1. **Image Loading**: All images imported at build time (no runtime fetching)
2. **CSS Transforms**: Uses transform for animations (GPU accelerated)
3. **Conditional Rendering**: Scroll button only renders when needed
4. **Debounced Scroll**: Smooth scroll progress calculation
5. **Efficient Selectors**: No deep nesting, minimal specificity

### Bundle Size Impact:

- 8 service images: ~200-400KB total (depends on optimization)
- Additional code: ~5KB (minified)
- No external dependencies added

## Browser Compatibility

Tested features:

- ✅ CSS Grid
- ✅ CSS Gradients
- ✅ CSS Transforms
- ✅ CSS Transitions
- ✅ Backdrop filters (blur)
- ✅ Custom properties (CSS variables)

Minimum browser requirements:

- Chrome 88+
- Firefox 85+
- Safari 14+
- Edge 88+

## Accessibility Features

1. **Semantic HTML**: Proper heading hierarchy (h1 > h2 > h3)
2. **ARIA Labels**: All buttons have descriptive labels
3. **Alt Text**: All images have descriptive alt attributes
4. **Keyboard Navigation**: All interactive elements focusable
5. **Focus Indicators**: Visible focus states on buttons
6. **Color Contrast**: WCAG AA compliant text colors
7. **Motion**: Respects prefers-reduced-motion (if added to CSS)

## Data Structure

Services are defined in `data.json`:

```json
{
  "services": [
    {
      "name": "Service Name",
      "description": "Service description...",
      "img": "src/assets/services/ImageName.png"
    }
  ]
}
```

## Testing Checklist

- [ ] All images load correctly
- [ ] Hover effects work smoothly
- [ ] Scroll progress bar updates accurately
- [ ] Scroll-to-top button appears/hides at correct scroll position
- [ ] Responsive layout works on all breakpoints
- [ ] CTA buttons link correctly
- [ ] All animations run at 60fps
- [ ] No console errors
- [ ] TypeScript compiles without errors
- [ ] Accessible via keyboard only
- [ ] Works in all major browsers
- [ ] Looks good in dark mode (current theme)

## Maintenance Notes

When adding a new service:

1. Add image to `/src/assets/services/`
2. Import image in `Services.tsx`
3. Add to `localImages` mapping
4. Add icon to `serviceIcons` mapping
5. Update `data.json` with service details
6. Test image loading and hover effects

When modifying styles:

1. Maintain consistency with App.css theme
2. Use existing CSS custom properties
3. Keep animation timings consistent
4. Test responsive behavior
5. Verify accessibility is maintained
