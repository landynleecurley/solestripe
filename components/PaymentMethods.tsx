'use client';

import { Icon } from '@iconify/react';

// Official colored brand logos via Iconify (logos: set), seated in white
// chips so each mark stays legible on both light and dark backgrounds.
const METHODS = [
  { icon: 'logos:visa', label: 'Visa' },
  { icon: 'logos:mastercard', label: 'Mastercard' },
  { icon: 'logos:amex', label: 'American Express' },
  { icon: 'logos:paypal', label: 'PayPal' },
  { icon: 'logos:apple-pay', label: 'Apple Pay' },
];

export function PaymentMethods({ className = '' }: { className?: string }) {
  return (
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {METHODS.map(({ icon, label }) => (
        <span
          key={label}
          title={label}
          aria-label={label}
          className="inline-flex h-7 items-center justify-center rounded-md bg-white px-2 shadow-sm ring-1 ring-black/5"
        >
          <Icon icon={icon} height={18} />
        </span>
      ))}
    </div>
  );
}
