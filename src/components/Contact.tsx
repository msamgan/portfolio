import data from '../data.json';
import IconLink from './IconLink';

const socialKindByName: Record<string, 'github' | 'linkedin' | 'twitter' | 'youtube'> = {
    GitHub: 'github',
    LinkedIn: 'linkedin',
    Twitter: 'twitter',
    YouTube: 'youtube',
};

export default function Contact() {
    return (
        <section
            id="contact"
            className="editorial pt-28 sm:pt-36 pb-20 sm:pb-32"
        >
            <div className="mx-auto max-w-7xl px-5 sm:px-8">
                <div className="flex items-baseline justify-between gap-6 mb-10 sm:mb-14">
                    <h2 className="eyebrow">07 — Let's talk</h2>
                    <span className="hidden sm:block flex-1 border-t border-[var(--editorial-line)]" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                    <p className="lg:col-span-7 font-serif-display text-3xl sm:text-4xl md:text-5xl leading-[1.15] text-[var(--editorial-ink)]">
                        Have a system to build, a problem to solve, or something interesting to
                        discuss?
                    </p>

                    <div className="lg:col-span-5 flex flex-col justify-between gap-10">
                        <a
                            href={`mailto:${data.contact.email}`}
                            className="editorial-link text-2xl sm:text-3xl font-serif-display text-[var(--editorial-accent)] w-fit"
                        >
                            {data.contact.email}
                        </a>

                        <div className="grid grid-cols-2 gap-6 font-mono-label text-xs uppercase text-[var(--editorial-muted)]">
                            <div>
                                <p className="mb-1 text-[var(--editorial-ink)]">Location</p>
                                <p>{data.contact.address}</p>
                            </div>
                            <div>
                                <p className="mb-1 text-[var(--editorial-ink)]">Response time</p>
                                <p>Within 24 hours</p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-5 pt-2 border-t border-[var(--editorial-line)]">
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
                    </div>
                </div>
            </div>
        </section>
    );
}
