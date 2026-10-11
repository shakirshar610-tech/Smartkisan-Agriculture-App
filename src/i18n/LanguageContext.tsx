import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { translations, type Language } from "@/i18n/translations";

interface LanguageContextValue {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const LANG_STORAGE_KEY = "smartkisan_lang";

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === "en" || saved === "ur" || saved === "sd") return saved;
    } catch {
      // ignore
    }
    return "en";
  });

  const setLang = useCallback((newLang: Language) => {
    setLangState(newLang);
    try {
      localStorage.setItem(LANG_STORAGE_KEY, newLang);
    } catch {
      // ignore storage errors
    }
  }, []);

  const t = useCallback(
    (key: string): string => {
      const dict = translations[lang];
      return dict[key] ?? translations.en[key] ?? key;
    },
    [lang]
  );

  const isRTL = lang === "ur" || lang === "sd";

  return (
    <LanguageContext.Provider value={{ lang, setLang, t, isRTL }}>
      <div dir={isRTL ? "rtl" : "ltr"} className={isRTL ? "font-rtl" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useLang(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}
