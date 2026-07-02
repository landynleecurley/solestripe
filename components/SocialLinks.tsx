'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';

// Monochrome brand glyphs (currentColor). Uniform height, dim by default,
// highlight on hover.
const SOCIALS = [
  { icon: 'fa6-brands:instagram', label: 'Instagram' },
  { icon: 'fa6-brands:tiktok', label: 'TikTok' },
  { icon: 'fa6-brands:youtube', label: 'YouTube' },
  { icon: 'fa6-brands:x-twitter', label: 'X' },
];

export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {SOCIALS.map(({ icon, label }) => (
        <Link
          key={label}
          href="#"
          aria-label={label}
          title={label}
          className="text-white/50 transition-colors hover:text-white"
        >
          <Icon icon={icon} height={22} />
        </Link>
      ))}
    </div>
  );
}
