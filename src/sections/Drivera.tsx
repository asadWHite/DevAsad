import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "../i18n";
import { SectionLabel, RevealLine, ClipImage, FadeUp } from "../components/ui";
import { projects, statusKey } from "../data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function Drivera() {
  const { t } = useLang();
  const root = useRef<HTMLElement>(null);
  const p = projects[3];
  const features = ["d_f1", "d_f2", "d_f3", "d_f4", "d_f5"];

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-d-title-x]",
        { xPercent: 0 },
        { xPercent: -6, ease: "none", scrollTrigger: { trigger: root.current, start: "top bottom", end: "bottom top", scrub: 0.8 } }
      );
      gsap.fromTo(
        "[data-d-stamp]",
        { rotate: -8, scale: 0, opacity: 0 },
        { rotate: -6, scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.8)", scrollTrigger: { trigger: "[data-d-stamp]", start: "top 85%" } }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={root} className="relative bg-abyss text-paper py-24 sm:py-36 overflow-hidden">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
        <SectionLabel dark index="04" text="DRIVERA" right={`${t("p_status")}: ${t(statusKey[p.status])}`} />

        <div className="mt-12 relative">
          <div data-d-title-x className="will-change-transform">
            <RevealLine>
              <h2 className="display- font-extrabold text-stroke text-paper/90" style={{ fontSize: "clamp(62px, 11vw, 170px)" }}>
                DRIVERA<span className="text-wine" style={{ WebkitTextFillColor: "currentColor" }}>.</span>
              </h2>
            </RevealLine>
          </div>
          <span
            data-d-stamp
            className="mono absolute right-0 sm:right-10 -top-4 sm:top-6 inline-block text-[8px] sm:text-[9px] tracking-[0.22em] text-wine border border-wine/60 px-3 py-2 bg-abyss/60 backdrop-blur-sm"
          >
            {t("d_stamp")}
          </span>
        </div>

        <FadeUp delay={0.1} className="mt-6">
          <p className="mono text-[10px] tracking-[0.24em] text-paper/60">{t("d_cat")}</p>
          <p className="mt-5 max-w-2xl text-[16px] sm:text-[19px] leading-relaxed text-paper/80 text-balance">{t("d_lead")}</p>
        </FadeUp>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <div className="lg:col-span-8 relative">
            <ClipImage
              src="/images/drivera-main.jpg"
              alt={t("alt_drivera")}
              caption="DRIVERA — CONCEPT UI"
              className="aspect-[16/10] sm:aspect-[16/9]"
              parallax={5}
              cropTop={8}
            />
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-wine/25 via-transparent to-navy/20 mix-blend-multiply" />
          </div>
          <div className="lg:col-span-4 flex flex-col justify-between gap-8">
            <ul>
              {features.map((f, i) => (
                <FadeUp key={f} delay={i * 0.06} className="border-t border-paper/15 py-4 first:border-t-0 first:pt-0">
                  <li className="flex items-center gap-4">
                    <span className="mono text-[9px] tracking-[0.2em] text-wine">0{i + 1}</span>
                    <span className="display- font-bold text-paper text-[15px] sm:text-[17px] tracking-wide">{t(f)}</span>
                  </li>
                </FadeUp>
              ))}
            </ul>
            <FadeUp className="mono text-[9px] leading-loose tracking-[0.18em] text-paper/50">
              DEEP NAVY · WINE RED · EDITORIAL · {t("p_year")}: 2026
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
