export function Swatch({
  name,
  variable,
  value,
  usage,
}: {
  name: string;
  variable: string;
  value: string;
  usage: string;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div
        className="h-24 w-full border border-line/60"
        style={{ background: `var(${variable})` }}
      />
      <div className="flex flex-col gap-1">
        <p className="font-mono text-[11px] font-medium uppercase tracking-[0.18em]">
          {name}
        </p>
        <p className="font-mono text-xs text-muted">{variable}</p>
        <p className="font-mono text-xs text-muted">{value}</p>
        <p className="mt-1 max-w-[32ch] text-xs leading-relaxed text-muted">
          {usage}
        </p>
      </div>
    </div>
  );
}
