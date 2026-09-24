export default function BlogArticleSkeleton() {
    return (
        <div
            className="editorial-row animate-pulse py-7 sm:py-8"
            aria-hidden="true"
        >
            <div className="flex flex-col gap-4">
                <div className="h-4 w-32 bg-white/10" />
                <div className="h-8 w-4/5 bg-white/10" />
                <div className="h-4 w-full rounded bg-white/10" />
                <div className="h-4 w-5/6 rounded bg-white/10" />
                <div className="mt-auto flex gap-2">
                    <div className="h-6 w-20 bg-white/10" />
                    <div className="h-6 w-20 bg-white/10" />
                </div>
            </div>
        </div>
    );
}
