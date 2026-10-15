import { useI18n } from "../context/LanguageContext";
import Container from "./Container";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Process() {
  const { t } = useI18n();

  return (
    <section id="process" className="bg-white">
      <Container className="py-16 lg:py-24">
        <SectionHeading eyebrow={t.process.eyebrow} title={t.process.title} />
        <ol className="relative mt-12 grid gap-10 md:grid-cols-4 md:gap-6">
          <div className="absolute top-5 right-8 left-8 hidden h-px bg-line md:block" aria-hidden="true" />
          {t.process.steps.map((step, index) => (
            <li key={step.title} className="relative">
              <Reveal delay={index * 0.08}>
                {index < t.process.steps.length - 1 ? (
                  <div className="absolute top-10 -bottom-10 start-5 w-px bg-line md:hidden" aria-hidden="true" />
                ) : null}
                <div className="relative z-10 flex h-10 w-10 items-center justify-center bg-uae-red text-sm font-semibold text-white">
                  {index + 1}
                </div>
                <h3 className="mt-4 font-semibold text-navy">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{step.text}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
