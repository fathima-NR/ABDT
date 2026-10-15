import { motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "../data/siteConfig";
import { useI18n } from "../context/LanguageContext";
import Button from "./Button";

export default function Hero() {
  const { t, language } = useI18n();
  const reduce = useReducedMotion();
  const tracking = language === "en" ? "tracking-tight" : "leading-snug";

  return (
    <section className="bg-white">
      <div className="mx-auto grid w-full max-w-6xl items-center gap-10 px-5 py-14 sm:px-6 lg:grid-cols-2 lg:gap-16 lg:px-8 lg:py-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.45 }}
        >
          <p className={`text-sm font-semibold text-uae-red ${language === "en" ? "uppercase tracking-[0.16em]" : ""}`}>
            {t.hero.eyebrow}
          </p>
          <h1 className={`mt-4 text-4xl font-semibold text-navy sm:text-5xl lg:text-[3.15rem] lg:leading-[1.15] ${tracking}`}>
            {t.hero.title}
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">{t.hero.text}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button to="/services">{t.hero.explore}</Button>
            <Button to="/contact" variant="secondary">
              {t.hero.contact}
            </Button>
          </div>
        </motion.div>
        <motion.div
          className="relative"
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: reduce ? 0 : 0.45, delay: reduce ? 0 : 0.08 }}
        >
          <img
            src={siteConfig.images.hero}
            alt={t.hero.imageAlt}
            className="aspect-[5/4] w-full rounded-2xl object-cover shadow-lg"
          />
        </motion.div>
      </div>
    </section>
  );
}
