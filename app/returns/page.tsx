'use client';

import { useState } from 'react';
import { CheckCircle2, RotateCcw, Wallet, CalendarClock } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Field, SelectField, Textarea } from '@/components/Field';

const REASONS = ['Too big', 'Too small', 'Not as pictured', 'Changed my mind', 'Arrived damaged', 'Other'];

export default function ReturnsPage() {
  const [rma, setRma] = useState<string | null>(null);
  const [order, setOrder] = useState('');

  const start = (e: React.FormEvent) => {
    e.preventDefault();
    if (!order.trim()) return;
    const n = `RMA-${Math.floor(100000 + Math.abs([...order].reduce((a, c) => a + c.charCodeAt(0), 0) * 7919) % 899999)}`;
    setRma(n);
    window.scrollTo({ top: 0 });
  };

  return (
    <div>
      <PageHeader
        eyebrow="Help"
        title="Returns & Exchanges"
        crumb="Returns"
        subtitle="Changed your mind? No stress. Free 60-day returns on unworn kicks in the original box."
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {/* Policy highlights */}
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { icon: CalendarClock, t: '60-day window', d: 'Return within 60 days of delivery.' },
            { icon: Wallet, t: 'Free returns', d: 'We cover the return shipping label.' },
            { icon: RotateCcw, t: 'Easy exchanges', d: 'Swap sizes or colors in a couple clicks.' },
          ].map((p) => (
            <div key={p.t} className="rounded-2xl border p-5">
              <p.icon className="h-6 w-6 text-accent" />
              <p className="mt-3 text-sm font-semibold">{p.t}</p>
              <p className="mt-1 text-sm text-muted">{p.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 grid gap-10 lg:grid-cols-2">
          {/* Start a return */}
          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight">Start a return</h2>
            {rma ? (
              <div className="mt-4 rounded-2xl border border-green-600/30 bg-green-50 p-6">
                <CheckCircle2 className="h-10 w-10 text-green-600" />
                <h3 className="mt-3 text-lg font-semibold">Return started</h3>
                <p className="mt-1 text-sm text-muted">
                  Your return authorization is <span className="font-semibold text-ink">{rma}</span>.
                  We’ve emailed a prepaid label — drop it at any carrier location within 60 days.
                </p>
                <button
                  onClick={() => {
                    setRma(null);
                    setOrder('');
                  }}
                  className="mt-4 rounded-full border px-5 py-2.5 text-sm font-semibold hover:border-ink"
                >
                  Start another
                </button>
              </div>
            ) : (
              <form onSubmit={start} className="mt-4 space-y-4">
                <Field
                  label="Order number"
                  value={order}
                  onChange={(e) => setOrder(e.target.value)}
                  placeholder="SS-123456"
                  required
                />
                <Field label="Email" type="email" placeholder="you@email.com" required />
                <SelectField label="Reason" defaultValue="">
                  <option value="" disabled>
                    Select a reason…
                  </option>
                  {REASONS.map((r) => (
                    <option key={r}>{r}</option>
                  ))}
                </SelectField>
                <Textarea label="Anything else? (optional)" rows={3} placeholder="Tell us more…" />
                <button className="w-full rounded-full bg-accent py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:brightness-110">
                  Get my return label
                </button>
              </form>
            )}
          </div>

          {/* How it works */}
          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight">How it works</h2>
            <ol className="mt-4 space-y-4">
              {[
                'Start your return above with your order number.',
                'Print the prepaid label we email you (or show the QR code).',
                'Drop the boxed shoes at any carrier location.',
                'Refunds land in 3–5 business days after we receive them.',
              ].map((s, i) => (
                <li key={s} className="flex gap-3">
                  <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-sm font-bold text-white">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-sm text-muted">{s}</span>
                </li>
              ))}
            </ol>
            <p className="mt-6 rounded-xl bg-[#f7f7f8] p-4 text-xs text-muted">
              Items must be unworn, in the original box, with tags attached. Final-sale items and gift
              cards can’t be returned.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
