'use client';

import Link from 'next/link';
import { useState } from 'react';
import { SneakerImage } from './SneakerImage';
import { Stars } from './Stars';
import { money } from '@/lib/format';
import { isOnSale, discountPct, type Badge, type Product } from '@/lib/products';

const BADGE_STYLES: Record<Badge, string> = {
  New: 'bg-ink text-white',
  Sale: 'bg-accent text-white',
  Hot: 'bg-orange-500 text-white',
  Exclusive: 'bg-white text-ink border border-ink',
};

export function ProductCard({ product }: { product: Product }) {
  const [cw, setCw] = useState(0);
  const sale = isOnSale(product);
  const colorway = product.colorways[cw] ?? product.colorways[0];

  return (
    <div className="group flex flex-col">
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
