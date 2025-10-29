import type { ReactNode } from "react";
import Container from "./Container";

export default function Section({
  id,
  title,
  subtitle,
  children,
  className = "",
}: {
  id?: string;
  title?: string | ReactNode;
  subtitle?: string | ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`py-16 sm:py-24 ${className}`}>
      <Container>
        {(title || subtitle) && (
          <header className="mb-12 text-center">
            {title && (
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="mt-4 text-lg text-[var(--color-muted)] max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </header>
        )}
        {children}
      </Container>
    </section>
  );
}
