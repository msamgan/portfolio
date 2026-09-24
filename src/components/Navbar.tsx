import { useEffect, useState } from 'react';
import data from '../data.json';

// Primary destinations get top billing; the rest remain fully reachable
// in the mobile/expanded menu so no existing route is ever dropped.
const primaryLinks = [
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Work' },
    { href: '/posts', label: 'Writing' },
    { href: '/services', label: 'Services' },
    { href: '/contact', label: 'Contact' },
];

const secondaryLinks = [
    { href: '/tools', label: 'Tools' },
    { href: '/documentation', label: 'Documentation' },
    { href: '/tags', label: 'Tags' },
];

const resume = data.navigation.pages.find((p) => p.name === 'Resume');

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const path = typeof window !== 'undefined' ? window.location.pathname : '/';

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 8);
        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        document.documentElement.style.overflow = isOpen ? 'hidden' : '';
        return () => {
            document.documentElement.style.overflow = '';
        };
    }, [isOpen]);

    const isActive = (href: string) => path === href || (href !== '/' && path.startsWith(href));

    return (
        <header
            className={`editorial fixed top-0 left-0 right-0 z-50 border-b transition-colors duration-300 ${
                isScrolled
                    ? 'backdrop-blur-md bg-[var(--editorial-bg)]/85 border-[var(--editorial-line-strong)]'
                    : 'bg-[var(--editorial-bg)]/60 border-[var(--editorial-line)]'
            }`}
        >
            <div className="mx-auto flex h-16 sm:h-[4.5rem] max-w-7xl items-center justify-between px-5 sm:px-8">
                <a
                    href="/"
                    className="font-serif-display text-lg sm:text-xl tracking-tight text-[var(--editorial-ink)]"
                    aria-label="msamgan — home"
                >
                    {data.username}
                </a>

                {/* Desktop navigation */}
                <nav
                    className="hidden lg:flex items-center gap-7 text-[13px] font-mono-label uppercase"
                    aria-label="Primary"
                >
                    {primaryLinks.map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            className={`editorial-link pb-0.5 ${
                                isActive(l.href)
                                    ? 'text-[var(--editorial-ink)]'
                                    : 'text-[var(--editorial-muted)] hover:text-[var(--editorial-ink)]'
                            }`}
                            aria-current={isActive(l.href) ? 'page' : undefined}
                        >
                            {l.label}
                        </a>
                    ))}
                </nav>

                <div className="hidden lg:flex items-center gap-5">
                    {resume && (
                        <a
                            href={resume.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="editorial-link text-[13px] font-mono-label uppercase text-[var(--editorial-muted)] hover:text-[var(--editorial-ink)] pb-0.5"
                        >
                            Résumé ↗
                        </a>
                    )}
                    <a
                        href="/contact"
                        className="text-[13px] font-mono-label uppercase border border-[var(--editorial-line-strong)] px-4 py-2 text-[var(--editorial-ink)] hover:border-[var(--editorial-accent)] hover:text-[var(--editorial-accent)] transition-colors duration-200"
                    >
                        Say hello
                    </a>
                </div>

                {/* Mobile menu toggle */}
                <button
                    onClick={() => setIsOpen((v) => !v)}
                    className="lg:hidden relative z-10 flex h-9 w-9 flex-col items-center justify-center gap-1.5"
                    aria-label={isOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={isOpen}
                >
                    <span
                        className={`block h-px w-6 bg-[var(--editorial-ink)] transition-transform duration-300 ${isOpen ? 'translate-y-[3.5px] rotate-45' : ''}`}
                    />
                    <span
                        className={`block h-px w-6 bg-[var(--editorial-ink)] transition-transform duration-300 ${isOpen ? '-translate-y-[3.5px] -rotate-45' : ''}`}
                    />
                </button>
            </div>

            {/* Mobile menu */}
            <div
                className={`editorial lg:hidden overflow-hidden transition-[max-height] duration-400 ease-in-out border-b border-[var(--editorial-line)] ${
                    isOpen ? 'max-h-[32rem]' : 'max-h-0'
                }`}
            >
                <nav className="flex flex-col px-5 py-4" aria-label="Mobile">
                    {[...primaryLinks, ...secondaryLinks].map((l) => (
                        <a
                            key={l.href}
                            href={l.href}
                            onClick={() => setIsOpen(false)}
                            className={`editorial-row py-3.5 font-serif-display text-2xl ${
                                isActive(l.href)
                                    ? 'text-[var(--editorial-ink)]'
                                    : 'text-[var(--editorial-muted)]'
                            }`}
                        >
                            {l.label}
                        </a>
                    ))}
                    {resume && (
                        <a
                            href={resume.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => setIsOpen(false)}
                            className="pt-5 font-mono-label text-xs uppercase text-[var(--editorial-muted)]"
                        >
                            Download résumé ↗
                        </a>
                    )}
                </nav>
            </div>
        </header>
    );
}
