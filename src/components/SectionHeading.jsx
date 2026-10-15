import { useI18n } from "../context/LanguageContext";

export default function SectionHeading({ eyebrow, title, text, tone = "dark" }) {
  const { language } = useI18n();
  const light = tone === "light";
  const tracking = language === "en" ? "tracking-tight" : "leading-snug";

  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p
          className={`text-xs font-semibold ${light ? "text-white/80" : "text-uae-red"} ${
            language === "en" ? "tracking-[0.16em] uppercase" : ""
          }`}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2 className={`mt-3 text-3xl font-semibold sm:text-4xl ${light ? "text-white" : "text-navy"} ${tracking}`}>
        {title}
      </h2>
      {text ? (
        <p className={`mt-4 text-base leading-relaxed sm:text-lg ${light ? "text-white/80" : "text-muted"}`}>
          {text}
        </p>
      ) : null}
    </div>
  );
}
