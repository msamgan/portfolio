import { useEffect, useState } from 'react'
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

interface PostPageProps {
  slug: string
}

export default function PostPage({ slug }: PostPageProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [post, setPost] = useState<ApiPost | null>(null)

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
        if ((e as any)?.name !== 'AbortError') {
          setError((e as Error)?.message || 'Something went wrong while loading the post.')
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
      return d.toLocaleString(undefined, {
        year: 'numeric', month: 'short', day: '2-digit', hour: '2-digit', minute: '2-digit'
      })
    } catch {
      return iso
    }
  }

  return (
    <div className="min-h-screen bg-[var(--color-bg)] text-white">
      <Navbar />

      <main className="px-6 py-10">
        <div className="max-w-3xl mx-auto">
          {loading && (
            <div className="space-y-4 animate-pulse">
              <div className="h-10 w-3/4 bg-white/10 rounded" />
              <div className="h-5 w-1/2 bg-white/10 rounded" />
              <div className="aspect-video w-full bg-white/10 rounded-xl" />
              <div className="h-4 w-full bg-white/10 rounded" />
              <div className="h-4 w-5/6 bg-white/10 rounded" />
              <div className="h-4 w-4/6 bg-white/10 rounded" />
            </div>
          )}

          {error && (
            <div className="p-4 border border-red-500/30 bg-red-500/10 rounded-xl mb-6">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h3 className="text-red-200 font-semibold mb-1">Error Loading Post</h3>
                  <p className="text-red-300/80 text-sm">{error}</p>
                </div>
              </div>
            </div>
          )}

          {!loading && !error && post && (
            <article className="card">
              <header className="mb-6">
                <h1 className="text-3xl font-bold tracking-tight">{post.title}</h1>
                <div className="mt-2 text-sm text-[var(--color-muted)]">
                  {post.author && <span>By {post.author}</span>}
                  {(post.published_at || post.created_at) && (
                    <span className="ml-2">• {formatDate(post.published_at || post.created_at)}</span>
                  )}
                </div>
              </header>

              {post.featured_image && (
                <img
                  src={post.featured_image}
                  alt={post.title || 'Post image'}
                  className="w-full rounded-xl mb-6 border border-white/10"
                  loading="lazy"
                />
              )}

              {post.excerpt && (
                <p className="text-lg text-white/80 mb-6">{post.excerpt}</p>
              )}

              {post.content && (
                <div
                  className="prose prose-invert max-w-none"
                  // Assuming API returns trusted HTML for blog content
                  dangerouslySetInnerHTML={{ __html: post.content }}
                />
              )}

              {Array.isArray(post.tags) && post.tags.length > 0 && (
                <div className="mt-8 flex flex-wrap gap-2">
                  {post.tags.map((t, idx) => {
                    const name = typeof t === 'string' ? t : t?.name
                    if (!name) return null
                    return (
                      <span key={idx} className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-sm">
                        #{name}
                      </span>
                    )
                  })}
                </div>
              )}
            </article>
          )}

          {!loading && !error && !post && (
            <div className="card text-center">
              <h2 className="text-xl font-semibold">Post not found</h2>
              <p className="text-[var(--color-muted)] mt-2">We couldn't find a post for the slug "{slug}".</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
