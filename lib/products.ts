// The SoleStripe catalog. All original brands/models — no real trademarks.
// Product imagery is rendered from these colorways by <SneakerImage>.

export type Colorway = {
  name: string;
  upper: string; // main body
  sole: string; // midsole
  accent: string; // stripe / laces / logo
};

export type Category = 'men' | 'women' | 'kids' | 'unisex';
export type SneakerType = 'basketball' | 'running' | 'lifestyle' | 'skate' | 'training';
export type Badge = 'New' | 'Sale' | 'Hot' | 'Exclusive';

export type Product = {
  slug: string;
  name: string;
  brand: string;
  category: Category;
  type: SneakerType;
  price: number;
  compareAt?: number; // original price when on sale
  colorways: Colorway[];
  sizes: number[];
  soldOut?: number[]; // sizes with no stock
  rating: number;
  reviews: number;
  badge?: Badge;
  description: string;
  releaseDate?: string; // ISO — powers the Release Calendar
};

export const MEN_SIZES = [7, 7.5, 8, 8.5, 9, 9.5, 10, 10.5, 11, 11.5, 12, 13];
export const WOMEN_SIZES = [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10, 11];
export const KIDS_SIZES = [3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7];

const sizesFor = (c: Category) =>
  c === 'women' ? WOMEN_SIZES : c === 'kids' ? KIDS_SIZES : MEN_SIZES;

// Reusable colorway palettes.
const CW = {
  black: { name: 'Triple Black', upper: '#1b1b1f', sole: '#2b2b31', accent: '#5b5b66' },
  whiteRed: { name: 'White / Crimson', upper: '#f4f4f5', sole: '#ffffff', accent: '#e4002b' },
  courtBlue: { name: 'Court Blue', upper: '#1e3a8a', sole: '#ffffff', accent: '#f59e0b' },
  volt: { name: 'Volt Strike', upper: '#17171a', sole: '#e9e9ea', accent: '#c6f000' },
  crimson: { name: 'Crimson', upper: '#b4122a', sole: '#ffffff', accent: '#17171a' },
  gum: { name: 'Sail / Gum', upper: '#efe7d2', sole: '#d7b483', accent: '#7a5a30' },
  storm: { name: 'Storm Grey', upper: '#9aa1ab', sole: '#f3f4f6', accent: '#17171a' },
  green: { name: 'Pine Spark', upper: '#0b5e42', sole: '#ecfdf5', accent: '#a3e635' },
  royal: { name: 'Royal', upper: '#1d4ed8', sole: '#ececed', accent: '#fde047' },
  pink: { name: 'Pink Pop', upper: '#ec4899', sole: '#ffffff', accent: '#17171a' },
  orange: { name: 'Blaze', upper: '#ea580c', sole: '#fff7ed', accent: '#17171a' },
  purple: { name: 'Purple Haze', upper: '#6d28d9', sole: '#f5f3ff', accent: '#22d3ee' },
  ice: { name: 'Ice', upper: '#7dd3fc', sole: '#ffffff', accent: '#0284c7' },
  mocha: { name: 'Mocha', upper: '#6f4e37', sole: '#efe6d9', accent: '#c9a273' },
  bone: { name: 'Bone', upper: '#e7e1d5', sole: '#f8f6f1', accent: '#a8a29e' },
  teal: { name: 'Teal Rush', upper: '#0d9488', sole: '#f0fdfa', accent: '#f97316' },
} as const;

type Draft = Omit<Product, 'sizes' | 'rating' | 'reviews'> &
  Partial<Pick<Product, 'sizes' | 'rating' | 'reviews'>>;

