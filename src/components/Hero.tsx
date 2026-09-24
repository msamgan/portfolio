import data from '../data.json';
import profileImage from '../assets/msamgan.jpeg';
import Link from './Link';

export default function Hero() {
    const github = data.navigation.social.find((s) => s.name === 'GitHub')?.link;

    return (
        <section
            id="home"
            className="editorial relative border-b border-[var(--editorial-line)] pt-28 sm:pt-36 pb-16 sm:pb-24"
        >
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                {/* Eyebrow index line */}
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 eyebrow mb-8 sm:mb-10">
                    <span>01 — Introduction</span>
                    <span className="text-[var(--editorial-line-strong)]">/</span>
                    <span>Software Engineer</span>
                    <span className="text-[var(--editorial-line-strong)]">/</span>
                    <span>Laravel &amp; PHP</span>
                    <span className="text-[var(--editorial-line-strong)]">/</span>
                    <span>Systems at scale</span>
                </div>

                {/* Large editorial headline */}
                <h1 className="font-serif-display font-normal leading-[1.03] text-[13vw] sm:text-[7.5vw] lg:text-[5.6rem] tracking-tight max-w-5xl">
                    I build systems that scale — across logistics, e‑commerce, and cloud
                    infrastructure.
                </h1>

                <div className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-6">
                    <div className="lg:col-span-7 lg:col-start-1">
                        <p className="text-lg sm:text-xl leading-relaxed text-[var(--editorial-muted)] max-w-2xl">
                            {data.intro.text[0]}
                        </p>
                    </div>

                    <div className="lg:col-span-4 lg:col-start-9 flex flex-col justify-between gap-8 border-t border-[var(--editorial-line)] pt-6 lg:border-t-0 lg:pt-0">
                        <div className="flex items-center gap-4">
                            <img
                                src={profileImage}
                                alt={data.name}
                                className="h-14 w-14 rounded-full object-cover grayscale contrast-125"
                            />
                            <div className="font-mono-label text-xs uppercase text-[var(--editorial-muted)] leading-relaxed">
                                <p className="text-[var(--editorial-ink)]">{data.name}</p>
                                <p>{data.contact.address}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 font-mono-label text-xs uppercase text-[var(--editorial-muted)]">
                            <span className="relative flex h-2 w-2">
                                <span className="absolute inline-flex h-full w-full rounded-full bg-[var(--editorial-accent)] opacity-60 animate-ping" />
                                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--editorial-accent)]" />
                            </span>
                            Available for select engagements
                        </div>

                        <div className="flex flex-wrap items-center gap-6 text-sm">
                            <Link
                                href="/contact"
                                className="editorial-link text-[var(--editorial-ink)]"
                            >
                                Work with me →
                            </Link>
                            <Link
                                href="/projects"
                                className="editorial-link text-[var(--editorial-muted)] hover:text-[var(--editorial-ink)]"
                            >
                                View projects
                            </Link>
                            {github && (
                                <a
                                    href={github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="editorial-link text-[var(--editorial-muted)] hover:text-[var(--editorial-ink)]"
                                >
                                    GitHub
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
