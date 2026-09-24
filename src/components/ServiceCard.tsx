import ServiceIcon from './ServiceIcon';

export type ServiceData = {
    name: string;
    description: string;
};

/**
 * Single reusable row for a service — mirrors the image-left / content-right
 * pattern already used for the About page portrait so the Services page
 * reads as part of the same editorial system rather than a new layout.
 */
export default function ServiceCard({
    index,
    service,
    image,
}: {
    index: number;
    service: ServiceData;
    image?: string;
}) {
    return (
        <article
            className="group editorial-row grid grid-cols-1 items-stretch lg:grid-cols-12 gap-6 lg:gap-10 py-10 sm:py-12 animate-fade-in-up"
            style={{ animationDelay: `${index * 0.08}s` }}
        >
            <div className="lg:col-span-4 lg:flex lg:h-full">
                <div className="h-full w-full border border-[var(--editorial-line)] p-3 sm:p-4 lg:flex">
                    <div className="aspect-[4/3] w-full overflow-hidden bg-white/[0.02] lg:aspect-auto lg:h-full lg:flex-1">
                        {image ? (
                            <img
                                src={image}
                                alt={`${service.name} illustration`}
                                loading="lazy"
                                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                            />
                        ) : (
                            <div
                                className="flex h-full w-full items-center justify-center text-[var(--editorial-muted)]"
                                aria-hidden="true"
                            >
                                <ServiceIcon
                                    name={service.name}
                                    className="h-12 w-12"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="lg:col-span-8 flex flex-col justify-center gap-4">
                <div className="flex items-center">
                    <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center border border-[var(--editorial-line)] text-[var(--editorial-accent)]">
                        <ServiceIcon name={service.name} className="h-4 w-4" />
                    </span>
                </div>

                <h3 className="font-serif-display text-2xl sm:text-3xl text-[var(--editorial-ink)] transition-colors duration-300 group-hover:text-[var(--editorial-accent)]">
                    {service.name}
                </h3>

                <p className="max-w-2xl text-[var(--editorial-muted)] leading-relaxed">
                    {service.description}
                </p>
            </div>
        </article>
    );
}
