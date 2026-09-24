import data from '../data.json';

type StatItem = { value: string; label: string };

const defaultStats: StatItem[] = data.stats;

export default function Stats({ items = defaultStats }: { items?: StatItem[] }) {
    return (
        <section className="editorial border-b border-[var(--editorial-line)]">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className={`grid grid-cols-1 ${items.length === 4 ? 'sm:grid-cols-4' : 'sm:grid-cols-3'}`}>
                    {items.map((s, i) => (
                        <div
                            key={s.label}
                            className={`py-10 sm:py-14 ${
                                i > 0 ? 'sm:border-l border-[var(--editorial-line)] sm:pl-10' : ''
                            } ${i > 0 ? 'border-t sm:border-t-0' : ''}`}
                        >
                            <div className="font-serif-display text-6xl sm:text-7xl leading-none text-[var(--editorial-ink)]">
                                {s.value}
                            </div>
                            <div className="mt-3 font-mono-label text-xs uppercase text-[var(--editorial-muted)]">
                                {s.label}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
