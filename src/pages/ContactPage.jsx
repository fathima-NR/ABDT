import { useI18n } from "../context/LanguageContext";
import ContactForm from "../components/ContactForm";
import Container from "../components/Container";
import Location from "../components/Location";
import Reveal from "../components/Reveal";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";

export default function ContactPage() {
  const { t } = useI18n();

  return (
    <>
      <Seo title={`${t.contact.title} | ABDT`} description={t.contact.text} />
      <PageHero title={t.contact.title} text={t.contact.text} crumbs={[{ label: t.nav.contact }]} />
      <section className="bg-page">
        <Container className="grid items-start gap-8 py-16 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <Reveal>
            <ContactForm />
          </Reveal>
          <Reveal delay={0.1}>
            <Location />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
