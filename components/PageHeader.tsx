import Link from 'next/link';

export function PageHeader({
  title,
  subtitle,
  eyebrow,
  crumb,
}: {
  title: string;
  subtitle?: string;
  eyebrow?: string;
  crumb?: string;
}) {
  return (
    <div className="border-b bg-[#f7f7f8]">
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 sm:py-14">
        <nav className="mb-3 text-xs uppercase tracking-wide text-muted">
          <Link href="/" className="hover:text-ink">
            Home
          </Link>{' '}
          / <span className="text-ink">{crumb ?? title}</span>
        </nav>
        {eyebrow && (
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-accent">{eyebrow}</p>
        )}
        <h1 className="mt-1 font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mt-3 max-w-2xl text-muted">{subtitle}</p>}
      </div>
    </div>
  );
}
