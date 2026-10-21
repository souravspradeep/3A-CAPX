export default function InfoCard({ num, title, children }) {
  return (
    <div className="relative overflow-hidden border border-border bg-card p-8 group transition-colors hover:border-primary">
      {num && (
        <span className="absolute -right-2 -top-4 font-heading font-bold text-8xl text-secondary/60 select-none">{num}</span>
      )}
      <h3 className="relative font-heading font-bold uppercase text-sm tracking-wider mb-4">{title}</h3>
      <p className="relative text-muted-foreground">{children}</p>
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ backgroundImage: "repeating-linear-gradient(0deg, transparent 0 3px, #C4FF610F 3px 4px)" }}
      />
    </div>
  );
}