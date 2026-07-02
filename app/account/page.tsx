'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import {
  User,
  Package,
  MapPin,
  CreditCard,
  Settings,
  LogOut,
  Heart,
  Plus,
  Trash2,
  Star,
  CheckCircle2,
  ChevronRight,
} from 'lucide-react';
import { PageHeader } from '@/components/PageHeader';
import { Field } from '@/components/Field';
import { money } from '@/lib/format';
import { useWishlist } from '@/lib/wishlist';

const TABS = [
  { id: 'overview', label: 'Overview', icon: User },
  { id: 'orders', label: 'Orders', icon: Package },
  { id: 'addresses', label: 'Addresses', icon: MapPin },
  { id: 'payment', label: 'Payment', icon: CreditCard },
  { id: 'profile', label: 'Profile', icon: Settings },
] as const;

type Status = 'Delivered' | 'Shipped' | 'Processing';
const ORDERS: { id: string; date: string; items: number; total: number; status: Status }[] = [
  { id: 'SS-481902', date: 'Jun 24, 2026', items: 2, total: 295, status: 'Delivered' },
  { id: 'SS-479115', date: 'Jun 10, 2026', items: 1, total: 140, status: 'Shipped' },
  { id: 'SS-472338', date: 'May 28, 2026', items: 3, total: 410, status: 'Delivered' },
];
const STATUS_STYLE: Record<Status, string> = {
  Delivered: 'bg-green-100 text-green-700',
  Shipped: 'bg-blue-100 text-blue-700',
  Processing: 'bg-amber-100 text-amber-700',
};

const INITIAL_ADDRESSES = [
  { id: 1, label: 'Home', name: 'Jordan Rivera', line: '123 Main St, Apt 4B', city: 'Brooklyn, NY 11201', primary: true },
  { id: 2, label: 'Work', name: 'Jordan Rivera', line: '450 Park Ave, Floor 12', city: 'New York, NY 10022', primary: false },
];
const INITIAL_CARDS = [
  { id: 1, icon: 'fa6-brands:cc-visa', brand: 'Visa', last4: '4242', exp: '08/28', primary: true },
  { id: 2, icon: 'fa6-brands:cc-mastercard', brand: 'Mastercard', last4: '5555', exp: '02/27', primary: false },
];

