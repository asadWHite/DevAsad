import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { useLang, type Lang } from "../i18n";

const SECTIONS = ["work", "services", "about", "lab", "contact"] as const;

export default function Nav({ onLang }: { onLang: () => void }) {
  const { lang, setLang, t } = useLang();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => {
      window.removeEventListener("scroll", onScroll);
      obs.disconnect();
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const items: { id: (typeof SECTIONS)[number]; label: string }[] = [
    { id: "work", label: t("nav_work") },
    { id: "services", label: t("nav_services") },
    { id: "about", label: t("nav_about") },
    { id: "lab", label: t("nav_lab") },
    { id: "contact", label: t("nav_contact") },
  ];

  const LangBtn = ({ l, big = false }: { l: Lang; big?: boolean }) => (
    <button
      onClick={() => {
        if (lang !== l) {
          setLang(l);
          onLang();
        }
      }}
      className={`relative transition-colors duration-300 ${big ? "px-4 py-2.5" : "px-2.5 py-1.5"} ${
        lang === l ? "text-paper" : big ? "text-paper/50 hover:text-paper" : "text-smoke hover:text-navy"
      }`}
      aria-pressed={lang === l}
    >
      {lang === l && (
        <span
          className={`absolute inset-0 ${big ? "bg-paper/20" : "bg-navy"} transition-all duration-300`}
          style={{ borderRadius: 999 }}
          aria-hidden
        />
      )}
      <span className="relative z-10">{l.toUpperCase()}</span>
    </button>
  );

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-[90] flex justify-center pointer-events-none">
        <div
          className={`pointer-events-auto flex items-center justify-between w-full transition-all duration-500 ease-[cubic-bezier(.65,0,.35,1)] ${
            scrolled
              ? "mt-3 mx-3 sm:mx-0 sm:max-w-[760px] rounded-full border border-navy/15 bg-paper/90 backdrop-blur-md px-5 sm:px-6 py-2.5 shadow-[0_10px_40px_-18px_rgba(11,31,58,0.35)]"
              : "mt-0 max-w-full px-5 sm:px-10 py-5 bg-transparent border border-transparent"
          }`}
        >
          <a href="#top" data-cursor="link" className="mono font-semibold tracking-[0.1em] text-[12px] text-ink hover:text-navy transition-colors">
            Dev.Асад
          </a>

          <nav className="hidden md:flex items-center gap-6" aria-label="Asosiy">
            {items.map((it) => (
              <a
                key={it.id}
                href={`#${it.id}`}
                data-cursor="link"
                className={`u-sweep mono text-[10px] tracking-[0.16em] uppercase transition-colors duration-300 ${
                  active === it.id ? "text-navy" : "text-smoke hover:text-navy"
                }`}
              >
                {it.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <div className="mono text-[10px] flex items-center border border-line rounded-full px-1 py-0.5" role="group" aria-label="Язык / Language / Til">
              <LangBtn l="ru" />
              <LangBtn l="en" />
              <LangBtn l="uz" />
            </div>
            <button
              onClick={() => setOpen(true)}
              className="md:hidden w-9 h-9 border border-line rounded-full flex items-center justify-center text-ink"
              aria-label={t("nav_menu")}
            >
              <Menu size={15} />
            </button>
          </div>
        </div>
      </header>

      {/* mobile menu */}
      <div
        className={`fixed inset-0 z-[110] bg-abyss text-paper flex flex-col transition-all duration-500 ease-[cubic-bezier(.65,0,.35,1)] md:hidden ${
          open ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-5 py-5">
          <span className="mono font-semibold tracking-[0.1em] text-[12px]">Dev.Асад</span>
          <button onClick={() => setOpen(false)} className="w-9 h-9 border border-paper/25 rounded-full flex items-center justify-center" aria-label={t("nav_close")}>
            <X size={15} />
          </button>
        </div>
        <nav className="flex-1 flex flex-col justify-center px-6 gap-1" aria-label="Mobil menyu">
          {items.map((it, i) => (
            <a
              key={it.id}
              href={`#${it.id}`}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-4 py-3.5 border-b border-paper/10"
              style={{ transitionDelay: `${i * 40}ms` }}
            >
              <span className="mono text-[9px] tracking-[0.2em] text-paper/40">0{i + 1}</span>
              <span className="display- font-extrabold text-3xl group-hover:text-paper/70 transition-colors">{it.label}</span>
            </a>
          ))}
        </nav>
        <div className="px-6 pb-10 mono text-[11px] flex flex-col gap-6">
          <div className="flex gap-2 border border-paper/20 rounded-full self-start px-1 py-1">
            <LangBtn l="ru" big />
            <LangBtn l="en" big />
            <LangBtn l="uz" big />
          </div>
        </div>
      </div>
    </>
  );
}
