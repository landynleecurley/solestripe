'use client';

import { useState } from 'react';
import { Heart, Truck, RotateCcw, ShieldCheck, Minus, Plus, Check } from 'lucide-react';
import { SneakerImage } from './SneakerImage';
import { Stars } from './Stars';
import { useCart } from '@/lib/cart';
import { useWishlist } from '@/lib/wishlist';
import { money } from '@/lib/format';
import {
  isOnSale,
  discountPct,
  TYPE_LABELS,
  CATEGORY_LABELS,
  type Product,
} from '@/lib/products';

export function ProductDetail({ product }: { product: Product }) {
  const { add } = useCart();
  const { has, toggle } = useWishlist();
  const saved = has(product.slug);
  const [cw, setCw] = useState(0);
  const [size, setSize] = useState<number | null>(null);
  const [qty, setQty] = useState(1);
  const [err, setErr] = useState(false);

  const colorway = product.colorways[cw];
  const sale = isOnSale(product);
  const soldOut = new Set(product.soldOut ?? []);

  const addToBag = () => {
    if (size === null) {
      setErr(true);
      return;
    }
    add({ slug: product.slug, colorway: cw, size, qty });
  };

  return (
    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      {/* Gallery */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="relative grid aspect-square place-items-center overflow-hidden rounded-3xl border bg-[#f3f3f5]">
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1 text-[11px] font-bold uppercase tracking-wide text-white">
              {product.badge}
            </span>
          )}
          <SneakerImage
            colorway={colorway}
            className="w-[86%] drop-shadow-[0_28px_28px_rgba(0,0,0,0.16)]"
          />
        </div>
        {product.colorways.length > 1 && (
          <div className="mt-3 flex gap-3">
            {product.colorways.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCw(i)}
                aria-label={c.name}
                className={`grid h-20 w-20 place-items-center rounded-xl border bg-[#f3f3f5] transition ${
                  i === cw ? 'ring-2 ring-ink' : 'hover:border-ink'
                }`}
              >
                <SneakerImage colorway={c} className="w-full" />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Info */}
      <div>
        <p className="text-sm font-bold uppercase tracking-wide text-muted">{product.brand}</p>
        <h1 className="mt-1 font-display text-3xl font-bold uppercase leading-none tracking-tight sm:text-4xl">
          {product.name}
        </h1>
        <p className="mt-1 text-sm text-muted">
          {CATEGORY_LABELS[product.category]} · {TYPE_LABELS[product.type]}
        </p>

        <div className="mt-3 flex items-center gap-2">
          <Stars rating={product.rating} />
          <span className="text-sm text-muted">
            {product.rating.toFixed(1)} · {product.reviews} reviews
          </span>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <span className={`text-2xl font-bold ${sale ? 'text-accent' : 'text-ink'}`}>
            {money(product.price)}
          </span>
          {sale && product.compareAt && (
            <>
              <span className="text-lg text-muted line-through">{money(product.compareAt)}</span>
              <span className="rounded-full bg-accent/10 px-2.5 py-1 text-xs font-bold text-accent">
                {discountPct(product)}% OFF
              </span>
            </>
          )}
        </div>

        {/* Color */}
        <div className="mt-6">
          <p className="text-sm font-semibold">
            Color: <span className="font-normal text-muted">{colorway.name}</span>
          </p>
          <div className="mt-2 flex gap-2">
            {product.colorways.map((c, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setCw(i)}
                aria-label={c.name}
                className={`h-8 w-8 rounded-full border border-black/10 transition ${
                  i === cw ? 'ring-2 ring-ink ring-offset-2' : ''
                }`}
                style={{ background: c.upper }}
              />
            ))}
          </div>
        </div>

        {/* Size */}
        <div className="mt-6">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Select Size (US)</p>
            <button className="text-xs text-muted underline hover:text-ink">Size guide</button>
          </div>
          <div className="mt-2 grid grid-cols-4 gap-2 sm:grid-cols-6">
            {product.sizes.map((s) => {
              const out = soldOut.has(s);
              return (
                <button
                  key={s}
                  type="button"
                  disabled={out}
                  onClick={() => {
                    setSize(s);
                    setErr(false);
                  }}
                  className={`rounded-lg border py-2.5 text-sm font-medium transition ${
                    size === s
                      ? 'border-ink bg-ink text-white'
                      : out
                        ? 'cursor-not-allowed text-line line-through'
                        : 'hover:border-ink'
                  }`}
                >
                  {s}
                </button>
              );
            })}
          </div>
          {err && <p className="mt-2 text-sm font-medium text-accent">Please select a size.</p>}
        </div>

        {/* Add to bag */}
        <div className="mt-6 flex gap-3">
          <div className="flex items-center rounded-full border">
            <button
              type="button"
              aria-label="Decrease quantity"
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="grid h-12 w-12 place-items-center rounded-full hover:bg-black/5"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-8 text-center font-medium">{qty}</span>
            <button
              type="button"
              aria-label="Increase quantity"
              onClick={() => setQty((q) => q + 1)}
              className="grid h-12 w-12 place-items-center rounded-full hover:bg-black/5"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
          <button
            type="button"
            onClick={addToBag}
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:brightness-110"
          >
            Add to Bag · {money(product.price * qty)}
          </button>
          <button
            type="button"
            onClick={() => toggle(product.slug)}
            aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
            aria-pressed={saved}
            className={`grid h-12 w-12 shrink-0 place-items-center rounded-full border transition hover:border-ink ${
              saved ? 'border-accent' : ''
            }`}
          >
            <Heart className={`h-5 w-5 ${saved ? 'fill-accent text-accent' : ''}`} />
          </button>
        </div>

        {/* Perks */}
        <div className="mt-6 grid grid-cols-3 gap-3 rounded-2xl border p-4 text-center text-xs">
          <span className="flex flex-col items-center gap-1.5">
            <Truck className="h-5 w-5" /> Free ship $75+
          </span>
          <span className="flex flex-col items-center gap-1.5 border-x">
            <RotateCcw className="h-5 w-5" /> 60-day returns
          </span>
          <span className="flex flex-col items-center gap-1.5">
            <ShieldCheck className="h-5 w-5" /> 100% authentic
          </span>
        </div>

        {/* Description */}
        <div className="mt-8 border-t pt-6">
          <h2 className="font-display text-lg font-semibold uppercase tracking-wide">
            The Details
          </h2>
          <p className="mt-2 leading-relaxed text-muted">{product.description}</p>
          <ul className="mt-4 space-y-2 text-sm">
            {[
              `Style: ${product.brand.toUpperCase()}-${product.slug.slice(-4).toUpperCase()}`,
              `${TYPE_LABELS[product.type]} silhouette, ${CATEGORY_LABELS[product.category]} fit`,
              'Cushioned footbed with a padded collar',
              'Durable rubber outsole',
            ].map((d) => (
              <li key={d} className="flex items-start gap-2 text-muted">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-ink" /> {d}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
