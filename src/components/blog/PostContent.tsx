import { useEffect, useRef } from 'react';
import { detectLanguage, highlightCode, resolveLanguage } from '../../features/blog/highlight';

/**
 * Renders the API-provided article HTML and progressively enhances every
 * `<pre><code>` block with syntax highlighting, a language label, and a
 * copy-to-clipboard button. This is purely presentational: the underlying
 * HTML markup and code text are never altered, only decorated.
 *
 * Highlighting only re-runs when `content` itself changes (never on
 * unrelated re-renders), and each `<pre>` is marked once it's processed so
 * repeated effect runs are safe no-ops.
 */
export default function PostContent({ content }: { content: string }) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const root = containerRef.current;
        if (!root) return;

        const teardowns: Array<() => void> = [];
        const preBlocks = root.querySelectorAll<HTMLPreElement>('pre:not([data-code-block])');

        preBlocks.forEach((pre) => {
            const codeEl = pre.querySelector('code');
            if (!codeEl) return;

            // Capture the exact original code before any mutation. This is
            // what the copy button will use, so it always copies the
            // untouched source rather than highlighted markup.
            const rawCode = codeEl.textContent ?? '';
            const language = detectLanguage(codeEl.className);
            const resolved = resolveLanguage(language);

            codeEl.innerHTML = highlightCode(rawCode, resolved?.grammar);
            if (resolved) {
                codeEl.classList.add(`language-${resolved.grammar}`);
            }

            pre.classList.add('code-block');
            pre.setAttribute('data-code-block', 'true');

            const header = document.createElement('div');
            header.className = 'code-block__header';

            const label = document.createElement('span');
            label.className = 'code-block__lang';
            label.textContent = resolved?.label ?? 'Code';
            header.appendChild(label);

            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'code-block__copy';
            button.setAttribute('aria-label', 'Copy code to clipboard');
            button.textContent = 'Copy';
            header.appendChild(button);

            pre.insertBefore(header, pre.firstChild);

            let resetTimer: number | undefined;
            const resetLabel = () => {
                button.textContent = 'Copy';
                button.classList.remove('code-block__copy--done');
            };
            const handleClick = () => {
                navigator.clipboard
                    .writeText(rawCode)
                    .then(() => {
                        button.textContent = 'Copied';
                        button.classList.add('code-block__copy--done');
                    })
                    .catch(() => {
                        button.textContent = 'Press ⌘/Ctrl+C';
                    })
                    .finally(() => {
                        window.clearTimeout(resetTimer);
                        resetTimer = window.setTimeout(resetLabel, 2000);
                    });
            };

            button.addEventListener('click', handleClick);
            teardowns.push(() => {
                window.clearTimeout(resetTimer);
                button.removeEventListener('click', handleClick);
            });
        });

        return () => {
            teardowns.forEach((teardown) => teardown());
        };
    }, [content]);

    return (
        <div
            ref={containerRef}
            className="post-content prose prose-invert max-w-none"
            // The API is the source of truth for article HTML; we render it
            // as-is and only decorate code blocks after mount (see above).
            dangerouslySetInnerHTML={{ __html: content }}
        />
    );
}
