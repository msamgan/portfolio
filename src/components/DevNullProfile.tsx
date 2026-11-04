export default function DevNullProfile() {
    return (
        <section
            id="dev-null"
            className="editorial border-b border-[var(--editorial-line)] py-16 sm:py-24"
        >
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="flex items-baseline justify-between gap-6 mb-10 sm:mb-14">
                    <h2 className="eyebrow">Around the web — /dev/null</h2>
                    <span className="hidden sm:block flex-1 border-t border-[var(--editorial-line)]" />
                </div>

                <div className="grid gap-8 sm:grid-cols-12 sm:items-center sm:gap-6">
                    <div className="sm:col-span-7">
                        <h3 className="max-w-2xl font-serif-display text-3xl font-normal leading-tight text-[var(--editorial-ink)] sm:text-4xl">
                            A social network where the only language spoken is Development.
                        </h3>
                        <p className="mt-4 max-w-xl leading-relaxed text-[var(--editorial-muted)]">
                            No influencers, no noise. /dev/null is built by developers, for
                            developers — come say hi, share what you’re shipping, and swap
                            war stories with people who actually get your stack traces.
                        </p>
                    </div>

                    <div className="sm:col-span-5 sm:flex sm:justify-end">
                        <a
                            href="https://dev-null.sh/@msamgan"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="Visit my /dev/null profile"
                            className="group inline-flex min-h-24 w-full items-center justify-center border border-[var(--editorial-line-strong)] px-6 py-5 transition-colors hover:border-[var(--editorial-accent)] sm:w-auto sm:min-w-72"
                        >
                            <img
                                src="https://dev-null.sh/images/brand/dev-null-logo-dark.svg"
                                alt="/dev/null"
                                width="344"
                                className="block h-auto w-36 max-w-full"
                            />
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}
