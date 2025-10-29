export default function SponsorMe() {
    return (
        <div className="relative group mt-12">
            {/* Glowing background effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-500 rounded-2xl opacity-20 group-hover:opacity-40 blur-lg transition-all duration-500 group-hover:blur-xl animate-pulse" />

            <a
                href="https://github.com/sponsors/msamgan"
                target="_blank"
                rel="noopener noreferrer"
                className="relative block overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900/90 via-slate-800/90 to-slate-900/90 border border-white/10 hover:border-pink-500/50 transition-all duration-500 backdrop-blur-sm"
            >
                {/* Top gradient bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-pink-500 via-rose-400 to-pink-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-pink-500/5 via-transparent to-rose-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Shimmer effect */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />
                </div>

                <div className="relative p-8">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                        {/* Left: Icon section */}
                        <div className="flex-shrink-0">
                            <div className="relative">
                                {/* Pulsing ring */}
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-pink-500/30 to-rose-500/30 animate-pulse" />

                                {/* Icon container */}
                                <div className="relative p-4 rounded-2xl bg-gradient-to-br from-pink-500/20 to-rose-500/20 border border-pink-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                    <svg
                                        className="w-8 h-8 text-pink-400 group-hover:text-pink-300 transition-colors"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Middle: Content */}
                        <div className="flex-1 space-y-3">
                            {/* Badge */}
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-300 text-xs font-medium">
                                <span className="relative flex h-2 w-2">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                                </span>
                                <span>Open for Sponsorship</span>
                            </div>

                            {/* Title */}
                            <h3 className="text-2xl md:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-pink-100 to-white group-hover:from-pink-300 group-hover:via-rose-200 group-hover:to-pink-300 transition-all duration-500">
                                Sponsor My Work
                            </h3>

                            {/* Description */}
                            <p className="text-white/70 text-base leading-relaxed group-hover:text-white/90 transition-colors max-w-2xl">
                                Support my open-source contributions and help me create more amazing projects for the community. Every contribution makes a difference! 🚀
                            </p>
                        </div>

                        {/* Right: CTA */}
                        <div className="flex-shrink-0 w-full md:w-auto">
                            <div className="flex flex-col gap-3">
                                {/* Primary button */}
                                <div className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold shadow-lg shadow-pink-500/30 group-hover:shadow-xl group-hover:shadow-pink-500/50 transform group-hover:-translate-y-1 transition-all duration-300">
                                    <svg
                                        className="w-5 h-5"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Become a Sponsor</span>
                                    <svg
                                        className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M9 5l7 7-7 7"
                                        />
                                    </svg>
                                </div>

                                {/* Stats/info */}
                                <div className="flex items-center justify-center gap-2 text-xs text-white/50">
                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                    </svg>
                                    <span>Secure via GitHub Sponsors</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Bottom decorative elements */}
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-pink-500/30 to-transparent" />
                </div>
            </a>
        </div>
    );
}

