import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import data from '../data.json';

export default function ToolsPage() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight =
                document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Scroll progress indicator */}
            <div
                className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500"
                style={{ width: `${scrollProgress}%`, transition: 'width 0.1s ease' }}
            />

            <Navbar />

            {/* Hero section */}
            <section className="relative min-h-[50vh] flex items-center justify-center pt-24 pb-20 px-6 overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
                    <div
                        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse"
                        style={{ animationDelay: '1s' }}
                    />
                    <div
                        className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"
                        style={{ animationDelay: '2s' }}
                    />
                </div>

                <div className="relative text-center max-w-4xl mx-auto space-y-6 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-cyan-300 mb-4">
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                            />
                        </svg>
                        Free Developer Tools
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-violet-200">
                        Productivity Tools
                    </h1>

                    <p className="text-lg md:text-xl text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed">
                        Simple, powerful utilities built to solve everyday developer challenges. All
                        free and ready to use.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-8">
                        <div
                            className="space-y-2 animate-fade-in-up"
                            style={{ animationDelay: '0.2s' }}
                        >
                            <div className="text-3xl md:text-4xl font-bold gradient-text">
                                {data.tools.length}
                            </div>
                            <div className="text-sm text-[var(--color-muted)]">Free Tools</div>
                        </div>
                        <div
                            className="space-y-2 animate-fade-in-up"
                            style={{ animationDelay: '0.3s' }}
                        >
                            <div className="text-3xl md:text-4xl font-bold gradient-text">100%</div>
                            <div className="text-sm text-[var(--color-muted)]">Free Forever</div>
                        </div>
                        <div
                            className="space-y-2 animate-fade-in-up"
                            style={{ animationDelay: '0.4s' }}
                        >
                            <div className="text-3xl md:text-4xl font-bold gradient-text">24/7</div>
                            <div className="text-sm text-[var(--color-muted)]">
                                Always Available
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Tools Section */}
            <main className="relative py-16 px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Section header */}
                    <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                            Available Tools
                        </h2>
                        <p className="text-[var(--color-muted)] text-lg">
                            Explore our collection of handcrafted tools designed to boost your
                            productivity
                        </p>
                    </div>

                    {/* Tools List - Horizontal Layout like Blog */}
                    <div className="space-y-6">
                        {data.tools.map((t, index) => (
                            <a
                                key={t.name}
                                href={t.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="card group cursor-pointer transition-all duration-500 hover:shadow-2xl animate-fade-in-up"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="flex flex-col lg:flex-row gap-6">
                                    {/* Image Section - 320px wide on desktop */}
                                    <div className="relative lg:w-80 w-full aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-emerald-500/10 flex-shrink-0">
                                        {t.img ? (
                                            <img
                                                src={t.img}
                                                alt={t.name}
                                                className="h-full w-full object-contain p-6 group-hover:scale-110 transition-transform duration-700"
                                                loading="lazy"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full">
                                                <svg
                                                    className="w-16 h-16 text-white/20"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={1.5}
                                                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                                                    />
                                                </svg>
                                            </div>
                                        )}

                                        {/* Dark gradient overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                                        {/* External link icon */}
                                        <div className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-90">
                                            <svg
                                                className="w-4 h-4"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                />
                                            </svg>
                                        </div>

                                        {/* Category badge */}
                                        <div className="absolute bottom-4 left-4">
                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs">
                                                <svg
                                                    className="w-3.5 h-3.5"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                                    />
                                                </svg>
                                                Developer Tool
                                            </span>
                                        </div>
                                    </div>

                                    {/* Content Section */}
                                    <div className="flex-1 flex flex-col gap-4">
                                        {/* Title */}
                                        <h3 className="text-2xl md:text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:via-violet-300 group-hover:to-emerald-300 transition-all duration-300">
                                            {t.name}
                                        </h3>

                                        {/* Description */}
                                        <p className="text-[var(--color-muted)] leading-relaxed group-hover:text-slate-300 transition-colors duration-300 line-clamp-2">
                                            {t.description}
                                        </p>

                                        {/* Features & CTA */}
                                        <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                            {/* Features badges */}
                                            <div className="flex flex-wrap gap-2">
                                                <span className="badge">
                                                    <svg
                                                        className="w-3.5 h-3.5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M5 13l4 4L19 7"
                                                        />
                                                    </svg>
                                                    Free
                                                </span>
                                                <span className="badge">
                                                    <svg
                                                        className="w-3.5 h-3.5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M13 10V3L4 14h7v7l9-11h-7z"
                                                        />
                                                    </svg>
                                                    Instant
                                                </span>
                                                <span className="badge">
                                                    <svg
                                                        className="w-3.5 h-3.5"
                                                        fill="none"
                                                        stroke="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                                        />
                                                    </svg>
                                                    Secure
                                                </span>
                                            </div>

                                            {/* CTA */}
                                            <span className="inline-flex items-center gap-2 text-sm font-medium text-cyan-300 group-hover:text-cyan-200 transition-colors duration-300 whitespace-nowrap">
                                                Launch Tool
                                                <svg
                                                    className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth={2}
                                                        d="M13 7l5 5m0 0l-5 5m5-5H6"
                                                    />
                                                </svg>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Hover glow effect */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500 opacity-20 blur-xl" />
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Empty state (if no tools) */}
                    {data.tools.length === 0 && (
                        <div className="text-center py-20 animate-fade-in-up">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 border border-white/10 mb-6">
                                <svg
                                    className="w-10 h-10 text-[var(--color-muted)]"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={1.5}
                                        d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white mb-2">
                                More Tools Coming Soon
                            </h3>
                            <p className="text-[var(--color-muted)]">
                                We're working on new tools to make your life easier.
                            </p>
                        </div>
                    )}
                </div>
            </main>

            {/* CTA Section */}
            <section className="relative py-24 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-violet-500/5 to-emerald-500/5" />

                <div className="relative max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-emerald-300 mb-4">
                        <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                        </svg>
                        Have an idea?
                    </div>

                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-violet-200">
                        Need a Custom Tool?
                    </h2>

                    <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
                        If you have an idea for a tool that could help developers, I'd love to hear
                        about it. Let's build something useful together.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
                        <a
                            href="/contact"
                            className="btn btn-primary"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                />
                            </svg>
                            Share Your Idea
                        </a>

                        <a
                            href="/projects"
                            className="btn btn-secondary"
                        >
                            <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                            View All Projects
                        </a>
                    </div>
                </div>
            </section>

            <Footer />

            {/* Scroll to top button */}
            {scrollProgress > 20 && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 glow"
                    aria-label="Scroll to top"
                >
                    <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 10l7-7m0 0l7 7m-7-7v18"
                        />
                    </svg>
                </button>
            )}
        </>
    );
}
