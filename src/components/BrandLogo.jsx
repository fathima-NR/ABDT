import { siteConfig } from "../data/siteConfig";
import { useI18n } from "../context/LanguageContext";

export default function BrandLogo({ className = "h-12 w-auto", framed = false }) {
  const { t } = useI18n();
  const image = (
    <img src={siteConfig.logo} alt={t.logoAlt} className={framed ? "h-16 w-auto" : className} />
  );

  if (!framed) return image;

  return <span className="inline-flex bg-white px-3 py-2">{image}</span>;
}
