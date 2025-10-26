import { useEffect, useState, useRef } from 'react'
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
  related_posts?: ApiPost[]
}

interface PostPageProps {
  slug: string
}

// Component to render post content with enhanced code block handling
function PostContent({ content }: { content: string }) {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return

    // Find all pre > code blocks and add copy buttons
    const preBlocks = contentRef.current.querySelectorAll('pre')

    preBlocks.forEach((pre) => {
      // Skip if button already exists
      if (pre.querySelector('.copy-code-button')) return

      const code = pre.querySelector('code')
      if (!code) return

      // Create wrapper for positioning
      pre.style.position = 'relative'

      // Create copy button
      const button = document.createElement('button')
      button.className = 'copy-code-button'
      button.setAttribute('aria-label', 'Copy code')
      button.innerHTML = `
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
      `

      button.addEventListener('click', () => {
        const codeText = code.textContent || ''
        navigator.clipboard.writeText(codeText).then(() => {
          button.innerHTML = `
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          `
          setTimeout(() => {
            button.innerHTML = `
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            `
          }, 2000)
        })
      })

      pre.appendChild(button)
    })
  }, [content])

  return (
    <div
      ref={contentRef}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  )
}

// Toast notification component
function Toast({ message, show, onClose }: { message: string; show: boolean; onClose: () => void }) {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(onClose, 3000)
      return () => clearTimeout(timer)
    }
  }, [show, onClose])

  if (!show) return null

  return (
    <div className="fixed bottom-24 right-8 z-50 animate-fade-in-up">
      <div className="card bg-gradient-to-r from-cyan-500/20 to-violet-500/20 border-2 border-cyan-500/50 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 flex items-center justify-center flex-shrink-0">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-white font-medium">{message}</p>
        </div>
      </div>
    </div>
  )
}

// Share button component
function ShareButton({
  icon,
  label,
  onClick,
  gradient
}: {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
  gradient: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`group relative overflow-hidden px-5 py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105 hover:shadow-xl flex items-center gap-2 ${gradient} text-white`}
    >
      <div className="relative z-10 flex items-center gap-2">
        {icon}
        <span>{label}</span>
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
    </button>
  )
}

// Component for the share section with state management
function ShareSection({ post }: { post: ApiPost }) {
  const [showToast, setShowToast] = useState(false)
  const [toastMessage, setToastMessage] = useState('')

  const showNotification = (message: string) => {
    setToastMessage(message)
    setShowToast(true)
  }

  const shareOnTwitter = () => {
    const url = window.location.href
    const text = `Check out this post: ${post.title}`
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
    showNotification('Opening Twitter...')
  }

  const shareOnLinkedIn = () => {
    const url = window.location.href
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank')
    showNotification('Opening LinkedIn...')
  }

  const shareOnFacebook = () => {
    const url = window.location.href
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank')
    showNotification('Opening Facebook...')
  }

  const shareOnReddit = () => {
    const url = window.location.href
    const title = post.title || 'Check out this post'
    window.open(`https://reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`, '_blank')
    showNotification('Opening Reddit...')
  }

  const shareViaEmail = () => {
    const url = window.location.href
    const subject = post.title || 'Check out this post'
    const body = `I thought you might find this interesting:\n\n${post.title}\n\n${post.excerpt || ''}\n\nRead more: ${url}`
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
    showNotification('Opening email client...')
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      showNotification('Link copied to clipboard!')
    })
  }

  return (
    <>
      <div className="mt-16 pt-8 border-t border-white/10">
        <div className="card bg-gradient-to-br from-cyan-500/5 via-violet-500/5 to-emerald-500/5 border border-white/10 relative overflow-hidden">
          {/* Decorative gradient overlay */}
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />

          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 flex items-center justify-center flex-shrink-0">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </div>
            <div>
              <h3 className="text-xl font-bold gradient-text">Share this post</h3>
              <p className="text-sm text-[var(--color-muted)] mt-1">Spread the knowledge with your network</p>
            </div>
          </div>

          {/* Share buttons grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            <ShareButton
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              }
              label="Twitter"
              onClick={shareOnTwitter}
              gradient="bg-gradient-to-r from-[#1DA1F2] to-[#0d8bd9]"
            />

            <ShareButton
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              }
              label="LinkedIn"
              onClick={shareOnLinkedIn}
              gradient="bg-gradient-to-r from-[#0077B5] to-[#005582]"
            />

            <ShareButton
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              }
              label="Facebook"
              onClick={shareOnFacebook}
              gradient="bg-gradient-to-r from-[#1877F2] to-[#0d5dbf]"
            />

            <ShareButton
              icon={
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
                </svg>
              }
              label="Reddit"
              onClick={shareOnReddit}
              gradient="bg-gradient-to-r from-[#FF4500] to-[#cc3700]"
            />

            <ShareButton
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              }
              label="Email"
              onClick={shareViaEmail}
              gradient="bg-gradient-to-r from-[#EA4335] to-[#c1351f]"
            />

            <ShareButton
              icon={
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                </svg>
              }
              label="Copy Link"
              onClick={copyLink}
              gradient="bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-secondary)]"
            />
          </div>

          {/* Additional info */}
          <div className="mt-6 pt-6 border-t border-white/10 flex items-center gap-2 text-sm text-[var(--color-muted)]">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p>Share to help others discover this content</p>
          </div>
        </div>
      </div>

      <Toast message={toastMessage} show={showToast} onClose={() => setShowToast(false)} />
    </>
  )
}


