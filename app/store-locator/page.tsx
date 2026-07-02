'use client';

import { useState } from 'react';
import { Search, MapPin, Clock, Phone, Navigation } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';

type Store = {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  hours: string;
  phone: string;
};

const STORES: Store[] = [
  { name: 'SoleStripe SoHo', address: '112 Prince St', city: 'New York', state: 'NY', zip: '10012', hours: '10am–9pm', phone: '(212) 555-0112' },
  { name: 'SoleStripe Melrose', address: '7600 Melrose Ave', city: 'Los Angeles', state: 'CA', zip: '90046', hours: '10am–8pm', phone: '(323) 555-0176' },
  { name: 'SoleStripe Wicker Park', address: '1543 N Milwaukee Ave', city: 'Chicago', state: 'IL', zip: '60622', hours: '11am–8pm', phone: '(312) 555-0143' },
  { name: 'SoleStripe Buckhead', address: '3500 Peachtree Rd', city: 'Atlanta', state: 'GA', zip: '30326', hours: '10am–9pm', phone: '(404) 555-0135' },
  { name: 'SoleStripe The Domain', address: '11700 Domain Blvd', city: 'Austin', state: 'TX', zip: '78758', hours: '10am–9pm', phone: '(512) 555-0117' },
  { name: 'SoleStripe Downtown', address: '450 Post St', city: 'San Francisco', state: 'CA', zip: '94102', hours: '10am–8pm', phone: '(415) 555-0145' },
];

export default function StoreLocatorPage() {
  const [q, setQ] = useState('');
  const needle = q.trim().toLowerCase();
  const results = needle
    ? STORES.filter((s) =>
        `${s.city} ${s.state} ${s.zip} ${s.name}`.toLowerCase().includes(needle),
      )
    : STORES;

  return (
    <div>
      <PageHeader
        eyebrow="Company"
        title="Store Locator"
        crumb="Store Locator"
        subtitle="Find a SoleStripe near you — try on the heat, get fitted, and grab it same-day."
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="flex items-center rounded-full border bg-[#f3f3f5] px-4 focus-within:border-ink">
          <Search className="h-5 w-5 text-muted" />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by city, state, or ZIP…"
            aria-label="Search stores"
            className="w-full bg-transparent px-3 py-3.5 text-sm outline-none placeholder:text-muted"
          />
          {q && (
            <button onClick={() => setQ('')} className="text-sm text-muted hover:text-ink">
              Clear
            </button>
          )}
        </div>

        <p className="mt-4 text-sm text-muted">
          {results.length} {results.length === 1 ? 'store' : 'stores'}
          {needle && ` matching “${q}”`}
        </p>

        {results.length === 0 ? (
          <div className="mt-6 grid place-items-center rounded-2xl border border-dashed py-16 text-center">
            <MapPin className="h-10 w-10 text-line" />
            <p className="mt-2 font-semibold">No stores found</p>
            <p className="text-sm text-muted">Try another city or ZIP — or shop online, we ship fast.</p>
          </div>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {results.map((s) => (
              <div key={s.name} className="rounded-2xl border p-5">
                <h3 className="font-display text-lg font-semibold uppercase tracking-wide">{s.name}</h3>
                <div className="mt-3 space-y-1.5 text-sm text-muted">
                  <p className="flex items-start gap-2">
                    <MapPin className="mt-0.5 h-4 w-4 shrink-0" />
                    {s.address}, {s.city}, {s.state} {s.zip}
                  </p>
                  <p className="flex items-center gap-2">
                    <Clock className="h-4 w-4 shrink-0" /> Open today · {s.hours}
                  </p>
                  <p className="flex items-center gap-2">
                    <Phone className="h-4 w-4 shrink-0" /> {s.phone}
                  </p>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(
                    `${s.address}, ${s.city}, ${s.state} ${s.zip}`,
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold hover:border-ink"
                >
                  <Navigation className="h-4 w-4" /> Directions
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
