import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/i18n";
import { SectionLabel, RevealLine, ClipImage, FadeUp } from "@/components/ui";
import { projects, statusMessageKey, EDUCRM_SCREENS } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

export default function Educrm() {
  const { t, loc } = useI18n();
  const root = useRef<HTMLElement>(null);
  const [activeNode, setActiveNode] = useState(0);
  const p = projects[2]!;
  const nodes = loc(EDUCRM_SCREENS);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-e-flow]",
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          transformOrigin: "left",
          scrollTrigger: { trigger: "[data-e-nodes]", start: "top 80%", end: "top 40%", scrub: 0.5 },
        }
      );
      gsap.fromTo(
        "[data-e-node]",
        { y: 26, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.7, stagger: 0.09, ease: "power3.out", scrollTrigger: { trigger: "[data-e-nodes]", start: "top 82%" } }
      );
    }, root);
    return () => ctx.revert();
  }, []);

  /* auto-cycle active node while in view */
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    let iv: ReturnType<typeof setInterval> | null = null;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !iv) iv = setInterval(() => setActiveNode((a) => (a + 1) % 5), 1700);
        else if (!e.isIntersecting && iv) { clearInterval(iv); iv = null; }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => { io.disconnect(); if (iv) clearInterval(iv); };
  }, []);

  return (
    <section ref={root} className="relative bg-mist/60 py-24 sm:py-36">
      <div className="mx-auto max-w-[1600px] px-5 sm:px-10">
        <SectionLabel index={p.number} text={p.brand} right={`${t("labels.status")}: ${t(statusMessageKey[p.status])}`} />

        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <div className="lg:col-span-8">
            <RevealLine>
              <h2 className="display- font-extrabold text-ink" style={{ fontSize: "clamp(56px, 9.5vw, 150px)" }}>
                {p.brand}<span className="text-navy">.</span>
              </h2>
            </RevealLine>
            <FadeUp delay={0.15}>
              <p className="mono mt-4 text-[10px] sm:text-[11px] tracking-[0.24em] text-navy">{loc(p.c.category)}</p>
            </FadeUp>
          </div>
          <FadeUp delay={0.2} className="lg:col-span-4">
            <span className="mono inline-block text-[9px] tracking-[0.22em] text-steel border border-steel/40 px-3 py-1.5 rotate-[-1.5deg]">
              {t(statusMessageKey[p.status])}
            </span>
          </FadeUp>
        </div>

        <FadeUp delay={0.1} className="mt-10 max-w-3xl">
          <p className="text-[17px] sm:text-[21px] leading-relaxed text-ink/80 text-balance">{loc(p.c.lead)}</p>
          <p className="mt-4 text-[15px] sm:text-[16px] leading-relaxed text-ink/60 max-w-2xl">{loc(p.cs.solution!.body)}</p>
        </FadeUp>

        {/* dashboard visual */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-9">
            <ClipImage src="/images/educrm-dash.jpg" alt={loc(p.c.alt)} caption={`${nodes[0]} · ${t(statusMessageKey[p.status])} UI`} className="aspect-[16/10] sm:aspect-[16/9] h-full" parallax={5} cropTop={8} />
          </div>
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="bg-pure p-6 flex-1 flex flex-col justify-between border border-line">
              <p className="mono text-[9px] tracking-[0.24em] text-navy">{t("educrm.webAdmin")}</p>
              <p className="display- mt-6 font-extrabold text-ink text-3xl leading-tight">{nodes[3]} +<br />{nodes[2]}</p>
              <p className="mono mt-6 text-[9px] leading-loose tracking-[0.14em] text-smoke">{loc(p.c.note!)}</p>
            </div>
            <div className="bg-navy p-6 text-paper">
              <p className="mono text-[9px] tracking-[0.24em] text-paper/60">{t("educrm.telegram")}</p>
              <p className="display- mt-3 font-extrabold text-2xl">{t("educrm.botMiniApp")}</p>
            </div>
          </div>
        </div>

        {/* screen flow */}
        <div data-e-nodes className="mt-16 sm:mt-24">
          <div className="hidden sm:block relative h-px bg-steel/20 mb-8">
            <div data-e-flow className="absolute inset-0 bg-navy origin-left" />
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {nodes.map((n, i) => (
              <button
                key={n}
                data-e-node
                onMouseEnter={() => setActiveNode(i)}
                onFocus={() => setActiveNode(i)}
                className={`text-left border p-4 sm:p-5 transition-all duration-500 ${
                  activeNode === i ? "border-navy bg-pure shadow-[0_14px_30px_-18px_rgba(11,31,58,0.4)]" : "border-line bg-transparent"
                }`}
              >
                <span className={`mono text-[9px] tracking-[0.2em] ${activeNode === i ? "text-navy" : "text-smoke"}`}>
                  0{i + 1}
                </span>
                <span className={`display- block mt-2 font-bold text-[15px] sm:text-[17px] leading-tight transition-colors ${activeNode === i ? "text-navy" : "text-ink"}`}>
                  {n}
                </span>
              </button>
            ))}
          </div>
        </div>

        <FadeUp className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-3">
          <p className="mono text-[10px] tracking-[0.2em] text-smoke">{loc(p.cs.technology!.note!)}</p>
          <p className="mono text-[10px] tracking-[0.2em] text-navy">{p.tech.join(" · ").toUpperCase()}</p>
        </FadeUp>
        <FadeUp className="mt-6 max-w-2xl">
          <p className="text-[13px] leading-relaxed text-smoke italic">{loc(p.cs.status!.body)}</p>
        </FadeUp>
      </div>
    </section>
  );
}
