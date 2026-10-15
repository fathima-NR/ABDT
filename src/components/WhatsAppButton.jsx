import { Phone } from "lucide-react";
import { siteConfig, whatsappHref } from "../data/siteConfig";
import { useI18n } from "../context/LanguageContext";
import { WhatsAppIcon } from "./SocialIcons";

export default function WhatsAppButton() {
  const { t } = useI18n();

  return (
    <div className="fixed end-5 bottom-5 z-40 flex flex-col items-center gap-3">
      <a
        href={siteConfig.mobile.href}
        aria-label={t.callLabel}
        className="abdt-shake inline-flex h-14 w-14 items-center justify-center rounded-full bg-uae-red text-white shadow-md hover:bg-uae-red-dark"
      >
        <Phone className="h-6 w-6" aria-hidden="true" />
      </a>
      <a
        href={whatsappHref(t.whatsappMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t.whatsappLabel}
        className="abdt-shake inline-flex h-14 w-14 items-center justify-center rounded-full bg-uae-green text-white shadow-md hover:bg-uae-green-dark"
      >
        <WhatsAppIcon className="h-7 w-7" />
      </a>
    </div>
  );
}
