import { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Container from '../components/Container'

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

interface PostPageProps {
  slug: string
}

export default function PostPage({ slug }: PostPageProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [post, setPost] = useState<ApiPost | null>(null)
  const [scrollProgress, setScrollProgress] = useState(0)

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
      setPost(null)
      try {
        const res = await fetch(`https://msamgan.dev/api/post/${encodeURIComponent(slug)}`,
          { signal: controller.signal })
        if (!res.ok) {
          throw new Error(`Failed to load post (${res.status})`)
        }
        const json = await res.json()
        // API may return the post directly or under a data key
        const p: ApiPost = json?.data ?? json
        setPost(p || null)
      } catch (e: unknown) {
        const error = e as Error
        if (error?.name !== 'AbortError') {
          setError(error?.message || 'Something went wrong while loading the post.')
        }
      } finally {
        setLoading(false)
      }
    }

    load()
    return () => controller.abort()
  }, [slug])

  const formatDate = (iso?: string) => {
    if (!iso) return ''
    try {
      const d = new Date(iso)
      return d.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    } catch {
      return iso
    }
  }

  const estimateReadingTime = (content?: string) => {
    if (!content) return 0
    const text = content.replace(/<[^>]*>/g, '')
    const words = text.trim().split(/\s+/).length
    return Math.ceil(words / 200) // Average reading speed: 200 words per minute
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-white relative overflow-hidden">
      {/* Scroll progress indicator */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500"
        style={{ width: `${scrollProgress}%`, transition: 'width 0.1s ease' }}
      />

      {/* Background decorative elements */}
      <div className="absolute top-20 right-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />

      {/* Abstract geometric figures */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <svg className="absolute top-32 right-1/4 w-24 h-24 animate-float" style={{ animationDuration: '6s' }} viewBox="0 0 100 100">
          <path d="M50 5 L90 27.5 L90 72.5 L50 95 L10 72.5 L10 27.5 Z"
                fill="none"
                stroke="url(#gradient1)"
                strokeWidth="1.5"
                className="animate-pulse" />
          <defs>
            <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22d3ee" />
              <stop offset="100%" stopColor="#a78bfa" />
            </linearGradient>
          </defs>
        </svg>

        <svg className="absolute top-1/3 left-16 w-20 h-20 animate-float" style={{ animationDuration: '8s', animationDelay: '1s' }} viewBox="0 0 100 100">
          <circle cx="50" cy="50" r="20" fill="none" stroke="#22d3ee" strokeWidth="1.5" opacity="0.6" />
          <circle cx="50" cy="50" r="30" fill="none" stroke="#a78bfa" strokeWidth="1" opacity="0.4" className="animate-pulse" />
        </svg>
      </div>

      <Navbar />

      <main className="relative z-10 pt-20 sm:pt-28 pb-16">
        <Container>
          <div className="max-w-4xl mx-auto">
            {loading && (
              <div className="space-y-6 animate-fade-in-up">
                <div className="space-y-4 animate-pulse">
                  <div className="h-8 w-32 bg-white/10 rounded-lg" />
                  <div className="h-12 w-3/4 bg-white/10 rounded-lg" />
                  <div className="h-6 w-1/2 bg-white/10 rounded-lg" />
                  <div className="aspect-video w-full bg-white/10 rounded-2xl mt-8" />
                  <div className="space-y-3 mt-8">
                    <div className="h-4 w-full bg-white/10 rounded" />
                    <div className="h-4 w-5/6 bg-white/10 rounded" />
                    <div className="h-4 w-4/6 bg-white/10 rounded" />
                  </div>
                </div>
              </div>
            )}

            {error && (
              <div className="animate-fade-in-up">
                <div className="card border-2 border-red-500/30 bg-red-500/5">
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-red-500/10 flex items-center justify-center">
                      <svg className="w-6 h-6 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-red-200 mb-2">Error Loading Post</h3>
                      <p className="text-red-300/80">{error}</p>
                      <button
                        onClick={() => window.history.back()}
                        className="mt-4 btn-secondary inline-flex items-center gap-2"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Go Back
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {!loading && !error && post && (
              <article className="animate-fade-in-up">
                {/* Back button */}
                <button
                  onClick={() => window.history.back()}
                  className="mb-8 inline-flex items-center gap-2 text-[var(--color-muted)] hover:text-white transition-colors link-hover"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Blog
                </button>

                {/* Article Header */}
                <header className="mb-12">
                  {/* Tags */}
                  {Array.isArray(post.tags) && post.tags.length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-2">
                      {post.tags.slice(0, 3).map((t, idx) => {
                        const name = typeof t === 'string' ? t : t?.name
                        if (!name) return null
                        return (
                          <span key={idx} className="badge">
                            #{name}
                          </span>
                        )
                      })}
                    </div>
                  )}

                  {/* Title */}
                  <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight mb-6">
                    {post.title}
                  </h1>

                  {/* Excerpt */}
                  {post.excerpt && (
                    <p className="text-xl text-[var(--color-muted)] leading-relaxed mb-8">
                      {post.excerpt}
                    </p>
                  )}

                  {/* Meta information */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-[var(--color-muted)]">
                    {post.author && (
                      <div className="flex items-center gap-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 flex items-center justify-center font-bold text-white">
                          {post.author.charAt(0).toUpperCase()}
                        </div>
                        <span className="font-medium text-white">{post.author}</span>
                      </div>
                    )}
                    {(post.published_at || post.created_at) && (
                      <>
                        <span className="text-white/30">•</span>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          <time>{formatDate(post.published_at || post.created_at)}</time>
                        </div>
                      </>
                    )}
                    {post.content && (
                      <>
                        <span className="text-white/30">•</span>
                        <div className="flex items-center gap-2">
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <span>{estimateReadingTime(post.content)} min read</span>
                        </div>
                      </>
                    )}
                  </div>
                </header>

                {/* Featured Image */}
                {post.featured_image && (
                  <div className="mb-12 relative rounded-2xl overflow-hidden ring-1 ring-white/10 hover:ring-white/20 transition-all">
                    <img
                      src={post.featured_image}
                      alt={post.title || 'Post image'}
                      className="w-full aspect-video object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                  </div>
                )}

                {/* Content */}
                {post.content && (
                  <div className="post-content">
                    <div
                      className="prose prose-lg prose-invert max-w-none
                        prose-headings:font-bold prose-headings:tracking-tight
                        prose-h1:text-4xl prose-h1:mb-6 prose-h1:mt-12
                        prose-h2:text-3xl prose-h2:mb-4 prose-h2:mt-10 prose-h2:gradient-text
                        prose-h3:text-2xl prose-h3:mb-3 prose-h3:mt-8
                        prose-p:text-[var(--color-text)] prose-p:leading-relaxed prose-p:mb-6
                        prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:text-cyan-300 prose-a:transition-colors
                        prose-strong:text-white prose-strong:font-semibold
                        prose-code:text-cyan-300 prose-code:bg-white/5 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                        prose-pre:bg-[var(--color-surface)] prose-pre:border prose-pre:border-white/10 prose-pre:rounded-xl prose-pre:shadow-xl
                        prose-blockquote:border-l-4 prose-blockquote:border-cyan-500 prose-blockquote:bg-white/5 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-xl prose-blockquote:not-italic
                        prose-ul:list-disc prose-ul:ml-6 prose-ul:space-y-2
                        prose-ol:list-decimal prose-ol:ml-6 prose-ol:space-y-2
                        prose-li:text-[var(--color-text)] prose-li:leading-relaxed
                        prose-img:rounded-xl prose-img:border prose-img:border-white/10 prose-img:shadow-2xl
                        prose-hr:border-white/10 prose-hr:my-12
                        prose-table:border-collapse prose-table:w-full
                        prose-th:bg-white/5 prose-th:border prose-th:border-white/10 prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:font-semibold
                        prose-td:border prose-td:border-white/10 prose-td:px-4 prose-td:py-2"
                      dangerouslySetInnerHTML={{ __html: post.content }}
                    />
                  </div>
                )}

                {/* Tags (bottom) */}
                {Array.isArray(post.tags) && post.tags.length > 0 && (
                  <div className="mt-12 pt-8 border-t border-white/10">
                    <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-4">
                      Tags
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((t, idx) => {
                        const name = typeof t === 'string' ? t : t?.name
                        if (!name) return null
                        return (
                          <span key={idx} className="badge hover:bg-gradient-to-r hover:from-cyan-500/10 hover:to-violet-500/10">
                            #{name}
                          </span>
                        )
                      })}
                    </div>
                  </div>
                )}

                {/* Share Section */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="card bg-gradient-to-br from-cyan-500/5 to-violet-500/5">
                    <h3 className="text-lg font-semibold mb-4">Share this post</h3>
                    <div className="flex flex-wrap gap-3">
                      <button
                        onClick={() => {
                          const url = window.location.href
                          const text = `Check out this post: ${post.title}`
                          window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
                        }}
                        className="btn-secondary"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                        Twitter
                      </button>
                      <button
                        onClick={() => {
                          const url = window.location.href
                          window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
                        }}
                        className="btn-secondary"
                      >
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                        LinkedIn
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(window.location.href)
                          alert('Link copied to clipboard!')
                        }}
                        className="btn-secondary"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        Copy Link
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {!loading && !error && !post && (
              <div className="animate-fade-in-up">
                <div className="card text-center py-16">
                  <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-white/5 flex items-center justify-center">
                    <svg className="w-10 h-10 text-[var(--color-muted)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h2 className="text-2xl font-bold mb-2">Post not found</h2>
                  <p className="text-[var(--color-muted)] mb-8">
                    We couldn't find a post with the slug "<span className="text-cyan-400">{slug}</span>".
                  </p>
                  <button
                    onClick={() => window.history.back()}
                    className="btn-primary inline-flex items-center gap-2"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Go Back
                  </button>
                </div>
              </div>
            )}
          </div>
        </Container>
      </main>

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

      <Footer />
    </div>
  )
}
