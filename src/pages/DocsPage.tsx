import { useEffect, useMemo, useRef, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Container from '../components/Container';

interface DocsPageProps {
    slug: string;
}

// Very small markdown -> HTML renderer to support our docs needs without extra deps.
function renderMarkdown(md: string): string {
    // Normalize line endings
    md = md.replace(/\r\n?/g, '\n');

    const lines = md.split('\n');
    const html: string[] = [];

    let inCode = false;
    let codeLang = '';
    let codeBuffer: string[] = [];

    let inList = false;

    const flushCode = () => {
        if (codeBuffer.length) {
            const codeHtml = codeBuffer
                .map((l) => l.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'))
                .join('\n');
            html.push(
                `<pre><code${codeLang ? ` class="language-${codeLang}"` : ''}>${codeHtml}</code></pre>`
            );
            codeBuffer = [];
        }
    };

    const flushList = () => {
        if (inList) {
            html.push('</ul>');
            inList = false;
        }
    };

    const inline = (text: string) => {
        // Escape HTML first
        text = text.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        // Images ![alt](src)
        text = text.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" />');
        // Links [text](url)
        text = text.replace(
            /\[([^\]]+)\]\(([^)]+)\)/g,
            '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>'
        );
        // Bold **text** or __text__
        text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
        text = text.replace(/__([^_]+)__/g, '<strong>$1</strong>');
        // Italic *text* or _text_
        text = text.replace(/\*([^*]+)\*/g, '<em>$1</em>');
        text = text.replace(/_([^_]+)_/g, '<em>$1</em>');
        // Inline code `code`
        text = text.replace(/`([^`]+)`/g, '<code>$1</code>');
        return text;
    };

    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];

        // Handle fenced code blocks
        const fence = line.match(/^```(.*)$/);
        if (fence) {
            if (!inCode) {
                // starting code
                flushList();
                inCode = true;
                codeLang = (fence[1] || '').trim();
                continue;
            } else {
                // ending code
                inCode = false;
                flushCode();
                codeLang = '';
                continue;
            }
        }

        if (inCode) {
            codeBuffer.push(line);
            continue;
        }

        // Headings # .. ######
        const h = line.match(/^(#{1,6})\s+(.+)$/);
        if (h) {
            flushList();
            const level = h[1].length;
            html.push(`<h${level}>${inline(h[2].trim())}</h${level}>`);
            continue;
        }

        // List items starting with - or *
        const li = line.match(/^\s*[-*]\s+(.+)$/);
        if (li) {
            if (!inList) {
                inList = true;
                html.push('<ul>');
            }
            html.push(`<li>${inline(li[1].trim())}</li>`);
            continue;
        } else {
            flushList();
        }

        // Blank line -> paragraph break
        if (/^\s*$/.test(line)) {
            html.push('');
            continue;
        }

        // Paragraph
        html.push(`<p>${inline(line)}</p>`);
    }

    // Flush remaining structures
    if (inCode) {
        inCode = false;
        flushCode();
    }
    flushList();

    return html.join('\n');
}

