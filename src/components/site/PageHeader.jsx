export default function PageHeader({ index, eyebrow, title }) {
  return (
    <section className="relative px-[5vw] md:px-[8vw] pt-20 pb-12 border-b border-border grid-lines overflow-hidden">
      <div className="text-[11px] tracking-[0.3em] text-primary animate-rise">{index} / {eyebrow}</div>
      <h1 className="font-heading font-bold uppercase text-3xl md:text-6xl leading-tight mt-4 animate-rise" style={{ animationDelay: ".1s" }}>
        {title}
      </h1>
    </section>
  );
}