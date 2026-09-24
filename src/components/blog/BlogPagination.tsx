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
        'editorial-link inline-flex items-center justify-center gap-2 text-sm transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--editorial-accent)] disabled:cursor-not-allowed disabled:opacity-30 enabled:text-[var(--editorial-ink)] enabled:hover:text-[var(--editorial-accent)] enabled:active:translate-y-px';

    return (
        <nav
            className="mt-10 flex flex-col items-center justify-between gap-6 border-t border-[var(--editorial-line)] pt-8 sm:flex-row"
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
                <p className="font-mono-label text-xs uppercase text-[var(--editorial-muted)]">
                    Page <span className="text-[var(--editorial-ink)]">{pagination.current}</span> of{' '}
                    <span className="text-[var(--editorial-ink)]">{pagination.totalPages}</span>
                </p>
                <p className="mt-2 text-xs text-[var(--editorial-muted)]">
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
