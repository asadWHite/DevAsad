import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/i18n";
import { SectionLabel } from "@/components/ui";
import { projects, statusMessageKey } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function HorizontalStory() {
  const { t, loc } = useI18n();
  const root = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        const outer = root.current!.querySelector<HTMLElement>("[data-hs-outer]")!;
        const track = trackRef.current!;
        const getDist = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const setH = () => {
          outer.style.height = `${window.innerHeight + getDist() * 1.15}px`;
        };
        setH();

        const tween = gsap.to(track, {
          x: () => -getDist(),
          ease: "none",
          scrollTrigger: {
            trigger: outer,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            invalidateOnRefresh: true,
            onRefresh: setH,
          },
        });

        /* per-panel parallax using containerAnimation */
        gsap.utils.toArray<HTMLElement>("[data-hs-img]").forEach((img) => {
          gsap.fromTo(
            img,
            { xPercent: -7, scale: 1.15 },
            {
              xPercent: 7,
              scale: 1.15,
              ease: "none",
              scrollTrigger: {
                trigger: img.closest("[data-hs-panel]") as HTMLElement,
                containerAnimation: tween,
                start: "left right",
                end: "right left",
                scrub: true,
              },
            }
          );
        });

        gsap.to("[data-hs-bar]", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: outer, start: "top top", end: "bottom bottom", scrub: 1 },
        });

        return () => {
          outer.style.height = "";
        };
      });
    }, root);
    return () => ctx.revert();
  }, []);

  const four = projects.slice(0, 4);

  return (
    <section ref={root} className="relative bg-paper">
      <div data-hs-outer className="relative">
        <div data-hs-pin-wrap className="relative md:sticky md:top-0 md:h-screen md:overflow-hidden flex flex-col bg-paper">
          <div className="px-5 sm:px-10 pt-24 shrink-0">
            <SectionLabel index="05" text={t("archive.kicker")} right={t("archive.hint")} />
            <div className="mt-8 flex items-end justify-between gap-6">
              <h2 className="display- font-extrabold text-ink" style={{ fontSize: "clamp(38px, 5.5vw, 84px)" }}>
                {t("archive.title")}
              </h2>
              <div className="hidden md:block w-40 h-px bg-line relative overflow-hidden mb-3">
                <div data-hs-bar className="absolute inset-0 bg-navy origin-left scale-x-0" />
              </div>
            </div>
          </div>

          {/* track: sticky-scrub on desktop, native snap-scroll on mobile */}
          <div className="flex-1 min-h-0 mt-8 md:mt-10">
            <div
              ref={trackRef}
              className="flex md:h-full overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none gap-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden will-change-transform"
            >
              {four.map((p) => (
                <article
                  key={p.id}
                  data-hs-panel
                  className="relative shrink-0 w-[84vw] sm:w-[70vw] md:w-[46vw] lg:w-[42vw] h-[68vh] md:h-full snap-center border-l border-line first:border-l-0 flex flex-col justify-between px-6 sm:px-10 py-6 md:py-8 group"
                >
                  <span aria-hidden className="display- absolute -top-2 right-4 font-extrabold text-navy/[0.06] select-none" style={{ fontSize: "clamp(110px,14vw,210px)" }}>
                    {p.number}
                  </span>
                  <div>
                    <p className="mono text-[9px] tracking-[0.26em] text-navy">{loc(p.c.category)}</p>
                    <h3 className="display- mt-3 font-extrabold text-ink group-hover:text-navy transition-colors duration-500" style={{ fontSize: "clamp(38px, 4.6vw, 76px)" }}>
                      {p.brand}
                    </h3>
                  </div>

                  <div className="relative overflow-hidden my-5 h-[38%] md:h-[46%]">
                    {p.image ? (
                      <img
                        data-hs-img
                        src={p.image}
                        alt={loc(p.c.alt)}
                        loading="lazy"
                        className="w-full h-full object-cover will-change-transform scale-110"
                      />
                    ) : (
                      /* UstaTop: real sayt — typographic coming-soon. No fake screens. */
                      <div className="w-full h-full bg-navy text-paper flex flex-col justify-center gap-3 px-6">
                        <span className="mono text-[8px] tracking-[0.22em] text-paper/50">{t("archive.comingSoon")}</span>
                        <span className="display- font-extrabold text-xl sm:text-2xl leading-tight">
                          {t("archive.ustatopPitch")}
                        </span>
                        <span className="mono text-[8px] tracking-[0.18em] text-paper/50">{t("archive.waitlistNote")}</span>
                      </div>
                    )}
                    <span className="mono absolute bottom-2.5 left-2.5 text-[8px] tracking-[0.2em] bg-paper/90 text-navy px-2 py-1">
                      {p.year} — {t(statusMessageKey[p.status])}
                    </span>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <p className="text-[13px] sm:text-[14px] text-ink/65 leading-snug max-w-[38ch] line-clamp-2">{loc(p.c.lead)}</p>
                    <span className="mono shrink-0 text-[9px] tracking-[0.22em] text-smoke">
                      {t("actions.scroll")} →
                    </span>
                  </div>
                </article>
              ))}

              {/* end plate */}
              <div className="shrink-0 w-[60vw] md:w-[34vw] h-[68vh] md:h-full snap-center bg-navy text-paper flex flex-col items-start justify-center gap-6 px-8">
                <p className="mono text-[9px] tracking-[0.26em] text-paper/60">{t("catalogue.kicker")}</p>
                <a href="#index" data-cursor="view" className="display- font-extrabold text-4xl sm:text-5xl leading-tight u-sweep">
                  {t("catalogue.title")} →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
