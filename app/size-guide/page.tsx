'use client';

import { useState } from 'react';
import { PageHeader } from '@/components/PageHeader';

type Row = { us: number; uk: number; eu: number; cm: number };

const CHARTS: Record<string, Row[]> = {
  Men: [
    { us: 7, uk: 6, eu: 40, cm: 25 },
    { us: 8, uk: 7, eu: 41, cm: 26 },
    { us: 9, uk: 8, eu: 42.5, cm: 27 },
    { us: 10, uk: 9, eu: 44, cm: 28 },
    { us: 11, uk: 10, eu: 45, cm: 29 },
    { us: 12, uk: 11, eu: 46, cm: 30 },
    { us: 13, uk: 12, eu: 47.5, cm: 31 },
  ],
  Women: [
    { us: 5, uk: 3, eu: 35.5, cm: 22 },
    { us: 6, uk: 4, eu: 36.5, cm: 23 },
    { us: 7, uk: 5, eu: 38, cm: 24 },
    { us: 8, uk: 6, eu: 39, cm: 25 },
    { us: 9, uk: 7, eu: 40.5, cm: 26 },
    { us: 10, uk: 8, eu: 42, cm: 27 },
    { us: 11, uk: 9, eu: 43, cm: 28 },
  ],
  Kids: [
    { us: 3.5, uk: 3, eu: 35.5, cm: 22 },
    { us: 4, uk: 3.5, eu: 36, cm: 22.5 },
    { us: 5, uk: 4.5, eu: 37.5, cm: 23.5 },
    { us: 6, uk: 5.5, eu: 38.5, cm: 24 },
    { us: 7, uk: 6, eu: 40, cm: 25 },
  ],
};
const TABS = Object.keys(CHARTS);

export default function SizeGuidePage() {
  const [tab, setTab] = useState('Men');
  const [pick, setPick] = useState<number | null>(null);
  const rows = CHARTS[tab];

  return (
    <div>
      <PageHeader
        eyebrow="Help"
        title="Size Guide"
        crumb="Size Guide"
        subtitle="Find your fit across US, UK, EU and centimeters. Tap a row to highlight your size."
      />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
        {/* Tabs */}
        <div className="inline-flex rounded-full border p-1">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => {
                setTab(t);
                setPick(null);
              }}
              className={`rounded-full px-5 py-2 text-sm font-semibold uppercase tracking-wide transition ${
                tab === t ? 'bg-ink text-white' : 'text-muted hover:text-ink'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="mt-6 overflow-hidden rounded-2xl border">
          <table className="w-full text-center text-sm">
            <thead className="bg-[#f7f7f8] text-xs uppercase tracking-wide text-muted">
              <tr>
                {['US', 'UK', 'EU', 'CM'].map((h) => (
                  <th key={h} className="px-3 py-3 font-semibold">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {rows.map((r) => {
                const on = pick === r.us;
                return (
                  <tr
                    key={r.us}
                    onClick={() => setPick(on ? null : r.us)}
                    className={`cursor-pointer transition ${
                      on ? 'bg-accent/10 font-semibold text-ink' : 'hover:bg-black/[0.03]'
                    }`}
                  >
                    <td className="px-3 py-3">{r.us}</td>
                    <td className="px-3 py-3">{r.uk}</td>
                    <td className="px-3 py-3">{r.eu}</td>
                    <td className="px-3 py-3">{r.cm}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {pick !== null && (
          <p className="mt-4 rounded-xl bg-ink px-4 py-3 text-sm text-white">
            Your {tab} US {pick} ={' '}
            <span className="font-semibold">
              UK {rows.find((r) => r.us === pick)!.uk} · EU {rows.find((r) => r.us === pick)!.eu} ·{' '}
              {rows.find((r) => r.us === pick)!.cm} cm
            </span>
          </p>
        )}

        {/* How to measure */}
        <h2 className="mt-12 font-display text-2xl font-bold uppercase tracking-tight">
          How to measure
        </h2>
        <ol className="mt-4 space-y-3 text-sm text-muted">
          {[
            'Stand on a sheet of paper with your heel against a wall.',
            'Mark the tip of your longest toe, then measure heel-to-mark in centimeters.',
            'Match that length to the CM column above. Between sizes? Size up.',
          ].map((s, i) => (
            <li key={s} className="flex gap-3">
              <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-ink text-xs font-bold text-white">
                {i + 1}
              </span>
              <span className="pt-0.5">{s}</span>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}
