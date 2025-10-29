import {useEffect, useMemo, useState} from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

interface ApiPost {
    id?: number | string
    title?: string
    slug?: string
    excerpt?: string
    content?: string
    created_at?: string
    published_at?: string
    updated_at?: string
    author?: string
    featured_image?: string
    tags?: string[] | { name: string }[]
}

interface ApiResponse {
    data?: ApiPost[]
    items?: ApiPost[]
    posts?: ApiPost[]
    meta?: {
        total?: number
    }
}

export default function TagPostsPage({slug}: { slug: string }) {
    const [scrollProgress, setScrollProgress] = useState(0)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [posts, setPosts] = useState<ApiPost[]>([])

    // Scroll progress bar
    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const progress = (window.scrollY / totalHeight) * 100
            setScrollProgress(progress)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        const controller = new AbortController()
        async function load() {
            setLoading(true)
            setError(null)
            try {
                const url = `https://msamgan.dev/api/post/tag/${encodeURIComponent(slug)}`
                const res = await fetch(url, {signal: controller.signal})
                if (!res.ok) throw new Error(`Failed to load posts for tag: ${slug}`)
                const json: ApiResponse | ApiPost[] = await res.json()
                // API might return an array directly or wrapped in an object
                const list = Array.isArray(json) ? json : (json.data ?? json.items ?? json.posts ?? [])
                setPosts(Array.isArray(list) ? list : [])
            } catch (e: unknown) {
                if ((e as any)?.name !== 'AbortError') {
                    setError((e as Error)?.message || 'Something went wrong while loading tag posts.')
                }
            } finally {
                setLoading(false)
            }
        }
        load().then()
        return () => controller.abort()
    }, [slug])

    const prettyTag = useMemo(() => slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()), [slug])

    return (
        <>
            {/* Scroll progress indicator */}
            <div
                className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500"
                style={{width: `${scrollProgress}%`, transition: 'width 0.1s ease'}}/>

            <Navbar/>

            <main className="relative">
                {/* Hero section */}
                <section className="relative min-h-[40vh] flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
                    {/* Background effects */}
                    <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"/>
                        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse"
                             style={{animationDelay: '1s'}}/>
                        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"
                             style={{animationDelay: '2s'}}/>
                    </div>

                    <div className="relative text-center max-w-4xl mx-auto space-y-6 animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-cyan-300 mb-4">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                            </svg>
                            Tagged Content
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-violet-200">
                            {prettyTag}
                        </h1>

                        <p className="text-lg md:text-xl text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed">
                            Explore all articles and content tagged with <span className="text-cyan-300 font-medium">{prettyTag}</span>
                        </p>

                        {/* Stats */}
                        {!loading && !error && posts.length > 0 && (
                            <div className="flex justify-center gap-8 pt-8">
                                <div className="space-y-2 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                                    <div className="text-3xl md:text-4xl font-bold gradient-text">{posts.length}</div>
                                    <div className="text-sm text-[var(--color-muted)]">{posts.length === 1 ? 'Article' : 'Articles'}</div>
                                </div>
                            </div>
                        )}
                    </div>
                </section>

                <section className="relative pb-16 px-6">
                    <div className="max-w-5xl mx-auto">
                        {loading && (
                            <div className="space-y-6">
                                {Array.from({length: 4}).map((_, idx) => (
                                    <div key={idx} className="card animate-pulse">
                                        <div className="flex flex-col lg:flex-row gap-6">
                                            <div className="lg:w-80 w-full aspect-video lg:aspect-[4/3] rounded-xl bg-white/10"/>
                                            <div className="flex-1 flex flex-col gap-4">
                                                <div className="flex gap-3">
                                                    <div className="h-8 w-32 bg-white/10 rounded-lg"/>
                                                    <div className="h-8 w-32 bg-white/10 rounded-lg"/>
                                                </div>
                                                <div className="h-8 w-3/4 bg-white/10 rounded"/>
                                                <div className="h-4 w-full bg-white/10 rounded"/>
                                                <div className="h-4 w-5/6 bg-white/10 rounded"/>
                                                <div className="mt-auto flex gap-2">
                                                    <div className="h-6 w-20 bg-white/10 rounded-full"/>
                                                    <div className="h-6 w-20 bg-white/10 rounded-full"/>
                                                    <div className="h-6 w-20 bg-white/10 rounded-full"/>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {error && (
                            <div className="card p-12 text-center border border-red-500/30 bg-red-500/10">
                                <svg className="w-12 h-12 mx-auto mb-4 text-red-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
                                </svg>
                                <div className="text-red-300 mb-4">{error}</div>
                                <button
                                    onClick={() => window.location.reload()}
                                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M4 4v6h6M20 20v-6h-6M5 19A9 9 0 1119 5"/>
                                    </svg>
                                    Try Again
                                </button>
                            </div>
                        )}

                        {!loading && !error && posts.length === 0 && (
                            <div className="card p-12 text-center">
                                <svg className="w-16 h-16 mx-auto mb-4 text-[var(--color-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <h3 className="text-xl font-semibold mb-2">No articles found</h3>
                                <p className="text-[var(--color-muted)] mb-6">
                                    No posts have been tagged with <span className="text-cyan-300 font-medium">{prettyTag}</span> yet.
                                </p>
                                <a
                                    href="/blog"
                                    className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm transition-all"
                                >
                                    Browse all articles
                                </a>
                            </div>
                        )}

                        {!loading && !error && posts.length > 0 && (
                            <div className="space-y-6">
                                {posts.map((post, idx) => {
                                    const date = post.published_at || post.created_at || post.updated_at
                                    const dateStr = date ? new Date(date).toLocaleDateString(undefined, {
                                        year: 'numeric',
                                        month: 'short',
                                        day: 'numeric'
                                    }) : ''
                                    const tags = Array.isArray(post.tags)
                                        ? post.tags.map((t: unknown) => (typeof t === 'string' ? t : (t as { name?: string })?.name)).filter((t): t is string => !!t)
                                        : []
                                    const href = post.slug ? `/${post.slug}` : undefined

                                    return (
                                        <article
                                            key={post.id ?? post.slug}
                                            className="card group cursor-pointer transition-all duration-500 hover:shadow-2xl animate-fade-in-up"
                                            style={{animationDelay: `${Math.min(idx * 0.1, 0.5)}s`}}
                                            onClick={(e) => {
                                                if (!href) return
                                                e.preventDefault()
                                                window.location.href = href
                                            }}
                                        >
                                            <div className="flex flex-col lg:flex-row gap-6">
                                                {/* Image Section */}
                                                <div className="relative lg:w-80 w-full aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-emerald-500/10 flex-shrink-0">
                                                    {post.featured_image ? (
                                                        <img
                                                            src={post.featured_image}
                                                            alt={post.title || 'Blog post'}
                                                            className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                        />
                                                    ) : (
                                                        <div className="flex items-center justify-center h-full">
                                                            <svg className="w-16 h-16 text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                                                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                                            </svg>
                                                        </div>
                                                    )}

                                                    {/* Dark gradient overlay */}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"/>

                                                    {/* External link icon */}
                                                    <div className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-90">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                                        </svg>
                                                    </div>

                                                    {/* Reading time badge */}
                                                    <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs">
                                                        <span className="inline-flex items-center gap-1.5">
                                                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                                            </svg>
                                                            5 min read
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Content Section */}
                                                <div className="flex-1 flex flex-col gap-4">
                                                    {/* Meta information */}
                                                    <div className="flex items-center gap-3 text-xs text-[var(--color-muted)]">
                                                        {dateStr && (
                                                            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                          d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                                                </svg>
                                                                {dateStr}
                                                            </span>
                                                        )}
                                                        {post.author && (
                                                            <>
                                                                <span>•</span>
                                                                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                                                                    </svg>
                                                                    {post.author}
                                                                </span>
                                                            </>
                                                        )}
                                                    </div>

                                                    {/* Title */}
                                                    <h2 className="text-2xl md:text-3xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:via-violet-300 group-hover:to-emerald-300 transition-all duration-300 line-clamp-2">
                                                        {post.title}
                                                    </h2>

                                                    {/* Excerpt */}
                                                    {post.excerpt && (
                                                        <p className="text-[var(--color-muted)] leading-relaxed line-clamp-2 md:line-clamp-3">
                                                            {post.excerpt}
                                                        </p>
                                                    )}

                                                    {/* Tags */}
                                                    {tags.length > 0 && (
                                                        <div className="mt-auto flex flex-wrap gap-2">
                                                            {tags.slice(0, 3).map((tag: string, i: number) => (
                                                                <span
                                                                    key={i}
                                                                    className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs bg-gradient-to-r from-cyan-500/10 to-violet-500/10 border border-cyan-500/20 text-cyan-300 hover:from-cyan-500/20 hover:to-violet-500/20 transition-all duration-300"
                                                                >
                                                                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                                                              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                                                                    </svg>
                                                                    {tag}
                                                                </span>
                                                            ))}
                                                            {tags.length > 3 && (
                                                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-white/5 border border-white/10 text-white/60">
                                                                    +{tags.length - 3} more
                                                                </span>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Read more link */}
                                                    <div className="flex items-center gap-2 text-sm font-medium text-cyan-300 mt-2">
                                                        <span>Read article</span>
                                                        <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3"/>
                                                        </svg>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Animated gradient progress bar */}
                                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"/>
                                        </article>
                                    )
                                })}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* CTA */}
            <section className="relative py-20 px-6 overflow-hidden">
                {/* Background gradient */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"/>

                <div className="relative max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-3xl md:text-4xl font-bold gradient-text">
                        Discover More Content
                    </h2>
                    <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
                        Browse all blog posts or explore other tags to find more articles on topics that interest you.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <a
                            href="/blog"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"/>
                            </svg>
                            All Blog Posts
                        </a>
                        <a
                            href="/tags"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-white font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
                            </svg>
                            Explore All Tags
                        </a>
                    </div>
                </div>
            </section>

            <Footer/>

            {/* Scroll to top button */}
            {scrollProgress > 20 && (
                <button
                    onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                    className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110 active:scale-95"
                    aria-label="Scroll to top"
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M5 10l7-7m0 0l7 7m-7-7v18"/>
                    </svg>
                </button>
            )}
        </>
    )
}
