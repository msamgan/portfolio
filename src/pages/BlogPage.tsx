import { useEffect, useState } from 'react';
import BlogArticleCard from '../components/blog/BlogArticleCard';
import BlogArticleSkeleton from '../components/blog/BlogArticleSkeleton';
import BlogIcon from '../components/blog/BlogIcon';
import BlogPagination from '../components/blog/BlogPagination';
import PageShell from '../components/PageShell';
import Stats from '../components/Stats';
import { useBlogArticles } from '../features/blog/useBlogArticles';

const skeletons = Array.from({ length: 4 }, (_, index) => index);

export default function BlogPage() {
    const [page, setPage] = useState(1);
    const [searchQuery, setSearchQuery] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const { articles, pagination, loading, error, retry } = useBlogArticles(
        page,
        debouncedSearch
    );

    useEffect(() => {
        const timer = window.setTimeout(() => {
            setDebouncedSearch(searchQuery);
            setPage(1);
        }, 500);

        return () => window.clearTimeout(timer);
    }, [searchQuery]);

    return (
        <PageShell>
            <section className="editorial relative border-b border-[var(--editorial-line)] pt-28 sm:pt-36 pb-14 sm:pb-20">
                <div className="mx-auto max-w-7xl px-5 sm:px-8">
                    <div className="eyebrow mb-8 sm:mb-10">01 — Writing</div>
                    <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-end">
                        <div className="lg:col-span-8">
                            <span className="font-mono-label text-xs uppercase text-[var(--editorial-accent)]">
                                Latest articles
                            </span>
                            <h1 className="mt-5 max-w-4xl font-serif-display text-[16vw] font-normal leading-[.9] tracking-tight sm:text-8xl lg:text-9xl">
                                Blog
                            </h1>
                        </div>
                        <p className="max-w-md text-lg leading-relaxed text-[var(--editorial-muted)] lg:col-span-4 lg:pb-2">
                        Insights, tutorials, and updates from my work and open-source journey.
                        </p>
                    </div>

                    <div className="mt-12 max-w-2xl sm:mt-16">
                        <label
                            htmlFor="article-search"
                            className="eyebrow mb-3 block"
                        >
                            Search articles
                        </label>
                        <div className="group relative border-b border-[var(--editorial-line-strong)]">
                            <BlogIcon
                                name="search"
                                className="pointer-events-none absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--editorial-muted)] transition-colors duration-300 group-focus-within:text-[var(--editorial-accent)]"
                            />
                            <input
                                id="article-search"
                                type="search"
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                placeholder="Search articles…"
                                className="w-full bg-transparent py-4 pl-8 pr-12 text-[var(--editorial-ink)] placeholder:text-[var(--editorial-muted)] focus:outline-none"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-0 top-1/2 -translate-y-1/2 text-[var(--editorial-muted)] transition-colors hover:text-[var(--editorial-ink)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--editorial-accent)]"
                                    aria-label="Clear search"
                                >
                                    <BlogIcon
                                        name="clear"
                                        className="h-5 w-5"
                                    />
                                </button>
                            )}
                        </div>
                        {debouncedSearch && (
                            <p className="mt-3 text-sm text-[var(--editorial-muted)]">
                                Searching for <span className="text-[var(--editorial-ink)]">"{debouncedSearch}"</span>
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <Stats
                items={[
                    { value: loading ? '...' : String(pagination.total), label: 'Total Articles' },
                    { value: '5', label: 'Min Avg Read' },
                    { value: '10+', label: 'Topics Covered' },
                    { value: '4+', label: 'Posts Monthly' },
                ]}
            />

            <section className="editorial px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-20">
                <div className="mx-auto max-w-7xl">
                    <div className="mb-8 flex items-baseline justify-between gap-6 sm:mb-12">
                        <h2 className="eyebrow">02 — Archive</h2>
                        <span className="hidden flex-1 border-t border-[var(--editorial-line)] sm:block" />
                    </div>
                    {error && (
                        <div
                            className="border border-[var(--editorial-line-strong)] p-8 text-center"
                            role="alert"
                        >
                            <h2 className="font-serif-display text-2xl text-[var(--editorial-ink)]">Unable to load articles</h2>
                            <p className="mt-2 text-sm text-[var(--editorial-muted)]">Please try again in a moment.</p>
                            <button
                                type="button"
                                onClick={retry}
                                className="editorial-link mt-5 text-sm text-[var(--editorial-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--editorial-accent)]"
                            >
                                Try again →
                            </button>
                        </div>
                    )}

                    {loading && (
                        <div
                            className="space-y-6"
                            aria-label="Loading articles"
                            aria-busy="true"
                        >
                            {skeletons.map((index) => (
                                <BlogArticleSkeleton key={index} />
                            ))}
                        </div>
                    )}

                    {!loading && !error && articles.length === 0 && (
                        <div className="border border-[var(--editorial-line)] py-16 text-center">
                            <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[var(--editorial-line)] text-[var(--editorial-muted)]">
                                <BlogIcon
                                    name="document"
                                    className="h-8 w-8"
                                />
                            </div>
                            <h2 className="mt-5 font-serif-display text-2xl text-[var(--editorial-ink)]">No articles found</h2>
                            <p className="mx-auto mt-2 max-w-md text-[var(--editorial-muted)]">
                                {debouncedSearch
                                    ? `No articles match "${debouncedSearch}". Try a different search term.`
                                    : 'There are currently no articles available. Please check back soon.'}
                            </p>
                            {debouncedSearch && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="editorial-link mt-5 text-sm text-[var(--editorial-accent)]"
                                >
                                    Clear search →
                                </button>
                            )}
                        </div>
                    )}

                    {!loading && !error && articles.length > 0 && (
                        <>
                            <div className="space-y-0">
                                {articles.map((article, index) => (
                                    <BlogArticleCard
                                        key={article.id ?? article.slug ?? `${pagination.current}-${index}`}
                                        article={article}
                                        index={index}
                                    />
                                ))}
                            </div>
                            {pagination.totalPages > 1 && (
                                <BlogPagination
                                    pagination={pagination}
                                    loading={loading}
                                    onPrevious={() => setPage((current) => Math.max(1, current - 1))}
                                    onNext={() => setPage((current) => current + 1)}
                                />
                            )}
                        </>
                    )}
                </div>
            </section>
        </PageShell>
    );
}
