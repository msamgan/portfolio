import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import About from '../components/About';
import Footer from '../components/Footer';

export default function AboutPage() {
    const [scrollProgress, setScrollProgress] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight =
                document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            {/* Scroll progress indicator */}
            <div
                className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500"
                style={{ width: `${scrollProgress}%`, transition: 'width 0.1s ease' }}
            />

            <Navbar />

            <main className="relative">
                {/* Reuse the About section component */}
                <About />
            </main>

            <Footer />

            {/* Scroll to top button */}
            {scrollProgress > 20 && (
                <button
                    onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 glow"
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
