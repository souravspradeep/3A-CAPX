import { Link } from "react-router-dom";
import ServerClock from "./ServerClock";

export default function Footer() {
  return (
    <footer className="relative z-20 border-t border-border bg-background pt-14 pb-14 px-[5vw] md:px-[8vw]">
      <div className="font-heading font-bold text-4xl md:text-6xl tracking-[0.15em] text-primary" style={{ textShadow: "0 0 32px rgba(196,255,97,0.3)" }}>
        3A CAPX
      </div>
      <div className="mt-8 flex flex-wrap gap-6 text-xs uppercase tracking-widest text-zinc-400">
        <Link to="/performance" className="hover:text-primary transition-colors">Performance</Link>
        <Link to="/contact" className="hover:text-primary transition-colors">Regulatory Disclosure</Link>
        <Link to="/philosophy" className="hover:text-primary transition-colors">Philosophy</Link>
        <span className="md:ml-auto text-zinc-400">Server Time · <span className="text-primary font-mono"><ServerClock /></span></span>
      </div>
      <p className="mt-8 text-xs text-zinc-400 max-w-4xl leading-relaxed">
        © 2026 3A CapX. All Rights Reserved. | Bangalore, India.
      </p>
      <p className="mt-3 text-[11px] text-zinc-500 max-w-4xl leading-relaxed">
        REGULATORY DISCLAIMER: 3A CapX is a private proprietary trading firm. We trade our own capital exclusively. We do not solicit, accept, or manage public or third-party funds. We offer no financial products, signals, or advisory services for sale.
      </p>
    </footer>
  );
}