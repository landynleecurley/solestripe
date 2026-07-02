'use client';

import { useState } from 'react';
import { Gift, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Field, Textarea } from '@/components/Field';
import { money } from '@/lib/format';

const DESIGNS = [
  { name: 'Classic', bg: 'linear-gradient(135deg,#17171a,#3a3a44)' },
  { name: 'Crimson', bg: 'linear-gradient(135deg,#e4002b,#ff5a3c)' },
  { name: 'Court', bg: 'linear-gradient(135deg,#1d4ed8,#22d3ee)' },
  { name: 'Sunset', bg: 'linear-gradient(135deg,#7c3aed,#ec4899)' },
];
const AMOUNTS = [25, 50, 100, 150, 200];

export default function GiftCardsPage() {
  const [design, setDesign] = useState(0);
  const [amount, setAmount] = useState(50);
  const [custom, setCustom] = useState('');
  const [added, setAdded] = useState(false);

  const value = custom ? Math.max(0, Math.min(500, Number(custom) || 0)) : amount;

  return (
    <div>
      <PageHeader
        eyebrow="Company"
        title="Gift Cards"
        crumb="Gift Cards"
        subtitle="The gift that always fits. Delivered by email, redeemable online and in stores."
      />
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-2">
        {/* Preview */}
        <div className="lg:sticky lg:top-24 lg:self-start">
          <div
            className="relative flex aspect-8/5 flex-col justify-between rounded-3xl p-6 text-white shadow-xl"
            style={{ background: DESIGNS[design].bg }}
          >
            <div className="flex items-center justify-between">
              <span className="font-display text-xl font-bold uppercase tracking-tight">
                Sole<span className="text-white/70">Stripe</span>
              </span>
              <Gift className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">Gift Card</p>
              <p className="font-display text-4xl font-bold">{money(value)}</p>
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            {DESIGNS.map((d, i) => (
              <button
                key={d.name}
                onClick={() => setDesign(i)}
                aria-label={d.name}
                title={d.name}
                className={`h-9 w-9 rounded-full border-2 transition ${
                  design === i ? 'border-ink' : 'border-transparent'
                }`}
                style={{ background: d.bg }}
              />
            ))}
          </div>
        </div>

        {/* Builder */}
        <div>
          {added ? (
            <div className="rounded-2xl border border-green-600/30 bg-green-50 p-8 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
              <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-tight">
                Added to bag
              </h2>
              <p className="mt-2 text-sm text-muted">
                A {money(value)} {DESIGNS[design].name} gift card is in your bag.
              </p>
              <button
                onClick={() => setAdded(false)}
                className="mt-5 rounded-full border px-6 py-2.5 text-sm font-semibold hover:border-ink"
              >
                Build another
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (value > 0) {
                  setAdded(true);
                  window.scrollTo({ top: 0 });
                }
              }}
              className="space-y-5"
            >
              <div>
                <p className="mb-2 text-sm font-medium text-muted">Amount</p>
                <div className="flex flex-wrap gap-2">
                  {AMOUNTS.map((a) => (
                    <button
                      key={a}
                      type="button"
                      onClick={() => {
                        setAmount(a);
                        setCustom('');
                      }}
                      className={`rounded-full border px-5 py-2.5 text-sm font-semibold transition ${
                        !custom && amount === a ? 'border-ink bg-ink text-white' : 'hover:border-ink'
                      }`}
                    >
                      {money(a)}
                    </button>
                  ))}
                </div>
                <div className="mt-3">
                  <Field
                    label="Or a custom amount ($5–$500)"
                    type="number"
                    min={5}
                    max={500}
                    value={custom}
                    onChange={(e) => setCustom(e.target.value)}
                    placeholder="e.g. 75"
                  />
                </div>
              </div>

              <Field label="Recipient email" type="email" placeholder="them@email.com" required />
              <Field label="Recipient name" placeholder="Alex" required />
              <Textarea label="Message (optional)" rows={3} placeholder="Happy birthday — go get those kicks!" />

              <button
                disabled={value <= 0}
                className="w-full rounded-full bg-accent py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:brightness-110 disabled:opacity-50"
              >
                Add to Bag · {money(value)}
              </button>
              <p className="text-center text-xs text-muted">
                Digital delivery · never expires · redeemable online & in stores.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
