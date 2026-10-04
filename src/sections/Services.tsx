import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "../i18n";
import { SectionLabel, FadeUp } from "../components/ui";
import { services, fmtUZS, type Service, type ServiceTag } from "../data/services";
import Magnetic from "../components/Magnetic";
import MobileServices from "./MobileServices";
import TelegramIcon from "../components/TelegramIcon";
import { tgUrl } from "../data/contacts";

gsap.registerPlugin(ScrollTrigger);

const FILTERS: { key: string; labelKey: string; match: (s: Service) => boolean }[] = [
  { key: "all", labelKey: "f_all", match: () => true },
  { key: "web", labelKey: "f_web", match: (s) => s.tags.includes("web") },
  { key: "telegram", labelKey: "f_telegram", match: (s) => s.tags.includes("telegram") },
  { key: "app", labelKey: "f_app", match: (s) => s.tags.includes("app") },
  { key: "design", labelKey: "f_design", match: (s) => s.tags.includes("design") },
  { key: "ai", labelKey: "f_ai", match: (s) => s.tags.includes("ai" as ServiceTag) },
];

/* animated price that morphs when level changes */
function MorphPrice({ value, quote, lang }: { value: number; quote: boolean; lang: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const obj = useRef({ v: value });
  useLayoutEffect(() => {
    if (!ref.current) return;
    if (quote) {
      obj.current.v = 0;
      ref.current.textContent = "";
      return;
    }
    const tween = gsap.to(obj.current, {
      v: value,
      duration: 0.55,
      ease: "power2.out",
      onUpdate: () => {
        if (ref.current) ref.current.textContent = fmtUZS(obj.current.v);
      },
    });
    return () => {
      tween.kill();
    };
  }, [value, quote, lang]);
  return (
    <span className="display- font-extrabold tabular-nums tracking-tight" style={{ fontSize: "clamp(30px, 3.4vw, 52px)" }}>
      {quote ? null : <span ref={ref}>{fmtUZS(value)}</span>}
    </span>
  );
}

function ServiceRow({ s, onOrder }: { s: Service; onOrder: (id: string) => void }) {
  const { t, lang } = useLang();
  const [lvl, setLvl] = useState(0);
  const current = s.levels[Math.min(lvl, s.levels.length - 1)];
  const isQuote = !!current.extra;
  const features = t(s.inclKey).split(",");

  return (
    <article
      data-svc-row
      className={`group border-t border-line transition-colors duration-500 hover:bg-mist/70 ${
        s.featured ? "bg-mist/40 hover:bg-mist" : "hover:bg-mist/70"
      }`}
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 px-4 sm:px-8 py-8 sm:py-10">
        {/* left: identity */}
        <div className="lg:col-span-6 flex flex-col">
          <div className="flex items-start gap-4">
            <span className="mono text-[10px] tracking-[0.2em] text-smoke pt-2">{s.num}</span>
            <div>
              <h3 className="display- font-extrabold text-ink group-hover:text-navy transition-colors duration-400" style={{ fontSize: "clamp(30px, 4vw, 58px)" }}>
                {t(s.titleKey)}
              </h3>
              <p className="mt-3 text-[14px] sm:text-[15px] leading-relaxed text-ink/70 max-w-md">{t(s.descKey)}</p>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <p className="mono text-[8px] tracking-[0.24em] text-navy mb-2">{t("svc_best")}</p>
              <p className="text-[12px] leading-relaxed text-ink/65">{t(s.forKey)}</p>
            </div>
            <div>
              <p className="mono text-[8px] tracking-[0.24em] text-navy mb-2">{t("svc_incl")}</p>
              <p className="text-[12px] leading-relaxed text-ink/65">{features.join(" · ")}</p>
            </div>
          </div>
          {s.exampleKey && (
            <p className="mono mt-5 text-[9px] tracking-[0.2em] text-smoke">
              {t("svc_example")}: <span className="text-navy font-semibold">{s.exampleKey}</span>
            </p>
          )}
        </div>

        {/* right: price engine */}
        <div className="lg:col-span-6 flex flex-col justify-between gap-6 lg:pl-8 lg:border-l border-line">
          <div>
            <div className="flex flex-wrap gap-x-5 gap-y-1.5">
              {s.levels.map((l, i) => (
                <button
                  key={l.nameKey}
                  onMouseEnter={() => setLvl(i)}
                  onFocus={() => setLvl(i)}
                  onClick={() => setLvl(i)}
                  className={`mono text-[9px] tracking-[0.18em] pb-1 border-b transition-all duration-300 ${
                    lvl === i ? "text-navy border-navy font-semibold" : "text-smoke border-transparent hover:text-navy"
                  }`}
                >
                  {t(l.nameKey)}
                </button>
              ))}
            </div>
            <div className="mt-5 flex items-baseline gap-3 flex-wrap">
              <span className="mono text-[9px] tracking-[0.22em] text-smoke">{isQuote ? "" : t("svc_from")}</span>
              {isQuote ? (
                <span className="display- font-extrabold text-steel" style={{ fontSize: "clamp(24px, 2.8vw, 42px)" }}>
                  {t("svc_custom")}
                </span>
              ) : (
                <>
                  <span className="text-navy">
                    <MorphPrice value={current.price} quote={false} lang={lang} />
                  </span>
                  <span className="mono text-[10px] tracking-[0.18em] text-smoke">+ {t("svc_uzs")}</span>
                </>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <p className="mono text-[8px] tracking-[0.18em] text-smoke max-w-[340px] leading-relaxed">{t("svc_disclaimer")}</p>
            <Magnetic strength={0.35}>
              <a
                href={tgUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => onOrder(s.id)}
                data-cursor="open"
                className="group/b inline-flex items-center gap-2.5 mono text-[10px] tracking-[0.18em] px-5 py-3.5 bg-navy text-paper hover:bg-abyss transition-colors duration-400"
              >
                <TelegramIcon size={14} /> {t("cta_float")}
                <ArrowUpRight size={13} className="transition-transform duration-300 group-hover/b:translate-x-0.5 group-hover/b:-translate-y-0.5" />
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Services() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const [filter, setFilter] = useState("all");
  const visible = services.filter(FILTERS.find((f) => f.key === filter)!.match);

  const order = (id: string) => {
    sessionStorage.setItem("asdb-service", id);
    window.dispatchEvent(new Event("asdb-service"));
  };

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-svc-row]",
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.75, stagger: 0.07, ease: "power3.out", scrollTrigger: { trigger: listRef.current, start: "top 85%" } }
      );
    }, root);
    return () => ctx.revert();
  }, [filter]);

  return (
    <section id="services" ref={root} className="relative bg-paper py-24 sm:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
        <SectionLabel index="03" text={t("svc_kicker")} right={`07 / ${t("cat_title")}`} />
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          <div className="lg:col-span-7">
            <h2 className="display- font-extrabold text-ink" style={{ fontSize: "clamp(46px, 7.5vw, 115px)" }}>
              {t("svc_title")}
              <span className="text-navy">.</span>
            </h2>
          </div>
          <FadeUp delay={0.15} className="lg:col-span-5">
            <p className="text-[15px] sm:text-[16px] leading-relaxed text-ink/70 max-w-md">{t("svc_sub")}</p>
            <p className="mono mt-4 text-[9px] tracking-[0.16em] text-navy leading-relaxed">{t("svc_disclaimer")}</p>
          </FadeUp>
        </div>

        {/* mobile controlled service scene */}
        <div className="mt-10">
          <MobileServices onOrder={order} />
        </div>

        {/* editorial filter (desktop) */}
        <div className="hidden md:flex mt-12 flex-wrap gap-x-7 gap-y-3" role="tablist" aria-label="Filter">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={filter === f.key}
              onClick={() => setFilter(f.key)}
              className={`u-sweep mono text-[10px] tracking-[0.24em] pb-1 transition-colors duration-300 ${
                filter === f.key ? "text-navy font-semibold" : "text-smoke hover:text-navy"
              }`}
            >
              {t(f.labelKey)}
              <sup className="ml-1 text-[8px]">{services.filter(f.match).length}</sup>
            </button>
          ))}
        </div>

        <div ref={listRef} className="hidden md:block mt-8 border-b border-line">
          {visible.map((s) => (
            <ServiceRow key={s.id} s={s} onOrder={order} />
          ))}
        </div>

        <FadeUp className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-3 mono text-[9px] tracking-[0.2em] text-smoke">
          <span>
            {t("svc_example")}: {Object.keys(services).length ? "" : ""}
            <span className="text-navy font-semibold"> 2.5M+ / 8.5M+ / 15M+ </span> UZS
          </span>
          <a href="#estimator" data-cursor="link" className="u-sweep text-navy">
            {t("est_title")} →
          </a>
        </FadeUp>
      </div>
    </section>
  );
}
