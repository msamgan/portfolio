import { useMemo, useState } from 'react';
import data from '../data.json';
import lactLogo from '../assets/lact-logo.png';
import laravelLogo from '../assets/laravel.png';
import ProjectRow from './ProjectRow';

// Map of local image paths (as referenced in data.json) to bundled assets.
const localImages: Record<string, string> = {
    'src/assets/lact-logo.png': lactLogo,
    'src/assets/laravel.png': laravelLogo,
};

// Derives a project's category from its name — preserves the existing
// classification behaviour used for search and the type label.
const getProjectCategory = (name: string): string => {
    const nameLower = name.toLowerCase();
    if (nameLower.includes('framework')) return 'framework';
    if (nameLower.includes('extension') || nameLower.includes('vscode') || nameLower.includes('pint'))
        return 'extension';
    if (nameLower.includes('shortener') || nameLower.includes('ms0')) return 'tool';
    if (nameLower.includes('laravel') || nameLower.includes('checker') || nameLower.includes('lact'))
        return 'package';
    return 'default';
};

export default function ProjectArchive({
    eyebrow = '03 — Featured projects',
}: {
    eyebrow?: string;
}) {
    const [query, setQuery] = useState('');

    const filteredProjects = useMemo(() => {
        const q = query.trim().toLowerCase();
        if (!q) return data.projects;

        return data.projects.filter(
            (p) =>
                p.name.toLowerCase().includes(q) ||
                p.description.toLowerCase().includes(q) ||
                getProjectCategory(p.name).includes(q)
        );
    }, [query]);

    return (
        <section
            id="projects"
            className="editorial border-b border-[var(--editorial-line)] py-16 sm:py-24"
        >
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="flex items-baseline justify-between gap-6 mb-10 sm:mb-14">
                    <h2 className="eyebrow">{eyebrow}</h2>
                    <span className="hidden sm:block flex-1 border-t border-[var(--editorial-line)]" />
                </div>

                {/* Editorial search control */}
                <div className="mb-12 sm:mb-16 max-w-md">
                    <label
                        htmlFor="project-search"
                        className="font-mono-label text-[11px] uppercase text-[var(--editorial-muted)]"
                    >
                        Search projects
                    </label>
                    <div className="mt-3 flex items-center gap-3 border-b border-[var(--editorial-line-strong)] focus-within:border-[var(--editorial-accent)] transition-colors duration-200">
                        <svg
                            className="h-4 w-4 flex-shrink-0 text-[var(--editorial-muted)]"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-hidden="true"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                        <input
                            id="project-search"
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search by name, description, or category…"
                            className="w-full bg-transparent py-3 text-sm text-[var(--editorial-ink)] placeholder-[var(--editorial-muted)] focus:outline-none"
                        />
                        {query && (
                            <button
                                type="button"
                                onClick={() => setQuery('')}
                                aria-label="Clear search"
                                className="flex-shrink-0 text-[var(--editorial-muted)] hover:text-[var(--editorial-ink)] transition-colors duration-200"
                            >
                                <svg
                                    className="h-4 w-4"
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
                    {query && (
                        <p className="mt-3 font-mono-label text-[11px] uppercase text-[var(--editorial-muted)]">
                            {filteredProjects.length} result
                            {filteredProjects.length !== 1 ? 's' : ''}
                        </p>
                    )}
                </div>

                {filteredProjects.length > 0 ? (
                    <div>
                        {filteredProjects.map((p, i) => {
                            const links = [
                                { label: 'Learn more', href: p.link },
                                ...(p.repo ? [{ label: 'GitHub', href: p.repo }] : []),
                            ];

                            return (
                                <ProjectRow
                                    key={p.name}
                                    index={i}
                                    title={p.name}
                                    description={p.description}
                                    image={p.img ? (localImages[p.img] ?? p.img) : undefined}
                                    type={getProjectCategory(p.name)}
                                    links={links}
                                />
                            );
                        })}
                    </div>
                ) : (
                    <p className="py-12 text-[var(--editorial-muted)]">
                        No projects match{' '}
                        <button
                            type="button"
                            onClick={() => setQuery('')}
                            className="editorial-link text-[var(--editorial-ink)]"
                        >
                            clear the search
                        </button>
                        .
                    </p>
                )}
            </div>
        </section>
    );
}
