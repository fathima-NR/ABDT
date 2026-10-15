import { useI18n } from "../context/LanguageContext";
import About from "../components/About";
import PageHero from "../components/PageHero";
import Seo from "../components/Seo";
import VisionMission from "../components/VisionMission";

export default function AboutPage() {
  const { t } = useI18n();

  return (
    <>
      <Seo title={`${t.about.title} | ABDT`} description={t.about.paragraphs[0]} />
      <PageHero title={t.about.title} text={t.about.paragraphs[0]} crumbs={[{ label: t.about.title }]} />
      <About embedded />
      <VisionMission />
    </>
  );
}
