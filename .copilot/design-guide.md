# Portfolio Design Guide

**Project**: Modern Software Engineer Portfolio  
**Author**: Mohammed Samgan Khan (msamgan)  
**Last Updated**: October 30, 2025  
**Framework**: React + TypeScript + Tailwind CSS + Vite

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Spacing & Layout](#spacing--layout)
5. [Components](#components)
6. [Animations & Transitions](#animations--transitions)
7. [Responsive Design](#responsive-design)
8. [Accessibility](#accessibility)
9. [Code Patterns](#code-patterns)

---

## Design Philosophy

This portfolio embraces a **modern, tech-forward aesthetic** with the following principles:

- **Dark Mode First**: Deep, rich dark backgrounds with vibrant accent colors
- **Glassmorphism**: Subtle transparency and backdrop blur effects for depth
- **Gradient Accents**: Multi-color gradients (cyan, violet, emerald) for visual interest
- **Smooth Interactions**: Carefully crafted animations and hover states
- **Content Hierarchy**: Clear visual separation between sections with proper spacing
- **Professional Yet Playful**: Balances technical professionalism with creative flair

---

## Color System

### CSS Variables (Defined in `:root`)

```css
--color-bg: #0a0e1a; /* Primary background - deep navy */
--color-surface: #0f172a; /* Secondary surface - slate */
--color-text: #f1f5f9; /* Primary text - off-white */
--color-muted: #94a3b8; /* Secondary text - slate-400 */
--color-primary: #22d3ee; /* Cyan-400 - primary actions */
--color-secondary: #a78bfa; /* Violet-400 - secondary accents */
--color-accent: #34d399; /* Emerald-400 - success/highlights */
--color-warning: #fbbf24; /* Amber-400 - warnings/alerts */
--color-ring: color-mix(in oklab, var(--color-primary), white 20%);
```

### Gradient Combinations

**Primary Gradient** (Headers, CTAs):

```css
background: linear-gradient(to right, #22d3ee, #a78bfa);
```

**Text Gradient** (H1 headings):

```css
background: linear-gradient(135deg, white, #a5f3fc, #ddd6fe);
```

**Multi-Color Gradient** (Accents):

```css
background: linear-gradient(90deg, #22d3ee, #a78bfa, #34d399);
```

### Background Effects

The design uses **layered radial gradients** over the base background:

```css
background:
    radial-gradient(ellipse 1400px 800px at 10% 0%, rgba(34, 211, 238, 0.08), transparent 50%),
    radial-gradient(ellipse 1200px 700px at 90% 30%, rgba(167, 139, 250, 0.06), transparent 50%),
    radial-gradient(ellipse 1000px 600px at 50% 100%, rgba(52, 211, 153, 0.04), transparent 50%),
    linear-gradient(180deg, var(--color-bg) 0%, #05070f 100%);
```

This creates subtle ambient lighting effects across the page.

---

## Typography

### Font Stack

**Primary Font**: [Inter](https://fonts.google.com/specimen/Inter) from Google Fonts

```css
font-family:
    'Inter',
    -apple-system,
    BlinkMacSystemFont,
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    sans-serif;
```

### Font Sizes

- **H1 (Hero)**: `text-5xl md:text-6xl lg:text-7xl` (3rem - 4.5rem)
- **H2 (Section Titles)**: `text-3xl sm:text-4xl md:text-5xl` (1.875rem - 3rem)
- **H3**: `text-2xl` (1.5rem)
- **H4**: `text-xl` (1.25rem)
- **Body**: `text-base` or `text-lg` (1rem - 1.125rem)
- **Small**: `text-sm` (0.875rem)

### Text Styles

**Gradient Text** (for headings):

```css
.gradient-text {
    @apply text-transparent bg-clip-text bg-gradient-to-r 
         from-cyan-400 via-violet-400 to-emerald-400;
}
```

**H1 Headings** (automatic gradient):

```css
h1 {
    @apply text-transparent bg-clip-text bg-gradient-to-r 
         from-white via-cyan-100 to-violet-200;
}
```

### Tracking & Line Height

- **Headings**: `tracking-tight` for tighter letter spacing
- **Body Text**: `leading-relaxed` (1.625) or specific `line-height: 1.8`

---

## Spacing & Layout

### System Variables

```css
--nav-height: 4rem; /* Navbar height */
--section-spacing: 6rem; /* Section vertical spacing */
```

### Padding Scale (Tailwind)

- **xs**: `p-1` (0.25rem)
- **sm**: `p-2` (0.5rem) / `p-3` (0.75rem)
- **md**: `p-4` (1rem) / `p-6` (1.5rem)
- **lg**: `p-8` (2rem) / `p-12` (3rem)
- **xl**: `p-16` (4rem) / `p-24` (6rem)

### Container

- **Max Width**: Constrained by Tailwind's container utility
- **Responsive Padding**: Built into `Container` component
- **Centered**: `mx-auto` for horizontal centering

### Section Spacing

Standard sections use: `py-16 sm:py-24` (4rem - 6rem vertical padding)

### Grid Layouts

**Skills Grid**:

```tsx
<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
```

**Services Grid**:

```tsx
<div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
```

**Stats Grid**:

```tsx
<div className="grid grid-cols-3 gap-6">
```

---

## Components

### 1. Buttons

#### Primary Button

```tsx
<LinkButton
    variant="primary"
    href="/contact"
>
    Contact Me
</LinkButton>
```

**Styles**:

- Gradient background: `from-cyan-500 to-cyan-400`
- Rounded: `rounded-full`
- Padding: `px-6 py-3`
- Glow effect on hover
- Ripple animation via `::before` pseudo-element

**Classes**:

```css
.btn-primary {
    @apply bg-gradient-to-r from-cyan-500 to-cyan-400 
         text-black hover:from-cyan-400 hover:to-cyan-300 
         focus:outline-none focus:ring-2 focus:ring-cyan-400/50;
    box-shadow:
        0 0 20px rgba(34, 211, 238, 0.3),
        0 10px 30px -10px rgba(0, 0, 0, 0.4);
}
```

#### Secondary Button

```css
.btn-secondary {
    @apply bg-white/5 text-violet-200 hover:bg-white/10 
         ring-1 ring-white/10 hover:ring-white/20;
}
```

#### Small Button

```css
.btn-sm {
    @apply px-4 py-2 text-sm;
}
```

### 2. Cards

**Standard Card**:

```css
.card {
    @apply rounded-2xl bg-gradient-to-br 
         from-[var(--color-surface)]/60 to-[var(--color-surface)]/40 
         ring-1 ring-white/5 backdrop-blur-sm p-6 
         transition-all duration-300;
}
```

**Features**:

- Glassmorphic background
- Subtle ring border
- Top gradient bar on hover (via `::before`)
- Scale transform on hover: `scale-[1.02]`
- Enhanced shadow on hover

### 3. Badges

```css
.badge {
    @apply inline-flex items-center gap-1 rounded-full 
         bg-white/5 px-3 py-1.5 text-xs text-[var(--color-muted)] 
         ring-1 ring-white/10 transition-all duration-200;
}
```

**Hover Effect**: Lighter background, white text, slight lift

### 4. Navigation (Navbar)

**States**:

- **Scrolled**: `backdrop-blur-xl bg-[var(--color-bg)]/90` with top gradient border
- **Normal**: `backdrop-blur-md bg-[var(--color-bg)]/60`

**Links**:

- Active state: `bg-white/10` with pulse indicator dot
- Hover: Gradient underline animation
- Mobile: Hamburger menu with slide-in animation

**Logo**:

- Gradient text with hover color shift
- Animated underline on hover

### 5. Footer

**Structure**:

- Grid layout: `md:grid-cols-2 lg:grid-cols-4`
- Sponsor section above main content
- Social links with hover effects
- Decorative gradient backgrounds

**Social Icons**:

- Hover: `text-cyan-400` with scale transform
- Smooth transitions

### 6. Section Component

```tsx
<Section
    id="skills"
    title="Skills & Tech"
    subtitle="..."
>
    {children}
</Section>
```

**Header**:

- Centered text
- Max width subtitle: `max-w-3xl mx-auto`
- Spacing: `mb-12`

### 7. Hero Section

**Features**:

- Animated floating geometric shapes (SVG)
- Profile image with gradient border
- Social icon links
- CTA buttons
- Pulsing gradient orbs in background

**Geometric Shapes**:

- Hexagon, triangle, diamond, circles
- Different animation durations (6s-9s)
- Staggered animation delays
- Gradient strokes

### 8. Post Content Styling

**Typography Hierarchy**:

```css
.post-content h1 {
    @apply text-4xl mb-6 mt-12; /* cyan-violet gradient */
}
.post-content h2 {
    @apply text-3xl mb-5 mt-10; /* tri-color gradient */
}
.post-content h3 {
    @apply text-2xl mb-4 mt-8 text-cyan-300;
}
.post-content h4 {
    @apply text-xl mb-3 mt-6 text-violet-300;
}
```

**Links**:

- Cyan color with gradient underline animation
- Underline expands from right to left on hover

**Lists**:

- Adequate spacing: `space-y-3`
- Left margin: `ml-6`

**Blockquotes**:

- Border-left accent with gradient
- Italic text, cyan color

**Code Blocks**:

- Dark background with syntax highlighting
- Copy button on hover
- Monospace font

---

## Animations & Transitions

### Keyframe Animations

#### 1. Fade In Up

```css
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}
```

**Usage**: `.animate-fade-in-up` with staggered delays

#### 2. Float

```css
@keyframes float {
    0%,
    100% {
        transform: translateY(0px);
    }
    50% {
        transform: translateY(-10px);
    }
}
```

**Usage**: Floating geometric shapes, duration varies (3s-9s)

#### 3. Slide In (Mobile Menu)

```css
@keyframes slideInLeft {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }
    to {
        opacity: 1;
        transform: translateX(0);
    }
}
```

### Transition Patterns

**Standard Duration**: `duration-300` (300ms)
**Fast**: `duration-200` (200ms)
**Slow**: `duration-500` (500ms)

**Easing**: Default Tailwind easing or `ease-out`, `ease-in-out`

### Hover Effects

**Button Ripple**:

- Circular expansion from center
- `transition: width 0.6s, height 0.6s`

**Link Underline**:

- Scale from right to left (or vice versa)
- `transition: transform 0.3s ease`

**Card Lift**:

- `transform: scale(1.02)` or `translateY(-2px)`
- Shadow enhancement

**Glow Effect**:

```css
.glow:hover {
    box-shadow:
        0 0 30px rgba(34, 211, 238, 0.5),
        0 0 60px rgba(34, 211, 238, 0.2);
}
```

---

## Responsive Design

### Breakpoints (Tailwind)

- **sm**: `640px` (tablets)
- **md**: `768px` (small laptops)
- **lg**: `1024px` (desktops)
- **xl**: `1280px` (large screens)
- **2xl**: `1536px` (ultra-wide)

### Mobile-First Approach

All base styles are mobile-optimized, then enhanced for larger screens:

```tsx
className = 'text-3xl sm:text-4xl md:text-5xl';
className = 'grid gap-6 sm:grid-cols-2 lg:grid-cols-4';
className = 'pt-20 sm:pt-28';
```

### Navigation

**Desktop**: Horizontal menu with all links visible  
**Mobile**: Hamburger menu with slide-down overlay

### Touch Targets

Minimum clickable area: `44px x 44px` (iOS guideline)  
Buttons use adequate padding: `px-6 py-3` or larger

### Scroll Behavior

```css
html {
    scroll-behavior: smooth;
    scroll-padding-top: var(--nav-height); /* Account for fixed navbar */
}
```

---

## Accessibility

### Color Contrast

All text meets **WCAG AA** standards:

- White text (`#f1f5f9`) on dark background (`#0a0e1a`)
- Muted text (`#94a3b8`) used for less critical content
- Gradient text uses light shades on dark backgrounds

### Focus States

Buttons and links have visible focus rings:

```css
focus:outline-none focus:ring-2 focus:ring-cyan-400/50
```

### Semantic HTML

- Proper heading hierarchy (h1 → h2 → h3)
- `<nav>` for navigation
- `<section>` with `id` attributes
- `<footer>` for footer content
- `<button>` vs `<a>` distinction

### ARIA Labels

Mobile menu toggle:

```tsx
<button aria-label="Toggle menu">
```

### Keyboard Navigation

- Tab order follows visual flow
- Skip links for main content (can be added)
- All interactive elements keyboard-accessible

### Screen Readers

- Alt text for images
- Descriptive link text (avoid "click here")
- Logical document structure

---

## Code Patterns

### Theme Tokens (theme.ts)

Centralized design tokens:

```typescript
export const theme = {
    colors: {
        bg: 'var(--color-bg)',
        surface: 'var(--color-surface)',
        // ...
    },
    radius: {
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
        pill: '999px',
    },
    shadow: {
        soft: '0 10px 30px -10px rgba(0,0,0,0.35)',
        ring: '0 0 0 3px var(--color-ring)',
    },
};
```

### Component Structure

**Reusable Components**:

- `Button.tsx` - Polymorphic button/link
- `Section.tsx` - Consistent section wrapper
- `Container.tsx` - Max-width container
- `Navbar.tsx` - Fixed navigation
- `Footer.tsx` - Page footer

**Page Components**:

- `ServicesPage.tsx`
- `ProjectsPage.tsx`
- `BlogPage.tsx`
- `AboutPage.tsx`
- etc.

### Scroll Progress Indicator

All pages include a top progress bar:

```tsx
const [scrollProgress, setScrollProgress] = useState(0);

useEffect(() => {
    const handleScroll = () => {
        const totalHeight =
            document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const progress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(progress);
    };
    // ...
}, []);

<div
    className="fixed top-0 left-0 right-0 z-50 h-1 
             bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500"
    style={{ width: `${scrollProgress}%` }}
/>;
```

### Data-Driven Content

Content comes from `data.json`:

```tsx
import data from '../data.json';

const socials = data.navigation.social;
const intro = data.intro.text;
```

### Staggered Animations

Elements animate in sequence using inline styles:

```tsx
<div
  className="animate-fade-in-up"
  style={{ animationDelay: `${index * 0.1}s` }}
>
```

### Conditional Styling

Based on state (scroll, active, etc.):

```tsx
className={`transition-all ${
  isScrolled
    ? 'backdrop-blur-xl bg-[var(--color-bg)]/90'
    : 'backdrop-blur-md bg-[var(--color-bg)]/60'
}`}
```

---

## File Organization

```
src/
├── components/          # Reusable UI components
│   ├── Button.tsx
│   ├── Section.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Hero.tsx
│   └── ...
├── pages/              # Page-level components
│   ├── ServicesPage.tsx
│   ├── ProjectsPage.tsx
│   ├── BlogPage.tsx
│   └── ...
├── assets/             # Images, icons, docs
├── data.json           # Content data
├── theme.ts            # Design tokens
├── App.tsx             # Main app with routing
└── App.css             # Global styles + Tailwind
```

---

## Best Practices

### 1. Consistency

- Use design tokens from `theme.ts`
- Follow established component patterns
- Maintain spacing rhythm (multiples of 4/8)

### 2. Performance

- Optimize images (use appropriate formats)
- Lazy load off-screen content
- Minimize bundle size
- Use CSS transforms for animations (GPU-accelerated)

### 3. Maintainability

- Keep components small and focused
- Extract repeated patterns into utilities
- Document complex logic
- Use TypeScript for type safety

### 4. User Experience

- Provide visual feedback for all interactions
- Ensure smooth transitions (no janky animations)
- Make loading states clear
- Handle errors gracefully

### 5. Progressive Enhancement

- Start with semantic HTML
- Add CSS for visual polish
- Enhance with JavaScript interactions
- Ensure core functionality without JS

---

## Visual Reference

### Color Palette Visual

```
Background:    ███ #0a0e1a (Deep Navy)
Surface:       ███ #0f172a (Slate)
Text:          ███ #f1f5f9 (Off-white)
Muted:         ███ #94a3b8 (Slate-400)
Primary:       ███ #22d3ee (Cyan-400)
Secondary:     ███ #a78bfa (Violet-400)
Accent:        ███ #34d399 (Emerald-400)
Warning:       ███ #fbbf24 (Amber-400)
```

### Button States

```
Primary:       [████████] → hover → [████████] + glow
Secondary:     [--------] → hover → [░░░░░░░░]
Ghost:         [        ] → hover → [░░░░░░░░]
```

### Spacing Scale

```
0.25rem  ▪
0.5rem   ▪▪
0.75rem  ▪▪▪
1rem     ▪▪▪▪
1.5rem   ▪▪▪▪▪▪
2rem     ▪▪▪▪▪▪▪▪
3rem     ▪▪▪▪▪▪▪▪▪▪▪▪
4rem     ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪
6rem     ▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪▪
```

---

## Version History

- **v1.0** (October 30, 2025) - Initial design guide creation based on current implementation
- Comprehensive documentation of color system, typography, components, and animations
- Includes accessibility guidelines and responsive design patterns

---

## Notes for Developers

### Adding New Components

1. Follow existing component structure in `components/`
2. Use Tailwind utility classes for styling
3. Add hover/focus states for interactive elements
4. Ensure responsive behavior (mobile-first)
5. Include TypeScript types

### Modifying Colors

1. Update CSS variables in `App.css` `:root`
2. Consider contrast ratios for accessibility
3. Test in both light and dark environments (if applicable)
4. Update `theme.ts` if adding new tokens

### Creating New Pages

1. Create component in `pages/`
2. Include `Navbar` and `Footer`
3. Add scroll progress indicator
4. Implement hero section with page-specific content
5. Add route in `App.tsx`

### Animation Guidelines

- **Duration**: Keep under 500ms for most interactions
- **Easing**: Use `ease-out` for entrances, `ease-in` for exits
- **Purpose**: Animations should enhance, not distract
- **Performance**: Prefer transforms and opacity over layout properties

---

## Conclusion

This design guide serves as the source of truth for maintaining visual and interaction consistency across the portfolio. It balances modern aesthetics with accessibility and performance, creating a professional yet engaging user experience.

For questions or clarifications, refer to the actual component implementations in the `src/` directory.
