import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "../data/siteConfig";
import { useI18n } from "../context/LanguageContext";
import SocialLinks from "./SocialLinks";

function Detail({ icon: Icon, label, children }) {
  return (
    <div className="flex gap-3">
      <Icon className="mt-0.5 h-5 w-5 shrink-0 text-uae-red" aria-hidden="true" />
      <div>
        <p className="text-sm font-semibold text-navy">{label}</p>
        <div className="mt-1 text-sm leading-relaxed text-muted">{children}</div>
      </div>
    </div>
  );
}

export default function Location() {
  const { t } = useI18n();

  return (
    <div className="space-y-6">
      <div className="border border-line bg-white p-6">
        <h3 className="text-lg font-semibold text-navy">{t.contact.detailsTitle}</h3>
        <div className="mt-5 space-y-4">
          <Detail icon={Phone} label={t.contact.phone}>
            <a href={siteConfig.phone.href} className="hover:text-navy hover:underline" dir="ltr">
              {siteConfig.phone.display}
            </a>
          </Detail>
          <Detail icon={Phone} label={t.contact.mobile}>
            <a href={siteConfig.mobile.href} className="hover:text-navy hover:underline" dir="ltr">
              {siteConfig.mobile.display}
            </a>
          </Detail>
          <Detail icon={Mail} label={t.contact.email}>
            <a href={`mailto:${siteConfig.email}`} className="break-all hover:text-navy hover:underline" dir="ltr">
              {siteConfig.email}
            </a>
          </Detail>
          <Detail icon={MapPin} label={t.contact.addressLabel}>
            <p>{t.location.address}</p>
          </Detail>
        </div>
      </div>

      <div id="location" className="border border-line bg-white p-6">
        <h3 className="text-lg font-semibold text-navy">{t.location.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{t.location.note}</p>
        <a
          href={siteConfig.mapsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-11 items-center justify-center border border-navy px-5 py-3 text-sm font-semibold text-navy hover:bg-navy hover:text-white"
        >
          {t.location.maps}
        </a>
      </div>

      <div>
        <h3 className="text-sm font-semibold text-navy">{t.contact.social}</h3>
        <div className="mt-3">
          <SocialLinks />
        </div>
      </div>
    </div>
  );
}
