# Sitemap Generator

This script automatically generates a `sitemap.xml` file for the portfolio website, including all static pages and dynamic blog posts fetched from the API.

## Features

- ✅ Generates sitemap with all static pages (Home, Posts, Services, Projects, etc.)
- ✅ Fetches and includes all blog posts from the API
- ✅ Includes tag pages (if available)
- ✅ Proper SEO priorities and change frequencies
- ✅ Automatically runs before build
- ✅ W3C compliant sitemap format

## Usage

### Manual Generation

To manually generate the sitemap, run:

```bash
npm run generate:sitemap
```

This will:
1. Fetch all blog posts from `https://msamgan.dev/api/post/list/paginated`
2. Fetch all tags from `https://msamgan.dev/api/tags` (if available)
3. Generate a sitemap.xml file in the `public/` directory

### Automatic Generation

The sitemap is automatically generated when you run:

```bash
npm run build
```

The build script includes the sitemap generation as a pre-build step.

## Output

The generated sitemap will be located at:
```
public/sitemap.xml
```

## URL Structure

### Static Pages
- **Home** (`/`) - Priority: 1.0, Change Frequency: weekly
- **Posts** (`/posts`) - Priority: 0.9, Change Frequency: daily
- **Services** (`/services`) - Priority: 0.8, Change Frequency: monthly
- **Projects** (`/projects`) - Priority: 0.8, Change Frequency: monthly
- **About** (`/about`) - Priority: 0.7, Change Frequency: monthly
- **Contact** (`/contact`) - Priority: 0.7, Change Frequency: monthly
- **Tools** (`/tools`) - Priority: 0.6, Change Frequency: monthly
- **Tags** (`/tags`) - Priority: 0.6, Change Frequency: weekly
- **Documentation** (`/documentation`) - Priority: 0.6, Change Frequency: monthly

### Blog Posts
- URL: `/{slug}`
- Priority: 0.7
- Change Frequency: monthly
- Last Modified: From post's `updated_at`, `published_at`, or `created_at` date

### Tag Pages
- URL: `/tag/{tag-slug}`
- Priority: 0.5
- Change Frequency: weekly

## Configuration

To modify the base URL, static pages, or priorities, edit the `generate-sitemap.js` file:

```javascript
// Change the base URL
const BASE_URL = 'https://msamgan.com';

// Add/modify static pages
const STATIC_PAGES = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    // ... add more pages
];
```

## Example Output

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://msamgan.com/</loc>
    <lastmod>2026-02-02</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>https://msamgan.com/posts</loc>
    <lastmod>2026-02-02</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <!-- ... more URLs ... -->
</urlset>
```

## Statistics

After generation, the script will display statistics like:
```
✅ Sitemap generated successfully!
📍 Location: /Users/.../portfolio/public/sitemap.xml
📊 Statistics:
   - Static pages: 9
   - Blog posts: 80
   - Tag pages: 0
   - Total URLs: 89
```

## Submitting to Search Engines

After generating the sitemap, you can submit it to search engines:

1. **Google Search Console**: https://search.google.com/search-console
   - Add your property
   - Go to Sitemaps
   - Submit: `https://msamgan.com/sitemap.xml`

2. **Bing Webmaster Tools**: https://www.bing.com/webmasters
   - Add your site
   - Submit sitemap URL

3. **Add to robots.txt** (if you have one):
   ```
   Sitemap: https://msamgan.com/sitemap.xml
   ```

## Dependencies

This script uses only Node.js built-in modules:
- `fs` - For writing the sitemap file
- `path` - For path resolution
- Native `fetch` API (Node.js 18+) - For API calls

No additional npm packages required!

## Troubleshooting

### API Issues

If the blog API is unreachable:
- The script will log errors but continue
- It will generate a sitemap with only static pages
- Check the console output for specific error messages

### Empty Sitemap

If no posts are fetched:
- Verify the API endpoint is accessible: `https://msamgan.dev/api/post/list/paginated`
- Check your internet connection
- Look at the console output for API errors

### File Not Created

If the sitemap file isn't created:
- Ensure the `public/` directory exists
- Check file permissions
- Look for error messages in the console

## License

Part of the msamgan.com portfolio project.
