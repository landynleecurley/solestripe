'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag, Truck } from 'lucide-react';
import { SneakerImage } from './SneakerImage';
import { useCart } from '@/lib/cart';
import { money, shippingFor, FREE_SHIP_THRESHOLD } from '@/lib/format';

export function CartDrawer() {
  const { items, subtotal, count, remove, setQty, isOpen, close } = useCart();

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && close();
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [isOpen, close]);

  const remaining = Math.max(0, FREE_SHIP_THRESHOLD - subtotal);
  const shipPct = Math.min(100, (subtotal / FREE_SHIP_THRESHOLD) * 100);

  return (
    <div
      className={`fixed inset-0 z-50 ${isOpen ? '' : 'pointer-events-none'}`}
      aria-hidden={!isOpen}
    >
      <div
        onClick={close}
        className={`absolute inset-0 bg-black/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0'
        }`}
      />
      <aside
        role="dialog"
        aria-label="Shopping bag"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition-transform duration-300 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex h-16 shrink-0 items-center justify-between border-b px-5">
          <h2 className="flex items-center gap-2 font-display text-lg font-semibold uppercase tracking-wide">
            <ShoppingBag className="h-5 w-5" /> Your Bag ({count})
          </h2>
          <button aria-label="Close" onClick={close} className="rounded-full p-1 hover:bg-black/5">
            <X className="h-6 w-6" />
          </button>
        </div>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <ShoppingBag className="h-14 w-14 text-line" />
            <p className="text-lg font-semibold">Your bag is empty</p>
            <p className="text-sm text-muted">Add some heat and it&apos;ll show up here.</p>
            <Link
              href="/shop"
              onClick={close}
              className="mt-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-accent"
            >
              Start shopping
            </Link>
          </div>
        ) : (
          <>
            {/* Free-shipping progress */}
            <div className="border-b bg-[#f7f7f8] px-5 py-3 text-sm">
              <p className="flex items-center gap-2 text-ink">
                <Truck className="h-4 w-4" />
                {remaining > 0 ? (
                  <span>
                    You&apos;re <span className="font-semibold">{money(remaining)}</span> away from
                    free shipping
                  </span>
                ) : (
                  <span className="font-semibold text-green-600">
                    You&apos;ve unlocked free shipping!
                  </span>
                )}
              </p>
              <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-line">
                <div
                  className="h-full rounded-full bg-accent transition-all"
                  style={{ width: `${shipPct}%` }}
                />
              </div>
            </div>

            <div className="flex-1 divide-y overflow-y-auto px-5">
              {items.map((item) => {
                const cw = item.product.colorways[item.colorway] ?? item.product.colorways[0];
                return (
                  <div key={item.key} className="flex gap-3 py-4">
                    <Link
                      href={`/product/${item.product.slug}`}
                      onClick={close}
                      className="grid h-20 w-20 shrink-0 place-items-center rounded-xl border bg-[#f3f3f5]"
                    >
                      <SneakerImage colorway={cw} className="w-full" />
                    </Link>
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between gap-2">
                        <div className="min-w-0">
                          <p className="text-[11px] font-bold uppercase tracking-wide text-muted">
                            {item.product.brand}
                          </p>
                          <p className="truncate text-sm font-medium">{item.product.name}</p>
                        </div>
                        <button
                          aria-label="Remove"
                          onClick={() => remove(item.key)}
                          className="h-fit rounded p-1 text-muted hover:text-accent"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="mt-0.5 text-xs text-muted">
                        {cw.name} · Size {item.size}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center rounded-full border">
                          <button
                            aria-label="Decrease quantity"
                            onClick={() => setQty(item.key, item.qty - 1)}
                            className="grid h-7 w-7 place-items-center rounded-full hover:bg-black/5"
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-6 text-center text-sm">{item.qty}</span>
                          <button
                            aria-label="Increase quantity"
                            onClick={() => setQty(item.key, item.qty + 1)}
                            className="grid h-7 w-7 place-items-center rounded-full hover:bg-black/5"
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <span className="text-sm font-semibold">{money(item.lineTotal)}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="shrink-0 border-t px-5 py-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-sm text-muted">Subtotal</span>
                <span className="text-lg font-bold">{money(subtotal)}</span>
              </div>
              <p className="mb-3 text-xs text-muted">
                Shipping {shippingFor(subtotal) === 0 ? 'free' : money(shippingFor(subtotal))} · taxes
                calculated at checkout
              </p>
              <Link
                href="/checkout"
                onClick={close}
                className="block rounded-full bg-accent py-3.5 text-center text-sm font-bold uppercase tracking-wide text-white transition hover:brightness-110"
              >
                Checkout
              </Link>
              <Link
                href="/cart"
                onClick={close}
                className="mt-2 block rounded-full border py-3 text-center text-sm font-semibold uppercase tracking-wide hover:bg-black/5"
              >
                View bag
              </Link>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
