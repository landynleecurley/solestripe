'use client';

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';

type WishlistCtx = {
  slugs: string[];
  count: number;
  has: (slug: string) => boolean;
  toggle: (slug: string) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const Ctx = createContext<WishlistCtx | null>(null);
const STORAGE = 'solestripe-wishlist';

export function WishlistProvider({ children }: { children: ReactNode }) {
  const [slugs, setSlugs] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) setSlugs(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE, JSON.stringify(slugs));
    } catch {
      /* ignore */
    }
  }, [slugs, hydrated]);

  const has = (slug: string) => slugs.includes(slug);
  const toggle = (slug: string) =>
    setSlugs((p) => (p.includes(slug) ? p.filter((s) => s !== slug) : [slug, ...p]));
  const remove = (slug: string) => setSlugs((p) => p.filter((s) => s !== slug));
  const clear = () => setSlugs([]);

  return (
    <Ctx.Provider value={{ slugs, count: slugs.length, has, toggle, remove, clear }}>
      {children}
    </Ctx.Provider>
  );
}

export function useWishlist(): WishlistCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error('useWishlist must be used within WishlistProvider');
  return c;
}
