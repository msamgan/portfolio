# Projects Page Search Feature

## Date: October 29, 2025

## Summary

Added a **search bar** to the Projects component to allow users to filter projects by name, description, or category in real-time.

---

## Features

### Search Functionality

1. **Real-time Filtering**
   - Projects filter as you type
   - No need to press "Enter" or click a button
   - Uses `useMemo` for optimized performance

2. **Search Scope**
   - Project name
   - Project description
   - Project category (framework, package, extension, tool)

3. **Visual Feedback**
   - Search icon on the left
   - Search icon changes to cyan when input is focused
   - Clear button (X) appears on the right when there's text
   - Results count shown below search bar

4. **Empty State**
   - Friendly message when no results found
   - Sad face icon
   - "Clear search" button to reset

---

## Implementation Details

### State Management

```tsx
const [searchQuery, setSearchQuery] = useState('');

const filteredProjects = useMemo(() => {
    if (!searchQuery.trim()) {
        return data.projects;
    }

    const query = searchQuery.toLowerCase();
    return data.projects.filter(
        (p) =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            getProjectCategory(p.name).toLowerCase().includes(query)
    );
}, [searchQuery]);
```

### Search Bar UI

```tsx
<div className="max-w-2xl mx-auto mb-12 animate-fade-in-up">
    <div className="relative group">
        {/* Search icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <svg>...</svg>
        </div>
        
        {/* Input field */}
        <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects by name, description, or category..."
            className="w-full pl-12 pr-12 py-4 rounded-full ..."
        />
        
        {/* Clear button */}
        {searchQuery && (
            <button onClick={() => setSearchQuery('')}>
                <svg>...</svg>
            </button>
        )}
    </div>
    
    {/* Results count */}
    {searchQuery && (
        <div className="mt-4 text-center text-sm">
            Found {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
        </div>
    )}
</div>
```

### Empty State

```tsx
{filteredProjects.length > 0 ? (
    // Show filtered projects
) : (
    // No results found
    <div className="text-center py-16 animate-fade-in-up">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-6">
            <svg>...</svg> {/* Sad face icon */}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
        <p className="text-[var(--color-muted)] mb-6">
            Try adjusting your search query or{' '}
            <button
                onClick={() => setSearchQuery('')}
                className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
            >
                clear the search
            </button>
        </p>
    </div>
)}
```

---

## Design Details

### Styling

- **Container:** `max-w-2xl mx-auto mb-12` - centered, max width for readability
- **Input:** Rounded full pill shape with glassmorphism
- **Background:** `bg-white/5` with `backdrop-blur-sm`
- **Border:** `border-white/10` with cyan focus ring
- **Hover:** Slight background increase (`hover:bg-white/10`)
- **Icons:** Match site color scheme (muted → cyan on focus)

### Animations

- Fade-in animation on mount
- Smooth transitions on all interactive elements (300ms)
- Clear button fades in/out with search text
- Results count appears/disappears smoothly

### Accessibility

- `aria-label="Clear search"` on clear button
- Proper input type (`type="text"`)
- Keyboard navigation supported
- Focus states clearly visible
- Screen reader friendly

---

## User Experience

### Search Behavior

1. **Empty input:** Shows all projects
2. **Typing:** Filters projects in real-time
3. **No results:** Shows empty state with helpful message
4. **Clear button:** Resets search and shows all projects

### Search Examples

- Type "framework" → Shows Framework X
- Type "laravel" → Shows all Laravel-related projects
- Type "extension" → Shows VS Code extensions
- Type "api" → Shows projects with "api" in description

---

## Performance

- Uses `useMemo` to prevent unnecessary re-filtering
- Only recalculates when `searchQuery` changes
- Efficient string matching (case-insensitive)
- No external dependencies

---

## Comparison with Blog Search

### Similarities
- Same visual design and styling
- Same search icon and clear button
- Same glassmorphism effect
- Same focus states and transitions

### Differences

| Feature | Blog Search | Projects Search |
|---------|------------|-----------------|
| **Scope** | Remote API search | Local data filtering |
| **Debouncing** | Yes (500ms) | No (instant) |
| **Backend** | Server-side | Client-side |
| **State** | Debounced state | Direct state |
| **Performance** | Network requests | Memory filtering |

---

## Files Modified

- `/src/components/Projects.tsx` - Added search bar and filtering logic

---

## Future Improvements

1. **Search Highlighting**
   - Highlight matching text in results
   - Use `<mark>` or custom styling

2. **Advanced Filtering**
   - Filter by category chips
   - Multiple filters at once
   - Sort options (name, date, popularity)

3. **Search History**
   - Remember recent searches
   - Quick access to popular searches

4. **Keyboard Shortcuts**
   - `/` to focus search
   - `Esc` to clear search
   - Arrow keys for result navigation

---

## Testing Checklist

- [x] Search filters by project name
- [x] Search filters by description
- [x] Search filters by category
- [x] Clear button appears when typing
- [x] Clear button resets search
- [x] Results count updates correctly
- [x] Empty state shows when no results
- [x] Empty state has working clear link
- [x] Search is case-insensitive
- [x] Animations work smoothly
- [x] Focus states are visible
- [x] Mobile responsive

---

## Notes

- Search is instant (no debouncing) because it's filtering local data
- Small dataset means performance is not a concern
- Can easily add debouncing later if needed
- Matches the design pattern from BlogPage for consistency

