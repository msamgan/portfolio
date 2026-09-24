// Lightweight, selective Prism-based syntax highlighting for blog article
// code blocks. Only the languages the blog actually publishes are loaded, so
// the bundle stays small. This module is purely presentational: it never
// mutates the raw code text, it only produces highlighted markup to render.
import Prism from 'prismjs';
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-markup-templating';
import 'prismjs/components/prism-clike';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-sql';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';
import 'prismjs/components/prism-php';

// Maps language aliases (and the `language-xxx` / `lang-xxx` class-name
// convention) to the Prism grammar name and a human-readable label used in
// the code-block header.
const LANGUAGE_ALIASES: Record<string, { grammar: string; label: string }> = {
    php: { grammar: 'php', label: 'PHP' },
    js: { grammar: 'javascript', label: 'JavaScript' },
    javascript: { grammar: 'javascript', label: 'JavaScript' },
    jsx: { grammar: 'jsx', label: 'JSX' },
    ts: { grammar: 'typescript', label: 'TypeScript' },
    typescript: { grammar: 'typescript', label: 'TypeScript' },
    tsx: { grammar: 'tsx', label: 'TSX' },
    json: { grammar: 'json', label: 'JSON' },
    sh: { grammar: 'bash', label: 'Bash' },
    shell: { grammar: 'bash', label: 'Bash' },
    bash: { grammar: 'bash', label: 'Bash' },
    zsh: { grammar: 'bash', label: 'Bash' },
    html: { grammar: 'markup', label: 'HTML' },
    markup: { grammar: 'markup', label: 'HTML' },
    xml: { grammar: 'markup', label: 'XML' },
    svg: { grammar: 'markup', label: 'SVG' },
    css: { grammar: 'css', label: 'CSS' },
    sql: { grammar: 'sql', label: 'SQL' },
    yaml: { grammar: 'yaml', label: 'YAML' },
    yml: { grammar: 'yaml', label: 'YAML' },
    markdown: { grammar: 'markdown', label: 'Markdown' },
    md: { grammar: 'markdown', label: 'Markdown' },
};

/**
 * Extracts the language identifier from a `<code>` element's class list,
 * supporting both the `language-xxx` and `lang-xxx` conventions.
 */
export function detectLanguage(className: string | null | undefined): string | null {
    if (!className) return null;

    const match = className.match(/(?:language|lang)-([\w-]+)/i);
    return match ? match[1].toLowerCase() : null;
}

/** Resolves a raw language token to a known Prism grammar + display label. */
export function resolveLanguage(raw: string | null): { grammar: string; label: string } | null {
    if (!raw) return null;
    return LANGUAGE_ALIASES[raw.toLowerCase()] ?? null;
}

/**
 * The blog API currently omits language classes from some code blocks. Use
 * distinctive syntax as a fallback so those blocks still receive highlighting.
 */
export function inferLanguage(code: string): string | null {
    const phpSignals = [
        /<\?php\b/,
        /\$[A-Za-z_]\w*/,
        /\$this\s*->/,
        /\b(?:public|protected|private)\s+(?:static\s+)?function\b/,
        /\b(?:Route|App|File|Config)::[A-Za-z_]\w*/,
    ];
    const javascriptSignals = [
        /\b(?:const|let|var)\s+[A-Za-z_$][\w$]*\s*=/,
        /(?:=>|console\.(?:log|error|warn)\s*\()/,
        /\b(?:import|export)\s+(?:[\w{*]|default\b)/,
    ];
    const jsonSignals = [/^\s*["'][\w-]+["']\s*:/m, /^\s*[[{]/, /[}\]]\s*$/m];

    const score = (signals: RegExp[]) =>
        signals.reduce((total, signal) => total + (signal.test(code) ? 1 : 0), 0);
    const scores = [
        { language: 'php', value: score(phpSignals) },
        { language: 'javascript', value: score(javascriptSignals) },
        { language: 'json', value: score(jsonSignals) },
    ].sort((a, b) => b.value - a.value);

    return scores[0].value > 0 ? scores[0].language : null;
}

/**
 * Highlights raw code for the given language. Returns the code untouched
 * (HTML-escaped only) when the language is unknown or unsupported, so
 * article rendering never breaks on an unrecognised language.
 */
export function highlightCode(code: string, grammarName?: string): string {
    const grammar = grammarName ? Prism.languages[grammarName] : undefined;

    if (grammar) {
        try {
            return Prism.highlight(code, grammar, grammarName as string);
        } catch {
            // Fall through to the escaped plain-text fallback below.
        }
    }

    return code.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}
