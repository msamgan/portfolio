import { useEffect, useState } from 'react';
import {
    fetchBlogArticles,
    type BlogArticle,
    type BlogPagination,
} from './api';

const initialPagination: BlogPagination = {
    current: 1,
    perPage: 10,
    total: 0,
    totalPages: 1,
};

export function useBlogArticles(page: number, query: string) {
    const [articles, setArticles] = useState<BlogArticle[]>([]);
    const [pagination, setPagination] = useState<BlogPagination>(initialPagination);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [retryKey, setRetryKey] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        async function loadArticles() {
            setLoading(true);
            setError(false);

            try {
                const result = await fetchBlogArticles({
                    page,
                    query,
                    signal: controller.signal,
                });
                setArticles(result.articles);
                setPagination(result.pagination);
            } catch (error: unknown) {
                if (error instanceof DOMException && error.name === 'AbortError') {
                    return;
                }

                setError(true);
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadArticles();
        return () => controller.abort();
    }, [page, query, retryKey]);

    return {
        articles,
        pagination,
        loading,
        error,
        retry: () => setRetryKey((value) => value + 1),
    };
}
