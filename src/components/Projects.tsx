import Section from './Section';
import data from '../data.json';
import React, { useState, useMemo } from 'react';
import lactLogo from '../assets/lact-logo.png';
import laravelLogo from '../assets/laravel.png';

// Map of local images
const localImages: Record<string, string> = {
    'src/assets/lact-logo.png': lactLogo,
    'src/assets/laravel.png': laravelLogo,
};

// Project category icons
const projectIcons: Record<string, React.ReactElement> = {
    framework: (
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
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
        </svg>
    ),
    package: (
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
                d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
            />
        </svg>
    ),
    extension: (
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
                d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
            />
        </svg>
    ),
    tool: (
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
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
            />
        </svg>
    ),
    default: (
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
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
        </svg>
    ),
};

// Determine project category based on name/description
const getProjectCategory = (name: string): string => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('framework') || nameLower.includes('framework x')) return 'framework';
    if (
        nameLower.includes('extension') ||
        nameLower.includes('vscode') ||
        nameLower.includes('pint')
    )
        return 'extension';
    if (nameLower.includes('shortener') || nameLower.includes('ms0')) return 'tool';
    if (
        nameLower.includes('laravel') ||
        nameLower.includes('checker') ||
        nameLower.includes('lact')
    )
        return 'package';
    return 'default';
};

export default function Projects() {
    const [searchQuery, setSearchQuery] = useState('');

    // Filter projects based on search query
    const filteredProjects = useMemo(() => {
        if (!searchQuery.trim()) {
            return data.projects;
        }

        const query = searchQuery.toLowerCase();
        return data.projects.filter(
            (p) =>
                p.name.toLowerCase().includes(query) ||
                p.description.toLowerCase().includes(query) ||
                getProjectCategory(p.name).toLowerCase().includes(query)
        );
    }, [searchQuery]);

    return (
        <Section
            id="projects"
            title="Featured Projects"
            subtitle="A few highlights. Explore more on my site."
        >
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
                        placeholder="Search projects by name, description, or category..."
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

                {/* Search results count */}
                {searchQuery && (
                    <div className="mt-4 text-center text-sm text-[var(--color-muted)]">
                        Found {filteredProjects.length} project
                        {filteredProjects.length !== 1 ? 's' : ''}
                    </div>
                )}
            </div>

            <div className="space-y-6">
                {filteredProjects.length > 0 ? (
                    filteredProjects.map((p, index) => {
                        const category = getProjectCategory(p.name);
                        const icon = projectIcons[category] || projectIcons['default'];

                        return (
                            <article
                                key={p.name}
                                className="card group transition-all duration-500 hover:shadow-2xl cursor-pointer animate-fade-in-up flex flex-col lg:flex-row gap-6"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                {/* Project image with enhanced overlay */}
                                <div className="relative lg:w-80 w-full aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-emerald-500/10 flex-shrink-0">
                                    {p.img ? (
                                        <img
                                            src={localImages[p.img] || p.img}
                                            alt={p.name}
                                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                                        />
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <svg
                                                className="w-20 h-20 text-white/20"
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

                                    {/* Category badge on image */}
                                    <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/20 text-white text-xs font-medium opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-90 flex items-center gap-1.5">
                                        {icon}
                                        <span className="capitalize">{category}</span>
                                    </div>

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
                                </div>

                                {/* Project info */}
                                <div className="flex-1 flex flex-col gap-4">
                                    {/* Featured Project Badge */}
                                    <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 text-xs text-cyan-300 w-fit">
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
                                        Featured Project
                                    </span>

                                    {/* Title */}
                                    <h3 className="text-2xl lg:text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:via-violet-300 group-hover:to-emerald-300 transition-all duration-300">
                                        {p.name}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-[var(--color-muted)] text-sm md:text-base leading-relaxed group-hover:text-slate-300 transition-colors duration-300 line-clamp-2 md:line-clamp-3">
                                        {p.description}
                                    </p>

                                    {/* Bottom row: Category badge + Links */}
                                    <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
                                        {/* Category badge */}
                                        <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-white text-xs font-medium w-fit">
                                            {icon}
                                            <span className="capitalize">{category}</span>
                                        </div>

                                        {/* Links */}
                                        <div className="flex items-center gap-3">
                                            {/* Learn more link */}
                                            <a
                                                href={p.link}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="inline-flex items-center gap-2 text-sm text-cyan-400 hover:text-cyan-300 transition-colors group/link"
                                            >
                                                <span className="font-medium">Learn more</span>
                                                <svg
                                                    className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform duration-300"
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
                                            </a>

                                            {/* GitHub repo link */}
                                            {p.repo && (
                                                <a
                                                    href={p.repo}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    onClick={(e) => e.stopPropagation()}
                                                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 group/repo"
                                                    aria-label="View repository"
                                                    title="View on GitHub"
                                                >
                                                    <svg
                                                        className="w-4 h-4 text-white/50 group-hover/repo:text-cyan-400 transition-colors"
                                                        fill="currentColor"
                                                        viewBox="0 0 24 24"
                                                    >
                                                        <path
                                                            fillRule="evenodd"
                                                            d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                                            clipRule="evenodd"
                                                        />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Animated border on hover */}
                                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500 opacity-20 blur-xl" />
                                </div>
                            </article>
                        );
                    })
                ) : (
                    // No results found state
                    <div className="text-center py-16 animate-fade-in-up">
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
                                    strokeWidth={2}
                                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                        </div>
                        <h3 className="text-xl font-bold text-white mb-2">No projects found</h3>
                        <p className="text-[var(--color-muted)] mb-6">
                            Try adjusting your search query or{' '}
                            <button
                                onClick={() => setSearchQuery('')}
                                className="text-cyan-400 hover:text-cyan-300 underline transition-colors"
                            >
                                clear the search
                            </button>
                        </p>
                    </div>
                )}
            </div>

            {/* Enhanced CTA */}
            <div className="mt-16 text-center space-y-6 animate-fade-in-up">
                <div className="max-w-2xl mx-auto">
                    <h3 className="text-2xl font-bold text-white mb-3">
                        Want to see more projects?
                    </h3>
                    <p className="text-[var(--color-muted)] mb-6">
                        I'm always working on something new. Let's connect and discuss how we can
                        collaborate.
                    </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                        href="mailto:mail@msamgan.com"
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
                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                        </svg>
                        Get in Touch
                    </a>

                    <a
                        href="/#contact"
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
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                        View Contact Info
                    </a>
                </div>
            </div>
        </Section>
    );
}
