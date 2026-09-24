import data from '../data.json';
import BlogIcon from '../components/blog/BlogIcon';
import Link from '../components/Link';
import PageShell from '../components/PageShell';

export default function ToolsPage() {
    return (
        <PageShell>
            <article>
                <section className="editorial border-b border-[var(--editorial-line)] pt-28 pb-14 sm:pt-36 sm:pb-20">
                    <div className="mx-auto max-w-7xl px-5 sm:px-8">
                        <div className="eyebrow mb-8 sm:mb-10">01 — Utilities</div>
                        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
                            <div className="lg:col-span-8">
                                <span className="font-mono-label text-xs uppercase text-[var(--editorial-accent)]">
                                    Free developer tools
                                </span>
                                <h1 className="mt-5 max-w-4xl font-serif-display text-[16vw] font-normal leading-[.88] tracking-tight sm:text-8xl lg:text-9xl">
                                    Tools
                                </h1>
                            </div>
                            <p className="max-w-md text-lg leading-relaxed text-[var(--editorial-muted)] lg:col-span-4 lg:pb-2">
                                Small utilities for the everyday parts of building, shipping, and
                                maintaining software.
                            </p>
                        </div>
                        <div className="mt-12 grid max-w-2xl grid-cols-2 gap-6 border-t border-[var(--editorial-line)] pt-6 sm:mt-16 sm:grid-cols-3">
                            <div>
                                <div className="font-serif-display text-3xl sm:text-4xl">
                                    {String(data.tools.length).padStart(2, '0')}
                                </div>
                                <div className="eyebrow mt-2">Available tools</div>
                            </div>
                            <div>
                                <div className="font-serif-display text-3xl sm:text-4xl">Free</div>
                                <div className="eyebrow mt-2">Open to use</div>
                            </div>
                            <div className="col-span-2 sm:col-span-1">
                                <div className="font-serif-display text-3xl sm:text-4xl">No sign-in</div>
                                <div className="eyebrow mt-2">Start immediately</div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="editorial px-5 py-14 sm:px-8 sm:py-20">
                    <div className="mx-auto max-w-7xl">
                        <div className="mb-8 flex items-end justify-between border-b border-[var(--editorial-line)] pb-4">
                            <h2 className="font-mono-label text-[11px] uppercase text-[var(--editorial-muted)]">
                                Browse the collection
                            </h2>
                            <span className="font-mono-label text-[11px] text-[var(--editorial-muted)]">
                                {String(data.tools.length).padStart(2, '0')} tools
                            </span>
                        </div>

                        {data.tools.length > 0 ? (
                            <div className="divide-y divide-[var(--editorial-line)] border-y border-[var(--editorial-line)]">
                                {data.tools.map((tool, index) => (
                                    <a
                                        key={tool.name}
                                        href={tool.link}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="group grid gap-8 py-8 sm:grid-cols-[3rem_14rem_1fr_auto] sm:items-center sm:gap-8 sm:py-10"
                                    >
                                        <span className="font-mono-label text-xs text-[var(--editorial-muted)]">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <div className="flex aspect-[4/3] items-center justify-center overflow-hidden border border-[var(--editorial-line)] bg-[#111113] p-5">
                                            {tool.img ? (
                                                <img
                                                    src={tool.img}
                                                    alt={`${tool.name} preview`}
                                                    className="max-h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
                                                    loading="lazy"
                                                />
                                            ) : (
                                                <BlogIcon
                                                    name="tool"
                                                    className="h-8 w-8 text-[var(--editorial-muted)]"
                                                />
                                            )}
                                        </div>
                                        <div>
                                            <h3 className="font-serif-display text-3xl text-[var(--editorial-ink)] transition-colors duration-200 group-hover:text-[var(--editorial-accent)] sm:text-4xl">
                                                {tool.name}
                                            </h3>
                                            <p className="mt-3 max-w-2xl leading-relaxed text-[var(--editorial-muted)]">
                                                {tool.description}
                                            </p>
                                            <span className="mt-5 inline-flex items-center gap-2 font-mono-label text-[11px] uppercase text-[var(--editorial-muted)]">
                                                Free utility
                                                <span className="text-[var(--editorial-line-strong)]">/</span>
                                                Runs in your browser
                                            </span>
                                        </div>
                                        <BlogIcon
                                            name="external"
                                            className="hidden h-6 w-6 text-[var(--editorial-line-strong)] transition-all duration-200 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-[var(--editorial-accent)] sm:block"
                                        />
                                    </a>
                                ))}
                            </div>
                        ) : (
                            <div className="border-y border-[var(--editorial-line)] py-16 text-center">
                                <h2 className="font-serif-display text-2xl text-[var(--editorial-ink)]">
                                    More tools are on the way.
                                </h2>
                                <p className="mx-auto mt-2 max-w-md text-[var(--editorial-muted)]">
                                    I&apos;m working on a few small utilities for common developer
                                    tasks.
                                </p>
                            </div>
                        )}
                    </div>
                </section>

                <section className="editorial border-t border-[var(--editorial-line)] px-5 py-20 sm:px-8 sm:py-28">
                    <div className="mx-auto max-w-7xl">
                        <div className="eyebrow mb-6">02 — Build something useful</div>
                        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
                            <h2 className="max-w-3xl font-serif-display text-4xl leading-tight sm:text-6xl lg:col-span-8">
                                Have a small problem worth solving?
                            </h2>
                            <div className="flex flex-col gap-4 text-sm lg:col-span-4 lg:items-end">
                                <p className="max-w-sm leading-relaxed text-[var(--editorial-muted)] lg:text-right">
                                    Tell me what would make your workflow lighter. The best tools
                                    usually start with a recurring annoyance.
                                </p>
                                <div className="flex gap-6">
                                    <Link href="/contact" className="editorial-link text-[var(--editorial-accent)]">
                                        Share an idea →
                                    </Link>
                                    <Link href="/projects" className="editorial-link text-[var(--editorial-muted)]">
                                        View projects →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </article>
        </PageShell>
    );
}
