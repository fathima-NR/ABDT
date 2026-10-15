import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState } from "react";
import { useI18n } from "../context/LanguageContext";
import Container from "./Container";

export default function Reviews() {
  const { t, language } = useI18n();
  const reduce = useReducedMotion();
  const items = t.reviews.items;
  const pageSize = 2;
  const pageCount = Math.max(1, Math.ceil(items.length / pageSize));
  const [page, setPage] = useState(0);
  const [paused, setPaused] = useState(false);
  const visible = items.slice(page * pageSize, page * pageSize + pageSize);
  const PrevIcon = language === "ar" ? ChevronRight : ChevronLeft;
  const NextIcon = language === "ar" ? ChevronLeft : ChevronRight;

  useEffect(() => {
    setPage(0);
  }, [language]);

  useEffect(() => {
    if (reduce || paused || pageCount < 2) return undefined;
    const timer = window.setInterval(() => {
      setPage((current) => (current + 1) % pageCount);
    }, 6000);
    return () => window.clearInterval(timer);
  }, [reduce, paused, pageCount, language]);

  function show(next) {
    setPage((next + pageCount) % pageCount);
  }

  return (
    <section className="bg-page" aria-labelledby="reviews-title" aria-roledescription="carousel">
      <Container className="py-16 lg:py-20">
        <p className={`text-sm font-semibold text-uae-red ${language === "en" ? "uppercase tracking-[0.16em]" : ""}`}>
          {t.reviews.eyebrow}
        </p>
        <h2 id="reviews-title" className="mt-3 text-3xl font-semibold text-navy sm:text-4xl">
          {t.reviews.title}
        </h2>

        <div
          className="mt-8 overflow-hidden"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocus={() => setPaused(true)}
          onBlur={() => setPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={`${language}-${page}`}
              initial={reduce ? false : { opacity: 0, x: language === "ar" ? -24 : 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? undefined : { opacity: 0, x: language === "ar" ? 24 : -24 }}
              transition={{ duration: reduce ? 0 : 0.35 }}
              className="grid gap-5 sm:grid-cols-2"
            >
              {visible.map((item) => (
                <blockquote key={item.name} className="flex h-full flex-col rounded-2xl bg-white p-6 shadow-sm">
                  <p className="text-sm font-semibold text-uae-red">{item.service}</p>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-base">{item.quote}</p>
                  <footer className="mt-5 flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-uae-red/10 text-sm font-semibold text-uae-red">
                      {item.name.slice(0, 1)}
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-navy">{item.name}</span>
                      <span className="block text-sm text-muted">{item.place}</span>
                    </span>
                  </footer>
                </blockquote>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="mt-5 flex items-center justify-between gap-4">
            <div className="flex gap-2">
              {Array.from({ length: pageCount }, (_, dot) => (
                <button
                  key={dot}
                  type="button"
                  aria-label={`${dot + 1} / ${pageCount}`}
                  aria-current={dot === page ? "true" : undefined}
                  onClick={() => show(dot)}
                  className={`h-2.5 rounded-full transition-all ${
                    dot === page ? "w-8 bg-uae-red" : "w-2.5 bg-line"
                  }`}
                />
              ))}
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => show(page - 1)}
                aria-label={t.reviews.previous}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-navy hover:border-uae-red hover:text-uae-red"
              >
                <PrevIcon className="h-5 w-5" aria-hidden="true" />
              </button>
              <button
                type="button"
                onClick={() => show(page + 1)}
                aria-label={t.reviews.next}
                className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-white text-navy hover:border-uae-red hover:text-uae-red"
              >
                <NextIcon className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
