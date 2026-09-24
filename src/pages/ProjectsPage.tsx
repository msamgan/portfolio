import data from '../data.json';
import PageShell from '../components/PageShell';
import Stats from '../components/Stats';
import OpenSourceIndex from '../components/OpenSourceIndex';
import ProjectArchive from '../components/ProjectArchive';
import Link from '../components/Link';

export default function ProjectsPage() {
    return (
        <PageShell>
            <section
                id="projects-intro"
                className="editorial border-b border-[var(--editorial-line)] pt-28 sm:pt-36 pb-16 sm:pb-24"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-8">
                    <div className="eyebrow mb-8 sm:mb-10">01 — Projects</div>

                    <h1 className="font-serif-display font-normal leading-[1.02] text-[12vw] sm:text-6xl lg:text-7xl tracking-tight max-w-4xl">
                        Building in public
                    </h1>

                    <p className="mt-8 text-lg sm:text-xl leading-relaxed text-[var(--editorial-muted)] max-w-2xl">
                        Open-source tools, developer utilities, and software projects — the work
                        behind {data.stats.find((s) => s.label.includes('downloads'))?.value}{' '}
                        combined downloads across packages and extensions.
                    </p>
                </div>
            </section>

            <Stats />

            <OpenSourceIndex eyebrow="02 — Open source" />

            <ProjectArchive eyebrow="03 — Featured projects" />

            {/* 04 — Closing / continuation */}
            <section
                id="projects-closing"
                className="editorial py-16 sm:py-24"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-8">
                    <div className="flex items-baseline justify-between gap-6 mb-10 sm:mb-14">
                        <h2 className="eyebrow">04 — Still curious?</h2>
                        <span className="hidden sm:block flex-1 border-t border-[var(--editorial-line)]" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-baseline">
                        <p className="lg:col-span-8 font-serif-display text-2xl sm:text-3xl leading-[1.35] text-[var(--editorial-ink)]">
                            There is always something new being built. Explore the complete
                            archive of my work on GitHub, or reach out directly.
                        </p>

                        <div className="lg:col-span-4 flex flex-col gap-4 lg:items-end">
                            <a
                                href="https://github.com/msamgan"
                                target="_blank"
                                rel="noreferrer"
                                className="editorial-link text-lg text-[var(--editorial-accent)]"
                            >
                                View GitHub archive →
                            </a>
                            <Link
                                href="/contact"
                                className="editorial-link text-[var(--editorial-ink)]"
                            >
                                Get in touch →
                            </Link>
                            <Link
                                href="/contact"
                                className="editorial-link text-[var(--editorial-muted)] hover:text-[var(--editorial-ink)]"
                            >
                                View contact information →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </PageShell>
    );
}
