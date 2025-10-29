import { useEffect, useState, useMemo } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

interface TagItem {
  id?: string | number;
  name?: string;
  slug?: string;
  count?: number;
  // Fallback when API returns plain strings
  toString?: () => string;
}

export default function TagsPage() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [tags, setTags] = useState<TagItem[] | string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "count">("name");

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Normalize various possible API shapes to a flat array of tags (strings or objects)
  const normalizeTags = (raw: any): (TagItem | string)[] => {
    const candidates: any[] = [];

    const tryPush = (val: any) => {
      if (!val) return;
      if (Array.isArray(val)) {
        candidates.push(...val);
      }
    };

    if (Array.isArray(raw)) tryPush(raw);
    if (raw && typeof raw === "object") {
      tryPush(raw.data);
      tryPush(raw.tags);
      tryPush(raw.items);
      tryPush(raw.payload);
      if (raw.data && typeof raw.data === "object") {
        tryPush(raw.data.tags);
        tryPush(raw.data.items);
      }
      // Support object-of-items shape (e.g., {"0": {...}, "1": {...}})
      tryPush(Object.values(raw));
    }

    // Fallback: if still empty and raw is a string list in a known key
    if (candidates.length === 0 && raw && typeof raw === "object") {
      const firstArray = Object.values(raw).find((v) => Array.isArray(v)) as
        | any[]
        | undefined;
      if (firstArray) candidates.push(...firstArray);
    }

    // Map to TagItem|string and sanitize
    const mapped = candidates
      .filter((x) => x != null)
      .map((x) => {
        if (typeof x === "string") return x.trim();
        if (typeof x === "object") {
          const name = (x.name ?? x.slug ?? "").toString();
          const slug = (x.slug ?? x.name ?? "").toString();
          const countRaw = x.count ?? x.posts_count;
          const count = typeof countRaw === "number" ? countRaw : undefined;
          if (!name && !slug) return JSON.stringify(x);
          return { name, slug, count };
        }
        return String(x);
      });

    // Deduplicate by string/slug/name
    const seen = new Set<string>();
    const unique: (TagItem | string)[] = [];
    for (const item of mapped) {
      const key =
        typeof item === "string"
          ? item.toLowerCase()
          : (item.slug || item.name || "").toLowerCase();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      unique.push(item);
    }

    // Sort alphabetically by label
    unique.sort((a, b) => {
      const la = typeof a === "string" ? a : a.name || a.slug || "";
      const lb = typeof b === "string" ? b : b.name || b.slug || "";
      return la.localeCompare(lb);
    });

    return unique;
  };

  const fetchTags = async () => {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

    try {
      setLoading(true);
      setError(null);

      // Simple retry (up to 2 attempts)
      const attempt = async (): Promise<Response> => {
        return fetch("https://msamgan.dev/api/tag/list", {
          signal: controller.signal,
          method: "GET",
          headers: {
            Accept: "application/json, text/plain, */*",
            "Cache-Control": "no-cache",
            Pragma: "no-cache",
          },
          cache: "no-store",
          referrerPolicy: "no-referrer",
          mode: "cors",
        });
      };

      let res: Response | null = null;
      let lastErr: any = null;
      for (let i = 0; i < 2; i++) {
        try {
          res = await attempt();
          if (res.ok) break;
          lastErr = new Error(`Failed to load tags: ${res.status}`);
        } catch (err) {
          lastErr = err;
          await new Promise((r) => setTimeout(r, 300 * (i + 1)));
        }
      }

      if (!res || !res.ok) throw lastErr || new Error("Failed to load tags");

      // Try to parse JSON safely
      let data: any;
      const ct = res.headers.get("content-type") || "";
      if (ct.includes("application/json")) {
        data = await res.json();
      } else {
        const text = await res.text();
        try {
          data = JSON.parse(text);
        } catch {
          // Some endpoints may return newline-delimited or plain arrays
          data = text;
        }
      }

      const normalized = normalizeTags(data);
      setTags(normalized);
    } catch (e: any) {
      if (e?.name === "AbortError") {
        setError("Request timed out while loading tags. Please try again.");
      } else {
        setError(e?.message || "Something went wrong while loading tags");
      }
      setTags([]);
    } finally {
      clearTimeout(timeoutId);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTags();
    // no deps: run on mount only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTagLabel = (t: TagItem | string) => {
    if (typeof t === "string") return t;
    return t.name || t.slug || String(t);
  };

  const renderTagCount = (t: TagItem | string) => {
    if (typeof t === "string") return null;
    if (typeof t.count === "number") return t.count;
    return null;
  };

  // Filter and sort tags based on search query and sort preference
  const filteredTags = useMemo(() => {
    if (!Array.isArray(tags)) return [];

    const filtered = tags.filter((t) => {
      const label = renderTagLabel(t).toLowerCase();
      return label.includes(searchQuery.toLowerCase());
    });

    // Sort by name or count
    filtered.sort((a, b) => {
      if (sortBy === "count") {
        const countA = renderTagCount(a) ?? 0;
        const countB = renderTagCount(b) ?? 0;
        return countB - countA; // Descending
      } else {
        const la = renderTagLabel(a).toLowerCase();
        const lb = renderTagLabel(b).toLowerCase();
        return la.localeCompare(lb);
      }
    });

    return filtered;
  }, [tags, searchQuery, sortBy]);

  return (
    <>
      {/* Scroll progress indicator */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-1 bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500"
        style={{ width: `${scrollProgress}%`, transition: "width 0.1s ease" }}
      />

      <Navbar />

      {/* Hero section */}
      <section className="relative min-h-[40vh] flex items-center justify-center pt-24 pb-16 px-6 overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
          <div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-violet-500/10 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "1s" }}
          />
          <div
            className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: "2s" }}
          />
        </div>

        <div className="relative text-center max-w-4xl mx-auto space-y-6 animate-fade-in-up">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-cyan-300 mb-4">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            Content Organization
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-100 to-violet-200">
            Explore by Tags
          </h1>
          <p className="text-lg md:text-xl text-[var(--color-muted)] max-w-2xl mx-auto leading-relaxed">
            Discover content organized by topics. Filter and explore articles,
            projects, and resources across various technologies and themes.
          </p>

          {/* Stats */}
          {!loading && !error && (
            <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto pt-8">
              <div
                className="space-y-2 animate-fade-in-up"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text">
                  {Array.isArray(tags) ? tags.length : 0}+
                </div>
                <div className="text-sm text-[var(--color-muted)]">
                  Total Tags
                </div>
              </div>
              <div
                className="space-y-2 animate-fade-in-up"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text">
                  {Array.isArray(tags)
                    ? tags.reduce((sum, t) => sum + (renderTagCount(t) ?? 0), 0)
                    : 0}
                  +
                </div>
                <div className="text-sm text-[var(--color-muted)]">
                  Tagged Items
                </div>
              </div>
              <div
                className="space-y-2 animate-fade-in-up"
                style={{ animationDelay: "0.4s" }}
              >
                <div className="text-3xl md:text-4xl font-bold gradient-text">
                  100%
                </div>
                <div className="text-sm text-[var(--color-muted)]">
                  Categorized
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Tags section */}
      <main className="relative py-12 px-6">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="space-y-6">
              {/* Skeleton for search/filter controls */}
              <div className="card p-6 space-y-4">
                <div className="h-10 bg-white/5 rounded-lg animate-pulse" />
                <div className="flex gap-4">
                  <div className="h-10 bg-white/5 rounded-lg flex-1 animate-pulse" />
                  <div className="h-10 bg-white/5 rounded-lg w-40 animate-pulse" />
                </div>
              </div>

              {/* Skeleton tags grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="card px-4 py-3 animate-pulse">
                    <div className="h-5 bg-white/5 rounded" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {error && (
            <div className="card p-6 text-center border border-red-500/30 bg-red-500/10">
              <svg
                className="w-12 h-12 mx-auto mb-4 text-red-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div className="text-red-300 mb-4">{error}</div>
              <button
                onClick={fetchTags}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white text-sm font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 4v6h6M20 20v-6h-6M5 19A9 9 0 1119 5"
                  />
                </svg>
                Retry
              </button>
            </div>
          )}

          {!loading && !error && (
            <div className="space-y-6">
              {/* Search and filter controls */}
              <div className="card p-6 space-y-4">
                <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                  <h2 className="text-2xl font-semibold gradient-text">
                    All Tags
                  </h2>
                  <div className="text-sm text-[var(--color-muted)]">
                    {filteredTags.length}{" "}
                    {filteredTags.length === 1 ? "tag" : "tags"}
                    {searchQuery && ` matching "${searchQuery}"`}
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  {/* Search input */}
                  <div className="relative flex-1">
                    <svg
                      className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <input
                      type="text"
                      placeholder="Search tags..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-[var(--color-muted)] focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all"
                    />
                    {searchQuery && (
                      <button
                        onClick={() => setSearchQuery("")}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-white transition-colors"
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
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    )}
                  </div>

                  {/* Sort dropdown */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) =>
                        setSortBy(e.target.value as "name" | "count")
                      }
                      className="appearance-none px-4 py-2 pr-10 bg-white/5 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50 transition-all cursor-pointer"
                    >
                      <option value="name">Sort by Name</option>
                      <option value="count">Sort by Count</option>
                    </select>
                    <svg
                      className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--color-muted)] pointer-events-none"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Tags grid */}
              {filteredTags.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
                  {filteredTags.map((t, idx) => {
                    const label = renderTagLabel(t);
                    const count = renderTagCount(t);
                    return (
                      <a
                        key={idx}
                        href={`/tag/${typeof t === "string" ? encodeURIComponent(t.toLowerCase().replace(/\s+/g, "-")) : encodeURIComponent((t.slug || t.name || "").toLowerCase().replace(/\s+/g, "-"))}`}
                        className="group relative card px-4 py-3 flex items-center justify-between hover:scale-105 transition-all duration-300 cursor-pointer animate-fade-in-up"
                        style={{
                          animationDelay: `${Math.min(idx * 0.05, 1)}s`,
                        }}
                      >
                        {/* Gradient glow on hover */}
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/0 via-violet-500/0 to-emerald-500/0 group-hover:from-cyan-500/20 group-hover:via-violet-500/20 group-hover:to-emerald-500/20 blur-xl transition-all duration-500 -z-10" />

                        <div className="flex items-center gap-2 flex-1 min-w-0">
                          {/* Tag icon */}
                          <svg
                            className="w-4 h-4 text-cyan-400 flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                            />
                          </svg>
                          <span className="truncate text-sm group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-300 group-hover:to-violet-300 transition-all duration-300">
                            {label}
                          </span>
                        </div>

                        {count !== null && (
                          <span className="ml-2 text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-violet-500/20 text-white/70 group-hover:from-cyan-500/40 group-hover:to-violet-500/40 group-hover:text-white transition-all duration-300 flex-shrink-0">
                            {count}
                          </span>
                        )}

                        {/* Animated gradient border */}
                        <div className="absolute inset-0 rounded-2xl border border-white/0 group-hover:border-white/20 transition-all duration-500" />

                        {/* Animated gradient progress bar */}
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-cyan-500 via-violet-500 to-emerald-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left rounded-b-2xl" />
                      </a>
                    );
                  })}
                </div>
              ) : (
                <div className="card p-12 text-center">
                  <svg
                    className="w-16 h-16 mx-auto mb-4 text-[var(--color-muted)]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <h3 className="text-xl font-semibold mb-2">No tags found</h3>
                  <p className="text-[var(--color-muted)] mb-4">
                    {searchQuery
                      ? `No tags match "${searchQuery}". Try a different search term.`
                      : "No tags available at the moment."}
                  </p>
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm transition-all"
                    >
                      Clear search
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </main>

      {/* CTA Section */}
      <section className="relative py-20 px-6 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent" />

        <div className="relative max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text">
            Looking for Specific Content?
          </h2>
          <p className="text-lg text-[var(--color-muted)] max-w-2xl mx-auto">
            Explore my blog posts, projects, and resources. Each piece is
            carefully tagged to help you find exactly what you need.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="/posts"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-cyan-500 to-violet-500 text-white font-medium hover:shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 active:scale-95"
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
                  d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                />
              </svg>
              View Blog
            </a>
            <a
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/10 text-white font-medium transition-all duration-300 hover:scale-105 active:scale-95"
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
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
              Browse Projects
            </a>
          </div>
        </div>
      </section>

      <Footer />

      {/* Scroll to top button */}
      {scrollProgress > 20 && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-8 right-8 z-40 p-3 rounded-full bg-gradient-to-r from-cyan-500 to-violet-500 text-white shadow-lg hover:shadow-xl hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-110 active:scale-95"
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
