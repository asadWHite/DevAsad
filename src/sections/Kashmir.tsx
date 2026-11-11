import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n";
import type { L } from "@/i18n";
import { SectionLabel, RevealLine, ClipImage, FadeUp } from "@/components/ui";
import { projects, statusMessageKey, KASHMIR_HERO, KASHMIR_ABOUT } from "@/data/projects";
import Magnetic from "@/components/Magnetic";

gsap.registerPlugin(ScrollTrigger);

const L3 = <T,>(uz: T, ru: T, en: T): L<T> => ({ uz, ru, en });

/** Real sections of the live Kashmir Decor site — localized, never hardcoded. */
const REAL_SECTIONS: { n: string; label: L<string> }[] = [
  { n: "01", label: L3("SALON", "САЛОН", "SALON") },
  { n: "02", label: L3("KOLLEKSIYA", "КОЛЛЕКЦИЯ", "COLLECTION") },
  { n: "03", label: L3("INTERYERLAR", "ИНТЕРЬЕРЫ", "INTERIORS") },
  { n: "04", label: L3("JARAYON 01–05", "ПРОЦЕСС 01–05", "PROCESS 01–05") },
  { n: "05", label: L3("FAQ · ALOQA", "FAQ · КОНТАКТЫ", "FAQ · CONTACTS") },
];

export default function Kashmir() {
  const { t, loc } = useI18n();
  const root = useRef<HTMLElement>(null);
  const p = projects[0]!;

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-k-shift]").forEach((el, i) => {
        gsap.fromTo(
          el,
          { y: 60 + i * 30 },
          { y: -(40 + i * 20), ease: "none", scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: 0.8 } }
        );
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const overview = p.cs.overview!;
  const technology = p.cs.technology!;
  const problem = p.cs.problem!;

  return (
    <section id="work" ref={root} className="relative bg-paper pt-24 sm:pt-36 pb-20 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
        <SectionLabel index="02" text={t("nav.work").toUpperCase()} right={`${t("labels.project")} ${p.number} / 06`} />

        {/* header */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <RevealLine>
              <h2 className="display- font-extrabold text-ink" style={{ fontSize: "clamp(40px, 8.2vw, 128px)" }}>
                {p.brand}<span className="text-navy">.</span>
              </h2>
            </RevealLine>
            <FadeUp delay={0.15}>
              <p className="mono mt-4 text-[10px] sm:text-[11px] tracking-[0.24em] text-navy">{loc(p.c.category)}</p>
              <p className="mono mt-3 inline-flex items-center gap-2 text-[9px] tracking-[0.2em] text-ink border border-line px-2.5 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-navy animate-pulse-dot" /> {t("labels.realProject")}
              </p>
            </FadeUp>
          </div>
          <FadeUp delay={0.2} className="lg:col-span-4">
            <div className="grid grid-cols-2 gap-x-8 gap-y-4 mono text-[10px] tracking-[0.18em]">
              <div>
                <p className="text-smoke">{t("labels.status")}</p>
                <p className="mt-1.5 flex items-center gap-2 text-navy font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-navy animate-pulse-dot" /> {t(statusMessageKey[p.status])}
                </p>
              </div>
              <div>
                <p className="text-smoke">{t("labels.year")}</p>
                <p className="mt-1.5 text-ink font-semibold">{p.year}</p>
              </div>
              <div className="col-span-2">
                <p className="text-smoke">{t("labels.role")}</p>
                <p className="mt-1.5 text-ink font-semibold">{loc(p.c.role)}</p>
              </div>
            </div>
          </FadeUp>
        </div>

        <FadeUp delay={0.1} className="mt-10 max-w-3xl">
          <p className="text-[17px] sm:text-[21px] leading-relaxed text-ink/80 text-balance">{loc(p.c.lead)}</p>
        </FadeUp>

        {/* REAL hero image — kashmirdecor.uz/assets/hero.jpg */}
        <div className="mt-14 sm:mt-20">
          <ClipImage
            src={KASHMIR_HERO}
            alt={loc(p.c.alt)}
            caption={`${t("kashmir.img1")} · kashmirdecor.uz`}
            className="aspect-[4/3] sm:aspect-[16/9]"
            parallax={5}
          />
        </div>

        {/* editorial row */}
        <div className="mt-16 sm:mt-28 grid grid-cols-1 lg:grid-cols-12 gap-12">
          <div className="lg:col-span-7 grid grid-cols-12 gap-5">
            <div className="col-span-7" data-k-shift>
              <ClipImage
                src={KASHMIR_ABOUT}
                alt={loc(p.c.alt)}
                caption={`${t("kashmir.img2")} · /assets/about.jpg`}
                className="aspect-[3/4]"
                parallax={5}
              />
            </div>
            <div className="col-span-5 flex flex-col justify-end gap-6" data-k-shift>
              <div className="bg-mist p-6 sm:p-8">
                <p className="mono text-[9px] tracking-[0.24em] text-navy">{loc(overview.kicker)}</p>
                <p className="display- mt-3 font-extrabold text-navy text-3xl sm:text-4xl leading-tight">
                  {loc(overview.title)}
                </p>
                <p className="mono mt-4 text-[9px] leading-loose tracking-[0.14em] text-steel">{loc(overview.note!)}</p>
              </div>
              <p className="mono text-[10px] leading-loose tracking-[0.14em] text-smoke max-w-[240px]">{loc(p.c.note!)}</p>
            </div>
          </div>

          {/* real architecture */}
          <div className="lg:col-span-5 flex flex-col">
            <FadeUp className="border-t border-line pt-6 pb-4">
              <p className="mono text-[10px] tracking-[0.24em] text-navy">{t("kashmir.realStructure")}</p>
            </FadeUp>
            {REAL_SECTIONS.map((s, i) => (
              <FadeUp key={s.n} delay={i * 0.05} className="border-b border-line py-4 flex items-center gap-5">
                <span className="mono text-[9px] tracking-[0.2em] text-smoke w-8">{s.n}</span>
                <span className="display- font-bold text-ink text-[15px] sm:text-[17px]">{loc(s.label)}</span>
              </FadeUp>
            ))}
            <FadeUp delay={0.2} className="mt-8 flex flex-col gap-6">
              <p className="text-[15px] leading-relaxed text-ink/70">{loc(problem.body)}</p>
              <p className="mono text-[10px] leading-loose tracking-[0.14em] text-smoke">{loc(technology.body)}</p>
              <div className="flex flex-wrap gap-3">
                {(["url", "url2"] as const).map((k, i) => {
                  const href = k === "url" ? p.url : p.url2;
                  if (!href) return null;
                  return (
                    <Magnetic key={href}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-cursor="open"
                        className={`group inline-flex items-center gap-2.5 mono text-[10px] tracking-[0.2em] px-5 py-3.5 border transition-colors duration-400 ${
                          i === 0
                            ? "bg-navy text-paper border-navy hover:bg-paper hover:text-navy"
                            : "border-line text-ink hover:border-navy hover:text-navy"
                        }`}
                      >
                        {new URL(href).host}
                        <ArrowUpRight size={13} className="transition-transform duration-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </a>
                    </Magnetic>
                  );
                })}
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
