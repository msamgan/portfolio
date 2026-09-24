import data from '../data.json';

export default function Work() {
    return (
        <section
            id="work"
            className="editorial border-b border-[var(--editorial-line)] py-16 sm:py-24"
        >
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="flex items-baseline justify-between gap-6 mb-10 sm:mb-14">
                    <h2 className="eyebrow">04 — Selected work</h2>
                    <span className="hidden sm:block flex-1 border-t border-[var(--editorial-line)]" />
                </div>

                <div>
                    {data.projects.map((p, i) => {
                        const href = p.link || p.repo;
                        const external = /^https?:\/\//.test(href);
                        return (
                            <a
                                key={p.name}
                                href={href}
                                target={external ? '_blank' : undefined}
                                rel={external ? 'noreferrer' : undefined}
                                className="editorial-row group grid grid-cols-1 sm:grid-cols-12 items-baseline gap-2 sm:gap-6 py-7 sm:py-8"
                            >
                                <span className="sm:col-span-1 font-mono-label text-xs text-[var(--editorial-muted)]">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className="sm:col-span-4 font-serif-display text-2xl sm:text-3xl capitalize text-[var(--editorial-ink)]">
                                    {p.name}
                                </span>
                                <p className="sm:col-span-6 text-[var(--editorial-muted)] leading-relaxed">
                                    {p.description}
                                </p>
                                <span className="sm:col-span-1 flex justify-end">
                                    <span className="editorial-arrow inline-block text-[var(--editorial-accent)]">
                                        ↗
                                    </span>
                                </span>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
