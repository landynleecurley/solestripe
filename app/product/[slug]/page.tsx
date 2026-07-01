import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { ProductDetail } from '@/components/ProductDetail';
import { ProductCard } from '@/components/ProductCard';
import { getProduct, related, PRODUCTS, CATEGORY_LABELS } from '@/lib/products';

export function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const p = getProduct(slug);
  return p
    ? { title: `${p.name} — ${p.brand}`, description: p.description }
    : { title: 'Product' };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const you = related(product, 4);

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
      <nav className="mb-6 text-xs uppercase tracking-wide text-muted">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>{' '}
        /{' '}
        <Link href={`/shop?category=${product.category}`} className="hover:text-ink">
          {CATEGORY_LABELS[product.category]}
        </Link>{' '}
        / <span className="text-ink">{product.name}</span>
      </nav>

      <ProductDetail product={product} />

      {you.length > 0 && (
        <section className="mt-16">
          <h2 className="mb-6 font-display text-3xl font-bold uppercase tracking-tight">
            You May Also Like
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4">
            {you.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
