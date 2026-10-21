import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, BarChart3, Terminal } from "lucide-react";
import LiveChart from "@/components/site/LiveChart";
import MarketPanel from "@/components/site/MarketPanel";
import { FEEDS } from "@/lib/feeds";

// ─── Static content ────────────────────────────────────────────────────────────
const specs = [
  { label: "CAPITAL ALLOCATION", val: "100%",        sub: "Internal Balance Sheet",    accent: true  },
  { label: "PRIMARY DERIVATIVE", val: "MNQ",          sub: "CME Micro E-mini Nasdaq",  accent: false },
  { label: "DAILY LOSS CAP",     val: "2.0%",         sub: "Automated Circuit Breaker", accent: true  },
  { label: "EXECUTION WINDOW",   val: "08:30–11:00",  sub: "NY Session Peak Liquidity", accent: false },
];

const pillars = [
  {
    num: "01", tag: "Price Delivery", title: "Structural Mechanics",
    desc: "Mapping liquidity sweeps, Fair Value Gaps (FVG), order flow dynamics, and multi-timeframe structural shifts to identify institutional order delivery.",
    points: [
      "Identify high-timeframe liquidity pools at session highs and lows",
      "Verify 3-candle institutional displacement imbalances",
      "Filter low-probability chop through directional bias",
    ],
  },
  {
    num: "02", tag: "Codified Rules", title: "Mechanical Execution",
    desc: "Eliminating emotion. Executions are dictated by strict rules, predefined setups, and multi-timeframe models — zero hesitation.",
    points: [
      "Strict entry trigger via Change in State of Delivery (CISD)",
      "Predefined bracket stop-loss and limit targets",
      "Zero subjective discretion during market killzones",
    ],
  },
  {
    num: "03", tag: "Risk Engine", title: "Risk Governance",
    desc: "Strict daily loss thresholds, dynamic position sizing, and asymmetric risk-to-reward parameters enforcing capital preservation.",
    points: [
      "Asymmetric expectancy requirement: Minimum 1:2.0 RR",
      "Automated 2.0% daily maximum portfolio drawdown cap",
      "Zero-latency broker-attached risk breakers",
    ],
  },
];

// ─── Helpers ───────────────────────────────────────────────────────────────────
// FEEDS shape: [symbol, shortTicker, name, seedPrice]
const FEED_MAP = Object.fromEntries(FEEDS.map(([sym, , , price]) => [sym, price]));

