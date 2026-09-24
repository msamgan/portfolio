export default function BlogArticleSkeleton() {
    return (
        <div
            className="card animate-pulse"
            aria-hidden="true"
        >
            <div className="flex flex-col gap-6 lg:flex-row">
                <div className="aspect-video w-full shrink-0 rounded-xl bg-white/10 lg:w-80 lg:aspect-[4/3]" />
                <div className="flex flex-1 flex-col gap-4">
                    <div className="h-7 w-32 rounded-lg bg-white/10" />
                    <div className="h-8 w-4/5 rounded bg-white/10" />
                    <div className="h-4 w-full rounded bg-white/10" />
                    <div className="h-4 w-5/6 rounded bg-white/10" />
                    <div className="mt-auto flex gap-2">
                        <div className="h-6 w-20 rounded-full bg-white/10" />
                        <div className="h-6 w-20 rounded-full bg-white/10" />
                    </div>
                </div>
            </div>
        </div>
    );
}
