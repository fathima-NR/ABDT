import { useEffect } from "react";
import { useI18n } from "../context/LanguageContext";

function setMeta(attr, key, content) {
  let element = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attr, key);
    document.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export default function Seo({ title, description }) {
  const { language } = useI18n();

  useEffect(() => {
    document.title = title;
    setMeta("name", "description", description);
    setMeta("property", "og:title", title);
    setMeta("property", "og:description", description);
    setMeta("property", "og:locale", language === "ar" ? "ar_AE" : "en_AE");
    setMeta("name", "twitter:title", title);
    setMeta("name", "twitter:description", description);
  }, [title, description, language]);

  return null;
}
