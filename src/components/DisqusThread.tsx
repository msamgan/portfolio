import { useEffect, useRef } from 'react';

// Minimal global typings for Disqus
declare global {
    interface Window {
        DISQUS?: {
            reset: (options: {
                reload: boolean;
                config: () => void;
            }) => void;
        };
        disqus_config?: () => void;
    }
}

interface DisqusThreadProps {
    shortname?: string; // default: msamgan-com
    identifier: string; // unique id per page/post
    url?: string; // canonical URL; defaults to window.location.href
}

export default function DisqusThread({
    shortname = 'msamgan-com',
    identifier,
    url,
}: DisqusThreadProps) {
    const threadRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const pageUrl = url || window.location.href;

        // Define/configure disqus_config per Disqus Universal Code
        window.disqus_config = function () {
            // @ts-ignore - Disqus injects `this`
            this.page = this.page || {};
            // @ts-ignore
            this.page.url = pageUrl;
            // @ts-ignore
            this.page.identifier = identifier;
        };

        const scriptId = 'dsq-embed-scr';
        const existingScript = document.getElementById(scriptId) as HTMLScriptElement | null;

        if (window.DISQUS) {
            // If Disqus is already loaded, reset with new config
            try {
                window.DISQUS.reset({
                    reload: true,
                    config: window.disqus_config!,
                });
            } catch (e) {
                // Fallback: remove script to re-inject
                if (existingScript) existingScript.remove();
            }
        }

        if (!window.DISQUS) {
            // Inject the embed script only once
            const d = document;
            const s = d.createElement('script');
            s.src = `https://${shortname}.disqus.com/embed.js`;
            s.id = scriptId;
            s.setAttribute('data-timestamp', String(+new Date()));
            (d.head || d.body).appendChild(s);
        }

        // No cleanup required; Disqus manages its own DOM
    }, [identifier, shortname, url]);

    return (
        <div className="mt-12">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[var(--color-muted)] mb-4">
                Comments
            </h3>
            <div ref={threadRef} id="disqus_thread" />
            <noscript>
                Please enable JavaScript to view the{' '}
                <a href="https://disqus.com/?ref_noscript">comments powered by Disqus.</a>
            </noscript>
        </div>
    );
}
