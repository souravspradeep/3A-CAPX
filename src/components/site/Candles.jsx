const bars = [30, 45, 38, 60, 52, 70, 48, 66, 80, 62, 88, 74, 95, 82, 70, 90, 100, 84];

export default function Candles({ className = "" }) {
  return (
    <div className={`flex items-end gap-2 md:gap-4 pointer-events-none ${className}`} aria-hidden="true">
      {bars.map((h, i) => (
        <div key={i} className="flex flex-col items-center flex-1" style={{ height: `${h}%` }}>
          <div className="w-px flex-1 bg-primary/30" />
          <div className={`w-full ${i % 4 === 3 ? "bg-secondary" : "bg-primary/25"}`} style={{ height: "45%" }} />
          <div className="w-px h-4 bg-primary/30" />
        </div>
      ))}
    </div>
  );
}