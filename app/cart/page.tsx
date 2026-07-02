'use client';

import Link from 'next/link';
import { Minus, Plus, X, ShoppingBag, Lock, Truck } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { SneakerImage } from '@/components/SneakerImage';
import { PaymentMethods } from '@/components/PaymentMethods';
import { money, shippingFor, taxFor, FREE_SHIP_THRESHOLD } from '@/lib/format';

export default function CartPage() {
  const { items, subtotal, count, remove, setQty } = useCart();
  const shipping = shippingFor(subtotal);
  const tax = taxFor(subtotal);
  const total = subtotal + shipping + tax;
  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);

  if (items.length === 0) {
    return (
      <div className="mx-auto grid max-w-md place-items-center px-4 py-24 text-center">
        <ShoppingBag className="h-16 w-16 text-line" />
        <h1 className="mt-4 font-display text-3xl font-bold uppercase">Your bag is empty</h1>
        <p className="mt-2 text-muted">Once you add something, it&apos;ll live here.</p>
        <Link
          href="/shop"
          className="mt-6 rounded-full bg-ink px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-accent"
        >
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <h1 className="font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
        Your Bag <span className="text-muted">({count})</span>
      </h1>

      <div className="mt-8 grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {remaining > 0 && (
            <p className="mb-4 flex items-center gap-2 rounded-xl bg-[#f7f7f8] px-4 py-3 text-sm">
              <Truck className="h-4 w-4" /> You&apos;re{' '}
              <span className="font-semibold">{money(remaining)}</span> away from free shipping.
            </p>
          )}
          <div className="divide-y border-t">
            {items.map((item) => {
              const cw = item.product.colorways[item.colorway] ?? item.product.colorways[0];
              return (
                <div key={item.key} className="flex gap-4 py-5">
                  <Link
                    href={`/product/${item.product.slug}`}
                    className="grid h-28 w-28 shrink-0 place-items-center rounded-2xl border bg-[#f3f3f5]"
                  >
                    <SneakerImage colorway={cw} className="w-full" />
                  </Link>
                  <div className="min-w-0 flex-1">
                    <div className="flex justify-between gap-3">
                      <div>
                        <p className="text-[11px] font-bold uppercase tracking-wide text-muted">
                          {item.product.brand}
                        </p>
                        <Link
                          href={`/product/${item.product.slug}`}
                          className="font-medium hover:text-accent"
                        >
                          {item.product.name}
                        </Link>
                        <p className="mt-0.5 text-sm text-muted">
                          {cw.name} · Size {item.size}
                        </p>
                      </div>
                      <button
                        aria-label="Remove"
                        onClick={() => remove(item.key)}
                        className="h-fit rounded p-1 text-muted hover:text-accent"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>
                    <div className="mt-3 flex items-center justify-between">
                      <div className="flex items-center rounded-full border">
                        <button
                          aria-label="Decrease"
                          onClick={() => setQty(item.key, item.qty - 1)}
                          className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.qty}</span>
                        <button
                          aria-label="Increase"
                          onClick={() => setQty(item.key, item.qty + 1)}
                          className="grid h-9 w-9 place-items-center rounded-full hover:bg-black/5"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="font-semibold">{money(item.lineTotal)}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <Link
            href="/shop"
            className="mt-6 inline-block text-sm font-semibold uppercase tracking-wide text-muted hover:text-ink"
          >
            ← Continue shopping
          </Link>
        </div>

        {/* Summary */}
        <aside className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-2xl border p-6">
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide">
              Order Summary
            </h2>
            <dl className="mt-4 space-y-2.5 text-sm">
              <Row label="Subtotal" value={money(subtotal)} />
              <Row label="Shipping" value={shipping === 0 ? 'Free' : money(shipping)} />
              <Row label="Estimated tax" value={money(tax)} />
            </dl>
            <div className="mt-4 flex items-center justify-between border-t pt-4">
              <span className="font-semibold">Total</span>
              <span className="text-2xl font-bold">{money(total)}</span>
            </div>
            <Link
              href="/checkout"
              className="mt-5 flex items-center justify-center gap-2 rounded-full bg-accent py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:brightness-110"
            >
              <Lock className="h-4 w-4" /> Secure Checkout
            </Link>
            <PaymentMethods className="mt-4 justify-center" />
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
