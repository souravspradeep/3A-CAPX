import PageHeader from "@/components/site/PageHeader";
import InfoCard from "@/components/site/InfoCard";

const tech = [
  ["01", "Custom Analytics", "Pine Script v5 scripts mapping liquidity pools, FVGs, and structural shifts in real time."],
  ["02", "Account Sync", "High-speed trade copying router replicating orders across prop accounts with zero latency drift."],
  ["03", "Risk Breakers", "Broker-level hard stop-loss attachments and platform loss limits enforcing risk caps."],
];

export default function Technology() {
  return (
    <>
      <PageHeader index="04" eyebrow="TECHNOLOGY & INFRASTRUCTURE" title="Built for speed and control" />
      <section className="px-[5vw] md:px-[8vw] py-16">
        <div className="grid md:grid-cols-3 gap-px bg-border">
          {tech.map(([n, t, d]) => <InfoCard key={n} num={n} title={t}>{d}</InfoCard>)}
        </div>
      </section>
    </>
  );
}