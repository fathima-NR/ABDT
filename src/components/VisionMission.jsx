import { Eye, Target } from "lucide-react";
import { useI18n } from "../context/LanguageContext";
import Container from "./Container";
import Reveal from "./Reveal";

export default function VisionMission() {
  const { t } = useI18n();
  const cards = [
    { icon: Eye, title: t.about.visionTitle, text: t.about.visionText },
    { icon: Target, title: t.about.missionTitle, text: t.about.missionText },
  ];

  return (
    <section className="bg-white" aria-labelledby="vision-mission-title">
      <Container className="py-16 lg:py-20">
        <h2 id="vision-mission-title" className="sr-only">
          {t.about.visionTitle} / {t.about.missionTitle}
        </h2>
        <div className="grid gap-5 md:grid-cols-2">
          {cards.map((card, index) => {
            const Icon = card.icon;
            return (
              <Reveal key={card.title} delay={index * 0.08}>
                <article className="h-full rounded-2xl border border-line bg-page p-6 sm:p-8">
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-uae-red/10 text-uae-red">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold text-navy">{card.title}</h3>
                  <p className="mt-3 text-base leading-relaxed text-muted">{card.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
