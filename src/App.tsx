import { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ServicesPage from './pages/ServicesPage';
import ProjectsPage from './pages/ProjectsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import BlogPage from './pages/BlogPage';
import PostPage from './pages/PostPage';
import ToolsPage from './pages/ToolsPage';
import TagsPage from './pages/TagsPage';
import TagPostsPage from './pages/TagPostsPage';
import DocumentationPage from './pages/DocumentationPage';
import DocsPage from './pages/DocsPage';

function App() {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [path, setPath] = useState<string>(window.location.pathname);

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight =
                document.documentElement.scrollHeight - document.documentElement.clientHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };

        const handlePopState = () => setPath(window.location.pathname);

        window.addEventListener('scroll', handleScroll);
        window.addEventListener('popstate', handlePopState);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('popstate', handlePopState);
        };
    }, []);

    if (path === '/services') {
        return <ServicesPage />;
    }

    if (path === '/projects') {
        return <ProjectsPage />;
    }

    if (path === '/about') {
        return <AboutPage />;
    }

    if (path === '/contact') {
        return <ContactPage />;
    }

    if (path === '/posts') {
        return <BlogPage />;
    }

    if (path === '/tools') {
        return <ToolsPage />;
    }

    if (path === '/documentation') {
        return <DocumentationPage />;
    }

    if (path === '/tags') {
        return <TagsPage />;
    }

    // Docs route
    if (path.startsWith('/docs/')) {
        const slug = decodeURIComponent(path.replace(/^\/docs\//, ''));
        return <DocsPage slug={slug} />;
    }

    // Tag posts route
    if (path.startsWith('/tag/')) {
        const slug = decodeURIComponent(path.replace(/^\/tag\//, ''));
        return <TagPostsPage slug={slug} />;
    }

    // Dynamic post route: any other non-root path treated as slug
    if (
        path !== '/' &&
        !['/services', '/projects', '/about', '/contact', '/posts', '/tools', '/tags'].includes(
            path
        )
    ) {
        const slug = path.replace(/^\//, '');
        return <PostPage slug={slug} />;
    }

    return (
        <>
            {/* Scroll progress indicator */}
            <div
                className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500"
                style={{ width: `${scrollProgress}%`, transition: 'width 0.1s ease' }}
            />

            <Navbar />
            <main className="relative">
                <Hero />
                <Skills />
                <Experience />
                <Contact />
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

export default App;