const DRAFTS: Draft[] = [
  {
    slug: 'apex-vortex-1',
    name: 'Apex Vortex 1',
    brand: 'Apex',
    category: 'men',
    type: 'basketball',
    price: 165,
    colorways: [CW.crimson, CW.black, CW.courtBlue],
    badge: 'Hot',
    soldOut: [7, 12],
    reviews: 214,
    rating: 4.7,
    description:
      'Explosive court coverage with a full-length responsive plate and a lockdown midfoot cage. Built for the first step and everything after.',
  },
  {
    slug: 'apex-glide-run',
    name: 'Apex Glide',
    brand: 'Apex',
    category: 'men',
    type: 'running',
    price: 140,
    colorways: [CW.volt, CW.storm, CW.royal],
    badge: 'New',
    description:
      'Daily-trainer cushioning that stays springy mile after mile. A breathable engineered mesh keeps things cool on the long ones.',
  },
  {
    slug: 'volt-surge-2',
    name: 'Volt Surge 2',
    brand: 'Volt',
    category: 'unisex',
    type: 'running',
    price: 155,
    compareAt: 185,
    colorways: [CW.orange, CW.black, CW.ice],
    badge: 'Sale',
    reviews: 512,
    rating: 4.8,
    description:
      'A carbon-infused race-day shoe that begs to be pushed. Feather-light with an aggressive forward roll through toe-off.',
  },
  {
    slug: 'volt-signal-low',
    name: 'Volt Signal Low',
    brand: 'Volt',
    category: 'men',
    type: 'lifestyle',
    price: 110,
    colorways: [CW.whiteRed, CW.bone, CW.green],
    description:
      'A clean, everyday low-top with premium leather overlays and a cushioned collar. Goes with everything in the rotation.',
  },
  {
    slug: 'halo-cloud',
    name: 'Halo Cloud',
    brand: 'Halo',
    category: 'women',
    type: 'lifestyle',
    price: 120,
    colorways: [CW.pink, CW.bone, CW.ice],
    badge: 'New',
    reviews: 388,
    rating: 4.9,
    description:
      'Pillow-soft foam wrapped in a sleek, minimal upper. All-day comfort that never looks like it is trying too hard.',
  },
  {
    slug: 'halo-court-og',
    name: 'Halo Court OG',
    brand: 'Halo',
    category: 'men',
    type: 'basketball',
    price: 130,
    colorways: [CW.whiteRed, CW.courtBlue, CW.black],
    badge: 'Exclusive',
    reviews: 1024,
    rating: 4.6,
    description:
      'The hardwood classic, reissued. Full-grain leather, a boxy retro silhouette, and that unmistakable stripe.',
  },
  {
    slug: 'strada-classic-70',
    name: 'Strada Classic 70',
    brand: 'Strada',
    category: 'unisex',
    type: 'lifestyle',
    price: 95,
    colorways: [CW.bone, CW.crimson, CW.green],
    reviews: 640,
    rating: 4.5,
    description:
      'A timeless terrace silhouette with a suede toe and a slim cupsole. Effortless heritage style, priced to grab two.',
  },
  {
    slug: 'strada-trail-gtx',
    name: 'Strada Trail GTX',
    brand: 'Strada',
    category: 'men',
    type: 'running',
    price: 175,
    colorways: [CW.mocha, CW.green, CW.storm],
    badge: 'New',
    description:
      'Grippy lugs and a weatherproof shell for the days the pavement runs out. Rugged protection without the weight penalty.',
  },
  {
    slug: 'cadence-tempo',
    name: 'Cadence Tempo',
    brand: 'Cadence',
    category: 'women',
    type: 'running',
    price: 150,
    colorways: [CW.teal, CW.purple, CW.whiteRed],
    reviews: 296,
    rating: 4.7,
    description:
      'The everyday tempo shoe. Snappy enough for intervals, plush enough for recovery — a true one-quiver trainer.',
  },
  {
    slug: 'cadence-loft',
    name: 'Cadence Loft',
    brand: 'Cadence',
    category: 'unisex',
    type: 'lifestyle',
    price: 105,
    compareAt: 130,
    colorways: [CW.storm, CW.bone, CW.black],
    badge: 'Sale',
    description:
      'Chunky, cozy, and quietly premium. A lifestyle cruiser with a knit upper and a marshmallow midsole.',
  },
  {
    slug: 'nomad-ridge',
    name: 'Nomad Ridge',
    brand: 'Nomad',
    category: 'men',
    type: 'skate',
    price: 85,
    colorways: [CW.gum, CW.black, CW.crimson],
    reviews: 178,
    rating: 4.4,
    description:
      'A vulcanized skate staple with a reinforced ollie zone and a sticky gum outsole. Board feel you can trust.',
  },
  {
    slug: 'nomad-drift',
    name: 'Nomad Drift',
    brand: 'Nomad',
    category: 'unisex',
    type: 'skate',
    price: 78,
    colorways: [CW.storm, CW.teal, CW.bone],
    description:
      'Low-profile and locked-in. A suede-and-canvas slip-friendly build that breaks in fast and lasts.',
  },
  {
    slug: 'torque-lift',
    name: 'Torque Lift',
    brand: 'Torque',
    category: 'men',
    type: 'training',
    price: 135,
    colorways: [CW.black, CW.volt, CW.royal],
    badge: 'Hot',
    reviews: 402,
    rating: 4.6,
    description:
      'A flat, stable platform for heavy days, with a flexible forefoot for the metcon after. Train everything in one shoe.',
  },
  {
    slug: 'torque-circuit',
    name: 'Torque Circuit',
    brand: 'Torque',
    category: 'women',
    type: 'training',
    price: 125,
    colorways: [CW.pink, CW.teal, CW.storm],
    badge: 'New',
    description:
      'Quick, grippy, and secure through lateral cuts. The class-to-class studio shoe that keeps up with the whole circuit.',
  },
  {
    slug: 'apex-vortex-low',
    name: 'Apex Vortex Low',
    brand: 'Apex',
    category: 'men',
    type: 'basketball',
    price: 145,
    colorways: [CW.purple, CW.orange, CW.black],
    reviews: 88,
    rating: 4.5,
    description:
      'The Vortex, cut down for speed. Lower to the floor for a faster feel without giving up the signature cushioning.',
  },
  {
    slug: 'halo-cloud-kids',
    name: 'Halo Cloud (Kids)',
    brand: 'Halo',
    category: 'kids',
    type: 'lifestyle',
    price: 70,
    colorways: [CW.ice, CW.pink, CW.volt],
    badge: 'New',
    description:
      'Grown-up comfort, kid-proof durability, and an easy strap-and-lace closure. The Cloud they will actually keep on.',
  },
  {
    slug: 'strada-classic-kids',
    name: 'Strada Classic (Kids)',
    brand: 'Strada',
    category: 'kids',
    type: 'lifestyle',
    price: 60,
    colorways: [CW.whiteRed, CW.green, CW.royal],
    description:
      'The heritage terrace look, sized down. A wipe-clean upper and a hook-and-loop strap for the little collector.',
  },
  {
    slug: 'volt-surge-kids',
    name: 'Volt Surge (Kids)',
    brand: 'Volt',
    category: 'kids',
    type: 'running',
    price: 75,
    colorways: [CW.orange, CW.teal, CW.purple],
    badge: 'Hot',
    description:
      'Lightweight bounce for recess sprints and everything in between. Reflective hits keep them seen after dark.',
  },
  {
    slug: 'cadence-tempo-og',
    name: 'Cadence Tempo OG',
    brand: 'Cadence',
    category: 'men',
    type: 'running',
    price: 160,
    colorways: [CW.royal, CW.crimson, CW.black],
    badge: 'Exclusive',
    reviews: 731,
    rating: 4.8,
    description:
      'The original Tempo, re-tooled with a plated midsole. A cult favorite that finally gets the propulsion it deserves.',
  },
  {
    slug: 'halo-court-mid',
    name: 'Halo Court Mid',
    brand: 'Halo',
    category: 'unisex',
    type: 'lifestyle',
    price: 125,
    colorways: [CW.mocha, CW.bone, CW.crimson],
    description:
      'A mid-cut take on the hardwood icon. Padded ankle support and a lifestyle-ready leather build for off-court days.',
  },
  {
    slug: 'apex-glide-x',
    name: 'Apex Glide X',
    brand: 'Apex',
    category: 'women',
    type: 'running',
    price: 170,
    compareAt: 200,
    colorways: [CW.purple, CW.teal, CW.pink],
    badge: 'Sale',
    reviews: 145,
    rating: 4.7,
    description:
      'The premium Glide, maxed out. A taller stack and a rocker geometry make the long run feel a little more like flying.',
  },
  {
    slug: 'torque-lift-pro',
    name: 'Torque Lift Pro',
    brand: 'Torque',
    category: 'unisex',
    type: 'training',
    price: 150,
    colorways: [CW.black, CW.storm, CW.volt],
    badge: 'New',
    description:
      'A dense, incompressible heel for the platform, a locked heel for the pull, and a strap for the send. Numbers go up.',
  },
  {
    slug: 'nomad-ridge-hi',
    name: 'Nomad Ridge Hi',
    brand: 'Nomad',
    category: 'men',
    type: 'skate',
    price: 92,
    colorways: [CW.black, CW.crimson, CW.gum],
    description:
      'High-top protection with the same trusted vulcanized feel. Ankle padding for the gaps and a toe cap that lasts.',
  },
  {
    slug: 'volt-signal-hi',
    name: 'Volt Signal Hi',
    brand: 'Volt',
    category: 'women',
    type: 'lifestyle',
    price: 118,
    colorways: [CW.bone, CW.pink, CW.ice],
    reviews: 210,
    rating: 4.6,
    description:
      'The Signal, elevated. A sleek high-top collar and tonal overlays make it the easy statement piece of the fit.',
  },
];

