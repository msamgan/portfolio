import PageShell from '../components/PageShell';
import Stats from '../components/Stats';
import Services from '../components/Services';
import Link from '../components/Link';

const heroStats = [
    { value: '9+', label: 'Years experience' },
    { value: '50+', label: 'Projects delivered' },
    { value: '8', label: 'Service areas' },
];

export default function ServicesPage() {
    return (
        <PageShell>
            <section
                id="services-intro"
                className="editorial border-b border-[var(--editorial-line)] pt-28 sm:pt-36 pb-16 sm:pb-24"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-8">
                    <div className="eyebrow mb-8 sm:mb-10">01 — Services</div>

                    <h1 className="font-serif-display font-normal leading-[1.02] text-[12vw] sm:text-6xl lg:text-7xl tracking-tight max-w-4xl">
                        Expert Solutions for Your Business
                    </h1>

                    <p className="mt-8 text-lg sm:text-xl leading-relaxed text-[var(--editorial-muted)] max-w-2xl">
                        Leverage my 9+ years of experience to build scalable, high-performance
                        solutions that drive real results.
                    </p>
                </div>
            </section>

            <Stats items={heroStats} />

            <Services eyebrow="02 — Services" />

            {/* 03 — Closing CTA */}
            <section
                id="services-closing"
                className="editorial py-16 sm:py-24"
            >
                <div className="mx-auto max-w-7xl px-5 sm:px-8">
                    <div className="flex items-baseline justify-between gap-6 mb-10 sm:mb-14">
                        <h2 className="eyebrow">03 — Ready to start?</h2>
                        <span className="hidden sm:block flex-1 border-t border-[var(--editorial-line)]" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-baseline">
                        <div className="lg:col-span-8">
                            <p className="font-serif-display text-2xl sm:text-3xl leading-[1.35] text-[var(--editorial-ink)]">
                                Ready to Start Your Project?
                            </p>
                            <p className="mt-4 text-lg leading-relaxed text-[var(--editorial-muted)] max-w-xl">
                                Let's discuss how I can help you build something amazing. Get in
                                touch today for a free consultation.
                            </p>
                        </div>

                        <div className="lg:col-span-4 flex flex-col gap-4 lg:items-end">
                            <a
                                href="mailto:mail@msamgan.com"
                                className="editorial-link text-lg text-[var(--editorial-accent)]"
                            >
                                Get in Touch →
                            </a>
                            <Link
                                href="/#contact"
                                className="editorial-link text-[var(--editorial-ink)]"
                            >
                                View Contact Info →
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </PageShell>
    );
}
