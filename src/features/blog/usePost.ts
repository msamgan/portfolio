import { useEffect, useState } from 'react';
import { fetchBlogPost, PostNotFoundError, type BlogArticle } from './api';

export function usePost(slug: string) {
    const [post, setPost] = useState<BlogArticle | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [notFound, setNotFound] = useState(false);
    const [retryKey, setRetryKey] = useState(0);

    useEffect(() => {
        const controller = new AbortController();

        async function loadPost() {
            setLoading(true);
            setError(false);
            setNotFound(false);
            setPost(null);

            try {
                const result = await fetchBlogPost({ slug, signal: controller.signal });
                setPost(result);
            } catch (err: unknown) {
                if (err instanceof DOMException && err.name === 'AbortError') {
                    return;
                }

                if (err instanceof PostNotFoundError) {
                    setNotFound(true);
                } else {
                    setError(true);
                }
            } finally {
                if (!controller.signal.aborted) {
                    setLoading(false);
                }
            }
        }

        loadPost();
        return () => controller.abort();
    }, [slug, retryKey]);

    return {
        post,
        loading,
        error,
        notFound,
        retry: () => setRetryKey((value) => value + 1),
    };
}
