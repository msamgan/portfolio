import SponsorMe from './SponsorMe';
import IconLink from './IconLink';
import data from '../data.json';

const navLinks = [
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/posts', label: 'Writing' },
    { href: '/contact', label: 'Contact' },
];

const socialKindByName: Record<string, 'github' | 'linkedin' | 'twitter' | 'youtube'> = {
    GitHub: 'github',
    LinkedIn: 'linkedin',
    Twitter: 'twitter',
    YouTube: 'youtube',
};

export default function Footer() {
    return (
        <footer className="editorial border-t border-[var(--editorial-line)]">
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="py-14 sm:py-16 border-b border-[var(--editorial-line)]">
                    <SponsorMe />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 py-14 sm:py-16 border-b border-[var(--editorial-line)]">
                    <div className="lg:col-span-1">
                        <p className="font-mono-label text-xs uppercase text-[var(--editorial-muted)] mb-3">
                            Software Engineer
                        </p>
                        <p className="text-[var(--editorial-muted)] leading-relaxed max-w-xs">
                            Laravel / Full Stack / Systems. Building scalable software across
                            logistics, e-commerce, and cloud infrastructure.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-mono-label text-xs uppercase text-[var(--editorial-ink)] mb-4">
                            Navigation
                        </h4>
                        <nav className="flex flex-col gap-2.5">
                            {navLinks.map((l) => (
                                <a
                                    key={l.href}
                                    href={l.href}
                                    className="editorial-link w-fit text-[var(--editorial-muted)] hover:text-[var(--editorial-ink)]"
                                >
                                    {l.label}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <h4 className="font-mono-label text-xs uppercase text-[var(--editorial-ink)] mb-4">
                            Connect
                        </h4>
                        <nav className="flex flex-col gap-2.5">
                            {data.navigation.social.map((s) => (
                                <a
                                    key={s.name}
                                    href={s.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="editorial-link w-fit text-[var(--editorial-muted)] hover:text-[var(--editorial-ink)]"
                                >
                                    {s.name}
                                </a>
                            ))}
                        </nav>
                    </div>

                    <div>
                        <h4 className="font-mono-label text-xs uppercase text-[var(--editorial-ink)] mb-4">
                            Contact
                        </h4>
                        <a
                            href={`mailto:${data.contact.email}`}
                            className="editorial-link w-fit text-[var(--editorial-muted)] hover:text-[var(--editorial-ink)]"
                        >
                            {data.contact.email}
                        </a>
                        <p className="mt-4 font-mono-label text-xs uppercase text-[var(--editorial-muted)]">
                            Location
                        </p>
                        <p className="text-[var(--editorial-muted)]">{data.contact.address}</p>
                    </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-between gap-6 py-8">
                    <p className="font-mono-label text-xs uppercase text-[var(--editorial-muted)]">
                        © {new Date().getFullYear()} {data.name}
                    </p>
                    <div className="flex items-center gap-4">
                        {data.navigation.social.map((s) => {
                            const kind = socialKindByName[s.name];
                            if (!kind) return null;
                            return (
                                <IconLink
                                    key={s.name}
                                    kind={kind}
                                    href={s.link}
                                    label={s.name}
                                    className="!text-[var(--editorial-muted)] hover:!text-[var(--editorial-ink)]"
                                />
                            );
                        })}
                    </div>
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="editorial-link text-xs font-mono-label uppercase text-[var(--editorial-muted)] hover:text-[var(--editorial-ink)]"
                    >
                        Back to top ↑
                    </button>
                </div>

                {/* Large closing wordmark */}
                <div className="pb-10 sm:pb-14 select-none">
                    <a
                        href="/"
                        aria-label="msamgan — home"
                        className="block font-serif-display leading-none text-[18vw] sm:text-[11vw] lg:text-[9rem] text-[var(--editorial-ink)] hover:text-[var(--editorial-accent)] transition-colors duration-500"
                    >
                        {data.username}
                    </a>
                </div>
            </div>
        </footer>
    );
}
