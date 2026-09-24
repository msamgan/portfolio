import type { ReactNode } from 'react';

export type ProjectLink = {
    label: string;
    href: string;
};

/**
 * Single reusable row for rendering a project in the editorial archive style.
 * Handles the optional image, type/category label, description, and an
 * arbitrary set of links (e.g. "Learn more", "GitHub") without ever
 * rendering empty affordances for missing data.
 */
export default function ProjectRow({
    index,
    title,
    description,
    image,
    type,
    links = [],
}: {
    index: number;
    title: ReactNode;
    description?: string;
    image?: string;
    type?: string;
    links?: ProjectLink[];
}) {
    return (
        <article className="editorial-row grid grid-cols-1 sm:grid-cols-12 gap-4 sm:gap-6 py-7 sm:py-8">
            <span className="sm:col-span-1 font-mono-label text-xs text-[var(--editorial-muted)]">
                {String(index + 1).padStart(2, '0')}
            </span>

            {image ? (
                <div className="sm:col-span-2 order-first sm:order-none">
                    <div className="flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center border border-[var(--editorial-line)] bg-white/[0.02] p-2.5">
                        <img
                            src={image}
                            alt=""
                            loading="lazy"
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>
                </div>
            ) : (
                <div className="hidden sm:block sm:col-span-2" aria-hidden="true" />
            )}

            <div className="sm:col-span-4">
                <h3 className="font-serif-display text-2xl sm:text-3xl capitalize text-[var(--editorial-ink)]">
                    {title}
                </h3>
                {type && (
                    <p className="mt-2 font-mono-label text-[11px] uppercase text-[var(--editorial-accent)]">
                        {type}
                    </p>
                )}
            </div>

            {description && (
                <p className="sm:col-span-5 text-[var(--editorial-muted)] leading-relaxed">
                    {description}
                </p>
            )}

            {links.length > 0 && (
                <div className="sm:col-span-12 sm:col-start-4 flex flex-wrap items-center gap-x-6 gap-y-2 pt-1">
                    {links.map((link) => {
                        const external = /^https?:\/\//.test(link.href);
                        return (
                            <a
                                key={link.label}
                                href={link.href}
                                target={external ? '_blank' : undefined}
                                rel={external ? 'noreferrer' : undefined}
                                className="editorial-link text-sm text-[var(--editorial-muted)] hover:text-[var(--editorial-ink)]"
                            >
                                {link.label} →
                            </a>
                        );
                    })}
                </div>
            )}
        </article>
    );
}
