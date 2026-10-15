import { siteConfig } from "../data/siteConfig";
import { useI18n } from "../context/LanguageContext";
import Container from "./Container";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function About({ embedded = false }) {
  const { t } = useI18n();
  const paragraphs = embedded ? t.about.paragraphs.slice(1) : t.about.paragraphs;

  return (
    <section id="about" className="bg-page">
      <Container className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <Reveal>
          <img
            src={siteConfig.images.about}
            alt={t.about.imageAlt}
            width="1400"
            height="1050"
            loading="lazy"
            className="aspect-[4/3] w-full rounded-3xl object-cover"
          />
        </Reveal>
        <Reveal delay={0.08}>
          {embedded ? null : <SectionHeading eyebrow={t.about.eyebrow} title={t.about.title} />}
          <div className={`${embedded ? "" : "mt-5"} space-y-4 text-base leading-relaxed text-muted`}>
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {t.about.points.map((point) => (
              <li key={point.title} className="border-s-2 border-uae-red ps-4">
                <h3 className="font-semibold text-navy">{point.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted">{point.text}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  );
}
