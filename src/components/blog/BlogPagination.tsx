import type { BlogPagination as BlogPaginationData } from '../../features/blog/api';
import BlogIcon from './BlogIcon';

export default function BlogPagination({
    pagination,
    loading,
    onPrevious,
    onNext,
}: {
    pagination: BlogPaginationData;
    loading: boolean;
    onPrevious: () => void;
    onNext: () => void;
}) {
    const canGoPrevious = pagination.current > 1;
    const canGoNext = pagination.current < pagination.totalPages;
    const buttonClass =
        'inline-flex min-w-32 items-center justify-center gap-2 rounded-full border px-6 py-3 text-sm font-medium transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/70 disabled:cursor-not-allowed disabled:border-white/10 disabled:text-white/40 enabled:border-white/20 enabled:text-white enabled:hover:border-white/30 enabled:hover:bg-white/10 enabled:active:scale-[0.98]';

    return (
        <nav
            className="mt-12 flex flex-col items-center justify-between gap-6 border-t border-white/10 pt-8 sm:flex-row"
            aria-label="Blog pagination"
        >
            <button
                type="button"
                disabled={!canGoPrevious || loading}
                onClick={onPrevious}
                className={buttonClass}
                aria-label="Go to previous page"
            >
                <BlogIcon
                    name="arrow-left"
                    className="h-4 w-4"
                />
                Previous
            </button>

            <div className="text-center">
                <p className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-[var(--color-muted)]">
                    Page <span className="font-semibold text-white">{pagination.current}</span> of{' '}
                    <span className="font-semibold text-white">{pagination.totalPages}</span>
                </p>
                <p className="mt-2 text-xs text-[var(--color-muted)]">
                    ({pagination.total} total articles)
                </p>
            </div>

            <button
                type="button"
                disabled={!canGoNext || loading}
                onClick={onNext}
                className={buttonClass}
                aria-label="Go to next page"
            >
                Next
                <BlogIcon
                    name="arrow-right"
                    className="h-4 w-4"
                />
            </button>
        </nav>
    );
}
