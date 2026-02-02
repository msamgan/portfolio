import { writeFileSync } from 'fs';
import { join } from 'path';

// Base URL for your portfolio
const BASE_URL = 'https://msamgan.com';

// Static pages with their priority and change frequency
const STATIC_PAGES = [
    { url: '/', priority: '1.0', changefreq: 'weekly' },
    { url: '/posts', priority: '0.9', changefreq: 'daily' },
    { url: '/services', priority: '0.8', changefreq: 'monthly' },
    { url: '/projects', priority: '0.8', changefreq: 'monthly' },
    { url: '/about', priority: '0.7', changefreq: 'monthly' },
    { url: '/contact', priority: '0.7', changefreq: 'monthly' },
    { url: '/tools', priority: '0.6', changefreq: 'monthly' },
    { url: '/tags', priority: '0.6', changefreq: 'weekly' },
    { url: '/documentation', priority: '0.6', changefreq: 'monthly' },
];

// Fetch all blog posts from the API
async function fetchAllPosts() {
    const posts = [];
    let page = 1;
    let hasMore = true;

    console.log('Fetching blog posts...');

    while (hasMore) {
        try {
            const url = `https://msamgan.dev/api/post/list/paginated?page=${page}`;
            console.log(`Fetching page ${page}...`);

            const response = await fetch(url);
            if (!response.ok) {
                console.error(`Failed to fetch page ${page}: ${response.status}`);
                break;
            }

            const data = await response.json();
            const pageItems = data.data || data.items || data.posts || [];

            if (pageItems.length === 0) {
                hasMore = false;
                break;
            }

            posts.push(...pageItems);

            // Check if there are more pages
            const meta = data.meta || {};
            const currentPage = meta.current_page || data.current_page || page;
            const totalPages = meta.last_page || meta.total_pages || data.last_page || data.total_pages;

            if (totalPages && currentPage >= totalPages) {
                hasMore = false;
            } else {
                page++;
            }
        } catch (error) {
            console.error(`Error fetching posts at page ${page}:`, error.message);
            hasMore = false;
        }
    }

    console.log(`Fetched ${posts.length} blog posts`);
    return posts;
}

// Fetch all tags from the API
async function fetchAllTags() {
    try {
        console.log('Fetching tags...');
        const response = await fetch('https://msamgan.dev/api/tags');

        if (!response.ok) {
            console.error(`Failed to fetch tags: ${response.status}`);
            return [];
        }

        const data = await response.json();
        const tags = data.data || data.tags || data.items || [];

        console.log(`Fetched ${tags.length} tags`);
        return Array.isArray(tags) ? tags : [];
    } catch (error) {
        console.error('Error fetching tags:', error.message);
        return [];
    }
}

// Format date to W3C format (YYYY-MM-DD)
function formatDate(dateString) {
    if (!dateString) return new Date().toISOString().split('T')[0];

    try {
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    } catch {
        return new Date().toISOString().split('T')[0];
    }
}

// Generate sitemap XML
function generateSitemap(posts, tags) {
    const currentDate = new Date().toISOString().split('T')[0];

    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<!-- This sitemap is automatically generated and follows the standard sitemap protocol. -->\n';
    xml += '<!-- Search engines recognize this format without requiring schema validation. -->\n';
    xml += '<!--suppress XmlUnboundNsPrefix, XmlDefaultAttributeValue -->\n';
    xml += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

    // Add static pages
    STATIC_PAGES.forEach(page => {
        xml += '  <url>\n';
        xml += `    <loc>${BASE_URL}${page.url}</loc>\n`;
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += `    <changefreq>${page.changefreq}</changefreq>\n`;
        xml += `    <priority>${page.priority}</priority>\n`;
        xml += '  </url>\n';
    });

    // Add blog posts
    posts.forEach(post => {
        if (!post.slug) return;

        const lastmod = formatDate(post.updated_at || post.published_at || post.created_at);

        xml += '  <url>\n';
        xml += `    <loc>${BASE_URL}/${post.slug}</loc>\n`;
        xml += `    <lastmod>${lastmod}</lastmod>\n`;
        xml += `    <changefreq>monthly</changefreq>\n`;
        xml += `    <priority>0.7</priority>\n`;
        xml += '  </url>\n';
    });

    // Add tag pages
    tags.forEach(tag => {
        const slug = typeof tag === 'string' ? tag : (tag.slug || tag.name);
        if (!slug) return;

        xml += '  <url>\n';
        xml += `    <loc>${BASE_URL}/tag/${encodeURIComponent(slug)}</loc>\n`;
        xml += `    <lastmod>${currentDate}</lastmod>\n`;
        xml += `    <changefreq>weekly</changefreq>\n`;
        xml += `    <priority>0.5</priority>\n`;
        xml += '  </url>\n';
    });

    xml += '</urlset>';
    return xml;
}

// Main function
async function main() {
    try {
        console.log('Starting sitemap generation...\n');

        // Fetch all data
        const [posts, tags] = await Promise.all([
            fetchAllPosts(),
            fetchAllTags()
        ]);

        // Generate sitemap
        const sitemap = generateSitemap(posts, tags);

        // Write to file
        const outputPath = join(process.cwd(), 'public', 'sitemap.xml');
        writeFileSync(outputPath, sitemap, 'utf-8');

        console.log(`\n✅ Sitemap generated successfully!`);
        console.log(`📍 Location: ${outputPath}`);
        console.log(`📊 Statistics:`);
        console.log(`   - Static pages: ${STATIC_PAGES.length}`);
        console.log(`   - Blog posts: ${posts.length}`);
        console.log(`   - Tag pages: ${tags.length}`);
        console.log(`   - Total URLs: ${STATIC_PAGES.length + posts.length + tags.length}\n`);
    } catch (error) {
        console.error('❌ Error generating sitemap:', error);
        process.exit(1);
    }
}

// Run the script
main();
