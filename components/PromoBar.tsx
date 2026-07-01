const PERKS = [
  'FREE SHIPPING ON ORDERS $75+',
  'EASY 60-DAY RETURNS',
  'MEMBERS GET EARLY ACCESS TO DROPS',
  'BUY NOW, PAY LATER AVAILABLE',
];

export function PromoBar() {
  // Duplicated track so the marquee loops seamlessly.
  const track = [...PERKS, ...PERKS, ...PERKS, ...PERKS];
  return (
    <div className="bg-ink text-white">
      <div className="relative overflow-hidden">
        <div className="flex w-max animate-marquee whitespace-nowrap py-2">
          {track.map((perk, i) => (
            <span
              key={i}
              className="mx-6 inline-flex items-center gap-3 text-[11px] font-medium tracking-[0.14em]"
            >
              {perk}
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
