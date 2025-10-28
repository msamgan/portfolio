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
                {/* Header */}
                <section className="relative overflow-hidden py-16 md:py-20">
                    <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/10 via-transparent to-violet-500/10"/>
                    <div className="relative max-w-4xl mx-auto px-6 text-center space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[var(--color-muted)] text-xs">
                            <span>Tag</span>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M3 5a2 2 0 012-2h4l10 10a2 2 0 010 2.828l-4.172 4.172a2 2 0 01-2.828 0L3 9V5z"/>
                            </svg>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-bold gradient-text">Posts tagged “{prettyTag}”</h1>
                        <p className="text-[var(--color-muted)]">Explore all articles associated with this tag.</p>
                    </div>
                </section>

                <section className="relative pb-16 px-6">
                    <div className="max-w-5xl mx-auto">
                        {loading && (
                            <div className="flex items-center justify-center py-16">
                                <div className="animate-spin h-8 w-8 rounded-full border-2 border-white/20 border-t-white"/>
                            </div>
                        )}

                        {error && (
                            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 text-red-100">
                                {error}
                            </div>
                        )}

                        {!loading && !error && posts.length === 0 && (
                            <div className="p-6 rounded-xl bg-white/5 border border-white/10 text-center">
                                <p className="text-white/80">No posts found for this tag yet.</p>
                            </div>
                        )}

                        {!loading && !error && posts.length > 0 && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {posts.map((post) => (
                                    <a key={post.id ?? post.slug}
                                       href={`/${post.slug ?? ''}`}
                                       className="group block rounded-xl bg-white/5 border border-white/10 overflow-hidden hover:bg-white/10 transition-all">
                                        {post.featured_image && (
                                            <div className="aspect-[16/9] overflow-hidden bg-black/30">
                                                <img src={post.featured_image} alt={post.title ?? ''}
                                                     className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"/>
                                            </div>
                                        )}
                                        <div className="p-5 space-y-2">
                                            <h3 className="text-lg font-semibold text-white group-hover:text-cyan-300 transition-colors">{post.title}</h3>
                                            {post.excerpt && (
                                                <p className="text-sm text-[var(--color-muted)] line-clamp-3">{post.excerpt}</p>
                                            )}
                                            <div className="flex items-center gap-3 text-xs text-white/60">
                                                {post.published_at && <span>{new Date(post.published_at).toLocaleDateString()}</span>}
                                                {post.author && (
                                                    <>
                                                        <span>•</span>
                                                        <span>{post.author}</span>
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </a>
                                ))}
                            </div>
                        )}
                    </div>
                </section>
            </main>

            {/* CTA */}
            <section className="relative py-16 px-6 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent"/>
                <div className="relative max-w-4xl mx-auto text-center space-y-6">
                    <h2 className="text-2xl md:text-3xl font-bold gradient-text">Discover More</h2>
                    <p className="text-[var(--color-muted)]">Browse all posts or explore other tags to find more content.</p>
                    <div className="flex gap-4 justify-center">
                        <a href="/posts" className="px-5 py-2 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all">All Posts</a>
                        <a href="/tags" className="px-5 py-2 rounded-lg bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-all">All Tags</a>
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
