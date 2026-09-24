export default function PostHeroSkeleton() {
    return (
        <section
            className="editorial relative border-b border-[var(--editorial-line)] pt-28 sm:pt-36 pb-14 sm:pb-20"
            aria-label="Loading article"
            aria-busy="true"
        >
            <div className="mx-auto max-w-4xl animate-pulse px-5 sm:px-8">
                <div className="h-4 w-32 bg-white/10" />
                <div className="mt-8 flex gap-2">
                    <div className="h-6 w-16 bg-white/10" />
                    <div className="h-6 w-20 bg-white/10" />
                </div>
                <div className="mt-6 h-14 w-full bg-white/10" />
                <div className="mt-4 h-14 w-3/4 bg-white/10" />
                <div className="mt-8 h-5 w-full max-w-xl bg-white/10" />
                <div className="mt-3 h-5 w-2/3 max-w-xl bg-white/10" />
                <div className="mt-8 h-4 w-40 bg-white/10" />
            </div>
            <div className="mx-auto mt-14 max-w-5xl animate-pulse px-5 sm:px-8">
                <div className="aspect-[16/9] w-full bg-white/10" />
            </div>
        </section>
    );
}
