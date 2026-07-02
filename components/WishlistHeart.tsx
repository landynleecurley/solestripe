'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { useWishlist } from '@/lib/wishlist';

export function WishlistHeart({
  slug,
  className = '',
  iconClass = 'h-4 w-4',
}: {
  slug: string;
  className?: string;
  iconClass?: string;
}) {
  const { has, toggle } = useWishlist();
  const saved = has(slug);
  const [anim, setAnim] = useState(false);

  const onClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!saved) setAnim(true); // burst only when adding
    toggle(slug);
  };

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={saved}
      aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
      className={className}
    >
      <span className="relative inline-grid place-items-center">
        <Heart
          className={`${iconClass} transition-colors ${saved ? 'fill-accent text-accent' : ''} ${
            anim ? 'heart-pop' : ''
          }`}
          onAnimationEnd={() => setAnim(false)}
        />
        {anim && (
          <Heart
            aria-hidden
            className={`heart-float pointer-events-none absolute inset-0 fill-accent text-accent ${iconClass}`}
          />
        )}
      </span>
    </button>
  );
}
