import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/data/services";

export function Services() {
  return (
    <section id="services" className="scroll-mt-20 bg-warm-cream py-24 sm:py-28 lg:py-32">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12">
        <SectionHeading
          eyebrow="Services"
          headline={
            <>
              How We
              <br />
              Bring Your Story
              <br />
              to Life
            </>
          }
          className="mb-14 lg:mb-16"
        />

        <div className="grid grid-cols-1 border-t border-ink/10 sm:grid-cols-2 lg:grid-cols-4 lg:border-l">
          {services.map(({ id, title, description, icon: Icon }, i) => (
            <Reveal
              key={id}
              delay={i * 90}
              className="flex flex-col gap-5 border-b border-ink/10 px-1 py-9 sm:px-7 lg:border-l lg:first:border-l-0"
            >
              <Icon className="h-6 w-6 text-muted-brown" strokeWidth={1.25} />
              <h3 className="font-display text-2xl font-medium text-ink">{title}</h3>
              <p className="max-w-xs font-sans text-sm leading-relaxed text-ink/70">{description}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
