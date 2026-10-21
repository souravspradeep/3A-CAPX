import { useEffect, useState } from "react";
import { TrendingUp, TrendingDown } from "lucide-react";
import { FEEDS } from "@/lib/feeds";

export default function MarketPanel({ active = null, onSelect = null }) {
  const [quotes, setQuotes] = useState(() =>
    FEEDS.map(([s, ticker, n, p]) => ({ s, ticker, n, price: p, open: p, dir: 0 }))
  );

  useEffect(() => {
    const id = setInterval(() => {
      setQuotes((qs) =>
        qs.map((q) => {
          const move = (Math.random() - 0.5) * q.price * 0.0015;
          const price = +(q.price + move).toFixed(2);
          return { ...q, price, dir: move >= 0 ? 1 : -1 };
        })
      );
    }, 1500);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="px-[5vw] md:px-[8vw] pb-16 pt-12">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-[11px] tracking-[0.3em] text-primary uppercase">MARKET WATCH</div>
        <div className="text-[11px] text-muted-foreground flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          SIMULATED FEED
        </div>
      </div>

      {/* Hint when interactive */}
      {onSelect && (
        <div className="text-[10px] tracking-widest text-primary/80 mb-4 uppercase font-mono flex items-center gap-1.5">
          <span>↑</span> Click any row to switch the live backdrop feed
        </div>
      )}

      {/* Rows */}
      <div className="border border-border divide-y divide-border/60 bg-card shadow-lg">
        {quotes.map((q) => {
          const chg = ((q.price - q.open) / q.open) * 100;
          const up = q.dir >= 0;
          const isActive = q.s === active;

          return (
            <div
              key={q.s}
              onClick={onSelect ? () => onSelect(q.s) : undefined}
              className={`
                relative flex items-center gap-4 px-6 py-4 transition-all duration-200
                ${onSelect ? "cursor-pointer" : ""}
                ${isActive
                  ? "bg-primary/10 hover:bg-primary/15"
                  : "hover:bg-secondary/40"
                }
              `}
            >
              {/* Active left accent bar */}
              {isActive && (
                <span
                  className="absolute left-0 top-0 bottom-0 w-[3px] bg-primary"
                  style={{ boxShadow: "0 0 8px rgba(196,255,97,0.6)" }}
                />
              )}

              {/* Symbol chip */}
              <span
                className={`
                  font-heading font-bold text-xs w-14 tracking-widest uppercase
                  ${isActive ? "text-primary" : "text-foreground"}
                `}
              >
                {q.ticker}
              </span>

              {/* Full name */}
              <span className="hidden md:block text-xs text-zinc-300 flex-1 font-mono truncate">
                {q.n}
              </span>

              {/* Price */}
              <span
                className={`
                  tabular-nums w-28 text-right font-bold text-sm
                  ${up ? "text-primary" : "text-red-500"}
                `}
              >
                {q.price.toFixed(2)}
              </span>

              {/* % change */}
              <span
                className={`
                  w-20 text-right flex items-center justify-end gap-1 text-xs font-mono
                  ${chg >= 0 ? "text-primary" : "text-red-500"}
                `}
              >
                {chg >= 0 ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {chg >= 0 ? "+" : ""}{chg.toFixed(2)}%
              </span>

              {/* Active indicator dot */}
              {isActive && (
                <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse ml-1 shrink-0" />
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}