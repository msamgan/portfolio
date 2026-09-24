import data from '../data.json';

const skillGroups = data.skillGroups;

export default function Skills() {
    return (
        <section
            id="skills"
            className="editorial border-b border-[var(--editorial-line)] py-16 sm:py-24"
        >
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="flex items-baseline justify-between gap-6 mb-10 sm:mb-14">
                    <h2 className="eyebrow">02 — Technology</h2>
                    <span className="hidden sm:block flex-1 border-t border-[var(--editorial-line)]" />
                </div>

                <div className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
                    {skillGroups.map((g) => (
                        <div key={g.label}>
                            <h3 className="font-mono-label text-[11px] uppercase text-[var(--editorial-accent)] mb-4">
                                {g.label}
                            </h3>
                            <ul className="space-y-2">
                                {g.items.map((item) => (
                                    <li
                                        key={item}
                                        className="font-serif-display text-lg sm:text-xl text-[var(--editorial-ink)]"
                                    >
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
