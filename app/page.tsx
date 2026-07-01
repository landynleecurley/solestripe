import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { ProductCard } from '@/components/ProductCard';
import { SneakerImage } from '@/components/SneakerImage';
import {
  PRODUCTS,
  getProduct,
  TYPE_LABELS,
  TYPES,
  isOnSale,
  type Product,
} from '@/lib/products';

const hero = getProduct('apex-vortex-1')!;
const trending = PRODUCTS.filter((p) => p.badge === 'Hot' || p.badge === 'Exclusive').slice(0, 8);
const newArrivals = PRODUCTS.filter((p) => p.badge === 'New').slice(0, 8);
const onSale = PRODUCTS.filter(isOnSale);

const CATEGORY_TILES = [
  { label: "Men's", href: '/shop?category=men', product: getProduct('halo-court-og')! },
  { label: "Women's", href: '/shop?category=women', product: getProduct('halo-cloud')! },
  { label: 'Kids', href: '/shop?category=kids', product: getProduct('volt-surge-kids')! },
  { label: 'Sale', href: '/shop?sale=1', product: getProduct('volt-surge-2')!, accent: true },
];

function SectionHead({ title, href, cta }: { title: string; href?: string; cta?: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <h2 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
        {title}
      </h2>
      {href && (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-1 text-sm font-semibold uppercase tracking-wide hover:text-accent"
        >
          {cta ?? 'Shop all'}
          <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
        </Link>
      )}
    </div>
  );
}

function Rail({ products }: { products: Product[] }) {
  return (
    <div className="no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:px-0">
      {products.map((p) => (
        <div key={p.slug} className="w-[228px] shrink-0 snap-start sm:w-[248px]">
          <ProductCard product={p} />
        </div>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="stripes absolute inset-x-0 top-0 h-1.5 opacity-90" />
        <div
          aria-hidden
          className="absolute -right-24 top-1/2 h-[520px] w-[520px] -translate-y-1/2 rounded-full bg-accent/25 blur-3xl"
        />
        <div className="relative mx-auto grid max-w-7xl items-center gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2 lg:py-20">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/80">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" /> New Season Drop
            </span>
            <h1 className="mt-5 font-display text-6xl font-bold uppercase leading-[0.88] tracking-tight sm:text-7xl lg:text-8xl">
              Lace up.
              <br />
              <span className="text-accent">Stand out.</span>
            </h1>
            <p className="mt-5 max-w-md text-white/70">
              The season&apos;s most-wanted sneakers, cleats, and gear — from the court to the
              concrete. Fresh heat lands every week.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/releases"
                className="rounded-full bg-accent px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:brightness-110"
              >
                Shop New Drops
              </Link>
              <Link
                href="/shop?sale=1"
                className="rounded-full border border-white/30 px-7 py-3.5 text-sm font-bold uppercase tracking-wide text-white transition hover:bg-white hover:text-ink"
              >
                Shop Sale
              </Link>
            </div>
            <p className="mt-6 text-xs uppercase tracking-[0.16em] text-white/50">
              Free shipping over $75 · 60-day returns
            </p>
          </div>

          <div className="relative">
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 sm:h-96 sm:w-96"
            />
            <span className="pointer-events-none absolute inset-x-0 top-1/2 -z-0 -translate-y-1/2 text-center font-display text-[7rem] font-bold uppercase leading-none text-white/5 sm:text-[10rem]">
              {hero.brand}
            </span>
            <SneakerImage
              colorway={hero.colorways[0]}
              className="relative mx-auto w-[92%] max-w-lg -rotate-6 drop-shadow-[0_30px_35px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Category tiles */}
        <section className="grid grid-cols-2 gap-3 py-10 sm:gap-4 lg:grid-cols-4">
          {CATEGORY_TILES.map((t) => (
            <Link
              key={t.label}
              href={t.href}
              className={`group relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-2xl border p-5 sm:aspect-[3/4] ${
                t.accent ? 'bg-accent text-white' : 'bg-[#f3f3f5]'
              }`}
            >
              <span className="font-display text-2xl font-bold uppercase tracking-tight">
                {t.label}
              </span>
              <SneakerImage
                colorway={t.product.colorways[0]}
                className="w-[85%] self-center transition-transform duration-300 group-hover:scale-105"
              />
              <span className="inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wide">
                Shop <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </Link>
          ))}
        </section>

        {/* Trending */}
        <section className="py-8">
          <SectionHead title="Trending Now" href="/shop" cta="Shop all" />
          <Rail products={trending} />
        </section>
      </div>

      {/* Split promo */}
      <section className="mx-auto grid max-w-7xl gap-3 px-4 py-8 sm:px-6 md:grid-cols-2">
        {[
          { label: 'Hit the Court', type: 'basketball', product: getProduct('apex-vortex-low')! },
          { label: 'Chase the Miles', type: 'running', product: getProduct('cadence-tempo-og')! },
        ].map((b) => (
          <Link
            key={b.type}
            href={`/shop?type=${b.type}`}
            className="group relative flex items-center justify-between overflow-hidden rounded-3xl bg-ink p-8 text-white"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/50">
                {TYPE_LABELS[b.type as keyof typeof TYPE_LABELS]}
              </p>
              <h3 className="mt-1 font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                {b.label}
              </h3>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold uppercase tracking-wide text-accent">
                Shop now <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </span>
            </div>
            <SneakerImage
              colorway={b.product.colorways[0]}
              className="w-40 rotate-6 drop-shadow-[0_20px_20px_rgba(0,0,0,0.4)] transition-transform duration-300 group-hover:scale-110 sm:w-52"
            />
          </Link>
        ))}
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* New arrivals */}
        <section className="py-8">
          <SectionHead title="Just Dropped" href="/releases" cta="Release calendar" />
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
            {newArrivals.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        </section>

        {/* Shop by sport */}
        <section className="py-8">
          <SectionHead title="Shop by Sport" />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {TYPES.map((t) => (
              <Link
                key={t}
                href={`/shop?type=${t}`}
                className="flex items-center justify-center rounded-xl border py-6 font-display text-lg font-semibold uppercase tracking-wide transition hover:border-ink hover:bg-ink hover:text-white"
              >
                {TYPE_LABELS[t]}
              </Link>
            ))}
          </div>
        </section>
      </div>

      {/* Sale strip */}
      {onSale.length > 0 && (
        <section className="bg-accent py-10 text-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6">
            <div className="mb-6 flex items-end justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-white/70">
                  Limited time
                </p>
                <h2 className="font-display text-3xl font-bold uppercase tracking-tight sm:text-4xl">
                  Up to 20% Off
                </h2>
              </div>
              <Link
                href="/shop?sale=1"
                className="group inline-flex shrink-0 items-center gap-1 rounded-full bg-white px-5 py-2.5 text-sm font-bold uppercase tracking-wide text-ink"
              >
                Shop sale <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </Link>
            </div>
            <div className="rounded-3xl bg-white p-4 text-ink">
              <Rail products={onSale} />
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
