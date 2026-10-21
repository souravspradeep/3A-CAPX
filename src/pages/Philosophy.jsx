import PageHeader from "@/components/site/PageHeader";

const framework = [
  ["High-Timeframe (HTF) Structural Bias", "Price moves between Liquidity Pools and Inefficiencies (Fair Value Gaps). We establish directional context on Weekly, Daily, and 4H charts."],
  ["Liquidity Sweeps & Invalidation", "Waiting for equal highs/lows or session extremes to be swept into HTF key levels before anticipating reversals."],
  ["Energetic Displacement & Fair Value Gaps (FVG)", "Identifying 3-candle institutional displacement imbalance zones following liquidity runs."],
  ["Change in State of Delivery (CISD)", "Entry refinement on 1m–5m timeframes targeting mechanical trend transition points."],
];
const risk = [
  ["Asymmetric Expectancy", "Minimum setup filter of 1:2.0 Risk-to-Reward Ratio (targeting 1:3.0 to 1:5.0)."],
  ["Strict Daily Loss Cap", "2.0% Maximum Portfolio Loss. Reaching this threshold automatically halts order routing for 24 hours."],
  ["Session Precision", "Executing strictly during peak liquidity killzones (NY Session Open: 08:30 AM – 11:00 AM EST)."],
];

function Rows({ items }) {
  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map(([t, d], i) => (
        <div key={t} className="grid md:grid-cols-12 gap-4 py-8 group hover:bg-card transition-colors px-2">
          <span className="md:col-span-1 text-primary text-sm">{String(i + 1).padStart(2, "0")}</span>
          <h3 className="md:col-span-4 font-heading font-bold uppercase text-xs tracking-wider leading-relaxed">{t}</h3>
          <p className="md:col-span-7 text-muted-foreground">{d}</p>
        </div>
      ))}
    </div>
  );
}

export default function Philosophy() {
  return (
    <>
      <PageHeader index="03" eyebrow="TRADING PHILOSOPHY & STRATEGY" title="Structure over indicators" />
      <section className="px-[5vw] md:px-[8vw] py-16">
        <div className="text-[11px] tracking-[0.3em] text-primary">ANALYTICAL FRAMEWORK & MARKET MECHANICS</div>
        <p className="mt-6 max-w-3xl text-lg text-muted-foreground">
          3A CapX approaches financial markets through Structural Price Delivery and Liquidity Mechanics. We do not rely on lagging indicators. Instead, we trade raw price action, market structure, and liquidity cycles.
        </p>
        <div className="mt-10"><Rows items={framework} /></div>
      </section>
      <section className="px-[5vw] md:px-[8vw] pb-8">
        <div className="text-[11px] tracking-[0.3em] text-primary">QUANTITATIVE RISK GOVERNANCE</div>
        <div className="mt-10"><Rows items={risk} /></div>
      </section>
    </>
  );
}