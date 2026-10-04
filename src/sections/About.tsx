import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/i18n";
import { SectionLabel } from "@/components/ui";

gsap.registerPlugin(ScrollTrigger);

/* Both chapters are message-tree paths, not literal copy. */
const CHAPTERS = [
  { n: "01", t: "about.buildTitle", b: "about.buildBody" },
  { n: "02", t: "about.thinkTitle", b: "about.thinkBody" },
] as const;

export default function About() {
  const { t } = useI18n();
  const root = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* chapter activation + line progress */
      gsap.utils.toArray<HTMLElement>("[data-ch]").forEach((el, i) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 45%",
          onEnter: () => setActive(i),
          onEnterBack: () => setActive(i),
        });
        gsap.fromTo(
          el.querySelector("[data-ch-title]"),
          { yPercent: 110 },
          { yPercent: 0, duration: 1.1, ease: "power4.out", scrollTrigger: { trigger: el, start: "top 78%" } }
        );
        gsap.fromTo(
          el.querySelector("[data-ch-body]"),
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 68%" } }
        );
      });
      /* progress line */
      gsap.fromTo(
        "[data-ab-line]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: { trigger: root.current, start: "top 60%", end: "bottom 60%", scrub: 0.4 },
        }
      );
      /* ghost numbers drift */
      gsap.utils.toArray<HTMLElement>("[data-ch-ghost]").forEach((g) => {
        gsap.fromTo(g, { yPercent: 15 }, { yPercent: -15, ease: "none", scrollTrigger: { trigger: g, start: "top bottom", end: "bottom top", scrub: 1 } });
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={root} className="relative bg-pure py-24 sm:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
        <SectionLabel index="01" text={t("nav.about").toUpperCase()} right={t("about.kicker")} />

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* sticky left meta */}
          <div className="hidden lg:flex lg:col-span-3 flex-col sticky top-32 self-start h-fit">
            <p className="display- font-extrabold text-ink text-4xl xl:text-5xl leading-none">{t("about.title")}</p>
            <div className="mt-10 flex gap-5">
              <div className="relative w-px h-56 bg-line overflow-hidden">
                <div data-ab-line className="absolute inset-0 bg-navy origin-top" />
              </div>
              <div className="flex flex-col justify-between py-0.5">
                {CHAPTERS.map((c, i) => (
                  <span
                    key={c.n}
                    className={`mono text-[10px] tracking-[0.2em] transition-colors duration-500 ${
                      active === i ? "text-navy font-semibold" : "text-smoke/50"
                    }`}
                  >
                    {c.n}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* chapters */}
          <div className="lg:col-span-9">
            {CHAPTERS.map((c) => (
              <article key={c.n} data-ch className="relative border-t border-line py-14 sm:py-20 pl-2 sm:pl-10">
                <span
                  data-ch-ghost
                  aria-hidden
                  className="pointer-events-none absolute -top-6 right-0 display- font-extrabold text-navy/[0.05] select-none"
                  style={{ fontSize: "clamp(100px,16vw,220px)" }}
                >
                  {c.n}
                </span>
                <span className="mask-line">
                  <h3 data-ch-title className="display- font-extrabold text-ink" style={{ fontSize: "clamp(34px,4.6vw,72px)" }}>
                    {t(c.t)}
                  </h3>
                </span>
                <p data-ch-body className="mt-6 max-w-2xl text-[16px] sm:text-[18px] leading-relaxed text-ink/75">
                  {t(c.b)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
