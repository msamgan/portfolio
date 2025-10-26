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
    page?: number
    current_page?: number
    pageSize?: number
    per_page?: number
    total?: number
    total_pages?: number
    last_page?: number
    meta?: {
        current_page?: number
        per_page?: number
        total?: number
        last_page?: number
        total_pages?: number
    }
}

export default function BlogPage() {
    const [scrollProgress, setScrollProgress] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [posts, setPosts] = useState<ApiPost[]>([])
    const [searchQuery, setSearchQuery] = useState('')
    const [debouncedSearch, setDebouncedSearch] = useState('')
    const [pagination, setPagination] = useState({
        current: 1,
        perPage: 10,
        total: 0,
        totalPages: 1,
    })

    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
            const progress = (window.scrollY / totalHeight) * 100
            setScrollProgress(progress)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Debounce search query
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchQuery)
            setPage(1) // Reset to first page when search changes
        }, 500)

        return () => clearTimeout(timer)
    }, [searchQuery])

    useEffect(() => {
        const controller = new AbortController()

        async function load() {
            setLoading(true)
            setError(null)
            try {
                const url = new URL('https://msamgan.dev/api/post/list/paginated')
                url.searchParams.set('page', String(page))
                if (debouncedSearch.trim()) {
                    url.searchParams.set('query', debouncedSearch.trim())
                }
                const res = await fetch(url.toString(), {signal: controller.signal})
                if (!res.ok) throw new Error(`Failed to load posts: ${res.status}`)
                const json: ApiResponse = await res.json()

                const list = json.data ?? json.items ?? json.posts ?? []
                setPosts(Array.isArray(list) ? list : [])

                // derive pagination
                const meta = json.meta ?? {}
                const current = meta.current_page ?? json.current_page ?? json.page ?? page
                const perPage = meta.per_page ?? json.per_page ?? json.pageSize ?? (Array.isArray(list) ? list.length : 10)
                const total = meta.total ?? json.total ?? 0
                const totalPages = meta.last_page ?? meta.total_pages ?? json.last_page ?? json.total_pages ?? (perPage ? Math.max(1, Math.ceil(total / perPage)) : 1)
                setPagination({current, perPage, total, totalPages})
            } catch (e: unknown) {
                if (e && typeof e === 'object' && 'name' in e && e.name !== 'AbortError') {
                    setError((e as Error)?.message || 'Something went wrong while loading posts.')
                }
            } finally {
                setLoading(false)
            }
        }

        load().then()
        return () => controller.abort()
    }, [page, debouncedSearch])

    const hasPrev = useMemo(() => pagination.current > 1, [pagination])
    const hasNext = useMemo(() => pagination.current < pagination.totalPages, [pagination])

    return (
        <>
            {/* Scroll progress indicator */}
            <div
                className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500"
                style={{width: `${scrollProgress}%`, transition: 'width 0.1s ease'}}
            />

            <Navbar/>

            {/* Hero section for blog page */}
            <section
                className="relative min-h-[40vh] flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
                {/* Background effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <div
                        className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"/>
                    <div
                        className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse"
                        style={{animationDelay: '1s'}}/>
                </div>

                {/* Content */}
                <div className="relative text-center max-w-4xl mx-auto space-y-6 animate-fade-in-up">
                    <div
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-cyan-300 mb-4">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2"/>
                        </svg>
                        Latest Articles
                    </div>

                    <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-violet-200">
                        Blog
                    </h1>

                    <p className="text-lg md:text-xl text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed">
                        Insights, tutorials, and updates from my work and open-source journey.
                    </p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto mb-8">
                        <div className="space-y-2 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
                            <div className="text-3xl md:text-4xl font-bold gradient-text">
                                {!loading && pagination.total > 0 ? pagination.total : '50+'}
                            </div>
                            <div className="text-xs md:text-sm text-[var(--color-muted)]">Total Articles</div>
                        </div>
                        <div className="space-y-2 animate-fade-in-up" style={{animationDelay: '0.4s'}}>
                            <div className="text-3xl md:text-4xl font-bold gradient-text">5</div>
                            <div className="text-xs md:text-sm text-[var(--color-muted)]">Min Avg Read</div>
                        </div>
                        <div className="space-y-2 animate-fade-in-up" style={{animationDelay: '0.5s'}}>
                            <div className="text-3xl md:text-4xl font-bold gradient-text">10+</div>
                            <div className="text-xs md:text-sm text-[var(--color-muted)]">Topics Covered</div>
                        </div>
                        <div className="space-y-2 animate-fade-in-up" style={{animationDelay: '0.6s'}}>
                            <div className="text-3xl md:text-4xl font-bold gradient-text">4+</div>
                            <div className="text-xs md:text-sm text-[var(--color-muted)]">Posts Monthly</div>
                        </div>
                    </div>

                    {/* Search Bar */}
                    <div className="max-w-2xl mx-auto mt-8 animate-fade-in-up" style={{animationDelay: '0.2s'}}>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                <svg
                                    className="w-5 h-5 text-[var(--color-muted)] group-focus-within:text-cyan-400 transition-colors duration-300"
                                    fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                                </svg>
                            </div>
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search articles..."
                                className="w-full pl-12 pr-12 py-4 rounded-full bg-white/5 border border-white/10 text-white placeholder-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-cyan-400/50 transition-all duration-300 backdrop-blur-sm hover:bg-white/10"
                            />
                            {searchQuery && (
                                <button
                                    onClick={() => setSearchQuery('')}
                                    className="absolute inset-y-0 right-0 pr-4 flex items-center text-[var(--color-muted)] hover:text-white transition-colors duration-300"
                                    aria-label="Clear search"
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                              d="M6 18L18 6M6 6l12 12"/>
                                    </svg>
                                </button>
                            )}
                            {loading && debouncedSearch && (
                                <div className="absolute inset-y-0 right-0 pr-4 flex items-center">
                                    <svg className="animate-spin h-5 w-5 text-cyan-400"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"
                                                strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor"
                                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                </div>
                            )}
                        </div>
                        {debouncedSearch && (
                            <div className="mt-3 text-sm text-[var(--color-muted)] text-center animate-fade-in-up">
                                Searching for: <span className="text-cyan-300 font-medium">"{debouncedSearch}"</span>
                            </div>
                        )}
                    </div>
                </div>
            </section>

            <main className="relative px-6 py-6">
                <div className="max-w-5xl mx-auto">
                    {error && (
                        <div className="mb-6 p-6 border border-red-500/30 bg-red-500/10 rounded-xl backdrop-blur-sm">
                            <div className="flex items-start gap-3">
                                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none"
                                     stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <div>
                                    <h3 className="text-red-200 font-semibold mb-1">Error Loading Posts</h3>
                                    <p className="text-red-300/80 text-sm">{error}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {loading && (
                        <div className="space-y-6">
                            {Array.from({length: 4}).map((_, idx) => (
                                <div key={idx} className="card animate-pulse">
                                    <div className="flex flex-col lg:flex-row gap-6">
                                        <div
                                            className="lg:w-80 w-full aspect-video lg:aspect-[4/3] rounded-xl bg-white/10"/>
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

                    {!loading && posts.length === 0 && !error && (
                        <div className="card text-center py-16">
                            <div className="flex flex-col items-center gap-4">
                                <div className="p-6 rounded-full bg-white/5 border border-white/10">
                                    <svg className="w-16 h-16 text-white/20" fill="none" stroke="currentColor"
                                         viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                    </svg>
                                </div>
                                <h3 className="text-xl font-semibold text-white/80">
                                    {debouncedSearch ? 'No Results Found' : 'No Posts Found'}
                                </h3>
                                <p className="text-[var(--color-muted)] max-w-md">
                                    {debouncedSearch
                                        ? `No articles match your search for "${debouncedSearch}". Try different keywords.`
                                        : 'There are currently no blog posts available. Check back soon for new content!'
                                    }
                                </p>
                                {debouncedSearch && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="mt-4 btn btn-secondary"
                                    >
                                        Clear Search
                                    </button>
                                )}
                            </div>
                        </div>
                    )}

                    {!loading && posts.length > 0 && (
                        <div className="space-y-6">
                            {posts.map((post, index) => {
                                const date = post.published_at || post.created_at || post.updated_at
                                const dateStr = date ? new Date(date).toLocaleDateString(undefined, {
                                    year: 'numeric',
                                    month: 'short',
                                    day: 'numeric'
                                }) : ''
                                const tags = Array.isArray(post.tags)
                                    ? post.tags.map((t: unknown) => (typeof t === 'string' ? t : (t as {
                                        name?: string
                                    })?.name)).filter(Boolean)
                                    : []
                                const href = post.slug ? `https://msamgan.dev/blog/${post.slug}` : undefined

                                return (
                                    <article
                                        key={(post.id ?? post.slug ?? Math.random()).toString()}
                                        className="card group cursor-pointer transition-all duration-500 hover:shadow-2xl animate-fade-in-up"
                                        style={{animationDelay: `${index * 0.1}s`}}
                                        onClick={() => href && window.open(href, '_blank')}
                                    >
                                        <div className="flex flex-col lg:flex-row gap-6">
                                            {/* Image Section */}
                                            <div
                                                className="relative lg:w-80 w-full aspect-video lg:aspect-[4/3] rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500/10 via-violet-500/10 to-emerald-500/10 flex-shrink-0">
                                                {post.featured_image ? (
                                                    <img
                                                        src={post.featured_image}
                                                        alt={post.title || 'Blog post'}
                                                        className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full">
                                                        <svg className="w-16 h-16 text-white/20" fill="none"
                                                             stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                                  strokeWidth={1.5}
                                                                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                                                        </svg>
                                                    </div>
                                                )}

                                                {/* Dark gradient overlay */}
                                                <div
                                                    className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"/>

                                                {/* External link icon */}
                                                <div
                                                    className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-90">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor"
                                                         viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round"
                                                              strokeWidth={2}
                                                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* Content Section */}
                                            <div className="flex-1 flex flex-col gap-4">
                                                {/* Meta information */}
                                                <div
                                                    className="flex items-center gap-3 text-xs text-[var(--color-muted)]">
                                                    {dateStr && (
                                                        <span
                                                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
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
                                                            <span
                                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
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
                                                <h3 className="text-2xl md:text-3xl font-bold leading-tight group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:via-violet-300 group-hover:to-emerald-300 transition-all duration-300">
                                                    {post.title || post.slug || 'Untitled'}
                                                </h3>

                                                {/* Excerpt */}
                                                {post.excerpt && (
                                                    <p className="text-[var(--color-muted)] leading-relaxed line-clamp-2 md:line-clamp-3">
                                                        {post.excerpt}
                                                    </p>
                                                )}

                                                {/* Tags and CTA */}
                                                <div
                                                    className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                                    {/* Tags */}
                                                    {tags.length > 0 && (
                                                        <div className="flex flex-wrap gap-2">
                                                            {tags.slice(0, 3).map((tag, i) => (
                                                                <span
                                                                    key={i}
                                                                    className="badge hover:bg-gradient-to-r hover:from-cyan-500/20 hover:via-violet-500/20 hover:to-emerald-500/20"
                                                                >
                                  #{tag}
                                </span>
                                                            ))}
                                                            {tags.length > 3 && (
                                                                <span className="badge">
                                  +{tags.length - 3} more
                                </span>
                                                            )}
                                                        </div>
                                                    )}

                                                    {/* Read more link */}
                                                    {href && (
                                                        <div
                                                            className="inline-flex items-center gap-2 text-cyan-300 group-hover:text-cyan-200 font-medium transition-colors duration-300">
                                                            <span>Read article</span>
                                                            <svg
                                                                className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                                                                fill="none"
                                                                stroke="currentColor"
                                                                viewBox="0 0 24 24"
                                                            >
                                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                                      strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </article>
                                )
                            })}
                        </div>
                    )}

                    {/* Pagination */}
                    {!loading && posts.length > 0 && pagination.totalPages > 1 && (
                        <div
                            className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-12 pt-8 border-t border-white/10">
                            <button
                                disabled={!hasPrev || loading}
                                onClick={() => setPage((p) => Math.max(1, p - 1))}
                                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border text-sm font-medium transition-all duration-300 ${
                                    hasPrev && !loading
                                        ? 'border-white/20 text-white hover:bg-white/10 hover:border-white/30 hover:scale-105'
                                        : 'border-white/10 text-white/40 cursor-not-allowed'
                                }`}
                            >
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M15 19l-7-7 7-7"/>
                                </svg>
                                Previous
                            </button>

                            <div className="flex items-center gap-3">
                                <div
                                    className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-sm text-[var(--color-muted)]">
                                    Page <span className="text-white font-semibold mx-1">{pagination.current}</span>
                                    {pagination.totalPages > 0 && (
                                        <>
                                            of <span
                                            className="text-white font-semibold ml-1">{pagination.totalPages}</span>
                                        </>
                                    )}
                                </div>
                                {pagination.total > 0 && (
                                    <div className="hidden sm:block text-xs text-[var(--color-muted)]">
                                        ({pagination.total} total articles)
                                    </div>
                                )}
                            </div>

                            <button
                                disabled={!hasNext || loading}
                                onClick={() => setPage((p) => p + 1)}
                                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border text-sm font-medium transition-all duration-300 ${
                                    hasNext && !loading
                                        ? 'border-white/20 text-white hover:bg-white/10 hover:border-white/30 hover:scale-105'
                                        : 'border-white/10 text-white/40 cursor-not-allowed'
                                }`}
                            >
                                Next
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M9 5l7 7-7 7"/>
                                </svg>
                            </button>
                        </div>
                    )}
                </div>
            </main>

            <Footer/>

            {/* Scroll to top button */}
            {scrollProgress > 20 && (
                <button
                    onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}
                    className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 glow"
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

