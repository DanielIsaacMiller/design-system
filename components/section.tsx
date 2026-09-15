export function Section({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="border-t border-line/60 py-14 md:py-20">
      <div className="grid gap-8 md:grid-cols-[240px_1fr] md:gap-14">
        <div className="flex flex-col gap-3 md:sticky md:top-24 md:self-start">
          <h2 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-foreground">
            {title}
          </h2>
          {description ? (
            <p className="max-w-[36ch] text-sm leading-relaxed text-muted">
              {description}
            </p>
          ) : null}
        </div>
        <div className="min-w-0">{children}</div>
      </div>
    </section>
  );
}
