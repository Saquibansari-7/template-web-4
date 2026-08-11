import { useT } from "../context/LanguageContext";

export default function LanguageToggle() {
  const { lang, toggleLang, t } = useT();
  return (
    <button
      onClick={toggleLang}
      aria-label="Toggle language"
      className="fixed top-4 right-4 z-[120] inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/80 backdrop-blur-md border border-[var(--color-royal-gold)]/30 shadow-sm text-[var(--color-royal-red)] font-serif text-sm font-semibold hover:bg-white transition-all"
    >
      <span className="text-base leading-none">{lang === "en" ? "EN" : "हि"}</span>
      <span className="hidden sm:inline">{t("lang.toggle")}</span>
    </button>
  );
}
