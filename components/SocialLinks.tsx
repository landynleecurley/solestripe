import Link from 'next/link';
import { Instagram, TikTok, YouTube, Twitter } from 'developer-icons';

// Official brand logos from the developer-icons package, seated in white
// chips so every full-color mark stays legible on the dark footer.
const SOCIALS = [
  { Icon: Instagram, label: 'Instagram' },
  { Icon: TikTok, label: 'TikTok' },
  { Icon: YouTube, label: 'YouTube' },
  { Icon: Twitter, label: 'Twitter' },
];

export function SocialLinks({ className = '' }: { className?: string }) {
  return (
    <div className={`flex gap-2.5 ${className}`}>
      {SOCIALS.map(({ Icon, label }) => (
        <Link
          key={label}
          href="#"
          aria-label={label}
          title={label}
          className="grid h-9 w-9 place-items-center rounded-full bg-white shadow-sm transition hover:scale-110"
        >
          <Icon size={20} />
        </Link>
      ))}
    </div>
  );
}
