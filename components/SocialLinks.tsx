import Link from 'next/link';
import { Camera, Music, Play, AtSign } from 'lucide-react';

// Generic glyphs (not brand logos) with accessible platform labels.
const SOCIALS = [
  { Icon: Camera, label: 'Instagram', href: '#' },
  { Icon: Music, label: 'TikTok', href: '#' },
  { Icon: Play, label: 'YouTube', href: '#' },
  { Icon: AtSign, label: 'X', href: '#' },
];

export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex gap-3 ${className}`}>
      {SOCIALS.map(({ Icon, label, href }) => (
        <Link
          key={label}
          href={href}
          aria-label={label}
          title={label}
          className="grid h-9 w-9 place-items-center rounded-full border border-white/20 text-white/70 transition hover:border-white/50 hover:text-white"
        >
          <Icon className="h-4 w-4" />
        </Link>
      ))}
    </div>
  );
}
