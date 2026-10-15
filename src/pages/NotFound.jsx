import { useI18n } from "../context/LanguageContext";
import Button from "../components/Button";
import Container from "../components/Container";
import Seo from "../components/Seo";

export default function NotFound() {
  const { t } = useI18n();

  return (
    <>
      <Seo title={t.seo.notFoundTitle} description={t.seo.notFoundDescription} />
      <section className="bg-page">
        <Container className="py-24">
          <p className="text-sm font-semibold text-navy">404</p>
          <h1 className="mt-3 text-3xl font-semibold text-navy sm:text-4xl">{t.notFound.title}</h1>
          <p className="mt-4 max-w-lg text-muted">{t.notFound.text}</p>
          <div className="mt-8">
            <Button to="/">{t.notFound.home}</Button>
          </div>
        </Container>
      </section>
    </>
  );
}
