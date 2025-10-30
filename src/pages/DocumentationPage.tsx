import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import data from '../data.json';

export default function DocumentationPage() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [hoveredDoc, setHoveredDoc] = useState<number | null>(null);

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
                                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                            />
                        </svg>
                        Documentation Hub
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-violet-200">
                        Docs & Guides
                    </h1>

                    <p className="text-lg md:text-xl text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed">
                        Comprehensive documentation and guides for my open-source packages and
                        projects. Everything you need to get started.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-8">
                        <div
                            className="space-y-2 animate-fade-in-up"
                            style={{ animationDelay: '0.2s' }}
                        >
                            <div className="text-3xl md:text-4xl font-bold gradient-text">
                                {data.docs.length}
                            </div>
                            <div className="text-sm text-[var(--color-muted)]">Packages</div>
                        </div>
                        <div
                            className="space-y-2 animate-fade-in-up"
                            style={{ animationDelay: '0.3s' }}
                        >
                            <div className="text-3xl md:text-4xl font-bold gradient-text">100%</div>
                            <div className="text-sm text-[var(--color-muted)]">Open Source</div>
                        </div>
                        <div
                            className="space-y-2 animate-fade-in-up"
                            style={{ animationDelay: '0.4s' }}
                        >
                            <div className="text-3xl md:text-4xl font-bold gradient-text">24/7</div>
                            <div className="text-sm text-[var(--color-muted)]">Available</div>
                        </div>
                    </div>
                </div>
            </section>

            <main className="relative py-16 px-6">
                <div className="max-w-5xl mx-auto">
                    {/* Section header */}
                    <div className="text-center max-w-3xl mx-auto mb-16 animate-fade-in-up">
                        <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
                            Package Documentation
                        </h2>
                        <p className="text-[var(--color-muted)] text-lg">
                            Detailed guides and API references for all my open-source packages
                        </p>
                    </div>

                    {/* Docs List - Horizontal Layout */}
                    <div className="space-y-6">
                        {data.docs.map((doc, idx) => (
                            <article
                                key={idx}
                                className="card group cursor-pointer transition-all duration-500 hover:shadow-2xl animate-fade-in-up"
                                style={{ animationDelay: `${idx * 0.1}s` }}
                                onMouseEnter={() => setHoveredDoc(idx)}
                                onMouseLeave={() => setHoveredDoc(null)}
                            >
                                <div className="flex flex-col lg:flex-row gap-6">
                                    {/* Image Section */}
                                    <div className="relative lg:w-80 w-full aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-emerald-500/10 flex-shrink-0">
                                        {doc.img ? (
                                            <img
                                                src={doc.img}
                                                alt={doc.name}
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
                                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                    />
                                                </svg>
                                            </div>
                                        )}

                                        {/* Overlay gradient on hover */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                    </div>

                                    {/* Content Section */}
                                    <div className="flex-1 flex flex-col justify-between min-h-[200px]">
                                        {/* Top section */}
                                        <div className="space-y-3">
                                            {/* Package badge */}
                                            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 text-xs text-cyan-300 w-fit">
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
                                                        d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                                                    />
                                                </svg>
                                                Laravel Package
                                            </div>

                                            <h3 className="text-2xl font-bold text-white/90 group-hover:text-white transition-colors duration-300">
                                                {doc.name}
                                            </h3>

                                            <p className="text-[var(--color-muted)] leading-relaxed text-base">
                                                {doc.description}
                                            </p>
                                        </div>

                                        {/* Bottom section - Actions */}
                                        <div className="flex flex-wrap items-center gap-3 pt-4 mt-4 border-t border-white/5">
                                            {doc.link && (
                                                <a
                                                    href={doc.link}
                                                    className="btn btn-primary btn-sm group-hover:scale-105 transition-transform duration-300"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
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
                                                            d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                                        />
                                                    </svg>
                                                    Read Documentation
                                                </a>
                                            )}
                                            {doc.repo && (
                                                <a
                                                    href={doc.repo}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="btn btn-secondary btn-sm group-hover:scale-105 transition-transform duration-300"
                                                    onClick={(e) => e.stopPropagation()}
                                                >
                                                    <svg
                                                        className="w-4 h-4"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                    View Repository
                                                </a>
                                            )}

                                            {/* Visual indicator on hover */}
                                            <div
                                                className={`ml-auto transition-all duration-300 ${
                                                    hoveredDoc === idx
                                                        ? 'opacity-100 translate-x-0'
                                                        : 'opacity-0 translate-x-2'
                                                }`}
                                            >
                                                <svg
                                                    className="w-5 h-5 text-cyan-400"
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
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>

                    {/* Empty state (if no docs) */}
                    {data.docs.length === 0 && (
                        <div className="text-center py-20 animate-fade-in-up">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/5 mb-6">
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
                                        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-white/90 mb-2">
                                No documentation available yet
                            </h3>
                            <p className="text-[var(--color-muted)]">
                                Check back soon for more packages and guides
                            </p>
                        </div>
                    )}

                    {/* Call to action */}
                    <div className="mt-16 pt-12 border-t border-white/5 text-center animate-fade-in-up">
                        <div className="max-w-2xl mx-auto space-y-6">
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-emerald-300">
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
                                        d="M13 10V3L4 14h7v7l9-11h-7z"
                                    />
                                </svg>
                                Open Source
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold gradient-text">
                                Want to Contribute?
                            </h3>
                            <p className="text-[var(--color-muted)] text-lg">
                                All packages are open source. Feel free to contribute, report
                                issues, or suggest new features.
                            </p>
                            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
                                <a
                                    href="https://github.com/msamgan"
                                    target="_blank"
                                    rel="noreferrer"
                                    className="btn btn-primary"
                                >
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
                                    Visit GitHub
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
                                    Explore All Projects
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

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
