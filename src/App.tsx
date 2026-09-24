import { useEffect, useState } from 'react';
import './App.css';
import PageShell from './components/PageShell';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Work from './components/Work';
import OpenSourceIndex from './components/OpenSourceIndex';
import Writing from './components/Writing';
import Contact from './components/Contact';
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
    const [path, setPath] = useState<string>(window.location.pathname);

    useEffect(() => {
        const handlePopState = () => setPath(window.location.pathname);

        window.addEventListener('popstate', handlePopState);
        return () => {
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
        <PageShell>
            <Hero />
            <Stats />
            <Skills />
            <Experience />
            <Work />
            <OpenSourceIndex />
            <Writing />
            <Contact />
        </PageShell>
    );
}

export default App;
