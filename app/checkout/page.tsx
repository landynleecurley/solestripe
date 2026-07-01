'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Lock, CheckCircle2, ShoppingBag } from 'lucide-react';
import { useCart } from '@/lib/cart';
import { SneakerImage } from '@/components/SneakerImage';
import { money, shippingFor, taxFor } from '@/lib/format';

const SHIP_METHODS = [
  { id: 'standard', label: 'Standard', eta: '4–6 business days', price: 0 },
  { id: 'express', label: 'Express', eta: '2 business days', price: 12 },
  { id: 'overnight', label: 'Overnight', eta: 'Next business day', price: 25 },
];

export default function CheckoutPage() {
  const { items, subtotal, count, clear } = useCart();
  const [ship, setShip] = useState('standard');
  const [placed, setPlaced] = useState<string | null>(null);

  const shipMethod = SHIP_METHODS.find((m) => m.id === ship)!;
  const baseShip = shippingFor(subtotal);
  const shipCost = ship === 'standard' ? baseShip : shipMethod.price;
  const tax = taxFor(subtotal);
  const total = subtotal + shipCost + tax;

  const placeOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const orderNo = `SS-${Math.floor(100000 + Math.random() * 899999)}`;
    setPlaced(orderNo);
    clear();
    window.scrollTo({ top: 0 });
  };

  if (placed) {
    return (
      <div className="mx-auto grid max-w-lg place-items-center px-4 py-20 text-center">
        <CheckCircle2 className="h-16 w-16 text-green-600" />
        <h1 className="mt-4 font-display text-4xl font-bold uppercase tracking-tight">
          Order Confirmed
        </h1>
        <p className="mt-2 text-muted">
          Thanks for the order! A confirmation is on its way to your inbox.
        </p>
        <div className="mt-6 w-full rounded-2xl border p-5 text-left text-sm">
          <div className="flex justify-between">
            <span className="text-muted">Order number</span>
            <span className="font-semibold">{placed}</span>
          </div>
          <div className="mt-2 flex justify-between">
            <span className="text-muted">Estimated delivery</span>
            <span className="font-semibold">{shipMethod.eta}</span>
          </div>
        </div>
        <Link
          href="/shop"
          className="mt-8 rounded-full bg-ink px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white hover:bg-accent"
        >
          Keep shopping
        </Link>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mx-auto grid max-w-md place-items-center px-4 py-24 text-center">
        <ShoppingBag className="h-16 w-16 text-line" />
        <h1 className="mt-4 font-display text-3xl font-bold uppercase">Nothing to check out</h1>
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
      <h1 className="font-display text-4xl font-bold uppercase tracking-tight">Checkout</h1>
      <form onSubmit={placeOrder} className="mt-8 grid gap-10 lg:grid-cols-5">
        {/* Forms */}
        <div className="space-y-8 lg:col-span-3">
          <Section title="Contact">
            <Field label="Email" type="email" placeholder="you@email.com" full />
          </Section>

          <Section title="Shipping address">
            <Field label="First name" placeholder="Jordan" />
            <Field label="Last name" placeholder="Rivera" />
            <Field label="Address" placeholder="123 Main St" full />
            <Field label="Apt / Suite (optional)" placeholder="4B" full required={false} />
            <Field label="City" placeholder="Brooklyn" />
            <div className="grid grid-cols-2 gap-4">
              <Field label="State" placeholder="NY" />
              <Field label="ZIP" placeholder="11201" />
            </div>
          </Section>

          <Section title="Shipping method">
            <div className="col-span-full space-y-2">
              {SHIP_METHODS.map((m) => {
                const price = m.id === 'standard' ? baseShip : m.price;
                return (
                  <label
                    key={m.id}
                    className={`flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 ${
                      ship === m.id ? 'border-ink ring-1 ring-ink' : ''
                    }`}
                  >
                    <span className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="ship"
                        checked={ship === m.id}
                        onChange={() => setShip(m.id)}
                        className="accent-[color:var(--accent)]"
                      />
                      <span>
                        <span className="block text-sm font-semibold">{m.label}</span>
                        <span className="block text-xs text-muted">{m.eta}</span>
                      </span>
                    </span>
                    <span className="text-sm font-semibold">
                      {price === 0 ? 'Free' : money(price)}
                    </span>
                  </label>
                );
              })}
            </div>
          </Section>

          <Section title="Payment">
            <p className="col-span-full -mt-1 mb-1 flex items-center gap-1.5 text-xs text-muted">
              <Lock className="h-3.5 w-3.5" /> Demo checkout — no real card is charged.
            </p>
            <Field label="Card number" placeholder="4242 4242 4242 4242" full />
            <Field label="Expiry" placeholder="MM / YY" />
            <Field label="CVC" placeholder="123" />
            <Field label="Name on card" placeholder="Jordan Rivera" full />
          </Section>
        </div>

        {/* Summary */}
        <aside className="lg:col-span-2">
          <div className="lg:sticky lg:top-24 rounded-2xl border p-6">
            <h2 className="font-display text-lg font-semibold uppercase tracking-wide">
              Order ({count})
            </h2>
            <div className="mt-4 max-h-72 space-y-3 overflow-y-auto">
              {items.map((item) => {
                const cw = item.product.colorways[item.colorway] ?? item.product.colorways[0];
                return (
                  <div key={item.key} className="flex items-center gap-3">
                    <div className="relative grid h-16 w-16 shrink-0 place-items-center rounded-xl border bg-[#f3f3f5]">
                      <SneakerImage colorway={cw} className="w-full" />
                      <span className="absolute -right-1.5 -top-1.5 grid h-5 w-5 place-items-center rounded-full bg-ink text-[10px] font-bold text-white">
                        {item.qty}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{item.product.name}</p>
                      <p className="text-xs text-muted">Size {item.size}</p>
                    </div>
                    <span className="text-sm font-semibold">{money(item.lineTotal)}</span>
                  </div>
                );
              })}
            </div>
            <dl className="mt-5 space-y-2 border-t pt-4 text-sm">
              <SumRow label="Subtotal" value={money(subtotal)} />
              <SumRow label="Shipping" value={shipCost === 0 ? 'Free' : money(shipCost)} />
              <SumRow label="Tax" value={money(tax)} />
            </dl>
            <div className="mt-3 flex items-center justify-between border-t pt-3">
              <span className="font-semibold">Total</span>
              <span className="text-2xl font-bold">{money(total)}</span>
            </div>
            <button
              type="submit"
              className="mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 text-sm font-bold uppercase tracking-wide text-white hover:brightness-110"
            >
              <Lock className="h-4 w-4" /> Place Order · {money(total)}
            </button>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="mb-3 font-display text-lg font-semibold uppercase tracking-wide">{title}</h2>
      <div className="grid grid-cols-2 gap-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  placeholder,
  type = 'text',
  full,
  required = true,
}: {
  label: string;
  placeholder?: string;
  type?: string;
  full?: boolean;
  required?: boolean;
}) {
  return (
    <label className={`block text-sm ${full ? 'col-span-2' : ''}`}>
      <span className="mb-1 block font-medium text-muted">{label}</span>
      <input
        type={type}
        placeholder={placeholder}
        required={required}
        className="w-full rounded-xl border px-4 py-3 outline-none focus:border-ink"
      />
    </label>
  );
}

function SumRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between">
      <dt className="text-muted">{label}</dt>
      <dd className="font-medium">{value}</dd>
    </div>
  );
}
