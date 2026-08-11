import React, { createContext, useState, useCallback, ReactNode } from "react";

export type Lang = "en" | "hi";

type Dict = Record<string, string>;

const EN: Dict = {
  "royal.union": "THE ROYAL UNION OF",
  "save.the.date": "Save the Date",
  "view.invitation": "View Invitation",
  "no.invitation": "No Invitation Image",
  "no.invitation.hint": "Please upload an invitation image in the admin panel.",
  "scroll.explore": "Scroll to explore",
  "open": "Open",
  "music": "Music",
  "events.eyebrow": "THE CELEBRATIONS",
  "events.title": "Event Schedule",
  "get.directions": "Get Directions",
  "gallery.eyebrow": "A STORY IN PICTURES",
  "gallery.title": "Captured Moments",
  "gallery.empty": "No photos added yet.",
  "tag.instagram": "#Tag us on instagram",
  "info.eyebrow": "GUEST INFORMATION",
  "info.title": "Helpful Details",
  "countdown.eyebrow": "COUNTING DOWN TO",
  "countdown.title": "Our Special Day",
  "rsvp.eyebrow": "WE'D LOVE TO SEE YOU",
  "rsvp.title": "Kindly Respond",
  "rsvp.text": "Please RSVP through WhatsApp for a personal confirmation and any additional details.",
  "rsvp.button": "RSVP via WhatsApp",
  "footer.copyright": "With love and best wishes",
  "lang.toggle": "हिन्दी",
  "we.await": "We await your presence",
};

const HI: Dict = {
  "royal.union": "शाही मिलन",
  "save.the.date": "तिथि को अंकित करें",
  "view.invitation": "निमंत्रण देखें",
  "no.invitation": "कोई निमंत्रण छवि नहीं",
  "no.invitation.hint": "कृपया एडमिन पैनल में निमंत्रण छवि अपलोड करें।",
  "scroll.explore": "खोजने के लिए स्क्रॉल करें",
  "open": "खोलें",
  "music": "संगीत",
  "events.eyebrow": "समारोह",
  "events.title": "कार्यक्रम सूची",
  "get.directions": "दिशा प्राप्त करें",
  "gallery.eyebrow": "तस्वीरों की कहानी",
  "gallery.title": "कैद क्षण",
  "gallery.empty": "अभी कोई फ़ोटो नहीं जोड़ा गया।",
  "tag.instagram": "#हमें इंस्टाग्राम पर टैग करें",
  "info.eyebrow": "अतिथि जानकारी",
  "info.title": "उपयोगी विवरण",
  "countdown.eyebrow": "इस ओर गिनती",
  "countdown.title": "हमारा विशेष दिन",
  "rsvp.eyebrow": "हम आपको देखना चाहते हैं",
  "rsvp.title": "कृपया उत्तर दें",
  "rsvp.text": "व्यक्तिगत पुष्टिकरण और अतिरिक्त जानकारी के लिए कृपया व्हाट्सएप के माध्यम से RSVP करें।",
  "rsvp.button": "व्हाट्सएप के माध्यम से RSVP",
  "footer.copyright": "स्नेह और शुभकामनाओं के साथ",
  "lang.toggle": "English",
  "we.await": "हम आपकी उपस्थिति की प्रतीक्षा करते हैं",
};

const DICTS: Record<Lang, Dict> = { en: EN, hi: HI };

interface LanguageContextType {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  t: (key: string) => string;
}

export const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = "weddingLang";

function getInitialLang(): Lang {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === "en" || stored === "hi") return stored;
  } catch {
    /* ignore */
  }
  return "en";
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getInitialLang);

  const setLang = useCallback((next: Lang) => {
    setLangState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
      document.documentElement.lang = next;
    } catch {
      /* ignore */
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLangState((prev) => {
      const next: Lang = prev === "en" ? "hi" : "en";
      try {
        localStorage.setItem(STORAGE_KEY, next);
        document.documentElement.lang = next;
      } catch {
        /* ignore */
      }
      return next;
    });
  }, []);

  const t = useCallback((key: string) => DICTS[lang][key] ?? DICTS.en[key] ?? key, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useT() {
  const ctx = React.useContext(LanguageContext);
  if (!ctx) throw new Error("useT must be used within LanguageProvider");
  return ctx;
}
