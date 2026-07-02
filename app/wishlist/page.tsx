'use client';

import Link from 'next/link';
import { Heart } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { ProductCard } from '@/components/ProductCard';
import { useWishlist } from '@/lib/wishlist';
import { getProduct, type Product } from '@/lib/products';

export default function WishlistPage() {
  const { slugs, clear, count } = useWishlist();
  const items = slugs.map(getProduct).filter((p): p is Product => !!p);

  return (
    <div>
      <PageHeader
        eyebrow="My Stuff"
        title="Wishlist"
        crumb="Wishlist"
        subtitle="Your saved heat, all in one place. Tap the heart on any product to save it here."
      />
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        {items.length === 0 ? (
          <div className="grid place-items-center rounded-2xl border border-dashed py-24 text-center">
            <Heart className="h-14 w-14 text-line" />
            <p className="mt-4 text-lg font-semibold">Nothing saved yet</p>
            <p className="mt-1 text-sm text-muted">
              Tap the <Heart className="inline h-4 w-4 align-[-2px]" /> on any product to stash it here.
            </p>
            <Link
              href="/shop"
              className="mt-6 rounded-full bg-ink px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-accent"
            >
              Find something
            </Link>
          </div>
        ) : (
          <>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-muted">
                {count} {count === 1 ? 'item' : 'items'} saved
              </p>
              <button onClick={clear} className="text-sm text-muted hover:text-accent">
                Clear all
              </button>
            </div>
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
              {items.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
