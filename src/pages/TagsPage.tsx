import { useEffect, useMemo, useState } from 'react';
import Link from '../components/Link';
import PageShell from '../components/PageShell';

interface TagItem {
    id?: string | number;
    name?: string;
    slug?: string;
    count?: number;
}

type Tag = TagItem | string;

function normalizeTags(raw: unknown): Tag[] {
    const candidates: unknown[] = [];
    const addArray = (value: unknown) => {
        if (Array.isArray(value)) candidates.push(...value);
    };

    if (Array.isArray(raw)) addArray(raw);
    if (raw && typeof raw === 'object') {
        const record = raw as Record<string, unknown>;
        addArray(record.data);
        addArray(record.tags);
        addArray(record.items);
        addArray(record.payload);
        if (record.data && typeof record.data === 'object') {
            const data = record.data as Record<string, unknown>;
            addArray(data.tags);
            addArray(data.items);
        }
        if (candidates.length === 0) addArray(Object.values(record));
    }

    const seen = new Set<string>();
    return candidates
        .filter((item) => item != null)
        .map((item): Tag => {
            if (typeof item === 'string') return item.trim();
            if (typeof item === 'object') {
                const value = item as Record<string, unknown>;
                const name = String(value.name ?? value.slug ?? '');
                const slug = String(value.slug ?? value.name ?? '');
                const countValue = value.count ?? value.posts_count;
                return {
                    name,
                    slug,
                    count: typeof countValue === 'number' ? countValue : undefined,
                };
            }
            return String(item);
        })
        .filter((item) => {
            const key = (typeof item === 'string' ? item : item.slug || item.name || '').toLowerCase();
            if (!key || seen.has(key)) return false;
            seen.add(key);
            return true;
        });
}

function tagLabel(tag: Tag) {
    return typeof tag === 'string' ? tag : tag.name || tag.slug || '';
}

function tagCount(tag: Tag) {
    return typeof tag === 'string' ? null : (tag.count ?? null);
}

function tagHref(tag: Tag) {
    const slug = typeof tag === 'string' ? tag : tag.slug || tag.name || '';
    return `/tag/${encodeURIComponent(slug.toLowerCase().replace(/\s+/g, '-'))}`;
}

