import { useMemo, useState } from 'react';
import PageShell from '../components/PageShell';

type AssetType = 'logo' | 'mark' | 'wordmark';
type AssetVariant = 'light' | 'dark' | 'black' | 'white';
type AssetFormat = 'svg' | 'png';

const assetTypes: { value: AssetType; label: string }[] = [
    { value: 'logo', label: 'Logo' },
    { value: 'mark', label: 'Mark' },
    { value: 'wordmark', label: 'Wordmark' },
];

const assetVariants: { value: AssetVariant; label: string; background: string }[] = [
    { value: 'light', label: 'On light', background: '#f6f7f8' },
    { value: 'dark', label: 'On dark', background: '#111112' },
    { value: 'black', label: 'Black', background: '#ffffff' },
    { value: 'white', label: 'White', background: '#d9480f' },
];

function escapeAttribute(value: string) {
    return value
        .replaceAll('&', '&amp;')
        .replaceAll('"', '&quot;')
        .replaceAll('<', '&lt;')
        .replaceAll('>', '&gt;');
}

function getSafeLink(value: string) {
    try {
        const url = new URL(value);
        return url.protocol === 'https:' || url.protocol === 'http:' ? url.href : null;
    } catch {
        return null;
    }
}

export default function DevNullEmbedPage() {
    const [assetType, setAssetType] = useState<AssetType>('logo');
    const [variant, setVariant] = useState<AssetVariant>('dark');
    const [format, setFormat] = useState<AssetFormat>('svg');
    const [width, setWidth] = useState(240);
    const [altText, setAltText] = useState('/dev/null logo');
    const [isLinked, setIsLinked] = useState(true);
    const [linkUrl, setLinkUrl] = useState('https://dev-null.sh');
    const [copyMessage, setCopyMessage] = useState('');

    const assetUrl = `https://dev-null.sh/images/brand/dev-null-${assetType}-${variant}.${format}`;
    const validLink = isLinked ? getSafeLink(linkUrl) : null;
    const code = useMemo(() => {
        const image = [
            `  <img`,
            `    src="${assetUrl}"`,
            `    alt="${escapeAttribute(altText)}"`,
            `    width="${width}"`,
            `    style="width: ${width}px; max-width: 100%; height: auto; display: block;"`,
            `  />`,
        ].join('\n');

        return validLink
            ? `<a href="${escapeAttribute(validLink)}" target="_blank" rel="noopener noreferrer">\n${image}\n</a>`
            : image;
    }, [altText, assetUrl, validLink, width]);

    const selectedVariant = assetVariants.find((item) => item.value === variant)!;

    async function copyCode() {
        try {
            await navigator.clipboard.writeText(code);
            setCopyMessage('Embed code copied.');
        } catch {
            setCopyMessage('Clipboard access is unavailable. Select the code below and copy it.');
        }
    }

    return (
        <PageShell>
            <article className="editorial">
                <section className="border-b border-[var(--editorial-line)] pt-28 pb-12 sm:pt-36 sm:pb-16">
                    <div className="mx-auto max-w-7xl px-5 sm:px-8">
                        <div className="eyebrow mb-8">Developer tools / Brand assets</div>
                        <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
                            <div className="lg:col-span-8">
                                <span className="font-mono-label text-xs uppercase text-[var(--editorial-accent)]">
                                    /dev/null
                                </span>
                                <h1 className="mt-4 max-w-4xl font-serif-display text-5xl font-normal leading-[.98] tracking-tight sm:text-7xl lg:text-8xl">
                                    Embed code generator
                                </h1>
                            </div>
                            <p className="max-w-md leading-relaxed text-[var(--editorial-muted)] lg:col-span-4 lg:pb-2">
                                Choose an official /dev/null brand asset, tune its display options,
                                and copy a ready-to-use HTML snippet.
                            </p>
                        </div>
                        <a
                            href="https://dev-null.sh/brand"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="editorial-link mt-7 text-sm text-[var(--editorial-muted)] hover:text-[var(--editorial-ink)]"
                        >
                            View the official brand guide <span aria-hidden="true">↗</span>
                        </a>
                    </div>
                </section>

                <section className="px-5 py-10 sm:px-8 sm:py-14">
                    <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
                        <div className="space-y-8">
                            <fieldset>
                                <legend className="font-mono-label text-xs uppercase text-[var(--editorial-muted)]">
                                    01 / Asset
                                </legend>
                                <div className="mt-3 grid grid-cols-3 gap-2">
                                    {assetTypes.map((item) => (
                                        <button
                                            key={item.value}
                                            type="button"
                                            aria-pressed={assetType === item.value}
                                            onClick={() => setAssetType(item.value)}
                                            className={`border px-4 py-3 text-sm transition-colors ${
                                                assetType === item.value
                                                    ? 'border-[var(--editorial-accent)] bg-[var(--editorial-accent)]/10 text-[var(--editorial-ink)]'
                                                    : 'border-[var(--editorial-line-strong)] text-[var(--editorial-muted)] hover:text-[var(--editorial-ink)]'
                                            }`}
                                        >
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend className="font-mono-label text-xs uppercase text-[var(--editorial-muted)]">
                                    02 / Background variant
                                </legend>
                                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                                    {assetVariants.map((item) => (
                                        <button
                                            key={item.value}
                                            type="button"
                                            aria-pressed={variant === item.value}
                                            onClick={() => setVariant(item.value)}
                                            className={`flex items-center gap-2 border px-3 py-3 text-xs transition-colors ${
                                                variant === item.value
                                                    ? 'border-[var(--editorial-accent)] text-[var(--editorial-ink)]'
                                                    : 'border-[var(--editorial-line-strong)] text-[var(--editorial-muted)] hover:text-[var(--editorial-ink)]'
                                            }`}
                                        >
                                            <span
                                                aria-hidden="true"
                                                className="h-4 w-4 shrink-0 border border-black/20"
                                                style={{ backgroundColor: item.background }}
                                            />
                                            {item.label}
                                        </button>
                                    ))}
                                </div>
                            </fieldset>

                            <fieldset>
                                <legend className="font-mono-label text-xs uppercase text-[var(--editorial-muted)]">
                                    03 / File format
                                </legend>
                                <div className="mt-3 flex gap-2">
                                    {(['svg', 'png'] as const).map((item) => (
                                        <button
                                            key={item}
                                            type="button"
                                            aria-pressed={format === item}
                                            onClick={() => setFormat(item)}
                                            className={`border px-5 py-2.5 font-mono-label text-xs uppercase transition-colors ${
                                                format === item
                                                    ? 'border-[var(--editorial-accent)] text-[var(--editorial-ink)]'
                                                    : 'border-[var(--editorial-line-strong)] text-[var(--editorial-muted)] hover:text-[var(--editorial-ink)]'
                                            }`}
                                        >
                                            {item}
                                        </button>
                                    ))}
                                </div>
                            </fieldset>

                            <div>
                                <div className="mb-3 flex items-center justify-between">
                                    <label
                                        htmlFor="asset-width"
                                        className="font-mono-label text-xs uppercase text-[var(--editorial-muted)]"
                                    >
                                        04 / Display width
                                    </label>
                                    <span className="font-mono-label text-xs text-[var(--editorial-ink)]">
                                        {width}px
                                    </span>
                                </div>
                                <input
                                    id="asset-width"
                                    type="range"
                                    min="64"
                                    max="480"
                                    step="8"
                                    value={width}
                                    onChange={(event) => setWidth(Number(event.target.value))}
                                    className="w-full accent-[var(--editorial-accent)]"
                                />
                                <div className="mt-1 flex justify-between font-mono-label text-[10px] text-[var(--editorial-muted)]">
                                    <span>64px</span>
                                    <span>480px</span>
                                </div>
                            </div>

                            <div>
                                <label
                                    htmlFor="asset-alt"
                                    className="font-mono-label text-xs uppercase text-[var(--editorial-muted)]"
                                >
                                    05 / Accessible description
                                </label>
                                <input
                                    id="asset-alt"
                                    type="text"
                                    value={altText}
                                    onChange={(event) => setAltText(event.target.value)}
                                    className="mt-3 w-full border border-[var(--editorial-line-strong)] bg-white/[0.03] px-4 py-3 text-sm text-[var(--editorial-ink)] outline-none transition-colors focus:border-[var(--editorial-accent)]"
                                />
                            </div>

                            <div className="border-t border-[var(--editorial-line)] pt-6">
                                <label className="flex items-center gap-3 text-sm text-[var(--editorial-ink)]">
                                    <input
                                        type="checkbox"
                                        checked={isLinked}
                                        onChange={(event) => setIsLinked(event.target.checked)}
                                        className="h-4 w-4 accent-[var(--editorial-accent)]"
                                    />
                                    Link the image to /dev/null
                                </label>
                                {isLinked && (
                                    <div className="mt-4">
                                        <label
                                            htmlFor="asset-link"
                                            className="font-mono-label text-xs uppercase text-[var(--editorial-muted)]"
                                        >
                                            Link destination
                                        </label>
                                        <input
                                            id="asset-link"
                                            type="url"
                                            value={linkUrl}
                                            onChange={(event) => setLinkUrl(event.target.value)}
                                            className="mt-2 w-full border border-[var(--editorial-line-strong)] bg-white/[0.03] px-4 py-3 text-sm text-[var(--editorial-ink)] outline-none transition-colors focus:border-[var(--editorial-accent)]"
                                        />
                                        {!validLink && (
                                            <p className="mt-2 text-xs text-amber-300">
                                                Enter a valid HTTP or HTTPS URL, or turn off the link.
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="space-y-5">
                            <section aria-labelledby="preview-title">
                                <div className="mb-3 flex items-center justify-between">
                                    <h2
                                        id="preview-title"
                                        className="font-mono-label text-xs uppercase text-[var(--editorial-muted)]"
                                    >
                                        Live preview
                                    </h2>
                                    <span className="font-mono-label text-[10px] uppercase text-[var(--editorial-muted)]">
                                        {assetType} / {variant} / {format}
                                    </span>
                                </div>
                                <div
                                    className="flex min-h-56 items-center justify-center overflow-hidden border border-[var(--editorial-line-strong)] p-8 sm:min-h-72"
                                    style={{ backgroundColor: selectedVariant.background }}
                                >
                                    {validLink ? (
                                        <a
                                            href={validLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={altText || '/dev/null'}
                                        >
                                            <img
                                                src={assetUrl}
                                                alt={altText}
                                                style={{ width: `${width}px`, maxWidth: '100%', height: 'auto' }}
                                            />
                                        </a>
                                    ) : (
                                        <img
                                            src={assetUrl}
                                            alt={altText}
                                            style={{ width: `${width}px`, maxWidth: '100%', height: 'auto' }}
                                        />
                                    )}
                                </div>
                            </section>

                            <section aria-labelledby="code-title">
                                <div className="mb-3 flex items-center justify-between gap-4">
                                    <h2
                                        id="code-title"
                                        className="font-mono-label text-xs uppercase text-[var(--editorial-muted)]"
                                    >
                                        Embed code
                                    </h2>
                                    <button
                                        type="button"
                                        onClick={copyCode}
                                        className="border border-[var(--editorial-line-strong)] px-4 py-2 font-mono-label text-[10px] uppercase text-[var(--editorial-ink)] transition-colors hover:border-[var(--editorial-accent)] hover:text-[var(--editorial-accent)]"
                                    >
                                        Copy code
                                    </button>
                                </div>
                                <textarea
                                    aria-label="Generated HTML embed code"
                                    readOnly
                                    value={code}
                                    onFocus={(event) => event.currentTarget.select()}
                                    rows={validLink ? 8 : 6}
                                    className="w-full resize-y border border-[var(--editorial-line-strong)] bg-[#111113] p-4 font-mono text-xs leading-relaxed text-[var(--editorial-ink)] outline-none focus:border-[var(--editorial-accent)]"
                                />
                                <p className="mt-2 min-h-5 text-xs text-[var(--editorial-muted)]" role="status" aria-live="polite">
                                    {copyMessage}
                                </p>
                            </section>

                            <a
                                href={assetUrl}
                                download
                                target="_blank"
                                rel="noreferrer"
                                className="editorial-link text-sm text-[var(--editorial-muted)] hover:text-[var(--editorial-ink)]"
                            >
                                Download selected asset <span aria-hidden="true">↓</span>
                            </a>
                        </div>
                    </div>
                </section>

                <section className="border-t border-[var(--editorial-line)] px-5 py-8 sm:px-8">
                    <div className="mx-auto flex max-w-7xl flex-col gap-3 text-xs leading-relaxed text-[var(--editorial-muted)] sm:flex-row sm:items-center sm:justify-between">
                        <p>
                            Assets are served by /dev/null. Choose a background variant that has
                            enough contrast with your page.
                        </p>
                        <a
                            href="https://dev-null.sh/images/brand/dev-null-brand.zip"
                            download
                            className="editorial-link w-fit hover:text-[var(--editorial-ink)]"
                        >
                            Download brand kit <span aria-hidden="true">↓</span>
                        </a>
                    </div>
                </section>
            </article>
        </PageShell>
    );
}
