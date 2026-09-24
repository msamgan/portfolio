import { useEffect, useMemo } from 'react';
import BlogIcon from '../components/blog/BlogIcon';
import PostContent from '../components/blog/PostContent';
import Link from '../components/Link';
import PageShell from '../components/PageShell';

interface DocsPageProps {
    slug: string;
}

interface Documentation {
    title: string;
    content: string;
}

// Small markdown renderer for the documentation files bundled with the site.
function renderMarkdown(markdown: string): string {
    const lines = markdown.replace(/\r\n?/g, '\n').split('\n');
    const html: string[] = [];
    let inCode = false;
    let codeLang = '';
    let codeBuffer: string[] = [];
    let inList = false;

    const escape = (value: string) =>
        value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    const inline = (value: string) => {
        let text = escape(value);
        text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" />');
        text = text.replace(
            /\[([^\]]+)\]\(([^)]+)\)/g,
            '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
        );
        text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/__([^_]+)__/g, '<strong>$1</strong>');
        text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        text = text.replace(/_([^_]+)_/g, '<em>$1</em>');
        return text.replace(/`([^`]+)`/g, '<code>$1</code>');
    };

    const flushList = () => {
        if (inList) {
            html.push('</ul>');
            inList = false;
        }
    };

    const flushCode = () => {
        if (codeBuffer.length === 0) return;
        html.push(
            `<pre><code${codeLang ? ` class="language-${escape(codeLang)}"` : ''}>${codeBuffer.map(escape).join('\n')}</code></pre>`
        );
        codeBuffer = [];
    };

    for (const line of lines) {
        const fence = line.match(/^```(.*)$/);
        if (fence) {
            if (inCode) {
                inCode = false;
                flushCode();
                codeLang = '';
            } else {
                flushList();
                inCode = true;
                codeLang = fence[1].trim();
            }
            continue;
        }

        if (inCode) {
            codeBuffer.push(line);
            continue;
        }

        const heading = line.match(/^(#{1,6})\s+(.+)$/);
        if (heading) {
            flushList();
            const level = heading[1].length;
            html.push(`<h${level}>${inline(heading[2].trim())}</h${level}>`);
            continue;
        }

        const listItem = line.match(/^\s*[-*]\s+(.+)$/);
        if (listItem) {
            if (!inList) {
                inList = true;
                html.push('<ul>');
            }
            html.push(`<li>${inline(listItem[1].trim())}</li>`);
            continue;
        }

        flushList();
        if (/^\s*$/.test(line)) {
            html.push('');
            continue;
        }
        html.push(`<p>${inline(line)}</p>`);
    }

    if (inCode) flushCode();
    flushList();
    return html.join('\n');
}

function getDocumentation(
    docsMap: Record<string, string>,
    slug: string
): Documentation | null {
    const entry = Object.entries(docsMap).find(([path]) => path.endsWith(`/${slug}/index.md`));
    if (!entry) return null;

    const titleMatch = entry[1].match(/^#\s+(.+)$/m);
    const title = titleMatch?.[1].trim() || slug.replace(/[-_]+/g, ' ');
    const markdown = titleMatch ? entry[1].replace(titleMatch[0], '').trim() : entry[1];

    return { title, content: renderMarkdown(markdown) };
}

function BackToDocumentationLink() {
    return (
        <Link
            href="/documentation"
            className="editorial-link inline-flex items-center gap-2 text-sm text-[var(--editorial-accent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--editorial-accent)]"
        >
            <BlogIcon
                name="arrow-left"
                className="h-4 w-4"
            />
            Back to Documentation
        </Link>
    );
}

export default function DocsPage({ slug }: DocsPageProps) {
    const docsMap = useMemo(
        () =>
            import.meta.glob('/src/assets/docs/**/index.md', {
                query: '?raw',
                import: 'default',
                eager: true,
            }) as Record<string, string>,
        []
    );
    const documentation = useMemo(() => getDocumentation(docsMap, slug), [docsMap, slug]);

    useEffect(() => {
        if (!documentation) return;

        const pageUrl = window.location.href;
        document.title = `${documentation.title} — msamgan`;

        let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
        if (!canonical) {
            canonical = document.createElement('link');
            canonical.rel = 'canonical';
            document.head.appendChild(canonical);
        }
        canonical.href = pageUrl;
    }, [documentation]);

    if (!documentation) {
        return (
            <PageShell>
                <section className="editorial px-5 pt-28 pb-20 sm:px-8 sm:pt-36 sm:pb-28">
                    <div
                        className="mx-auto max-w-3xl border border-[var(--editorial-line-strong)] p-8 text-center"
                        role="alert"
                    >
                        <div className="mx-auto flex h-14 w-14 items-center justify-center border border-[var(--editorial-line)] text-[var(--editorial-muted)]">
                            <BlogIcon
                                name="document"
                                className="h-8 w-8"
                            />
                        </div>
                        <h1 className="mt-5 font-serif-display text-3xl text-[var(--editorial-ink)]">
                            Documentation not found
                        </h1>
                        <p className="mx-auto mt-2 max-w-md text-[var(--editorial-muted)]">
                            This documentation page may have been moved or no longer exists.
                        </p>
                        <div className="mt-6 flex justify-center">
                            <BackToDocumentationLink />
                        </div>
                    </div>
                </section>
            </PageShell>
        );
    }

    return (
        <PageShell>
            <article>
                <section className="editorial relative border-b border-[var(--editorial-line)] pt-28 pb-14 sm:pt-36 sm:pb-20">
                    <div className="mx-auto max-w-4xl px-5 sm:px-8">
                        <BackToDocumentationLink />
                        <div className="mt-8 flex items-center gap-2 font-mono-label text-[11px] uppercase text-[var(--editorial-muted)]">
                            <BlogIcon
                                name="document"
                                className="h-3.5 w-3.5"
                            />
                            Documentation
                        </div>
                        <h1 className="mt-6 max-w-4xl font-serif-display text-4xl font-normal leading-[1.05] tracking-tight text-[var(--editorial-ink)] sm:text-6xl lg:text-7xl">
                            {documentation.title}
                        </h1>
                    </div>
                </section>

                <section className="editorial px-5 py-14 sm:px-8 sm:py-20">
                    <div className="mx-auto max-w-3xl">
                        <PostContent content={documentation.content} />
                        <div className="mt-16 flex justify-between border-t border-[var(--editorial-line)] pt-8">
                            <BackToDocumentationLink />
                        </div>
                    </div>
                </section>
            </article>
        </PageShell>
    );
}