// Related Posts Component - matches BlogPage styling
function RelatedPosts({ posts }: { posts: ApiPost[] }) {
  if (!posts || posts.length === 0) return null

  const formatDate = (iso?: string) => {
    if (!iso) return ''
    try {
      const d = new Date(iso)
      return d.toLocaleDateString(undefined, {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      })
    } catch {
      return iso
    }
  }

  return (
    <div className="mt-16 pt-8 border-t border-white/10">
      <div className="mb-8 flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-cyan-500 to-violet-500 flex items-center justify-center flex-shrink-0">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
        </div>
        <div>
          <h2 className="text-2xl font-bold gradient-text">Related Articles</h2>
          <p className="text-sm text-[var(--color-muted)] mt-1">Continue your reading journey</p>
        </div>
      </div>

      <div className="space-y-6">
        {posts.slice(0, 6).map((post, index) => {
          const date = post.published_at || post.created_at || post.updated_at
          const dateStr = formatDate(date)
          const tags = Array.isArray(post.tags)
            ? post.tags.map((t: unknown) => (typeof t === 'string' ? t : (t as { name?: string })?.name)).filter(Boolean)
            : []
          const href = post.slug ? `/${post.slug}` : undefined

          return (
            <article
              key={(post.id ?? post.slug ?? Math.random()).toString()}
              className="card group cursor-pointer transition-all duration-500 hover:shadow-2xl animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onClick={(e) => {
                if (!href) return
                e.preventDefault()
                window.history.pushState({}, '', href)
                window.dispatchEvent(new PopStateEvent('popstate'))
                window.scrollTo({ top: 0, behavior: 'smooth' })
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
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                  )}

                  {/* Dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                  {/* External link icon */}
                  <div className="absolute top-4 right-4 p-2 rounded-lg bg-white/10 backdrop-blur-md border border-white/20 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-100 scale-90">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1 flex flex-col gap-4">
                  {/* Meta information */}
                  <div className="flex items-center gap-3 text-xs text-[var(--color-muted)]">
                    {dateStr && (
                      <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3M3 11h18M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {dateStr}
                      </span>
                    )}
                    {post.author && (
                      <>
                        <span>•</span>
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
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
                  <div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
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
                      <div className="inline-flex items-center gap-2 text-cyan-300 group-hover:text-cyan-200 font-medium transition-colors duration-300">
                        <span>Read article</span>
                        <svg
                          className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
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
    </div>
  )
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
                    <PostContent content={post.content} />
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
                <ShareSection post={post} />

                {/* Related Posts */}
                {post.related_posts && post.related_posts.length > 0 && (
                  <RelatedPosts posts={post.related_posts} />
                )}
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
