'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { Search, ShoppingBag, User, Heart, Menu, X } from 'lucide-react';
import { Wordmark } from './Wordmark';
import { useCart } from '@/lib/cart';

const NAV: { label: string; href: string; accent?: boolean }[] = [
  { label: "Men's", href: '/shop?category=men' },
  { label: "Women's", href: '/shop?category=women' },
  { label: 'Kids', href: '/shop?category=kids' },
  { label: 'Brands', href: '/shop' },
  { label: 'Sale', href: '/shop?sale=1', accent: true },
  { label: 'New', href: '/releases' },
];

export function Header() {
  const { count, open } = useCart();
  const router = useRouter();
  const [q, setQ] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Portal target is only available on the client.
  useEffect(() => setMounted(true), []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    if (mobileOpen) window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  const submitSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    setSearchOpen(false);
    setMobileOpen(false);
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
        <button
          type="button"
          aria-label="Menu"
          onClick={() => setMobileOpen(true)}
          className="md:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>

        <Wordmark className="text-ink" />

        <nav className="ml-4 hidden items-center gap-5 md:flex">
          {NAV.map((n) => (
            <Link
              key={n.label}
              href={n.href}
              className={`text-sm font-semibold uppercase tracking-wide transition hover:text-accent ${
                n.accent ? 'text-accent' : 'text-ink'
              }`}
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-1.5 sm:gap-3">
          <form onSubmit={submitSearch} className="hidden lg:flex">
            <div className="flex items-center rounded-full border bg-[#f3f3f5] px-3 focus-within:border-ink">
              <Search className="h-4 w-4 text-muted" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search sneakers, brands…"
                aria-label="Search"
                className="w-44 bg-transparent px-2 py-2 text-sm outline-none placeholder:text-muted xl:w-56"
              />
            </div>
          </form>

          <button
            type="button"
            aria-label="Search"
            onClick={() => setSearchOpen((s) => !s)}
            className="grid h-10 w-10 place-items-center rounded-full hover:bg-black/5 lg:hidden"
          >
            <Search className="h-5 w-5" />
          </button>
          <Link
            href="#"
            aria-label="Wishlist"
            className="hidden h-10 w-10 place-items-center rounded-full hover:bg-black/5 sm:grid"
          >
            <Heart className="h-5 w-5" />
          </Link>
          <Link
            href="#"
            aria-label="Account"
            className="hidden h-10 w-10 place-items-center rounded-full hover:bg-black/5 sm:grid"
          >
            <User className="h-5 w-5" />
          </Link>
          <button
            type="button"
            onClick={open}
            aria-label={`Cart, ${count} items`}
            className="relative grid h-10 w-10 place-items-center rounded-full hover:bg-black/5"
          >
            <ShoppingBag className="h-5 w-5" />
            {count > 0 && (
              <span className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[10px] font-bold text-white">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile search row */}
      {searchOpen && (
        <div className="border-t px-4 py-2 lg:hidden">
          <form onSubmit={submitSearch}>
            <div className="flex items-center rounded-full border bg-[#f3f3f5] px-3">
              <Search className="h-4 w-4 text-muted" />
              <input
                autoFocus
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search sneakers, brands…"
                aria-label="Search"
                className="w-full bg-transparent px-2 py-2.5 text-sm outline-none placeholder:text-muted"
              />
            </div>
          </form>
        </div>
      )}

      {/* Mobile menu — portaled to <body> so the header's backdrop-blur can't
          confine it (backdrop-filter creates a containing block for fixed kids). */}
      {mounted &&
        mobileOpen &&
        createPortal(
          <div className="fixed inset-0 z-60 md:hidden">
          <button
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 bg-black/40"
          />
          <div className="absolute inset-y-0 left-0 flex w-[82%] max-w-sm flex-col bg-white shadow-2xl">
            <div className="flex h-16 items-center justify-between border-b px-4">
              <Wordmark className="text-ink" />
              <button aria-label="Close" onClick={() => setMobileOpen(false)}>
                <X className="h-6 w-6" />
              </button>
            </div>
            <nav className="flex flex-col p-2">
              {NAV.map((n) => (
                <Link
                  key={n.label}
                  href={n.href}
                  onClick={() => setMobileOpen(false)}
                  className={`rounded-xl px-4 py-3.5 text-lg font-semibold uppercase tracking-wide ${
                    n.accent ? 'text-accent' : 'text-ink'
                  } hover:bg-black/5`}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="mt-auto border-t p-4">
              <div className="flex gap-3">
                <Link
                  href="#"
                  onClick={() => setMobileOpen(false)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border py-3 text-sm font-semibold"
                >
                  <User className="h-4 w-4" /> Account
                </Link>
                <Link
                  href="#"
                  onClick={() => setMobileOpen(false)}
                  className="flex flex-1 items-center justify-center gap-2 rounded-full border py-3 text-sm font-semibold"
                >
                  <Heart className="h-4 w-4" /> Wishlist
                </Link>
              </div>
            </div>
          </div>
          </div>,
          document.body,
        )}
    </header>
  );
}
