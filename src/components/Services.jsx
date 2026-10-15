import { motion, useReducedMotion } from "framer-motion";
import { serviceCategories } from "../data/services";
import { useI18n } from "../context/LanguageContext";
import Container from "./Container";
import Icon from "./Icon";
import Reveal from "./Reveal";
import SectionHeading from "./SectionHeading";

export default function Services() {
  const { t } = useI18n();
  const reduce = useReducedMotion();

  return (
    <section id="services" className="bg-white">
      <Container className="py-16 lg:py-24">
        <SectionHeading eyebrow={t.services.eyebrow} title={t.services.title} text={t.services.intro} />
        <div className="mt-14 space-y-14">
          {serviceCategories.map((category) => {
            const copy = t.services.categories[category.id];
            return (
              <Reveal key={category.id}>
                <div id={`service-${category.id}`}>
                  <h3 className="border-s-2 border-uae-red ps-4 text-xl font-semibold text-navy">
                    {copy.title}
                  </h3>
                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {category.items.map((item) => {
                      const itemCopy = copy.items[item.id];
                      return (
                        <motion.article
                          key={item.id}
                          whileHover={reduce ? undefined : { y: -3 }}
                          transition={{ duration: 0.2 }}
                          className="card-hover border border-line bg-white p-5"
                        >
                          <Icon name={item.icon} className="h-6 w-6 text-uae-red" />
                          <h4 className="mt-4 font-semibold text-navy">{itemCopy.title}</h4>
                          <p className="mt-2 text-sm leading-relaxed text-muted">{itemCopy.text}</p>
                        </motion.article>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
