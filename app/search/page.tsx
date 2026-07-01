import Link from 'next/link';
import { SearchX } from 'lucide-react';
import type { Metadata } from 'next';
import { ProductCard } from '@/components/ProductCard';
import { PRODUCTS, TYPE_LABELS, BRANDS } from '@/lib/products';

export const metadata: Metadata = { title: 'Search' };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const sp = await searchParams;
  const q = (Array.isArray(sp.q) ? sp.q[0] : sp.q ?? '').trim();
  const needle = q.toLowerCase();
  const results = q
    ? PRODUCTS.filter((p) =>
        `${p.name} ${p.brand} ${p.type} ${TYPE_LABELS[p.type]} ${p.category}`
          .toLowerCase()
          .includes(needle),
      )
    : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <p className="text-sm text-muted">Search results</p>
      <h1 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
        {q ? `“${q}”` : 'Search'}
        {q && (
          <span className="ml-2 align-middle text-base font-normal text-muted">
            {results.length} {results.length === 1 ? 'result' : 'results'}
          </span>
        )}
      </h1>

      {results.length > 0 ? (
        <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {results.map((p) => (
            <ProductCard key={p.slug} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-10 grid place-items-center rounded-2xl border border-dashed py-20 text-center">
          <SearchX className="h-12 w-12 text-line" />
          <p className="mt-3 text-lg font-semibold">No results {q && `for “${q}”`}</p>
          <p className="mt-1 text-sm text-muted">Try a brand or category:</p>
          <div className="mt-4 flex flex-wrap justify-center gap-2">
            {[...BRANDS.slice(0, 4), 'Running', 'Basketball'].map((s) => (
              <Link
                key={s}
                href={`/search?q=${encodeURIComponent(s)}`}
                className="rounded-full border px-4 py-2 text-sm font-medium hover:border-ink"
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
