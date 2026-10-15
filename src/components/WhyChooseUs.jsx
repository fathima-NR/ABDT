import { Clock, DoorOpen, Handshake, LayoutGrid, MessagesSquare } from "lucide-react";
import { useI18n } from "../context/LanguageContext";
import Container from "./Container";
import Reveal from "./Reveal";

const icons = {
  access: Clock,
  range: LayoutGrid,
  customer: Handshake,
  communication: MessagesSquare,
  door: DoorOpen,
};

export default function WhyChooseUs() {
  const { t } = useI18n();

  return (
    <section id="why" className="bg-page">
      <Container className="py-16 lg:py-20">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {t.why.items.map((item, index) => {
            const ItemIcon = icons[item.id];
            return (
              <Reveal key={item.id} delay={index * 0.04}>
                <article className="card-hover h-full rounded-xl border border-line bg-white p-5">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-page text-uae-red">
                    <ItemIcon className="h-5 w-5" aria-hidden="true" strokeWidth={1.75} />
                  </span>
                  <h3 className="mt-4 text-lg font-semibold text-navy">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">{item.text}</p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
