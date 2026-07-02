import type { Metadata } from 'next';
import { Truck, Zap, Clock, Globe, PackageCheck } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Shipping',
  description: 'Shipping options, delivery times, and order tracking at SoleStripe.',
};

const OPTIONS = [
  { icon: Truck, name: 'Standard', time: '4–6 business days', cost: 'Free over $75, else $7' },
  { icon: Zap, name: 'Express', time: '2 business days', cost: '$12' },
  { icon: Clock, name: 'Overnight', time: 'Next business day', cost: '$25' },
];

const FAQ = [
  {
    q: 'When will my order ship?',
    a: 'Orders placed before 1pm ET on a business day are packed and shipped the same day. Everything else ships the next business day.',
  },
  {
    q: 'How do I track my order?',
    a: 'You’ll get a tracking link by email the moment your order ships. You can also check the Order Status page anytime.',
  },
  {
    q: 'Do you ship internationally?',
    a: 'We currently ship across the US, with select international destinations at checkout. Duties and taxes are calculated at checkout where applicable.',
  },
  {
    q: 'My package says delivered but it’s not here.',
    a: 'Give it 24 hours — carriers sometimes scan early. If it still hasn’t shown up, contact us and we’ll make it right.',
  },
];

export default function ShippingPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Help"
        title="Shipping"
        crumb="Shipping"
        subtitle="Fast, tracked delivery on every order. Free standard shipping when you spend $75 or more."
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {/* Options */}
        <div className="grid gap-4 sm:grid-cols-3">
          {OPTIONS.map((o) => (
            <div key={o.name} className="rounded-2xl border p-5">
              <o.icon className="h-6 w-6 text-accent" />
              <h3 className="mt-3 font-display text-lg font-semibold uppercase tracking-wide">
                {o.name}
              </h3>
              <p className="mt-1 text-sm text-muted">{o.time}</p>
              <p className="mt-3 text-sm font-semibold">{o.cost}</p>
            </div>
          ))}
        </div>

        {/* Perks */}
        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[
            { icon: PackageCheck, t: 'Same-day dispatch', d: 'Order by 1pm ET on weekdays.' },
            { icon: Globe, t: 'Tracked end-to-end', d: 'A live link the moment it ships.' },
            { icon: Truck, t: 'Carbon-neutral delivery', d: 'We offset every shipment.' },
          ].map((p) => (
            <div key={p.t} className="flex gap-3">
              <p.icon className="h-5 w-5 shrink-0 text-ink" />
              <div>
                <p className="text-sm font-semibold">{p.t}</p>
                <p className="text-sm text-muted">{p.d}</p>
              </div>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <h2 className="mt-14 font-display text-2xl font-bold uppercase tracking-tight">Shipping FAQ</h2>
        <div className="mt-4 divide-y border-t">
          {FAQ.map((f) => (
            <details key={f.q} className="group py-4">
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                {f.q}
                <span className="ml-4 text-muted transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
}
