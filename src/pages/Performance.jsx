import PageHeader from "@/components/site/PageHeader";
import Candles from "@/components/site/Candles";

const params = [
  ["Capital Allocation", "100% Private Proprietary Capital"],
  ["Primary Asset Class", "Micro E-mini Nasdaq-100 Futures (MNQ)"],
  ["Core Methodology", "Mechanical Price Action / Structural Liquidity"],
  ["Self-Imposed Daily Loss Cap", "2.0% Maximum Loss Threshold"],
];
const log = [
  ["YYYY-MM-DD", "MNQ Futures", "NY Open Liquidity Sweep + FVG", "WIN", "+$640.00", "A+"],
  ["YYYY-MM-DD", "MNQ Futures", "CISD Reversal Entry", "LOSS", "-$400.00", "A"],
  ["YYYY-MM-DD", "MNQ Futures", "Silver Bullet Session Expansion", "WIN", "+$920.00", "A+"],
];
const heads = ["Date", "Instrument", "Playbook Setup", "Result", "P&L ($)", "Execution Grade"];

export default function Performance() {
  return (
    <>
      <PageHeader index="05" eyebrow="DAILY P&L & PERFORMANCE LEDGER" title="Public accountability" />
      <section className="px-[5vw] md:px-[8vw] py-12">
        <div className="border border-destructive/60 bg-destructive/10 p-6">
          <div className="font-bold text-destructive uppercase text-sm">Mandatory Public Notice & Non-Solicitation Statement:</div>
          <div className="font-bold uppercase mt-1">No public funds accepted. No products or services for sale.</div>
          <p className="mt-3 text-muted-foreground">
            3A CapX is a 100% private proprietary trading entity trading internal firm capital exclusively. We do not manage third-party accounts, accept investor capital, or offer signals, software, or mentorships. There is nothing to buy or subscribe to here. This ledger exists solely for public accountability and internal execution auditing.
          </p>
        </div>
      </section>

      <section className="px-[5vw] md:px-[8vw] pb-12">
        <div className="text-[11px] tracking-[0.3em] text-primary mb-6">OPERATIONAL PARAMETERS</div>
        <div className="border border-border divide-y divide-border">
          {params.map(([k, v]) => (
            <div key={k} className="grid md:grid-cols-2 gap-2 p-5">
              <span className="text-muted-foreground">{k}</span>
              <span className="text-primary">{v}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="relative px-[5vw] md:px-[8vw] pb-8 overflow-hidden">
        <Candles className="absolute inset-x-0 bottom-0 h-full opacity-20 px-4" />
        <div className="relative">
          <div className="text-[11px] tracking-[0.3em] text-primary mb-6">DAILY OPERATIONAL PERFORMANCE LOG</div>
          <div className="overflow-x-auto border border-border bg-background/80">
            <table className="w-full text-sm min-w-[720px]">
              <thead>
                <tr className="bg-card text-left">
                  {heads.map((h) => <th key={h} className="p-4 text-[11px] uppercase tracking-widest text-primary font-medium">{h}</th>)}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {log.map((r, i) => {
                  const win = r[3] === "WIN";
                  return (
                    <tr key={i} className="hover:bg-card transition-colors">
                      <td className="p-4 text-muted-foreground">{r[0]}</td>
                      <td className="p-4">{r[1]}</td>
                      <td className="p-4">{r[2]}</td>
                      <td className={`p-4 font-bold ${win ? "text-primary" : "text-red-500"}`}>{r[3]}</td>
                      <td className={`p-4 font-bold ${win ? "text-primary" : "text-red-500"}`}>{r[4]}</td>
                      <td className="p-4">{r[5]}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
}