export function money(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
}

export const FREE_SHIP_THRESHOLD = 75;

export function shippingFor(subtotal: number): number {
  if (subtotal === 0 || subtotal >= FREE_SHIP_THRESHOLD) return 0;
  return 7;
}

export function taxFor(subtotal: number): number {
  return Math.round(subtotal * 0.0825 * 100) / 100;
}
