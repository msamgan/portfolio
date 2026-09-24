import type { BlogArticle } from '../../features/blog/api';
import BlogIcon from './BlogIcon';

const MAX_VISIBLE_TAGS = 3;

function formatDate(value?: string) {
    if (!value) return '';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';

    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    });
}

function getTags(article: BlogArticle) {
    if (!Array.isArray(article.tags)) return [];

    return article.tags
        .map((tag) => (typeof tag === 'string' ? tag : tag.name))
        .filter((tag): tag is string => Boolean(tag));
}

export default function BlogArticleCard({
    article,
    index,
}: {
    article: BlogArticle;
    index: number;
}) {
    const date = formatDate(article.published_at ?? article.created_at ?? article.updated_at);
    const tags = getTags(article);
    const href = article.slug ? `/${article.slug}` : undefined;
    const title = article.title ?? article.slug ?? 'Untitled article';
    const cardContent = (
        <div className="flex flex-col gap-6 lg:flex-row">
            <div className="relative aspect-video w-full shrink-0 overflow-hidden rounded-xl bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-emerald-500/10 lg:w-80 lg:aspect-[4/3]">
                {article.featured_image ? (
                    <img
                        src={article.featured_image}
                        alt={title}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 motion-reduce:transition-none group-hover:scale-105"
                    />
                ) : (
                    <div className="flex h-full items-center justify-center text-white/20">
                        <BlogIcon
                            name="document"
                            className="h-14 w-14"
                        />
                    </div>
                )}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent transition-opacity duration-500 group-hover:opacity-50 motion-reduce:transition-none" />
                {href && (
                    <span className="pointer-events-none absolute right-4 top-4 rounded-lg border border-white/20 bg-white/10 p-2 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:scale-100 group-hover:opacity-100 motion-reduce:transition-none">
                        <BlogIcon
                            name="external"
                            className="h-4 w-4"
                        />
                    </span>
                )}
            </div>

            <div className="flex min-w-0 flex-1 flex-col gap-4">
                {date && (
                    <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
                        <span className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5">
                            <BlogIcon
                                name="calendar"
                                className="h-3.5 w-3.5"
                            />
                            {date}
                        </span>
                    </div>
                )}

                <h2 className="text-2xl font-bold leading-tight transition-colors duration-300 group-hover:text-cyan-200 md:text-3xl">
                    {title}
                </h2>

                {article.excerpt && (
                    <p className="line-clamp-3 leading-relaxed text-[var(--color-muted)]">
                        {article.excerpt}
                    </p>
                )}

                <div className="mt-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {tags.slice(0, MAX_VISIBLE_TAGS).map((tag) => (
                                <span
                                    key={tag}
                                    className="badge hover:bg-gradient-to-r hover:from-cyan-500/20 hover:via-violet-500/20 hover:to-emerald-500/20"
                                >
                                    #{tag}
                                </span>
                            ))}
                            {tags.length > MAX_VISIBLE_TAGS && (
                                <span className="badge">
                                    +{tags.length - MAX_VISIBLE_TAGS} more
                                </span>
                            )}
                        </div>
                    )}

                    {href && (
                        <span className="inline-flex items-center gap-2 font-medium text-cyan-300 transition-colors duration-300 group-hover:text-cyan-200">
                            Read article
                            <BlogIcon
                                name="arrow-right"
                                className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 motion-reduce:transition-none"
                            />
                        </span>
                    )}
                </div>
            </div>
        </div>
    );

    return (
        <article
            className="animate-fade-in-up"
            style={{ animationDelay: `${Math.min(index, 6) * 100}ms` }}
        >
            {href ? (
                <a
                    href={href}
                    className="card group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--color-bg)]"
                    aria-label={`Read article: ${title}`}
                >
                    {cardContent}
                </a>
            ) : (
                <div className="card">{cardContent}</div>
            )}
        </article>
    );
}
