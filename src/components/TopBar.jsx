import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig, whatsappHref } from "../data/siteConfig";
import { useI18n } from "../context/LanguageContext";
import Container from "./Container";
import { WhatsAppIcon } from "./SocialIcons";

export default function TopBar() {
  const { t } = useI18n();

  return (
    <div className="bg-navy-deep text-white">
      <Container className="flex flex-wrap items-center gap-x-5 gap-y-1 py-2 text-xs sm:text-sm">
        <a href={siteConfig.phone.href} className="inline-flex items-center gap-1.5 hover:underline">
          <Phone className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span dir="ltr">{siteConfig.phone.display}</span>
        </a>
        <a
          href={whatsappHref(t.whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 hover:underline"
        >
          <WhatsAppIcon className="h-3.5 w-3.5 shrink-0" />
          <span dir="ltr">{siteConfig.mobile.display}</span>
        </a>
        <a href={`mailto:${siteConfig.email}`} className="inline-flex items-center gap-1.5 hover:underline">
          <Mail className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span dir="ltr">{siteConfig.email}</span>
        </a>
        <span className="inline-flex items-center gap-1.5">
          <MapPin className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
          <span>{t.location.address}</span>
        </span>
      </Container>
    </div>
  );
}