export default function TagsPage() {
    const [tags, setTags] = useState<Tag[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<'name' | 'count'>('name');

    const fetchTags = async () => {
        const controller = new AbortController();
        const timeoutId = window.setTimeout(() => controller.abort(), 8000);

        try {
            setLoading(true);
            setError(null);
            const response = await fetch('https://msamgan.dev/api/tag/list', {
                signal: controller.signal,
                headers: { Accept: 'application/json, text/plain, */*' },
                cache: 'no-store',
                referrerPolicy: 'no-referrer',
            });
            if (!response.ok) throw new Error(`Failed to load tags: ${response.status}`);
            const data: unknown = (response.headers.get('content-type') || '').includes('application/json')
                ? await response.json()
                : JSON.parse(await response.text());
            setTags(normalizeTags(data));
        } catch (cause: unknown) {
            if ((cause as { name?: string }).name === 'AbortError') {
                setError('Request timed out while loading tags. Please try again.');
            } else {
                setError(cause instanceof Error ? cause.message : 'Something went wrong while loading tags.');
            }
            setTags([]);
        } finally {
            window.clearTimeout(timeoutId);
            setLoading(false);
        }
    };

    useEffect(() => {
        void fetchTags();
        // Fetch once when the page mounts.
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const filteredTags = useMemo(() => {
        return tags
            .filter((tag) => tagLabel(tag).toLowerCase().includes(searchQuery.toLowerCase()))
            .sort((a, b) =>
                sortBy === 'count'
                    ? (tagCount(b) ?? 0) - (tagCount(a) ?? 0)
                    : tagLabel(a).localeCompare(tagLabel(b))
            );
    }, [tags, searchQuery, sortBy]);

    const taggedItems = tags.reduce((total, tag) => total + (tagCount(tag) ?? 0), 0);

    return (
        <PageShell>
            <section className="editorial border-b border-[var(--editorial-line)] pt-28 pb-14 sm:pt-36 sm:pb-20">
                <div className="mx-auto max-w-7xl px-5 sm:px-8">
                    <div className="eyebrow mb-8 sm:mb-10">01 — Explore</div>
                    <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
                        <div className="lg:col-span-8">
                            <span className="font-mono-label text-xs uppercase text-[var(--editorial-accent)]">
                                Content index
                            </span>
                            <h1 className="mt-5 font-serif-display text-[17vw] font-normal leading-[.88] tracking-tight sm:text-8xl lg:text-9xl">
                                Tags
                            </h1>
                        </div>
                        <p className="max-w-md text-lg leading-relaxed text-[var(--editorial-muted)] lg:col-span-4 lg:pb-2">
                            Browse the subjects, tools, and ideas that shape my writing and work.
                        </p>
                    </div>
                    {!loading && !error && (
                        <div className="mt-12 grid max-w-2xl grid-cols-3 gap-6 border-t border-[var(--editorial-line)] pt-6 sm:mt-16">
                            <div>
                                <div className="font-serif-display text-3xl sm:text-4xl">{tags.length}+</div>
                                <div className="eyebrow mt-2">Total tags</div>
                            </div>
                            <div>
                                <div className="font-serif-display text-3xl sm:text-4xl">{taggedItems}+</div>
                                <div className="eyebrow mt-2">Tagged items</div>
                            </div>
                            <div>
                                <div className="font-serif-display text-3xl sm:text-4xl">100%</div>
                                <div className="eyebrow mt-2">Categorized</div>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            <section className="editorial px-5 py-14 sm:px-8 sm:py-20">
                <div className="mx-auto max-w-7xl">
                    {loading && (
                        <div className="space-y-4" aria-label="Loading tags" aria-busy="true">
                            <div className="h-16 animate-pulse border border-[var(--editorial-line)] bg-white/[.03]" />
                            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
                                {Array.from({ length: 15 }).map((_, index) => (
                                    <div key={index} className="h-14 animate-pulse border border-[var(--editorial-line)] bg-white/[.03]" />
                                ))}
                            </div>
                        </div>
                    )}

                    {error && (
                        <div className="border border-[var(--editorial-line-strong)] p-10 text-center" role="alert">
                            <h2 className="font-serif-display text-2xl">Unable to load tags</h2>
                            <p className="mt-2 text-[var(--editorial-muted)]">{error}</p>
                            <button
                                type="button"
                                onClick={() => void fetchTags()}
                                className="editorial-link mt-6 text-sm text-[var(--editorial-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--editorial-accent)]"
                            >
                                Try again →
                            </button>
                        </div>
                    )}

                    {!loading && !error && (
                        <>
                            <div className="mb-10 flex flex-col gap-5 border-b border-[var(--editorial-line)] pb-6 sm:flex-row sm:items-end sm:justify-between">
                                <div>
                                    <h2 className="font-serif-display text-3xl sm:text-4xl">All tags</h2>
                                    <p className="mt-2 text-sm text-[var(--editorial-muted)]">
                                        {filteredTags.length} {filteredTags.length === 1 ? 'tag' : 'tags'}
                                        {searchQuery && ` matching “${searchQuery}”`}
                                    </p>
                                </div>
                                <div className="flex gap-5 sm:w-[28rem]">
                                    <label className="flex-1">
                                        <span className="eyebrow mb-2 block">Search</span>
                                        <input
                                            type="search"
                                            value={searchQuery}
                                            onChange={(event) => setSearchQuery(event.target.value)}
                                            placeholder="Find a tag…"
                                            className="w-full border-b border-[var(--editorial-line-strong)] bg-transparent py-2 text-[var(--editorial-ink)] placeholder:text-[var(--editorial-muted)] focus:border-[var(--editorial-accent)] focus:outline-none"
                                        />
                                    </label>
                                    <label>
                                        <span className="eyebrow mb-2 block">Order</span>
                                        <select
                                            value={sortBy}
                                            onChange={(event) => setSortBy(event.target.value as 'name' | 'count')}
                                            className="border-b border-[var(--editorial-line-strong)] bg-[var(--editorial-bg)] py-2 text-sm text-[var(--editorial-ink)] focus:border-[var(--editorial-accent)] focus:outline-none"
                                        >
                                            <option value="name">Name</option>
                                            <option value="count">Count</option>
                                        </select>
                                    </label>
                                </div>
                            </div>

                            {filteredTags.length > 0 ? (
                                <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
                                    {filteredTags.map((tag) => (
                                        <Link
                                            key={typeof tag === 'string' ? tag : tag.id ?? tag.slug ?? tag.name}
                                            href={tagHref(tag)}
                                            className="editorial-row group flex items-center justify-between gap-4 py-5 text-lg text-[var(--editorial-ink)]"
                                        >
                                            <span className="truncate">{tagLabel(tag)}</span>
                                            <span className="flex items-center gap-3 text-sm text-[var(--editorial-muted)]">
                                                {tagCount(tag) !== null && tagCount(tag)}
                                                <span className="editorial-arrow text-[var(--editorial-accent)]">↗</span>
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <div className="border border-[var(--editorial-line)] py-16 text-center">
                                    <h2 className="font-serif-display text-2xl">No tags found</h2>
                                    <p className="mx-auto mt-2 max-w-md text-[var(--editorial-muted)]">
                                        {searchQuery
                                            ? `No tags match “${searchQuery}”. Try a different search term.`
                                            : 'No tags are available at the moment.'}
                                    </p>
                                    {searchQuery && (
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
                        </>
                    )}
                </div>
            </section>

            <section className="editorial border-t border-[var(--editorial-line)] px-5 py-20 sm:px-8 sm:py-28">
                <div className="mx-auto max-w-7xl">
                    <div className="eyebrow mb-6">02 — Continue exploring</div>
                    <div className="flex flex-col justify-between gap-8 sm:flex-row sm:items-end">
                        <h2 className="max-w-xl font-serif-display text-4xl leading-tight sm:text-6xl">
                            More things worth reading.
                        </h2>
                        <div className="flex gap-6 text-sm">
                            <Link href="/posts" className="editorial-link text-[var(--editorial-accent)]">View writing →</Link>
                            <Link href="/projects" className="editorial-link text-[var(--editorial-muted)]">See projects →</Link>
                        </div>
                    </div>
                </div>
            </section>
        </PageShell>
    );
}
