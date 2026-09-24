import type { AnchorHTMLAttributes, MouseEvent } from 'react';
import { isInternalHref, navigate } from '../lib/navigation';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
    href: string;
}

/**
 * Drop-in replacement for <a> that navigates client-side (no full page
 * reload) for internal links (href starting with "/"). External links,
 * links with a non-default target, and modified clicks (ctrl/cmd/shift/
 * middle-click) fall back to normal browser navigation.
 */
export default function Link({ href, onClick, target, ...props }: LinkProps) {
    const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event);

        if (event.defaultPrevented) return;
        if (!isInternalHref(href)) return;
        if (target && target !== '_self') return;
        if (event.button !== 0) return;
        if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

        event.preventDefault();
        navigate(href);
    };

    return <a href={href} target={target} onClick={handleClick} {...props} />;
}
