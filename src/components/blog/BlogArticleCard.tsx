import type { BlogArticle } from '../../features/blog/api';
import { formatArticleDate, getArticleTags } from '../../features/blog/format';
import BlogIcon from './BlogIcon';
import Link from '../Link';

const MAX_VISIBLE_TAGS = 3;

export default function BlogArticleCard({
    article,
    index,
}: {
    article: BlogArticle;
    index: number;
}) {
    const date = formatArticleDate(
        article.published_at ?? article.created_at ?? article.updated_at,
        'short'
    );
    const tags = getArticleTags(article);
    const href = article.slug ? `/${article.slug}` : undefined;
    const title = article.title ?? article.slug ?? 'Untitled article';
    const cardContent = (
        <div className="py-7 sm:py-8">
            <div className="flex min-w-0 flex-col gap-4">
                {date && (
                    <div className="flex items-center gap-2 text-xs text-[var(--color-muted)]">
                        <span className="inline-flex items-center gap-1.5 font-mono-label text-[10px] uppercase text-[var(--editorial-muted)]">
                            <BlogIcon
                                name="calendar"
                                className="h-3.5 w-3.5"
                            />
                            {date}
                        </span>
                    </div>
                )}

                <h2 className="max-w-3xl font-serif-display text-2xl font-normal leading-tight text-[var(--editorial-ink)] transition-colors duration-300 group-hover:text-[var(--editorial-accent)] md:text-3xl">
                    {title}
                </h2>

                {article.excerpt && (
                    <p className="line-clamp-3 max-w-2xl leading-relaxed text-[var(--editorial-muted)]">
                        {article.excerpt}
                    </p>
                )}

                <div className="mt-auto flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                            {tags.slice(0, MAX_VISIBLE_TAGS).map((tag) => (
                                <span key={tag} className="border border-[var(--editorial-line)] px-2 py-1 font-mono-label text-[10px] uppercase text-[var(--editorial-muted)]">
                                    #{tag}
                                </span>
                            ))}
                            {tags.length > MAX_VISIBLE_TAGS && (
                                <span className="border border-[var(--editorial-line)] px-2 py-1 font-mono-label text-[10px] uppercase text-[var(--editorial-muted)]">
                                    +{tags.length - MAX_VISIBLE_TAGS} more
                                </span>
                            )}
                        </div>
                    )}

                    {href && (
                        <span className="editorial-link inline-flex items-center gap-2 text-sm text-[var(--editorial-accent)]">
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
            className="editorial-row animate-fade-in-up"
            style={{ animationDelay: `${Math.min(index, 6) * 100}ms` }}
        >
            {href ? (
                <Link
                    href={href}
                    className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--editorial-accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--editorial-bg)]"
                    aria-label={`Read article: ${title}`}
                >
                    {cardContent}
                </Link>
            ) : (
                <div className="group block">{cardContent}</div>
            )}
        </article>
    );
}
