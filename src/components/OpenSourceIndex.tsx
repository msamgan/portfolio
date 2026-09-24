import data from '../data.json';

const packages = data.openSourcePackages;

export default function OpenSourceIndex({
    eyebrow = '05 — Open source',
}: {
    eyebrow?: string;
}) {
    return (
        <section
            id="open-source"
            className="editorial border-b border-[var(--editorial-line)] py-16 sm:py-24"
        >
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="flex items-baseline justify-between gap-6 mb-6">
                    <h2 className="eyebrow">{eyebrow}</h2>
                    <span className="hidden sm:block flex-1 border-t border-[var(--editorial-line)]" />
                </div>

                <p className="max-w-2xl text-lg text-[var(--editorial-muted)] mb-10 sm:mb-14">
                    Tools I've built and maintained — 21,000+ combined downloads across Laravel
                    packages and VS Code extensions.
                </p>

                {/* Table header */}
                <div className="hidden sm:grid grid-cols-12 gap-6 pb-3 border-b border-[var(--editorial-line-strong)] font-mono-label text-[11px] uppercase text-[var(--editorial-muted)]">
                    <span className="col-span-7">Package</span>
                    <span className="col-span-3">Downloads</span>
                    <span className="col-span-2 text-right">Link</span>
                </div>

                <div>
                    {packages.map((p) => (
                        <a
                            key={p.name}
                            href={p.link}
                            target="_blank"
                            rel="noreferrer"
                            className="editorial-row group grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 items-baseline py-6"
                        >
                            <div className="sm:col-span-7">
                                <span className="font-serif-display text-xl sm:text-2xl text-[var(--editorial-ink)]">
                                    {p.name}
                                </span>
                                <p className="mt-1 text-sm text-[var(--editorial-muted)] max-w-md">
                                    {p.desc}
                                </p>
                            </div>
                            <span className="sm:col-span-3 font-mono-label text-sm text-[var(--editorial-accent)]">
                                {p.downloads}
                            </span>
                            <span className="sm:col-span-2 flex sm:justify-end">
                                <span className="editorial-arrow inline-block text-[var(--editorial-muted)] group-hover:text-[var(--editorial-ink)]">
                                    ↗
                                </span>
                            </span>
                        </a>
                    ))}
                </div>

                <div className="pt-8">
                    <a
                        href="https://github.com/msamgan"
                        target="_blank"
                        rel="noreferrer"
                        className="editorial-link text-sm text-[var(--editorial-muted)] hover:text-[var(--editorial-ink)]"
                    >
                        More on GitHub →
                    </a>
                </div>
            </div>
        </section>
    );
}
