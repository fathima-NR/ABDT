import { Link, useParams } from "react-router-dom";
import { serviceCategories } from "../data/services";
import { useI18n } from "../context/LanguageContext";
import Container from "../components/Container";
import Icon from "../components/Icon";
import Reveal from "../components/Reveal";
import NotFound from "./NotFound";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";

export default function CategoryPage() {
  const { categoryId } = useParams();
  const { t } = useI18n();
  const category = serviceCategories.find((item) => item.id === categoryId);

  if (!category) return <NotFound />;

  const copy = t.services.categories[category.id];

  return (
    <>
      <Seo title={`${copy.title} | ABDT`} description={copy.summary} />
      <PageHero
        title={copy.title}
        text={copy.summary}
        crumbs={[{ label: t.nav.services, to: "/services" }, { label: copy.title }]}
      />
      <section className="bg-page">
        <Container className="grid gap-4 py-16 sm:grid-cols-2 lg:grid-cols-3">
          {category.items.map((item, index) => {
            const itemCopy = copy.items[item.id];
            return (
              <Reveal key={item.id} delay={index * 0.06} className="h-full">
              <Link
                to={`/services/${category.id}/${item.id}`}
                className="card-hover block h-full rounded-xl border border-line bg-white p-5"
              >
                <Icon name={item.icon} className="h-6 w-6 text-uae-red" />
                <h2 className="mt-4 font-semibold text-navy">{itemCopy.title}</h2>
                <p className="mt-2 text-sm leading-relaxed text-muted">{itemCopy.text}</p>
              </Link>
              </Reveal>
            );
          })}
        </Container>
      </section>
    </>
  );
}
