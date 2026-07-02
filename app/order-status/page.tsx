'use client';

import { useState } from 'react';
import { CheckCircle2, Package, Truck, MapPin, Home, RotateCcw } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Field } from '@/components/Field';

const STEPS = [
  { icon: CheckCircle2, label: 'Order placed', note: 'We got your order.' },
  { icon: Package, label: 'Packed', note: 'Your kicks are boxed up.' },
  { icon: Truck, label: 'Shipped', note: 'On the way to the carrier hub.' },
  { icon: MapPin, label: 'Out for delivery', note: 'Arriving today.' },
  { icon: Home, label: 'Delivered', note: 'Enjoy the heat.' },
];

function hash(s: string) {
  let h = 0;
  for (let i = 0; i < s.length; i++) h = (h << 5) - h + s.charCodeAt(i);
  return Math.abs(h);
}

export default function OrderStatusPage() {
  const [order, setOrder] = useState('');
  const [tracked, setTracked] = useState<string | null>(null);

  // Deterministic mock: derive the current step + ETA from the order number.
  const current = tracked ? (hash(tracked) % 5) : -1;
  const eta = new Date();
  eta.setDate(eta.getDate() + Math.max(0, 4 - current));

  return (
    <div>
      <PageHeader
        eyebrow="Help"
        title="Order Status"
        crumb="Order Status"
        subtitle="Enter your order number and email to see exactly where your order is."
      />
      <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
        {!tracked ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              if (order.trim()) setTracked(order.trim());
            }}
            className="space-y-4 rounded-2xl border p-6"
          >
            <Field
              label="Order number"
              value={order}
              onChange={(e) => setOrder(e.target.value)}
              placeholder="SS-123456"
              required
            />
            <Field label="Email" type="email" placeholder="you@email.com" required />
            <button className="w-full rounded-full bg-accent py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:brightness-110">
              Track order
            </button>
            <p className="text-center text-xs text-muted">
              Tip: any order number works in this demo.
            </p>
          </form>
        ) : (
          <div>
            <div className="mb-6 flex items-center justify-between rounded-2xl border p-5">
              <div>
                <p className="text-xs uppercase tracking-wide text-muted">Order</p>
                <p className="font-display text-2xl font-bold">{tracked.toUpperCase()}</p>
              </div>
              <div className="text-right">
                <p className="text-xs uppercase tracking-wide text-muted">
                  {current >= 4 ? 'Delivered' : 'Est. delivery'}
                </p>
                <p className="font-semibold">
                  {eta.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                </p>
              </div>
            </div>

            <ol className="relative ml-3 border-l-2 border-line">
              {STEPS.map((s, i) => {
                const done = i <= current;
                const active = i === current;
                return (
                  <li key={s.label} className="mb-7 ml-6 last:mb-0">
                    <span
                      className={`absolute -left-[15px] grid h-7 w-7 place-items-center rounded-full ${
                        done ? 'bg-accent text-white' : 'bg-white text-line ring-2 ring-line'
                      } ${active ? 'ring-4 ring-accent/25' : ''}`}
                    >
                      <s.icon className="h-4 w-4" />
                    </span>
                    <p className={`font-semibold ${done ? 'text-ink' : 'text-muted'}`}>{s.label}</p>
                    <p className="text-sm text-muted">{active ? s.note : done ? 'Completed' : 'Pending'}</p>
                  </li>
                );
              })}
            </ol>

            <button
              onClick={() => {
                setTracked(null);
                setOrder('');
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-full border px-5 py-2.5 text-sm font-semibold hover:border-ink"
            >
              <RotateCcw className="h-4 w-4" /> Track another order
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
