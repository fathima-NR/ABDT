import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { serviceCategories } from "../data/services";
import { siteConfig } from "../data/siteConfig";
import { useI18n } from "../context/LanguageContext";
import Button from "../components/Button";
import Container from "../components/Container";
import Hero from "../components/Hero";
import Icon from "../components/Icon";
import Reveal from "../components/Reveal";
import Reviews from "../components/Reviews";
import Seo from "../components/Seo";

export default function Home() {
  const { t, language } = useI18n();
  const featured = serviceCategories.slice(0, 3);

  return (
    <>
      <Seo title={t.seo.homeTitle} description={t.seo.homeDescription} />
      <Hero />

      <section className="bg-page">
        <Container className="py-14 lg:py-16">
          <div className="grid gap-5 md:grid-cols-3">
            {featured.map((category, index) => {
              const copy = t.services.categories[category.id];
              return (
                <Reveal key={category.id} delay={index * 0.1} className="h-full">
                <Link
                  to={`/services/${category.id}`}
                  className="card-hover flex h-full flex-col rounded-2xl border border-transparent bg-white p-6 shadow-sm"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-uae-red/10 text-uae-red">
                    <Icon name={category.items[0].icon} className="h-6 w-6" />
                  </span>
                  <h2 className="mt-5 text-lg font-semibold text-navy">{copy.title}</h2>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{copy.summary}</p>
                  <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-uae-red">
                    {t.ui.learnMore}
                    <ArrowRight className={`h-4 w-4 ${language === "ar" ? "rotate-180" : ""}`} aria-hidden="true" />
                  </span>
                </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24">
          <Reveal>
          <img
            src={siteConfig.images.about}
            alt={t.about.imageAlt}
            className="aspect-[4/3] w-full rounded-2xl object-cover shadow-md"
          />
          </Reveal>
          <Reveal delay={0.12}>
          <div>
            <p className={`text-sm font-semibold text-uae-red ${language === "en" ? "uppercase tracking-[0.16em]" : ""}`}>
              {t.why.eyebrow}
            </p>
            <h2 className="mt-3 text-3xl font-semibold text-navy sm:text-4xl">{t.ui.focusTitle}</h2>
            <p className="mt-4 text-base leading-relaxed text-muted">{t.why.text}</p>
            <ul className="mt-8 space-y-4">
              {t.why.items.slice(0, 4).map((item) => (
                <li key={item.id} className="flex gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-uae-red text-white">
                    <Check className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold text-navy">{item.title}</span>
                    <span className="mt-1 block text-sm leading-relaxed text-muted">{item.text}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>
          </Reveal>
        </Container>
      </section>

      <section className="bg-page">
        <Container className="py-16 lg:py-20">
          <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <p className={`text-sm font-semibold text-uae-red ${language === "en" ? "uppercase tracking-[0.16em]" : ""}`}>
                {t.services.eyebrow}
              </p>
              <h2 className="mt-3 text-3xl font-semibold text-navy sm:text-4xl">{t.services.title}</h2>
              <p className="mt-3 text-muted">{t.services.intro}</p>
            </div>
            <Button to="/services" variant="secondary">
              {t.ui.viewCategory}
            </Button>
          </div>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {serviceCategories.map((category, index) => {
              const copy = t.services.categories[category.id];
              return (
                <Reveal key={category.id} delay={(index % 3) * 0.08} className="h-full">
                <Link to={`/services/${category.id}`} className="card-hover block h-full overflow-hidden rounded-2xl border border-transparent bg-white shadow-sm">
                  <img src={siteConfig.images.categories[category.id]} alt="" className="h-44 w-full object-cover" />
                  <div className="p-5">
                    <h3 className="text-lg font-semibold text-navy">{copy.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted">{copy.summary}</p>
                    <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-uae-red">
                      {t.ui.learnMore}
                      <ArrowRight className={`h-4 w-4 ${language === "ar" ? "rotate-180" : ""}`} aria-hidden="true" />
                    </span>
                  </div>
                </Link>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      <Reviews />

      <section className="bg-navy-deep text-white">
        <Reveal>
        <Container className="flex flex-col items-start justify-between gap-6 py-14 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-3xl font-semibold">{t.about.title}</h2>
            <p className="mt-3 max-w-2xl text-white/75">{t.about.paragraphs[0]}</p>
          </div>
          <Button to="/contact">{t.hero.contact}</Button>
        </Container>
        </Reveal>
      </section>
    </>
  );
}
