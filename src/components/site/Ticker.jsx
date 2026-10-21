const items = [
  "MNQ · MICRO E-MINI NASDAQ-100",
  "DAILY LOSS CAP 2.0%",
  "MIN R:R 1:2.0",
  "TARGET R:R 1:3.0 – 1:5.0",
  "NY KILLZONE 08:30–11:00 EST",
  "100% PROPRIETARY CAPITAL",
  "PROCESS ALWAYS PRECEDES PROFIT",
];

export default function Ticker() {
  const row = [...items, ...items];
  return (
    <div className="overflow-hidden border-b border-border bg-background h-8 flex items-center">
      <div className="flex whitespace-nowrap animate-ticker w-max">
        {row.map((t, i) => (
          <span key={i} className="text-[11px] tracking-widest text-muted-foreground px-6">
            <span className="text-primary mr-2">▲</span>{t}
          </span>
        ))}
      </div>
    </div>
  );
}