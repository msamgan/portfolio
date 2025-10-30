import Section from './Section';
import IconLink from './IconLink';
import data from '../data.json';

export default function Contact() {
    const socials = Object.fromEntries(
        data.navigation.social.map((s) => [s.name.toLowerCase(), s.link])
    ) as Record<string, string>;

    const contactMethods = [
        {
            icon: (
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
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                </svg>
            ),
            label: 'Location',
            value: data.contact.address,
            color: 'violet',
        },
        {
            icon: (
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
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
            ),
            label: 'Response Time',
            value: 'Within 24 hours',
            color: 'emerald',
        },
    ];

    return (
        <Section
            id="contact"
            className="relative overflow-hidden"
        >
            {/* Enhanced background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
                <div
                    className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse"
                    style={{ animationDelay: '1s' }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-cyan-300 mb-6">
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
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                        Get In Touch
                    </div>

                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6">
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-violet-200">
                            Let's Work Together
                        </span>
                    </h2>

                    <p className="text-lg md:text-xl text-[var(--color-muted)] max-w-3xl mx-auto leading-relaxed">
                        Have a project in mind or want to collaborate? I'm available for consulting,
                        full-time opportunities, and exciting projects. Let's make something great
                        together!
                    </p>
                </div>

                {/* Contact Methods Cards */}
                <div className="grid md:grid-cols-2 gap-6 mb-16 max-w-4xl mx-auto">
                    {contactMethods.map((method, idx) => (
                        <div
                            key={method.label}
                            className="card group hover:scale-105 transition-all duration-300"
                            style={{ animationDelay: `${idx * 0.1}s` }}
                        >
                            <div
                                className={`p-3 rounded-xl bg-${method.color}-500/10 text-${method.color}-400 w-fit mb-4 group-hover:scale-110 transition-transform duration-300`}
                            >
                                {method.icon}
                            </div>
                            <div className="text-xs text-white/50 uppercase tracking-wider mb-2">
                                {method.label}
                            </div>
                            <div className="text-white font-medium">{method.value}</div>
                        </div>
                    ))}
                </div>

                {/* Main Email CTA Section */}
                <div className="max-w-4xl mx-auto">
                    <div className="card relative overflow-hidden">
                        {/* Top gradient line */}
                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

                        <div className="text-center space-y-8 py-8">
                            {/* Email Icon */}
                            <div className="flex justify-center">
                                <div className="p-6 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-violet-500/20 ring-1 ring-white/10 group-hover:ring-white/20 transition-all">
                                    <svg
                                        className="w-16 h-16 text-cyan-400"
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
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-4">
                                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 text-emerald-400 text-sm">
                                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                                    Available for work
                                </div>

                                <h3 className="text-3xl md:text-4xl font-bold text-white">
                                    Ready to start your project?
                                </h3>

                                <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
                                    I'm available for freelance projects, consulting, and full-time
                                    opportunities. Send me an email and I'll get back to you within
                                    24 hours.
                                </p>

                                {/* Email Display */}
                                <div className="pt-4">
                                    <a
                                        href={`mailto:${data.contact.email}`}
                                        className="inline-flex items-center gap-3 text-2xl md:text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400 hover:from-cyan-300 hover:to-violet-300 transition-all group"
                                    >
                                        {data.contact.email}
                                        <svg
                                            className="w-6 h-6 text-cyan-400 group-hover:translate-x-2 transition-transform"
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
                                    </a>
                                </div>
                            </div>

                            {/* CTA Buttons */}
                            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-6">
                                <a
                                    href={`mailto:${data.contact.email}`}
                                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-semibold hover:shadow-xl hover:shadow-cyan-500/30 transition-all duration-300 hover:scale-105 active:scale-95 flex items-center justify-center gap-2 group"
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
                                    <span>Send me an email</span>
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
                                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                                        />
                                    </svg>
                                </a>

                                <a
                                    href="/projects"
                                    className="w-full sm:w-auto px-8 py-4 rounded-full bg-white/5 hover:bg-white/10 text-white font-medium ring-1 ring-white/10 hover:ring-white/20 transition-all hover:scale-105 flex items-center justify-center gap-2 group"
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
                                            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                                        />
                                    </svg>
                                    <span>View my work</span>
                                </a>
                            </div>

                            {/* Divider */}
                            <div className="relative py-8">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-white/10"></div>
                                </div>
                                <div className="relative flex justify-center">
                                    <span className="px-4 bg-[var(--color-surface)] text-sm text-white/50">
                                        Or connect via social media
                                    </span>
                                </div>
                            </div>

                            {/* Social Media Links */}
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                {socials.github && (
                                    <a
                                        href={socials.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 transition-all hover:scale-105 group"
                                    >
                                        <IconLink
                                            kind="github"
                                            href={socials.github}
                                            className="!text-white/90 group-hover:!text-cyan-300"
                                            asChild
                                        />
                                        <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                                            GitHub
                                        </span>
                                    </a>
                                )}
                                {socials.linkedin && (
                                    <a
                                        href={socials.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 transition-all hover:scale-105 group"
                                    >
                                        <IconLink
                                            kind="linkedin"
                                            href={socials.linkedin}
                                            className="!text-white/90 group-hover:!text-cyan-300"
                                            asChild
                                        />
                                        <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                                            LinkedIn
                                        </span>
                                    </a>
                                )}
                                {socials.twitter && (
                                    <a
                                        href={socials.twitter}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 transition-all hover:scale-105 group"
                                    >
                                        <IconLink
                                            kind="twitter"
                                            href={socials.twitter}
                                            className="!text-white/90 group-hover:!text-cyan-300"
                                            asChild
                                        />
                                        <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                                            Twitter
                                        </span>
                                    </a>
                                )}
                                {socials.youtube && (
                                    <a
                                        href={socials.youtube}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-cyan-500/50 transition-all hover:scale-105 group"
                                    >
                                        <IconLink
                                            kind="youtube"
                                            href={socials.youtube}
                                            className="!text-white/90 group-hover:!text-cyan-300"
                                            asChild
                                        />
                                        <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors">
                                            YouTube
                                        </span>
                                    </a>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    );
}
