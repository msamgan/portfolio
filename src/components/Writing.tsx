import { useEffect, useState } from 'react';
import Link from './Link';

interface ApiPost {
    id?: number | string;
    title?: string;
    slug?: string;
    excerpt?: string;
    created_at?: string;
    published_at?: string;
}

interface ApiResponse {
    data?: ApiPost[];
    items?: ApiPost[];
    posts?: ApiPost[];
}

function formatDate(value?: string) {
    if (!value) return '';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return '';
    return d
        .toLocaleDateString('en-US', { year: '2-digit', month: '2-digit', day: '2-digit' })
        .replace(/\//g, '.');
}

export default function Writing() {
    const [posts, setPosts] = useState<ApiPost[]>([]);
    const [status, setStatus] = useState<'loading' | 'ready' | 'error'>('loading');

    useEffect(() => {
        const controller = new AbortController();

        async function load() {
            try {
                const url = new URL('https://msamgan.dev/api/post/list/paginated');
                url.searchParams.set('page', '1');
                const res = await fetch(url.toString(), { signal: controller.signal });
                if (!res.ok) throw new Error('failed');
                const json: ApiResponse = await res.json();
                const list = json.data ?? json.items ?? json.posts ?? [];
                setPosts(Array.isArray(list) ? list.slice(0, 4) : []);
                setStatus('ready');
            } catch {
                setStatus('error');
            }
        }

        load();
        return () => controller.abort();
    }, []);

    return (
        <section
            id="writing"
            className="editorial border-b border-[var(--editorial-line)] py-16 sm:py-24"
        >
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="flex items-baseline justify-between gap-6 mb-10 sm:mb-14">
                    <h2 className="eyebrow">06 — Writing</h2>
                    <span className="hidden sm:block flex-1 border-t border-[var(--editorial-line)]" />
                </div>

                {status === 'ready' && posts.length > 0 && (
                    <div>
                        {posts.map((p) => (
                            <Link
                                key={p.slug ?? p.id}
                                href={`/${p.slug ?? ''}`}
                                className="editorial-row group grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline py-6"
                            >
                                <span className="sm:col-span-8 font-serif-display text-xl sm:text-2xl text-[var(--editorial-ink)]">
                                    {p.title}
                                </span>
                                {p.excerpt && (
                                    <p className="sm:col-span-3 text-sm text-[var(--editorial-muted)] line-clamp-1">
                                        {p.excerpt}
                                    </p>
                                )}
                                <span className="sm:col-span-1 flex sm:justify-end font-mono-label text-xs text-[var(--editorial-muted)]">
                                    {formatDate(p.published_at ?? p.created_at)}
                                </span>
                            </Link>
                        ))}
                    </div>
                )}

                {status === 'loading' && (
                    <p className="text-[var(--editorial-muted)]">Loading latest posts…</p>
                )}

                {(status === 'error' || (status === 'ready' && posts.length === 0)) && (
                    <p className="text-[var(--editorial-muted)]">
                        Technical notes and how-tos, published as I write them.
                    </p>
                )}

                <div className="pt-8">
                    <Link
                        href="/posts"
                        className="editorial-link text-sm text-[var(--editorial-muted)] hover:text-[var(--editorial-ink)]"
                    >
                        Read the archive →
                    </Link>
                </div>
            </div>
        </section>
    );
}
