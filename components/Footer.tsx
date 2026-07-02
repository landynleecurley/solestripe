import Link from 'next/link';
import { Wordmark } from './Wordmark';
import { SocialLinks } from './SocialLinks';
import { PaymentMethods } from './PaymentMethods';

const COLUMNS: { title: string; links: { label: string; href: string }[] }[] = [
  {
    title: 'Shop',
    links: [
      { label: "Men's", href: '/shop?category=men' },
      { label: "Women's", href: '/shop?category=women' },
      { label: 'Kids', href: '/shop?category=kids' },
      { label: 'New Releases', href: '/releases' },
      { label: 'Sale', href: '/shop?sale=1' },
    ],
  },
  {
    title: 'Help',
    links: [
      { label: 'Order Status', href: '#' },
      { label: 'Shipping', href: '#' },
      { label: 'Returns', href: '#' },
      { label: 'Size Guide', href: '#' },
      { label: 'Contact Us', href: '#' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Store Locator', href: '#' },
      { label: 'Gift Cards', href: '#' },
      { label: 'Sustainability', href: '#' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t bg-ink text-white/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Newsletter */}
        <div className="grid gap-8 border-b border-white/10 py-12 md:grid-cols-2 md:items-center">
          <div>
            <h3 className="font-display text-2xl font-semibold uppercase tracking-wide text-white">
              Join the Stripe Club
            </h3>
            <p className="mt-2 max-w-md text-sm text-white/60">
              Early access to drops, members-only pricing, and a birthday reward. No spam — just heat.
            </p>
          </div>
          <form className="flex w-full max-w-md gap-2 md:ml-auto" action="#">
            <input
              type="email"
              required
              placeholder="Email address"
              aria-label="Email address"
              className="min-w-0 flex-1 rounded-full border border-white/20 bg-white/5 px-5 py-3 text-sm text-white placeholder:text-white/40 focus:border-white/50 focus:outline-none"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-accent px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition hover:brightness-110"
            >
              Sign Up
            </button>
          </form>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-2 gap-8 py-12 sm:grid-cols-4">
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-white">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-2.5 text-sm">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-white/60 transition hover:text-white">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-display text-sm font-semibold uppercase tracking-[0.16em] text-white">
              Connect
            </h4>
            <SocialLinks className="mt-4" />
            <div className="mt-6 h-2 w-32 stripes rounded-full opacity-80" />
          </div>
        </div>

        {/* Bottom */}
        <div className="flex flex-col gap-4 border-t border-white/10 py-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Wordmark className="text-white" />
          </div>
          <p className="text-xs text-white/45">
            © {new Date().getFullYear()} SoleStripe. All rights reserved.
          </p>
          <PaymentMethods />
        </div>
      </div>
    </footer>
  );
}
