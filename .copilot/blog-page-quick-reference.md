# Blog Page - Quick Reference Guide

## 🎨 Design Tokens

### Layout

- **Container:** `max-w-5xl mx-auto`
- **Card Spacing:** `space-y-6` (24px between cards)
- **Image Width:** `lg:w-80` (320px on desktop)
- **Image Aspect:** `aspect-video` (mobile), `aspect-[4/3]` (desktop)

### Colors

```css
/* Gradients */
--gradient-primary: from-cyan-500 via-violet-500 to-emerald-500 --gradient-text: from-white
    via-cyan-100 to-violet-200 --gradient-hover: from-cyan-300 via-violet-300 to-emerald-300
    /* Backgrounds */ --card-bg: from-[var(--color-surface)]/60 to-[var(--color-surface)]/40
    --overlay-light: black/40 --overlay-dark: black/80;
```

### Typography

```css
/* Title */
font-size: text-2xl md:text-3xl
font-weight: font-bold
hover: gradient-text

/* Excerpt */
color: var(--color-muted)
line-clamp: 2-3 lines

/* Meta */
font-size: text-xs
color: var(--color-muted)
```

## 🔧 Component Structure

```tsx
<article className="card group">
    <div className="flex flex-col lg:flex-row gap-6">
        {/* Image Section - 320px wide on desktop */}
        <div className="relative lg:w-80 ...">
            <img /> {/* or gradient placeholder */}
            <div>/* overlay */</div>
            <div>/* external link icon */</div>
            <div>/* reading time badge */</div>
        </div>

        {/* Content Section - flex-1 */}
        <div className="flex-1 flex flex-col gap-4">
            {/* Meta badges */}
            <div className="flex items-center gap-3">
                <span>/* date */</span>
                <span>• </span>
                <span>/* author */</span>
            </div>

            {/* Title */}
            <h3>/* post title */</h3>

            {/* Excerpt */}
            <p>/* post excerpt */</p>

            {/* Tags & CTA */}
            <div className="mt-auto flex justify-between">
                <div>/* tags */</div>
                <div>/* read more link */</div>
            </div>
        </div>
    </div>
</article>
```

## 🎭 Hover States

### Card

```css
.card:hover {
    transform: scale(1.02);
    box-shadow: 0 20px 60px -15px rgba(0, 0, 0, 0.5);
    ring: white/15;
}
```

### Image

```css
img:hover {
    transform: scale(1.1);
    transition: 700ms;
}
```

### Title

```css
h3:hover {
    background: linear-gradient(cyan-300, violet-300, emerald-300);
    -webkit-background-clip: text;
    color: transparent;
}
```

## 📱 Responsive Breakpoints

```css
/* Mobile First */
default: vertical stack, full-width image
lg (1024px+): horizontal layout, 320px image
sm (640px+): 2-column meta info
```

## 🔄 Animation Delays

```tsx
style={{ animationDelay: `${index * 0.1}s` }}
```

Cards appear with 100ms stagger:

- Card 0: 0ms
- Card 1: 100ms
- Card 2: 200ms
- Card 3: 300ms
- etc.

## 🎯 Interactive Elements

### Clickable Card

```tsx
onClick={() => href && window.open(href, '_blank')}
```

Entire card opens post in new tab

### Pagination Buttons

```tsx
<button
  disabled={!hasPrev || loading}
  className={hasPrev ? 'enabled-style' : 'disabled-style'}
>
```

## 📊 States Checklist

- ✅ Loading (skeleton cards)
- ✅ Error (red alert box)
- ✅ Empty (centered message)
- ✅ Populated (cards list)
- ✅ Paginating (buttons enabled/disabled)

## 🎨 Utility Classes Used

### From App.css

- `card` - base card styling
- `badge` - tag badges
- `btn`, `btn-primary`, `btn-secondary` - buttons
- `gradient-text` - gradient text effect
- `glow` - glow effect
- `animate-fade-in-up` - entrance animation

### Tailwind

- `flex`, `flex-col`, `lg:flex-row` - layout
- `gap-6` - consistent spacing
- `rounded-xl` - border radius
- `backdrop-blur-md` - glass effect
- `transition-all duration-300` - smooth transitions
- `group-hover:` - parent hover effects
- `line-clamp-2` - text truncation

## 🚀 Performance Tips

1. Images support lazy loading
2. Skeleton prevents layout shift
3. Hardware-accelerated transforms (scale, translate)
4. Optimized re-renders with useMemo
5. Abort controller for API cleanup

## 📝 Content Guidelines

### Title

- Max ~70 characters for best display
- 1-2 lines on desktop

### Excerpt

- Max ~200 characters
- 2-3 lines max (line-clamp)

### Tags

- Show max 3 tags
- "+X more" for additional

### Reading Time

- Currently placeholder (5 min)
- Can calculate from word count

## 🔍 TypeScript Types

```typescript
interface ApiPost {
    id?: number | string;
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    created_at?: string;
    published_at?: string;
    updated_at?: string;
    author?: string;
    cover_image?: string;
    tags?: string[] | { name: string }[];
}
```

## 🎯 Key Features

1. **Horizontal Heavy Layout** ✅
2. **Large Image Previews** ✅
3. **Enhanced Typography** ✅
4. **Smooth Animations** ✅
5. **Hover Effects** ✅
6. **Responsive Design** ✅
7. **Loading States** ✅
8. **Error Handling** ✅
9. **Pagination** ✅
10. **Accessibility** ✅

## 🎨 Consistency with Theme

- Same color palette (cyan, violet, emerald)
- Same card styling (.card class)
- Same button styling (.btn classes)
- Same badge styling (.badge class)
- Same animation timing (300-700ms)
- Same spacing system (gap-4, gap-6)
- Same border radius (rounded-xl, rounded-2xl)
- Same hover effects (scale-105, shadow-2xl)

---

**Last Updated:** Based on BlogPage.tsx enhancements
**Status:** ✅ Complete and production-ready
