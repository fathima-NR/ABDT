import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { translations } from "../data/translations";

const LanguageContext = createContext(null);
const STORAGE_KEY = "abdt-lang";

function readLanguage() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "ar" ? "ar" : "en";
  } catch {
    return "en";
  }
}

export function LanguageProvider({ children }) {
  const [language, setLanguageState] = useState(readLanguage);

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    try {
      localStorage.setItem(STORAGE_KEY, language);
    } catch {
      // Private browsing can block storage. The choice still applies for this visit.
    }
  }, [language]);

  const value = useMemo(
    () => ({
      language,
      dir: language === "ar" ? "rtl" : "ltr",
      t: translations[language],
      setLanguage: (next) => setLanguageState(next === "ar" ? "ar" : "en"),
    }),
    [language],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useI18n must be used within LanguageProvider");
  }
  return context;
}
