import type { BlogArticle } from './api';

/** Shared date formatter used across blog listing and article detail views. */
export function formatArticleDate(value?: string, month: 'short' | 'long' = 'long') {
    if (!value) return '';

    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return '';

    return date.toLocaleDateString(undefined, {
        year: 'numeric',
        month,
        day: 'numeric',
    });
}

/** Normalizes an article's tags (string[] or {name}[]) into a string list. */
export function getArticleTags(article: Pick<BlogArticle, 'tags'>): string[] {
    if (!Array.isArray(article.tags)) return [];

    return article.tags
        .map((tag) => (typeof tag === 'string' ? tag : tag.name))
        .filter((tag): tag is string => Boolean(tag));
}
