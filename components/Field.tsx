import type { ComponentProps, ReactNode } from 'react';

const base =
  'w-full rounded-xl border px-4 py-3 text-sm outline-none transition focus:border-ink';

export function Field({
  label,
  hint,
  ...props
}: { label: string; hint?: string } & ComponentProps<'input'>) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-muted">{label}</span>
      <input className={base} {...props} />
      {hint && <span className="mt-1 block text-xs text-muted">{hint}</span>}
    </label>
  );
}

export function Textarea({
  label,
  ...props
}: { label: string } & ComponentProps<'textarea'>) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-muted">{label}</span>
      <textarea className={base} {...props} />
    </label>
  );
}

export function SelectField({
  label,
  children,
  ...props
}: { label: string; children: ReactNode } & ComponentProps<'select'>) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-muted">{label}</span>
      <select className={`${base} bg-white`} {...props}>
        {children}
      </select>
    </label>
  );
}
