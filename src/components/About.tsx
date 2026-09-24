import data from '../data.json';
import profileImage from '../assets/msamgan.jpeg';
import Experience from './Experience';
import OpenSourceIndex from './OpenSourceIndex';
import Stats from './Stats';
import Link from './Link';

const skillGroups = data.skillGroups;
const focusAreas = data.focusAreas;

const resume = data.navigation.pages.find((p) => p.name === 'Resume');

export default function About() {
    return (
        <section
            id="about"
            className="editorial"
        >
            {/* 01 — Editorial header, portrait & introduction */}
            <div className="border-b border-[var(--editorial-line)] pt-28 sm:pt-36 pb-16 sm:pb-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-8">
                    <div className="eyebrow mb-8 sm:mb-10">01 — About</div>

                    <h1 className="font-serif-display font-normal leading-[1.02] text-[12vw] sm:text-6xl lg:text-7xl tracking-tight max-w-4xl">
                        {data.name}
                    </h1>
                    <p className="mt-5 font-mono-label text-xs uppercase text-[var(--editorial-muted)]">
                        {data.title}
                    </p>

                    <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8">
                        {/* Portrait */}
                        <div className="lg:col-span-4">
                            <figure className="border border-[var(--editorial-line)] p-3 sm:p-4">
                                <div className="aspect-[4/5] overflow-hidden">
                                    <img
                                        src={profileImage}
                                        alt={`Portrait of ${data.name}, ${data.title.split('|')[0].trim()}`}
                                        className="h-full w-full object-cover grayscale contrast-125 transition-transform duration-500 hover:scale-[1.02]"
                                    />
                                </div>
                                <figcaption className="mt-3 flex items-baseline justify-between font-mono-label text-[11px] uppercase text-[var(--editorial-muted)]">
                                    <span>Portrait</span>
                                    <span>{data.contact.address}</span>
                                </figcaption>
                            </figure>

                            <dl className="mt-8 space-y-5 font-mono-label text-xs uppercase text-[var(--editorial-muted)]">
                                <div>
                                    <dt className="mb-1 text-[var(--editorial-ink)]">Role</dt>
                                    <dd>{data.title.split('|')[0].trim()}</dd>
                                </div>
                                <div>
                                    <dt className="mb-1 text-[var(--editorial-ink)]">Location</dt>
                                    <dd>{data.contact.address}</dd>
                                </div>
                                <div>
                                    <dt className="mb-1 text-[var(--editorial-ink)]">Focus</dt>
                                    <dd className="normal-case font-sans text-sm text-[var(--editorial-muted)] leading-relaxed">
                                        Laravel / PHP · Full Stack · Cloud Infrastructure
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        {/* Introduction copy */}
                        <div className="lg:col-span-8">
                            <p className="font-serif-display text-2xl sm:text-3xl leading-[1.35] text-[var(--editorial-ink)]">
                                {data.intro.text[0]}
                            </p>
                            <div className="mt-8 space-y-6 max-w-2xl">
                                {data.intro.text.slice(1).map((para, idx) => (
                                    <p
                                        key={idx}
                                        className="text-lg leading-relaxed text-[var(--editorial-muted)]"
                                    >
                                        {para}
                                    </p>
                                ))}
                            </div>

                            <div className="mt-10 flex flex-wrap items-center gap-6 text-sm">
                                <Link
                                    href="/contact"
                                    className="editorial-link text-[var(--editorial-ink)]"
                                >
                                    Get in touch →
                                </Link>
                                <Link
                                    href="/projects"
                                    className="editorial-link text-[var(--editorial-muted)] hover:text-[var(--editorial-ink)]"
                                >
                                    View projects
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Stats />

            {/* 02 — Areas of focus & technical stack */}
            <div className="border-b border-[var(--editorial-line)] py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-8">
                    <div className="flex items-baseline justify-between gap-6 mb-10 sm:mb-14">
                        <h2 className="eyebrow">02 — Areas of focus</h2>
                        <span className="hidden sm:block flex-1 border-t border-[var(--editorial-line)]" />
                    </div>

                    <div className="mb-16 sm:mb-20">
                        {focusAreas.map((label, i) => (
                            <div
                                key={label}
                                className="editorial-row grid grid-cols-1 sm:grid-cols-12 gap-2 sm:gap-6 py-7 sm:py-8"
                            >
                                <span className="sm:col-span-1 font-mono-label text-xs text-[var(--editorial-muted)]">
                                    {String(i + 1).padStart(2, '0')}
                                </span>
                                <span className="sm:col-span-11 font-serif-display text-2xl sm:text-3xl text-[var(--editorial-ink)]">
                                    {label}
                                </span>
                            </div>
                        ))}
                    </div>

                    <h3 className="font-mono-label text-[11px] uppercase text-[var(--editorial-accent)] mb-6">
                        Technical stack
                    </h3>
                    <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
                        {skillGroups.map((g) => (
                            <div key={g.label}>
                                <p className="font-mono-label text-[11px] uppercase text-[var(--editorial-muted)] mb-2">
                                    {g.label}
                                </p>
                                <p className="text-[var(--editorial-ink)] leading-relaxed">
                                    {g.items.join(' · ')}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <Experience eyebrow="03 — Engineering impact" />

            <OpenSourceIndex eyebrow="04 — Open source" />

            {/* 05 — Curriculum vitae */}
            <div className="border-b border-[var(--editorial-line)] py-16 sm:py-24">
                <div className="mx-auto max-w-7xl px-5 sm:px-8">
                    <div className="flex items-baseline justify-between gap-6 mb-10 sm:mb-14">
                        <h2 className="eyebrow">05 — Curriculum vitae</h2>
                        <span className="hidden sm:block flex-1 border-t border-[var(--editorial-line)]" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-baseline">
                        <p className="lg:col-span-8 font-serif-display text-2xl sm:text-3xl leading-[1.35] text-[var(--editorial-ink)]">
                            For a detailed look at my experience and technical background.
                        </p>
                        {resume && (
                            <div className="lg:col-span-4 lg:flex lg:justify-end">
                                <a
                                    href={resume.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="editorial-link text-lg text-[var(--editorial-accent)]"
                                >
                                    Download résumé →
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
}
