import { Link, useParams } from "react-router-dom";
import { serviceCategories } from "../data/services";
import { whatsappHref } from "../data/siteConfig";
import { useI18n } from "../context/LanguageContext";
import Button from "../components/Button";
import Container from "../components/Container";
import Icon from "../components/Icon";
import NotFound from "./NotFound";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";

export default function ServicePage() {
  const { categoryId, serviceId } = useParams();
  const { t } = useI18n();
  const category = serviceCategories.find((item) => item.id === categoryId);
  const service = category?.items.find((item) => item.id === serviceId);

  if (!category || !service) return <NotFound />;

  const categoryCopy = t.services.categories[category.id];
  const copy = categoryCopy.items[service.id];
  const related = category.items.filter((item) => item.id !== service.id).slice(0, 3);

  return (
    <>
      <Seo title={`${copy.title} | ABDT`} description={copy.text} />
      <PageHero
        title={copy.title}
        text={copy.text}
        crumbs={[
          { label: t.nav.services, to: "/services" },
          { label: categoryCopy.title, to: `/services/${category.id}` },
          { label: copy.title },
        ]}
      />
      <section className="bg-page">
        <Container className="grid gap-8 py-16 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <article className="card-hover rounded-xl border border-line bg-white p-6 sm:p-8">
            <Icon name={service.icon} className="h-8 w-8 text-uae-red" />
            <h2 className="mt-5 text-2xl font-semibold text-navy">{copy.title}</h2>
            <p className="mt-4 leading-relaxed text-muted">{copy.text}</p>
            <p className="mt-4 leading-relaxed text-muted">{t.about.paragraphs[2]}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/contact">{t.ui.enquire}</Button>
              <Button href={whatsappHref(t.whatsappMessage)} variant="whatsapp">
                {t.hero.whatsapp}
              </Button>
            </div>
          </article>
          <aside>
            <h2 className="text-lg font-semibold text-navy">{t.ui.related}</h2>
            <ul className="mt-4 space-y-3">
              {related.map((item) => (
                <li key={item.id}>
                  <Link
                    to={`/services/${category.id}/${item.id}`}
                    className="card-hover block rounded-xl border border-line bg-white p-4 font-medium text-navy"
                  >
                    {categoryCopy.items[item.id].title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </Container>
      </section>
    </>
  );
}
