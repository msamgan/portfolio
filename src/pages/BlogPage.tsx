import { useEffect, useMemo, useState } from 'react'
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
  cover_image?: string
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

  useEffect(() => {
    const controller = new AbortController()

    async function load() {
      setLoading(true)
      setError(null)
      try {
        const url = new URL('https://msamgan.dev/api/post/list/paginated')
        url.searchParams.set('page', String(page))
        const res = await fetch(url.toString(), { signal: controller.signal })
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

        setPagination({ current, perPage, total, totalPages })
      } catch (e: any) {
        if (e?.name !== 'AbortError') {
          setError(e?.message || 'Something went wrong while loading posts.')
        }
      } finally {
        setLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [page])

  const hasPrev = useMemo(() => pagination.current > 1, [pagination.current])
  const hasNext = useMemo(() => pagination.current < pagination.totalPages, [pagination.current, pagination.totalPages])

  return (
    <>
      {/* Scroll progress indicator */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500"
        style={{ width: `${scrollProgress}%`, transition: 'width 0.1s ease' }}
      />

      <Navbar />

      {/* Hero section for blog page */}
      <section className="relative min-h-[40vh] flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Content */}
        <div className="relative text-center max-w-4xl mx-auto space-y-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-cyan-300 mb-4">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2" />
            </svg>
            Latest Articles
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-violet-200">
            Blog
          </h1>

          <p className="text-lg md:text-xl text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed">
            Insights, tutorials, and updates from my work and open-source journey.
          </p>
        </div>
      </section>

      <main className="relative px-6 py-6">
        <div className="max-w-5xl mx-auto">
          {error && (
            <div className="mb-6 p-4 border border-red-500/30 bg-red-500/10 text-red-200 rounded-lg">
              {error}
            </div>
          )}

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="p-6 rounded-2xl bg-white/5 border border-white/10 animate-pulse h-40" />
              ))}
            </div>
          )}

          {!loading && posts.length === 0 && !error && (
            <div className="p-6 border border-white/10 bg-white/5 rounded-xl text-center text-[var(--color-muted)]">
              No posts found.
            </div>
          )}

          {!loading && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {posts.map((post) => {
                const date = post.published_at || post.created_at || post.updated_at
                const dateStr = date ? new Date(date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : ''
                const tags = Array.isArray(post.tags)
                  ? post.tags.map((t: any) => (typeof t === 'string' ? t : t?.name)).filter(Boolean)
                  : []
                const href = post.slug ? `https://msamgan.dev/blog/${post.slug}` : undefined

                return (
                  <article key={(post.id ?? post.slug ?? Math.random()).toString()} className="group relative p-6 rounded-2xl bg-white/5 border border-white/10 hover:bg-white/10 transition-colors duration-300">
                    <div className="flex flex-col h-full gap-4">
                      <div className="flex items-center gap-3 text-xs text-[var(--color-muted)]">
                        {dateStr && <span className="inline-flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                          {dateStr}
                        </span>}
                        {tags.length > 0 && <span>•</span>}
                        <div className="flex flex-wrap gap-2">
                          {tags.slice(0, 4).map((tag, i) => (
                            <span key={i} className="px-2 py-0.5 rounded-full bg-white/10 text-xs text-cyan-200 border border-white/10">{tag}</span>
                          ))}
                        </div>
                      </div>

                      <h3 className="text-xl font-semibold leading-tight">
                        {href ? (
                          <a href={href} target="_blank" rel="noreferrer" className="hover:underline">
                            {post.title || post.slug || 'Untitled'}
                          </a>
                        ) : (
                          post.title || post.slug || 'Untitled'
                        )}
                      </h3>

                      {post.excerpt && (
                        <p className="text-sm text-[var(--color-muted)] line-clamp-3">{post.excerpt}</p>
                      )}

                      <div className="mt-auto pt-2">
                        {href && (
                          <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200">
                            Read more
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}

          {/* Pagination */}
          <div className="flex items-center justify-center gap-4 mt-10">
            <button
              disabled={!hasPrev || loading}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className={`px-4 py-2 rounded-full border text-sm transition-all ${hasPrev && !loading ? 'border-white/20 text-white hover:bg-white/10' : 'border-white/10 text-white/40 cursor-not-allowed'}`}
            >
              Previous
            </button>
            <div className="text-sm text-[var(--color-muted)]">
              Page {pagination.current} {pagination.totalPages ? `of ${pagination.totalPages}` : ''}
            </div>
            <button
              disabled={!hasNext || loading}
              onClick={() => setPage((p) => p + 1)}
              className={`px-4 py-2 rounded-full border text-sm transition-all ${hasNext && !loading ? 'border-white/20 text-white hover:bg-white/10' : 'border-white/10 text-white/40 cursor-not-allowed'}`}
            >
              Next
            </button>
          </div>
        </div>
      </main>

      <Footer />

      {/* Scroll to top button */}
      {scrollProgress > 20 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 glow"
          aria-label="Scroll to top"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
          </svg>
        </button>
      )}
    </>
  )
}