export const PRODUCTS: Product[] = DRAFTS.map((d) => ({
  rating: 4.5,
  reviews: 120,
  ...d,
  sizes: d.sizes ?? sizesFor(d.category),
}));

export const BRANDS = Array.from(new Set(PRODUCTS.map((p) => p.brand))).sort();
export const TYPES: SneakerType[] = ['basketball', 'running', 'lifestyle', 'skate', 'training'];
export const CATEGORIES: Category[] = ['men', 'women', 'kids', 'unisex'];

export const TYPE_LABELS: Record<SneakerType, string> = {
  basketball: 'Basketball',
  running: 'Running',
  lifestyle: 'Lifestyle',
  skate: 'Skate',
  training: 'Training',
};

export const CATEGORY_LABELS: Record<Category, string> = {
  men: "Men's",
  women: "Women's",
  kids: 'Kids',
  unisex: 'Unisex',
};

export function getProduct(slug: string): Product | undefined {
  return PRODUCTS.find((p) => p.slug === slug);
}

export function related(product: Product, n = 4): Product[] {
  return PRODUCTS.filter(
    (p) => p.slug !== product.slug && (p.type === product.type || p.brand === product.brand),
  )
    .slice(0, n);
}

export function isOnSale(p: Product): boolean {
  return typeof p.compareAt === 'number' && p.compareAt > p.price;
}

export function discountPct(p: Product): number {
  if (!isOnSale(p) || !p.compareAt) return 0;
  return Math.round(((p.compareAt - p.price) / p.compareAt) * 100);
}
