import { Mail, MapPin, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { serviceCategories } from "../data/services";
import { siteConfig, whatsappHref } from "../data/siteConfig";
import { useI18n } from "../context/LanguageContext";
import BrandLogo from "./BrandLogo";
import Container from "./Container";
import { InstagramIcon, WhatsAppIcon } from "./SocialIcons";

const iconClass =
  "inline-flex h-11 w-11 items-center justify-center rounded-full text-white transition duration-200 hover:-translate-y-0.5 hover:text-uae-red hover:shadow-[0_8px_18px_rgb(180_13_16/0.45)]";

const copyrightYear = new Date().getFullYear();

export default function Footer() {
  const { t } = useI18n();

  return (
    <footer className="bg-navy-deep text-white">
      <Container className="grid gap-10 py-14 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <BrandLogo framed />
          <p className="mt-4 text-sm leading-relaxed text-white/80">{t.footer.blurb}</p>
          <ul className="mt-5 flex flex-wrap gap-2">
            <li>
              <a href={siteConfig.mobile.href} aria-label={t.callLabel} className={iconClass}>
                <Phone className="h-5 w-5" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a href={`mailto:${siteConfig.email}`} aria-label={t.footer.email} className={iconClass}>
                <Mail className="h-5 w-5" aria-hidden="true" />
              </a>
            </li>
            <li>
              <a
                href={siteConfig.social.instagram || undefined}
                target={siteConfig.social.instagram ? "_blank" : undefined}
                rel={siteConfig.social.instagram ? "noopener noreferrer" : undefined}
                aria-label={t.footer.instagram}
                className={iconClass}
                onClick={siteConfig.social.instagram ? undefined : (event) => event.preventDefault()}
              >
                <InstagramIcon className="h-5 w-5" />
              </a>
            </li>
            <li>
              <a
                href={whatsappHref(t.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t.whatsappLabel}
                className={iconClass}
              >
                <WhatsAppIcon className="h-5 w-5" />
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">{t.footer.quick}</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            <li>
              <Link to="/" className="transition-colors hover:text-uae-red">
                {t.nav.home}
              </Link>
            </li>
            <li>
              <Link to="/about" className="transition-colors hover:text-uae-red">
                {t.nav.about}
              </Link>
            </li>
            <li>
              <Link to="/services" className="transition-colors hover:text-uae-red">
                {t.nav.services}
              </Link>
            </li>
            <li>
              <Link to="/why" className="transition-colors hover:text-uae-red">
                {t.nav.why}
              </Link>
            </li>
            <li>
              <Link to="/contact" className="transition-colors hover:text-uae-red">
                {t.nav.contact}
              </Link>
            </li>
            <li>
              <Link to="/privacy" className="transition-colors hover:text-uae-red">
                {t.footer.privacy}
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">{t.footer.services}</h2>
          <ul className="mt-4 space-y-2 text-sm text-white/80">
            {serviceCategories.map((category) => (
              <li key={category.id}>
                <Link to={`/services/${category.id}`} className="transition-colors hover:text-uae-red">
                  {t.services.categories[category.id].title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-sm font-semibold">{t.footer.contact}</h2>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li>
              <a href={siteConfig.phone.href} className="inline-flex items-center gap-2 transition-colors hover:text-uae-red">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span dir="ltr">{siteConfig.phone.display}</span>
              </a>
            </li>
            <li>
              <a href={siteConfig.mobile.href} className="inline-flex items-center gap-2 transition-colors hover:text-uae-red">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span dir="ltr">{siteConfig.mobile.display}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${siteConfig.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-uae-red"
              >
                <Mail className="h-4 w-4" aria-hidden="true" />
                <span dir="ltr">{siteConfig.email}</span>
              </a>
            </li>
            <li className="inline-flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t.location.address}</span>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-white/10">
        <Container className="flex flex-col gap-2 py-5 text-sm text-white/70 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {copyrightYear} {siteConfig.legalName}. {t.footer.rights}
          </p>
          <Link to="/privacy" className="transition-colors hover:text-uae-red">
            {t.footer.privacy}
          </Link>
        </Container>
      </div>
    </footer>
  );
}
