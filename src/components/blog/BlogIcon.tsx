type BlogIconName =
    | 'arrow-left'
    | 'arrow-right'
    | 'calendar'
    | 'clear'
    | 'document'
    | 'external'
    | 'search';

export default function BlogIcon({
    name,
    className = 'h-5 w-5',
}: {
    name: BlogIconName;
    className?: string;
}) {
    const paths: Record<BlogIconName, React.ReactNode> = {
        'arrow-left': <path d="m15 19-7-7 7-7" />,
        'arrow-right': <path d="m9 5 7 7-7 7" />,
        calendar: (
            <>
                <path d="M8 2v4m8-4v4M3 10h18" />
                <rect
                    x="3"
                    y="4"
                    width="18"
                    height="18"
                    rx="2"
                />
            </>
        ),
        clear: <path d="m6 6 12 12M18 6 6 18" />,
        document: <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z M14 2v6h6" />,
        external: <path d="M14 3h7v7m0-7L10 14m8 0v5a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h5" />,
        search: <path d="m21 21-4.35-4.35m2.35-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />,
    };

    return (
        <svg
            aria-hidden="true"
            className={className}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
        >
            {paths[name]}
        </svg>
    );
}
