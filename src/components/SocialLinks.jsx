import { siteConfig, whatsappHref } from "../data/siteConfig";
import { useI18n } from "../context/LanguageContext";
import { FacebookIcon, InstagramIcon, LinkedInIcon, WhatsAppIcon } from "./SocialIcons";

export default function SocialLinks({ tone = "light" }) {
  const { t } = useI18n();
  const items = [
    {
      id: "whatsapp",
      href: whatsappHref(t.whatsappMessage),
      label: t.whatsappLabel,
      Icon: WhatsAppIcon,
    },
    {
      id: "instagram",
      href: siteConfig.social.instagram,
      label: t.footer.instagram,
      Icon: InstagramIcon,
    },
    siteConfig.social.facebook
      ? { id: "facebook", href: siteConfig.social.facebook, label: "Facebook", Icon: FacebookIcon }
      : null,
    siteConfig.social.linkedin
      ? { id: "linkedin", href: siteConfig.social.linkedin, label: "LinkedIn", Icon: LinkedInIcon }
      : null,
  ].filter(Boolean);

  const buttonClass =
    tone === "dark"
      ? "border border-white/20 text-white hover:bg-white hover:text-navy"
      : "border border-line bg-white text-navy hover:border-navy";

  return (
    <ul className="flex flex-wrap gap-2">
      {items.map((item) => (
        <li key={item.id}>
          <a
            href={item.href || undefined}
            target={item.href ? "_blank" : undefined}
            rel={item.href ? "noopener noreferrer" : undefined}
            aria-label={item.label}
            className={`inline-flex h-11 w-11 items-center justify-center ${buttonClass}`}
            onClick={item.href ? undefined : (event) => event.preventDefault()}
          >
            <item.Icon className="h-5 w-5" />
          </a>
        </li>
      ))}
    </ul>
  );
}
