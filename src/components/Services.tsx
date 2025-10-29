import data from '../data.json';
import React, { useState, useMemo } from 'react';

// Import service images
import webDev from '../assets/services/WebDevelopment.png';
import mobileDev from '../assets/services/MobileDevelopment.png';
import apiDev from '../assets/services/APIDevelopment.png';
import dbDesign from '../assets/services/DatabaseDesign.png';
import codeReview from '../assets/services/CodeReview.png';
import techConsulting from '../assets/services/TechnicalConsulting.png';
import projectMgmt from '../assets/services/ProjectManagement.png';
import softwareArch from '../assets/services/SoftwareArchitecture.png';

const localImages: Record<string, string> = {
    'src/assets/services/WebDevelopment.png': webDev,
    'src/assets/services/MobileDevelopment.png': mobileDev,
    'src/assets/services/APIDevelopment.png': apiDev,
    'src/assets/services/DatabaseDesign.png': dbDesign,
    'src/assets/services/CodeReview.png': codeReview,
    'src/assets/services/TechnicalConsulting.png': techConsulting,
    'src/assets/services/ProjectManagement.png': projectMgmt,
    'src/assets/services/SoftwareArchitecture.png': softwareArch,
};

export default function Services() {
    const serviceIcons: Record<string, React.ReactElement> = {
        'Web Development': (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
                />
            </svg>
        ),
        'Mobile Development': (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                />
            </svg>
        ),
        'API Development': (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
            </svg>
        ),
        'Database Design': (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4m0 5c0 2.21-3.582 4-8 4s-8-1.79-8-4"
                />
            </svg>
        ),
        'Code Review': (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
            </svg>
        ),
        'Technical Consulting': (
            <svg
                className="w-6 h-6"
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
        ),
        'Project Management': (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                />
            </svg>
        ),
        'Software Architecture': (
            <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
            </svg>
        ),
    };

    const [searchQuery, setSearchQuery] = useState('');

    // Filter services based on search query
    const filteredServices = useMemo(() => {
        if (!searchQuery.trim()) return data.services;

        const query = searchQuery.toLowerCase();
        return data.services.filter(
            (s) =>
                s.name.toLowerCase().includes(query) ||
                s.description.toLowerCase().includes(query)
        );
    }, [searchQuery]);

    return (
        <div className="py-16 sm:py-24">
            <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <header className="mb-12 text-center">
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                        Services
                    </h2>
                    <p className="mt-4 text-lg text-[var(--color-muted)] max-w-3xl mx-auto">
                        Ways I can help your team ship faster and smarter.
                    </p>
                </header>

                {/* Search Bar */}
                <div className="max-w-2xl mx-auto mb-12 animate-fade-in-up">
                <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <svg
                            className="w-5 h-5 text-[var(--color-muted)] group-focus-within:text-cyan-400 transition-colors duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search services..."
                        className="w-full pl-12 pr-12 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
                    />
                    {searchQuery && (
                        <button
                            onClick={() => setSearchQuery('')}
                            className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--color-muted)] hover:text-white transition-colors duration-300"
                            aria-label="Clear search"
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
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    )}
                </div>
                {searchQuery && (
                    <div className="mt-3 text-sm text-[var(--color-muted)] text-center animate-fade-in-up">
                        Searching for:{' '}
                        <span className="text-cyan-300 font-medium">"{searchQuery}"</span>
                    </div>
                )}
            </div>

            {/* Services List */}
            <div className="max-w-4xl mx-auto">
                {filteredServices.length === 0 ? (
                        <div className="card text-center py-16">
                            <div className="flex flex-col items-center gap-4">
                                <div className="p-6 rounded-full bg-white/5 border border-white/10">
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
                                            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                        />
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-white/80">
                                    No Services Found
                                </h3>
                                <p className="text-[var(--color-muted)] max-w-md">
                                    No services match your search for "{searchQuery}". Try
                                    different keywords.
                                </p>
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="mt-4 btn btn-secondary"
                                >
                                    Clear Search
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {filteredServices.map((s, index) => (
                                <article
                                    key={s.name}
                                    className="card group cursor-pointer transition-all duration-500 hover:shadow-2xl animate-fade-in-up"
                                    style={{ animationDelay: `${index * 0.1}s` }}
                                >
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        {/* Image Section */}
                                        <div className="relative lg:w-80 w-full aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-emerald-500/10 flex-shrink-0">
                                            {localImages[s.img] ? (
                                                <img
                                                    src={localImages[s.img]}
                                                    alt={s.name}
                                                    className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
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
                                                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                </div>
                                            )}

                                            {/* Dark gradient overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                                            {/* Icon badge on image */}
                                            <div className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-90">
                                                {serviceIcons[s.name]}
                                            </div>
                                        </div>

                                        {/* Content Section */}
                                        <div className="flex-1 flex flex-col gap-4">
                                            {/* Service category badge */}
                                            <div className="flex items-center gap-3 text-xs text-[var(--color-muted)]">
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
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
                                                    Professional Service
                                                </span>
                                            </div>

                                            {/* Title */}
                                            <h3 className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:via-violet-300 group-hover:to-emerald-300 transition-all duration-300">
                                                {s.name}
                                            </h3>

                                            {/* Description */}
                                            <p className="text-[var(--color-muted)] leading-relaxed line-clamp-2 md:line-clamp-3">
                                                {s.description}
                                            </p>
                                        </div>
                                    </div>
                                </article>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
