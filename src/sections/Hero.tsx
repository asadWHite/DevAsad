import { useEffect, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { useI18n } from "@/i18n";
import Magnetic from "@/components/Magnetic";
import TelegramIcon from "@/components/TelegramIcon";
import { tgUrl } from "@/data/contacts";

gsap.registerPlugin(ScrollTrigger);

/* auto-rotating service words — kinetic line. Any tap pauses auto mode. */
function RoleRotator({ words, started }: { words: string[]; started: boolean }) {
  const [i, setI] = useState(0);
  const spanRef = useRef<HTMLSpanElement>(null);
  const manual = useRef(false);
  useEffect(() => {
    if (!started) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const iv = setInterval(() => {
      if (!manual.current) setI((p) => (p + 1) % words.length);
    }, 1500);
    return () => clearInterval(iv);
  }, [started, words.length]);
  useEffect(() => {
    if (spanRef.current) {
      gsap.fromTo(spanRef.current, { yPercent: 110 }, { yPercent: 0, duration: 0.55, ease: "power4.out" });
    }
  }, [i]);
  return (
    <span
      className="mask-line inline-flex cursor-pointer"
      onPointerDown={() => {
        manual.current = true;
      }}
      title=""
    >
      <span ref={spanRef} key={i} className="inline-block">
        {words[i]}
      </span>
    </span>
  );
}

export default function Hero({ ready }: { ready: boolean }) {
  const { t, tl } = useI18n();
  const root = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const metaRef2 = useRef<HTMLDivElement>(null);
  const ghostRef = useRef<HTMLDivElement>(null);
  /* §16 — brand names stay as-is, so the marquee is intentionally untranslated */
  const roles = [...tl("hero.roles")];
  const squareRef = useRef<HTMLDivElement>(null);
  const played = useRef(false);

  /* entrance choreography */
  useEffect(() => {
    if (!ready || played.current) return;
    played.current = true;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo("[data-h-line]", { yPercent: 118 }, { yPercent: 0, duration: 1.25, stagger: 0.1 }, 0.05);
      tl.fromTo("[data-h-kicker]", { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.8 }, 0.35);
      tl.fromTo("[data-h-meta]", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.08 }, 0.55);
      tl.fromTo("[data-h-ghost]", { opacity: 0, x: 80 }, { opacity: 1, x: 0, duration: 1.4, ease: "power3.out" }, 0.4);
      tl.fromTo("[data-h-sq]", { scale: 0, rotate: -90 }, { scale: 1, rotate: 0, duration: 0.9, ease: "back.out(1.6)" }, 0.7);
      tl.fromTo("[data-h-marq]", { yPercent: 100 }, { yPercent: 0, duration: 0.9, ease: "power3.inOut" }, 0.8);
    }, root);
    return () => ctx.revert();
  }, [ready]);

  /* pointer parallax + scroll scrub */
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const qxT = gsap.quickTo(titleRef.current, "x", { duration: 1.1, ease: "power3.out" });
      const qyT = gsap.quickTo(titleRef.current, "y", { duration: 1.1, ease: "power3.out" });
      const qxM = gsap.quickTo(metaRef.current, "x", { duration: 1.3, ease: "power3.out" });
      const qyM = gsap.quickTo(metaRef.current, "y", { duration: 1.3, ease: "power3.out" });
      const qxG = gsap.quickTo(ghostRef.current!, "x", { duration: 1.6, ease: "power3.out" });
      const qxS = gsap.quickTo(squareRef.current!, "x", { duration: 1.2, ease: "power3.out" });
      const qyS = gsap.quickTo(squareRef.current!, "y", { duration: 1.2, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const nx = e.clientX / window.innerWidth - 0.5;
        const ny = e.clientY / window.innerHeight - 0.5;
        qxT(nx * 6); qyT(ny * 4);
        qxM(nx * 10); qyM(ny * 8);
        qxG(nx * -26);
        qxS(nx * 22); qyS(ny * 16);
      };
      if (window.matchMedia("(pointer: fine)").matches) window.addEventListener("mousemove", onMove, { passive: true });

      gsap.to(titleRef.current, {
        yPercent: -8,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "top top", end: "bottom top", scrub: 0.6 },
      });
      gsap.to("[data-h-kicker2]", {
        opacity: 0.15,
        ease: "none",
        scrollTrigger: { trigger: root.current, start: "40% top", end: "bottom top", scrub: true },
      });
      return () => window.removeEventListener("mousemove", onMove);
    }, root);
    return () => ctx.revert();
  }, []);

  const marqueeItems = ["KASHMIR", "USTATOP", "EDUCRM", "DRIVERA", "SOCIAL HUB", "MOBILE LAB"];

  return (
    <section id="top" ref={root} className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-paper pt-28 pb-16">
      {/* ghost outline word */}
      <div ref={ghostRef} className="pointer-events-none absolute right-[-4%] top-[16%] select-none" aria-hidden>
        <span data-h-ghost className="display- text-stroke text-navy/25 font-extrabold text-[clamp(90px,18vw,280px)] opacity-0">
          {t("hero.ghost")}
        </span>
      </div>

      {/* rotating navy square */}
      <div ref={squareRef} className="absolute right-[10%] bottom-[30%] hidden lg:block" aria-hidden>
        <div data-h-sq className="w-16 h-16 border border-navy/30 flex items-center justify-center">
          <div className="w-8 h-8 bg-navy animate-spin-slow" />
        </div>
      </div>

      <div className="mx-auto w-full max-w-[1600px] px-5 sm:px-10">
        <p data-h-kicker className="mono text-[10px] sm:text-[11px] tracking-[0.3em] text-navy mb-6 sm:mb-10 opacity-0">
          {t("hero.kicker")}
        </p>

        {/* mobile statement — app-like first scene */}
        <div className="md:hidden -mt-2 mb-8">
          <h1 className="display- font-extrabold text-ink leading-[0.95]" style={{ fontSize: "clamp(44px, 13.5vw, 92px)" }}>
            {(["intro.m1", "intro.m2", "intro.m3"] as const).map((k, i) => (
              <span key={k} className="mask-line">
                <span data-h-line className={i === 2 ? "text-navy" : ""}>{t(k)}</span>
              </span>
            ))}
          </h1>
        </div>

        <div ref={titleRef} className="hidden md:block">
          <h1 className="hero-h1 display- font-extrabold text-ink leading-[0.9]" style={{ fontSize: "clamp(46px, 11.5vw, 180px)" }}>
            <span className="mask-line"><span data-h-line>{t("hero.l1")}</span></span>
            <span className="mask-line"><span data-h-line className="inline-flex items-baseline gap-[0.06em]">
              {t("hero.l2")}<span className="w-[0.13em] h-[0.13em] bg-navy translate-y-[0.05em] self-center" aria-hidden />
            </span></span>
            <span className="mask-line"><span data-h-line className="text-navy">{t("hero.l3")}</span></span>
          </h1>
        </div>

        <div ref={metaRef} className="mt-10 sm:mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-end" data-h-kicker2>
          <p data-h-meta className="lg:col-span-5 text-[17px] sm:text-[19px] leading-relaxed text-ink/80 max-w-xl opacity-0 text-balance">
            {t("hero.sub")}
          </p>
          <div data-h-meta className="lg:col-span-4 mono text-[10px] tracking-[0.22em] text-smoke space-y-2.5 opacity-0">
            <p className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-navy" /> {t("hero.meta1")}</p>
            <p className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-navy" /> {t("hero.meta2")}</p>
            <p className="flex items-center gap-3"><span className="w-1.5 h-1.5 bg-navy" /> {t("hero.meta3")}</p>
          </div>
          <div data-h-meta className="lg:col-span-3 flex lg:justify-end opacity-0">
            <div className="flex flex-col items-start gap-3">
              <Magnetic strength={0.35}>
                <a href={tgUrl()} target="_blank" rel="noopener noreferrer" data-cursor="talk" className="group inline-flex items-center gap-3 bg-paper text-navy border border-navy px-6 py-4 mono text-[10px] tracking-[0.2em] font-semibold hover:bg-navy hover:text-paper transition-colors duration-400">
                  <TelegramIcon size={15} /> {t("hero.cta1")}
                  <ArrowUpRight size={13} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              </Magnetic>
              <a href="#work" data-cursor="view" className="group inline-flex items-center gap-4 mono text-[10px] tracking-[0.24em] text-navy pl-1">
                <span className="relative flex w-9 h-9 items-center justify-center border border-navy/30 rounded-full overflow-hidden">
                  <ArrowDown size={13} className="relative z-10 transition-transform duration-500 group-hover:translate-y-0.5" />
                  <span className="absolute inset-0 bg-navy scale-y-0 origin-bottom transition-transform duration-500 group-hover:scale-y-100" aria-hidden />
                </span>
                {t("hero.cta2")}
              </a>
            </div>
          </div>
        </div>

        {/* kinetic service line */}
        <div ref={metaRef2} className="mt-8 sm:mt-10" data-h-kicker2>
          <p data-h-meta className="mono text-[10px] sm:text-[11px] tracking-[0.26em] text-smoke opacity-0">
            <span className="text-navy font-semibold">→</span>{" "}
            <span className="text-navy font-semibold">
              <RoleRotator words={roles} started={ready} />
            </span>
          </p>
        </div>
      </div>

      {/* project marquee */}
      <div className="absolute bottom-0 left-0 w-full border-t border-line overflow-hidden">
        <div data-h-marq className="flex whitespace-nowrap py-3.5 animate-marquee will-change-transform">
          {[0, 1].map((dup) => (
            <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
              {marqueeItems.concat(marqueeItems).map((m, i) => (
                <span key={`${dup}-${i}`} className="mono text-[10px] tracking-[0.3em] text-smoke mx-6 flex items-center gap-6">
                  {m} <span className="w-1 h-1 bg-navy/40 inline-block" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