export default function DocsPage({ slug }: DocsPageProps) {
    const [content, setContent] = useState<string>('');
    const [error, setError] = useState<string | null>(null);
    const [scrollProgress, setScrollProgress] = useState(0);
    const contentRef = useRef<HTMLDivElement>(null);

    // Grab all docs markdown files as raw strings at build-time
    const docsMap = useMemo(() => {
        // Vite's import.meta.glob to import as raw strings
        const modules = import.meta.glob('/src/assets/docs/**/index.md', {
            as: 'raw',
            eager: true,
        }) as Record<string, string>;
        return modules;
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight =
                document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        setError(null);
        setContent('');
        // Find the matching doc by slug
        const entry = Object.entries(docsMap).find(([path]) => path.endsWith(`/${slug}/index.md`));
        if (!entry) {
            setError('Documentation not found.');
            return;
        }
        const raw = entry[1];
        const html = renderMarkdown(raw);
        setContent(html);
    }, [slug, docsMap]);

    // Enhance code blocks with copy buttons similar to PostPage
    useEffect(() => {
        if (!contentRef.current) return;
        const preBlocks = contentRef.current.querySelectorAll('pre');
        preBlocks.forEach((pre) => {
            if (pre.querySelector('.copy-code-button')) return;
            const code = pre.querySelector('code');
            if (!code) return;
            (pre as HTMLElement).style.position = 'relative';
            const button = document.createElement('button');
            button.className = 'copy-code-button';
            button.setAttribute('aria-label', 'Copy code');
            button.innerHTML = `
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
            `;
            button.addEventListener('click', () => {
                const codeText = code.textContent || '';
                navigator.clipboard.writeText(codeText).then(() => {
                    button.innerHTML = `
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                        </svg>
                    `;
                    setTimeout(() => {
                        button.innerHTML = `
                            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        `;
                    }, 2000);
                });
            });
            pre.appendChild(button);
        });
    }, [content]);

    return (
        <div className="min-h-screen bg-[var(--color-bg)] text-white relative overflow-hidden">
            {/* Scroll progress indicator */}
            <div
                className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500"
                style={{ width: `${scrollProgress}%`, transition: 'width 0.1s ease' }}
            />

            {/* Background decorative elements */}
            <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
            <div
                className="absolute bottom-20 left-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse pointer-events-none"
                style={{ animationDelay: '1s' }}
            />

            {/* Abstract geometric figures */}
            <div className="absolute inset-0 pointer-events-none opacity-20">
                <svg
                    className="absolute top-32 right-1/4 w-24 h-24 animate-float"
                    style={{ animationDuration: '6s' }}
                    viewBox="0 0 100 100"
                >
                    <path
                        d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z"
                        fill="none"
                        stroke="url(#gradient1)"
                        strokeWidth="1.5"
                        className="animate-pulse"
                    />
                    <defs>
                        <linearGradient
                            id="gradient1"
                            x1="0%"
                            y1="0%"
                            x2="100%"
                            y2="100%"
                        >
                            <stop
                                offset="0%"
                                stopColor="#22d3ee"
                            />
                            <stop
                                offset="100%"
                                stopColor="#a78bfa"
                            />
                        </linearGradient>
                    </defs>
                </svg>

                <svg
                    className="absolute top-1/3 left-16 w-20 h-20 animate-float"
                    style={{ animationDuration: '8s', animationDelay: '1s' }}
                    viewBox="0 0 100 100"
                >
                    <circle
                        cx="50"
                        cy="50"
                        r="20"
                        fill="none"
                        stroke="#22d3ee"
                        strokeWidth="1.5"
                        opacity="0.6"
                    />
                    <circle
                        cx="50"
                        cy="50"
                        r="30"
                        fill="none"
                        stroke="#a78bfa"
                        strokeWidth="1.5"
                        opacity="0.4"
                    />
                </svg>

                <svg
                    className="absolute bottom-1/4 right-20 w-16 h-16 animate-float"
                    style={{ animationDuration: '7s', animationDelay: '2s' }}
                    viewBox="0 0 100 100"
                >
                    <rect
                        x="25"
                        y="25"
                        width="50"
                        height="50"
                        fill="none"
                        stroke="#34d399"
                        strokeWidth="1.5"
                        opacity="0.5"
                        transform="rotate(45 50 50)"
                    />
                </svg>
            </div>

            <Navbar />

            <main className="relative pt-24 pb-20 min-h-screen">
                <Container>
                    {/* Breadcrumb Navigation */}
                    <div className="mb-8">
                        <a
                            href="/documentation"
                            className="inline-flex items-center gap-2 text-[var(--color-muted)] hover:text-cyan-400 transition-colors group"
                        >
                            <svg
                                className="w-5 h-5 transition-transform group-hover:-translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            <span>Back to Documentation</span>
                        </a>
                    </div>

                    {/* Page Header */}
                    <div className="mb-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20">
                            <svg
                                className="w-3.5 h-3.5 text-cyan-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                />
                            </svg>
                            <span className="text-xs text-cyan-300 font-medium">Documentation</span>
                        </div>
                    </div>

                    {/* Content Area */}
                    {error ? (
                        <div className="card bg-gradient-to-br from-red-500/10 via-red-500/5 to-transparent border-2 border-red-500/30 relative overflow-hidden">
                            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent" />
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-red-500/20 to-red-600/20 flex items-center justify-center flex-shrink-0 border border-red-500/30">
                                    <svg
                                        className="w-6 h-6 text-red-400"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                        />
                                    </svg>
                                </div>
                                <div>
                                    <h3 className="text-xl font-bold text-red-300 mb-2">
                                        Documentation Not Found
                                    </h3>
                                    <p className="text-red-200/80">
                                        {error} Please check the URL or return to the documentation
                                        index.
                                    </p>
                                    <a
                                        href="/documentation"
                                        className="inline-flex items-center gap-2 mt-4 px-4 py-2 rounded-lg bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 hover:border-red-500/50 text-red-300 transition-all"
                                    >
                                        View All Documentation
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="max-w-4xl">
                            {/* Main content card */}
                            <article
                                ref={contentRef}
                                className="post-content prose prose-invert max-w-none"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />

                            {/* Feedback section */}
                            <div className="mt-16 pt-8 border-t border-white/10">
                                <div className="card bg-gradient-to-br from-cyan-500/5 via-violet-500/5 to-emerald-500/5 border border-white/10 relative overflow-hidden">
                                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 flex items-center justify-center flex-shrink-0">
                                                <svg
                                                    className="w-6 h-6 text-white"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                    />
                                                </svg>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-bold gradient-text mb-1">
                                                    Was this helpful?
                                                </h3>
                                                <p className="text-sm text-[var(--color-muted)]">
                                                    Let us know if you have feedback or need more
                                                    information.
                                                </p>
                                            </div>
                                        </div>
                                        <a
                                            href="/contact"
                                            className="btn btn-primary btn-sm whitespace-nowrap"
                                        >
                                            Contact Support
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </Container>
            </main>

            <Footer />
        </div>
    );
}
