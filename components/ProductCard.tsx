'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { SneakerImage } from './SneakerImage';
import { Stars } from './Stars';
import { money } from '@/lib/format';
import { useWishlist } from '@/lib/wishlist';
import { isOnSale, discountPct, type Badge, type Product } from '@/lib/products';

const BADGE_STYLES: Record<Badge, string> = {
  New: 'bg-ink text-white',
  Sale: 'bg-accent text-white',
  Hot: 'bg-orange-500 text-white',
  Exclusive: 'bg-white text-ink border border-ink',
};

export function ProductCard({ product }: { product: Product }) {
  const [cw, setCw] = useState(0);
  const { has, toggle } = useWishlist();
  const sale = isOnSale(product);
  const saved = has(product.slug);
  const colorway = product.colorways[cw] ?? product.colorways[0];

  return (
    <div className="group relative flex flex-col">
      <button
        type="button"
        onClick={() => toggle(product.slug)}
        aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
        aria-pressed={saved}
        className="absolute right-3 top-3 z-20 grid h-8 w-8 place-items-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:bg-white"
      >
        <Heart className={`h-4 w-4 ${saved ? 'fill-accent text-accent' : 'text-ink'}`} />
      </button>
      <Link href={`/product/${product.slug}`} className="block">
        <div className="relative overflow-hidden rounded-2xl border bg-[#f3f3f5]">
          <div className="absolute left-3 top-3 z-10 flex flex-col gap-1">
            {product.badge && (
              <span
                className={`rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${BADGE_STYLES[product.badge]}`}
              >
                {product.badge === 'Sale' ? `${discountPct(product)}% Off` : product.badge}
              </span>
            )}
          </div>
          <div className="grid aspect-square place-items-center p-5">
            <SneakerImage
              colorway={colorway}
              className="w-full drop-shadow-[0_18px_20px_rgba(0,0,0,0.14)] transition-transform duration-300 group-hover:-rotate-2 group-hover:scale-[1.05]"
            />
          </div>
        </div>
      </Link>

      {product.colorways.length > 1 && (
        <div className="mt-3 flex items-center gap-1.5">
          {product.colorways.map((c, i) => (
            <button
              key={i}
              type="button"
              onMouseEnter={() => setCw(i)}
              onFocus={() => setCw(i)}
              onClick={() => setCw(i)}
              aria-label={c.name}
              className={`h-5 w-5 rounded-full border border-black/10 transition ${
                i === cw ? 'ring-2 ring-ink ring-offset-1' : ''
              }`}
              style={{ background: c.upper }}
            />
          ))}
        </div>
      )}

      <div className="mt-2.5">
        <div className="flex items-center gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wide text-ink">
            {product.brand}
          </span>
          <Stars rating={product.rating} className="text-xs" />
          <span className="text-[11px] text-muted">({product.reviews})</span>
        </div>
        <Link href={`/product/${product.slug}`}>
          <h3 className="mt-0.5 line-clamp-1 text-sm font-medium text-ink">{product.name}</h3>
        </Link>
        <div className="mt-1 flex items-center gap-2">
          <span className={`text-sm font-semibold ${sale ? 'text-accent' : 'text-ink'}`}>
            {money(product.price)}
          </span>
          {sale && product.compareAt && (
            <span className="text-xs text-muted line-through">{money(product.compareAt)}</span>
          )}
        </div>
      </div>
    </div>
  );
}
