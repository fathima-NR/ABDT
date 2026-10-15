import { useI18n } from "../context/LanguageContext";
import PageHero from "../components/PageHero";
import Process from "../components/Process";
import Seo from "../components/Seo";
import WhyChooseUs from "../components/WhyChooseUs";

export default function WhyPage() {
  const { t } = useI18n();

  return (
    <>
      <Seo title={`${t.why.title} | ABDT`} description={t.why.text} />
      <PageHero title={t.why.title} text={t.why.text} crumbs={[{ label: t.nav.why }]} />
      <WhyChooseUs />
      <Process />
    </>
  );
}
