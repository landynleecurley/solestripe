'use client';

import { Icon } from '@iconify/react';

// Monochrome brand glyphs (currentColor) via Iconify. Uniform height, dim by
// default, highlight on hover.
const METHODS = [
  { icon: 'fa6-brands:cc-visa', label: 'Visa' },
  { icon: 'fa6-brands:cc-mastercard', label: 'Mastercard' },
  { icon: 'fa6-brands:cc-amex', label: 'American Express' },
  { icon: 'fa6-brands:cc-paypal', label: 'PayPal' },
  { icon: 'fa6-brands:cc-apple-pay', label: 'Apple Pay' },
];

export function PaymentMethods({
  variant = 'light',
  className = '',
}: {
  variant?: 'light' | 'dark';
  className?: string;
}) {
  const tone =
    variant === 'dark' ? 'text-white/45 hover:text-white' : 'text-ink/35 hover:text-ink';
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {METHODS.map(({ icon, label }) => (
        <span
          key={label}
          title={label}
          aria-label={label}
          className={`transition-colors ${tone}`}
        >
          <Icon icon={icon} height={26} />
        </span>
      ))}
    </div>
  );
}
