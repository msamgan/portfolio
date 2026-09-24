import { useEffect, useState } from 'react';
import BlogArticleCard from '../components/blog/BlogArticleCard';
import BlogArticleSkeleton from '../components/blog/BlogArticleSkeleton';
import BlogIcon from '../components/blog/BlogIcon';
import BlogPagination from '../components/blog/BlogPagination';
import PageShell from '../components/PageShell';
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
            <section className="relative overflow-hidden px-4 pb-16 pt-28 sm:px-6 sm:pt-36 lg:pb-20">
                <div
                    className="pointer-events-none absolute inset-0"
                    aria-hidden="true"
                >
                    <div className="absolute left-[10%] top-[15%] h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl" />
                    <div className="absolute bottom-[5%] right-[12%] h-72 w-72 rounded-full bg-violet-500/10 blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-4xl text-center">
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-cyan-200 backdrop-blur-sm">
                        Latest Articles
                    </span>
                    <h1 className="mt-6 text-5xl font-bold md:text-6xl lg:text-7xl">Blog</h1>
                    <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-[var(--color-muted)] md:text-xl">
                        Insights, tutorials, and updates from my work and open-source journey.
                    </p>

                    <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4">
                        <BlogStat
                            value={loading ? '...' : String(pagination.total)}
                            label="Total Articles"
                        />
                        <BlogStat
                            value="5"
                            label="Min Avg Read"
                        />
                        <BlogStat
                            value="10+"
                            label="Topics Covered"
                        />
                        <BlogStat
                            value="4+"
                            label="Posts Monthly"
                        />
                    </div>

                    <div className="mx-auto mt-10 max-w-2xl">
                        <label
                            htmlFor="article-search"
                            className="sr-only"
                        >
                            Search articles
                        </label>
                        <div className="group relative">
                            <BlogIcon
                                name="search"
                                className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--color-muted)] transition-colors duration-300 group-focus-within:text-cyan-400"
                            />
                            <input
                                id="article-search"
                                type="search"
                                value={searchQuery}
                                onChange={(event) => setSearchQuery(event.target.value)}
                                placeholder="Search articles..."
                                className="w-full rounded-full border border-white/10 bg-white/5 py-4 pl-12 pr-12 text-white placeholder:text-[var(--color-muted)] backdrop-blur-sm transition-colors duration-300 hover:bg-white/10 focus:border-cyan-400/50 focus:outline-none focus:ring-2 focus:ring-cyan-400/40"
                            />
                            {searchQuery && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[var(--color-muted)] transition-colors hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
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
                            <p className="mt-3 text-sm text-[var(--color-muted)]">
                                Searching for <span className="font-medium text-cyan-300">"{debouncedSearch}"</span>
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <section className="px-4 pb-20 sm:px-6 lg:pb-28">
                <div className="mx-auto max-w-5xl">
                    {error && (
                        <div
                            className="rounded-2xl border border-red-400/30 bg-red-500/10 p-6 text-center"
                            role="alert"
                        >
                            <h2 className="text-lg font-semibold text-red-100">
                                Unable to load articles
                            </h2>
                            <p className="mt-2 text-sm text-red-100/80">
                                Please try again in a moment.
                            </p>
                            <button
                                type="button"
                                onClick={retry}
                                className="mt-4 rounded-full border border-red-200/30 px-4 py-2 text-sm font-medium text-red-100 transition-colors hover:bg-red-200/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200"
                            >
                                Try again
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
                        <div className="card py-16 text-center">
                            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/30">
                                <BlogIcon
                                    name="document"
                                    className="h-8 w-8"
                                />
                            </div>
                            <h2 className="mt-5 text-xl font-semibold text-white/90">
                                No articles found
                            </h2>
                            <p className="mx-auto mt-2 max-w-md text-[var(--color-muted)]">
                                {debouncedSearch
                                    ? `No articles match "${debouncedSearch}". Try a different search term.`
                                    : 'There are currently no articles available. Please check back soon.'}
                            </p>
                            {debouncedSearch && (
                                <button
                                    type="button"
                                    onClick={() => setSearchQuery('')}
                                    className="btn btn-secondary mt-5"
                                >
                                    Clear search
                                </button>
                            )}
                        </div>
                    )}

                    {!loading && !error && articles.length > 0 && (
                        <>
                            <div className="space-y-6">
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

function BlogStat({ value, label }: { value: string; label: string }) {
    return (
        <div className="animate-fade-in-up">
            <p className="gradient-text text-3xl font-bold md:text-4xl">{value}</p>
            <p className="mt-2 text-xs text-[var(--color-muted)] md:text-sm">{label}</p>
        </div>
    );
}
