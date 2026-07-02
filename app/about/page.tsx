import type { Metadata } from 'next';
import Link from 'next/link';
import { Flame, Users, Recycle, ShieldCheck } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'About',
  description: 'The story behind SoleStripe — sneakers, culture, and the pursuit of the perfect fit.',
};

const STATS = [
  { n: '2018', l: 'Founded' },
  { n: '120+', l: 'Cities served' },
  { n: '2.4M', l: 'Pairs shipped' },
  { n: '4.8★', l: 'Avg. rating' },
];

const VALUES = [
  { icon: Flame, t: 'Culture first', d: 'We chase the drops the community actually wants — not what a spreadsheet says.' },
  { icon: Users, t: 'For everyone', d: 'Every silhouette, in every size, for every kind of feet. Fit is a right, not a privilege.' },
  { icon: Recycle, t: 'Built to last', d: 'We favor brands and materials that hold up — and we take the old pairs back to recycle.' },
  { icon: ShieldCheck, t: '100% authentic', d: 'Every pair is verified. No fakes, no funny business, ever.' },
];

export default function AboutPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Company"
        title="About SoleStripe"
        crumb="About"
        subtitle="We’re a sneaker shop built by people who actually lace up — obsessed with the fit, the feel, and the culture around every pair."
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {/* Story */}
        <div className="space-y-4 text-lg leading-relaxed text-muted">
          <p>
            SoleStripe started in a cramped back room with one rule: never sell a shoe you wouldn’t
            wear yourself. What began as a handful of grails for friends turned into a full-blown
            store for anyone who cares about what’s on their feet.
          </p>
          <p>
            Today we carry the season’s most-wanted running, basketball, skate and lifestyle
            silhouettes — plus the exclusives you won’t find just anywhere. But the mission hasn’t
            changed: the right pair, in your size, delivered fast, backed by people who’ll actually
            help.
          </p>
        </div>

        {/* Stats */}
        <div className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.l} className="rounded-2xl border p-5 text-center">
              <div className="font-display text-3xl font-bold sm:text-4xl">{s.n}</div>
              <div className="mt-1 text-xs uppercase tracking-wide text-muted">{s.l}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <h2 className="mt-14 font-display text-3xl font-bold uppercase tracking-tight">
          What we stand for
        </h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {VALUES.map((v) => (
            <div key={v.t} className="rounded-2xl border p-6">
              <v.icon className="h-7 w-7 text-accent" />
              <h3 className="mt-3 font-display text-lg font-semibold uppercase tracking-wide">
                {v.t}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{v.d}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 flex flex-col items-center gap-4 rounded-3xl bg-ink px-6 py-12 text-center text-white">
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
            Come lace up with us
          </h2>
          <p className="max-w-md text-white/70">Fresh heat lands every week. Find your next pair.</p>
          <Link
            href="/shop"
            className="rounded-full bg-accent px-8 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:brightness-110"
          >
            Shop the latest
          </Link>
        </div>
      </div>
    </div>
  );
}
