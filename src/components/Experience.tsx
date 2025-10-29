import Section from './Section';

const highlights = [
    {
        metric: '9+ years',
        desc: 'Designing and delivering scalable systems across logistics, e‑commerce, and cloud.',
    },
    {
        metric: '$100k+ saved',
        desc: 'Reduced maintenance and operational costs via ERP, APIs, and performance tuning.',
    },
    {
        metric: 'Complex apps',
        desc: 'Led end‑to‑end architecture and implementation from scratch to production.',
    },
];

export default function Experience() {
    return (
        <Section
            id="experience"
            title="Experience & Impact"
            subtitle="Impact that compounds through thoughtful engineering."
            className={'-mt-18'}
        >
            <div className="grid gap-6 sm:grid-cols-3">
                {highlights.map((h) => (
                    <div
                        key={h.metric}
                        className="card"
                    >
                        <div className="text-2xl font-semibold text-cyan-300">{h.metric}</div>
                        <p className="mt-2 text-[var(--color-muted)]">{h.desc}</p>
                    </div>
                ))}
            </div>
        </Section>
    );
}
