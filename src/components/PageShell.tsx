import { useEffect, useState, type ReactNode } from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

export default function PageShell({ children }: { children: ReactNode }) {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight =
                document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
            setScrollProgress(Math.min(progress, 100));
        };

        handleScroll();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <div
                className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-[var(--editorial-accent)]"
                style={{ width: `${scrollProgress}%`, transition: 'width 0.1s ease' }}
            />

            <Navbar />

            <main className="relative">{children}</main>

            <Footer />

            {scrollProgress > 20 && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-8 right-8 z-40 flex h-11 w-11 items-center justify-center border border-[var(--editorial-line-strong)] bg-[var(--editorial-bg)] text-[var(--editorial-ink)] hover:border-[var(--editorial-accent)] hover:text-[var(--editorial-accent)] transition-colors duration-300"
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
