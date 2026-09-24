// Lightweight SPA navigation helpers.
// The app doesn't use react-router; App.tsx derives the current page from
// `window.location.pathname` and re-renders on the `popstate` event. Regular
// <a> tags trigger a full page reload, so internal links must go through
// `navigate()` instead, which updates history and dispatches a synthetic
// `popstate` event to notify App.tsx without reloading the page.
export function navigate(to: string) {
    const url = new URL(to, window.location.origin);
    const current = window.location.pathname + window.location.search + window.location.hash;
    const next = url.pathname + url.search + url.hash;

    if (next === current) return;

    window.history.pushState({}, '', to);
    window.dispatchEvent(new PopStateEvent('popstate'));
}

export function isInternalHref(href: string): boolean {
    return href.startsWith('/') && !href.startsWith('//');
}
