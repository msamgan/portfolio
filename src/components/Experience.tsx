import data from '../data.json';

const highlights = data.experienceHighlights;

export default function Experience({
    eyebrow = '03 — Engineering impact',
}: {
    eyebrow?: string;
}) {
    return (
        <section
            id="experience"
            className="editorial border-b border-[var(--editorial-line)] py-16 sm:py-24"
        >
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="flex items-baseline justify-between gap-6 mb-10 sm:mb-14">
                    <h2 className="eyebrow">{eyebrow}</h2>
                    <span className="hidden sm:block flex-1 border-t border-[var(--editorial-line)]" />
                </div>

                <div>
                    {highlights.map((h, i) => (
                        <div
                            key={h.metric}
                            className="editorial-row grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 py-7 sm:py-8"
                        >
                            <span className="sm:col-span-1 font-mono-label text-xs text-[var(--editorial-muted)]">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <span className="sm:col-span-3 font-serif-display text-2xl sm:text-3xl text-[var(--editorial-ink)]">
                                {h.metric}
                            </span>
                            <p className="sm:col-span-8 text-[var(--editorial-muted)] leading-relaxed max-w-2xl">
                                {h.desc}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
