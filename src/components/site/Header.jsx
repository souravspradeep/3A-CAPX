import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { Menu, X } from "lucide-react";

const links = [
  ["/", "Home"],
  ["/about", "About"],
  ["/philosophy", "Philosophy"],
  ["/technology", "Technology"],
  ["/performance", "Performance"],
  ["/contact", "Contact"],
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const cls = ({ isActive }) =>
    `text-xs uppercase tracking-widest transition-colors hover:text-primary ${isActive ? "text-primary" : "text-muted-foreground"}`;
  return (
    <header className="sticky top-0 z-40 bg-background/90 backdrop-blur border-b border-border">
      <div className="px-[5vw] md:px-[8vw] h-16 flex items-center justify-between">
        <Link to="/" className="font-heading font-bold tracking-[0.2em] text-sm">
          3A CAP<span className="text-primary">X</span>
        </Link>
        <nav className="hidden md:flex gap-8">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end className={cls}>{label}</NavLink>
          ))}
        </nav>

        <button className="md:hidden" aria-label="Menu" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <nav className="md:hidden flex flex-col gap-4 px-[5vw] pb-6">
          {links.map(([to, label]) => (
            <NavLink key={to} to={to} end className={cls} onClick={() => setOpen(false)}>{label}</NavLink>
          ))}
        </nav>
      )}
    </header>
  );
}