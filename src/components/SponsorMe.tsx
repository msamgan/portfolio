export default function SponsorMe() {
    return (
        <a
            href="https://github.com/sponsors/msamgan"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative flex flex-col gap-6 border border-[var(--editorial-line)] px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8 sm:py-8 transition-colors duration-300 hover:border-[var(--editorial-accent)]"
        >
            <div className="flex items-start gap-4 sm:items-center">
                <svg
                    className="mt-1 h-6 w-6 flex-shrink-0 text-[var(--editorial-accent)] sm:mt-0"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                </svg>

                <div>
                    <p className="font-mono-label text-[11px] uppercase tracking-[0.14em] text-[var(--editorial-muted)]">
                        Open for sponsorship
                    </p>
                    <h3 className="font-serif-display mt-1 text-xl sm:text-2xl text-[var(--editorial-ink)]">
                        Sponsor my work
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--editorial-muted)]">
                        Support my open-source contributions and help me keep building tools
                        for the community.
                    </p>
                </div>
            </div>

            <div className="flex flex-shrink-0 items-center gap-2 self-start font-mono-label text-xs uppercase tracking-[0.1em] text-[var(--editorial-ink)] sm:self-center">
                <span className="border-b border-[var(--editorial-ink)] pb-0.5 transition-colors group-hover:border-[var(--editorial-accent)] group-hover:text-[var(--editorial-accent)]">
                    Become a sponsor
                </span>
                <span className="editorial-arrow text-[var(--editorial-accent)]" aria-hidden="true">
                    ↗
                </span>
            </div>
        </a>
    );
}
