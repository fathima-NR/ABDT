import { Link } from "react-router-dom";
import { serviceCategories } from "../data/services";
import { useI18n } from "../context/LanguageContext";
import Container from "../components/Container";
import Icon from "../components/Icon";
import Reveal from "../components/Reveal";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";

export default function ServicesPage() {
  const { t } = useI18n();

  return (
    <>
      <Seo title={`${t.services.title} | ABDT`} description={t.services.intro} />
      <PageHero title={t.services.title} text={t.services.intro} crumbs={[{ label: t.nav.services }]} />
      <section className="bg-page">
        <Container className="space-y-14 py-16">
          {serviceCategories.map((category, index) => {
            const copy = t.services.categories[category.id];
            return (
              <Reveal key={category.id} delay={index * 0.05}>
              <div id={category.id}>
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <h2 className="text-2xl font-semibold text-navy">{copy.title}</h2>
                  <Link to={`/services/${category.id}`} className="text-sm font-semibold text-uae-red hover:underline">
                    {t.ui.viewCategory}
                  </Link>
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {category.items.map((item) => {
                    const itemCopy = copy.items[item.id];
                    return (
                      <Link
                        key={item.id}
                        to={`/services/${category.id}/${item.id}`}
                        className="card-hover block h-full rounded-xl border border-line bg-white p-5"
                      >
                        <Icon name={item.icon} className="h-6 w-6 text-uae-red" />
                        <h3 className="mt-4 font-semibold text-navy">{itemCopy.title}</h3>
                        <p className="mt-2 text-sm leading-relaxed text-muted">{itemCopy.text}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
              </Reveal>
            );
          })}
        </Container>
      </section>
    </>
  );
}
