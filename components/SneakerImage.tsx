import type { Colorway } from '@/lib/products';

// A fully original, flat-illustration sneaker rendered in the product's
// colorway — no scraped photos, so the whole catalog looks cohesive.
export function SneakerImage({
  colorway,
  className,
}: {
  colorway: Colorway;
  className?: string;
}) {
  const { upper, sole, accent } = colorway;
  const ink = '#17171a';
  return (
    <svg
      viewBox="0 0 460 300"
      className={className}
      role="img"
      aria-hidden
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* contact shadow */}
      <ellipse cx="228" cy="266" rx="176" ry="10" fill="#000" opacity="0.10" />

      {/* midsole */}
      <path
        d="M46,230 C34,225 37,208 56,204 C110,197 178,199 238,199 C310,199 376,198 416,205 C432,207 431,227 416,234 C406,240 388,242 366,242 L88,242 C68,242 55,237 46,230 Z"
        fill={sole}
        stroke={ink}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* outsole shade */}
      <path
        d="M54,235 L419,229 C419,239 411,242 399,242 L80,242 C67,242 58,239 54,235 Z"
        fill="#000"
        opacity="0.20"
      />
      {/* midsole seam */}
      <path d="M62,220 L414,215" stroke={ink} strokeWidth="2" opacity="0.22" />

      {/* upper — rounded toe, tongue bump, collar notch, heel counter */}
      <path
        d="M56,206 C50,174 58,148 84,132 C106,118 148,112 194,112 C222,112 242,114 254,118 C260,108 274,96 290,98 C304,100 310,118 312,138 C314,148 320,150 334,150 C348,150 354,148 358,136 C364,116 382,106 398,114 C418,124 422,148 422,180 C422,196 421,204 421,206 Z"
        fill={upper}
        stroke={ink}
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* toe-cap shading */}
      <path d="M56,206 C50,176 59,150 82,134 C88,158 86,186 88,206 Z" fill="#000" opacity="0.08" />

      {/* heel counter accent */}
      <path
        d="M400,118 C416,128 420,150 420,180 L400,180 C400,152 396,130 400,118 Z"
        fill={accent}
        opacity="0.9"
      />

      {/* side swoosh */}
      <path
        d="M120,180 C190,158 292,152 372,170 C376,171 377,176 372,178 C298,164 206,172 138,192 C130,195 116,188 120,180 Z"
        fill={accent}
        stroke={ink}
        strokeWidth="2"
        strokeLinejoin="round"
      />

      {/* laces */}
      <g stroke={ink} strokeWidth="6" strokeLinecap="round">
        <line x1="146" y1="132" x2="250" y2="120" />
        <line x1="146" y1="144" x2="250" y2="132" />
        <line x1="148" y1="156" x2="248" y2="144" />
        <line x1="152" y1="168" x2="244" y2="156" />
      </g>

      {/* collar opening */}
      <path
        d="M312,138 C316,148 324,151 336,150 C332,144 330,138 328,134 C322,134 316,135 312,138 Z"
        fill={ink}
        opacity="0.85"
      />
      {/* tongue accent */}
      <line x1="268" y1="108" x2="286" y2="104" stroke={accent} strokeWidth="4" strokeLinecap="round" />

      {/* logo dot */}
      <circle cx="110" cy="176" r="7" fill={accent} stroke={ink} strokeWidth="2.5" />
    </svg>
  );
}
