import { useI18n } from "../context/LanguageContext";
import Container from "../components/Container";
import Seo from "../components/Seo";

export default function Privacy() {
  const { t } = useI18n();

  return (
    <>
      <Seo title={t.seo.privacyTitle} description={t.seo.privacyDescription} />
      <section className="bg-white">
        <Container className="max-w-3xl py-16 lg:py-24">
          <h1 className="text-3xl font-semibold text-navy sm:text-4xl">{t.privacy.title}</h1>
          <p className="mt-5 leading-relaxed text-muted">{t.privacy.intro}</p>
          <div className="mt-10 space-y-8">
            {t.privacy.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-xl font-semibold text-navy">{section.heading}</h2>
                <div className="mt-3 space-y-3 text-base leading-relaxed text-muted">
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
