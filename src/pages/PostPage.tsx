import { useEffect } from 'react';
import BlogArticleCard from '../components/blog/BlogArticleCard';
import BlogIcon from '../components/blog/BlogIcon';
import PostContent from '../components/blog/PostContent';
import PostHeroSkeleton from '../components/blog/PostHeroSkeleton';
import Link from '../components/Link';
import PageShell from '../components/PageShell';
import { formatArticleDate, getArticleTags } from '../features/blog/format';
import { usePost } from '../features/blog/usePost';

interface PostPageProps {
    slug: string;
}

function TagList({ tags }: { tags: string[] }) {
    if (tags.length === 0) return null;

    return (
        <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
                <span
                    key={tag}
                    className="border border-[var(--editorial-line)] px-2 py-1 font-mono-label text-[10px] uppercase text-[var(--editorial-muted)]"
                >
                    #{tag}
                </span>
            ))}
        </div>
    );
}

function BackToBlogLink() {
    return (
        <Link
            href="/posts"
            className="editorial-link inline-flex items-center gap-2 text-sm text-[var(--editorial-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--editorial-accent)]"
        >
            <BlogIcon
                name="arrow-left"
                className="h-4 w-4"
            />
            Back to Blog
        </Link>
    );
}

export default function PostPage({ slug }: PostPageProps) {
    const { post, loading, error, notFound, retry } = usePost(slug);

    // SEO: keep the document head in sync with the API-provided post data.
    // The API response is the sole source of metadata — nothing here is
    // invented.
    useEffect(() => {
        if (!post) return;

        const doc = document;
        const head = doc.head;
        const pageUrl = window.location.href;

        const title = post.title || post.slug || 'Post';
        const description = post.meta_description || post.excerpt || '';
        const image = post.featured_image || '';
        const publishedTime = post.published_at || post.created_at || '';
        const modifiedTime = post.updated_at || publishedTime;

        const upsertMetaByName = (name: string, content: string) => {
            if (!content) return;
            let el = head.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
            if (!el) {
                el = doc.createElement('meta');
                el.setAttribute('name', name);
                head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        const upsertMetaByProperty = (property: string, content: string) => {
            if (!content) return;
            let el = head.querySelector(`meta[property="${property}"]`) as HTMLMetaElement | null;
            if (!el) {
                el = doc.createElement('meta');
                el.setAttribute('property', property);
                head.appendChild(el);
            }
            el.setAttribute('content', content);
        };

        const upsertLink = (rel: string, href: string) => {
            if (!href) return;
            let el = head.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
            if (!el) {
                el = doc.createElement('link');
                el.setAttribute('rel', rel);
                head.appendChild(el);
            }
            el.setAttribute('href', href);
        };

        doc.title = `${title} — msamgan`;
        upsertMetaByName('description', description);
        upsertLink('canonical', pageUrl);

        upsertMetaByProperty('og:title', title);
        upsertMetaByProperty('og:description', description);
        upsertMetaByProperty('og:type', 'article');
        upsertMetaByProperty('og:url', pageUrl);
        if (image) upsertMetaByProperty('og:image', image);
        if (publishedTime) upsertMetaByProperty('article:published_time', publishedTime);
        if (modifiedTime) upsertMetaByProperty('article:modified_time', modifiedTime);

        upsertMetaByName('twitter:card', image ? 'summary_large_image' : 'summary');
        upsertMetaByName('twitter:title', title);
        upsertMetaByName('twitter:description', description);
        if (image) upsertMetaByName('twitter:image', image);
    }, [post]);

    if (loading) {
        return (
            <PageShell>
                <PostHeroSkeleton />
            </PageShell>
        );
    }

    if (error) {
        return (
            <PageShell>
                <section className="editorial px-5 pt-28 pb-20 sm:px-8 sm:pt-36 sm:pb-28">
                    <div
                        className="mx-auto max-w-3xl border border-[var(--editorial-line-strong)] p-8 text-center"
                        role="alert"
                    >
                        <h1 className="font-serif-display text-3xl text-[var(--editorial-ink)]">
                            Unable to load this article
                        </h1>
                        <p className="mt-2 text-sm text-[var(--editorial-muted)]">
                            Please try again in a moment.
                        </p>
                        <div className="mt-6 flex items-center justify-center gap-6">
                            <button
                                type="button"
                                onClick={retry}
                                className="editorial-link text-sm text-[var(--editorial-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--editorial-accent)]"
                            >
                                Try again →
                            </button>
                            <BackToBlogLink />
                        </div>
                    </div>
                </section>
            </PageShell>
        );
    }

    if (notFound || !post) {
        return (
            <PageShell>
                <section className="editorial px-5 pt-28 pb-20 sm:px-8 sm:pt-36 sm:pb-28">
                    <div className="mx-auto max-w-3xl border border-[var(--editorial-line)] py-16 text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[var(--editorial-line)] text-[var(--editorial-muted)]">
                            <BlogIcon
                                name="document"
                                className="h-8 w-8"
                            />
                        </div>
                        <h1 className="mt-5 font-serif-display text-3xl text-[var(--editorial-ink)]">
                            Article not found
                        </h1>
                        <p className="mx-auto mt-2 max-w-md text-[var(--editorial-muted)]">
                            This article may have been moved or no longer exists.
                        </p>
                        <div className="mt-6 flex justify-center">
                            <BackToBlogLink />
                        </div>
                    </div>
                </section>
            </PageShell>
        );
    }

    const tags = getArticleTags(post);
    const date = formatArticleDate(post.published_at ?? post.created_at ?? post.updated_at);
    const relatedPosts = post.related_posts ?? [];

    return (
        <PageShell>
            <>
                <article>
                    {/* Article hero */}
                    <section className="editorial relative border-b border-[var(--editorial-line)] pt-28 sm:pt-36 pb-14 sm:pb-20">
                        <div className="mx-auto max-w-4xl px-5 sm:px-8">
                            <BackToBlogLink />

                            {tags.length > 0 && (
                                <div className="mt-8">
                                    <TagList tags={tags} />
                                </div>
                            )}

                            <h1 className="mt-6 font-serif-display text-4xl font-normal leading-[1.05] tracking-tight text-[var(--editorial-ink)] sm:text-6xl lg:text-7xl">
                                {post.title}
                            </h1>

                            {post.excerpt && (
                                <p className="mt-6 max-w-2xl text-lg leading-relaxed text-[var(--editorial-muted)] sm:text-xl">
                                    {post.excerpt}
                                </p>
                            )}

                            {date && (
                                <div className="mt-8 flex items-center gap-2 font-mono-label text-[11px] uppercase text-[var(--editorial-muted)]">
                                    <BlogIcon
                                        name="calendar"
                                        className="h-3.5 w-3.5"
                                    />
                                    {date}
                                </div>
                            )}
                        </div>

                        {/* Featured image */}
                        <div className="mx-auto mt-14 max-w-5xl px-5 sm:px-8">
                            {post.featured_image ? (
                                <img
                                    src={post.featured_image}
                                    alt={post.title || 'Article featured image'}
                                    loading="lazy"
                                    className="aspect-[16/9] w-full rounded-2xl border border-[var(--editorial-line-strong)] object-cover shadow-2xl"
                                />
                            ) : (
                                <div className="flex aspect-[16/9] w-full items-center justify-center rounded-2xl border border-dashed border-[var(--editorial-line-strong)] bg-white/[0.02]">
                                    <BlogIcon
                                        name="document"
                                        className="h-12 w-12 text-[var(--editorial-muted)]"
                                    />
                                </div>
                            )}
                        </div>
                    </section>

                    {/* Article content */}
                    <section className="editorial px-5 py-14 sm:px-8 sm:py-20">
                        <div className="mx-auto max-w-3xl">
                            <PostContent content={post.content ?? ''} />

                            {/* Article footer */}
                            <div className="mt-16 flex flex-col gap-6 border-t border-[var(--editorial-line)] pt-8 sm:flex-row sm:items-center sm:justify-between">
                                <TagList tags={tags} />
                                <BackToBlogLink />
                            </div>
                        </div>
                    </section>
                </article>

                {/* Related articles */}
                {relatedPosts.length > 0 && (
                    <section className="editorial px-5 pb-20 sm:px-8 sm:pb-28">
                        <div className="mx-auto max-w-7xl">
                            <div className="mb-8 flex items-baseline justify-between gap-6 sm:mb-12">
                                <h2 className="eyebrow">03 — Related articles</h2>
                                <span className="hidden flex-1 border-t border-[var(--editorial-line)] sm:block" />
                            </div>
                            <div className="space-y-0">
                                {relatedPosts.map((related, index) => (
                                    <BlogArticleCard
                                        key={related.id ?? related.slug ?? index}
                                        article={related}
                                        index={index}
                                    />
                                ))}
                            </div>
                        </div>
                    </section>
                )}
            </>
        </PageShell>
    );
}
