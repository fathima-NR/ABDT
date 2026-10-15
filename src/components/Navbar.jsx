import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useI18n } from "../context/LanguageContext";
import BrandLogo from "./BrandLogo";
import Button from "./Button";
import Container from "./Container";

const links = [
  { href: "/", key: "home" },
  { href: "/about", key: "about" },
  { href: "/services", key: "services" },
  { href: "/why", key: "why" },
  { href: "/contact", key: "contact" },
];

function LanguageSwitch() {
  const { language, setLanguage, t } = useI18n();

  return (
    <div role="group" aria-label={t.nav.language} className="inline-flex overflow-hidden rounded-sm border border-line">
      <button
        type="button"
        aria-pressed={language === "en"}
        onClick={() => setLanguage("en")}
        className={`min-h-11 px-4 text-sm font-semibold ${
          language === "en" ? "bg-uae-red text-white" : "bg-white text-ink"
        }`}
      >
        English
      </button>
      <button
        type="button"
        aria-pressed={language === "ar"}
        onClick={() => setLanguage("ar")}
        className={`min-h-11 px-4 text-sm font-semibold ${
          language === "ar" ? "bg-uae-red text-white" : "bg-white text-ink"
        }`}
      >
        العربية
      </button>
    </div>
  );
}

export default function Navbar() {
  const { t } = useI18n();
  const reduce = useReducedMotion();
  const location = useLocation();
  const locationKey = `${location.pathname}${location.hash}`;
  const [openKey, setOpenKey] = useState("");
  const open = openKey === locationKey;

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") setOpenKey("");
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="border-b border-line bg-white">
      <Container className="flex h-20 items-center justify-between gap-4 lg:h-24">
        <Link to="/" className="shrink-0" aria-label={t.nav.home}>
          <BrandLogo className="h-12 w-auto sm:h-14" />
        </Link>
        <nav className="hidden items-center gap-6 lg:flex" aria-label={t.nav.primary}>
          {links.map((link) => (
            <Link
              key={link.key}
              to={link.href}
              className={`text-sm font-medium transition-colors hover:text-uae-red hover:underline ${
                (link.href === "/" ? location.pathname === "/" : location.pathname.startsWith(link.href))
                  ? "text-uae-red"
                  : "text-ink"
              }`}
            >
              {t.nav[link.key]}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitch />
          <Button to="/contact">{t.nav.contactCta}</Button>
        </div>
        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-sm border border-line text-navy lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpenKey(open ? "" : locationKey)}
        >
          {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
          <span className="sr-only">{open ? t.nav.closeMenu : t.nav.openMenu}</span>
        </button>
      </Container>
      <AnimatePresence>
        {open ? (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: reduce ? 0 : 0.25 }}
            className="overflow-hidden border-t border-line bg-white lg:hidden"
          >
            <Container className="flex flex-col gap-1 py-4">
              <nav aria-label={t.nav.primary} className="flex flex-col">
                {links.map((link) => (
                  <Link key={link.key} to={link.href} className="py-3 text-base font-medium text-ink transition-colors hover:text-uae-red">
                    {t.nav[link.key]}
                  </Link>
                ))}
              </nav>
              <div className="mt-3 flex flex-col items-start gap-3">
                <LanguageSwitch />
                <Button to="/contact" className="w-full">
                  {t.nav.contactCta}
                </Button>
              </div>
            </Container>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
