import Link from 'next/link';
import { Bell, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';
import { SneakerImage } from '@/components/SneakerImage';
import { money } from '@/lib/format';
import { PRODUCTS, type Product } from '@/lib/products';

export const metadata: Metadata = {
  title: 'Release Calendar',
  description: 'Upcoming sneaker drops and the latest releases at SoleStripe.',
};

type Drop = { p: Product; date: Date; available: boolean };

export default function ReleasesPage() {
  const featured = PRODUCTS.filter(
    (p) => p.badge === 'New' || p.badge === 'Hot' || p.badge === 'Exclusive',
  );
  const now = new Date();

  const drops: Drop[] = featured
    .map((p, i) => {
      const d = new Date(now);
      d.setDate(now.getDate() + (i - 5) * 3); // spread ~2 weeks back to ~4 weeks out
      d.setHours(10, 0, 0, 0);
      return { p, date: d, available: d.getTime() <= now.getTime() };
    })
    .sort((a, b) => a.date.getTime() - b.date.getTime());

  const available = drops.filter((d) => d.available).reverse();
  const upcoming = drops.filter((d) => !d.available);

  return (
    <div>
      {/* Header */}
      <section className="border-b bg-ink text-white">
        <div className="stripes absolute inset-x-0 h-1.5 opacity-90" />
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/50">
            SoleStripe
          </p>
          <h1 className="mt-2 font-display text-5xl font-bold uppercase leading-none tracking-tight sm:text-7xl">
            Release Calendar
          </h1>
          <p className="mt-4 max-w-xl text-white/70">
            The heat that&apos;s here and the heat that&apos;s coming. Set a reminder so you never
            miss a drop.
          </p>
        </div>
      </section>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {upcoming.length > 0 && (
          <DropSection title="Coming Soon" drops={upcoming} />
        )}
        {available.length > 0 && (
          <div className="mt-14">
            <DropSection title="Available Now" drops={available} />
          </div>
        )}
      </div>
    </div>
  );
}

function DropSection({ title, drops }: { title: string; drops: Drop[] }) {
  return (
    <section>
      <h2 className="mb-2 font-display text-2xl font-bold uppercase tracking-tight">{title}</h2>
      <div>
        {drops.map(({ p, date, available }) => (
          <div key={p.slug} className="flex items-center gap-4 border-t py-5 sm:gap-6">
            <div className="w-16 shrink-0 text-center sm:w-20">
              <div className="font-display text-3xl font-bold leading-none sm:text-4xl">
                {date.getDate()}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wide text-muted">
                {date.toLocaleDateString('en-US', { month: 'short' })}
              </div>
            </div>

            <Link
              href={`/product/${p.slug}`}
              className="grid h-20 w-24 shrink-0 place-items-center rounded-2xl border bg-[#f3f3f5] sm:h-24 sm:w-32"
            >
              <SneakerImage colorway={p.colorways[0]} className="w-[88%]" />
            </Link>

            <div className="min-w-0 flex-1">
              <p className="text-[11px] font-bold uppercase tracking-wide text-muted">{p.brand}</p>
              <Link href={`/product/${p.slug}`} className="font-semibold hover:text-accent">
                {p.name}
              </Link>
              <p className="mt-0.5 text-sm text-muted">{money(p.price)}</p>
            </div>

            {available ? (
              <Link
                href={`/product/${p.slug}`}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-ink px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-accent"
              >
                Shop <ArrowRight className="h-4 w-4" />
              </Link>
            ) : (
              <button className="inline-flex shrink-0 items-center gap-1.5 rounded-full border px-5 py-2.5 text-sm font-bold uppercase tracking-wide hover:border-ink">
                <Bell className="h-4 w-4" /> <span className="hidden sm:inline">Notify me</span>
              </button>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
