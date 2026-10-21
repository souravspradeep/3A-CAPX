import PageHeader from "@/components/site/PageHeader";

export default function Contact() {
  return (
    <>
      <PageHeader index="06" eyebrow="CONTACT & REGULATORY DISCLOSURE" title="Formal regulatory statement" />
      <section className="px-[5vw] md:px-[8vw] py-16 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-4">
          <div className="text-[11px] tracking-[0.3em] text-primary">LOCATION</div>
          <div className="mt-4 text-lg">Bangalore, Karnataka, India</div>
        </div>
        <div className="md:col-span-8 border border-border bg-card p-8">
          <p className="text-lg text-muted-foreground">
            <strong className="text-foreground">3A CapX Corporate Statement:</strong> 3A CapX is an independent, private proprietary trading operation based in Bangalore, Karnataka, India. 3A CapX operates strictly as a private entity trading proprietary capital across authorized financial derivatives. 3A CapX is not an investment advisor, broker-dealer, asset manager, or commodity trading advisor (CTA). 3A CapX does not solicit, hold, manage, or pool funds from public or private external investors, nor does it offer commercial products, signals, or courses.
          </p>
        </div>
      </section>
    </>
  );
}