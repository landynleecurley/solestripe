import type { Metadata } from 'next';
import { Recycle, Leaf, Package, RefreshCw } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';

export const metadata: Metadata = {
  title: 'Sustainability',
  description: 'How SoleStripe is lowering its footprint — recycled materials, carbon-neutral shipping, and a take-back program.',
};

const PILLARS = [
  { icon: Leaf, t: 'Better materials', d: 'We prioritize brands using recycled and bio-based materials, and we label every eco-friendlier pair.' },
  { icon: Package, t: 'Plastic-free packaging', d: '100% recyclable boxes and mailers, printed with soy-based inks. No single-use plastic.' },
  { icon: Recycle, t: 'Take-back program', d: 'Send us your worn-out kicks and we’ll recycle or donate them — you get store credit for it.' },
  { icon: RefreshCw, t: 'Carbon-neutral shipping', d: 'Every delivery is offset through verified reforestation and clean-energy projects.' },
];

const STATS = [
  { n: '100%', l: 'Recyclable packaging' },
  { n: '68%', l: 'Shipments carbon-offset' },
  { n: '190K', l: 'Pairs recycled' },
  { n: '2030', l: 'Net-zero target' },
];

export default function SustainabilityPage() {
  return (
    <div>
      <PageHeader
        eyebrow="Company"
        title="Sustainability"
        crumb="Sustainability"
        subtitle="Sneakers shouldn’t cost the earth. Here’s how we’re shrinking our footprint — and where we’re headed."
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="grid gap-4 sm:grid-cols-2">
          {PILLARS.map((p) => (
            <div key={p.t} className="rounded-2xl border p-6">
              <p.icon className="h-7 w-7 text-green-600" />
              <h3 className="mt-3 font-display text-lg font-semibold uppercase tracking-wide">
                {p.t}
              </h3>
              <p className="mt-1 text-sm leading-relaxed text-muted">{p.d}</p>
            </div>
          ))}
        </div>

        <div className="mt-12 rounded-3xl bg-ink px-6 py-10 text-white">
          <h2 className="text-center font-display text-2xl font-bold uppercase tracking-tight">
            The numbers so far
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-6 sm:grid-cols-4">
            {STATS.map((s) => (
              <div key={s.l} className="text-center">
                <div className="font-display text-3xl font-bold sm:text-4xl">{s.n}</div>
                <div className="mt-1 text-xs uppercase tracking-wide text-white/60">{s.l}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight">Our commitments</h2>
          <ul className="mt-4 space-y-3">
            {[
              'Publish a full impact report every year — no greenwashing, just numbers.',
              'Reach net-zero operational emissions by 2030.',
              'Grow the take-back program to every store and every order.',
              'Move 100% of private-label materials to recycled or renewable by 2028.',
            ].map((c) => (
              <li key={c} className="flex items-start gap-3 text-sm text-muted">
                <Leaf className="mt-0.5 h-4 w-4 shrink-0 text-green-600" /> {c}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