export default function Home() {
  // Active feed drives both the backdrop chart and the MarketPanel highlight
  const [activeFeed, setActiveFeed] = useState(FEEDS[0][0]); // "MNQ1!" by default

  const activeSeed  = FEED_MAP[activeFeed] ?? FEEDS[0][3];
  const activeTicker = FEEDS.find(([s]) => s === activeFeed)?.[1] ?? "MNQ";

  return (
    <>
      {/* ── Full-viewport backdrop chart (z-index 0, pointer-events none) ──── */}
      <LiveChart key={activeFeed} symbol={activeFeed} seed={activeSeed} backdrop />

      {/* ── All page content sits above the chart (z-index ≥ 1) ─────────────── */}
      <div className="relative" style={{ zIndex: 1 }}>

        {/* ═══ HERO ══════════════════════════════════════════════════════════════ */}
        <section className="px-[5vw] md:px-[8vw] pt-12 md:pt-16 pb-12 border-b border-border/60 min-h-[calc(100vh-4.5rem)] flex flex-col justify-center relative">
          {/* Headline */}
          <h1
            className="font-heading font-bold uppercase text-3xl sm:text-5xl lg:text-6xl leading-[1.1] tracking-tight animate-rise max-w-4xl"
            style={{ animationDelay: "0.1s" }}
          >
            Proprietary Strategy.<br />
            <span className="text-primary" style={{ textShadow: "0 0 32px rgba(196,255,97,0.35)" }}>
              Mechanical Precision.
            </span>
          </h1>

          {/* Subhead */}
          <p
            className="mt-4 text-zinc-300 text-sm md:text-base max-w-2xl leading-relaxed animate-rise"
            style={{ animationDelay: "0.15s" }}
          >
            Deploying internal capital through advanced rule-based playbooks,
            structural liquidity mechanics, and institutional-grade risk governance.
          </p>

          {/* ── Symbol Chips ────────────────────────────────────────────────────── */}
          <div
            className="mt-6 flex flex-wrap items-center gap-2 animate-rise"
            style={{ animationDelay: "0.2s" }}
          >
            <span className="text-[10px] tracking-[0.25em] text-muted-foreground uppercase font-mono mr-1">
              LIVE FEED //
            </span>
            {FEEDS.map(([sym, ticker]) => {
              const isActive = sym === activeFeed;
              return (
                <button
                  key={sym}
                  onClick={() => setActiveFeed(sym)}
                  className={`
                    px-3.5 py-1 font-heading font-bold text-[11px] tracking-wider uppercase
                    border transition-all duration-150
                    ${isActive
                      ? "bg-primary text-primary-foreground border-primary shadow-[0_0_12px_rgba(196,255,97,0.4)]"
                      : "bg-background/80 backdrop-blur-md text-muted-foreground border-border hover:border-primary/60 hover:text-foreground"
                    }
                  `}
                >
                  {ticker}
                </button>
              );
            })}
          </div>

          {/* ── CTA Buttons ─────────────────────────────────────────────────────── */}
          <div className="mt-5 flex flex-wrap gap-3 animate-rise" style={{ animationDelay: "0.25s" }}>
            <Link
              to="/performance"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-primary text-primary-foreground font-heading font-bold text-xs uppercase tracking-wider hover:bg-primary/90 transition-all shadow-[0_0_20px_rgba(196,255,97,0.25)]"
            >
              <BarChart3 size={15} />
              View Live Performance
              <ArrowUpRight size={13} />
            </Link>
            <Link
              to="/philosophy"
              className="inline-flex items-center gap-2 px-5 py-2.5 border border-border/80 bg-background/80 backdrop-blur-md text-foreground font-heading font-bold text-xs uppercase tracking-wider hover:border-primary hover:text-primary transition-all"
            >
              <Terminal size={15} />
              Explore Methodology
            </Link>
          </div>

          {/* ── Quick Specs Bar ──────────────────────────────────────────────────── */}
          <div
            className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-px bg-border/50 animate-rise"
            style={{ animationDelay: "0.3s" }}
          >
            {specs.map((s) => (
              <div
                key={s.label}
                className="bg-background/90 backdrop-blur-md p-4 flex flex-col justify-between border border-border/30 group hover:bg-background transition-colors"
              >
                <div className="text-[10px] tracking-[0.2em] text-muted-foreground uppercase">{s.label}</div>
                <div className={`font-heading font-bold text-xl md:text-2xl my-1.5 ${s.accent ? "text-primary" : "text-foreground"}`}>
                  {s.val}
                </div>
                <div className="text-[11px] text-muted-foreground">{s.sub}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ FIRM OVERVIEW ═════════════════════════════════════════════════════ */}
        <section className="px-[5vw] md:px-[8vw] py-16 border-b border-border/60 bg-background">
          <div className="text-[11px] tracking-[0.3em] text-primary uppercase mb-4">01 / FIRM OVERVIEW</div>
          <div className="grid md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-8">
              <h2 className="font-heading font-bold uppercase text-2xl md:text-4xl leading-snug">
                Complex Structural Systems Driven by Liquidity &amp; Algorithmic Delivery
              </h2>
              <p className="mt-6 text-zinc-300 text-base md:text-lg leading-relaxed">
                3A CapX is a private proprietary trading firm founded on a singular core truth: markets are
                complex structural systems driven by liquidity, order delivery, and algorithmic execution.
                We operate exclusively on 100% internal capital across global financial derivatives,
                focusing primarily on high-volume index and commodity futures markets.
              </p>
            </div>
            <div className="md:col-span-4 border border-primary/40 bg-primary/5 p-6 flex flex-col justify-center">
              <div className="text-[10px] tracking-[0.3em] text-primary uppercase font-mono">CORE DICTUM</div>
              <blockquote className="mt-3 font-heading font-bold text-lg md:text-xl text-primary leading-tight">
                &ldquo;PROCESS ALWAYS PRECEDES PROFIT.&rdquo;
              </blockquote>
              <p className="mt-3 text-xs text-muted-foreground">
                Mechanical rules supersede intuition in all market regimes.
              </p>
            </div>
          </div>
        </section>

        {/* ═══ THREE PILLARS ══════════════════════════════════════════════════════ */}
        <section className="px-[5vw] md:px-[8vw] py-16 border-b border-border/60 bg-background">
          <div className="text-[11px] tracking-[0.3em] text-primary uppercase">SYSTEMATIC ARCHITECTURE</div>
          <h2 className="font-heading font-bold uppercase text-2xl md:text-4xl mt-2 mb-10">
            The Three Pillars of Operational Edge
          </h2>

          <div className="grid md:grid-cols-3 gap-6">
            {pillars.map((p) => (
              <div
                key={p.num}
                className="border border-border bg-card p-6 md:p-8 relative group hover:border-primary transition-all"
              >
                <div className="flex items-center justify-between mb-4">
                  <span className="font-heading font-bold text-primary text-xl">{p.num}</span>
                  <span className="text-[10px] uppercase tracking-widest px-2 py-1 bg-secondary text-foreground font-mono">
                    {p.tag}
                  </span>
                </div>
                <h3 className="font-heading font-bold uppercase text-base tracking-wider mb-3">{p.title}</h3>
                <p className="text-sm text-zinc-400 mb-6 leading-relaxed">{p.desc}</p>
                <ul className="space-y-2 text-xs text-zinc-400 border-t border-border pt-4">
                  {p.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-primary mt-0.5">▪</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ═══ MARKET WATCH — clicking a row switches the backdrop feed ══════════ */}
        <div className="bg-background">
          <MarketPanel active={activeFeed} onSelect={setActiveFeed} />
        </div>
      </div>
    </>
  );
}
