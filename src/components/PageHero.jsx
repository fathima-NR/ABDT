import { Link } from "react-router-dom";
import { useI18n } from "../context/LanguageContext";
import Container from "./Container";

export default function PageHero({ title, text, crumbs = [] }) {
  const { t, language } = useI18n();
  const tracking = language === "en" ? "tracking-tight" : "leading-snug";

  return (
    <section className="border-b border-line bg-page">
      <Container className="py-14 sm:py-16">
        <nav className="text-sm text-muted" aria-label={t.nav.primary}>
          <Link to="/" className="hover:text-uae-red hover:underline">
            {t.nav.home}
          </Link>
          {crumbs.map((crumb) => (
            <span key={crumb.label}>
              <span className="px-2" aria-hidden="true">
                /
              </span>
              {crumb.to ? (
                <Link to={crumb.to} className="hover:text-uae-red hover:underline">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-navy">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
        <h1 className={`mt-4 max-w-3xl text-3xl font-semibold text-navy sm:text-5xl ${tracking}`}>{title}</h1>
        {text ? <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted">{text}</p> : null}
      </Container>
    </section>
  );
}
