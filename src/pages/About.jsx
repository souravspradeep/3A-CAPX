import PageHeader from "@/components/site/PageHeader";
import { Shield, Target, Compass, Award } from "lucide-react";

const values = [
  {
    num: "01",
    title: "Mechanical Precision Over Emotion",
    desc: "Codified execution playbooks removing fear, greed, and hesitation from execution. Every trade setup is mechanically pre-defined.",
    icon: Target,
  },
  {
    num: "02",
    title: "Uncompromising Risk Discipline",
    desc: "Predefined loss limits, dynamic leverage scaling, and a self-imposed 2% maximum daily loss limit strictly enforced at the broker gateway.",
    icon: Shield,
  },
  {
    num: "03",
    title: "Structural Clarity & Edge",
    desc: "Identifying order flow shifts, liquidity sweeps, and fair value dynamics to engage solely when probability is mechanically asymmetric.",
    icon: Compass,
  },
  {
    num: "04",
    title: "Refinement & Auditability",
    desc: "Continuous execution auditing, empirical backtesting, and performance metric tracking to maintain peak institutional operational edge.",
    icon: Award,
  },
];

export default function About() {
  return (
    <>
      <PageHeader index="02" eyebrow="INSTITUTIONAL IDENTITY" title="About 3A CapX" />

      {/* Intro narrative */}
      <section className="px-[5vw] md:px-[8vw] py-16 border-b border-border">
        <div className="max-w-4xl">
          <div className="text-[11px] tracking-[0.3em] text-primary uppercase mb-4">WHO WE ARE</div>
          <p className="text-xl md:text-2xl text-foreground font-light leading-relaxed">
            We operate as a quantitative and structural proprietary trading house, deploying balance sheet capital across electronic futures markets with institutional-grade discipline and sub-millisecond execution fidelity.
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="mt-12 grid md:grid-cols-2 gap-8">
          <div className="border border-border bg-card p-8 group hover:border-primary transition-all">
            <span className="text-[10px] tracking-[0.3em] text-primary uppercase font-mono">CORE PURPOSE</span>
            <h3 className="font-heading font-bold uppercase text-xl mt-3 mb-4">Our Mission</h3>
            <p className="text-muted-foreground leading-relaxed">
              To deploy internal proprietary capital with mechanical precision, unyielding risk parameters, and repeatable market edge—eliminating guesswork and emotional bias from internal operations.
            </p>
          </div>

          <div className="border border-border bg-card p-8 group hover:border-primary transition-all">
            <span className="text-[10px] tracking-[0.3em] text-primary uppercase font-mono">STRATEGIC HORIZON</span>
            <h3 className="font-heading font-bold uppercase text-xl mt-3 mb-4">Our Vision</h3>
            <p className="text-muted-foreground leading-relaxed">
              To redefine modern proprietary trading through systematic process and institutional discipline, establishing a benchmark for structural clarity and capital longevity.
            </p>
          </div>
        </div>
      </section>

      {/* Leadership Showcase */}
      <section className="px-[5vw] md:px-[8vw] py-16 border-b border-border">
        <div className="text-[11px] tracking-[0.3em] text-primary uppercase mb-8">LEADERSHIP SHOWCASE</div>

        <div className="grid md:grid-cols-12 gap-10 items-center">
          <div className="md:col-span-5 relative group">
            <div className="border border-border overflow-hidden bg-card/50 relative">
              <img
                src="/assets/images/sudhin_fibonacci.jpg"
                alt="Sudhin Fibonacci - Founder & Chief Strategy Officer"
                className="w-full h-auto object-cover grayscale contrast-125 group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="font-heading font-bold text-lg uppercase tracking-wider text-foreground">
                  Sudhin Fibonacci
                </div>
                <div className="text-xs text-primary font-mono tracking-widest uppercase">
                  Founder & Chief Strategy Officer
                </div>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            <div className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase font-mono mb-2">
              LEADERSHIP PROFILE
            </div>
            <h2 className="font-heading font-bold uppercase text-2xl md:text-3xl leading-snug mb-6">
              Systematic Market Strategist & Prop Trader
            </h2>
            <div className="space-y-4 text-muted-foreground text-sm md:text-base leading-relaxed">
              <p>
                Sudhin Fibonacci is a systematic market strategist, prop trader, and Founder of 3A CapX. Grounded in quantitative price mechanics, market microstructure, and top-down structural analysis, Sudhin established 3A CapX to build a pure, process-driven proprietary execution firm.
              </p>
              <p>
                Specializing in liquid futures derivatives (MNQ), Sudhin oversees strategy development and internal capital allocation under one mandate:
              </p>
            </div>

            <div className="mt-8 border-l-2 border-primary bg-card/60 p-5 pl-6">
              <div className="text-[10px] tracking-widest text-primary font-mono uppercase mb-1">
                GOVERNING MANDATE
              </div>
              <blockquote className="font-heading font-bold text-base md:text-lg text-foreground">
                &ldquo;Process always precedes profit.&rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* Core Operating Values */}
      <section className="px-[5vw] md:px-[8vw] py-16">
        <div className="text-[11px] tracking-[0.3em] text-primary uppercase mb-2">THE 3A CAPX CODE</div>
        <h2 className="font-heading font-bold uppercase text-2xl md:text-4xl mb-12">
          Core Operating Values
        </h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((v) => {
            const Icon = v.icon;
            return (
              <div
                key={v.num}
                className="border border-border bg-card p-6 flex flex-col justify-between group hover:border-primary transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-heading font-bold text-primary text-2xl">{v.num}</span>
                    <Icon size={20} className="text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-heading font-bold uppercase text-xs tracking-wider mb-3 leading-relaxed">
                    {v.title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {v.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
