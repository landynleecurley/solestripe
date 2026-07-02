import { CreditCard, Wallet, Nfc, Smartphone } from 'lucide-react';

const METHODS = [
  { Icon: CreditCard, label: 'Credit & debit cards' },
  { Icon: Wallet, label: 'Digital wallet' },
  { Icon: Nfc, label: 'Tap to pay' },
  { Icon: Smartphone, label: 'Mobile pay' },
];

export function PaymentMethods({
  variant = 'light',
  className = '',
}: {
  variant?: 'light' | 'dark';
  className?: string;
}) {
  const tile = variant === 'dark' ? 'border-white/20 text-white/70' : 'border-line text-muted';
  return (
    <div className={`flex gap-2 ${className}`}>
      {METHODS.map(({ Icon, label }) => (
        <span
          key={label}
          title={label}
          aria-label={label}
          className={`grid h-7 w-10 place-items-center rounded-md border ${tile}`}
        >
          <Icon className="h-4 w-5" strokeWidth={1.75} />
        </span>
      ))}
    </div>
  );
}
