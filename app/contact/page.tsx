'use client';

import { useState } from 'react';
import { Mail, MessageCircle, Clock, CheckCircle2 } from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Field, SelectField, Textarea } from '@/components/Field';

const TOPICS = ['Order help', 'Returns & exchanges', 'Product question', 'Feedback', 'Something else'];

export default function ContactPage() {
  const [sent, setSent] = useState(false);

  return (
    <div>
      <PageHeader
        eyebrow="Help"
        title="Contact Us"
        crumb="Contact Us"
        subtitle="Real humans, quick replies. Most messages get answered within a few hours."
      />
      <div className="mx-auto grid max-w-5xl gap-10 px-4 py-12 sm:px-6 lg:grid-cols-3">
        {/* Form */}
        <div className="lg:col-span-2">
          {sent ? (
            <div className="rounded-2xl border border-green-600/30 bg-green-50 p-8 text-center">
              <CheckCircle2 className="mx-auto h-12 w-12 text-green-600" />
              <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-tight">
                Message sent
              </h2>
              <p className="mt-2 text-sm text-muted">
                Thanks for reaching out — we’ll get back to you shortly at the email you provided.
              </p>
              <button
                onClick={() => setSent(false)}
                className="mt-5 rounded-full border px-6 py-2.5 text-sm font-semibold hover:border-ink"
              >
                Send another
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSent(true);
                window.scrollTo({ top: 0 });
              }}
              className="space-y-4"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Name" placeholder="Jordan Rivera" required />
                <Field label="Email" type="email" placeholder="you@email.com" required />
              </div>
              <SelectField label="Topic" defaultValue="">
                <option value="" disabled>
                  What’s this about?
                </option>
                {TOPICS.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </SelectField>
              <Field label="Order number (optional)" placeholder="SS-123456" />
              <Textarea label="Message" rows={5} placeholder="How can we help?" required />
              <button className="w-full rounded-full bg-accent py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:brightness-110 sm:w-auto sm:px-10">
                Send message
              </button>
            </form>
          )}
        </div>

        {/* Contact info */}
        <aside className="space-y-4">
          {[
            { icon: Mail, t: 'Email', d: 'help@solestripe.com', s: 'We reply within a few hours.' },
            { icon: MessageCircle, t: 'Live chat', d: 'Mon–Sat, 9am–9pm ET', s: 'Look for the chat bubble.' },
            { icon: Clock, t: 'Phone', d: '1-800-SOLE-STR', s: 'Mon–Fri, 9am–6pm ET.' },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl border p-5">
              <c.icon className="h-5 w-5 text-accent" />
              <p className="mt-2 text-sm font-semibold">{c.t}</p>
              <p className="text-sm">{c.d}</p>
              <p className="mt-0.5 text-xs text-muted">{c.s}</p>
            </div>
          ))}
        </aside>
      </div>
    </div>
  );
}
