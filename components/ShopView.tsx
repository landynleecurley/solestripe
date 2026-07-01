'use client';

import { useState } from 'react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SlidersHorizontal, X, Check } from 'lucide-react';
import { ProductCard } from './ProductCard';
import {
  CATEGORY_LABELS,
  TYPE_LABELS,
  type Category,
  type Product,
  type SneakerType,
} from '@/lib/products';

const SORTS: { value: string; label: string }[] = [
  { value: 'featured', label: 'Featured' },
  { value: 'newest', label: 'Newest' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'rating', label: 'Top Rated' },
];

const CATS: Category[] = ['men', 'women', 'kids'];

export function ShopView({
  products,
  brands,
  types,
}: {
  products: Product[];
  brands: string[];
  types: SneakerType[];
}) {
  const router = useRouter();
  const pathname = usePathname();
  const sp = useSearchParams();
  const [drawer, setDrawer] = useState(false);

  const setParam = (key: string, value: string | null) => {
    const p = new URLSearchParams(sp.toString());
    if (!value) p.delete(key);
    else p.set(key, value);
    router.push(`${pathname}?${p.toString()}`, { scroll: false });
  };
  const toggleMulti = (key: string, value: string) => {
    const cur = (sp.get(key) ?? '').split(',').filter(Boolean);
    const next = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
    setParam(key, next.length ? next.join(',') : null);
  };
  const inMulti = (key: string, value: string) =>
    (sp.get(key) ?? '').split(',').includes(value);

  const category = sp.get('category');
  const sale = sp.get('sale') === '1';
  const sort = sp.get('sort') ?? 'featured';
  const activeCount =
    (category ? 1 : 0) +
    (sale ? 1 : 0) +
    (sp.get('brand') ? sp.get('brand')!.split(',').filter(Boolean).length : 0) +
    (sp.get('type') ? sp.get('type')!.split(',').filter(Boolean).length : 0);

  const clearAll = () => router.push(pathname, { scroll: false });

  const Filters = () => (
    <div className="space-y-7">
      <FilterGroup title="Category">
        {CATS.map((c) => (
          <Radio
            key={c}
            label={CATEGORY_LABELS[c]}
            checked={category === c}
            onClick={() => setParam('category', category === c ? null : c)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Sport">
        {types.map((t) => (
          <CheckRow
            key={t}
            label={TYPE_LABELS[t]}
            checked={inMulti('type', t)}
            onClick={() => toggleMulti('type', t)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Brand">
        {brands.map((b) => (
          <CheckRow
            key={b}
            label={b}
            checked={inMulti('brand', b)}
            onClick={() => toggleMulti('brand', b)}
          />
        ))}
      </FilterGroup>

      <FilterGroup title="Offers">
        <CheckRow
          label="On Sale"
          checked={sale}
          onClick={() => setParam('sale', sale ? null : '1')}
        />
      </FilterGroup>
    </div>
  );

  return (
    <div className="mt-6 flex gap-8">
      <aside className="hidden w-56 shrink-0 lg:block">
        <div className="mb-4 flex items-center justify-between">
          <span className="font-display text-sm font-semibold uppercase tracking-[0.16em]">
            Filters
          </span>
          {activeCount > 0 && (
            <button onClick={clearAll} className="text-xs text-accent hover:underline">
              Clear ({activeCount})
            </button>
          )}
        </div>
        <Filters />
      </aside>

      <div className="min-w-0 flex-1">
        {/* Toolbar */}
        <div className="mb-5 flex items-center justify-between gap-3">
          <button
            onClick={() => setDrawer(true)}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold lg:hidden"
          >
            <SlidersHorizontal className="h-4 w-4" /> Filters
            {activeCount > 0 && (
              <span className="grid h-5 w-5 place-items-center rounded-full bg-accent text-[10px] text-white">
                {activeCount}
              </span>
            )}
          </button>
          <span className="hidden text-sm text-muted lg:block">
            {products.length} {products.length === 1 ? 'result' : 'results'}
          </span>
          <label className="ml-auto flex items-center gap-2 text-sm">
            <span className="hidden text-muted sm:inline">Sort</span>
            <select
              value={sort}
              onChange={(e) => setParam('sort', e.target.value)}
              className="rounded-full border bg-white px-4 py-2 text-sm font-medium outline-none focus:border-ink"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {/* Active chips */}
        {activeCount > 0 && (
          <div className="mb-5 flex flex-wrap gap-2">
            {category && (
              <Chip label={CATEGORY_LABELS[category as Category]} onClear={() => setParam('category', null)} />
            )}
            {sale && <Chip label="On Sale" onClear={() => setParam('sale', null)} />}
            {(sp.get('type') ?? '').split(',').filter(Boolean).map((t) => (
              <Chip
                key={t}
                label={TYPE_LABELS[t as SneakerType]}
                onClear={() => toggleMulti('type', t)}
              />
            ))}
            {(sp.get('brand') ?? '').split(',').filter(Boolean).map((b) => (
              <Chip key={b} label={b} onClear={() => toggleMulti('brand', b)} />
            ))}
          </div>
        )}

        {products.length === 0 ? (
          <div className="grid place-items-center rounded-2xl border border-dashed py-24 text-center">
            <p className="text-lg font-semibold">No matches</p>
            <p className="mt-1 text-sm text-muted">Try clearing a filter or two.</p>
            <button
              onClick={clearAll}
              className="mt-4 rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white"
            >
              Clear all
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>

      {/* Mobile filter drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            aria-label="Close filters"
            onClick={() => setDrawer(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="absolute inset-y-0 right-0 flex w-[85%] max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex h-16 shrink-0 items-center justify-between border-b px-5">
              <span className="font-display text-lg font-semibold uppercase">Filters</span>
              <button aria-label="Close" onClick={() => setDrawer(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              <Filters />
            </div>
            <div className="flex shrink-0 gap-3 border-t p-4">
              {activeCount > 0 && (
                <button onClick={clearAll} className="flex-1 rounded-full border py-3 text-sm font-semibold">
                  Clear all
                </button>
              )}
              <button
                onClick={() => setDrawer(false)}
                className="flex-1 rounded-full bg-accent py-3 text-sm font-bold uppercase text-white"
              >
                Show {products.length}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="mb-2.5 text-sm font-semibold uppercase tracking-wide">{title}</h3>
      <div className="space-y-1.5">{children}</div>
    </div>
  );
}

function CheckRow({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-2.5 py-0.5 text-left text-sm text-muted hover:text-ink"
    >
      <span
        className={`grid h-4.5 w-4.5 shrink-0 place-items-center rounded border ${
          checked ? 'border-ink bg-ink text-white' : 'border-line'
        }`}
        style={{ height: 18, width: 18 }}
      >
        {checked && <Check className="h-3 w-3" strokeWidth={3} />}
      </span>
      <span className={checked ? 'font-medium text-ink' : ''}>{label}</span>
    </button>
  );
}

function Radio({
  label,
  checked,
  onClick,
}: {
  label: string;
  checked: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-2.5 py-0.5 text-left text-sm text-muted hover:text-ink"
    >
      <span
        className={`grid shrink-0 place-items-center rounded-full border ${
          checked ? 'border-ink' : 'border-line'
        }`}
        style={{ height: 18, width: 18 }}
      >
        {checked && <span className="h-2.5 w-2.5 rounded-full bg-ink" />}
      </span>
      <span className={checked ? 'font-medium text-ink' : ''}>{label}</span>
    </button>
  );
}

function Chip({ label, onClear }: { label: string; onClear: () => void }) {
  return (
    <button
      onClick={onClear}
      className="inline-flex items-center gap-1.5 rounded-full bg-[#f3f3f5] px-3 py-1.5 text-xs font-medium hover:bg-line"
    >
      {label}
      <X className="h-3 w-3" />
    </button>
  );
}
