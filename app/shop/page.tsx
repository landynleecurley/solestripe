import Link from 'next/link';
import type { Metadata } from 'next';
import { ShopView } from '@/components/ShopView';
import {
  PRODUCTS,
  BRANDS,
  TYPES,
  CATEGORY_LABELS,
  TYPE_LABELS,
  isOnSale,
  type Category,
  type Product,
} from '@/lib/products';

export const metadata: Metadata = { title: 'Shop All Sneakers' };

type SP = Record<string, string | string[] | undefined>;
const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const category = one(sp.category) as Category | undefined;
  const brands = (one(sp.brand) ?? '').split(',').filter(Boolean);
  const types = (one(sp.type) ?? '').split(',').filter(Boolean);
  const sale = one(sp.sale) === '1';
  const sort = one(sp.sort) ?? 'featured';

  let list: Product[] = PRODUCTS.filter(
    (p) =>
      (!category ||
        p.category === category ||
        (p.category === 'unisex' && (category === 'men' || category === 'women'))) &&
      (types.length === 0 || types.includes(p.type)) &&
      (brands.length === 0 || brands.includes(p.brand)) &&
      (!sale || isOnSale(p)),
  );

  list = [...list];
  switch (sort) {
    case 'price-asc':
      list.sort((a, b) => a.price - b.price);
      break;
    case 'price-desc':
      list.sort((a, b) => b.price - a.price);
      break;
    case 'rating':
      list.sort((a, b) => b.rating - a.rating);
      break;
    case 'newest':
      list.sort((a, b) => (b.badge === 'New' ? 1 : 0) - (a.badge === 'New' ? 1 : 0));
      break;
    default:
      list.sort(
        (a, b) => (b.badge === 'Hot' ? 1 : 0) - (a.badge === 'Hot' ? 1 : 0) + b.rating - a.rating,
      );
  }

  const heading = sale
    ? 'Sale'
    : category
      ? `${CATEGORY_LABELS[category]} Sneakers`
      : types.length === 1
        ? TYPE_LABELS[types[0] as keyof typeof TYPE_LABELS]
        : 'All Sneakers';

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="mb-3 text-xs uppercase tracking-wide text-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>{' '}
        / <span className="text-ink">{heading}</span>
      </nav>
      <h1 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
        {heading}
      </h1>

      <ShopView products={list} brands={BRANDS} types={[...TYPES]} />
    </div>
  );
}
