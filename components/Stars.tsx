export function Stars({ rating, className = '' }: { rating: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, (rating / 5) * 100));
  return (
    <span
      className={`relative inline-block leading-none select-none ${className}`}
      aria-label={`${rating.toFixed(1)} out of 5 stars`}
      title={`${rating.toFixed(1)} / 5`}
    >
      <span className="text-line">★★★★★</span>
      <span
        className="absolute inset-0 overflow-hidden text-accent"
        style={{ width: `${pct}%` }}
        aria-hidden
      >
        ★★★★★
      </span>
    </span>
  );
}
