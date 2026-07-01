import Link from 'next/link';

// The SoleStripe logo — a nod to the striped-referee identity. Uses
// currentColor for the stripe mark so it reads on light and dark backgrounds.
export function Wordmark({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      aria-label="SoleStripe home"
      className={`inline-flex items-center gap-2 font-display text-2xl font-bold uppercase leading-none tracking-tight ${className}`}
    >
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden className="shrink-0">
        <g fill="currentColor">
          <path d="M3 2h4L4 20H0z" />
          <path d="M10 2h4L11 20H7z" />
        </g>
        <path d="M17 2h4l-3 18h-4z" fill="var(--accent)" />
      </svg>
      <span>
        Sole<span className="text-accent">Stripe</span>
      </span>
    </Link>
  );
}
