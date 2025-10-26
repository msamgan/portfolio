import Container from './Container'
import data from '../data.json'

const socialIcons: Record<string, React.ReactElement> = {
    YouTube: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
                d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
    ),
    GitHub: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"/>
        </svg>
    ),
    Twitter: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
                d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
        </svg>
    ),
    LinkedIn: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
                d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
        </svg>
    ),
}

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    return (
        <footer className="relative mt-32 overflow-hidden">
            {/* Decorative gradient background */}
            <div className="absolute inset-0 pointer-events-none">
                <div
                    className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"/>
                <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"/>
                <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-violet-500/5 rounded-full blur-3xl"/>
            </div>

            <Container className="relative">
                {/* Main footer content */}
                <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4 py-16">
                    {/* Brand & Description */}
                    <div className="lg:col-span-2 space-y-6">
                        <a href="/" className="inline-block group">
              <span
                  className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-violet-400 to-cyan-300 group-hover:from-violet-400 group-hover:via-cyan-300 group-hover:to-violet-400 transition-all duration-500">
                {data.username}
              </span>
                        </a>
                        <p className="text-white/70 text-base leading-relaxed max-w-md">
                            Software Engineer specializing in scalable, high-performance solutions.
                            Passionate about building exceptional digital experiences and contributing to open source.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Quick Links</h4>
                        <nav className="flex flex-col gap-3">
                            {[
                                {href: '/#about', label: 'About'},
                                {href: '/#skills', label: 'Skills'},
                                {href: '/services', label: 'Services'},
                                {href: '/#experience', label: 'Experience'},
                                {href: '/projects', label: 'Projects'},
                                {href: '/#contact', label: 'Contact'},
                            ].map((link) => (
                                <a
                                    key={link.href}
                                    href={link.href}
                                    className="text-white/60 hover:text-cyan-300 transition-all duration-300 flex items-center gap-2 group w-fit"
                                >
                                    <span
                                        className="w-0 h-px bg-gradient-to-r from-cyan-400 to-violet-400 group-hover:w-4 transition-all duration-300"/>
                                    <span>{link.label}</span>
                                </a>
                            ))}
                        </nav>
                    </div>

                    {/* Social & Contact */}
                    <div className="space-y-4">
                        <h4 className="text-white font-semibold text-sm uppercase tracking-wider">Connect</h4>

                        {/* Social Links */}
                        <div className="flex flex-wrap gap-3">
                            {data.navigation.social.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-3 rounded-lg bg-white/5 hover:bg-white/10 text-white/60 hover:text-cyan-300 border border-white/10 hover:border-cyan-500/50 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-cyan-500/20 group"
                                    title={social.name}
                                >
                                    {socialIcons[social.name] || (
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                  d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"/>
                                        </svg>
                                    )}
                                </a>
                            ))}
                        </div>

                        {/* Contact Info */}
                        <div className="pt-4 space-y-3">
                            <a
                                href={`mailto:${data.contact.email}`}
                                className="flex items-center gap-2 text-white/60 hover:text-cyan-300 transition-colors text-sm group"
                            >
                                <svg className="w-4 h-4 group-hover:scale-110 transition-transform" fill="none"
                                     stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                                </svg>
                                <span>{data.contact.email}</span>
                            </a>
                            <div className="flex items-center gap-2 text-white/60 text-sm">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                                </svg>
                                <span>{data.contact.address}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 py-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <div className="text-white/50 text-sm text-center sm:text-left">
                            © {new Date().getFullYear()} {data.name}. All rights reserved.
                        </div>

                        <div className="flex items-center gap-6">
                            <button
                                onClick={scrollToTop}
                                className="group flex items-center gap-2 text-white/60 hover:text-cyan-300 transition-all duration-300 text-sm"
                            >
                                <span>Back to top</span>
                                <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform" fill="none"
                                     stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Decorative bottom gradient */}
                <div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"/>
            </Container>
        </footer>
    )
}
