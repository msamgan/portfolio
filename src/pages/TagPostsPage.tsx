import { useEffect, useMemo, useState } from 'react';
import BlogArticleCard from '../components/blog/BlogArticleCard';
import BlogArticleSkeleton from '../components/blog/BlogArticleSkeleton';
import BlogIcon from '../components/blog/BlogIcon';
import Link from '../components/Link';
import PageShell from '../components/PageShell';
import type { BlogArticle } from '../features/blog/api';

interface TagPostsResponse {
    data?: BlogArticle[];
    items?: BlogArticle[];
    posts?: BlogArticle[];
    meta?: {
        total?: number;
    };
}

const skeletons = Array.from({ length: 4 }, (_, index) => index);

export default function TagPostsPage({ slug }: { slug: string }) {
    const [posts, setPosts] = useState<BlogArticle[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [requestKey, setRequestKey] = useState(0);

    useEffect(() => {
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), 8000);

        async function loadPosts() {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(
                    `https://msamgan.dev/api/post/tag/${encodeURIComponent(slug)}`,
                    {
                        signal: controller.signal,
                        headers: { Accept: 'application/json' },
                    }
                );

                if (!response.ok) {
                    throw new Error(`Failed to load posts: ${response.status}`);
                }

                const payload: TagPostsResponse | BlogArticle[] = await response.json();
                const articles = Array.isArray(payload)
                    ? payload
                    : (payload.data ?? payload.items ?? payload.posts ?? []);
                setPosts(Array.isArray(articles) ? articles : []);
            } catch (cause: unknown) {
                if ((cause as { name?: string }).name !== 'AbortError') {
                    setError(
                        cause instanceof Error
                            ? cause.message
                            : 'Something went wrong while loading tag posts.'
                    );
                    setPosts([]);
                }
            } finally {
                window.clearTimeout(timeoutId);
                setLoading(false);
            }
        }

        void loadPosts();
        return () => {
            controller.abort();
            window.clearTimeout(timeoutId);
        };
    }, [slug, requestKey]);

    const prettyTag = useMemo(
        () => slug.replace(/-/g, ' ').replace(/\b\w/g, (character) => character.toUpperCase()),
        [slug]
    );

    const filteredPosts = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        if (!query) return posts;

        return posts.filter((post) =>
            [post.title, post.excerpt, post.author]
                .filter(Boolean)
                .some((value) => value!.toLowerCase().includes(query))
        );
    }, [posts, searchQuery]);

    return (
        <PageShell>
            <section className="editorial border-b border-[var(--editorial-line)] pt-28 pb-14 sm:pt-36 sm:pb-20">
                <div className="mx-auto max-w-7xl px-5 sm:px-8">
                    <div className="eyebrow mb-8 sm:mb-10">01 — Tagged writing</div>
                    <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
                        <div className="lg:col-span-8">
                            <span className="font-mono-label text-xs uppercase text-[var(--editorial-accent)]">
                                Topic archive
                            </span>
                            <h1 className="mt-5 max-w-5xl font-serif-display text-[15vw] font-normal leading-[.88] tracking-tight sm:text-8xl lg:text-9xl">
                                {prettyTag}
                            </h1>
                        </div>
                        <p className="max-w-md text-lg leading-relaxed text-[var(--editorial-muted)] lg:col-span-4 lg:pb-2">
                            Articles, notes, and experiments gathered around one subject.
                        </p>
                    </div>

                    <div className="mt-12 grid max-w-2xl grid-cols-2 gap-6 border-t border-[var(--editorial-line)] pt-6 sm:mt-16 sm:grid-cols-3">
                        <div>
                            <div className="font-serif-display text-3xl sm:text-4xl">
                                {loading ? '…' : posts.length}
                            </div>
                            <div className="eyebrow mt-2">Articles</div>
                        </div>
                        <div>
                            <div className="font-serif-display text-3xl sm:text-4xl">
                                {loading ? '…' : filteredPosts.length}
                            </div>
                            <div className="eyebrow mt-2">Showing</div>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <div className="font-serif-display text-3xl sm:text-4xl">01</div>
                            <div className="eyebrow mt-2">Topic</div>
                        </div>
                    </div>

                    {!loading && !error && posts.length > 0 && (
                        <div className="mt-12 max-w-2xl sm:mt-16">
                            <label htmlFor="tag-post-search" className="eyebrow mb-3 block">
                                Search this archive
                            </label>
                            <div className="group relative border-b border-[var(--editorial-line-strong)]">
                                <BlogIcon
                                    name="search"
                                    className="pointer-events-none absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--editorial-muted)] transition-colors duration-300 group-focus-within:text-[var(--editorial-accent)]"
                                />
                                <input
                                    id="tag-post-search"
                                    type="search"
                                    value={searchQuery}
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                    placeholder={`Search ${prettyTag} articles…`}
                                    className="w-full bg-transparent py-4 pl-8 pr-12 text-[var(--editorial-ink)] placeholder:text-[var(--editorial-muted)] focus:outline-none"
                                />
                                {searchQuery && (
                                    <button
                                        type="button"
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-0 top-1/2 -translate-y-1/2 text-[var(--editorial-muted)] transition-colors hover:text-[var(--editorial-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--editorial-accent)]"
                                        aria-label="Clear search"
                                    >
                                        <BlogIcon name="clear" className="h-5 w-5" />
                                    </button>
                                )}
                            </div>
                            {searchQuery && (
                                <p className="mt-3 text-sm text-[var(--editorial-muted)]">
                                    {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} match “{searchQuery}”
                                </p>
                            )}
                        </div>
                    )}
                </div>
            </section>

            <section className="editorial px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 flex items-baseline justify-between gap-6 sm:mb-12">
                        <h2 className="eyebrow">02 — Archive</h2>
                        <span className="hidden flex-1 border-t border-[var(--editorial-line)] sm:block" />
                    </div>

                    {error && (
                        <div className="border border-[var(--editorial-line-strong)] p-8 text-center" role="alert">
                            <h2 className="font-serif-display text-2xl">Unable to load this archive</h2>
                            <p className="mt-2 text-sm text-[var(--editorial-muted)]">{error}</p>
                            <button
                                type="button"
                                onClick={() => setRequestKey((key) => key + 1)}
                                className="editorial-link mt-5 text-sm text-[var(--editorial-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--editorial-accent)]"
                            >
                                Try again →
                            </button>
                        </div>
                    )}

                    {loading && (
                        <div className="space-y-6" aria-label="Loading tagged articles" aria-busy="true">
                            {skeletons.map((index) => (
                                <BlogArticleSkeleton key={index} />
                            ))}
                        </div>
                    )}

                    {!loading && !error && posts.length === 0 && (
                        <div className="border border-[var(--editorial-line)] py-16 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[var(--editorial-line)] text-[var(--editorial-muted)]">
                                <BlogIcon name="document" className="h-8 w-8" />
                            </div>
                            <h2 className="mt-5 font-serif-display text-2xl">No articles found</h2>
                            <p className="mx-auto mt-2 max-w-md text-[var(--editorial-muted)]">
                                There are no published articles tagged “{prettyTag}” yet.
                            </p>
                            <Link href="/posts" className="editorial-link mt-5 text-sm text-[var(--editorial-accent)]">
                                Browse all writing →
                            </Link>
                        </div>
                    )}

                    {!loading && !error && posts.length > 0 && filteredPosts.length === 0 && (
                        <div className="border border-[var(--editorial-line)] py-16 text-center">
                            <h2 className="font-serif-display text-2xl">No matches found</h2>
                            <p className="mx-auto mt-2 max-w-md text-[var(--editorial-muted)]">
                                Nothing in this archive matches “{searchQuery}”.
                            </p>
                            <button
                                type="button"
                                onClick={() => setSearchQuery('')}
                                className="editorial-link mt-5 text-sm text-[var(--editorial-accent)]"
                            >
                                Clear search →
                            </button>
                        </div>
                    )}

                    {!loading && !error && filteredPosts.length > 0 && (
                        <div className="space-y-0">
                            {filteredPosts.map((post, index) => (
                                <BlogArticleCard
                                    key={post.id ?? post.slug ?? index}
                                    article={post}
                                    index={index}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </PageShell>
    );
}