export default function AccountPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('overview');
  const [addresses, setAddresses] = useState(INITIAL_ADDRESSES);
  const [cards, setCards] = useState(INITIAL_CARDS);
  const [savedProfile, setSavedProfile] = useState(false);
  const { count: wishCount } = useWishlist();

  return (
    <div>
      <PageHeader eyebrow="Account" title="Hey, Jordan" crumb="Account" />
      <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[220px_1fr]">
          {/* Sidebar */}
          <aside>
            <div className="mb-4 flex items-center gap-3 rounded-2xl border p-3">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[color-mix(in_oklab,var(--color-accent)_18%,transparent)] font-display text-lg font-bold text-accent">
                JR
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">Jordan Rivera</p>
                <p className="truncate text-xs text-muted">Stripe Club member</p>
              </div>
            </div>
            <nav className="flex gap-1 overflow-x-auto lg:flex-col">
              {TABS.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setTab(t.id)}
                  className={`flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium transition ${
                    tab === t.id ? 'bg-ink text-white' : 'text-muted hover:bg-black/5 hover:text-ink'
                  }`}
                >
                  <t.icon className="h-4 w-4" /> {t.label}
                </button>
              ))}
              <Link
                href="/"
                className="flex shrink-0 items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-sm font-medium text-muted transition hover:bg-black/5 hover:text-accent"
              >
                <LogOut className="h-4 w-4" /> Sign out
              </Link>
            </nav>
          </aside>

          {/* Content */}
          <div>
            {tab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                  <StatCard label="Orders" value={String(ORDERS.length)} icon={Package} href="#" onClick={() => setTab('orders')} />
                  <StatCard label="Wishlist" value={String(wishCount)} icon={Heart} href="/wishlist" />
                  <StatCard label="Rewards pts" value="1,240" icon={Star} />
                </div>
                <div className="rounded-2xl border p-5">
                  <div className="flex items-center justify-between">
                    <h2 className="font-display text-lg font-semibold uppercase tracking-wide">
                      Latest order
                    </h2>
                    <button onClick={() => setTab('orders')} className="text-sm text-muted hover:text-ink">
                      View all
                    </button>
                  </div>
                  <OrderRow order={ORDERS[0]} />
                </div>
              </div>
            )}

            {tab === 'orders' && (
              <div>
                <h2 className="mb-4 font-display text-2xl font-bold uppercase tracking-tight">Orders</h2>
                <div className="divide-y rounded-2xl border">
                  {ORDERS.map((o) => (
                    <div key={o.id} className="p-5">
                      <OrderRow order={o} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'addresses' && (
              <Section title="Addresses" onAdd={() =>
                setAddresses((a) => [
                  ...a,
                  { id: Date.now(), label: 'New address', name: 'Jordan Rivera', line: 'Add your street', city: 'City, ST 00000', primary: false },
                ])
              } addLabel="Add address">
                <div className="grid gap-4 sm:grid-cols-2">
                  {addresses.map((a) => (
                    <div key={a.id} className="rounded-2xl border p-5">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-semibold">{a.label}</span>
                        {a.primary && <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] font-bold uppercase text-white">Default</span>}
                      </div>
                      <p className="mt-2 text-sm">{a.name}</p>
                      <p className="text-sm text-muted">{a.line}</p>
                      <p className="text-sm text-muted">{a.city}</p>
                      {!a.primary && (
                        <button
                          onClick={() => setAddresses((list) => list.filter((x) => x.id !== a.id).length ? list.filter((x) => x.id !== a.id) : list)}
                          className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {tab === 'payment' && (
              <Section title="Payment methods" addLabel="Add card">
                <div className="grid gap-4 sm:grid-cols-2">
                  {cards.map((c) => (
                    <div key={c.id} className="rounded-2xl border p-5">
                      <div className="flex items-center justify-between">
                        <Icon icon={c.icon} height={26} />
                        {c.primary && <span className="rounded-full bg-ink px-2 py-0.5 text-[10px] font-bold uppercase text-white">Default</span>}
                      </div>
                      <p className="mt-3 text-sm font-medium">•••• •••• •••• {c.last4}</p>
                      <p className="text-sm text-muted">Expires {c.exp}</p>
                      {!c.primary && (
                        <button
                          onClick={() => setCards((list) => list.filter((x) => x.id !== c.id))}
                          className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted hover:text-accent"
                        >
                          <Trash2 className="h-3.5 w-3.5" /> Remove
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </Section>
            )}

            {tab === 'profile' && (
              <div>
                <h2 className="mb-4 font-display text-2xl font-bold uppercase tracking-tight">Profile</h2>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setSavedProfile(true);
                  }}
                  className="max-w-md space-y-4"
                >
                  <Field label="Full name" defaultValue="Jordan Rivera" onChange={() => setSavedProfile(false)} />
                  <Field label="Email" type="email" defaultValue="jordan@example.com" onChange={() => setSavedProfile(false)} />
                  <Field label="Phone" defaultValue="(212) 555-0142" onChange={() => setSavedProfile(false)} />
                  <div className="flex items-center gap-3">
                    <button className="rounded-full bg-accent px-8 py-3 text-sm font-bold uppercase tracking-wide text-white transition hover:brightness-110">
                      Save changes
                    </button>
                    {savedProfile && (
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-green-600">
                        <CheckCircle2 className="h-4 w-4" /> Saved
                      </span>
                    )}
                  </div>
                </form>
              </div>
            )}

            <p className="mt-8 rounded-xl bg-[#f7f7f8] p-3 text-center text-xs text-muted">
              This is a demo account — no real data is stored.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon2,
  href,
  onClick,
}: {
  label: string;
  value: string;
  icon: typeof Package;
  href?: string;
  onClick?: () => void;
}) {
  const inner = (
    <>
      <Icon2 className="h-5 w-5 text-accent" />
      <div className="mt-2 font-display text-2xl font-bold">{value}</div>
      <div className="text-xs uppercase tracking-wide text-muted">{label}</div>
    </>
  );
  const cls = 'block rounded-2xl border p-5 text-left transition hover:border-ink';
  if (href && href !== '#') return <Link href={href} className={cls}>{inner}</Link>;
  return (
    <button onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

function OrderRow({ order }: { order: (typeof ORDERS)[number] }) {
  return (
    <div className="mt-3 flex items-center justify-between gap-3">
      <div>
        <p className="font-semibold">{order.id}</p>
        <p className="text-sm text-muted">
          {order.date} · {order.items} {order.items === 1 ? 'item' : 'items'} · {money(order.total)}
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${STATUS_STYLE[order.status]}`}>
          {order.status}
        </span>
        <Link
          href="/order-status"
          className="inline-flex items-center gap-1 text-sm font-semibold hover:text-accent"
        >
          Track <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}

function Section({
  title,
  children,
  onAdd,
  addLabel,
}: {
  title: string;
  children: React.ReactNode;
  onAdd?: () => void;
  addLabel: string;
}) {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-2xl font-bold uppercase tracking-tight">{title}</h2>
        <button
          onClick={onAdd}
          className="inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-sm font-semibold hover:border-ink"
        >
          <Plus className="h-4 w-4" /> {addLabel}
        </button>
      </div>
      {children}
    </div>
  );
}
