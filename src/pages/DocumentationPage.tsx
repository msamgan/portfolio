import { useMemo } from 'react';
import BlogIcon from '../components/blog/BlogIcon';
import Link from '../components/Link';
import PageShell from '../components/PageShell';
import data from '../data.json';

interface DocumentationEntry {
    name: string;
    description: string;
    link: string;
    repo?: string;
}

interface Documentation {
    title: string;
    name: string;
    description: string;
    link: string;
    repo?: string;
}

function getDocumentationTitle(markdown: string, fallback: string) {
    const titleMatch = markdown.match(/^#\s+(.+)$/m);
    return titleMatch?.[1].trim() || fallback;
}

export default function DocumentationPage() {
    const documentation = useMemo(() => {
        const docsMap = import.meta.glob('/src/assets/docs/**/index.md', {
            query: '?raw',
            import: 'default',
            eager: true,
        }) as Record<string, string>;

        const docs = data.docs as DocumentationEntry[];

        return docs
            .map((doc) => {
                const slug = doc.link.replace(/^\/docs\//, '');
                const markdown = Object.entries(docsMap).find(([path]) =>
                    path.endsWith(`/${slug}/index.md`)
                )?.[1];

                if (!markdown) return null;

                return {
                    ...doc,
                    title: getDocumentationTitle(markdown, doc.name),
                };
            })
            .filter((doc): doc is Documentation => doc !== null);
    }, []);

    return (
        <PageShell>
            <article>
                <section className="editorial border-b border-[var(--editorial-line)] pt-28 pb-14 sm:pt-36 sm:pb-20">
                    <div className="mx-auto max-w-5xl px-5 sm:px-8">
                        <div className="flex items-center gap-2 font-mono-label text-[11px] uppercase text-[var(--editorial-muted)]">
                            <BlogIcon
                                name="document"
                                className="h-3.5 w-3.5"
                            />
                            Documentation
                        </div>
                        <div className="mt-7 grid gap-8 lg:grid-cols-[1fr_20rem] lg:items-end">
                            <h1 className="max-w-3xl font-serif-display text-5xl font-normal leading-[1.05] tracking-tight text-[var(--editorial-ink)] sm:text-7xl">
                                Build from the source.
                            </h1>
                            <p className="max-w-sm text-base leading-relaxed text-[var(--editorial-muted)] lg:pb-1">
                                Practical guides for the open-source packages and tools I maintain.
                                Read the documentation, copy an example, and get moving.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="editorial px-5 py-14 sm:px-8 sm:py-20">
                    <div className="mx-auto max-w-5xl">
                        <div className="mb-8 flex items-end justify-between border-b border-[var(--editorial-line)] pb-4">
                            <h2 className="font-mono-label text-[11px] uppercase text-[var(--editorial-muted)]">
                                Available guides
                            </h2>
                            <span className="font-mono-label text-[11px] text-[var(--editorial-muted)]">
                                {String(documentation.length).padStart(2, '0')} guides
                            </span>
                        </div>

                        {documentation.length > 0 ? (
                            <div className="divide-y divide-[var(--editorial-line)] border-y border-[var(--editorial-line)]">
                                {documentation.map((doc, index) => (
                                    <article
                                        key={doc.link}
                                        className="group grid gap-6 py-8 sm:grid-cols-[3rem_1fr_auto] sm:items-start sm:gap-8"
                                    >
                                        <span className="font-mono-label text-xs text-[var(--editorial-muted)]">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <div>
                                            <h3 className="font-serif-display text-2xl text-[var(--editorial-ink)] transition-colors duration-200 group-hover:text-[var(--editorial-accent)] sm:text-3xl">
                                                {doc.title}
                                            </h3>
                                            <p className="mt-3 max-w-2xl leading-relaxed text-[var(--editorial-muted)]">
                                                {doc.description}
                                            </p>
                                            <div className="mt-5 flex flex-wrap gap-5 font-mono-label text-[11px] uppercase">
                                                <Link
                                                    href={doc.link}
                                                    className="inline-flex items-center gap-2 text-[var(--editorial-accent)] transition-colors hover:text-[var(--editorial-ink)]"
                                                >
                                                    Read guide
                                                    <BlogIcon
                                                        name="arrow-right"
                                                        className="h-3.5 w-3.5"
                                                    />
                                                </Link>
                                                {doc.repo && (
                                                    <a
                                                        href={doc.repo}
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        className="inline-flex items-center gap-2 text-[var(--editorial-muted)] transition-colors hover:text-[var(--editorial-ink)]"
                                                    >
                                                        Repository
                                                        <BlogIcon
                                                            name="external"
                                                            className="h-3.5 w-3.5"
                                                        />
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                        <BlogIcon
                                            name="arrow-right"
                                            className="hidden h-6 w-6 text-[var(--editorial-line-strong)] transition-all duration-200 group-hover:translate-x-1 group-hover:text-[var(--editorial-accent)] sm:block"
                                        />
                                    </article>
                                ))}
                            </div>
                        ) : (
                            <p className="border-y border-[var(--editorial-line)] py-12 text-center text-[var(--editorial-muted)]">
                                Documentation is being prepared.
                            </p>
                        )}
                    </div>
                </section>
            </article>
        </PageShell>
    );
}
