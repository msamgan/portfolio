export interface BlogArticle {
    id?: number | string;
    title?: string;
    slug?: string;
    excerpt?: string;
    content?: string;
    created_at?: string;
    published_at?: string;
    updated_at?: string;
    author?: string;
    featured_image?: string;
    tags?: string[] | { name?: string }[];
    status?: string;
    meta_description?: string;
    related_posts?: BlogArticle[];
}

/** Thrown by {@link fetchBlogPost} when the API reports the post doesn't exist. */
export class PostNotFoundError extends Error {
    constructor(slug: string) {
        super(`Post not found: ${slug}`);
        this.name = 'PostNotFoundError';
    }
}

interface BlogApiResponse {
    data?: BlogArticle[];
    items?: BlogArticle[];
    posts?: BlogArticle[];
    page?: number;
    current_page?: number;
    pageSize?: number;
    per_page?: number;
    total?: number;
    total_pages?: number;
    last_page?: number;
    meta?: {
        current_page?: number;
        per_page?: number;
        total?: number;
        last_page?: number;
        total_pages?: number;
    };
}

export interface BlogPagination {
    current: number;
    perPage: number;
    total: number;
    totalPages: number;
}

export interface BlogArticlesResult {
    articles: BlogArticle[];
    pagination: BlogPagination;
}

export async function fetchBlogArticles({
    page,
    query,
    signal,
}: {
    page: number;
    query: string;
    signal: AbortSignal;
}): Promise<BlogArticlesResult> {
    const url = new URL('https://msamgan.dev/api/post/list/paginated');
    url.searchParams.set('page', String(page));

    if (query.trim()) {
        url.searchParams.set('query', query.trim());
    }

    const response = await fetch(url.toString(), { signal });
    if (!response.ok) {
        throw new Error(`Failed to load posts: ${response.status}`);
    }

    const payload: BlogApiResponse = await response.json();
    const articles = payload.data ?? payload.items ?? payload.posts ?? [];
    const list = Array.isArray(articles) ? articles : [];
    const meta = payload.meta ?? {};
    const perPage =
        meta.per_page ?? payload.per_page ?? payload.pageSize ?? (list.length || 10);
    const total = meta.total ?? payload.total ?? 0;

    return {
        articles: list,
        pagination: {
            current: meta.current_page ?? payload.current_page ?? payload.page ?? page,
            perPage,
            total,
            totalPages:
                meta.last_page ??
                meta.total_pages ??
                payload.last_page ??
                payload.total_pages ??
                (perPage ? Math.max(1, Math.ceil(total / perPage)) : 1),
        },
    };
}

/** Fetches a single published post by its slug. */
export async function fetchBlogPost({
    slug,
    signal,
}: {
    slug: string;
    signal: AbortSignal;
}): Promise<BlogArticle> {
    const response = await fetch(`https://msamgan.dev/api/post/${encodeURIComponent(slug)}`, {
        signal,
    });

    if (response.status === 404) {
        throw new PostNotFoundError(slug);
    }

    if (!response.ok) {
        throw new Error(`Failed to load post: ${response.status}`);
    }

    const payload = await response.json();
    const post: BlogArticle | undefined = payload?.data ?? payload;

    if (!post || typeof post !== 'object' || (!post.slug && !post.title)) {
        throw new PostNotFoundError(slug);
    }

    return post;
}
