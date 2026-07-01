'use client';

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { getProduct, type Product } from './products';

export type CartLine = { slug: string; colorway: number; size: number; qty: number };
export type CartLineView = CartLine & { product: Product; lineTotal: number; key: string };

type CartCtx = {
  items: CartLineView[];
  count: number;
  subtotal: number;
  add: (line: Omit<CartLine, 'qty'> & { qty?: number }) => void;
  remove: (key: string) => void;
  setQty: (key: string, qty: number) => void;
  clear: () => void;
  isOpen: boolean;
  open: () => void;
  close: () => void;
};

const keyOf = (l: { slug: string; colorway: number; size: number }) =>
  `${l.slug}::${l.colorway}::${l.size}`;

const Ctx = createContext<CartCtx | null>(null);
const STORAGE = 'solestripe-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isOpen, setOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE);
      if (raw) setLines(JSON.parse(raw));
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE, JSON.stringify(lines));
    } catch {
      /* ignore quota errors */
    }
  }, [lines, hydrated]);

  const add: CartCtx['add'] = (line) => {
    setLines((prev) => {
      const k = keyOf(line);
      if (prev.some((l) => keyOf(l) === k)) {
        return prev.map((l) => (keyOf(l) === k ? { ...l, qty: l.qty + (line.qty ?? 1) } : l));
      }
      return [
        ...prev,
        { slug: line.slug, colorway: line.colorway, size: line.size, qty: line.qty ?? 1 },
      ];
    });
    setOpen(true);
  };

  const remove = (key: string) => setLines((prev) => prev.filter((l) => keyOf(l) !== key));

  const setQty = (key: string, qty: number) =>
    setLines((prev) =>
      qty <= 0
        ? prev.filter((l) => keyOf(l) !== key)
        : prev.map((l) => (keyOf(l) === key ? { ...l, qty } : l)),
    );

  const clear = () => setLines([]);

  const items = useMemo<CartLineView[]>(
    () =>
      lines
        .map((l) => {
          const product = getProduct(l.slug);
          return product
            ? { ...l, product, key: keyOf(l), lineTotal: product.price * l.qty }
            : null;
        })
        .filter((i): i is CartLineView => i !== null),
    [lines],
  );

  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.lineTotal, 0);

  return (
    <Ctx.Provider
      value={{
        items,
        count,
        subtotal,
        add,
        remove,
        setQty,
        clear,
        isOpen,
        open: () => setOpen(true),
        close: () => setOpen(false),
      }}
    >
      {children}
    </Ctx.Provider>
  );
}

export function useCart(): CartCtx {
  const c = useContext(Ctx);
  if (!c) throw new Error('useCart must be used within CartProvider');
  return c;
}
