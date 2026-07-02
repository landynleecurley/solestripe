'use client';

import { useState } from 'react';
import { MapPin, Briefcase, X, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Field, Textarea } from '@/components/Field';

type Role = { title: string; dept: string; location: string; type: string };

const ROLES: Role[] = [
  { title: 'Senior Frontend Engineer', dept: 'Engineering', location: 'Remote (US)', type: 'Full-time' },
  { title: 'Product Designer', dept: 'Design', location: 'New York, NY', type: 'Full-time' },
  { title: 'Warehouse Associate', dept: 'Operations', location: 'Columbus, OH', type: 'Full-time' },
  { title: 'Social Media Manager', dept: 'Marketing', location: 'Remote (US)', type: 'Full-time' },
  { title: 'Customer Experience Lead', dept: 'Support', location: 'Remote (US)', type: 'Full-time' },
  { title: 'Retail Sales Associate', dept: 'Retail', location: 'Los Angeles, CA', type: 'Part-time' },
  { title: 'Data Analyst', dept: 'Engineering', location: 'Remote (US)', type: 'Full-time' },
  { title: 'Buyer, Footwear', dept: 'Merchandising', location: 'New York, NY', type: 'Full-time' },
];

const DEPTS = ['All', ...Array.from(new Set(ROLES.map((r) => r.dept)))];

export default function CareersPage() {
  const [dept, setDept] = useState('All');
  const [applyFor, setApplyFor] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const roles = dept === 'All' ? ROLES : ROLES.filter((r) => r.dept === dept);

  const closeModal = () => {
    setApplyFor(null);
    setSubmitted(false);
  };

  return (
    <div>
      <PageHeader
        eyebrow="Company"
        title="Careers"
        crumb="Careers"
        subtitle="Help us put the right pair on every pair of feet. Browse open roles and join the crew."
      />
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        {/* Dept filter */}
        <div className="flex flex-wrap gap-2">
          {DEPTS.map((d) => (
            <button
              key={d}
              onClick={() => setDept(d)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition ${
                dept === d ? 'border-ink bg-ink text-white' : 'hover:border-ink'
              }`}
            >
              {d}
            </button>
          ))}
        </div>

        <p className="mt-5 text-sm text-muted">
          {roles.length} open {roles.length === 1 ? 'role' : 'roles'}
        </p>

        {/* Roles */}
        <div className="mt-3 divide-y border-t">
          {roles.map((r) => (
            <div key={r.title} className="flex flex-col gap-3 py-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="text-lg font-semibold">{r.title}</h3>
                <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted">
                  <span className="inline-flex items-center gap-1.5">
                    <Briefcase className="h-4 w-4" /> {r.dept} · {r.type}
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" /> {r.location}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setApplyFor(r.title)}
                className="shrink-0 rounded-full bg-accent px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white transition hover:brightness-110"
              >
                Apply
              </button>
            </div>
          ))}
        </div>

        <p className="mt-10 rounded-2xl bg-[#f7f7f8] p-5 text-sm text-muted">
          Don’t see your role? We’re always up to meet great people — send us a note at{' '}
          <span className="font-semibold text-ink">careers@solestripe.com</span>.
        </p>
      </div>

      {/* Apply modal */}
      {applyFor && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4">
          <button aria-label="Close" onClick={closeModal} className="absolute inset-0 bg-black/50" />
          <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <button onClick={closeModal} aria-label="Close" className="absolute right-4 top-4 text-muted hover:text-ink">
              <X className="h-5 w-5" />
            </button>
            {submitted ? (
              <div className="py-6 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
                <h3 className="mt-3 font-display text-2xl font-bold uppercase tracking-tight">
                  Application sent
                </h3>
                <p className="mt-2 text-sm text-muted">
                  Thanks for applying to <span className="font-medium text-ink">{applyFor}</span>. Our
                  team will be in touch if it’s a match.
                </p>
                <button
                  onClick={closeModal}
                  className="mt-5 rounded-full bg-ink px-6 py-2.5 text-sm font-semibold text-white"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">Apply</p>
                <h3 className="mt-0.5 font-display text-xl font-bold uppercase tracking-tight">
                  {applyFor}
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSubmitted(true);
                  }}
                  className="mt-4 space-y-3"
                >
                  <Field label="Full name" placeholder="Jordan Rivera" required />
                  <Field label="Email" type="email" placeholder="you@email.com" required />
                  <Field label="Portfolio / LinkedIn" placeholder="https://…" />
                  <Textarea label="Why you? (optional)" rows={3} placeholder="A few lines…" />
                  <button className="w-full rounded-full bg-accent py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:brightness-110">
                    Submit application
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
