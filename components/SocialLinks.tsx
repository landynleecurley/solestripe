'use client';

import Link from 'next/link';
import { Icon } from '@iconify/react';

// Official colored brand logos via Iconify (logos: set), in white chips so
// each full-color mark stays legible on the dark footer.
const SOCIALS = [
  { icon: 'logos:instagram-icon', label: 'Instagram' },
  { icon: 'logos:tiktok-icon', label: 'TikTok' },
  { icon: 'logos:youtube-icon', label: 'YouTube' },
  { icon: 'logos:twitter', label: 'Twitter' },
];

export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex gap-2.5 ${className}`}>
      {SOCIALS.map(({ icon, label }) => (
        <Link
          key={label}
          href="#"
          aria-label={label}
          title={label}
          className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm transition hover:scale-110"
        >
          <Icon icon={icon} height={20} />
        </Link>
      ))}
    </div>
  );
}
